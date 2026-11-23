import type { Locale } from "../locales";
import { privacy } from "./privacy";
import { terms } from "./terms";
import type { LegalDoc, LegalKind } from "./types";

export const legalDocs: Record<LegalKind, Record<Locale, LegalDoc>> = { privacy, terms };
