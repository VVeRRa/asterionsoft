import type { Locale } from "../locales";
import type { Classification } from "./classify";
import type { Inquiry } from "./inquiry";

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

const autoReply: Record<Locale, { subject: string; greeting: (name: string) => string; body: string[]; summary: string; signoff: string }> = {
  cs: {
    subject: "Děkujeme za poptávku – Asterion Software",
    greeting: (name) => `Dobrý den, ${name},`,
    body: [
      "děkujeme za vaši poptávku. Přečtu si ji a do jednoho pracovního dne se vám ozvu s návrhem dalšího kroku.",
      "Pokud chcete něco doplnit, stačí odpovědět na tento e-mail. Spěcháte? Zavolejte na +420 604 257 866.",
    ],
    summary: "Vaše zpráva:",
    signoff: "S pozdravem\nJan Marcis\nAsterion Software, s.r.o.",
  },
  en: {
    subject: "Thank you for your enquiry – Asterion Software",
    greeting: (name) => `Hello ${name},`,
    body: [
      "thank you for getting in touch. I’ll read your enquiry and get back to you within one business day with a suggested next step.",
      "If you’d like to add anything, simply reply to this email. In a hurry? Call +420 604 257 866.",
    ],
    summary: "Your message:",
    signoff: "Best regards\nJan Marcis\nAsterion Software, s.r.o.",
  },
  de: {
    subject: "Vielen Dank für Ihre Anfrage – Asterion Software",
    greeting: (name) => `Guten Tag ${name},`,
    body: [
      "vielen Dank für Ihre Anfrage. Ich lese sie sorgfältig und melde mich innerhalb eines Werktags mit einem Vorschlag für den nächsten Schritt.",
      "Möchten Sie etwas ergänzen, antworten Sie einfach auf diese E-Mail. Eilt es? Rufen Sie uns an: +420 604 257 866.",
    ],
    summary: "Ihre Nachricht:",
    signoff: "Mit freundlichen Grüßen\nJan Marcis\nAsterion Software, s.r.o.",
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

type Email = { to: string; subject: string; html: string; text: string; replyTo: string };

async function send(email: Email): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.INQUIRY_FROM_EMAIL;
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
      body: JSON.stringify({ from, to: [email.to], reply_to: email.replyTo, subject: email.subject, html: email.html, text: email.text }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
    if (response.ok) return { ok: true };
    const body = await response.text();
    console.error(`Resend odmítl e-mail pro ${email.to}:`, response.status, body);
    let name = "";
    try { name = (JSON.parse(body) as { name?: string }).name ?? ""; } catch {}
    return { ok: false, reason: name ? `http_${response.status}_${name}` : `http_${response.status}` };
  } catch (error) {
    console.error(`Odeslání e-mailu pro ${email.to} přes Resend selhalo:`, error);
    return { ok: false, reason: "network" };
  }
}

/** Notification to the owner – always in Czech; replying goes straight to the customer. */
export function sendOwnerNotification(inquiry: Inquiry, classification: Classification, inquiryId: string | null) {
  const to = process.env.INQUIRY_NOTIFY_EMAIL;
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
    ["Shrnutí", classification.summary],
    ["Další krok", classification.suggested_next_step],
    ["Klasifikace", classification.classified_by === "ai" ? "AI (Claude)" : "pravidla"],
    ["ID v Supabase", inquiryId],
  ];
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]));
  const table = filled
    .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;color:#5b6478;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0">${escapeHtml(value)}</td></tr>`)
    .join("");
  const html = layout(
    `<h2 style="margin:0 0 16px;font-size:20px">${escapeHtml(subject)}</h2><table style="border-collapse:collapse;font-size:14px;margin-bottom:18px">${table}</table>` +
      `<div style="padding:16px;border-radius:12px;background:#f4f6fb">${paragraph(inquiry.message)}</div>`,
  );
  const text = `${filled.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\n${inquiry.message}`;
  return send({ to, subject, html, text, replyTo: inquiry.email });
}

/** Auto-reply to the customer in the language they sent the inquiry in. */
export function sendAutoReply(inquiry: Inquiry) {
  const copy = autoReply[inquiry.locale];
  const replyTo = process.env.INQUIRY_NOTIFY_EMAIL ?? process.env.INQUIRY_FROM_EMAIL ?? "";
  const html = layout(
    paragraph(copy.greeting(inquiry.name)) +
      copy.body.map(paragraph).join("") +
      `<p style="margin:20px 0 6px;color:#5b6478;font-size:13px">${escapeHtml(copy.summary)}</p>` +
      `<div style="padding:16px;border-radius:12px;background:#f4f6fb;font-size:14px">${paragraph(inquiry.message)}</div>` +
      `<div style="margin-top:20px">${paragraph(copy.signoff)}</div>`,
  );
  const text = [copy.greeting(inquiry.name), ...copy.body, "", copy.summary, inquiry.message, "", copy.signoff].join("\n\n");
  return send({ to: inquiry.email, subject: copy.subject, html, text, replyTo });
}
