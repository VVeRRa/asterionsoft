/**
 * Order of the FAQ questions – each topic has `<topic>Question` and `<topic>Answer` keys in the translations.
 * Shared by the FAQ section and the structured data (FAQPage), so it lives in a plain module without "use client".
 */
export const faqTopics = [
  "audit", "assistant", "process", "contact", "excel", "training",
  "data", "systems", "mistakes", "running", "aiAct", "idea",
] as const;
