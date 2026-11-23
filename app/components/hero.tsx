import type { Messages } from "../messages";

export default function Hero({ t }: { t: Messages }) {
  const preview = [
    { service: t.industries[0], meta: t.industries[0].priceLabel },
    { service: t.services[0], meta: t.services[0].priceLabel },
    { service: t.services[10], meta: t.services[10].priceLabel },
  ];
  const highlights = [
    [t.seniorTitle, t.seniorBody],
    [t.practicalTitle, t.practicalBody],
    [t.businessTitle, t.businessBody],
    [t.deliveryTitle, t.deliveryBody],
  ];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot"></span>{" "}{t.heroLabel}</div>
            <h1><span className="gradient-text">{t.heroTitle}</span>{" "}{t.heroAudience}<span className="accent-dot">.</span></h1>
            <p><strong style={{ color: "white" }}>{t.heroLead}</strong>{" "}{t.heroBody}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#sluzby">{t.browse}</a>
              <a className="btn btn-secondary" href="#poptavka">{t.ownBrief}</a>
            </div>
          </div>

          <div className="hero-card" aria-label={t.catalogAlt}>
            <div className="mini-top">
              <strong>{t.catalog}</strong>
              <span className="badge badge-orange">{t.catalogBadge}</span>
            </div>
            <div className="service-preview">
              {preview.map(({ service, meta }) => (
                <div className="preview-item" key={service.name}>
                  <strong>{service.name}</strong>
                  <div className="preview-meta"><span>{meta}</span><span>{service.price}</span></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="container strip-grid">
          {highlights.map(([title, body]) => (
            <div className="strip-item" key={title}><strong>{title}</strong><span>{body}</span></div>
          ))}
        </div>
      </div>
    </>
  );
}
