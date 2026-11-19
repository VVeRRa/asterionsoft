import type { Classification } from "./classify";
import type { Inquiry } from "./inquiry";

/**
 * Minimální klient pro Supabase REST (PostgREST). Volá se jen ze serveru se
 * service-role (secret) klíčem; tabulka má zapnuté RLS bez politik, takže
 * veřejný (anon) klíč do ní nemůže číst ani zapisovat.
 */
function config() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const headers: Record<string, string> = { apikey: key, "Content-Type": "application/json" };
  // Starší klíče jsou JWT a patří i do Authorization; nové sb_secret_… klíče ne.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  return { endpoint: `${url.replace(/\/$/, "")}/rest/v1/inquiries`, headers };
}

export function supabaseConfigured(): boolean {
  return config() !== null;
}

/** Počet poptávek ze stejné (hashované) IP za posledních `minutes` minut. */
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

/** Výsledek uložení; `reason` je krátký kód bez citlivých údajů (jde i do odpovědi API). */
export type StoreResult = { ok: true; id: string } | { ok: false; reason: string };

async function errorCode(response: Response): Promise<string> {
  const body = await response.text();
  console.error("Uložení poptávky do Supabase selhalo:", response.status, body);
  try {
    const parsed = JSON.parse(body) as { code?: string };
    return parsed.code ? `http_${response.status}_${parsed.code}` : `http_${response.status}`;
  } catch {
    return `http_${response.status}`;
  }
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
