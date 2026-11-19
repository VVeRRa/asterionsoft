import Document from "../document";
import { locales } from "../locales";
import { metadataFor } from "../metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.filter((locale) => locale !== "cs").map((locale) => ({ locale }));
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataFor(locale);
}

export default async function Layout({ children, params }) {
  const { locale } = await params;
  return <Document locale={locale}>{children}</Document>;
}
