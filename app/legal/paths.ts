import type { Locale } from "../locales";
import type { LegalKind } from "./types";

/** URL of each legal page per language. The English and German slugs are served by `app/[locale]/[legal]`. */
export const legalPaths: Record<LegalKind, Record<Locale, string>> = {
  privacy: { cs: "/ochrana-osobnich-udaju/", en: "/en/privacy/", de: "/de/datenschutz/" },
  terms: { cs: "/obchodni-podminky/", en: "/en/terms/", de: "/de/agb/" },
};

/**
 * Date from which the published texts apply. Update it whenever the privacy policy or the terms change,
 * so the version that applied at a given time stays traceable in git history.
 */
export const legalEffectiveDate = "2026-11-24";

/** The `[legal]` segment value (last path part) for a locale and kind, e.g. "privacy" for /en/privacy/. */
export function legalSlug(kind: LegalKind, locale: Locale): string {
  return legalPaths[kind][locale].split("/").filter(Boolean).pop()!;
}
