/**
 * Legal page content. Text supports two inline forms, rendered by `components/legal-page.tsx`:
 * `[label](https://…)` for a link and `{email}` for the contact e-mail from `company.ts` (rendered by ProtectedEmail, never as plain text in the HTML).
 */
export type LegalBlock =
  | { type: "h2"; text: string }
  | { type: "p"; lead?: string; text: string }
  | { type: "ol"; items: string[] }
  | { type: "ul"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] };

export type LegalDoc = {
  title: string;
  description: string;
  blocks: LegalBlock[];
};

export type LegalKind = "privacy" | "terms";
