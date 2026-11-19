import { trainings } from "../catalog";
import type { Messages } from "../messages";
import { revealStyle } from "../reveal";
import SectionHead from "./section-head";

export default function Trainings({ t, onRequest }: { t: Messages; onRequest: (formValue: string) => void }) {
  return (
    <section id="skoleni">
      <div className="container">
        <SectionHead label={t.trainingLabel} title={t.trainingTitle}>{t.trainingIntro}</SectionHead>
        <div className="training-grid">
          {trainings.map((training, index) => (
            <div className="training-card reveal" key={training.value} style={revealStyle(index, trainings.length)}>
              <span className="duration">{training.duration(t)}</span>
              <h3>{training.name(t)}</h3>
              <ul>{training.topics(t).map((topic) => <li key={topic}>{topic}</li>)}</ul>
              <button className="btn btn-secondary" onClick={() => onRequest(training.value)}>{t.request}</button>
            </div>
          ))}
        </div>
        <p className="training-note">{t.trainingIndustryNote}</p>
      </div>
    </section>
  );
}
