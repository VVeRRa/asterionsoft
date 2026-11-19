import { company } from "../company";
import type { Messages } from "../messages";

export default function SiteFooter({ t }: { t: Messages }) {
  return (
    <footer>
      <div className="container footer-inner">
        <div>{`© 2026 ${company.name} · `}{t.companyId}{`: ${company.companyId} · ${company.address}`}</div>
        <div className="footer-links">
          <a href={company.phoneHref}>{company.phone}</a>
          <a href={company.studioUrl} target="_blank" rel="noopener">studijo.io</a>
        </div>
      </div>
    </footer>
  );
}
