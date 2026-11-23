import LegalPage from "../../components/legal-page";
import { legalMetadataFor } from "../../metadata";

export const metadata = legalMetadataFor("terms", "cs");

export default function Page() {
  return <LegalPage kind="terms" locale="cs" />;
}
