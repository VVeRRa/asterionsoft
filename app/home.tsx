"use client";

import { useCallback, useState } from "react";
import { catalogFor, type Category, type Detail } from "./catalog";
import type { Locale } from "./locales";
import type { Messages } from "./messages";
import { useReveal } from "./reveal";
import About from "./components/about";
import Contact from "./components/contact";
import DetailModal from "./components/detail-modal";
import Faq from "./components/faq";
import Hero from "./components/hero";
import Industries from "./components/industries";
import References from "./components/references";
import ServiceCatalog from "./components/service-catalog";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import Trainings from "./components/trainings";

export default function Home({ locale, t }: { locale: Locale; t: Messages }) {
  const { services, industries, serviceOptions } = catalogFor(t);
  const [filter, setFilter] = useState<Category>("all");
  const [detail, setDetail] = useState<Detail | null>(null);
  const [pickedService, setPickedService] = useState("");
  const closeDetail = useCallback(() => setDetail(null), []);

  // Filtr vykreslí nové karty služeb, proto se při jeho změně znovu hledají prvky k odhalení.
  useReveal([filter]);

  /** Předvyplní službu v poptávkovém formuláři a sjede k němu. */
  function pickService(formValue: string) {
    setPickedService(formValue);
    document.getElementById("poptavka")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <SiteHeader locale={locale} t={t} />

      <main id="top">
        <Hero t={t} />
        <ServiceCatalog t={t} services={services} filter={filter} onFilterChange={setFilter} onOpen={setDetail} />
        <Industries locale={locale} t={t} industries={industries} onOpen={setDetail} onRequest={pickService} />
        <References t={t} />
        <Trainings t={t} onRequest={pickService} />
        <About t={t} />
        <Faq t={t} />
        <Contact locale={locale} t={t} options={serviceOptions} service={pickedService} onServiceChange={setPickedService} />
      </main>

      <SiteFooter t={t} />

      <DetailModal t={t} detail={detail} onClose={closeDetail} onRequest={pickService} />
    </>
  );
}
