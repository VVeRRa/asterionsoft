import { faqTopics } from "../faq-topics";
import type { Messages } from "../messages";
import SectionHead from "./section-head";

export default function Faq({ t }: { t: Messages }) {
  return (
    <section id="faq">
      <div className="container">
        <SectionHead label={t.faqLabel} title={t.faqTitle}>{t.faqIntro}</SectionHead>
        <div className="faq-list">
          {faqTopics.map((topic) => (
            <details className="faq-item" key={topic}>
              <summary>{t[`${topic}Question`]}</summary>
              <p>{t[`${topic}Answer`]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
