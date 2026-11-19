/**
 * Pořadí otázek v FAQ – každé téma má v překladech klíče `<téma>Question` a `<téma>Answer`.
 * Sdílí ho sekce FAQ i strukturovaná data (FAQPage), proto žije v obyčejném modulu bez "use client".
 */
export const faqTopics = [
  "audit", "assistant", "process", "contact", "excel", "training",
  "data", "systems", "mistakes", "running", "aiAct", "idea",
] as const;
