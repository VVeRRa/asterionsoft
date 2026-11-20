import serviceDefinitions from "./services.json";
import industryDefinitions from "./industries.json";
import type { Messages } from "./messages";
import type { ServiceOption } from "./inquiry-form";

export type Service = (typeof serviceDefinitions)[number] & Messages["services"][number];
export type Industry = (typeof industryDefinitions)[number] & Messages["industries"][number];
export type Category = "all" | "ai" | "dev" | "consulting";
export const categories: Category[] = ["all", "ai", "dev", "consulting"];

/** Detail modal content – a catalog service, or an industry solution with scope and a sample case. */
export type Detail = { name: string; price: string; description: string; formValue: string; scope?: string[]; example?: string };

/** Corporate trainings. `value` (formValue) is stored in Czech, same as services. */
export const trainings = [
  {
    value: "Firemní školení — AI Start",
    name: () => "AI Start",
    duration: (t: Messages) => t.threeHours,
    topics: (t: Messages) => ["ChatGPT / Claude", t.prompting, t.research, t.safety],
  },
  {
    value: "Firemní školení — AI Prakticky",
    name: (t: Messages) => t.practicalTraining,
    duration: (t: Messages) => t.oneDay,
    topics: (t: Messages) => [t.workExamples, t.routine, t.workflows, t.trainingQuestions],
  },
  {
    value: "Firemní školení — Automation Workshop",
    name: () => "Automation Workshop",
    duration: (t: Messages) => t.oneDay,
    topics: (t: Messages) => [t.processMapping, t.selectAutomation, t.solutionDesign, t.implementationPlan],
  },
  {
    value: "Firemní školení — AI gramotnost (AI Act)",
    name: (t: Messages) => t.aiLiteracyTraining,
    duration: (t: Messages) => t.threeHours,
    topics: (t: Messages) => [t.aiLiteracyDuty, t.aiLiteracyRules, t.aiLiteracyLimits, t.aiLiteracyRecord],
  },
];

/** Merges the fixed definitions (icon, categories, formValue) with the translated texts. */
export function catalogFor(t: Messages) {
  const services: Service[] = serviceDefinitions.map((definition, index) => ({ ...definition, ...t.services[index] }));
  const industries: Industry[] = industryDefinitions.map((definition, index) => ({ ...definition, ...t.industries[index] }));
  const serviceOptions: ServiceOption[] = [
    ...services.map((service) => ({ label: service.name, value: service.formValue })),
    ...industries.map((industry) => ({ label: `${industry.audience} — ${industry.name}`, value: industry.formValue })),
    ...trainings.map((training) => ({ label: `${t.trainingLabel} — ${training.name(t)}`, value: training.value })),
  ];
  return { services, industries, serviceOptions };
}
