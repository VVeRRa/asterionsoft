"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import services from "./services.json";
import structuredData from "./structured-data.json";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [detail, setDetail] = useState(null);
  const [picked, setPicked] = useState(null);
  const formUrl = new URL("https://form.jotform.com/262923259893067");
  if (picked) formUrl.searchParams.set("sluzba", picked);

  useEffect(() => {
    if (!detail) return;
    const handleEscape = (event) => {
      if (event.key === "Escape") setDetail(null);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [detail]);

  function pickService(name) {
    setPicked(name);
    document.getElementById("poptavka").scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <header className="nav">
          <div className="container nav-inner">
            <a className="brand" href="#top" aria-label="Asterion Software">
              <span className="brand-mark"></span>
              <span>Asterion Software</span>
            </a>
            <nav className="nav-links">
              <a href="#sluzby">Služby</a>
              <a href="#skoleni">Školení AI</a>
              <a href="#reference">Reference</a>
              <a href="#o-nas">O nás</a>
              <a href="#faq">FAQ</a>
              <a className="nav-cta" href="#poptavka">Nezávazná poptávka</a>
            </nav>
          </div>
        </header>

        <main id="top">
          <section className="hero">
            <div className="container hero-grid">
              <div>
                <div className="eyebrow"><span className="eyebrow-dot"></span> Vývoj software • AI • automatizace • školení</div>
                <h1><span className="gradient-text">AI, automatizace a vývoj aplikací</span> pro firmy<span className="accent-dot">.</span></h1>
                <p><strong style={{ color: "white" }}>Software služby trochu jinak.</strong> Vyberte si konkrétní problém, který chcete vyřešit. Od AI auditu a automatizace po vývoj webové aplikace, integraci LLM nebo firemní školení.</p>
                <div className="hero-actions">
                  <a className="btn btn-primary" href="#sluzby">Prohlédnout služby ↓</a>
                  <a className="btn btn-secondary" href="#poptavka">Mám vlastní zadání</a>
                </div>
              </div>

              <div className="hero-card" aria-label="Ukázka katalogu služeb">
                <div className="mini-top">
                  <strong>Katalog služeb</strong>
                  <span className="badge badge-orange">bez košíku :)</span>
                </div>
                <div className="service-preview">
                  <div className="preview-item">
                    <strong>AI audit firmy</strong>
                    <div className="preview-meta"><span>1–2 dny</span><span>od 14 900 Kč</span></div>
                  </div>
                  <div className="preview-item">
                    <strong>Automatizace firemního procesu</strong>
                    <div className="preview-meta"><span>analýza + implementace</span><span>individuálně</span></div>
                  </div>
                  <div className="preview-item">
                    <strong>Java / Spring konzultace</strong>
                    <div className="preview-meta"><span>architektura, výkon, legacy</span><span>od 2 500 Kč/h</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="strip">
            <div className="container strip-grid">
              <div className="strip-item"><strong>Seniorní vývoj</strong><span>Bez přeposílání práce juniorům.</span></div>
              <div className="strip-item"><strong>AI prakticky</strong><span>Ne demo, ale reálné workflow.</span></div>
              <div className="strip-item"><strong>B2B fokus</strong><span>Úspora času, nákladů nebo růst tržeb.</span></div>
              <div className="strip-item"><strong>Od MVP po produkci</strong><span>Architektura, backend, integrace, provoz.</span></div>
            </div>
          </div>

          <section id="sluzby">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="eyebrow">„E‑shop“ služeb</div>
                  <h2>Co si u nás můžete objednat</h2>
                </div>
                <p>Každá služba má jasný výstup. Pokud se nevejdete do škatulky, dole je obecný poptávkový formulář.</p>
              </div>

              <div className="filter-row" id="filters">
                <button type="button" className={filter === 'all' ? 'filter-btn active' : 'filter-btn'} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>Vše</button>
                <button type="button" className={filter === 'ai' ? 'filter-btn active' : 'filter-btn'} aria-pressed={filter === 'ai'} onClick={() => setFilter('ai')}>AI</button>
                <button type="button" className={filter === 'dev' ? 'filter-btn active' : 'filter-btn'} aria-pressed={filter === 'dev'} onClick={() => setFilter('dev')}>Vývoj</button>
                <button type="button" className={filter === 'consulting' ? 'filter-btn active' : 'filter-btn'} aria-pressed={filter === 'consulting'} onClick={() => setFilter('consulting')}>Konzultace</button>
              </div>

              <div className="services-grid" id="servicesGrid">
                {services.filter((service) => filter === "all" || service.categories.includes(filter))
                  .map((service) => (
                    <article className="service-card" key={service.name}>
                      <img className="service-icon" src={service.icon} width="96" height="96" alt="" loading="lazy" decoding="async" />
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>
                      <div className="chips">
                        {service.chips.map((chip) => <span className="chip" key={chip}>{chip}</span>)}
                      </div>
                      <div className="service-bottom">
                        <div className="price"><small>{service.priceLabel}</small><strong>{service.price}</strong></div>
                        <button type="button" className="text-link" onClick={() => setDetail(service)}>Detail →</button>
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
                  <div className="eyebrow">Reference</div>
                  <h2>Co jsme postavili</h2>
                </div>
                <p>Nejlepší důkaz je běžící produkt. Studijo jsme navrhli, naprogramovali a sami ho provozujeme — od architektury po billing.</p>
              </div>

              <div className="case-study">
                <div className="case-visual">
                  <div className="browserbar"><span className="dot"></span><span className="dot"></span><span className="dot"></span></div>
                  <div className="fake-ui">
                    <div className="fake-side"><div></div><div></div><div></div><div></div><div></div></div>
                    <div className="fake-main">
                      <h4>Studijo</h4>
                      <div className="fake-message">Generování textu, obrázků, videa, voiceoveru, dokumentového kontextu a dalších AI workflow na jednom místě.</div>
                      <div className="fake-message">Více modelů, kreditní systém, asynchronní úlohy, integrace externích AI služeb.</div>
                    </div>
                  </div>
                </div>
                <div className="case-copy">
                  <span className="badge">Vlastní produkt</span>
                  <h3>Studijo</h3>
                  <p>AI content studio, kde z jednoho zadání vzniká text, grafika, voiceover, video, překlady i kurzy. Komplexní SaaS s více AI modely, asynchronním zpracováním a vlastním kreditním systémem — stejné stavební bloky, jaké používáme v projektech pro klienty.</p>
                  <div className="stats">
                    <div className="stat"><strong>Multi‑model AI</strong><span>GPT, Claude, Gemini a další</span></div>
                    <div className="stat"><strong>Media pipeline</strong><span>text, obraz, hlas, video</span></div>
                    <div className="stat"><strong>SaaS backend</strong><span>uživatelé, kredity, billing</span></div>
                    <div className="stat"><strong>Integrace</strong><span>externí API a asynchronní joby</span></div>
                  </div>
                  <a className="btn btn-secondary" href="https://studijo.io" target="_blank" rel="noopener">Otevřít studijo.io ↗</a>
                </div>
              </div>
            </div>
          </section>

          <section id="skoleni">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="eyebrow">Firemní školení</div>
                  <h2>AI dovednosti pro zaměstnance</h2>
                </div>
                <p>Ne obecná přednáška o budoucnosti AI. Praktické používání nástrojů na konkrétních pracovních situacích.</p>
              </div>
              <div className="training-grid">
                <div className="training-card">
                  <span className="duration">3 hodiny</span>
                  <h3>AI Start</h3>
                  <ul><li>ChatGPT / Claude</li><li>prompting a dokumenty</li><li>research a shrnutí</li><li>bezpečnost a limity</li></ul>
                  <button className="btn btn-secondary" onClick={() => pickService("Firemní školení — AI Start")}>Poptat</button>
                </div>
                <div className="training-card">
                  <span className="duration">1 den</span>
                  <h3>AI Prakticky</h3>
                  <ul><li>pracovní use‑cases</li><li>automatizace rutiny</li><li>tvorba vlastních workflow</li><li>Q&A nad vaší agendou</li></ul>
                  <button className="btn btn-secondary" onClick={() => pickService("Firemní školení — AI Prakticky")}>Poptat</button>
                </div>
                <div className="training-card">
                  <span className="duration">1 den</span>
                  <h3>Automation Workshop</h3>
                  <ul><li>mapování procesů</li><li>výběr vhodné automatizace</li><li>návrh řešení</li><li>roadmapa implementace</li></ul>
                  <button className="btn btn-secondary" onClick={() => pickService("Firemní školení — Automation Workshop")}>Poptat</button>
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
                      <span>Zakladatel a senior vývojář</span>
                      <a href="https://www.linkedin.com/in/jan-marcis-b8335111/" className="person-link" target="_blank" rel="noopener">LinkedIn ↗</a>
                    </div>
                  </div>
                  <strong style={{ fontSize: "20px", color: "white", display: "block" }}>Asterion Software, s.r.o.</strong>
                  <span style={{ fontSize: "13px" }}>IČ: 10736697 · DIČ: CZ10736697</span>
                  <div className="contact-list">
                    <div className="contact-row">
                      <svg className="contact-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <div><small>Telefon</small><a href="tel:+420604257866">+420 604 257 866</a></div>
                    </div>
                    <div className="contact-row">
                      <svg className="contact-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      <div><small>Sídlo</small>Bělehradská 858/23, 120 00 Praha 2</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-copy">
                <div className="eyebrow">Malé studio, seniorní zkušenost</div>
                <h2>Bez sales vrstvy mezi vámi a člověkem, který řešení staví.</h2>
                <p>Asterion Software je malé vývojářské studio zaměřené na backendové systémy, AI integrace a automatizaci. U menších a středních projektů klient komunikuje přímo se seniorním vývojářem.</p>
                <p>To je vhodné hlavně tam, kde je potřeba rychle pochopit problém, navrhnout pragmatické řešení a nevytvářet zbytečnou procesní režii.</p>
                <div className="stack"><span className="chip">Java</span><span className="chip">Spring Boot</span><span className="chip">PostgreSQL</span><span className="chip">Docker</span><span className="chip">Azure</span><span className="chip">LLM API</span><span className="chip">RAG</span><span className="chip">AI workflow</span></div>
                <figure className="about-visual">
                  <img src="/img/ai-flow.webp" width="1400" height="799" alt="Schéma: dokumenty, data, média a API vstupují do AI, která z nich vytváří automatizace, přehledy a akce" loading="lazy" decoding="async" />
                </figure>
              </div>
            </div>
          </section>

          <section id="faq">
            <div className="container">
              <div className="section-head">
                <div>
                  <div className="eyebrow">Časté otázky</div>
                  <h2>Na co se klienti ptají</h2>
                </div>
                <p>Nenašli jste odpověď? Napište nebo zavolejte na +420 604 257 866.</p>
              </div>
              <div className="faq-list">
                <details className="faq-item">
                  <summary>Kolik stojí AI audit firmy?</summary>
                  <p>AI audit firmy stojí od 14 900 Kč a trvá 1–2 dny. Projdeme vaše procesy, najdeme místa, kde AI nebo automatizace reálně šetří čas či náklady, a výstupem je report s doporučeními a roadmapou dalších kroků.</p>
                </details>
                <details className="faq-item">
                  <summary>Kolik stojí interní AI asistent nad firemními dokumenty?</summary>
                  <p>Pilotní verze interního AI asistenta stojí od 35 000 Kč. Výsledná cena závisí hlavně na počtu a typu zdrojů dat, potřebných integracích a nastavení přístupových práv. Asistent odpovídá nad vaší dokumentací a u odpovědí uvádí zdroje.</p>
                </details>
                <details className="faq-item">
                  <summary>Jak probíhá spolupráce?</summary>
                  <p>Začínáme krátkou nezávaznou konzultací, kde upřesníme cíl. Pak navrhneme řešení a rozsah s jasně definovaným výstupem. Po dodání můžeme navázat další implementací nebo dlouhodobou spoluprací.</p>
                </details>
                <details className="faq-item">
                  <summary>S kým budu během projektu komunikovat?</summary>
                  <p>Přímo se seniorním vývojářem, který řešení navrhuje a staví. Mezi vámi a vývojem není žádná obchodní ani projektová mezivrstva, takže otázky se řeší rychle a bez tichých telefonů.</p>
                </details>
                <details className="faq-item">
                  <summary>Můžete převést firemní Excel na aplikaci?</summary>
                  <p>Ano. Kritickou tabulku nebo ruční agendu převedeme na webovou aplikaci s uživateli, oprávněními a historií změn. Typicky od 45 000 Kč podle složitosti datového modelu a workflow.</p>
                </details>
                <details className="faq-item">
                  <summary>Pro koho je firemní školení AI?</summary>
                  <p>Pro zaměstnance, kteří chtějí AI používat v běžné práci — bez nutnosti technického zázemí. Nabízíme tříhodinový AI Start, celodenní AI Prakticky na vašich pracovních situacích a Automation Workshop pro mapování procesů.</p>
                </details>
                <details className="faq-item">
                  <summary>Mám jen nápad, ne hotové zadání. Je to problém?</summary>
                  <p>Není. Popište situaci vlastními slovy v poptávkovém formuláři nebo zavolejte. Odpovím, zda je to vhodné zadání pro Asterion, a navrhnu další krok.</p>
                </details>
              </div>
            </div>
          </section>

          <section id="poptavka">
            <div className="container">
              <div className="cta-box">
                <div>
                  <div className="eyebrow">Obecná poptávka</div>
                  <h2>Máte problém, ale nevíte, do které krabičky patří?</h2>
                  <p>Popište situaci vlastními slovy. Odpovím, zda je to vhodné zadání pro Asterion, a navrhnu další krok.</p>
                  <p>Raději voláte? <a href="tel:+420604257866" style={{ color: "white", fontWeight: "700" }}>+420 604 257 866</a></p>
                </div>
                <div className="jotform-slot">
                  <div className={picked ? 'picked show' : 'picked'}>Vybraná služba: <strong>{picked}</strong> <button type="button" onClick={() => setPicked(null)}>zrušit</button></div>
                  <iframe id="jotform" className="jotform-frame" title="Poptávkový formulář Asterion Software"
                          src={formUrl.toString()} loading="lazy"
                          allow="geolocation; microphone; camera; fullscreen" scrolling="no"></iframe>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="container footer-inner">
            <div>© 2026 Asterion Software, s.r.o. · IČ: 10736697 · Bělehradská 858/23, 120 00 Praha 2</div>
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
                <span className="badge">Detail služby</span>
                <h2 id="modalTitle" style={{ margin: "12px 0 6px" }}>{detail?.name}</h2>
                <strong>{detail?.price}</strong>
              </div>
              <button className="modal-close" onClick={() => setDetail(null)} aria-label="Zavřít">×</button>
            </div>
            <p>{detail?.description}</p>
            <h3>Typický výstup</h3>
            <ul>
              <li>krátká vstupní konzultace a upřesnění cíle,</li>
              <li>návrh řešení a rozsahu,</li>
              <li>jasně definovaný výstup bez zbytečné agenturní režie,</li>
              <li>možnost navázat implementací nebo dlouhodobou spoluprací.</li>
            </ul>
            <button className="btn btn-primary" onClick={() => { pickService(detail.name); setDetail(null); }}>Poptat tuto službu</button>
          </div>
        </div>
      <Script
        src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"
        onReady={() => window.jotformEmbedHandler("iframe[id='jotform']", "https://form.jotform.com/")}
      />
    </>
  );
}
