import { company } from "../company";
import type { Messages } from "../messages";
import Chips from "./chips";

const stack = ["Java", "Spring Boot", "PostgreSQL", "Docker", "Azure", "LLM API", "RAG", "AI workflow"];

const iconProps = {
  className: "contact-ico", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round",
} as const;

export default function About({ t }: { t: Messages }) {
  return (
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
            <strong style={{ fontSize: "1.25rem", color: "white", display: "block" }}>{company.name}</strong>
            <span style={{ fontSize: "0.8125rem" }}>{t.companyId}{`: ${company.companyId} · `}{t.vatId}{`: ${company.vatId}`}</span>
            <div className="contact-list">
              <div className="contact-row">
                <svg {...iconProps}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <div><small>{t.phone}</small><a href={company.phoneHref}>{company.phone}</a></div>
              </div>
              <div className="contact-row">
                <svg {...iconProps}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <div><small>{t.addressLabel}</small>{company.address}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-copy">
          <div className="eyebrow">{t.aboutLabel}</div>
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutIntro}</p>
          <p>{t.aboutBody}</p>
          <Chips className="stack" items={stack} />
          <figure className="about-visual">
            <img src="/img/ai-flow.webp" width="1400" height="799" alt={t.diagramAlt} loading="lazy" decoding="async" />
          </figure>
        </div>
      </div>
    </section>
  );
}
