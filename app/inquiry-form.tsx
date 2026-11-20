"use client";

import Script from "next/script";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Locale } from "./locales";
import type { Messages } from "./messages";

export type ServiceOption = { label: string; value: string };

type Status = "idle" | "sending" | "success";
type ErrorKey = "errorName" | "errorEmail" | "errorMessage" | "errorCaptcha" | "errorRate" | "errorServer";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string) => void };
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** The “normal” Turnstile widget is a fixed 300 px wide; narrower forms (small phones) get the compact size. */
const turnstileWidth = 300;

const fieldErrors: Record<string, ErrorKey> = { name: "errorName", email: "errorEmail", message: "errorMessage" };

type Props = {
  locale: Locale;
  t: Messages;
  options: ServiceOption[];
  service: string;
  onServiceChange: (value: string) => void;
};

export default function InquiryForm({ locale, t, options, service, onServiceChange }: Props) {
  const f = t.form;
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<ErrorKey | null>(null);
  const [startedAt, setStartedAt] = useState(0);

  const turnstileRef = useRef<HTMLDivElement>(null);
  const [turnstileSize, setTurnstileSize] = useState<"normal" | "compact">("normal");

  useEffect(() => setStartedAt(Date.now()), []);
  // The size must be set before the script loads (lazyOnload); Turnstile reads it only when rendering the widget.
  useEffect(() => {
    const width = turnstileRef.current?.clientWidth ?? turnstileWidth;
    if (width < turnstileWidth) setTurnstileSize("compact");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/inquiry/", { method: "POST", body: new FormData(event.currentTarget) });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; field?: string };
      if (result.ok) {
        setStatus("success");
        formRef.current?.reset();
        onServiceChange("");
        return;
      }
      setError(
        result.error === "validation" ? (fieldErrors[result.field ?? ""] ?? "errorServer")
          : result.error === "captcha" ? "errorCaptcha"
          : result.error === "rate" ? "errorRate"
          : "errorServer",
      );
      window.turnstile?.reset();
      setStatus("idle");
    } catch {
      setError("errorServer");
      setStatus("idle");
    }
  }

  if (status === "success") {
    return (
      <div className="inquiry-success" role="status">
        <strong>{f.successTitle}</strong>
        <p>{f.successBody}</p>
        <button type="button" className="btn btn-secondary" onClick={() => { setStartedAt(Date.now()); setStatus("idle"); }}>
          {f.another}
        </button>
      </div>
    );
  }

  const optional = <span className="field-optional"> ({f.optional})</span>;

  return (
    <form ref={formRef} className="inquiry-form" aria-label={t.formTitle} onSubmit={handleSubmit} noValidate={false}>
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="started_at" value={startedAt} />
      <div className="field-trap" aria-hidden="true">
        <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <div className="field-row">
        <label className="field">
          <span>{f.name}</span>
          <input name="name" required maxLength={120} autoComplete="name" />
        </label>
        <label className="field">
          <span>{f.email}</span>
          <input name="email" type="email" required maxLength={200} autoComplete="email" />
        </label>
      </div>
      <div className="field-row">
        <label className="field">
          <span>{f.company}{optional}</span>
          <input name="company" maxLength={160} autoComplete="organization" />
        </label>
        <label className="field">
          <span>{f.phone}{optional}</span>
          <input name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </label>
      </div>
      <label className="field">
        <span>{f.service}</span>
        <select name="service" value={service} onChange={(event) => onServiceChange(event.target.value)}>
          <option value="">{f.serviceGeneral}</option>
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
      <label className="field">
        <span>{f.message}</span>
        <textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder={f.messagePlaceholder} />
      </label>

      {turnstileSiteKey && (
        <>
          <div className="cf-turnstile" ref={turnstileRef} data-sitekey={turnstileSiteKey} data-theme="dark"
            data-language={locale} data-size={turnstileSize} />
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
        </>
      )}

      {error && <p className="form-error" role="alert">{f[error]}</p>}

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? f.sending : f.submit}
        </button>
        <small>{f.privacy}</small>
      </div>
    </form>
  );
}
