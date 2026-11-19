"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import serviceDefinitions from "./services.json";
import { locales, localePaths } from "./locales";

export default function Home({ locale, t }) {
  const services = serviceDefinitions.map((definition, index) => ({ ...definition, ...t.services[index] }));
  const [filter, setFilter] = useState("all");
  const [detail, setDetail] = useState(null);
  const [picked, setPicked] = useState(null);
  const formUrl = new URL("https://form.jotform.com/262923259893067");
  if (locale !== "cs") formUrl.searchParams.set("language", locale);
  if (picked) formUrl.searchParams.set("sluzba", picked.formValue);

  useEffect(() => {
    if (!detail) return;
    const handleEscape = (event) => {
      if (event.key === "Escape") setDetail(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [detail]);

  function pickService(name, formValue) {
    setPicked({ name, formValue });
    document.getElementById("poptavka").scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <header className="nav">
          <div className="container nav-inner">
            <a className="brand" href="#top" aria-label="Asterion Software">
              <span className="brand-mark"></span>
              <span>Asterion Software</span>
            </a>
            <nav className="nav-links">
              <a href="#sluzby">{t.servicesNav}</a>
              <a href="#reference">{t.references}</a>
              <a href="#skoleni">{t.trainingNav}</a>
              <a href="#o-nas">{t.aboutNav}</a>
              <a href="#faq">FAQ</a>
              <a className="nav-cta" href="#poptavka">{t.contactNav}</a>
              <div className="language-switch" role="group" aria-label={t.language}>
                {locales.map((language) => (
                  <a key={language} href={localePaths[language]} hrefLang={language} lang={language}
                    aria-current={locale === language ? "page" : undefined}>
                    {language.toUpperCase()}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </header>

        <main id="top">
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
                  <div className="preview-item">
                    <strong>{t.services[0].name}</strong>
                    <div className="preview-meta"><span>{t.services[0].chips[0]}</span><span>{t.services[0].price}</span></div>
                  </div>
                  <div className="preview-item">
                    <strong>{t.services[1].name}</strong>
                    <div className="preview-meta"><span>{t.analysisDelivery}</span><span>{t.services[1].price}</span></div>
                  </div>
                  <div className="preview-item">
                    <strong>{t.services[5].name}</strong>
                    <div className="preview-meta"><span>{t.javaScope}</span><span>{t.services[5].price}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="strip">
            <div className="container strip-grid">
              <div className="strip-item"><strong>{t.seniorTitle}</strong><span>{t.seniorBody}</span></div>
              <div className="strip-item"><strong>{t.practicalTitle}</strong><span>{t.practicalBody}</span></div>
              <div className="strip-item"><strong>{t.businessTitle}</strong><span>{t.businessBody}</span></div>
              <div className="strip-item"><strong>{t.deliveryTitle}</strong><span>{t.deliveryBody}</span></div>
            </div>
          </div>

          <section id="sluzby">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="eyebrow">{t.servicesLabel}</div>
                  <h2>{t.servicesTitle}</h2>
                </div>
                <p>{t.servicesBody}</p>
              </div>

              <div className="filter-row" id="filters">
                <button type="button" className={filter === 'all' ? 'filter-btn active' : 'filter-btn'} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>{t.all}</button>
                <button type="button" className={filter === 'ai' ? 'filter-btn active' : 'filter-btn'} aria-pressed={filter === 'ai'} onClick={() => setFilter('ai')}>{t.ai}</button>
                <button type="button" className={filter === 'dev' ? 'filter-btn active' : 'filter-btn'} aria-pressed={filter === 'dev'} onClick={() => setFilter('dev')}>{t.dev}</button>
                <button type="button" className={filter === 'consulting' ? 'filter-btn active' : 'filter-btn'} aria-pressed={filter === 'consulting'} onClick={() => setFilter('consulting')}>{t.consulting}</button>
              </div>

              <div className="services-grid" id="servicesGrid">
                {services.filter((service) => filter === "all" || service.categories.includes(filter))
                  .map((service) => (
                    <article className="service-card" key={service.formValue}>
                      <img className="service-icon" src={service.icon} width="96" height="96" alt="" loading="lazy" decoding="async" />
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <div className="chips">
                        {service.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}
                      </div>
                      <div className="service-bottom">
                        <div className="price"><small>{service.priceLabel}</small><strong>{service.price}</strong></div>
                        <button type="button" className="text-link" onClick={() => setDetail(service)}>{t.details}</button>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          </section>

          <section id="reference">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="eyebrow">{t.references}</div>
                  <h2>{t.workTitle}</h2>
                </div>
                <p>{t.workIntro}</p>
              </div>

              <div className="case-study">
                <div className="case-visual">
                  <div className="browserbar"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
                  <div className="fake-ui">
                    <div className="fake-side"><div></div><div></div><div></div><div></div><div></div></div>
                    <div className="fake-main">
                      <h4>Studijo</h4>
                      <div className="fake-message">{t.studioPreview}</div>
                      <div className="fake-message">{t.studioTools}</div>
                    </div>
                  </div>
                </div>
                <div className="case-copy">
                  <span className="badge">{t.ownProduct}</span>
                  <h3>Studijo</h3>
                  <p>{t.studioDescription}</p>
                  <div className="stats">
                    <div className="stat"><strong>{t.multiModel}</strong><span>{t.modelExamples}</span></div>
                    <div className="stat"><strong>Media pipeline</strong><span>{t.mediaTypes}</span></div>
                    <div className="stat"><strong>SaaS backend</strong><span>{t.backendParts}</span></div>
                    <div className="stat"><strong>{t.integration}</strong><span>{t.integrationParts}</span></div>
                  </div>
                  <a className="btn btn-secondary" href="https://studijo.io" target="_blank" rel="noopener">{t.openStudio}</a>
                </div>
              </div>
            </div>
          </section>

          <section id="skoleni">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="eyebrow">{t.trainingLabel}</div>
                  <h2>{t.trainingTitle}</h2>
                </div>
                <p>{t.trainingIntro}</p>
              </div>
              <div className="training-grid">
                <div className="training-card">
                  <span className="duration">{t.threeHours}</span>
                  <h3>AI Start</h3>
                  <ul><li>ChatGPT / Claude</li><li>{t.prompting}</li><li>{t.research}</li><li>{t.safety}</li></ul>
                  <button className="btn btn-secondary" onClick={() => pickService(t.trainingLabel + " — " + 'AI Start', "Firemní školení — AI Start")}>{t.request}</button>
                </div>
                <div className="training-card">
                  <span className="duration">{t.oneDay}</span>
                  <h3>{t.practicalTraining}</h3>
                  <ul><li>{t.workExamples}</li><li>{t.routine}</li><li>{t.workflows}</li><li>{t.trainingQuestions}</li></ul>
                  <button className="btn btn-secondary" onClick={() => pickService(t.trainingLabel + " — " + t.practicalTraining, "Firemní školení — AI Prakticky")}>{t.request}</button>
                </div>
                <div className="training-card">
                  <span className="duration">{t.oneDay}</span>
                  <h3>Automation Workshop</h3>
                  <ul><li>{t.processMapping}</li><li>{t.selectAutomation}</li><li>{t.solutionDesign}</li><li>{t.implementationPlan}</li></ul>
                  <button className="btn btn-secondary" onClick={() => pickService(t.trainingLabel + " — " + 'Automation Workshop', "Firemní školení — Automation Workshop")}>{t.request}</button>
                </div>
              </div>
            </div>
          </section>

          <section id="o-nas">
            <div className="container about-grid">
              <div className="portrait" style={{ placeItems: "stretch", textAlign: "left" }}>
                <div>
                  <div className="person">
                    <div className="person-avatar" aria-hidden="true">JM</div>
                    <div>
                      <strong>Jan Marcis</strong>
                      <span>{t.founder}</span>
                      <a href="https://www.linkedin.com/in/jan-marcis-b8335111/" className="person-link" target="_blank" rel="noopener">LinkedIn ↗</a>
                    </div>
                  </div>
                  <strong style={{ fontSize: "20px", color: "white", display: "block" }}>Asterion Software, s.r.o.</strong>
                  <span style={{ fontSize: "13px" }}>{t.companyId}: 10736697 · {t.vatId}: CZ10736697</span>
                  <div className="contact-list">
                    <div className="contact-row">
                      <svg className="contact-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <div><small>{t.phone}</small><a href="tel:+420604257866">+420 604 257 866</a></div>
                    </div>
                    <div className="contact-row">
                      <svg className="contact-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <div><small>{t.addressLabel}</small>Bělehradská 858/23, 120 00 Praha 2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-copy">
                <div className="eyebrow">{t.aboutLabel}</div>
                <h2>{t.aboutTitle}</h2>
                <p>{t.aboutIntro}</p>
                <p>{t.aboutBody}</p>
                <div className="stack"><span className="chip">Java</span><span className="chip">Spring Boot</span><span className="chip">PostgreSQL</span><span className="chip">Docker</span><span className="chip">Azure</span><span className="chip">LLM API</span><span className="chip">RAG</span><span className="chip">AI workflow</span></div>
                <figure className="about-visual">
                  <img src="/img/ai-flow.webp" width="1400" height="799" alt={t.diagramAlt} loading="lazy" decoding="async" />
                </figure>
              </div>
            </div>
          </section>

          <section id="faq">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="eyebrow">{t.faqLabel}</div>
                  <h2>{t.faqTitle}</h2>
                </div>
                <p>{t.faqIntro}</p>
              </div>
              <div className="faq-list">
                <details className="faq-item">
                  <summary>{t.auditQuestion}</summary>
                  <p>{t.auditAnswer}</p>
                </details>
                <details className="faq-item">
                  <summary>{t.assistantQuestion}</summary>
                  <p>{t.assistantAnswer}</p>
                </details>
                <details className="faq-item">
                  <summary>{t.processQuestion}</summary>
                  <p>{t.processAnswer}</p>
                </details>
                <details className="faq-item">
                  <summary>{t.contactQuestion}</summary>
                  <p>{t.contactAnswer}</p>
                </details>
                <details className="faq-item">
                  <summary>{t.excelQuestion}</summary>
                  <p>{t.excelAnswer}</p>
                </details>
                <details className="faq-item">
                  <summary>{t.trainingQuestion}</summary>
                  <p>{t.trainingAnswer}</p>
                </details>
                <details className="faq-item">
                  <summary>{t.ideaQuestion}</summary>
                  <p>{t.ideaAnswer}</p>
                </details>
              </div>
            </div>
          </section>

          <section id="poptavka">
            <div className="container">
              <div className="cta-box">
                <div>
                  <div className="eyebrow">{t.contactLabel}</div>
                  <h2>{t.contactTitle}</h2>
                  <p>{t.contactBody}</p>
                  <p>{t.call}{" "}<a href="tel:+420604257866" style={{ color: "white", fontWeight: "700" }}>+420 604 257 866</a></p>
                </div>
                <div className="jotform-slot">
                  <div className={picked ? 'picked show' : 'picked'}>{t.selected}{" "}<strong>{picked?.name}</strong> <button type="button" onClick={() => setPicked(null)}>{t.clear}</button></div>
                  <iframe id="jotform" className="jotform-frame" title={t.formTitle}
                          src={formUrl.toString()} loading="lazy"
                          allow="geolocation; microphone; camera; fullscreen" scrolling="no"></iframe>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="container footer-inner">
            <div>© 2026 Asterion Software, s.r.o. · {t.companyId}: 10736697 · Bělehradská 858/23, 120 00 Praha 2</div>
            <div className="footer-links">
              <a href="tel:+420604257866">+420 604 257 866</a>
              <a href="https://studijo.io" target="_blank" rel="noopener">studijo.io</a>
            </div>
          </div>
        </footer>

        <div className={detail ? 'modal open' : 'modal'} aria-hidden={!detail}
            role="dialog" aria-modal={detail ? true : undefined} aria-labelledby="modalTitle"
            onClick={(event) => { if (event.target === event.currentTarget) setDetail(null); }}>
          <div className="modal-card">
            <div className="modal-head">
              <div>
                <span className="badge">{t.detailLabel}</span>
                <h2 id="modalTitle" style={{ margin: "12px 0 6px" }}>{detail?.name}</h2>
                <strong>{detail?.price}</strong>
              </div>
              <button className="modal-close" onClick={() => setDetail(null)} aria-label={t.close}>×</button>
            </div>
            <p>{detail?.description}</p>
            <h3>{t.deliverable}</h3>
            <ul>
              <li>{t.deliverableGoal}</li>
              <li>{t.deliverableScope}</li>
              <li>{t.deliverableResult}</li>
              <li>{t.deliverableFollowUp}</li>
            </ul>
            <button className="btn btn-primary" onClick={() => { pickService(detail.name, detail.formValue); setDetail(null); }}>{t.requestService}</button>
          </div>
        </div>
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        onReady={() => window.jotformEmbedHandler("iframe[id='jotform']", "https://form.jotform.com/")}
      />
    </>
  );
}
