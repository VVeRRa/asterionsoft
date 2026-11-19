import { notFound } from "next/navigation";
import LandingPage from "../landing-page";
import type { Locale } from "../locales";
import type { Messages } from "../messages";
import english from "../messages/en.json";
import german from "../messages/de.json";

const messages: Partial<Record<Locale, Messages>> = { en: english, de: german };

function hasMessages(locale: string): locale is keyof typeof messages {
  return Object.hasOwn(messages, locale);
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasMessages(locale)) notFound();
  return <LandingPage locale={locale} messages={messages[locale]!} />;
}
