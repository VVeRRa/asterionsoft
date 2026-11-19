export const locales = ["cs", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const localePaths: Record<Locale, string> = { cs: "/", en: "/en/", de: "/de/" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
