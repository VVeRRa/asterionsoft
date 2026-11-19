import { categories, type Category, type Detail, type Service } from "../catalog";
import type { Messages } from "../messages";
import OfferCard from "./offer-card";
import SectionHead from "./section-head";

type Props = {
  t: Messages;
  services: Service[];
  filter: Category;
  onFilterChange: (filter: Category) => void;
  onOpen: (detail: Detail) => void;
};

export default function ServiceCatalog({ t, services, filter, onFilterChange, onOpen }: Props) {
  const visible = services.filter((service) => filter === "all" || (service.categories as string[]).includes(filter));

  return (
    <section id="sluzby">
      <div className="container">
        <SectionHead label={t.servicesLabel} title={t.servicesTitle}>{t.servicesBody}</SectionHead>

        <div className="filter-row" id="filters">
          {categories.map((category) => (
            <button type="button" key={category} className={filter === category ? "filter-btn active" : "filter-btn"}
              aria-pressed={filter === category} onClick={() => onFilterChange(category)}>{t[category]}</button>
          ))}
        </div>

        <div className="services-grid" id="servicesGrid">
          {visible.map((service, index) => (
            <OfferCard key={service.formValue} index={index} title={service.title} description={service.description}
              chips={service.chips} priceLabel={service.priceLabel} price={service.price}
              linkLabel={t.details} onOpen={() => onOpen(service)}
              top={<img className="service-icon" src={service.icon} width="96" height="96" alt="" loading="lazy" decoding="async" />} />
          ))}
        </div>
      </div>
    </section>
  );
}
