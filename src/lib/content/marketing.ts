/** Marketing content (CMS-ready, local now — Requirements §7.4). */
import type { LucideIcon } from "lucide-react";
import {
  Users, Stethoscope, Pill, FlaskConical, Scan, Receipt, Boxes, UsersRound,
  BarChart3, Settings2, Building2, Microscope, Network, Landmark, Mic, Bot,
  TrendingUp, MessageSquareText, Sparkles, Share2, Globe, ArrowLeftRight,
  ShieldCheck, BadgeCheck, Activity, BookOpen, GitCompare, Code2, Blocks,
  ArrowRight, Zap, Tag, Calculator, GraduationCap, Mic2, BookMarked, ScrollText,
  Briefcase, Mail, Handshake, Calendar, FileText, Bell, ClipboardList, LayoutDashboard,
  HeartPulse, BedDouble, CreditCard, GitBranch, FormInput, Barcode,
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
    featured: { title: "Open HIS dashboard", desc: "Patient journey modules in one screen", href: "/dashboard", icon: ArrowRight },
    children: [
      { label: "HIS Dashboard", href: "/dashboard", desc: "Module home like hospital software", icon: LayoutDashboard, badge: "New" },
      { label: "Electronic Medical Records", href: "/product/emr", desc: "Digital charts, notes & orders", icon: ClipboardList, badge: "New" },
      { label: "Appointments", href: "/product/appointments", desc: "Scheduling, slots & queues", icon: Calendar, badge: "New" },
      { label: "Billing & Invoices", href: "/product/billing-invoices", desc: "Patient bills, GST & payments", icon: FileText, badge: "New" },
      { label: "Patient Reminders", href: "/product/patient-reminders", desc: "SMS, WhatsApp & recall", icon: Bell, badge: "New" },
      { label: "Patient Access", href: "/product/patient-access", desc: "Registration & front desk", icon: Users },
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
    menuLabel: "Solutions by edition",
    menuIcon: Building2,
    featured: { title: "Find your edition", desc: "Clinic to government — see the fit", href: "/solutions", icon: ArrowRight },
    children: [
      { label: "Clinics", href: "/solutions/clinics", desc: "Go live in 2–3 weeks", icon: Stethoscope },
      { label: "Hospitals", href: "/solutions/hospitals", desc: "Go live in 6–10 weeks", icon: Building2 },
      { label: "Diagnostics / Labs", href: "/solutions/diagnostics", desc: "Go live in 3–5 weeks", icon: Microscope },
      { label: "Pharmacy Chains", href: "/solutions/pharmacy", desc: "Go live in 3–4 weeks", icon: Pill },
      { label: "Enterprise Networks", href: "/solutions/enterprise", desc: "Multi-branch · custom rollout", icon: Network },
      { label: "Government / Payer", href: "/solutions/government", desc: "ABDM-ready · program-based", icon: Landmark },
    ],
  },
  {
    label: "AI",
    href: "/ai",
    menuLabel: "AI capabilities",
    menuIcon: Sparkles,
    featured: { title: "Human always in the loop", desc: "Cited, explainable, and fully audited", href: "/ai", icon: ShieldCheck },
    children: [
      { label: "Ambient Scribe", href: "/ai/ambient-scribe", desc: "Voice → signed SOAP · ↓62% doc time", icon: Mic },
      { label: "Clinical Co-pilot", href: "/ai/clinical-copilot", desc: "Cited, chart-aware answers", icon: Bot },
      { label: "Autonomous RCM", href: "/ai/autonomous-rcm", desc: "Code, scrub, appeal · ↓45% denials", icon: Receipt },
      { label: "Predictive Ops", href: "/ai/predictive-ops", desc: "LOS, no-show, demand forecasts", icon: TrendingUp },
      { label: "NL Analytics", href: "/ai/nl-analytics", desc: "Ask your hospital data in plain English", icon: MessageSquareText },
    ],
  },
  {
    label: "Interoperability",
    href: "/interoperability",
    menuLabel: "Standards & data",
    menuIcon: Network,
    featured: { title: "Developer platform", desc: "FHIR API, SMART apps, sandbox", href: "/developers", icon: Code2 },
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
  {
    label: "Resources",
    href: "/resources",
    menuLabel: "Learn & compare",
    menuIcon: BookOpen,
    featured: { title: "Resource hub", desc: "Blog, guides, glossary & more", href: "/resources", icon: ArrowRight },
    children: [
      { label: "Blog", href: "/resources/blog", desc: "Ideas on AI, RCM & interop", icon: BookOpen },
      { label: "Guides", href: "/resources/guides", desc: "Migration & compliance playbooks", icon: GraduationCap },
      { label: "Webinars", href: "/resources/webinars", desc: "Live sessions & replays", icon: Mic2 },
      { label: "Glossary", href: "/resources/glossary", desc: "Healthcare ERP definitions", icon: BookMarked },
      { label: "Changelog", href: "/resources/changelog", desc: "What shipped recently", icon: ScrollText },
      { label: "Customers", href: "/customers", desc: "Real outcomes & case studies", icon: Users },
      { label: "Compare", href: "/compare/vs-epic", desc: "Honest teardowns vs incumbents", icon: GitCompare },
      { label: "Developers", href: "/developers", desc: "API, FHIR, SDKs & sandbox", icon: Code2 },
      { label: "About", href: "/company/about", desc: "Mission, team & values", icon: Building2 },
      { label: "Careers", href: "/company/careers", desc: "Open roles", icon: Briefcase },
      { label: "Contact", href: "/contact", desc: "Talk to the team", icon: Mail },
      { label: "Partners", href: "/company/partners", desc: "Technology & channel partners", icon: Handshake },
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
    slug: "emr",
    name: "Electronic Medical Records (EMR)",
    tagline: "The complete digital patient chart — clear, fast, and audit-ready.",
    problem: "Paper charts and fragmented EMRs slow clinicians, lose history, and create unsafe gaps between OPD, IPD, and labs.",
    features: [
      { title: "Longitudinal record", desc: "Problems, allergies, meds, vitals, notes, and results in one timeline — amend, never overwrite." },
      { title: "Structured clinical notes", desc: "SOAP, specialty templates, and ambient AI drafts with one-tap clinician sign." },
      { title: "Orders & results loop", desc: "Labs, imaging, and meds ordered from the chart with status back in real time." },
      { title: "Access & audit", desc: "Role-based access, break-glass, and a full who-saw-what trail for compliance." },
    ],
    moats: ["FHIR-native chart", "Ambient note assist", "Full audit ledger"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "appointments",
    name: "Appointments & Scheduling",
    tagline: "Fill every slot. Cut no-shows. Keep the front desk calm.",
    problem: "Manual diaries, double bookings, and missed recalls waste doctor time and patient goodwill every day.",
    features: [
      { title: "Multi-resource calendar", desc: "Doctors, rooms, equipment, and teleconsult slots in one schedule." },
      { title: "Online & walk-in booking", desc: "Patient portal, WhatsApp link, and front-desk booking with live availability." },
      { title: "No-show prediction", desc: "ML scores every appointment so you can overbook or nudge the right patients." },
      { title: "Token & queue boards", desc: "Real-time wait display per doctor — wall screens and SMS updates." },
    ],
    moats: ["ML no-show scores", "Multi-resource slots", "Self-service booking"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "billing-invoices",
    name: "Billing & Invoices",
    tagline: "Clear patient bills, GST-ready invoices, faster collections.",
    problem: "Missed charges, unclear invoices, and slow settlements frustrate patients and leak hospital revenue.",
    features: [
      { title: "Point-of-care billing", desc: "OPD, IPD, pharmacy, and lab charges captured as care happens." },
      { title: "GST / tax invoices", desc: "Compliant invoices, credit notes, and printable / WhatsApp PDFs." },
      { title: "Packages & deposits", desc: "Health packages, deposits, advances, and itemized final bills." },
      { title: "Payments & receipts", desc: "Cash, card, UPI, and insurance co-pay with instant receipts." },
    ],
    moats: ["Zero missed charges", "GST-ready invoices", "Multi-mode payments"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "patient-reminders",
    name: "Patient Reminders",
    tagline: "Reminders that patients actually open — and show up for.",
    problem: "No-shows and missed follow-ups cost clinics revenue and delay care when patients forget appointments or meds.",
    features: [
      { title: "Appointment reminders", desc: "SMS, WhatsApp, and email before every visit with one-tap reschedule." },
      { title: "Follow-up & recall", desc: "Chronic care, post-op, and vaccination recalls on automated campaigns." },
      { title: "Medication nudges", desc: "Refill and adherence reminders tied to pharmacy and e-prescribe." },
      { title: "Consent & preference", desc: "Patients choose channel and language; every send is logged." },
    ],
    moats: ["WhatsApp + SMS", "ML-timed sends", "One-tap reschedule"],
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&q=70",
  },
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
    problem: "Legacy EMRs make doctors click 40 times to write one note. MedicoreERP makes it one voice conversation.",
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

export interface Capability {
  slug: string;
  name: string;
  hook: string;
  problem: string;
  how: string[];
  safety: string;
  outcomes: { label: string; value: string }[];
  features: { title: string; desc: string }[];
  audience: string;
  image: string;
  relatedProduct?: string;
}
export const AI_CAPABILITIES: Capability[] = [
  {
    slug: "ambient-scribe",
    name: "Ambient Scribe",
    hook: "Turn a conversation into a signed, coded note.",
    problem: "Physicians spend two hours on paperwork for every hour of care. Notes pile up after clinic, and coding quality suffers.",
    how: [
      "Capture the consult with patient consent and a one-tap mic",
      "Live transcript streams as you speak — no special dictation habits",
      "AI structures SOAP + problems + draft orders with suggested codes",
      "You review a clear before/after diff and one-tap sign",
    ],
    safety: "Nothing commits without a clinician signature. Every section is editable, attributed, and fully audited.",
    outcomes: [
      { label: "Doc time", value: "↓ 62%" },
      { label: "Same-day notes", value: "91%" },
      { label: "Coding assist", value: "Included" },
    ],
    features: [
      { title: "Live ambient capture", desc: "Room audio → streaming transcript with speaker hints and pause/resume." },
      { title: "Structured SOAP drafts", desc: "Problems, meds, vitals, and plan blocks assembled for one-tap sign." },
      { title: "Coded suggestions", desc: "ICD / procedure hints appear inline — you keep final control." },
      { title: "Diff review", desc: "See exactly what changed before the note becomes part of the legal record." },
    ],
    audience: "CMO · OPD physicians · Nursing leadership",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=70",
    relatedProduct: "clinical",
  },
  {
    slug: "clinical-copilot",
    name: "Clinical Co-pilot",
    hook: "A chart-aware assistant that always cites its source.",
    problem: "Clinicians dig through years of chart noise for one answer. Uncited AI summaries are unsafe and unusable in care.",
    how: [
      "Ask questions in the context of the open chart",
      "Get summaries, differentials, and draft replies",
      "Every answer links back to the source note, lab, or order",
      "Accept, edit, or discard — nothing writes itself into the record",
    ],
    safety: "Advisory only. Cited, never autonomous on clinical decisions. Break-glass and audit on every prompt.",
    outcomes: [
      { label: "Chart dig time", value: "↓ 40%" },
      { label: "Cited answers", value: "100%" },
      { label: "Auto-write", value: "Never" },
    ],
    features: [
      { title: "Chart-grounded Q&A", desc: "Answers only from this patient's longitudinal record — not the open web." },
      { title: "Source citations", desc: "Every claim links to the encounter, observation, or document it came from." },
      { title: "Draft assists", desc: "Discharge summaries and referral letters start as editable drafts." },
      { title: "Specialty prompts", desc: "Configured pathways for medicine, surgery, OB, and emergency." },
    ],
    audience: "CMO · Specialists · Residents",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=70",
    relatedProduct: "clinical",
  },
  {
    slug: "autonomous-rcm",
    name: "Autonomous RCM",
    hook: "Code, scrub, and appeal claims at machine speed.",
    problem: "Denial rates eat margin while billers drown in queues. Manual coding can't keep up with volume or payer rules.",
    how: [
      "AI suggests codes from the signed clinical note",
      "Claims are scrubbed against payer rules before submission",
      "Denials are predicted early; appeals are drafted with evidence",
      "A human approves every submission — AI proposed vs human decided is always visible",
    ],
    safety: "A human approves every submission and appeal. No silent auto-bill. Full attribution on every decision.",
    outcomes: [
      { label: "Denials", value: "↓ 45%" },
      { label: "Clean claim", value: "94%" },
      { label: "Appeal draft", value: "Minutes" },
    ],
    features: [
      { title: "Note → code assist", desc: "Maps documentation to suggested ICD/CPT with confidence and rationale." },
      { title: "Pre-submit scrub", desc: "Payer-specific edits catch problems before they become denials." },
      { title: "Denial prediction", desc: "Risk scores on claims so billers focus where it matters." },
      { title: "Appeal drafts", desc: "Evidence packs assembled from the chart for one-click human send." },
    ],
    audience: "CFO · RCM directors · Coders",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
    relatedProduct: "revenue-cycle",
  },
  {
    slug: "predictive-ops",
    name: "Predictive Ops",
    hook: "See problems before they happen.",
    problem: "Beds fill unexpectedly, no-shows waste slots, and inventory surprises hit the OR. Ops teams react late.",
    how: [
      "Predict length-of-stay and discharge barriers on every admission",
      "Score no-show risk on appointments and trigger recalls",
      "Forecast pharmacy and supply demand by service line",
      "Surface confidence with recommendations — never silent auto-actions",
    ],
    safety: "Predictions are decision support, shown with confidence, and never auto-acted without a human.",
    outcomes: [
      { label: "No-shows", value: "↓ 33%" },
      { label: "LOS variance", value: "↓ 18%" },
      { label: "Stock-outs", value: "↓ 25%" },
    ],
    features: [
      { title: "LOS & discharge barriers", desc: "Flag patients likely to stay longer and why — social, clinical, or financial." },
      { title: "No-show scoring", desc: "Prioritize outreach and overbooking with transparent risk scores." },
      { title: "Demand forecast", desc: "Pharmacy, labs, and consumables planned from real utilization." },
      { title: "Command-center feeds", desc: "Live predictions on the digital twin for network ops." },
    ],
    audience: "COO · Bed managers · Supply chain",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=70",
    relatedProduct: "analytics",
  },
  {
    slug: "nl-analytics",
    name: "NL Analytics",
    hook: "Ask your hospital data in plain language.",
    problem: "Executives wait weeks for reports. Analysts rewrite the same SQL. Self-serve BI tools still need a training course.",
    how: [
      "Type a question in the analytics bar — natural language",
      "Get a generated chart, table, or KPI strip",
      "Inspect the interpreted query so you trust the answer",
      "Save, share, or pin to an executive dashboard",
    ],
    safety: "Row-level security is enforced in every generated query. No PHI leaves the tenant boundary.",
    outcomes: [
      { label: "Ad-hoc time", value: "Minutes" },
      { label: "RLS enforced", value: "Always" },
      { label: "SQL required", value: "Optional" },
    ],
    features: [
      { title: "Ask-your-data", desc: "Questions like 'denial rate by payer last quarter' become charts instantly." },
      { title: "Query explain", desc: "See the interpreted filters and measures before you trust the number." },
      { title: "Role-aware", desc: "CEOs, CMOs, and ward clerks only see what their role allows." },
      { title: "Pin & share", desc: "Promote answers into live dashboards without a BI project." },
    ],
    audience: "CEO · CFO · Analytics teams",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70",
    relatedProduct: "analytics",
  },
];

export interface Competitor { slug: string; name: string; summary: string; rows: { feature: string; medicore: string; them: string }[]; theyStrong: string[] }
export const COMPETITORS: Competitor[] = [
  {
    slug: "vs-epic", name: "Epic",
    summary: "Epic is powerful and proven at mega-scale — and famously expensive, slow to deploy, and hard to use. MedicoreERP matches the breadth with modern UX and AI-native workflows.",
    rows: [
      { feature: "AI ambient scribe (default)", medicore: "Included", them: "Add-on / 3rd-party" },
      { feature: "Time to go live", medicore: "6–10 weeks", them: "12–18 months" },
      { feature: "No-code configuration", medicore: "Workflow Studio + Form Builder", them: "Consultant-led" },
      { feature: "FHIR-native API", medicore: "Default, public", them: "Available, gated" },
    ],
    theyStrong: ["Deepest specialty depth at 1000+ bed scale", "Huge existing install base & network", "Mature research/academic tooling"],
  },
  {
    slug: "vs-cerner", name: "Cerner (Oracle Health)",
    summary: "Cerner brings enterprise reach; MedicoreERP brings a modern, coherent UX and AI woven through every workflow rather than bolted on.",
    rows: [
      { feature: "Unified UX across modules", medicore: "One design system", them: "Acquired patchwork" },
      { feature: "Real-time analytics", medicore: "Streaming default", them: "Batch-heavy" },
      { feature: "Cloud-native", medicore: "Yes", them: "Migrating" },
      { feature: "AI RCM", medicore: "Autonomous", them: "Partial" },
    ],
    theyStrong: ["Strong US enterprise footprint", "Oracle infrastructure backing"],
  },
  {
    slug: "vs-athenahealth", name: "athenahealth",
    summary: "athenahealth is strong in US ambulatory RCM. MedicoreERP covers the full hospital — inpatient, OT, ICU, pharmacy, lab — with the same cloud ease and adds regional interoperability (ABDM).",
    rows: [
      { feature: "Inpatient / IPD / OT / ICU", medicore: "Full", them: "Limited" },
      { feature: "Regional compliance (ABDM)", medicore: "Native", them: "No" },
      { feature: "Multi-region (India/MENA/SEA)", medicore: "Yes", them: "US-centric" },
    ],
    theyStrong: ["Mature US payer network", "Strong ambulatory RCM"],
  },
  {
    slug: "vs-local-his", name: "Local HIS",
    summary: "Regional HIS products are affordable but dated — no AI, weak interoperability, and painful to scale across branches. MedicoreERP is the modern, AI-native upgrade path with data-freedom migration.",
    rows: [
      { feature: "AI-native workflows", medicore: "Throughout", them: "None" },
      { feature: "Command-center digital twin", medicore: "Included", them: "No" },
      { feature: "Open developer platform", medicore: "Public API + marketplace", them: "Closed" },
      { feature: "Data-freedom migration", medicore: "Guaranteed exports", them: "Lock-in" },
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
  { slug: "sunrise-multispecialty", org: "Sunrise Multispecialty", edition: "Hospital", region: "South India", challenge: "A 220-bed hospital juggling seven disconnected systems with 11% claim denials and 40-minute OPD waits.", solution: "Deployed the full MedicoreERP platform — clinical core, RCM, and command center — in 9 weeks with zero downtime migration.", metrics: [{ label: "Denials", value: "-45%" }, { label: "Doc time", value: "-62%" }, { label: "OPD wait", value: "-64%" }, { label: "Go-live", value: "9 wks" }], quote: "MedicoreERP gave us one system that finally feels like one product.", author: "Dr. Rekha Menon, Medical Director", image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=70" },
  { slug: "metro-diagnostics", org: "Metro Diagnostics", edition: "Diagnostics", region: "West India", challenge: "A lab chain with 14 outlets and manual result validation causing slow turnaround and QC gaps.", solution: "Rolled out the LIS with bidirectional analyzer integration and auto-verification across all outlets.", metrics: [{ label: "TAT", value: "-38%" }, { label: "Auto-verify", value: "71%" }, { label: "QC incidents", value: "-80%" }], quote: "Our turnaround is now the fastest in the city.", author: "Priya Rao, Lab Director", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=70" },
  { slug: "citycare-clinics", org: "CityCare Clinics", edition: "Clinic", region: "North India", challenge: "A fast-growing clinic group with paper registers, no-shows, and no follow-up recall.", solution: "Standardized on MedicoreERP's clinic edition with ML no-show scoring and recall campaigns.", metrics: [{ label: "No-shows", value: "-33%" }, { label: "Recall revenue", value: "+22%" }, { label: "Go-live", value: "3 wks" }], quote: "We recovered the subscription cost in the first month from recalls alone.", author: "Sana Khan, COO", image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1200&q=70" },
];

export interface BlogPost { slug: string; title: string; excerpt: string; category: string; author: string; date: string; readMins: number; image: string }
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "electronic-medical-records-guide",
    title: "Electronic medical records that clinicians will actually use",
    excerpt: "How a modern EMR cuts chart dig time, keeps a full audit trail, and stays FHIR-ready for ABDM and referrals.",
    category: "EMR",
    author: "Dr. Rekha Menon",
    date: "2026-07-10",
    readMins: 8,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "hospital-appointment-scheduling",
    title: "Appointment scheduling that cuts no-shows and OPD chaos",
    excerpt: "Multi-doctor calendars, online booking, token boards, and ML no-show scores — a practical playbook for clinics and hospitals.",
    category: "Appointments",
    author: "Sana Khan",
    date: "2026-07-08",
    readMins: 7,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "patient-billing-and-invoices",
    title: "Patient billing & invoices: clarity that improves collections",
    excerpt: "Itemized GST invoices, point-of-care charges, UPI/card receipts, and how clean bills reduce disputes at the counter.",
    category: "Billing",
    author: "Anil Verma",
    date: "2026-07-05",
    readMins: 6,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "patient-appointment-reminders",
    title: "Patient reminders that reduce no-shows without nagging",
    excerpt: "SMS and WhatsApp appointment nudges, follow-up recalls, and medication refill reminders that respect consent.",
    category: "Patient Engagement",
    author: "Karthik Iyer",
    date: "2026-07-02",
    readMins: 5,
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&q=70",
  },
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

/** Home “Main Features” grid — maps to product pages (reference HIS layout). */
export interface MainFeature {
  title: string;
  desc: string;
  href: string;
  icon: LucideIcon;
}

export const MAIN_FEATURES: MainFeature[] = [
  {
    title: "Patients Management",
    desc: "Register and organize every inpatient and outpatient — demographics, ABHA, visit history, and family accounts in one front-desk workflow.",
    href: "/product/patient-access",
    icon: Users,
  },
  {
    title: "Medical Records (EMR)",
    desc: "Document the full chart: consultations, vitals, lab results, imaging, allergies, meds, and signed notes with a complete audit trail.",
    href: "/product/emr",
    icon: ClipboardList,
  },
  {
    title: "Medical Forms",
    desc: "Department form templates for quick data entry — OPD, consent, nursing, and specialty forms you configure without code.",
    href: "/product/platform",
    icon: FormInput,
  },
  {
    title: "Medical Scheduling",
    desc: "Track appointments, doctor calendars, waiting lists, tokens, and inpatient schedules with no-show prediction and online booking.",
    href: "/product/appointments",
    icon: Calendar,
  },
  {
    title: "Medical Workflows",
    desc: "Streamline care with treatment plans, order sets, and accountable handoffs across OPD, IPD, OT, and discharge.",
    href: "/product/clinical",
    icon: GitBranch,
  },
  {
    title: "Medical Billing & Claims",
    desc: "Generate invoices from the chart — OPD/IPD charges, GST bills, packages, UPI/card receipts, and insurance claims.",
    href: "/product/billing-invoices",
    icon: CreditCard,
  },
  {
    title: "Wards Management",
    desc: "Assign beds and wards, track occupancy, transfers, and house-keeping status for every inpatient stay.",
    href: "/product/clinical",
    icon: BedDouble,
  },
  {
    title: "Laboratory (LIS)",
    desc: "Order tests, track samples, connect analyzers, and publish signed results back to the EMR with full TAT control.",
    href: "/product/lab",
    icon: FlaskConical,
  },
  {
    title: "Imaging / Radiology",
    desc: "RIS workflows plus zero-footprint PACS — request, schedule, report, and view studies beside the clinical chart.",
    href: "/product/radiology",
    icon: Scan,
  },
  {
    title: "Nurses Module",
    desc: "Vitals, nursing assessments, care notes, and consumables recorded at the bedside and synced to the patient record.",
    href: "/product/emr",
    icon: HeartPulse,
  },
  {
    title: "Pharmacy",
    desc: "Closed-loop dispensing — from e-prescribe to stock, indent, returns, and point-of-sale across counters and wards.",
    href: "/product/pharmacy",
    icon: Pill,
  },
  {
    title: "Inventory Management",
    desc: "Drugs and consumables with barcodes, expiry, reorder levels, and stock movements tied to clinical and pharmacy use.",
    href: "/product/supply-chain",
    icon: Barcode,
  },
];

export const LOGO_WALL = ["Sunrise Health", "Metro Network", "CityCare", "Wellness Labs", "Apollo-ish", "Rural Trust", "CarePlus", "MediGroup"];

export const FAQ_PRICING = [
  { q: "How is MedicoreERP priced?", a: "Clinics pay a flat monthly fee; hospitals pay per active bed; enterprise is custom. All plans include updates, support, and the AI features at their tier." },
  { q: "Is there a setup or migration fee?", a: "Migration from your existing system is included in onboarding for annual plans, with guaranteed data-freedom exports." },
  { q: "Can I try it before buying?", a: "Yes — start a free sandbox trial that provisions a demo tenant with sample data, or book a guided demo." },
  { q: "What's included in support?", a: "Email support on Clinic, 24×7 support and a success manager on Hospital and Enterprise." },
  { q: "Do AI features cost extra?", a: "No. Ambient scribe, co-pilot, and predictive features are included at the Hospital tier and above." },
];

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  gated: boolean;
  readMins: number;
  image: string;
}
export const GUIDES: Guide[] = [
  {
    slug: "his-migration-playbook",
    title: "HIS migration playbook: zero-downtime cutover",
    excerpt: "A step-by-step guide to migrating from a legacy hospital information system without freezing clinical operations.",
    category: "Implementation",
    gated: true,
    readMins: 18,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "rcm-denial-reduction",
    title: "Revenue cycle denial-reduction checklist",
    excerpt: "The operational checklist CFOs use to cut denials by 40%+ with AI coding, scrubbing, and appeal workflows.",
    category: "Revenue Cycle",
    gated: true,
    readMins: 12,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "abdm-compliance-guide",
    title: "ABDM compliance guide for Indian hospitals",
    excerpt: "Everything buyers need to evaluate ABHA, consent, and health-information exchange readiness.",
    category: "Compliance",
    gated: false,
    readMins: 14,
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&q=70",
  },
];

export interface Webinar {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  speakers: string[];
  status: "upcoming" | "replay";
  image: string;
}
export const WEBINARS: Webinar[] = [
  {
    slug: "ambient-scribe-roi",
    title: "Ambient scribe ROI: what 90 days of data shows",
    excerpt: "Live walkthrough of documentation-time savings and how CMOs measure clinician adoption.",
    date: "2026-07-22",
    speakers: ["Dr. Rekha Menon", "Karthik Iyer"],
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "fhir-cio-briefing",
    title: "CIO briefing: FHIR-first interoperability",
    excerpt: "How CIOs evaluate FHIR R4 APIs, SMART apps, and data-freedom migration clauses.",
    date: "2026-06-10",
    speakers: ["Anil Verma", "Sana Khan"],
    status: "replay",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=70",
  },
];

export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  related: string[];
}
export const GLOSSARY: GlossaryTerm[] = [
  {
    slug: "emr",
    term: "EMR / Electronic Medical Records",
    definition: "A digital chart that stores a patient’s clinical history — notes, problems, medications, orders, and results — with audit trails and role-based access.",
    related: ["his", "fhir", "appointments"],
  },
  {
    slug: "appointments",
    term: "Appointments",
    definition: "Scheduling of patient visits with doctors, rooms, or teleconsult slots, including online booking, queues, and no-show management.",
    related: ["emr", "patient-reminders"],
  },
  {
    slug: "billing-invoices",
    term: "Billing & Invoices",
    definition: "Creating itemized patient bills and tax invoices for OPD/IPD, pharmacy, and lab services, including payments and receipts.",
    related: ["rcm", "clean-claim"],
  },
  {
    slug: "patient-reminders",
    term: "Patient Reminders",
    definition: "Automated SMS, WhatsApp, or email messages that remind patients about appointments, follow-ups, and medication refills.",
    related: ["appointments", "emr"],
  },
  {
    slug: "fhir",
    term: "FHIR",
    definition: "Fast Healthcare Interoperability Resources — the modern HL7 standard for exchanging healthcare data as discrete resources such as Patient, Encounter, and Observation.",
    related: ["hl7", "abdm", "smart-on-fhir"],
  },
  {
    slug: "hl7",
    term: "HL7 v2",
    definition: "A widely deployed messaging standard used for lab interfaces, ADT events, and legacy hospital system integrations.",
    related: ["fhir", "lis"],
  },
  {
    slug: "abdm",
    term: "ABDM",
    definition: "Ayushman Bharat Digital Mission — India’s national digital health framework covering ABHA IDs, registries, consent, and health information exchange.",
    related: ["fhir", "abha"],
  },
  {
    slug: "abha",
    term: "ABHA",
    definition: "Ayushman Bharat Health Account — a unique health ID that links a patient’s consented health records across facilities.",
    related: ["abdm"],
  },
  {
    slug: "rcm",
    term: "Revenue Cycle Management (RCM)",
    definition: "The end-to-end financial workflow from patient registration and coding through claims submission, denial management, and collections.",
    related: ["denial-management", "clean-claim"],
  },
  {
    slug: "denial-management",
    term: "Denial Management",
    definition: "The process of preventing, predicting, appealing, and resolving rejected or unpaid insurance claims.",
    related: ["rcm", "clean-claim"],
  },
  {
    slug: "clean-claim",
    term: "Clean Claim",
    definition: "A claim submitted with complete, accurate coding and documentation so it can be paid on first submission without manual intervention.",
    related: ["rcm", "denial-management"],
  },
  {
    slug: "lis",
    term: "LIS",
    definition: "Laboratory Information System — software that manages sample accessioning, analyzer interfaces, QC, and result reporting.",
    related: ["hl7", "fhir"],
  },
  {
    slug: "smart-on-fhir",
    term: "SMART on FHIR",
    definition: "An authorization framework that lets third-party apps securely launch inside an EHR using OAuth 2.0 scopes over FHIR APIs.",
    related: ["fhir"],
  },
  {
    slug: "his",
    term: "HIS / Hospital ERP",
    definition: "Hospital Information System or medical ERP — the operational platform covering clinical, ancillary, revenue, supply chain, and workforce workflows.",
    related: ["fhir", "rcm"],
  },
];

export interface ChangelogEntry {
  date: string;
  version: string;
  area: string;
  title: string;
  notes: string[];
}
export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-07-08",
    version: "2026.7",
    area: "Clinical",
    title: "Ambient scribe diff review",
    notes: ["Side-by-side note diff before sign", "Faster mic reconnect on flaky Wi-Fi", "Improved allergy alert explainability"],
  },
  {
    date: "2026-06-20",
    version: "2026.6",
    area: "Revenue Cycle",
    title: "Autonomous denial queue",
    notes: ["AI vs human decision labels on every appeal", "Bulk scrub before submission", "Payer-specific rule packs for India TPAs"],
  },
  {
    date: "2026-05-28",
    version: "2026.5",
    area: "Platform",
    title: "Workflow Studio v2",
    notes: ["Live preview for care pathways", "Form Builder validation rules", "White-label token injection improvements"],
  },
];

export interface MarketplaceApp {
  slug: string;
  name: string;
  category: string;
  desc: string;
  publisher: string;
}
export const MARKETPLACE_APPS: MarketplaceApp[] = [
  { slug: "vitals-edge", name: "Vitals Edge", category: "Devices", desc: "Stream bedside device vitals into the chart with FHIR Observations.", publisher: "MedicoreERP Labs" },
  { slug: "claim-scrub-pro", name: "Claim Scrub Pro", category: "RCM", desc: "Payer-specific scrubbing rules layered on Autonomous RCM.", publisher: "RCM Collective" },
  { slug: "patient-recall", name: "Patient Recall Studio", category: "Engagement", desc: "WhatsApp/SMS recall campaigns driven by ML no-show scores.", publisher: "CareReach" },
  { slug: "dicom-ai-triage", name: "DICOM AI Triage", category: "Imaging", desc: "Priority flags for STAT studies inside the zero-footprint viewer.", publisher: "PixelHealth" },
];

/** Site origin used for canonical URLs, sitemap, and structured data. */
export const SITE_URL = "https://medicoreerp.com";
export const SITE_NAME = "MedicoreERP";
