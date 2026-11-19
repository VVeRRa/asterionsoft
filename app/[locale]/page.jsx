import LandingPage from "../landing-page";
import english from "../messages/en.json";
import german from "../messages/de.json";

const messages = { en: english, de: german };

export default async function Page({ params }) {
  const { locale } = await params;
  return <LandingPage locale={locale} messages={messages[locale]} />;
}
