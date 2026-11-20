import { createHash } from "node:crypto";
import { after } from "next/server";
import { classifyInquiry } from "../../_server/classify";
import { sendAutoReply, sendOwnerNotification } from "../../_server/email";
import { looksLikeBot, parseInquiry } from "../../_server/inquiry";
import { markInquiry, recentInquiryCount, storeInquiry, supabaseConfigured } from "../../_server/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const RATE_LIMIT = { count: 5, minutes: 60 };

function json(body: Record<string, unknown>, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function hashIp(request: Request): string | null {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip");
  if (!ip) return null;
  // The IP is not stored, only its salted hash for rate limiting.
  const salt = process.env.INQUIRY_IP_SALT ?? process.env.SUPABASE_URL ?? "asterion";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

async function verifyTurnstile(token: FormDataEntryValue | null, request: Request): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || !token) return false;
  const body = new URLSearchParams({ secret, response: token });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: "validation", field: "form" }, 400);
  }

  // Bots get a success response so they don't try other variants.
  if (looksLikeBot(form)) return json({ ok: true });

  const parsed = parseInquiry(form);
  if (!parsed.ok) return json({ ok: false, error: "validation", field: parsed.field }, 400);
  const { inquiry } = parsed;

  if (!(await verifyTurnstile(form.get("cf-turnstile-response"), request))) {
    return json({ ok: false, error: "captcha" }, 400);
  }

  const ipHash = hashIp(request);
  if (ipHash && supabaseConfigured() && (await recentInquiryCount(ipHash, RATE_LIMIT.minutes)) >= RATE_LIMIT.count) {
    return json({ ok: false, error: "rate" }, 429);
  }

  const classification = await classifyInquiry(inquiry);
  const stored = await storeInquiry(inquiry, classification, { ipHash, userAgent: request.headers.get("user-agent") });
  const notification = await sendOwnerNotification(inquiry, classification, stored.ok ? { id: stored.id } : { error: stored.reason });
  const notified = notification.ok;

  // An inquiry must not get lost: if it was neither saved nor sent, the customer should know.
  // Reason codes (e.g. not_configured, http_404_42P01) contain no secrets and make debugging easier.
  if (!stored.ok && !notified) {
    const details = { store: stored.reason, notify: notification.reason };
    console.error("Poptávka se neuložila ani neodeslala:", details);
    return json({ ok: false, error: "server", details }, 500);
  }
  if (!stored.ok) console.error("Poptávka se neuložila do Supabase, upozornění ale odešlo:", stored.reason);
  if (!notified) console.error("Upozornění majiteli se neodeslalo, poptávka je ale v Supabase:", notification.reason);

  const now = new Date().toISOString();
  after(async () => {
    const replied = classification.is_spam ? false : (await sendAutoReply(inquiry)).ok;
    if (stored.ok) {
      await markInquiry(stored.id, {
        ...(notified && { notified_at: now }),
        ...(replied && { auto_replied_at: new Date().toISOString() }),
      });
    }
  });

  return json({ ok: true });
}
