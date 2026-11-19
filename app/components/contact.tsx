import { company } from "../company";
import InquiryForm, { type ServiceOption } from "../inquiry-form";
import type { Locale } from "../locales";
import type { Messages } from "../messages";

type Props = {
  locale: Locale;
  t: Messages;
  options: ServiceOption[];
  service: string;
  onServiceChange: (value: string) => void;
};

export default function Contact({ locale, t, options, service, onServiceChange }: Props) {
  return (
    <section id="poptavka">
      <div className="container">
        <div className="cta-box">
          <div>
            <div className="eyebrow">{t.contactLabel}</div>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactBody}</p>
            <p>{t.call}{" "}<a href={company.phoneHref} style={{ color: "white", fontWeight: "700" }}>{company.phone}</a></p>
          </div>
          <InquiryForm locale={locale} t={t} options={options} service={service} onServiceChange={onServiceChange} />
        </div>
      </div>
    </section>
  );
}
