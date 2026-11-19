import type { Detail, Industry } from "../catalog";
import type { Messages } from "../messages";
import OfferCard from "./offer-card";
import SavingsCalculator from "./savings-calculator";
import SectionHead from "./section-head";

type Props = {
  locale: string;
  t: Messages;
  industries: Industry[];
  onOpen: (detail: Detail) => void;
  onRequest: (formValue: string) => void;
};

export default function Industries({ locale, t, industries, onOpen, onRequest }: Props) {
  return (
    <section id="obory">
      <div className="container">
        <SectionHead label={t.industriesLabel} title={t.industriesTitle}>{t.industriesBody}</SectionHead>

        <div className="services-grid">
          {industries.map((industry, index) => (
            <OfferCard key={industry.formValue} index={index} className="industry-card" title={industry.name}
              description={industry.description} chips={industry.chips} priceLabel={industry.priceLabel}
              price={industry.price} linkLabel={t.exampleLink} onOpen={() => onOpen(industry)}
              top={<span className="industry-audience">{industry.audience}</span>} />
          ))}
        </div>

        <SavingsCalculator locale={locale} t={t} onRequest={onRequest} />
      </div>
    </section>
  );
}
