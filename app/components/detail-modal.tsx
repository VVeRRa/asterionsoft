"use client";

import { useEffect } from "react";
import type { Detail } from "../catalog";
import type { Messages } from "../messages";

type Props = {
  t: Messages;
  detail: Detail | null;
  onClose: () => void;
  onRequest: (formValue: string) => void;
};

/** Detail modal for a service or industry solution. Closes via the × button, a click outside the card, or Escape. */
export default function DetailModal({ t, detail, onClose, onRequest }: Props) {
  useEffect(() => {
    if (!detail) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [detail, onClose]);

  return (
    <div className={detail ? "modal open" : "modal"} aria-hidden={!detail}
        role="dialog" aria-modal={detail ? true : undefined} aria-labelledby="modalTitle"
        onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="modal-card">
        <div className="modal-head">
          <div>
            <span className="badge">{t.detailLabel}</span>
            <h2 id="modalTitle" style={{ margin: "0.75rem 0 0.375rem" }}>{detail?.name}</h2>
            <strong>{detail?.price}</strong>{detail && <small className="modal-vat">{t.vatExcluded}</small>}
          </div>
          <button className="modal-close" onClick={onClose} aria-label={t.close}>×</button>
        </div>
        <p>{detail?.description}</p>
        <h3>{detail?.scope ? t.scopeLabel : t.deliverable}</h3>
        <ul>
          {(detail?.scope ?? [t.deliverableGoal, t.deliverableScope, t.deliverableResult, t.deliverableFollowUp])
            .map((item) => <li key={item}>{item}</li>)}
        </ul>
        {detail?.example && (
          <div className="example-box">
            <span className="badge badge-orange">{t.exampleLabel}</span>
            <p>{detail.example}</p>
            <small>{t.exampleNote}</small>
          </div>
        )}
        <button className="btn btn-primary modal-cta" onClick={() => { if (detail) onRequest(detail.formValue); onClose(); }}>{t.requestService}</button>
      </div>
    </div>
  );
}
