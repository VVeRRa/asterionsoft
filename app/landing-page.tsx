import Home from "./home";
import { localePaths, type Locale } from "./locales";
import type { Messages } from "./messages";
import structuredData from "./structured-data.json";
import { faqTopics } from "./faq-topics";


/** Price units in structured-data.json (Czech) → translations for the other languages. */
const unitTexts: Record<string, Record<Exclude<Locale, "cs">, string>> = {
  hodina: { en: "hour", de: "Stunde" },
  "měsíc": { en: "month", de: "Monat" },
};

type LandingPageProps = { locale: Locale; messages: Messages };

function schemaFor(locale: Locale, messages: Messages) {
  if (locale === "cs") return structuredData;

  const url = "https://asterionsoft.cz" + localePaths[locale];
  const graph = structuredData["@graph"].map((node) => {
    switch (node["@type"]) {
      case "Person":
        return { ...node, jobTitle: messages.founder };
      case "WebSite":
        return { ...node, "@id": url + "#web", url, inLanguage: locale };
      case "OfferCatalog":
        return {
          ...node,
          "@id": url + "#sluzby",
          name: messages.catalog,
          itemListElement: node.itemListElement?.map((offer, index) => {
            const servicesCount = messages.services.length;
            const service = index < servicesCount ? messages.services[index] : undefined;
            const industry = index > servicesCount ? messages.industries[index - servicesCount - 1] : undefined;
            const name = service ? service.name
              : industry ? `${industry.name} – ${industry.audience}`
              : messages.trainingNav;
            const description = service?.description ?? industry?.description ?? messages.trainingIntro;
            const price = offer.priceSpecification;
            return {
              ...offer,
              itemOffered: {
                ...offer.itemOffered,
                name,
                description,
              },
              ...(price?.unitText && {
                priceSpecification: { ...price, unitText: unitTexts[price.unitText]?.[locale] ?? price.unitText },
              }),
            };
          }),
        };
      case "FAQPage":
        return {
          ...node,
          "@id": url + "#faq",
          inLanguage: locale,
          mainEntity: faqTopics.map((topic) => ({
            "@type": "Question",
            name: messages[`${topic}Question`],
            acceptedAnswer: { "@type": "Answer", text: messages[`${topic}Answer`] },
          })),
        };
      case "SoftwareApplication":
        return { ...node, description: messages.studioDescription };
      default:
        return { ...node, hasOfferCatalog: { "@id": url + "#sluzby" } };
    }
  });
  return { ...structuredData, "@graph": graph };
}

export default function LandingPage({ locale, messages }: LandingPageProps) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFor(locale, messages)).replace(/</g, "\\u003c") }}
      />
      <Home locale={locale} t={messages} />
    </>
  );
}
