export interface Job { slug: string; title: string; dept: string; location: string; type: string; desc: string }

export const JOBS: Job[] = [
  { slug: "senior-frontend-engineer", title: "Senior Frontend Engineer", dept: "Engineering", location: "Bengaluru / Remote", type: "Full-time", desc: "Build the design system and dense clinical screens that clinicians use all day. React, TypeScript, and a love of performance required." },
  { slug: "product-designer", title: "Product Designer", dept: "Design", location: "Remote", type: "Full-time", desc: "Own the interaction grammar across 50+ modules. Turn clinical complexity into calm, simple UI." },
  { slug: "clinical-informatics-lead", title: "Clinical Informatics Lead", dept: "Clinical", location: "Bengaluru", type: "Full-time", desc: "Bridge medicine and software — design order sets, CDSS rules, and care pathways with real clinicians." },
  { slug: "backend-engineer-fhir", title: "Backend Engineer (FHIR)", dept: "Engineering", location: "Remote", type: "Full-time", desc: "Build the FHIR-native API and interoperability layer that powers the whole platform." },
  { slug: "customer-success-manager", title: "Customer Success Manager", dept: "Success", location: "Dubai", type: "Full-time", desc: "Own hospital go-lives, drive adoption, and turn customers into advocates." },
];
