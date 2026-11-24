import { company } from "../company";
import { legalPaths } from "../legal/paths";
import type { Locale } from "../locales";
import type { Messages } from "../messages";

/** Company identification required on business websites (§ 435 Civil Code, § 7 Business Corporations Act) and legal links. */
export default function SiteFooter({ locale, t }: { locale: Locale; t: Messages }) {
  return (
    <footer>
      <div className="container footer-inner">
        <div className="footer-company">
          <div>{`© 2026 ${company.name} · `}{t.companyId}{`: ${company.companyId} · `}{t.vatId}{`: ${company.vatId}`}</div>
          <div>{company.address}</div>
          <div>{`${t.legal.registry} ${company.registryFile}`}</div>
        </div>
        <div className="footer-links">
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={legalPaths.privacy[locale]}>{t.legal.privacy}</a>
          <a href={legalPaths.terms[locale]}>{t.legal.terms}</a>
          <a href={company.studioUrl} target="_blank" rel="noopener">studijo.io</a>
        </div>
      </div>
    </footer>
  );
}
