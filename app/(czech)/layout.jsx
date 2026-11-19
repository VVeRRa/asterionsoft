import Document from "../document";
import { metadataFor } from "../metadata";

export const metadata = metadataFor("cs");

export default function Layout({ children }) {
  return <Document locale="cs">{children}</Document>;
}
