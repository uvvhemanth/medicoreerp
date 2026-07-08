/** Marketing content (CMS-ready, local now — Requirements §7.4). */
import type { LucideIcon } from "lucide-react";
import {
  Users, Stethoscope, Pill, FlaskConical, Scan, Receipt, Boxes, UsersRound,
  BarChart3, Settings2, Building2, Microscope, Network, Landmark, Mic, Bot,
  TrendingUp, MessageSquareText, Sparkles, Share2, Globe, ArrowLeftRight,
  ShieldCheck, BadgeCheck, Activity, BookOpen, GitCompare, Code2, Blocks,
  ArrowRight, Zap,
} from "lucide-react";

export interface NavChild { label: string; href: string; desc?: string; icon?: LucideIcon; badge?: string }
export interface NavFeatured { title: string; desc: string; href: string; icon: LucideIcon }
export interface NavItem {
  label: string;
  href: string;
  menuLabel?: string;
  menuIcon?: LucideIcon;
  children?: NavChild[];
  featured?: NavFeatured;
}

export const NAV: NavItem[] = [
  {
    label: "Product",
    href: "/product",
    menuLabel: "Platform modules",
    menuIcon: Blocks,
    featured: { title: "See the full platform", desc: "50+ modules, one interaction grammar", href: "/product", icon: ArrowRight },
    children: [
      { label: "Patient Access", href: "/product/patient-access", desc: "Registration, appointments, queues", icon: Users },
      { label: "Clinical (EMR/OPD/IPD)", href: "/product/clinical", desc: "The AI-native chart", icon: Stethoscope },
      { label: "Pharmacy", href: "/product/pharmacy", desc: "Closed-loop dispensing", icon: Pill },
      { label: "Laboratory", href: "/product/lab", desc: "LIS with analyzer integration", icon: FlaskConical },
      { label: "Radiology", href: "/product/radiology", desc: "RIS + zero-footprint PACS", icon: Scan },
      { label: "Revenue Cycle", href: "/product/revenue-cycle", desc: "Autonomous RCM", icon: Receipt },
      { label: "Supply Chain", href: "/product/supply-chain", desc: "Inventory + procurement", icon: Boxes },
      { label: "Workforce (HRM)", href: "/product/hrm", desc: "Clinical-aware HR", icon: UsersRound },
      { label: "Analytics", href: "/product/analytics", desc: "Real-time, ask-your-data", icon: BarChart3 },
      { label: "Platform & Admin", href: "/product/platform", desc: "No-code studios", icon: Settings2 },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    menuLabel: "Solutions",
    menuIcon: Building2,
    children: [
      { label: "Clinics", href: "/solutions/clinics", desc: "Single & multi-clinic practices", icon: Stethoscope },
      { label: "Hospitals", href: "/solutions/hospitals", desc: "Multispecialty & IPD", icon: Building2 },
      { label: "Diagnostics / Labs", href: "/solutions/diagnostics", desc: "Lab & imaging chains", icon: Microscope },
      { label: "Pharmacy Chains", href: "/solutions/pharmacy", desc: "Retail + hospital outlets", icon: Pill },
      { label: "Enterprise Networks", href: "/solutions/enterprise", desc: "Multi-branch groups", icon: Network },
      { label: "Government / Payer", href: "/solutions/government", desc: "Public sector & TPAs", icon: Landmark },
    ],
  },
  {
    label: "AI",
    href: "/ai",
    menuLabel: "AI capabilities",
    menuIcon: Sparkles,
    featured: { title: "Human always in the loop", desc: "Cited, explainable, and fully audited", href: "/ai", icon: ShieldCheck },
    children: [
      { label: "Ambient Scribe", href: "/ai/ambient-scribe", desc: "Voice → signed SOAP note", icon: Mic },
      { label: "Clinical Co-pilot", href: "/ai/clinical-copilot", desc: "Cited, chart-aware assist", icon: Bot },
      { label: "Autonomous RCM", href: "/ai/autonomous-rcm", desc: "Coding, scrub, appeals", icon: Receipt },
      { label: "Predictive Ops", href: "/ai/predictive-ops", desc: "LOS, no-show, demand", icon: TrendingUp },
      { label: "NL Analytics", href: "/ai/nl-analytics", desc: "Ask your hospital data", icon: MessageSquareText },
    ],
  },
  {
    label: "Interoperability",
    href: "/interoperability",
    menuLabel: "Standards & data",
    menuIcon: Network,
    children: [
      { label: "FHIR R4", href: "/interoperability/fhir", desc: "Native resource model", icon: Share2 },
      { label: "HL7 v2", href: "/interoperability/hl7", desc: "Labs & legacy interfaces", icon: ArrowLeftRight },
      { label: "DICOM", href: "/interoperability/dicom", desc: "Zero-footprint imaging", icon: Scan },
      { label: "ABDM / TEFCA / EHDS", href: "/interoperability/abdm", desc: "Regional compliance", icon: Globe },
      { label: "Migration & Data-freedom", href: "/interoperability/migration", desc: "Guaranteed exports, no lock-in", icon: ArrowLeftRight },
    ],
  },
  {
    label: "Security",
    href: "/security",
    menuLabel: "Trust & compliance",
    menuIcon: ShieldCheck,
    children: [
      { label: "Trust Center", href: "/security", desc: "Our security posture", icon: ShieldCheck },
      { label: "Compliance", href: "/security/compliance", desc: "HIPAA · GDPR · ABDM · SOC 2 · ISO", icon: BadgeCheck },
      { label: "Status", href: "/security/status", desc: "Live uptime & incidents", icon: Activity },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    href: "/resources",
    menuLabel: "Resources",
    menuIcon: BookOpen,
    children: [
      { label: "Blog", href: "/resources/blog", desc: "Ideas on AI, RCM & interop", icon: BookOpen },
      { label: "Customers", href: "/customers", desc: "Real outcomes & case studies", icon: Users },
      { label: "Compare", href: "/compare/vs-epic", desc: "Honest teardowns vs incumbents", icon: GitCompare },
      { label: "Developers", href: "/developers", desc: "API, FHIR, SDKs & sandbox", icon: Code2 },
      { label: "Company", href: "/company/about", desc: "About, careers & press", icon: Building2 },
    ],
  },
];

// Kept for potential future use in menus.
export const NAV_ICONS = { Zap };

export interface ProductDomain {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  features: { title: string; desc: string }[];
  moats: string[];
  image: string;
}

export const PRODUCT_DOMAINS: ProductDomain[] = [
  {
    slug: "patient-access",
    name: "Patient Access & Front Office",
    tagline: "The fastest front desk in healthcare.",
    problem: "Registration duplicates, long queues, and no-shows bleed revenue and goodwill from day one of the patient journey.",
    features: [
      { title: "<30-second registration", desc: "OCR ID capture, auto-ABHA, and fuzzy dedupe as the receptionist types." },
      { title: "Smart scheduling", desc: "Multi-resource slots, ML no-show scores, and one-tap reschedule links." },
      { title: "Live token boards", desc: "Real-time queues per doctor and room, ready for wall displays." },
      { title: "Self-service kiosks", desc: "QR check-in, consent capture, and payment in a locked kiosk mode." },
    ],
    moats: ["OCR + biometric dedupe", "ML no-show prediction", "Digital front door"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "clinical",
    name: "Clinical Core",
    tagline: "The chart clinicians actually want to use.",
    problem: "Legacy EMRs make doctors click 40 times to write one note. Aether makes it one voice conversation.",
    features: [
      { title: "Ambient scribe", desc: "Mic → live transcript → structured SOAP + coded problems + draft orders, one-tap signed." },
      { title: "Longitudinal chart", desc: "Timeline, problems, meds, results, flowsheets — amend, never overwrite." },
      { title: "CDSS everywhere", desc: "Allergy, interaction, and dose alerts with 'why' + evidence inline." },
      { title: "Bed board & rounds", desc: "Drag-drop transfers, AI daily notes, discharge-barrier prediction." },
    ],
    moats: ["Ambient scribe", "Anti-alert-fatigue CDSS", "AI discharge summary"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "pharmacy",
    name: "Pharmacy",
    tagline: "Closed-loop, from prescription to administration.",
    problem: "Disconnected pharmacy systems cause missed charges, stock-outs, and medication errors.",
    features: [
      { title: "Clinical verification", desc: "Interaction and formulary checks before dispense." },
      { title: "FEFO dispensing", desc: "Batch/expiry-aware picking with barcode 5-rights." },
      { title: "One stock ledger", desc: "Retail + hospital + ward inventory in a single view." },
      { title: "eMAR closed-loop", desc: "Rx → dispense → administration status end to end." },
    ],
    moats: ["Closed-loop eMAR", "Multi-location ledger"],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "lab",
    name: "Laboratory (LIS)",
    tagline: "From order to validated result, automatically.",
    problem: "Manual result entry and QC scramble slow diagnosis and invite error.",
    features: [
      { title: "Bidirectional analyzers", desc: "ASTM/HL7 results with auto-verification of normals." },
      { title: "Delta & critical checks", desc: "Critical-value alerts with acknowledgment trail." },
      { title: "Sample traceability", desc: "Collected → received → in-process status timeline." },
      { title: "Patient-friendly reports", desc: "LOINC-coded with plain-language AI explanations." },
    ],
    moats: ["Auto-verification", "Real-time QC"],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "radiology",
    name: "Radiology (RIS + PACS)",
    tagline: "Zero-footprint imaging inside the chart.",
    problem: "Separate PACS viewers and manual reporting fragment the radiologist's workflow.",
    features: [
      { title: "In-browser DICOM viewer", desc: "Window/level, measure, and prior-study compare — no plugin." },
      { title: "Structured reporting", desc: "Voice reporting with templates and instant publish." },
      { title: "AI pre-read triage", desc: "Critical CT/CXR flagged as priority chips." },
      { title: "Critical-finding workflow", desc: "Closed-loop notification and acknowledgment." },
    ],
    moats: ["Zero-footprint viewer", "AI triage"],
    image: "https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "revenue-cycle",
    name: "Revenue Cycle & Finance",
    tagline: "Autonomous RCM that gets you paid faster.",
    problem: "Denials, missed charges, and manual coding cost hospitals up to 5% of net revenue.",
    features: [
      { title: "Zero missed charges", desc: "Clinical activity auto-captures as billable ChargeItems." },
      { title: "AI coding review", desc: "Suggested ICD/CPT with confidence chips; coder confirms." },
      { title: "Claim scrubbing", desc: "Pre-submission checks lift clean-claim rate." },
      { title: "Denial queue", desc: "Prediction flags + auto-drafted appeals; human approves." },
    ],
    moats: ["Denial prediction", "AI coding", "Auto-posting to finance"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "supply-chain",
    name: "Supply Chain & Assets",
    tagline: "Never run out, never over-order.",
    problem: "Stock-outs and dead-stock swing between crisis and waste without demand visibility.",
    features: [
      { title: "ML demand forecast", desc: "Auto-reorder suggestions tied to procedure volume." },
      { title: "FEFO batch ledger", desc: "Per-store stock with expiry and barcode/RFID." },
      { title: "Approval-chain procurement", desc: "RFQ → PO → GRN → 3-way match with budget checks." },
      { title: "Asset lifecycle", desc: "Depreciation, AMC, and uptime dashboards." },
    ],
    moats: ["Demand forecasting", "Leakage detection"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "hrm",
    name: "Workforce (HRM)",
    tagline: "Clinical-aware HR, credential to payroll.",
    problem: "Generic HR tools ignore licenses, skill-mix, and coverage — the things that keep wards safe.",
    features: [
      { title: "Credentialing", desc: "License expiry blocks scheduling if lapsed." },
      { title: "AI rostering", desc: "Rule-based grids optimized against demand and skill mix." },
      { title: "Attendance → payroll", desc: "Multi-country statutory engine with payslip and bank file." },
      { title: "Employee self-service", desc: "Leave, payslips, and approvals in one portal." },
    ],
    moats: ["Coverage-aware rostering", "Credential compliance"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "analytics",
    name: "Analytics & Command Center",
    tagline: "Ask your hospital data in plain language.",
    problem: "Overnight batch reports answer yesterday's questions. Leaders need now.",
    features: [
      { title: "Real-time dashboards", desc: "Streaming clinical, financial, and operational KPIs." },
      { title: "NL analytics bar", desc: "Type a question, get a chart — with the query shown for trust." },
      { title: "Command-center twin", desc: "Network-wide live board for wall displays." },
      { title: "Self-serve builder", desc: "Drag metrics to charts; save and schedule." },
    ],
    moats: ["NL 'ask your data'", "Digital twin"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "platform",
    name: "Platform & Admin",
    tagline: "Configure, don't customize.",
    problem: "Every change to a legacy HIS means a consultant and a six-month project.",
    features: [
      { title: "Workflow Studio", desc: "Drag-drop approval chains and care pathways with live preview." },
      { title: "Form Builder", desc: "No-code clinical forms that render live and validated." },
      { title: "Role matrix", desc: "RBAC + ABAC with break-glass and delegation." },
      { title: "White-label", desc: "Per-tenant branding tokens injected at runtime." },
    ],
    moats: ["No-code studios", "Configurable, not customized"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=70",
  },
];

export interface Solution {
  slug: string;
  name: string;
  hero: string;
  pains: string[];
  bundle: string[];
  goLive: string;
  priceFrom: string;
}

export const SOLUTIONS: Solution[] = [
  { slug: "clinics", name: "Clinics", hero: "Everything a growing clinic needs, nothing it doesn't.", pains: ["Paper registers & no-shows", "Manual billing", "No follow-up recall"], bundle: ["Patient Access", "OPD & e-Prescribe", "Billing", "Pharmacy-lite", "Patient Portal"], goLive: "2–3 weeks", priceFrom: "₹8,000/mo" },
  { slug: "hospitals", name: "Hospitals", hero: "Run the whole hospital on one platform.", pains: ["Fragmented departmental systems", "Revenue leakage", "Bed & OT chaos"], bundle: ["Full Clinical Core", "IPD/ER/OT/ICU", "Pharmacy/Lab/Radiology", "Autonomous RCM", "Analytics"], goLive: "6–10 weeks", priceFrom: "₹1,200/bed/mo" },
  { slug: "diagnostics", name: "Diagnostics / Labs", hero: "From sample to signed report, automated.", pains: ["Analyzer silos", "QC scramble", "Slow TAT"], bundle: ["LIS", "RIS/PACS", "Home-collection", "Patient reports", "B2B portal"], goLive: "3–5 weeks", priceFrom: "₹15,000/mo" },
  { slug: "pharmacy", name: "Pharmacy Chains", hero: "One ledger across every outlet.", pains: ["Stock-outs & expiry loss", "No central visibility", "Manual reorder"], bundle: ["Multi-store inventory", "POS & returns", "Demand forecast", "Loyalty", "Analytics"], goLive: "3–4 weeks", priceFrom: "₹6,000/store/mo" },
  { slug: "enterprise", name: "Enterprise Networks", hero: "Coherence across every branch.", pains: ["Inconsistent processes", "No network view", "Slow rollout"], bundle: ["Everything", "Command Center", "Multi-tenant admin", "Developer platform", "Dedicated success"], goLive: "12–20 weeks", priceFrom: "Custom" },
  { slug: "government", name: "Government / Payer", hero: "Public-health scale, compliant by default.", pains: ["ABDM mandates", "Population reporting", "Interoperability"], bundle: ["ABDM-ready HMIS", "Registries", "Claims/TPA", "Analytics", "Data-freedom exports"], goLive: "Program-based", priceFrom: "Custom" },
];

export interface Standard { slug: string; name: string; desc: string }
export const STANDARDS: Standard[] = [
  { slug: "fhir", name: "FHIR R4", desc: "Native resource model. Read/write Patient, Encounter, Observation and more via a public API." },
  { slug: "hl7", name: "HL7 v2", desc: "Bidirectional interfaces for labs, analyzers, and legacy systems." },
  { slug: "dicom", name: "DICOM", desc: "Zero-footprint imaging with DICOM MWL and a browser viewer." },
  { slug: "abdm", name: "ABDM / TEFCA / EHDS", desc: "Regional health-network compliance built in — ABHA, registries, consent." },
  { slug: "migration", name: "Migration & Data-freedom", desc: "Guaranteed exports. Your data is yours — no lock-in, ever." },
];

export interface Capability { slug: string; name: string; hook: string; how: string[]; safety: string }
export const AI_CAPABILITIES: Capability[] = [
  { slug: "ambient-scribe", name: "Ambient Scribe", hook: "Turn a conversation into a signed, coded note.", how: ["Capture the consult with consent", "Live transcript streams as you speak", "AI structures SOAP + problems + draft orders", "You review a diff and one-tap sign"], safety: "Nothing commits without a clinician signature. Every section is editable and attributed." },
  { slug: "clinical-copilot", name: "Clinical Co-pilot", hook: "A chart-aware assistant that always cites its source.", how: ["Ask questions about the patient", "Get summaries and draft replies", "Every answer links to the source in the chart"], safety: "Advisory only. Cited, never autonomous on clinical decisions." },
  { slug: "autonomous-rcm", name: "Autonomous RCM", hook: "Code, scrub, and appeal claims at machine speed.", how: ["AI suggests codes from the note", "Claims are scrubbed pre-submission", "Denials are predicted and appeals drafted"], safety: "A human approves every submission and appeal. 'AI proposed vs human decided' is always clear." },
  { slug: "predictive-ops", name: "Predictive Ops", hook: "See problems before they happen.", how: ["Predict length-of-stay and discharge barriers", "Score no-show risk on every appointment", "Forecast inventory demand"], safety: "Predictions are decision support, surfaced with confidence and never auto-acted." },
  { slug: "nl-analytics", name: "NL Analytics", hook: "Ask your hospital data in plain language.", how: ["Type a question in the analytics bar", "Get a generated chart or table", "See the interpreted query for trust"], safety: "Row-level security is enforced in every generated query." },
];

export interface Competitor { slug: string; name: string; summary: string; rows: { feature: string; aether: string; them: string }[]; theyStrong: string[] }
export const COMPETITORS: Competitor[] = [
  {
    slug: "vs-epic", name: "Epic",
    summary: "Epic is powerful and proven at mega-scale — and famously expensive, slow to deploy, and hard to use. Aether matches the breadth with modern UX, AI-native workflows, and honest pricing.",
    rows: [
      { feature: "AI ambient scribe (default)", aether: "Included", them: "Add-on / 3rd-party" },
      { feature: "Time to go live", aether: "6–10 weeks", them: "12–18 months" },
      { feature: "No-code configuration", aether: "Workflow Studio + Form Builder", them: "Consultant-led" },
      { feature: "FHIR-native API", aether: "Default, public", them: "Available, gated" },
      { feature: "Transparent pricing", aether: "Published per-bed", them: "Opaque" },
    ],
    theyStrong: ["Deepest specialty depth at 1000+ bed scale", "Huge existing install base & network", "Mature research/academic tooling"],
  },
  {
    slug: "vs-cerner", name: "Cerner (Oracle Health)",
    summary: "Cerner brings enterprise reach; Aether brings a modern, coherent UX and AI woven through every workflow rather than bolted on.",
    rows: [
      { feature: "Unified UX across modules", aether: "One design system", them: "Acquired patchwork" },
      { feature: "Real-time analytics", aether: "Streaming default", them: "Batch-heavy" },
      { feature: "Cloud-native", aether: "Yes", them: "Migrating" },
      { feature: "AI RCM", aether: "Autonomous", them: "Partial" },
    ],
    theyStrong: ["Strong US enterprise footprint", "Oracle infrastructure backing"],
  },
  {
    slug: "vs-athenahealth", name: "athenahealth",
    summary: "athenahealth is strong in US ambulatory RCM. Aether covers the full hospital — inpatient, OT, ICU, pharmacy, lab — with the same cloud ease and adds regional interoperability (ABDM).",
    rows: [
      { feature: "Inpatient / IPD / OT / ICU", aether: "Full", them: "Limited" },
      { feature: "Regional compliance (ABDM)", aether: "Native", them: "No" },
      { feature: "Multi-region (India/MENA/SEA)", aether: "Yes", them: "US-centric" },
    ],
    theyStrong: ["Mature US payer network", "Strong ambulatory RCM"],
  },
  {
    slug: "vs-local-his", name: "Local HIS",
    summary: "Regional HIS products are affordable but dated — no AI, weak interoperability, and painful to scale across branches. Aether is the modern, AI-native upgrade path with data-freedom migration.",
    rows: [
      { feature: "AI-native workflows", aether: "Throughout", them: "None" },
      { feature: "Command-center digital twin", aether: "Included", them: "No" },
      { feature: "Open developer platform", aether: "Public API + marketplace", them: "Closed" },
      { feature: "Data-freedom migration", aether: "Guaranteed exports", them: "Lock-in" },
    ],
    theyStrong: ["Low upfront cost", "Local support relationships"],
  },
];

export interface PricingPlan { name: string; price: string; unit: string; blurb: string; features: string[]; highlight?: boolean; cta: string }
export const PRICING: PricingPlan[] = [
  { name: "Clinic", price: "₹8,000", unit: "/month", blurb: "For single & small multi-clinic practices.", features: ["Up to 10 users", "Patient Access + OPD", "e-Prescribe & Billing", "Pharmacy-lite", "Patient portal", "Email support"], cta: "Start free trial" },
  { name: "Hospital", price: "₹1,200", unit: "/bed/month", blurb: "Full platform for multispecialty hospitals.", features: ["Unlimited users", "Full Clinical Core (IPD/ER/OT/ICU)", "Pharmacy / Lab / Radiology", "Autonomous RCM", "Real-time analytics", "AI ambient scribe", "24×7 support"], highlight: true, cta: "Book a demo" },
  { name: "Enterprise", price: "Custom", unit: "", blurb: "For multi-branch networks & groups.", features: ["Everything in Hospital", "Command-center digital twin", "Multi-tenant administration", "Developer platform & marketplace", "White-label & SSO", "Dedicated success manager", "Custom SLA & residency"], cta: "Talk to sales" },
];

export interface Testimonial { quote: string; name: string; role: string; org: string; avatar: string }
export const TESTIMONIALS: Testimonial[] = [
  { quote: "Documentation time dropped 62%. My doctors actually finish notes before they leave.", name: "Dr. Rekha Menon", role: "Medical Director", org: "Sunrise Multispecialty", avatar: "https://i.pravatar.cc/120?img=45" },
  { quote: "Denials fell from 11% to 6% in one quarter. The denial queue pays for the platform.", name: "Anil Verma", role: "CFO", org: "Metro Health Network", avatar: "https://i.pravatar.cc/120?img=12" },
  { quote: "We went live in 7 weeks across three branches. Our old HIS took a year for one.", name: "Sana Khan", role: "COO", org: "CityCare Group", avatar: "https://i.pravatar.cc/120?img=32" },
];

export interface CaseStudy { slug: string; org: string; edition: string; region: string; challenge: string; solution: string; metrics: { label: string; value: string }[]; quote: string; author: string; image: string }
export const CASE_STUDIES: CaseStudy[] = [
  { slug: "sunrise-multispecialty", org: "Sunrise Multispecialty", edition: "Hospital", region: "South India", challenge: "A 220-bed hospital juggling seven disconnected systems with 11% claim denials and 40-minute OPD waits.", solution: "Deployed the full Aether platform — clinical core, RCM, and command center — in 9 weeks with zero downtime migration.", metrics: [{ label: "Denials", value: "-45%" }, { label: "Doc time", value: "-62%" }, { label: "OPD wait", value: "-64%" }, { label: "Go-live", value: "9 wks" }], quote: "Aether gave us one system that finally feels like one product.", author: "Dr. Rekha Menon, Medical Director", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=70" },
  { slug: "metro-diagnostics", org: "Metro Diagnostics", edition: "Diagnostics", region: "West India", challenge: "A lab chain with 14 outlets and manual result validation causing slow turnaround and QC gaps.", solution: "Rolled out the LIS with bidirectional analyzer integration and auto-verification across all outlets.", metrics: [{ label: "TAT", value: "-38%" }, { label: "Auto-verify", value: "71%" }, { label: "QC incidents", value: "-80%" }], quote: "Our turnaround is now the fastest in the city.", author: "Priya Rao, Lab Director", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70" },
  { slug: "citycare-clinics", org: "CityCare Clinics", edition: "Clinic", region: "North India", challenge: "A fast-growing clinic group with paper registers, no-shows, and no follow-up recall.", solution: "Standardized on Aether's clinic edition with ML no-show scoring and recall campaigns.", metrics: [{ label: "No-shows", value: "-33%" }, { label: "Recall revenue", value: "+22%" }, { label: "Go-live", value: "3 wks" }], quote: "We recovered the subscription cost in the first month from recalls alone.", author: "Sana Khan, COO", image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=70" },
];

export interface BlogPost { slug: string; title: string; excerpt: string; category: string; author: string; date: string; readMins: number; image: string }
export const BLOG_POSTS: BlogPost[] = [
  { slug: "ambient-ai-clinical-documentation", title: "How ambient AI is ending the clinical documentation crisis", excerpt: "Physicians spend two hours on paperwork for every hour of care. Ambient scribes flip that ratio — here's how.", category: "AI", author: "Dr. Rekha Menon", date: "2026-06-28", readMins: 7, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=70" },
  { slug: "reducing-claim-denials-with-ai", title: "Reducing claim denials with predictive RCM", excerpt: "A practical playbook for cutting your denial rate in half using AI-assisted coding and scrubbing.", category: "Revenue Cycle", author: "Anil Verma", date: "2026-06-15", readMins: 9, image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70" },
  { slug: "fhir-first-interoperability", title: "Why FHIR-first beats bolt-on integration", excerpt: "Interoperability shouldn't be an afterthought. Building on FHIR from day one changes everything.", category: "Interoperability", author: "Karthik Iyer", date: "2026-05-30", readMins: 6, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70" },
  { slug: "abdm-ready-hospital", title: "The ABDM-ready hospital: a compliance checklist", excerpt: "Everything you need to know to make your hospital ABDM-compliant without slowing down clinicians.", category: "Compliance", author: "Sana Khan", date: "2026-05-18", readMins: 8, image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&q=70" },
];

export const COMPLIANCE_BADGES = ["HIPAA", "GDPR", "ABDM", "SOC 2 Type II", "ISO 27001", "NABH"];

export const HOME_STATS = [
  { value: "62%", label: "less documentation time" },
  { value: "45%", label: "fewer claim denials" },
  { value: "9 wks", label: "average time to go live" },
  { value: "99.98%", label: "platform uptime" },
];

export const LOGO_WALL = ["Sunrise Health", "Metro Network", "CityCare", "Wellness Labs", "Apollo-ish", "Rural Trust", "CarePlus", "MediGroup"];

export const FAQ_PRICING = [
  { q: "How is Aether priced?", a: "Clinics pay a flat monthly fee; hospitals pay per active bed; enterprise is custom. All plans include updates, support, and the AI features at their tier." },
  { q: "Is there a setup or migration fee?", a: "Migration from your existing system is included in onboarding for annual plans, with guaranteed data-freedom exports." },
  { q: "Can I try it before buying?", a: "Yes — start a free sandbox trial that provisions a demo tenant with sample data, or book a guided demo." },
  { q: "What's included in support?", a: "Email support on Clinic, 24×7 support and a success manager on Hospital and Enterprise." },
  { q: "Do AI features cost extra?", a: "No. Ambient scribe, co-pilot, and predictive features are included at the Hospital tier and above." },
];
