import type { Classification } from "./classify";
import type { Inquiry } from "./inquiry";

/**
 * Minimal client for Supabase REST (PostgREST). Called only from the server with
 * the service-role (secret) key; the table has RLS enabled with no policies, so
 * the public (anon) key can neither read nor write it.
 */
/**
 * Accepts the usual ways people paste the project URL: with `/rest/v1` or
 * another path appended, without `https://`, or even the dashboard URL
 * (supabase.com/dashboard/project/<ref>). PostgREST answers a wrong path with
 * 404 PGRST125, so we always reduce it to https://<ref>.supabase.co.
 */
export function normalizeSupabaseUrl(raw: string): string | null {
  const value = raw.trim();
  if (!value) return null;
  let parsed: URL;
  try {
    parsed = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
  } catch {
    return null;
  }
  const dashboardRef = /\/project\/([a-z0-9]{20})(?:\/|$)/i.exec(parsed.pathname)?.[1];
  if (parsed.hostname.endsWith("supabase.com") && dashboardRef) return `https://${dashboardRef}.supabase.co`;
  return parsed.origin;
}

function config() {
  const url = normalizeSupabaseUrl(process.env.SUPABASE_URL ?? "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  // Legacy keys are JWTs and also go into Authorization; new sb_secret_… keys don't.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  return { endpoint: `${url}/rest/v1/inquiries`, headers };
}

export function supabaseConfigured(): boolean {
  return config() !== null;
}

/** Number of inquiries from the same (hashed) IP in the last `minutes` minutes. */
export async function recentInquiryCount(ipHash: string, minutes: number): Promise<number> {
  const supabase = config();
  if (!supabase) return 0;
  const since = new Date(Date.now() - minutes * 60_000).toISOString();
  const query = new URLSearchParams({ select: "id", ip_hash: `eq.${ipHash}`, created_at: `gte.${since}`, limit: "1" });
  const response = await fetch(`${supabase.endpoint}?${query}`, {
    headers: { ...supabase.headers, Prefer: "count=exact" },
    cache: "no-store",
  });
  if (!response.ok) return 0;
  const total = response.headers.get("content-range")?.split("/")[1];
  return total ? Number(total) || 0 : 0;
}

/** Save result; `reason` is a short code without sensitive data (also returned by the API). */
export type StoreResult = { ok: true; id: string } | { ok: false; reason: string };

async function errorCode(response: Response): Promise<string> {
  // The error body can contain the whole failing row (name, e-mail, message), so only the code is logged.
  const body = await response.text();
  let code = "";
  try { code = (JSON.parse(body) as { code?: string }).code ?? ""; } catch {}
  console.error("Uložení poptávky do Supabase selhalo:", response.status, code);
  return code ? `http_${response.status}_${code}` : `http_${response.status}`;
}

export async function storeInquiry(
  inquiry: Inquiry,
  classification: Classification,
  meta: { ipHash: string | null; userAgent: string | null },
): Promise<StoreResult> {
  const supabase = config();
  if (!supabase) return { ok: false, reason: "not_configured" };
  const { classified_by, service_category, urgency, summary, is_spam, ...rest } = classification;
  let response: Response;
  try {
    response = await fetch(`${supabase.endpoint}?select=id`, {
      method: "POST",
      headers: { ...supabase.headers, Prefer: "return=representation" },
      body: JSON.stringify({
        ...inquiry,
        service_category,
        urgency,
        summary,
        is_spam,
        status: is_spam ? "spam" : "new",
        classified_by,
        classification: { ...rest, service_category, urgency, summary, is_spam },
        ip_hash: meta.ipHash,
        user_agent: meta.userAgent?.slice(0, 300) ?? null,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Supabase není dostupný (zkontrolujte SUPABASE_URL):", error);
    return { ok: false, reason: "network" };
  }
  if (!response.ok) return { ok: false, reason: await errorCode(response) };
  const rows = (await response.json()) as { id: string }[];
  return rows[0] ? { ok: true, id: rows[0].id } : { ok: false, reason: "no_row" };
}

export async function markInquiry(id: string, fields: { notified_at?: string; auto_replied_at?: string }) {
  const supabase = config();
  if (!supabase || Object.keys(fields).length === 0) return;
  const response = await fetch(`${supabase.endpoint}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...supabase.headers, Prefer: "return=minimal" },
    body: JSON.stringify(fields),
    cache: "no-store",
  });
  if (!response.ok) console.error("Aktualizace poptávky v Supabase selhala:", response.status);
}
