"use client";

import { useState, type ReactNode } from "react";
import type { Messages } from "../messages";

/** Share of time automation typically saves (the pilot's target). */
const savingShare = 2 / 3;

type Inputs = { cases: number; minutes: number; rate: number };

type Props = { locale: string; t: Messages; onRequest: (formValue: string) => void };

export default function SavingsCalculator({ locale, t, onRequest }: Props) {
  const [calc, setCalc] = useState<Inputs>({ cases: 60, minutes: 30, rate: 600 });
  const number = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
  const hoursNow = (calc.cases * calc.minutes) / 60;
  const hoursSaved = hoursNow * savingShare;

  const fields: { key: keyof Inputs; label: ReactNode; step: string }[] = [
    { key: "cases", label: t.calcCases, step: "1" },
    { key: "minutes", label: t.calcMinutes, step: "1" },
    { key: "rate", label: <>{t.calcRate} ({t.calcCurrency})</>, step: "50" },
  ];

  return (
    <div className="calculator reveal" id="kalkulacka">
      <div>
        <div className="eyebrow">{t.calcLabel}</div>
        <h3>{t.calcTitle}</h3>
        <p>{t.calcBody}</p>
      </div>
      <div className="calc-body">
        <div className="calc-inputs">
          {fields.map(({ key, label, step }) => (
            <label key={key}><span>{label}</span>
              <input type="number" min="0" step={step} inputMode="numeric" value={calc[key]}
                onChange={(event) => setCalc({ ...calc, [key]: Math.max(0, Number(event.target.value) || 0) })} /></label>
          ))}
        </div>
        <div className="calc-results" aria-live="polite">
          <div className="stat"><span>{t.calcHoursNow}</span><strong>{number.format(hoursNow)} {t.calcPerMonth}</strong></div>
          <div className="stat calc-highlight"><span>{t.calcSaved}</span>
            <strong>{number.format(hoursSaved)} {t.calcPerMonth}</strong>
            <span>≈ {number.format(hoursSaved * calc.rate * 12)} {t.calcCurrency} {t.calcPerYear}</span></div>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => onRequest("Automatizace firemního procesu")}>{t.calcCta}</button>
      </div>
    </div>
  );
}
