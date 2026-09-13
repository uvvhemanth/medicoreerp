/** Marketing content (CMS-ready, local now — Requirements §7.4). */
import type { LucideIcon } from "lucide-react";
import {
  Users, Stethoscope, Pill, FlaskConical, Scan, Receipt, Boxes, UsersRound,
  BarChart3, Settings2, Building2, Microscope, Network, Landmark, Mic, Bot,
  TrendingUp, MessageSquareText, Sparkles, Share2, Globe, ArrowLeftRight,
  ShieldCheck, BadgeCheck, Activity, BookOpen, Code2, Blocks,
  ArrowRight, Zap, Tag, Calculator, Mail, Calendar, FileText, Bell, ClipboardList, LayoutDashboard,
  HeartPulse, BedDouble, CreditCard, GitBranch, FormInput, Barcode,
  UserPlus, MapPin, ClipboardPen, FolderOpen, Ambulance, Hospital, Workflow, TestTube2, Package, ShoppingCart, RotateCcw,
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
      { label: "Analytics", href: "/product/analytics", desc: "Dashboards, KPIs & MIS reports", icon: BarChart3, badge: "New" },
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
      { label: "Clinics", href: "/solutions/clinic-management-software", desc: "OPD, billing & patient access", icon: Stethoscope },
      { label: "Hospitals", href: "/solutions/hospital-management-software", desc: "Full hospital operations", icon: Building2 },
      { label: "Diagnostics / Labs", href: "/solutions/laboratory-management-software", desc: "LIS, RIS & reporting", icon: Microscope },
      { label: "Pharmacy Chains", href: "/solutions/pharmacy-management-software", desc: "Multi-store inventory & POS", icon: Pill },
      { label: "Enterprise Networks", href: "/solutions/enterprise-healthcare-erp", desc: "Multi-branch · custom rollout", icon: Network },
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
      { label: "Ambient Scribe", href: "/ai/ambient-scribe", desc: "Conversation → structured notes", icon: Mic },
      { label: "Clinical Co-pilot", href: "/ai/clinical-copilot", desc: "Chart-aware patient context", icon: Bot },
      { label: "Autonomous RCM", href: "/ai/autonomous-rcm", desc: "Code, scrub, track and resolve claims", icon: Receipt },
      { label: "Predictive Ops", href: "/ai/predictive-operations", desc: "No-shows, beds and patient flow", icon: TrendingUp },
      { label: "NL Analytics", href: "/ai/nl-analytics", desc: "Ask hospital data in plain language", icon: MessageSquareText },
    ],
  },
  {
    label: "Interoperability",
    href: "/interoperability",
    menuLabel: "Standards & data",
    menuIcon: Network,
    featured: { title: "Standards hub", desc: "FHIR, HL7, DICOM & regional compliance", href: "/interoperability", icon: Network },
    children: [
      { label: "Third-party API Integrations", href: "/integrations/third-party-api", desc: "Labs, PACS, payments, insurance & external apps", icon: Code2, badge: "New" },
      { label: "WhatsApp Integration", href: "/integrations/whatsapp", desc: "Reminders, reports, invoices & patient messages", icon: MessageSquareText, badge: "New" },
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
    menuLabel: "Learn & connect",
    menuIcon: BookOpen,
    featured: { title: "Resource hub", desc: "Blog, about us & contact", href: "/resources", icon: ArrowRight },
    children: [
      { label: "Blog", href: "/resources/blog", desc: "Ideas on AI, RCM & interop", icon: BookOpen },
      { label: "About Us", href: "/company/about", desc: "Mission, team & values", icon: Building2 },
      { label: "Contact", href: "/contact", desc: "Talk to the team", icon: Mail },
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
  features: { title: string; desc: string; icon?: LucideIcon }[];
  moats: string[];
  image: string;
  overview?: string[];
  benefits?: string[];
  faqs?: { q: string; a: string }[];
  seo?: { title: string; description: string; keywords?: string[] };
}

export const PRODUCT_DOMAINS: ProductDomain[] = [
  {
    slug: "emr",
    name: "Electronic Medical Records (EMR)",
    tagline: "Keep complete patient clinical information accessible to authorized healthcare teams.",
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
    tagline: "Manage doctor availability, patient appointments and consultation schedules.",
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
    tagline: "Simplify hospital billing, payments, insurance and financial workflows.",
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
    tagline: "Improve patient communication with appointment and follow-up reminders.",
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
    name: "Clinical Management",
    tagline: "Give doctors and care teams access to connected clinical information throughout the patient journey.",
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
    tagline: "Connect patient services, billing, payments and financial operations for better visibility.",
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
    name: "Hospital Analytics Software",
    tagline: "Turn Hospital Data into Clear, Actionable Insights",
    problem: "Hospitals generate large amounts of information across clinical, operational, administrative, and financial workflows — and too often it stays locked in disconnected reports and spreadsheets.",
    overview: [
      "Hospitals generate large amounts of information across clinical, operational, administrative, and financial workflows. MedicoreERP Hospital Analytics Software brings this information together through easy-to-understand dashboards, reports, and performance indicators.",
      "Management teams can analyze patient volumes, OPD and IPD activity, revenue, collections, bed occupancy, department performance, inventory, and other hospital KPIs without manually combining information from multiple spreadsheets.",
      "With better access to hospital data, decision-makers can identify trends, compare performance, and understand where operational attention may be required.",
    ],
    features: [
      { title: "Hospital KPI Dashboards", desc: "Monitor important clinical, operational, and financial performance indicators.", icon: LayoutDashboard },
      { title: "Patient Volume Analytics", desc: "Analyze consultations, visits, admissions, and discharge activity over time.", icon: Users },
      { title: "Revenue Analytics", desc: "Review billing, collections, outstanding balances, and financial trends.", icon: TrendingUp },
      { title: "OPD & IPD Analytics", desc: "Compare outpatient and inpatient volumes and service utilization.", icon: Activity },
      { title: "Bed Occupancy Reports", desc: "Monitor bed availability, occupancy, and utilization patterns.", icon: BedDouble },
      { title: "Department Performance", desc: "Compare operational activity and performance across hospital departments.", icon: Building2 },
      { title: "Billing & Collection Analytics", desc: "Understand billed amounts, collected payments, and outstanding balances.", icon: Receipt },
      { title: "Inventory Insights", desc: "Review stock levels, consumption, purchasing, and inventory trends.", icon: Boxes },
      { title: "Operational MIS Reports", desc: "Generate structured reports for hospital management and operational review.", icon: FileText },
      { title: "Trend & Comparison Reports", desc: "Compare performance across time periods, departments, services, or hospital locations.", icon: BarChart3 },
    ],
    benefits: [
      "Faster data-driven decision-making",
      "Better hospital performance visibility",
      "Reduced manual spreadsheet reporting",
      "Easier KPI monitoring",
      "Better departmental comparison",
      "Clearer operational and financial insights",
    ],
    faqs: [
      {
        q: "What is hospital analytics software?",
        a: "Hospital analytics software turns clinical, operational, and financial information into dashboards, KPIs, reports, and trends.",
      },
      {
        q: "What KPIs can hospitals monitor?",
        a: "Hospitals can monitor patient volumes, OPD/IPD activity, occupancy, revenue, collections, department performance, inventory, and other relevant indicators.",
      },
      {
        q: "Can hospital analytics reduce spreadsheet reporting?",
        a: "Yes. Centralized reporting can reduce the need to manually collect and combine information from multiple spreadsheets.",
      },
      {
        q: "Who can use hospital analytics?",
        a: "Hospital administrators, management teams, finance teams, department heads, and other authorized decision-makers can use analytics to monitor performance.",
      },
    ],
    seo: {
      title: "Hospital Analytics & MIS Software | MedicoreERP",
      description: "Turn hospital clinical, operational and financial data into dashboards, KPIs and MIS reports with MedicoreERP Hospital Analytics Software.",
      keywords: [
        "Hospital Analytics Software",
        "Healthcare analytics software",
        "hospital MIS software",
        "hospital KPI dashboard",
        "healthcare business intelligence",
        "hospital reporting software",
      ],
    },
    moats: ["Hospital KPI dashboards", "MIS reports", "Revenue & occupancy analytics"],
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
  priceFrom: string;
  href?: string;
}

export const SOLUTIONS: Solution[] = [
  { slug: "clinics", href: "/solutions/clinic-management-software", name: "Clinics", hero: "Everything a growing clinic needs, nothing it doesn't.", pains: ["Paper registers & no-shows", "Manual billing", "No follow-up recall"], bundle: ["Patient Access", "OPD & e-Prescribe", "Billing", "Pharmacy-lite", "Patient Portal"], priceFrom: "₹8,000/mo" },
  { slug: "hospitals", href: "/solutions/hospital-management-software", name: "Hospitals", hero: "Run the whole hospital on one platform.", pains: ["Fragmented departmental systems", "Revenue leakage", "Bed & OT chaos"], bundle: ["Full Clinical Core", "IPD/ER/OT/ICU", "Pharmacy/Lab/Radiology", "Autonomous RCM", "Analytics"], priceFrom: "₹1,200/bed/mo" },
  { slug: "diagnostics", href: "/solutions/laboratory-management-software", name: "Diagnostics / Labs", hero: "From sample to signed report, automated.", pains: ["Analyzer silos", "QC scramble", "Slow TAT"], bundle: ["LIS", "RIS/PACS", "Home-collection", "Patient reports", "B2B portal"], priceFrom: "₹15,000/mo" },
  { slug: "pharmacy", href: "/solutions/pharmacy-management-software", name: "Pharmacy Chains", hero: "One ledger across every outlet.", pains: ["Stock-outs & expiry loss", "No central visibility", "Manual reorder"], bundle: ["Multi-store inventory", "POS & returns", "Demand forecast", "Loyalty", "Analytics"], priceFrom: "₹6,000/store/mo" },
  { slug: "enterprise", href: "/solutions/enterprise-healthcare-erp", name: "Enterprise Networks", hero: "Coherence across every branch.", pains: ["Inconsistent processes", "No network view", "Slow rollout"], bundle: ["Everything", "Command Center", "Multi-tenant admin", "Developer platform", "Dedicated success"], priceFrom: "Custom" },
  { slug: "government", name: "Government / Payer", hero: "Public-health scale, compliant by default.", pains: ["ABDM mandates", "Population reporting", "Interoperability"], bundle: ["ABDM-ready HMIS", "Registries", "Claims/TPA", "Analytics", "Data-freedom exports"], priceFrom: "Custom" },
];

export const CLINIC_LANDING = {
  seo: {
    title: "Clinic Management Software in Hyderabad | MedicoreERP",
    description:
      "Manage appointments, EMR, prescriptions, billing, diagnostics and patient follow-ups with MedicoreERP Clinic Management Software in Hyderabad.",
    keywords: [
      "Clinic Management Software in Hyderabad",
      "Clinic management system",
      "clinic ERP software",
      "clinic software Hyderabad",
      "EMR software for clinics",
      "polyclinic management software",
      "doctor clinic software",
      "OPD management software",
      "clinic billing software",
      "medical practice management software",
    ],
    canonical: "/solutions/clinic-management-software",
  },
  heroTitle: "Clinic Management Software Built Around the Patient Visit",
  heroSubtitle: "From Appointment to Follow-Up—Manage Your Clinic in One Place.",
  overview: [
    "Running a clinic should not mean switching between appointment books, paper records, billing applications and spreadsheets.",
    "MedicoreERP Clinic Management Software connects your front desk, doctors, diagnostics, pharmacy, billing and patient communication through one easy-to-manage platform.",
    "Whether you operate a single-doctor practice, specialty clinic, polyclinic or multi-location medical centre, MedicoreERP helps your team spend less time managing administrative work and more time focusing on patient care.",
  ],
  journey: [
    { step: "1", title: "Appointment" },
    { step: "2", title: "Check-in" },
    { step: "3", title: "Consultation" },
    { step: "4", title: "Diagnostics" },
    { step: "5", title: "Billing" },
    { step: "6", title: "Follow-up" },
  ],
  audiences: [
    {
      title: "Single-Doctor Clinics",
      desc: "Keep appointments, consultation history, prescriptions and billing organized without unnecessary complexity.",
      icon: Stethoscope,
    },
    {
      title: "Specialty Clinics",
      desc: "Configure clinical documentation and workflows around the needs of your specialty.",
      icon: HeartPulse,
    },
    {
      title: "Multi-Specialty Clinics",
      desc: "Connect multiple doctors, departments, schedules and patient records through one system.",
      icon: Users,
    },
    {
      title: "Polyclinics & Medical Centres",
      desc: "Coordinate higher patient volumes, diagnostics, billing and multiple specialties from a centralized platform.",
      icon: Building2,
    },
    {
      title: "Multi-Location Clinic Networks",
      desc: "Standardize operations and maintain centralized visibility across branches.",
      icon: Network,
    },
  ],
  modules: [
    {
      title: "Patient Registration",
      desc: "Create a centralized patient profile with demographics, contact information, visit history and clinical information.",
      icon: UserPlus,
      href: "/product/patient-access",
    },
    {
      title: "Smart Appointment Scheduling",
      desc: "Manage doctors, consultation slots, patient queues, waiting lists, rescheduling and follow-up appointments.",
      icon: Calendar,
      href: "/product/appointments",
    },
    {
      title: "OPD Management",
      desc: "Connect patient check-in, consultation, diagnosis, clinical orders, prescription and billing within one outpatient workflow.",
      icon: Activity,
      href: "/product/clinical",
    },
    {
      title: "Electronic Medical Records",
      desc: "Maintain diagnoses, allergies, medications, vitals, clinical notes, medical history and previous visits digitally.",
      icon: ClipboardList,
      href: "/product/emr",
    },
    {
      title: "Clinical Documentation",
      desc: "Give doctors access to structured medical forms, consultation notes and configurable specialty workflows.",
      icon: ClipboardPen,
      href: "/product/clinical",
    },
    {
      title: "e-Prescriptions",
      desc: "Generate digital prescriptions as part of the patient's clinical record and connect prescriptions with pharmacy workflows.",
      icon: Pill,
      href: "/product/pharmacy",
    },
    {
      title: "Laboratory & Radiology",
      desc: "Create diagnostic orders and make laboratory and imaging information available within the patient journey.",
      icon: FlaskConical,
      href: "/product/lab",
    },
    {
      title: "Billing & Payments",
      desc: "Generate consultation and service bills, invoices, receipts and payment records without duplicate entry.",
      icon: CreditCard,
      href: "/product/billing-invoices",
    },
    {
      title: "Patient Communication",
      desc: "Send appointment confirmations, reminders, follow-up communication, report notifications and supported payment links through connected communication workflows.",
      icon: MessageSquareText,
      href: "/integrations/whatsapp",
    },
    {
      title: "Reports & Analytics",
      desc: "Monitor appointments, consultations, patient volumes, revenue and operational activity.",
      icon: BarChart3,
      href: "/product/analytics",
    },
    {
      title: "Role-Based Access",
      desc: "Provide doctors, front-office teams, billing staff and administrators access based on their responsibilities.",
      icon: ShieldCheck,
      href: "/product/platform",
    },
    {
      title: "Multi-Location Management",
      desc: "Maintain consistent workflows and reporting across multiple clinic locations.",
      icon: MapPin,
      href: "/solutions/enterprise-healthcare-erp",
    },
  ],
  reasons: [
    {
      title: "One Patient Record",
      desc: "Give authorized teams access to connected clinical information instead of scattered paper files and applications.",
      icon: FolderOpen,
    },
    {
      title: "Faster Front Desk",
      desc: "Simplify registration, appointments, queues and patient check-ins.",
      icon: UserPlus,
    },
    {
      title: "Better Doctor Experience",
      desc: "Put patient history, diagnostics, prescriptions and consultation information where doctors need it.",
      icon: Stethoscope,
    },
    {
      title: "Connected Billing",
      desc: "Turn delivered services into billing information without unnecessary re-entry.",
      icon: CreditCard,
    },
    {
      title: "Better Patient Engagement",
      desc: "Keep patients informed before and after visits with reminders and follow-ups.",
      icon: Bell,
    },
    {
      title: "Ready to Grow",
      desc: "Move from a single clinic to multiple locations without replacing the core platform.",
      icon: Network,
    },
  ],
  faqs: [
    {
      q: "What is clinic management software?",
      a: "Clinic management software connects patient registration, appointments, clinical records, prescriptions, billing, diagnostics, reports and day-to-day clinic administration in one digital system.",
    },
    {
      q: "Is MedicoreERP suitable for a small clinic?",
      a: "Yes. MedicoreERP is modular, so smaller clinics can focus on the workflows they need while retaining the ability to expand as the practice grows.",
    },
    {
      q: "Can MedicoreERP support a multi-specialty clinic?",
      a: "Yes. Multiple doctors, departments, specialties, schedules and clinical workflows can be managed through the platform.",
    },
    {
      q: "Does MedicoreERP include EMR?",
      a: "Yes. MedicoreERP maintains consultations, diagnoses, vitals, allergies, medicines and patient history through connected electronic medical records.",
    },
    {
      q: "Can laboratory and radiology reports connect with the patient record?",
      a: "Yes. MedicoreERP connects laboratory and radiology workflows with patient information.",
    },
    {
      q: "Can clinics use WhatsApp reminders?",
      a: "MedicoreERP provides WhatsApp integration for booking confirmations, appointment reminders, report notifications, follow-ups and related patient communication.",
    },
    {
      q: "Can MedicoreERP support several clinic branches?",
      a: "Yes. It can support centralized workflows and reporting for multi-location healthcare organizations.",
    },
  ],
};

export const HOSPITAL_LANDING = {
  seo: {
    title: "Hospital Management System in Hyderabad | MedicoreERP",
    description:
      "Connect OPD, IPD, EMR, laboratory, radiology, pharmacy, insurance and billing with MedicoreERP Hospital Management Software in Hyderabad.",
    keywords: [
      "Hospital Management System in Hyderabad",
      "Hospital Management Software Hyderabad",
      "hospital ERP software",
      "HMS software Hyderabad",
      "HIS software",
      "healthcare ERP",
      "hospital information system",
      "multi-specialty hospital software",
      "hospital billing software",
    ],
    canonical: "/solutions/hospital-management-software",
  },
  heroTitle: "Run Your Entire Hospital on One Connected Platform",
  heroSubtitle: "One Patient Journey. Every Department Connected.",
  overview: [
    "Hospitals become difficult to manage when clinical, operational and financial information sits across different systems.",
    "MedicoreERP Hospital Management System connects patient registration, OPD, IPD, EMR, nursing, diagnostics, radiology, pharmacy, inventory, insurance, billing and discharge through one integrated healthcare platform.",
    "From the patient's first appointment through treatment and follow-up, every department works from connected information.",
  ],
  audiences: [
    {
      title: "Specialty Hospitals",
      desc: "Digitize clinical and operational workflows without unnecessary complexity.",
      icon: Stethoscope,
    },
    {
      title: "Multi-Specialty Hospitals",
      desc: "Connect doctors, nurses, diagnostics, pharmacy, administration and finance.",
      icon: Building2,
    },
    {
      title: "Large Hospitals",
      desc: "Support high-volume departmental workflows and centralized reporting.",
      icon: Hospital,
    },
    {
      title: "Hospital Groups",
      desc: "Manage multiple facilities with standardized processes and enterprise visibility.",
      icon: Network,
    },
  ],
  modules: [
    {
      title: "Patient Registration & UHID",
      desc: "Create and maintain centralized patient identities and visit histories.",
      icon: UserPlus,
      href: "/product/patient-access",
    },
    {
      title: "Appointments & Front Office",
      desc: "Manage bookings, check-ins, doctor schedules, queues and reminders.",
      icon: Calendar,
      href: "/product/appointments",
    },
    {
      title: "OPD Management",
      desc: "Connect consultation, EMR, clinical orders, prescriptions and billing.",
      icon: Activity,
      href: "/product/clinical",
    },
    {
      title: "IPD / ADT Management",
      desc: "Manage admissions, beds, wards, transfers and inpatient movement.",
      icon: BedDouble,
      href: "/product/clinical",
    },
    {
      title: "Electronic Medical Records",
      desc: "Maintain longitudinal clinical information throughout the care journey.",
      icon: ClipboardList,
      href: "/product/emr",
    },
    {
      title: "Nursing Management",
      desc: "Manage vitals, nursing assessments, notes, medications and bedside-care records.",
      icon: HeartPulse,
      href: "/product/emr",
    },
    {
      title: "Emergency & Day Care",
      desc: "Support acute and short-stay patient workflows.",
      icon: Ambulance,
      href: "/product/clinical",
    },
    {
      title: "Operation Theatre",
      desc: "Coordinate theatre schedules, procedures and related patient workflows.",
      icon: ClipboardPen,
      href: "/product/clinical",
    },
    {
      title: "ICU / Critical Care",
      desc: "Maintain structured information for critical-care teams.",
      icon: Activity,
      href: "/product/clinical",
    },
    {
      title: "Laboratory / LIS",
      desc: "Connect test ordering, samples, processing, results and reports.",
      icon: FlaskConical,
      href: "/product/lab",
    },
    {
      title: "Radiology / RIS + PACS",
      desc: "Manage imaging orders, reports and DICOM workflows. MedicoreERP also provides an in-browser DICOM viewer and structured reporting capabilities.",
      icon: Scan,
      href: "/product/radiology",
    },
    {
      title: "Pharmacy",
      desc: "Connect prescriptions, verification, dispensing, inventory, batch and expiry management.",
      icon: Pill,
      href: "/product/pharmacy",
    },
    {
      title: "Inventory & Procurement",
      desc: "Manage medicines, consumables, purchasing, stock and departmental supplies.",
      icon: Boxes,
      href: "/product/supply-chain",
    },
    {
      title: "Billing & Revenue Cycle",
      desc: "Connect clinical services with invoices, payments, claims and financial workflows.",
      icon: CreditCard,
      href: "/product/billing-invoices",
    },
    {
      title: "Insurance & eClaims",
      desc: "Manage eligibility, pre-authorization, claims and settlement-related workflows.",
      icon: ShieldCheck,
      href: "/product/revenue-cycle",
    },
    {
      title: "Discharge Management",
      desc: "Coordinate discharge summaries, medicines, final billing and follow-up.",
      icon: FileText,
      href: "/product/clinical",
    },
    {
      title: "Hospital Analytics & MIS",
      desc: "Monitor patient volumes, revenue, collections, occupancy, departments, inventory and hospital KPIs.",
      icon: BarChart3,
      href: "/product/analytics",
    },
  ],
  journey: [
    "Registration",
    "Appointment",
    "OPD",
    "Diagnostics",
    "Pharmacy",
    "IPD",
    "Treatment",
    "Billing",
    "Discharge",
    "Follow-Up",
  ],
  differentiators: [
    {
      title: "Complete Patient Journey",
      desc: "Registration → Appointment → OPD → Diagnostics → Pharmacy → IPD → Treatment → Billing → Discharge → Follow-Up",
      icon: GitBranch,
    },
    {
      title: "Open Healthcare Interoperability",
      desc: "MedicoreERP supports FHIR R4, HL7 v2, DICOM, REST APIs, webhooks and ABDM-related integrations.",
      icon: Share2,
    },
    {
      title: "Configurable Instead of Rigid",
      desc: "Workflow Studio, Form Builder and role-based permissions allow healthcare organizations to configure processes around their operating model.",
      icon: Workflow,
    },
    {
      title: "Financial Visibility",
      desc: "Connect services, charges, billing, insurance and collections rather than treating finance as an isolated module.",
      icon: Receipt,
    },
    {
      title: "Data-Driven Management",
      desc: "Use KPIs and analytics to understand occupancy, revenue, patient activity, departmental performance and inventory.",
      icon: LayoutDashboard,
    },
  ],
  faqs: [
    {
      q: "What is a Hospital Management System?",
      a: "A Hospital Management System connects clinical, administrative and financial hospital processes through one information platform.",
    },
    {
      q: "Which hospital departments can MedicoreERP manage?",
      a: "MedicoreERP covers front office, OPD, IPD, EMR, nursing, OT, ICU, laboratory, radiology, pharmacy, inventory, billing, insurance, discharge and analytics.",
    },
    {
      q: "Does MedicoreERP support both OPD and IPD?",
      a: "Yes. Outpatient and inpatient workflows operate within the same connected platform.",
    },
    {
      q: "Does MedicoreERP integrate with LIS, RIS and PACS?",
      a: "Yes. Its integration layer supports laboratory/analyzer connections as well as radiology, RIS, PACS and DICOM workflows.",
    },
    {
      q: "Does MedicoreERP support ABDM?",
      a: "MedicoreERP provides ABDM and ABHA-related integration capabilities, including consent-based information exchange.",
    },
    {
      q: "Is MedicoreERP suitable for a hospital group?",
      a: "Yes. Its platform, role controls, integrations and analytics are designed to support more complex and multi-location environments.",
    },
  ],
};

export const LABORATORY_LANDING = {
  seo: {
    title: "Laboratory Management Software Hyderabad | MedicoreERP",
    description:
      "Manage test orders, samples, processing, results, reports, billing and analyzers with MedicoreERP Laboratory Management Software.",
    keywords: [
      "Laboratory Management Software in Hyderabad",
      "LIMS software Hyderabad",
      "laboratory information system",
      "diagnostic lab software",
      "pathology lab software",
      "sample management software",
      "lab billing software",
      "diagnostic centre management software",
    ],
    canonical: "/solutions/laboratory-management-software",
  },
  heroTitle: "From Test Order to Final Report—Connect the Entire Lab Workflow",
  heroSubtitle: "Laboratory Management Software in Hyderabad",
  overview: [
    "MedicoreERP helps diagnostic centres and laboratories digitize the complete sample journey while keeping laboratory information connected with the patient's healthcare record.",
    "Manage orders, samples, processing, analyzer integrations, results, reports, billing and operational information from one connected platform.",
  ],
  journey: [
    { step: "1", title: "Order" },
    { step: "2", title: "Collection" },
    { step: "3", title: "Tracking" },
    { step: "4", title: "Processing" },
    { step: "5", title: "Validation" },
    { step: "6", title: "Report" },
  ],
  modules: [
    {
      title: "Patient Registration",
      desc: "Create or retrieve patient information for diagnostic services.",
      icon: UserPlus,
      href: "/product/patient-access",
    },
    {
      title: "Test & Package Management",
      desc: "Configure tests, profiles, panels and packages.",
      icon: Package,
      href: "/product/lab",
    },
    {
      title: "Order Management",
      desc: "Manage laboratory orders from doctors, hospitals or direct patients.",
      icon: ClipboardList,
      href: "/product/lab",
    },
    {
      title: "Sample Collection",
      desc: "Record specimen collection details.",
      icon: TestTube2,
      href: "/product/lab",
    },
    {
      title: "Sample Tracking",
      desc: "Track sample status throughout laboratory processing.",
      icon: Barcode,
      href: "/product/lab",
    },
    {
      title: "Analyzer Integration",
      desc: "Exchange orders, sample status, quality-control information and signed results with compatible analyzers.",
      icon: Share2,
      href: "/integrations/third-party-api",
    },
    {
      title: "Result Entry & Validation",
      desc: "Record and review results through structured workflows.",
      icon: BadgeCheck,
      href: "/product/lab",
    },
    {
      title: "Report Management",
      desc: "Generate and publish diagnostic reports linked to the patient record.",
      icon: FileText,
      href: "/product/lab",
    },
    {
      title: "Billing & Payments",
      desc: "Connect investigations, packages and services with billing.",
      icon: CreditCard,
      href: "/product/billing-invoices",
    },
    {
      title: "Inventory Management",
      desc: "Track reagents, consumables and laboratory materials.",
      icon: Boxes,
      href: "/product/supply-chain",
    },
    {
      title: "Multi-Centre Operations",
      desc: "Maintain visibility across diagnostic centres and collection locations.",
      icon: MapPin,
      href: "/solutions/enterprise-healthcare-erp",
    },
    {
      title: "Analytics & MIS",
      desc: "Monitor volumes, operational activity and financial performance.",
      icon: BarChart3,
      href: "/product/analytics",
    },
  ],
  faqs: [
    {
      q: "What is a Laboratory Information Management System?",
      a: "A LIMS/LIS manages test orders, samples, laboratory processing, results, reports and related diagnostic operations.",
    },
    {
      q: "Can MedicoreERP track samples?",
      a: "Yes. MedicoreERP supports test-order, sample, processing and result workflows.",
    },
    {
      q: "Can MedicoreERP connect with laboratory analyzers?",
      a: "Yes. Compatible analyzers can exchange orders, sample status, QC information and signed results through MedicoreERP integrations.",
    },
    {
      q: "Can results become part of the patient's record?",
      a: "Yes. Laboratory information can be connected directly with patient records.",
    },
    {
      q: "Does MedicoreERP support multi-location diagnostic operations?",
      a: "Its centralized architecture can support organizations operating across locations.",
    },
    {
      q: "Does it provide laboratory billing?",
      a: "Yes. Laboratory services can be connected with billing and payment workflows.",
    },
  ],
};

export const PHARMACY_LANDING = {
  seo: {
    title: "Pharmacy Management Software Hyderabad | MedicoreERP",
    description:
      "Connect dispensing, inventory, batch, expiry, procurement and billing with MedicoreERP Pharmacy Management Software in Hyderabad.",
    keywords: [
      "Pharmacy Management Software in Hyderabad",
      "Pharmacy ERP software",
      "hospital pharmacy software",
      "pharmacy chain software",
      "medicine inventory software",
      "pharmacy billing software",
      "pharmacy stock management",
      "batch expiry software",
    ],
    canonical: "/solutions/pharmacy-management-software",
  },
  heroTitle: "One Pharmacy Platform. From Prescription to Dispensing and Stock.",
  heroSubtitle: "Pharmacy Management Software in Hyderabad",
  overview: [
    "MedicoreERP connects prescriptions with verification, dispensing, inventory, batches, expiry dates and billing so pharmacy teams always know what was prescribed, what was dispensed and what remains in stock.",
    "Whether you're managing a hospital pharmacy or multiple pharmacy locations, gain better visibility without maintaining separate billing and stock systems.",
  ],
  journey: [
    { step: "1", title: "Prescription" },
    { step: "2", title: "Verification" },
    { step: "3", title: "Dispensing" },
    { step: "4", title: "Stock" },
    { step: "5", title: "Billing" },
  ],
  modules: [
    {
      title: "Prescription Management",
      desc: "Receive and manage prescriptions within connected clinical workflows.",
      icon: ClipboardList,
      href: "/product/pharmacy",
    },
    {
      title: "Clinical Verification",
      desc: "Support medicine interaction and formulary checks before dispensing.",
      icon: ShieldCheck,
      href: "/product/pharmacy",
    },
    {
      title: "Medicine Dispensing",
      desc: "Record medicines issued against patient prescriptions.",
      icon: Pill,
      href: "/product/pharmacy",
    },
    {
      title: "Batch Management",
      desc: "Maintain stock at batch level.",
      icon: Barcode,
      href: "/product/pharmacy",
    },
    {
      title: "Expiry Management",
      desc: "Use expiry-aware stock management to reduce waste.",
      icon: Bell,
      href: "/product/pharmacy",
    },
    {
      title: "FEFO Dispensing",
      desc: "Prioritize stock based on expiration where appropriate.",
      icon: GitBranch,
      href: "/product/pharmacy",
    },
    {
      title: "Unified Inventory",
      desc: "Maintain hospital, retail and ward stock in a connected ledger.",
      icon: Boxes,
      href: "/product/supply-chain",
    },
    {
      title: "Procurement",
      desc: "Manage purchasing, suppliers, orders and receipts.",
      icon: ShoppingCart,
      href: "/product/supply-chain",
    },
    {
      title: "Stock Transfers",
      desc: "Track movements between stores, wards or locations.",
      icon: ArrowLeftRight,
      href: "/product/supply-chain",
    },
    {
      title: "Billing & Payments",
      desc: "Connect pharmacy transactions directly with billing.",
      icon: CreditCard,
      href: "/product/billing-invoices",
    },
    {
      title: "Returns Management",
      desc: "Maintain structured sales and return workflows.",
      icon: RotateCcw,
      href: "/product/pharmacy",
    },
    {
      title: "Multi-Location Management",
      desc: "Centralize visibility across pharmacy locations.",
      icon: MapPin,
      href: "/solutions/enterprise-healthcare-erp",
    },
    {
      title: "Reports & Analytics",
      desc: "Review sales, stock, consumption and operational trends.",
      icon: BarChart3,
      href: "/product/analytics",
    },
  ],
  faqs: [
    {
      q: "What is pharmacy management software?",
      a: "Pharmacy management software connects prescriptions, dispensing, billing, purchasing and medicine inventory.",
    },
    {
      q: "Can MedicoreERP manage batches and expiry dates?",
      a: "Yes. Its pharmacy module provides batch- and expiry-aware inventory and dispensing workflows.",
    },
    {
      q: "Can hospital and ward stock be managed together?",
      a: "MedicoreERP provides one stock ledger across retail, hospital and ward inventory.",
    },
    {
      q: "Can pharmacy activity connect to the patient record?",
      a: "Yes. Prescription and dispensing workflows are part of the connected patient journey.",
    },
    {
      q: "Can MedicoreERP handle purchasing?",
      a: "MedicoreERP includes procurement and inventory functionality covering purchase orders, goods receipt and stock management.",
    },
    {
      q: "Can it support multiple pharmacy locations?",
      a: "Yes, the platform supports centralized inventory-oriented workflows suited to multi-location operations.",
    },
  ],
};

export const ENTERPRISE_LANDING = {
  seo: {
    title: "Enterprise Healthcare ERP for Hospital Networks | MedicoreERP",
    description:
      "Connect hospitals, clinics and healthcare facilities with MedicoreERP Enterprise Healthcare ERP for centralized workflows, analytics and integrations.",
    keywords: [
      "Enterprise Healthcare ERP",
      "Multi-hospital ERP",
      "healthcare network software",
      "hospital chain management software",
      "multi-location hospital management system",
      "enterprise HIS",
      "centralized healthcare platform",
    ],
    canonical: "/solutions/enterprise-healthcare-erp",
  },
  heroTitle: "One Healthcare Platform Across Your Entire Network",
  heroSubtitle: "Standardize Operations Without Losing Local Flexibility.",
  overview: [
    "As healthcare organizations grow, separate systems across hospitals and branches create inconsistent processes, fragmented data and difficult reporting.",
    "MedicoreERP provides a common healthcare platform for hospital groups and multi-location networks while allowing workflows, forms, permissions and integrations to be configured around organizational requirements.",
  ],
  modules: [
    {
      title: "Multi-Facility Management",
      desc: "Connect hospitals, clinics, departments and locations.",
      icon: Network,
      href: "/solutions/hospital-management-software",
    },
    {
      title: "Centralized Patient Information",
      desc: "Maintain connected information across the patient journey.",
      icon: FolderOpen,
      href: "/product/patient-access",
    },
    {
      title: "Enterprise EMR",
      desc: "Standardize clinical information and documentation.",
      icon: ClipboardList,
      href: "/product/emr",
    },
    {
      title: "Workflow Studio",
      desc: "Configure approval chains and healthcare workflows without hard-coding every process.",
      icon: Workflow,
      href: "/product/platform",
    },
    {
      title: "Form Builder",
      desc: "Build and manage clinical and operational forms.",
      icon: FormInput,
      href: "/product/platform",
    },
    {
      title: "Enterprise Role Management",
      desc: "Control access using configurable role and permission models.",
      icon: ShieldCheck,
      href: "/product/platform",
    },
    {
      title: "Centralized Pharmacy & Inventory",
      desc: "Improve stock visibility across participating locations.",
      icon: Boxes,
      href: "/solutions/pharmacy-management-software",
    },
    {
      title: "Procurement & Supply Chain",
      desc: "Connect RFQ, purchase order, receipt and inventory processes.",
      icon: ShoppingCart,
      href: "/product/supply-chain",
    },
    {
      title: "Revenue & Insurance",
      desc: "Standardize billing, payer and claim workflows.",
      icon: Receipt,
      href: "/product/revenue-cycle",
    },
    {
      title: "Healthcare Interoperability",
      desc: "Connect third-party systems through FHIR, HL7, DICOM, REST APIs and webhooks.",
      icon: Share2,
      href: "/interoperability",
    },
    {
      title: "Enterprise Analytics",
      desc: "Compare revenue, patient volume, occupancy and departmental performance across the organization.",
      icon: BarChart3,
      href: "/product/analytics",
    },
  ],
  faqs: [
    {
      q: "What is Enterprise Healthcare ERP?",
      a: "It is a common technology platform used to connect clinical, operational, financial and administrative processes across a larger healthcare organization.",
    },
    {
      q: "Can MedicoreERP support multiple hospitals?",
      a: "Its configurable platform, centralized analytics and integration capabilities are designed for complex healthcare organizations and multi-location operations.",
    },
    {
      q: "Can each location follow different access rules?",
      a: "Role-based and attribute-based access controls can be configured around organizational responsibilities.",
    },
    {
      q: "Can MedicoreERP connect with our existing applications?",
      a: "Yes. MedicoreERP supports REST APIs, FHIR, HL7, DICOM and webhooks for compatible applications.",
    },
    {
      q: "Can leadership compare hospital performance?",
      a: "MedicoreERP Analytics supports comparison across departments, services, time periods and hospital locations.",
    },
    {
      q: "Do we have to heavily customize the platform?",
      a: "MedicoreERP provides configurable Workflow Studio and Form Builder capabilities intended to reduce dependence on hard-coded customization.",
    },
  ],
};

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
    hook: "Focus on the patient. Let AI handle the documentation.",
    problem: "Doctors should spend consultations understanding patients—not switching between screens and typing notes.",
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
    hook: "The right patient information, when the clinician needs it.",
    problem: "Patient information is often scattered across consultations, diagnostics, prescriptions, admissions and historical records.",
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
    hook: "Move claims faster. Reduce preventable errors. Improve revenue visibility.",
    problem: "Incomplete documentation, coding errors, missing charges, eligibility issues and manual follow-ups can delay reimbursement and increase administrative work.",
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
    slug: "predictive-operations",
    name: "Predictive Operations",
    hook: "See operational pressure before it becomes disruption.",
    problem: "A growing waiting list, delayed discharge, unexpected occupancy or appointment no-show rarely appears without warning.",
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
    hook: "Ask your hospital data a question. Get an answer you can act on.",
    problem: "Management teams frequently wait on new reports instead of exploring available hospital information conversationally.",
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

export const AMBIENT_SCRIBE_LANDING = {
  seo: {
    title: "AI Ambient Scribe for Clinical Documentation | MedicoreERP",
    description:
      "Reduce clinical documentation workload with an AI Ambient Scribe that turns doctor-patient conversations into structured clinical notes for review.",
    keywords: [
      "AI Ambient Scribe",
      "clinical documentation AI",
      "ambient clinical scribe",
      "AI SOAP notes",
      "EMR documentation software",
    ],
    canonical: "/ai/ambient-scribe",
  },
  heroTitle: "AI Ambient Scribe for Smarter Clinical Documentation",
  heroSubtitle: "Focus on the patient. Let AI handle the documentation.",
  overview: [
    "Turn natural doctor-patient conversations into structured clinical notes without interrupting the consultation.",
    "Ambient Scribe listens to the clinical conversation, identifies relevant medical information and prepares a structured draft for the clinician to review, edit and approve.",
  ],
  punchline: "Less typing. Better documentation. More time for patient care.",
  documentationItems: [
    "Chief complaints and symptoms",
    "Patient history",
    "Clinical observations",
    "Assessment and diagnosis",
    "Treatment plan",
    "Follow-up instructions",
    "SOAP-style clinical notes",
  ],
  capabilities: [
    {
      title: "Real-Time Conversation Capture",
      desc: "Capture relevant information during the consultation without disrupting the natural conversation between doctor and patient.",
      icon: Mic,
    },
    {
      title: "AI-Generated Clinical Notes",
      desc: "Transform conversations into structured, readable clinical documentation ready for physician review.",
      icon: FileText,
    },
    {
      title: "Context-Aware Documentation",
      desc: "Identify symptoms, medical history, medications, diagnoses and care plans from the clinical context.",
      icon: Activity,
    },
    {
      title: "EMR-Connected Workflow",
      desc: "Send approved documentation directly into the patient's electronic medical record.",
      icon: FolderOpen,
    },
    {
      title: "Specialty-Ready Templates",
      desc: "Support configurable documentation formats for different specialties and clinical workflows.",
      icon: FormInput,
    },
    {
      title: "Clinician Review & Approval",
      desc: "Keep physicians in control with review, edit and approval before finalizing any AI-generated documentation.",
      icon: ShieldCheck,
    },
  ],
  how: [
    { step: "Listen", desc: "The AI captures the consultation conversation with patient consent." },
    { step: "Understand", desc: "It identifies clinically relevant information from the discussion." },
    { step: "Structure", desc: "Information is organized into readable clinical documentation." },
    { step: "Review", desc: "The clinician edits and verifies the draft before it is saved." },
    { step: "Save", desc: "Approved notes become part of the patient's electronic medical record." },
  ],
  howSummary:
    "The AI captures the conversation, identifies clinically relevant information, prepares structured documentation and presents it to the clinician for verification.",
  benefits:
    "Reduce repetitive documentation work, improve consistency of clinical notes, shorten after-hours administrative work and allow doctors to spend more consultation time with patients.",
};

export const CLINICAL_COPILOT_LANDING = {
  seo: {
    title: "AI Clinical Co-Pilot for Smarter Patient Care | MedicoreERP",
    description:
      "Give clinicians faster access to patient history, medications, diagnostics and clinical context with an AI-powered Clinical Co-Pilot.",
    keywords: ["AI Clinical Co-Pilot", "clinical copilot", "chart-aware AI", "patient summary AI", "clinical decision support"],
    canonical: "/ai/clinical-copilot",
  },
  heroTitle: "AI Clinical Co-Pilot for More Informed Care",
  heroSubtitle: "The right patient information, when the clinician needs it.",
  overview: [
    "Give doctors an intelligent assistant that brings together patient history, medications, laboratory results, clinical notes and other relevant information during the care journey.",
    "Instead of searching across multiple screens, clinicians can quickly access summarized patient context and supporting information from connected records.",
  ],
  punchline: "More context. Less searching. Better-informed clinical workflows.",
  capabilities: [
    {
      title: "Patient Summary",
      desc: "Create concise summaries from longitudinal patient records, previous encounters and available clinical information.",
      icon: FileText,
    },
    {
      title: "Chart-Aware Assistance",
      desc: "Ask questions about the patient's record and retrieve relevant information from available clinical data.",
      icon: Bot,
    },
    {
      title: "Medication & Allergy Context",
      desc: "Surface medications, allergies and other available clinical information when relevant to the consultation.",
      icon: Pill,
    },
    {
      title: "Diagnostic Information Access",
      desc: "Bring laboratory, radiology and other diagnostic information into the clinician's workflow.",
      icon: FlaskConical,
    },
    {
      title: "Clinical Timeline",
      desc: "Present important encounters, diagnoses, treatments and results in an easier-to-understand sequence.",
      icon: GitBranch,
    },
    {
      title: "Source-Linked Information",
      desc: "Help clinicians trace generated information back to the underlying patient record whenever supported.",
      icon: BookOpen,
    },
  ],
  how: [
    { step: "Connect Patient Data", desc: "Bring together history, medications, diagnostics and notes from connected records." },
    { step: "Understand Context", desc: "Organize scattered information into meaningful clinical context." },
    { step: "Ask or Retrieve", desc: "Clinicians can ask questions or retrieve relevant information from the chart." },
    { step: "Review Evidence", desc: "Trace supporting information back to the underlying patient record." },
    { step: "Take Clinical Action", desc: "Use the context to support care — final decisions remain with the clinician." },
  ],
  howSummary:
    "Clinical Co-Pilot works as an assistant rather than replacing clinical judgment. Final clinical decisions remain with qualified healthcare professionals.",
  journey: [
    "OPD consultation",
    "Inpatient rounds",
    "Follow-ups",
    "Discharge preparation",
    "Historical record review",
  ],
  benefits:
    "Reduce time spent searching patient charts, improve access to longitudinal patient information, support more consistent workflows and help clinicians prepare for consultations faster.",
};

export const AUTONOMOUS_RCM_LANDING = {
  seo: {
    title: "AI Revenue Cycle Management & RCM Automation | MedicoreERP",
    description:
      "Automate coding support, claim validation, denial workflows and revenue-cycle processes with intelligent AI-powered RCM solutions.",
    keywords: [
      "AI Revenue Cycle Management",
      "RCM automation",
      "AI claim scrubbing",
      "denial management software",
      "AI medical coding",
    ],
    canonical: "/ai/autonomous-rcm",
  },
  heroTitle: "AI-Powered Revenue Cycle Management",
  heroSubtitle: "Move claims faster. Reduce preventable errors. Improve revenue visibility.",
  overview: [
    "Connect clinical documentation, coding, billing, claims and follow-up through an AI-assisted revenue cycle workflow.",
    "Autonomous RCM helps identify coding gaps, validate claims, prioritize exceptions and streamline repetitive revenue-cycle activities while keeping your billing team in control.",
  ],
  leakage: [
    "Incomplete documentation",
    "Coding errors",
    "Missing charges",
    "Eligibility issues",
    "Manual follow-ups",
  ],
  capabilities: [
    {
      title: "Charge Capture Assistance",
      desc: "Connect completed services and clinical activities with billing workflows to reduce overlooked charge opportunities.",
      icon: CreditCard,
    },
    {
      title: "AI-Assisted Coding",
      desc: "Recommend relevant coding information for qualified billing and coding teams to validate.",
      icon: FileText,
    },
    {
      title: "Claim Validation & Scrubbing",
      desc: "Check claims for missing information, inconsistencies and configurable submission rules before they leave the organization.",
      icon: ShieldCheck,
    },
    {
      title: "Denial Risk Identification",
      desc: "Identify claims that may require additional review before submission.",
      icon: TrendingUp,
    },
    {
      title: "Denial Management",
      desc: "Organize rejected and denied claims by reason, value, payer and priority so teams know where to focus.",
      icon: FolderOpen,
    },
    {
      title: "Appeal Workflow Assistance",
      desc: "Help prepare supporting information and draft appeal content for staff review where appropriate.",
      icon: MessageSquareText,
    },
    {
      title: "Payment & Claim Visibility",
      desc: "Track claim status, payments, outstanding amounts and revenue-cycle performance from connected workflows.",
      icon: BarChart3,
    },
  ],
  how: [
    { step: "Capture", desc: "Connect completed services and documentation with billing workflows." },
    { step: "Validate", desc: "Check for missing information, eligibility issues and inconsistencies." },
    { step: "Code", desc: "Recommend coding for qualified teams to review and approve." },
    { step: "Scrub", desc: "Apply configurable submission rules before claims leave the organization." },
    { step: "Submit", desc: "Move validated claims through connected payer workflows." },
    { step: "Track", desc: "Monitor claim status, payments and outstanding amounts." },
    { step: "Resolve", desc: "Prioritize denials, exceptions and appeal work for staff review." },
  ],
  howSummary: "Create a more connected process from clinical service delivery through reimbursement.",
  benefits:
    "Improve first-pass claim quality, reduce repetitive manual validation, prioritize high-value exceptions, improve billing visibility and help teams address denials sooner.",
  oversight:
    "AI should accelerate revenue-cycle work—not make uncontrolled financial decisions. Coders, billers and authorized users remain responsible for reviewing and approving appropriate actions.",
};

export const PREDICTIVE_OPERATIONS_LANDING = {
  seo: {
    title: "Predictive Hospital Operations with AI | MedicoreERP",
    description:
      "Use AI-powered predictive analytics to forecast no-shows, bed demand, length of stay and operational bottlenecks across your hospital.",
    keywords: [
      "Predictive Hospital Analytics",
      "predictive hospital operations",
      "no-show prediction",
      "bed demand forecasting",
      "length of stay analytics",
    ],
    canonical: "/ai/predictive-operations",
  },
  heroTitle: "Predictive Intelligence for Hospital Operations",
  heroSubtitle: "See operational pressure before it becomes disruption.",
  overview: [
    "Use historical and real-time hospital data to identify emerging patterns across appointments, admissions, patient flow, bed utilization and resource demand.",
    "Predictive Operations helps hospital teams move from reacting to operational problems toward preparing for them.",
  ],
  signals: [
    "Growing waiting lists",
    "Delayed discharges",
    "Unexpected occupancy",
    "Appointment no-shows",
    "Resource pressure",
  ],
  capabilities: [
    {
      title: "Appointment No-Show Risk",
      desc: "Identify appointments with elevated likelihood of non-attendance so teams can prioritize reminders or rescheduling workflows.",
      icon: Calendar,
    },
    {
      title: "Length-of-Stay Insights",
      desc: "Analyze patient and operational patterns that may contribute to longer stays.",
      icon: HeartPulse,
    },
    {
      title: "Bed Demand Forecasting",
      desc: "Understand expected admission and occupancy patterns to support bed planning.",
      icon: BedDouble,
    },
    {
      title: "Patient Flow Intelligence",
      desc: "Monitor movement across registration, OPD, diagnostics, admission, treatment and discharge.",
      icon: GitBranch,
    },
    {
      title: "Resource Demand Forecasting",
      desc: "Use historical patterns to support planning for departments, staff, rooms and other resources.",
      icon: Users,
    },
    {
      title: "Operational Exception Detection",
      desc: "Highlight unusual changes in waiting time, occupancy, throughput or service activity for further investigation.",
      icon: Bell,
    },
  ],
  how: [
    { step: "Collect", desc: "Bring together historical and real-time data from operational workflows." },
    { step: "Analyze", desc: "Identify emerging patterns across appointments, occupancy and patient flow." },
    { step: "Predict", desc: "Turn patterns into earlier signals of operational pressure." },
    { step: "Prioritize", desc: "Help teams focus on the exceptions that need attention first." },
    { step: "Act", desc: "Support reminders, rescheduling, bed planning and capacity decisions." },
    { step: "Learn", desc: "Improve forecasts as new operational outcomes are recorded." },
  ],
  howSummary: "Data from operational workflows is analyzed for patterns and transformed into actionable signals for hospital teams.",
  useCases: [
    "Appointment management",
    "Admission planning",
    "Bed utilization",
    "Discharge coordination",
    "Staffing discussions",
    "Capacity planning",
  ],
  benefits:
    "Improve resource planning, identify bottlenecks earlier, support better bed utilization, reduce avoidable operational surprises and enable more proactive management.",
};

export const NL_ANALYTICS_LANDING = {
  seo: {
    title: "Natural Language Analytics for Hospitals | MedicoreERP",
    description:
      "Ask hospital data questions in plain language and get faster insights across clinical, financial, operational and inventory data.",
    keywords: [
      "Natural Language Analytics Healthcare",
      "hospital NL analytics",
      "ask hospital data",
      "healthcare conversational analytics",
      "plain language hospital reports",
    ],
    canonical: "/ai/nl-analytics",
  },
  heroTitle: "Natural Language Analytics for Hospital Data",
  heroSubtitle: "Ask your hospital data a question. Get an answer you can act on.",
  overview: [
    "Make analytics easier for hospital leaders, clinicians and operational teams.",
    "Natural Language Analytics allows authorized users to ask questions using everyday business language instead of manually building reports or searching through multiple dashboards.",
  ],
  questions: [
    "What was our OPD volume this month?",
    "Which department has the highest average waiting time?",
    "How many beds are currently occupied?",
    "What is the outstanding billing amount?",
    "Which medicines are approaching minimum stock levels?",
  ],
  capabilities: [
    {
      title: "Ask Questions in Plain Language",
      desc: "Search hospital data using normal business questions instead of complex report filters or query languages.",
      icon: MessageSquareText,
    },
    {
      title: "Instant Data Summaries",
      desc: "Turn large datasets into concise summaries that management teams can understand quickly.",
      icon: FileText,
    },
    {
      title: "Operational Analytics",
      desc: "Explore appointments, patient volumes, admissions, discharge activity and utilization trends.",
      icon: Activity,
    },
    {
      title: "Financial Analytics",
      desc: "Analyze billing, collections, outstanding balances and other available revenue-cycle information.",
      icon: CreditCard,
    },
    {
      title: "Clinical & Department Insights",
      desc: "Review aggregate operational patterns across specialties, departments and services where authorized.",
      icon: Stethoscope,
    },
    {
      title: "Inventory Intelligence",
      desc: "Ask about stock availability, usage trends, purchasing and consumption patterns.",
      icon: Boxes,
    },
    {
      title: "Follow-Up Questions",
      desc: "Continue exploring an insight conversationally rather than starting a completely new report.",
      icon: GitBranch,
    },
  ],
  example: [
    { role: "User", text: "Which department had the highest patient volume last month?" },
    { role: "AI", text: "Identifies the relevant department from available data." },
    { role: "User", text: "How does that compare with the previous three months?" },
  ],
  exampleNote: "The system continues the analysis while maintaining the context of the previous question.",
  how: [
    { step: "Ask", desc: "Ask a question in everyday business language." },
    { step: "Understand", desc: "Interpret the question against available hospital data." },
    { step: "Analyze", desc: "Retrieve the relevant clinical, financial, operational or inventory information." },
    { step: "Visualize", desc: "Present a summary, chart or table that teams can understand quickly." },
    { step: "Investigate", desc: "Ask follow-up questions without starting a new report." },
    { step: "Act", desc: "Use the insight to support operational and management decisions." },
  ],
  benefits:
    "Reduce dependency on manually prepared reports, shorten the time between question and insight, make hospital data more accessible to authorized decision-makers and help teams investigate issues faster.",
  governance:
    "Natural-language access should respect the same user permissions, role-based access and security rules applied throughout the hospital information system.",
};

export interface Competitor { slug: string; name: string; summary: string; rows: { feature: string; medicore: string; them: string }[]; theyStrong: string[] }
export const COMPETITORS: Competitor[] = [
  {
    slug: "vs-epic", name: "Epic",
    summary: "Epic is powerful and proven at mega-scale — and famously expensive, slow to deploy, and hard to use. MedicoreERP matches the breadth with modern UX and AI-native workflows.",
    rows: [
      { feature: "AI ambient scribe (default)", medicore: "Included", them: "Add-on / 3rd-party" },
      { feature: "Implementation time", medicore: "6–10 weeks", them: "12–18 months" },
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
  { value: "400+", label: "care teams served" },
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
    desc: "Register and manage patients through one centralized patient record, including demographics, visits, medical history and account details.",
    href: "/product/patient-access",
    icon: Users,
  },
  {
    title: "Medical Records (EMR)",
    desc: "Maintain consultations, diagnosis, vitals, allergies, medicines, clinical notes and patient history in a secure digital record.",
    href: "/product/emr",
    icon: ClipboardList,
  },
  {
    title: "Medical Forms",
    desc: "Create and manage digital medical forms for OPD, consent, nursing, procedures and specialty-specific workflows.",
    href: "/product/platform",
    icon: FormInput,
  },
  {
    title: "Medical Scheduling",
    desc: "Manage doctor schedules, appointments, patient queues, waiting lists and follow-up visits from one system.",
    href: "/product/appointments",
    icon: Calendar,
  },
  {
    title: "Medical Workflows",
    desc: "Connect treatment plans, clinical orders, prescriptions and patient care across OPD, IPD and discharge workflows.",
    href: "/product/clinical",
    icon: GitBranch,
  },
  {
    title: "Medical Billing & Claims",
    desc: "Generate OPD and IPD bills, manage services, payments, insurance and claim-related workflows.",
    href: "/product/billing-invoices",
    icon: CreditCard,
  },
  {
    title: "Wards Management",
    desc: "Manage admissions, bed allocation, ward occupancy, transfers and inpatient movement in real time.",
    href: "/product/clinical",
    icon: BedDouble,
  },
  {
    title: "Laboratory (LIS)",
    desc: "Manage test orders, samples, processing and results while connecting laboratory data directly with patient records.",
    href: "/product/lab",
    icon: FlaskConical,
  },
  {
    title: "Imaging / Radiology",
    desc: "Manage radiology requests, scheduling, imaging reports and integration with relevant imaging systems.",
    href: "/product/radiology",
    icon: Scan,
  },
  {
    title: "Nurses Module",
    desc: "Record patient vitals, nursing assessments, notes, medication administration and bedside care.",
    href: "/product/emr",
    icon: HeartPulse,
  },
  {
    title: "Pharmacy",
    desc: "Manage prescriptions, medicine dispensing, batches, expiry dates, stock and pharmacy billing.",
    href: "/product/pharmacy",
    icon: Pill,
  },
  {
    title: "Inventory Management",
    desc: "Monitor medicines, medical supplies, consumables, purchases, stock levels and departmental inventory.",
    href: "/product/supply-chain",
    icon: Barcode,
  },
  {
    title: "HMS API Integrations",
    desc: "Connect MedicoreERP with diagnostic systems, payment gateways, insurance platforms, accounting software and other hospital applications.",
    href: "/integrations/third-party-api",
    icon: Code2,
  },
  {
    title: "Patient Communication",
    desc: "Send appointment confirmations, reminders, follow-up notifications, prescriptions and other patient communications.",
    href: "/integrations/whatsapp",
    icon: MessageSquareText,
  },
  {
    title: "Hospital Analytics",
    desc: "Turn clinical, operational and financial data into dashboards, KPIs, MIS reports and performance comparisons.",
    href: "/product/analytics",
    icon: BarChart3,
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
  {
    slug: "hospital-analytics",
    term: "Hospital Analytics Software",
    definition: "Software that turns clinical, operational, and financial hospital information into dashboards, KPIs, MIS reports, and trends for management review.",
    related: ["his", "rcm"],
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
