import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import Document from "../document";
import { isLocale, locales } from "../locales";
import { metadataFor } from "../metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.filter((locale) => locale !== "cs").map((locale) => ({ locale }));
}

type Params = Promise<{ locale: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return metadataFor(locale);
}

export default async function Layout({ children, params }: { children: ReactNode; params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Document locale={locale}>{children}</Document>;
}
