"use client";

import { useEffect, useRef, useState } from "react";
import { locales, localePaths, type Locale } from "../locales";
import type { Messages } from "../messages";

/** Šířka, pod kterou se navigace schová do burger menu – stejná hranice jako v globals.css. */
const mobileQuery = "(max-width: 57.5em)";

export default function SiteHeader({ locale, t }: { locale: Locale; t: Messages }) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const links = [
    ["#sluzby", t.servicesNav],
    ["#obory", t.industriesNav],
    ["#reference", t.references],
    ["#skoleni", t.trainingNav],
    ["#o-nas", t.aboutNav],
    ["#faq", "FAQ"],
  ];

  useEffect(() => {
    if (!open) return;
    headerRef.current?.querySelector<HTMLElement>(".nav-menu a")?.focus();

    const close = () => setOpen(false);
    const handleKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      toggleRef.current?.focus();
    };
    const handleClick = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) close();
    };
    const media = window.matchMedia(mobileQuery);
    const handleResize = () => { if (!media.matches) close(); };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("click", handleClick);
    media.addEventListener("change", handleResize);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("click", handleClick);
      media.removeEventListener("change", handleResize);
    };
  }, [open]);

  // Klik na odkaz v menu (sekce, poptávka, jazyk) menu zavře.
  function handleMenuClick(event: React.MouseEvent) {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  }

  return (
    <header className={open ? "nav menu-open" : "nav"} ref={headerRef}>
      <div className="container nav-inner">
        <a className="brand" href="#top" aria-label="Asterion Software">
          <span className="brand-mark"></span>
          <span>Asterion Software</span>
        </a>
        <nav className="nav-links" aria-label={t.menuLabel}>
          <button type="button" className="nav-toggle" ref={toggleRef} aria-expanded={open} aria-controls="hlavni-menu"
            aria-label={open ? t.menuClose : t.menuOpen} onClick={() => setOpen(!open)}>
            <span className="nav-toggle-bars" aria-hidden="true"></span>
          </button>
          <div className="nav-menu" id="hlavni-menu" onClick={handleMenuClick}>
            {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
            <a className="nav-cta" href="#poptavka">{t.contactNav}</a>
            <div className="language-switch" role="group" aria-label={t.language}>
              {locales.map((language) => (
                <a key={language} href={localePaths[language]} hrefLang={language} lang={language}
                  aria-current={locale === language ? "page" : undefined}>
                  {language.toUpperCase()}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
