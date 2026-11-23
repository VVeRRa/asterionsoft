import { Fragment, type ReactNode } from "react";
import { company } from "../company";
import { legalDocs } from "../legal/docs";
import { legalEffectiveDate, legalPaths } from "../legal/paths";
import type { LegalBlock, LegalKind } from "../legal/types";
import { locales, localePaths, type Locale } from "../locales";
import type { Messages } from "../messages";
import czech from "../messages/cs.json";
import english from "../messages/en.json";
import german from "../messages/de.json";
import SiteFooter from "./site-footer";

const messages: Record<Locale, Messages> = { cs: czech, en: english, de: german };

/** `[label](href)` links and the `{email}` placeholder inside legal texts. */
const inlinePattern = /\[([^\]]+)\]\(([^)\s]+)\)|\{email\}/g;

function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(inlinePattern)) {
    parts.push(text.slice(last, match.index));
    const [whole, label, href] = match;
    if (whole === "{email}") {
      parts.push(<a key={match.index} href={`mailto:${company.email}`}>{company.email}</a>);
    } else {
      const external = href.startsWith("http");
      parts.push(
        <a key={match.index} href={href} {...(external && { target: "_blank", rel: "noopener" })}>{label}</a>,
      );
    }
    last = match.index + whole.length;
  }
  parts.push(text.slice(last));
  return parts;
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "p":
      return <p>{block.lead && <strong>{block.lead} </strong>}{renderInline(block.text)}</p>;
    case "ol":
    case "ul": {
      const List = block.type;
      return <List>{block.items.map((item, index) => <li key={index}>{renderInline(item)}</li>)}</List>;
    }
    case "table":
      // On phones each row turns into a card; data-label repeats the column name (see .legal-table in globals.css).
      return (
        <table className="legal-table">
          <thead>
            <tr>{block.head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr>
          </thead>
          <tbody>
            {block.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} data-label={block.head[cellIndex]}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
  }
}

export default function LegalPage({ kind, locale }: { kind: LegalKind; locale: Locale }) {
  const t = messages[locale];
  const doc = legalDocs[kind][locale];
  const effective = new Intl.DateTimeFormat(locale === "en" ? "en-GB" : locale, { dateStyle: "long", timeZone: "UTC" })
    .format(new Date(`${legalEffectiveDate}T00:00:00Z`));

  return (
    <>
      <header className="nav">
        <div className="container nav-inner">
          <a className="brand" href={localePaths[locale]} aria-label="Asterion Software">
            <span className="brand-mark"></span>
            <span>Asterion Software</span>
          </a>
          <nav className="nav-links" aria-label={t.language}>
            <div className="language-switch" role="group" aria-label={t.language}>
              {locales.map((language) => (
                <a key={language} href={legalPaths[kind][language]} hrefLang={language} lang={language}
                  aria-current={locale === language ? "page" : undefined}>
                  {language.toUpperCase()}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <main className="container legal-page">
        <a className="legal-back" href={localePaths[locale]}>← {t.legal.back}</a>
        <h1>{doc.title}</h1>
        <p className="legal-effective">{t.legal.effective} {effective}</p>
        {doc.blocks.map((block, index) => <Fragment key={index}><Block block={block} /></Fragment>)}
      </main>

      <SiteFooter locale={locale} t={t} />
    </>
  );
}
