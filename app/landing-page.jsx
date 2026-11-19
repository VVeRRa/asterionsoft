import Home from "./home";
import { localePaths } from "./locales";
import structuredData from "./structured-data.json";

const faqTopics = ["audit", "assistant", "process", "contact", "excel", "training", "idea"];

function schemaFor(locale, messages) {
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
          itemListElement: node.itemListElement.map((offer, index) => {
            const item = messages.services[index];
            const price = offer.priceSpecification;
            return {
              ...offer,
              itemOffered: {
                ...offer.itemOffered,
                name: item?.name ?? messages.trainingNav,
                description: item?.description ?? messages.trainingIntro,
              },
              ...(price?.unitText && {
                priceSpecification: { ...price, unitText: locale === "de" ? "Stunde" : "hour" },
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
            name: messages[topic + "Question"],
            acceptedAnswer: { "@type": "Answer", text: messages[topic + "Answer"] },
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

export default function LandingPage({ locale, messages }) {
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
