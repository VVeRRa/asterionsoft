"use client";

import { useEffect, type CSSProperties } from "react";

/** The card's column index in the grid – CSS delays its reveal by it (staggered per row). */
export function revealStyle(index: number, columns = 3): CSSProperties {
  return { "--reveal-index": index % columns } as CSSProperties;
}

/**
 * Fades in `.reveal` elements once they scroll into view (IntersectionObserver, no library).
 * Whatever is visible on load is shown right away without animation, so nothing flickers. With
 * reduced motion (prefers-reduced-motion) or without IntersectionObserver everything is shown at once.
 * `deps` re-runs the check, e.g. when the filter renders new cards.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const pending = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    const show = (element: Element) => element.classList.add("is-visible");
    const root = document.documentElement;

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      pending.forEach(show);
      return;
    }

    if (!root.classList.contains("reveal-ready")) {
      // First run: show what's already on screen immediately, and only then enable the hidden default state.
      pending.filter((element) => element.getBoundingClientRect().top < window.innerHeight).forEach(show);
      root.classList.add("reveal-ready");
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

    pending.filter((element) => !element.classList.contains("is-visible")).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
