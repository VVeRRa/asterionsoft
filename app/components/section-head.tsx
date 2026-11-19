import type { ReactNode } from "react";

type Props = { label: ReactNode; title: ReactNode; children?: ReactNode };

/** Hlavička sekce: štítek (eyebrow) a nadpis vlevo, úvodní odstavec vpravo. */
export default function SectionHead({ label, title, children }: Props) {
  return (
    <div className="section-head">
      <div>
        <div className="eyebrow">{label}</div>
        <h2>{title}</h2>
      </div>
      <p>{children}</p>
    </div>
  );
}
