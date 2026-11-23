import type { Detail, Industry } from "../catalog";
import type { Messages } from "../messages";
import { revealStyle } from "../reveal";
import Chips from "./chips";
import SectionHead from "./section-head";

type Props = {
  t: Messages;
  /** The accounting industry solution – its form value preselects the inquiry form. */
  industry: Industry;
  onOpen: (detail: Detail) => void;
  onRequest: (formValue: string) => void;
};

/** Featured use case for accounting and tax firms, the first sector Asterion focuses on. */
export default function Accounting({ t, industry, onOpen, onRequest }: Props) {
  const a = t.accounting;
  return (
    <div id="ucetni" className="accounting">
      <div className="accounting-inner">
        <SectionHead label={a.label} title={a.title}>{a.intro}</SectionHead>

        <div className="accounting-grid">
          <div className="accounting-panel reveal">
            <h3>{a.problemTitle}</h3>
            <ul className="accounting-list">{a.problems.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>

          <div className="accounting-panel accounting-steps reveal" style={revealStyle(1)}>
            <h3>{a.stepsTitle}</h3>
            <ol>
              {a.steps.map((step) => (
                <li key={step.title}><strong>{step.title}</strong><span>{step.body}</span></li>
              ))}
            </ol>
          </div>
        </div>

        <div className="accounting-panel reveal">
          <h3>{a.principlesTitle}</h3>
          <ul className="accounting-principles">{a.principles.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>

        <h3 className="accounting-subtitle">{a.pricingTitle}</h3>
        <div className="accounting-pricing">
          {a.pricing.map((tile, index) => (
            <div className="accounting-tile reveal" key={tile.title} style={revealStyle(index, a.pricing.length)}>
              <span className="accounting-tile-step">{index + 1}</span>
              <strong>{tile.title}</strong>
              <span className="accounting-tile-price">{tile.price}</span>
              <p>{tile.body}</p>
            </div>
          ))}
        </div>
        <p className="accounting-note">{a.firstOrder}</p>

        <div className="accounting-panel reveal">
          <h3>{a.moreTitle}</h3>
          <p className="accounting-more-intro">{a.moreIntro}</p>
          <Chips items={a.more} className="chips accounting-more" />
        </div>

        <div className="accounting-actions">
          <button type="button" className="btn btn-primary" onClick={() => onRequest(industry.formValue)}>{a.cta}</button>
          <button type="button" className="btn btn-secondary" onClick={() => onOpen(industry)}>{a.example}</button>
        </div>
      </div>
    </div>
  );
}
