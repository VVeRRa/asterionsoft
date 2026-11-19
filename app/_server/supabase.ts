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

export type StoredInquiry = { id: string };

export async function storeInquiry(
  inquiry: Inquiry,
  classification: Classification,
  meta: { ipHash: string | null; userAgent: string | null },
): Promise<StoredInquiry | null> {
  const supabase = config();
  if (!supabase) return null;
  const { classified_by, service_category, urgency, summary, is_spam, ...rest } = classification;
  const response = await fetch(`${supabase.endpoint}?select=id`, {
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
  });
  if (!response.ok) {
    console.error("Uložení poptávky do Supabase selhalo:", response.status, await response.text());
    return null;
  }
  const rows = (await response.json()) as StoredInquiry[];
  return rows[0] ?? null;
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
