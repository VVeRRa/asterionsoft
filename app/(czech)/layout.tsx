import type { ReactNode } from "react";
import Document from "../document";
import { metadataFor } from "../metadata";

export const metadata = metadataFor("cs");

export default function Layout({ children }: { children: ReactNode }) {
  return <Document locale="cs">{children}</Document>;
}
