import type { Metadata } from "next";
import { legalDocs } from "./legal/docs";
import { legalPaths } from "./legal/paths";
import type { LegalKind } from "./legal/types";
import { localePaths, locales, type Locale } from "./locales";

const czech = {
  "title": "Asterion Software — AI, automatizace a vývoj aplikací na míru",
  "description": "Asterion Software s.r.o. — AI audit procesů, automatizace na míru, interní AI asistenti, webové aplikace na míru a firemní školení AI.",
  "alternates": {
    "canonical": "https://asterionsoft.cz/"
  },
  "robots": {
    "index": true,
    "follow": true
  },
  "openGraph": {
    "type": "website",
    "siteName": "Asterion Software",
    "title": "Asterion Software — AI, automatizace a vývoj aplikací",
    "description": "Seniorní vývoj, praktická AI a automatizace pro firmy. Od AI auditu a školení po aplikaci v produkci.",
    "url": "https://asterionsoft.cz/",
    "locale": "cs_CZ",
    "images": [
      {
        "url": "https://asterionsoft.cz/og-image.png",
        "width": 1200,
        "height": 630,
        "alt": "Asterion Software — AI, automatizace a vývoj aplikací pro firmy"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Asterion Software — AI, automatizace a vývoj aplikací",
    "description": "Seniorní vývoj, praktická AI a automatizace pro firmy.",
    "images": [
      "https://asterionsoft.cz/og-image.png"
    ]
  },
  "icons": {
    "icon": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%237c3aed'/%3E%3Cstop offset='1' stop-color='%233b82f6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='64' height='64' rx='14' fill='url(%23g)'/%3E%3Ctext x='32' y='45' font-family='Arial, sans-serif' font-size='38' font-weight='800' fill='white' text-anchor='middle'%3EA%3C/text%3E%3C/svg%3E"
  }
} satisfies Metadata;


const origin = "https://asterionsoft.cz";
type Translation = { title: string; description: string; openGraphLocale: string };

const localized: Partial<Record<Locale, Translation>> = {
  en: {
    title: "Asterion Software — AI, Automation, and Custom Application Development",
    description: "Asterion Software s.r.o. — AI audits, custom business process automation, internal AI assistants, custom web applications and AI training for businesses.",
    openGraphLocale: "en_GB",
  },
  de: {
    title: "Asterion Software — KI, Automatisierung und individuelle Anwendungsentwicklung",
    description: "Asterion Software s.r.o. — KI-Audits, individuelle Automatisierung von Geschäftsprozessen, interne KI-Assistenten, individuelle Webanwendungen und KI-Schulungen für Unternehmen.",
    openGraphLocale: "de_DE",
  },
};

export function metadataFor(locale: Locale): Metadata {
  const translation = localized[locale];
  const url = origin + localePaths[locale];
  const languages = Object.fromEntries(
    Object.entries(localePaths).map(([language, path]) => [language, origin + path]),
  );

  return {
    ...czech,
    title: translation?.title ?? czech.title,
    description: translation?.description ?? czech.description,
    alternates: { canonical: url, languages: { ...languages, "x-default": languages.cs } },
    openGraph: {
      ...czech.openGraph,
      ...(translation && {
        title: translation.title,
        description: translation.description,
        locale: translation.openGraphLocale,
        images: czech.openGraph.images.map((image) => ({ ...image, alt: translation.title })),
      }),
      url,
    },
    twitter: {
      ...czech.twitter,
      ...(translation && { title: translation.title, description: translation.description }),
    },
  };
}

/** Metadata for a legal page: its own title, description, canonical URL and language alternates. */
export function legalMetadataFor(kind: LegalKind, locale: Locale): Metadata {
  const base = metadataFor(locale);
  const { title: docTitle, description } = legalDocs[kind][locale];
  const title = `${docTitle} | Asterion Software`;
  const url = origin + legalPaths[kind][locale];
  const languages = Object.fromEntries(locales.map((language) => [language, origin + legalPaths[kind][language]]));

  return {
    ...base,
    title,
    description,
    alternates: { canonical: url, languages: { ...languages, "x-default": languages.cs } },
    openGraph: { ...czech.openGraph, ...base.openGraph, title, description, url },
    twitter: { ...czech.twitter, ...base.twitter, title, description },
  };
}
