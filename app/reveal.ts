"use client";

import { useEffect, type CSSProperties } from "react";

/** Pořadí karty ve sloupci mřížky – podle něj CSS zpozdí její objevení (postupný náběh po řádcích). */
export function revealStyle(index: number, columns = 3): CSSProperties {
  return { "--reveal-index": index % columns } as CSSProperties;
}

/**
 * Prvky s třídou `reveal` plynule ukáže, jakmile vjedou do okna (IntersectionObserver, bez knihovny).
 * Co je vidět už při načtení, se ukáže hned bez animace, aby nic neproblikávalo. Při omezeném
 * pohybu (prefers-reduced-motion) nebo bez IntersectionObserveru se ukáže všechno rovnou.
 * `deps` spustí kontrolu znovu, třeba když filtr vykreslí nové karty.
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
      // První spuštění: co je už na obrazovce, ukázat hned, a teprve pak zapnout skrytý výchozí stav.
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
