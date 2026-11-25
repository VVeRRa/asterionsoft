import type { Locale } from "../locales";
import type { Classification } from "./classify";
import type { Inquiry } from "./inquiry";
import { normalizeSupabaseUrl } from "./supabase";

const categoryLabels: Record<Classification["service_category"], string> = {
  ai_audit: "AI audit",
  process_automation: "Automatizace procesu",
  ai_assistant: "Interní AI asistent",
  web_app: "Webová aplikace",
  excel_to_app: "Excel → aplikace",
  java_consulting: "Java / Spring konzultace",
  training: "Školení",
  other: "Jiné",
};

const urgencyLabels: Record<Classification["urgency"], string> = {
  low: "nízká",
  normal: "běžná",
  high: "VYSOKÁ",
};

/**
 * The auto-reply deliberately does not repeat the customer's message: copies of the inquiry text in mailboxes and
 * in Resend's history would outlive the retention periods promised in the privacy policy.
 */
const autoReply: Record<Locale, { subject: string; greeting: (name: string) => string; body: string[]; signoff: string }> = {
  cs: {
    subject: "Děkujeme za poptávku – Asterion Software",
    greeting: (name) => `Dobrý den, ${name},`,
    body: [
      "děkujeme za vaši poptávku. Přečtu si ji a do jednoho pracovního dne se vám ozvu s návrhem dalšího kroku.",
      "Pokud chcete něco doplnit, stačí odpovědět na tento e-mail. Spěcháte? Zavolejte na +420 604 257 866.",
    ],
    signoff: "S pozdravem\nJan Marcis\nAsterion Software s.r.o.",
  },
  en: {
    subject: "Thank you for your enquiry – Asterion Software",
    greeting: (name) => `Hello ${name},`,
    body: [
      "thank you for getting in touch. I’ll read your enquiry and get back to you within one business day with a suggested next step.",
      "If you’d like to add anything, simply reply to this email. In a hurry? Call +420 604 257 866.",
    ],
    signoff: "Best regards\nJan Marcis\nAsterion Software s.r.o.",
  },
  de: {
    subject: "Vielen Dank für Ihre Anfrage – Asterion Software",
    greeting: (name) => `Guten Tag ${name},`,
    body: [
      "vielen Dank für Ihre Anfrage. Ich lese sie sorgfältig und melde mich innerhalb eines Werktags mit einem Vorschlag für den nächsten Schritt.",
      "Möchten Sie etwas ergänzen, antworten Sie einfach auf diese E-Mail. Eilt es? Rufen Sie uns an: +420 604 257 866.",
    ],
    signoff: "Mit freundlichen Grüßen\nJan Marcis\nAsterion Software s.r.o.",
  },
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}

const paragraph = (text: string) =>
  `<p style="margin:0 0 14px;line-height:1.55">${escapeHtml(text).replace(/\n/g, "<br>")}</p>`;

function layout(content: string): string {
  return `<!doctype html><html><body style="margin:0;padding:24px;background:#f4f6fb;font-family:Inter,Segoe UI,Arial,sans-serif;color:#0b1020">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:28px;border:1px solid #e3e7f0">${content}</div></body></html>`;
}

/** Send result; `reason` is a short code without sensitive data. */
export type SendResult = { ok: true } | { ok: false; reason: string };

/** `kind` is what gets logged instead of the recipient's address. */
type Email = { kind: "owner" | "customer"; to: string; subject: string; html: string; text: string; replyTo?: string };

async function send(email: Email): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.INQUIRY_FROM_EMAIL?.trim();
  if (!apiKey || !from) {
    console.error("Chybí RESEND_API_KEY nebo INQUIRY_FROM_EMAIL, e-mail se neodeslal.");
    return { ok: false, reason: "not_configured" };
  }
  // A failure of one e-mail (e.g. the onboarding@resend.dev test sender may only write
  // to the account's address) must not break the form submission or the other e-mail.
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [email.to],
        ...(email.replyTo && { reply_to: email.replyTo }),
        subject: email.subject,
        html: email.html,
        text: email.text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) return { ok: true };
    // The error body can quote the recipient's address, so only the status and the error name are logged.
    const body = await response.text();
    let name = "";
    try { name = (JSON.parse(body) as { name?: string }).name ?? ""; } catch {}
    console.error(`Resend odmítl e-mail (${email.kind}):`, response.status, name);
    return { ok: false, reason: name ? `http_${response.status}_${name}` : `http_${response.status}` };
  } catch (error) {
    console.error(`Odeslání e-mailu (${email.kind}) přes Resend selhalo:`, error instanceof Error ? error.name : "unknown");
    return { ok: false, reason: "network" };
  }
}

/** Where the inquiry ended up in Supabase: its id, or the reason code why storing failed. */
export type StorageOutcome = { id: string } | { error: string };

/** Table editor of the Supabase project, derived from SUPABASE_URL (https://<ref>.supabase.co). */
function supabaseEditorUrl(): string | null {
  const ref = /^https:\/\/([a-z0-9]{20})\.supabase\.co/i.exec(normalizeSupabaseUrl(process.env.SUPABASE_URL ?? "") ?? "")?.[1];
  return ref ? `https://supabase.com/dashboard/project/${ref}/editor` : null;
}

/**
 * Notification to the owner – always in Czech; replying goes straight to the customer.
 * It carries contact details and the classification, not the inquiry text: the text is read in Supabase,
 * where the retention job deletes it on time. Only when storing failed does the e-mail carry the full
 * text, so the inquiry is not lost.
 */
export function sendOwnerNotification(inquiry: Inquiry, classification: Classification, storage: StorageOutcome) {
  const to = process.env.INQUIRY_NOTIFY_EMAIL?.trim();
  if (!to) {
    console.error("Chybí INQUIRY_NOTIFY_EMAIL, upozornění se neodeslalo.");
    return Promise.resolve<SendResult>({ ok: false, reason: "not_configured" });
  }
  const prefix = classification.is_spam ? "[SPAM?] " : classification.urgency === "high" ? "[SPĚCHÁ] " : "";
  const subject = `${prefix}Nová poptávka: ${categoryLabels[classification.service_category]} – ${inquiry.name}`;
  const rows: [string, string | null][] = [
    ["Jméno", inquiry.name],
    ["E-mail", inquiry.email],
    ["Telefon", inquiry.phone],
    ["Firma", inquiry.company],
    ["Vybraná služba", inquiry.service],
    ["Jazyk", inquiry.locale.toUpperCase()],
    ["Kategorie", categoryLabels[classification.service_category]],
    ["Naléhavost", urgencyLabels[classification.urgency]],
    ["Klasifikace", classification.classified_by === "ai" ? "AI (Claude)" : "pravidla"],
    "id" in storage
      ? ["ID v Supabase", storage.id]
      : ["Supabase", `NEULOŽENO – ${storage.error} (podrobnosti ve Vercel Logs)`],
  ];
  const editorUrl = "id" in storage ? supabaseEditorUrl() : null;
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]));
  const table = filled
    .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;color:#5b6478;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`)
    .join("");
  const details = "id" in storage
    ? paragraph("Text poptávky najdete v Supabase, tabulka inquiries (podle ID výše).") +
      (editorUrl ? `<p style="margin:0"><a href="${escapeHtml(editorUrl)}" style="color:#5b3fd6;font-weight:700">Otevřít v Supabase</a></p>` : "")
    : `<div style="padding:16px;border-radius:12px;background:#f4f6fb">${paragraph(inquiry.message)}</div>`;
  const html = layout(
    `<h2 style="margin:0 0 16px;font-size:20px">${escapeHtml(subject)}</h2><table style="border-collapse:collapse;font-size:14px;margin-bottom:18px">${table}</table>` +
      details,
  );
  const lines = filled.map(([label, value]) => `${label}: ${value}`).join("\n");
  const text = "id" in storage
    ? `${lines}\n\nText poptávky najdete v Supabase, tabulka inquiries.${editorUrl ? `\n${editorUrl}` : ""}`
    : `${lines}\n\n${inquiry.message}`;
  return send({ kind: "owner", to, subject, html, text, replyTo: inquiry.email });
}

/** Auto-reply to the customer in the language they sent the inquiry in. */
export function sendAutoReply(inquiry: Inquiry) {
  const copy = autoReply[inquiry.locale];
  const replyTo = process.env.INQUIRY_NOTIFY_EMAIL?.trim() || process.env.INQUIRY_FROM_EMAIL?.trim();
  const html = layout(
    paragraph(copy.greeting(inquiry.name)) +
      copy.body.map(paragraph).join("") +
      `<div style="margin-top:20px">${paragraph(copy.signoff)}</div>`,
  );
  const text = [copy.greeting(inquiry.name), ...copy.body, copy.signoff].join("\n\n");
  return send({ kind: "customer", to: inquiry.email, subject: copy.subject, html, text, replyTo });
}
