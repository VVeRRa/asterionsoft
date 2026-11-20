import { isLocale, type Locale } from "../locales";

/** Validated inquiry – only what the user filled in. */
export type Inquiry = {
  locale: Locale;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  service: string | null;
  message: string;
};

export type ValidationResult =
  | { ok: true; inquiry: Inquiry }
  | { ok: false; field: keyof Inquiry | "form" };

const limits = { name: 120, email: 200, company: 160, phone: 40, service: 120, message: 5000 } as const;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(form: FormData, key: string, max: number): string | null {
  const value = form.get(key);
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export function parseInquiry(form: FormData): ValidationResult {
  const localeValue = text(form, "locale", 2) ?? "cs";
  const locale: Locale = isLocale(localeValue) ? localeValue : "cs";
  const name = text(form, "name", limits.name);
  const email = text(form, "email", limits.email)?.toLowerCase() ?? null;
  const message = text(form, "message", limits.message);

  if (!name) return { ok: false, field: "name" };
  if (!email || !emailPattern.test(email)) return { ok: false, field: "email" };
  if (!message || message.length < 10) return { ok: false, field: "message" };

  return {
    ok: true,
    inquiry: {
      locale,
      name,
      email,
      company: text(form, "company", limits.company),
      phone: text(form, "phone", limits.phone),
      service: text(form, "service", limits.service),
      message,
    },
  };
}

/**
 * Cheap bot protection: a hidden field humans don't see, and a minimum time
 * between showing and submitting the form.
 */
export function looksLikeBot(form: FormData): boolean {
  const honeypot = form.get("website");
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  const startedAt = Number(form.get("started_at"));
  if (!Number.isFinite(startedAt) || startedAt <= 0) return true;
  return Date.now() - startedAt < 3000;
}
