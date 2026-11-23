import LegalPage from "../../components/legal-page";
import { legalMetadataFor } from "../../metadata";

export const metadata = legalMetadataFor("privacy", "cs");

export default function Page() {
  return <LegalPage kind="privacy" locale="cs" />;
}
