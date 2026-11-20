import type { ReactNode } from "react";

type Props = { label: ReactNode; title: ReactNode; children?: ReactNode };

/** Section header: eyebrow label and title on the left, intro paragraph on the right. */
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
