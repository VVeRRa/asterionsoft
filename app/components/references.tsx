import { company } from "../company";
import type { Messages } from "../messages";
import SectionHead from "./section-head";

export default function References({ t }: { t: Messages }) {
  const stats = [
    [t.multiModel, t.modelExamples],
    ["Media pipeline", t.mediaTypes],
    ["SaaS backend", t.backendParts],
    [t.integration, t.integrationParts],
  ];

  return (
    <section id="reference">
      <div className="container">
        <SectionHead label={t.references} title={t.workTitle}>{t.workIntro}</SectionHead>

        <div className="case-study reveal">
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
              {stats.map(([title, body]) => <div className="stat" key={title}><strong>{title}</strong><span>{body}</span></div>)}
            </div>
            <a className="btn btn-secondary" href={company.studioUrl} target="_blank" rel="noopener">{t.openStudio}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
