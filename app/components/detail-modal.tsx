"use client";

import { useEffect, useRef } from "react";
import type { Detail } from "../catalog";
import type { Messages } from "../messages";

type Props = {
  t: Messages;
  detail: Detail | null;
  onClose: () => void;
  onRequest: (formValue: string) => void;
};

/** Detail modal for a service or industry solution. Native `<dialog>` handles focus, inertness, and Escape. */
export default function DetailModal({ t, detail, onClose, onRequest }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (detail) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [detail]);

  // Fallback light-dismiss for browsers without `<dialog closedby="any">` (e.g. Safari).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || "closedBy" in HTMLDialogElement.prototype) return;
    const outside = (event: PointerEvent) => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    };
    let pressedOutside = false;
    const onPointerDown = (event: PointerEvent) => {
      pressedOutside = event.target === dialog && outside(event);
    };
    const onPointerUp = (event: PointerEvent) => {
      if (pressedOutside && event.target === dialog && outside(event)) dialog.close();
    };
    dialog.addEventListener("pointerdown", onPointerDown);
    dialog.addEventListener("pointerup", onPointerUp);
    return () => {
      dialog.removeEventListener("pointerdown", onPointerDown);
      dialog.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  function handleRequest() {
    if (!detail) return;
    const { formValue } = detail;
    dialogRef.current?.close();
    onRequest(formValue);
  }

  return (
    <dialog ref={dialogRef} className="modal-card" aria-labelledby="modalTitle"
      {...({ closedby: "any" } as Record<string, string>)} onClose={onClose}>
      <div className="modal-head">
        <div>
          <span className="badge">{t.detailLabel}</span>
          <h2 id="modalTitle" style={{ margin: "0.75rem 0 0.375rem" }}>{detail?.name}</h2>
          <strong>{detail?.price}</strong>{detail && <small className="modal-vat">{t.vatExcluded}</small>}
        </div>
        <button type="button" className="modal-close" {...({ autofocus: "" } as Record<string, string>)}
          onClick={() => dialogRef.current?.close()} aria-label={t.close}>×</button>
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
      <button type="button" className="btn btn-primary modal-cta" onClick={handleRequest}>{t.requestService}</button>
    </dialog>
  );
}
