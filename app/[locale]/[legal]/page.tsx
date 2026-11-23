import { notFound } from "next/navigation";
import LegalPage from "../../components/legal-page";
import { legalPaths, legalSlug } from "../../legal/paths";
import type { LegalKind } from "../../legal/types";
import { isLocale, type Locale } from "../../locales";
import { legalMetadataFor } from "../../metadata";

// English and German legal pages: /en/privacy/, /en/terms/, /de/datenschutz/, /de/agb/ (Czech ones live in app/(czech)).
export const dynamicParams = false;

const kinds = Object.keys(legalPaths) as LegalKind[];

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  const locale = params.locale;
  return kinds.map((kind) => ({ legal: legalSlug(kind, locale) }));
}

type Params = Promise<{ locale: string; legal: string }>;

async function resolve(params: Params): Promise<{ kind: LegalKind; locale: Locale }> {
  const { locale, legal } = await params;
  if (!isLocale(locale) || locale === "cs") notFound();
  const kind = kinds.find((candidate) => legalSlug(candidate, locale) === legal);
  if (!kind) notFound();
  return { kind, locale };
}

export async function generateMetadata({ params }: { params: Params }) {
  const { kind, locale } = await resolve(params);
  return legalMetadataFor(kind, locale);
}

export default async function Page({ params }: { params: Params }) {
  const { kind, locale } = await resolve(params);
  return <LegalPage kind={kind} locale={locale} />;
}
