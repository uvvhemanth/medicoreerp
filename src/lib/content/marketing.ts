/** Marketing content (CMS-ready, local now — Requirements §7.4). */
import type { LucideIcon } from "lucide-react";
import {
  Users, Stethoscope, Pill, FlaskConical, Scan, Receipt, Boxes, UsersRound,
  BarChart3, Settings2, Building2, Microscope, Network, Landmark, Mic, Bot,
  TrendingUp, MessageSquareText, Sparkles, Share2, Globe, ArrowLeftRight,
  ShieldCheck, BadgeCheck, Activity, BookOpen, Code2, Blocks, Lock, Eye, Server,
  ArrowRight, Zap, Tag, Calculator, Mail, Calendar, FileText, Bell, ClipboardList, LayoutDashboard,
  HeartPulse, BedDouble, CreditCard, GitBranch, FormInput, Barcode, Clock, Search,
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
    featured: { title: "Hospital HIS Dashboard", desc: "KPIs, occupancy, OPD/IPD and revenue in one view", href: "/product/his-dashboard", icon: ArrowRight },
    children: [
      { label: "HIS Dashboard", href: "/product/his-dashboard", desc: "Hospital KPIs, occupancy & department performance", icon: LayoutDashboard, badge: "New" },
      { label: "Electronic Medical Records", href: "/product/electronic-medical-records", desc: "Patient history, notes, prescriptions & reports", icon: ClipboardList, badge: "New" },
      { label: "Appointments", href: "/product/appointments", desc: "Doctor schedules, slots, queues & reminders", icon: Calendar, badge: "New" },
      { label: "Billing & Invoices", href: "/product/billing-invoices", desc: "OPD, IPD, invoices, payments & outstanding", icon: FileText, badge: "New" },
      { label: "Patient Reminders", href: "/product/patient-reminders", desc: "Appointment, follow-up & recall via SMS/WhatsApp", icon: Bell, badge: "New" },
      { label: "Patient Access", href: "/product/patient-access", desc: "Registration, check-in & digital profiles", icon: Users, badge: "New" },
      { label: "Clinical (EMR/OPD/IPD)", href: "/product/clinical-emr-opd-ipd", desc: "OPD, IPD, EMR, nursing & discharge", icon: Stethoscope, badge: "New" },
      { label: "Pharmacy", href: "/product/pharmacy", desc: "Prescriptions, inventory, batches & dispensing", icon: Pill, badge: "New" },
      { label: "Laboratory", href: "/product/laboratory", desc: "Orders, samples, results & digital reports", icon: FlaskConical, badge: "New" },
      { label: "Radiology", href: "/product/radiology", desc: "Orders, RIS, PACS, DICOM & digital reports", icon: Scan, badge: "New" },
      { label: "Revenue Cycle", href: "/product/revenue-cycle", desc: "Billing, claims, collections & receivables", icon: Receipt, badge: "New" },
      { label: "Supply Chain", href: "/product/supply-chain", desc: "Inventory, procurement, suppliers & stock movement", icon: Boxes, badge: "New" },
      { label: "Workforce (HRM)", href: "/product/workforce-hrm", desc: "Employees, attendance, shifts, rosters & leave", icon: UsersRound, badge: "New" },
      { label: "Analytics", href: "/product/analytics", desc: "KPI dashboards, MIS reports & performance insights", icon: BarChart3, badge: "New" },
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
      { label: "Diagnostics / Labs", href: "/solutions/diagnostic-lab-management-software", desc: "LIS, RIS & reporting", icon: Microscope },
      { label: "Pharmacy Chains", href: "/solutions/pharmacy-management-software", desc: "Multi-store inventory & POS", icon: Pill },
      { label: "Enterprise Networks", href: "/solutions/enterprise-healthcare-erp", desc: "Multi-branch · custom rollout", icon: Network },
      { label: "Government / Payer", href: "/solutions/government-payer-management", desc: "ABDM-ready · program-based", icon: Landmark },
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
      { label: "Trust Center", href: "/security", desc: "Healthcare data security", icon: ShieldCheck },
      { label: "Encryption", href: "/security/encryption", desc: "Data at rest and in transit", icon: Lock },
      { label: "Access Control", href: "/security/access-control", desc: "Roles, branches and permissions", icon: Eye },
      { label: "Audit Trails", href: "/security/audit-trails", desc: "Who accessed what and when", icon: FileText },
      { label: "Data Residency", href: "/security/data-residency", desc: "Keep data in the right region", icon: Server },
      { label: "Compliance", href: "/security/compliance", desc: "Healthcare compliance & privacy", icon: BadgeCheck },
      { label: "Status", href: "/security/status", desc: "MedicoreERP system status", icon: Activity },
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
  landing?: {
    featuresTitle?: string;
    benefitsTitle?: string;
    faqsTitle?: string;
    ctaTitle?: string;
    ctaSubtitle?: string;
    liveHref?: string;
  };
}

export const PRODUCT_DOMAINS: ProductDomain[] = [
  {
    slug: "his-dashboard",
    name: "Hospital HIS Dashboard",
    tagline: "Complete Hospital Visibility from One Dashboard",
    problem: "Running a hospital means monitoring hundreds of activities across clinical, administrative, and financial departments — too often split across spreadsheets and disconnected reports.",
    overview: [
      "Running a hospital means monitoring hundreds of activities across clinical, administrative, and financial departments. MedicoreERP HIS Dashboard brings the most important hospital information together in one clear and easy-to-understand view.",
      "Hospital administrators and management teams can monitor patient volumes, OPD and IPD activity, bed occupancy, billing, revenue, diagnostics, pharmacy operations, and department performance without depending on multiple spreadsheets or disconnected reports.",
      "With important hospital KPIs available in one place, decision-makers can identify operational gaps sooner, monitor performance more effectively, and make informed decisions based on current hospital data.",
      "Competitor HIMS platforms similarly position centralized dashboards around OPD queues, revenue, bed occupancy, laboratory status, and cross-department visibility.",
    ],
    features: [
      { title: "Real-Time Hospital KPIs", desc: "Monitor important clinical, operational, and financial performance indicators from a centralized dashboard.", icon: Activity },
      { title: "OPD & IPD Overview", desc: "Track outpatient visits, inpatient admissions, discharges, and overall patient activity.", icon: Users },
      { title: "Patient Flow Monitoring", desc: "Understand patient movement, waiting queues, and service activity across hospital departments.", icon: GitBranch },
      { title: "Bed Occupancy Visibility", desc: "View available, occupied, reserved, and recently released beds across wards.", icon: BedDouble },
      { title: "Revenue & Billing Insights", desc: "Monitor billing activity, collections, outstanding balances, and revenue performance.", icon: Receipt },
      { title: "Laboratory & Pharmacy Overview", desc: "Get a quick view of diagnostic and pharmacy activities without switching between separate systems.", icon: FlaskConical },
      { title: "Department Performance", desc: "Compare patient volumes, utilization, and operational performance across different hospital departments.", icon: Building2 },
      { title: "MIS & Management Reports", desc: "Generate structured reports that help management review hospital performance more efficiently.", icon: FileText },
    ],
    benefits: [
      "Centralized hospital-wide visibility",
      "Faster management decisions",
      "Reduced dependence on spreadsheets",
      "Better monitoring of hospital KPIs",
      "Improved operational control",
      "Easier department performance tracking",
    ],
    faqs: [
      {
        q: "What is a Hospital HIS Dashboard?",
        a: "A Hospital HIS Dashboard provides a centralized view of key clinical, operational, administrative, and financial information generated across the hospital.",
      },
      {
        q: "What information can hospital management monitor?",
        a: "Management can monitor information such as patient volumes, OPD/IPD activity, bed occupancy, billing, collections, department performance, laboratory activity, and pharmacy operations.",
      },
      {
        q: "Can multiple departments be viewed from one dashboard?",
        a: "Yes. A connected Hospital Information System can bring information from different departments into a unified management view.",
      },
      {
        q: "How does an HIS Dashboard help hospital administrators?",
        a: "It reduces the need to collect reports manually and gives administrators faster access to important operational information.",
      },
    ],
    seo: {
      title: "Hospital HIS Dashboard Software | MedicoreERP",
      description: "Monitor hospital KPIs, patients, OPD, IPD, revenue, occupancy and department performance with the MedicoreERP HIS Dashboard.",
      keywords: [
        "Hospital HIS Dashboard",
        "Hospital dashboard software",
        "Hospital Information System",
        "HIMS dashboard",
        "hospital KPI dashboard",
        "hospital management software",
        "hospital analytics",
      ],
    },
    landing: {
      featuresTitle: "What hospital teams can monitor",
      benefitsTitle: "Why a centralized HIS dashboard matters",
      faqsTitle: "Hospital HIS Dashboard questions",
      ctaTitle: "See hospital-wide visibility on one dashboard",
      ctaSubtitle: "Book a demo to review KPIs, OPD/IPD activity, occupancy, revenue and department performance for your hospital.",
      liveHref: "/dashboard",
    },
    moats: ["Real-time hospital KPIs", "Bed occupancy visibility", "Cross-department view"],
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "electronic-medical-records",
    name: "Electronic Medical Records Software",
    tagline: "One Digital Record for Every Patient",
    problem: "Paper charts and fragmented records keep patient history, diagnoses, prescriptions, and investigation results in separate places.",
    overview: [
      "MedicoreERP Electronic Medical Records Software helps hospitals replace paper-based patient files with structured, accessible digital clinical records.",
      "Doctors and authorized healthcare teams can view patient history, previous consultations, diagnoses, prescriptions, allergies, medications, laboratory results, radiology reports, clinical notes, and treatment information from one connected patient record.",
      "Instead of information being stored separately across departments, the EMR helps bring the patient's clinical journey together. This makes it easier for healthcare professionals to understand previous treatment and access relevant information during future consultations.",
      "Modern competitor EMR/EHR systems increasingly emphasize longitudinal patient records connecting consultations, diagnoses, prescriptions, laboratory results, and imaging information.",
    ],
    features: [
      { title: "Digital Patient Records", desc: "Maintain important patient medical and clinical information in a structured electronic record.", icon: ClipboardList },
      { title: "Medical History", desc: "Access previous consultations, conditions, treatments, procedures, and clinical interactions.", icon: BookOpen },
      { title: "Clinical Notes", desc: "Allow doctors to record observations, assessments, findings, and consultation notes digitally.", icon: ClipboardPen },
      { title: "Diagnosis Management", desc: "Maintain diagnosis information as part of the patient's ongoing clinical history.", icon: Stethoscope },
      { title: "Medication & Allergy Records", desc: "Record medications and known allergies to provide clinicians with better patient context.", icon: Pill },
      { title: "Electronic Prescriptions", desc: "Create digital prescriptions that can be connected with relevant pharmacy workflows.", icon: FileText },
      { title: "Laboratory Integration", desc: "Make diagnostic test results available within the corresponding patient record.", icon: FlaskConical },
      { title: "Radiology Integration", desc: "Connect imaging reports and radiology information with the patient's medical history.", icon: Scan },
      { title: "Role-Based Access", desc: "Control access to clinical information according to authorized user roles.", icon: ShieldCheck },
      { title: "Patient Document Management", desc: "Maintain referrals, reports, consent documents, discharge records, and other clinical files digitally.", icon: FolderOpen },
    ],
    benefits: [
      "Reduced paper-based documentation",
      "Faster access to patient information",
      "Better continuity of care",
      "Improved clinical documentation",
      "Less repeated data entry",
      "Centralized patient history",
    ],
    faqs: [
      {
        q: "What is Electronic Medical Records software?",
        a: "EMR software digitally stores and manages patient clinical information such as diagnoses, prescriptions, consultation notes, treatment history, and investigation results.",
      },
      {
        q: "Can doctors access previous patient history?",
        a: "Yes. Authorized clinicians can review available previous medical information within the patient's digital record.",
      },
      {
        q: "Can EMR connect with laboratory and radiology workflows?",
        a: "A connected EMR can associate laboratory results and radiology reports with the patient's clinical record.",
      },
      {
        q: "What is the difference between paper records and EMR?",
        a: "Paper records require physical storage and manual retrieval, while EMR provides structured digital access to patient information for authorized healthcare users.",
      },
    ],
    seo: {
      title: "Electronic Medical Records EMR Software | MedicoreERP",
      description: "Manage patient history, diagnoses, prescriptions, clinical notes and reports digitally with MedicoreERP Electronic Medical Records Software.",
      keywords: [
        "Electronic Medical Records Software",
        "EMR software",
        "EHR software",
        "electronic health records",
        "hospital EMR system",
        "digital patient records",
        "clinical records software",
      ],
    },
    landing: {
      featuresTitle: "What hospital teams can record",
      benefitsTitle: "Why digital patient records matter",
      faqsTitle: "Electronic Medical Records questions",
      ctaTitle: "See one digital record for every patient",
      ctaSubtitle: "Book a demo to review patient history, diagnoses, prescriptions, clinical notes and reports in MedicoreERP EMR.",
    },
    moats: ["Longitudinal patient record", "Lab & radiology in the chart", "Role-based clinical access"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "appointments",
    name: "Hospital Appointment Management Software",
    tagline: "Make Patient Appointment Scheduling Easier",
    problem: "Manual diaries, overlapping slots, walk-in chaos, and missed reminders make consultation schedules harder to control.",
    overview: [
      "MedicoreERP Hospital Appointment Management Software helps healthcare organizations organize appointments across doctors, departments, specialties, and consultation schedules.",
      "Front-desk teams can manage new bookings, doctor availability, time slots, walk-ins, appointment changes, cancellations, and patient queues through one structured scheduling process.",
      "Patients benefit from a smoother booking experience while hospital teams gain better control over consultation schedules. Automated reminders can also help patients stay informed about upcoming appointments.",
      "Appointment scheduling, patient queues, online booking, reminders, and doctor availability are commonly positioned as essential features within modern Hospital Management Systems.",
    ],
    features: [
      { title: "Online Appointment Booking", desc: "Enable patients to schedule appointments through supported digital booking channels.", icon: Calendar },
      { title: "Doctor Availability Management", desc: "Maintain doctor schedules and available consultation times in one place.", icon: Stethoscope },
      { title: "Department-Wise Scheduling", desc: "Organize appointments by doctor, specialty, department, or healthcare service.", icon: Building2 },
      { title: "Time-Slot Management", desc: "Configure consultation slots to reduce overlapping bookings and scheduling conflicts.", icon: Clock },
      { title: "Walk-In Management", desc: "Register and organize patients who arrive without a previously scheduled appointment.", icon: UserPlus },
      { title: "Rescheduling & Cancellation", desc: "Modify appointment dates or times while keeping schedules updated.", icon: RotateCcw },
      { title: "Queue & Token Management", desc: "Organize patient waiting queues and consultation order more effectively.", icon: Users },
      { title: "Appointment History", desc: "Maintain records of previous, completed, cancelled, and upcoming appointments.", icon: BookOpen },
      { title: "Automated Appointment Reminders", desc: "Notify patients about upcoming appointments to support better attendance.", icon: Bell },
    ],
    benefits: [
      "Better doctor schedule management",
      "Fewer scheduling conflicts",
      "More organized patient queues",
      "Reduced manual coordination",
      "Better patient experience",
      "Improved appointment visibility",
    ],
    faqs: [
      {
        q: "What is hospital appointment management software?",
        a: "It is a digital solution for managing appointment bookings, doctor availability, consultation slots, walk-ins, rescheduling, cancellations, and queues.",
      },
      {
        q: "Can appointments be managed by department?",
        a: "Yes. Appointments can be organized according to doctors, departments, specialties, and available schedules.",
      },
      {
        q: "Can walk-in patients be managed?",
        a: "Yes. Walk-in patients can be registered and included within the appropriate consultation workflow.",
      },
      {
        q: "Can appointment reminders be automated?",
        a: "Yes. Reminder workflows can notify patients before scheduled appointments through supported communication channels.",
      },
    ],
    seo: {
      title: "Hospital Appointment Management Software | MedicoreERP",
      description: "Simplify appointments, doctor scheduling, time slots, patient queues and reminders with MedicoreERP Appointment Management Software.",
      keywords: [
        "Hospital Appointment Management Software",
        "Patient appointment software",
        "doctor scheduling software",
        "online appointment booking",
        "hospital scheduling system",
        "queue management software",
      ],
    },
    landing: {
      featuresTitle: "What hospital teams can schedule",
      benefitsTitle: "Why structured appointment scheduling matters",
      faqsTitle: "Hospital appointment questions",
      ctaTitle: "See easier appointment scheduling",
      ctaSubtitle: "Book a demo to review doctor availability, time slots, walk-ins, queues and reminders in MedicoreERP.",
    },
    moats: ["Doctor availability in one view", "Queue & token management", "Automated reminders"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "billing-invoices",
    name: "Hospital Billing Software",
    tagline: "Simplify Hospital Billing from Consultation to Discharge",
    problem: "Missed charges, disconnected department bills, and unclear outstanding balances make hospital finance harder to control.",
    overview: [
      "MedicoreERP Hospital Billing Software brings patient charges, invoices, payments, and billing information into one connected workflow.",
      "Hospitals can manage charges generated through OPD consultations, IPD stays, procedures, laboratory services, radiology, pharmacy, and other healthcare services without manually combining information from multiple departments.",
      "A connected billing process can help improve billing accuracy, provide better visibility into outstanding balances, and make financial information easier for hospital finance teams to manage.",
      "Competitor HMS solutions commonly connect OPD/IPD billing with pharmacy, laboratory, insurance, TPA, and financial reporting.",
    ],
    features: [
      { title: "OPD Billing", desc: "Generate bills for consultations, diagnostics, procedures, and outpatient healthcare services.", icon: Activity },
      { title: "IPD Billing", desc: "Consolidate applicable room, treatment, pharmacy, laboratory, and inpatient charges.", icon: BedDouble },
      { title: "Procedure Billing", desc: "Record applicable charges for medical procedures and clinical services.", icon: ClipboardPen },
      { title: "Pharmacy & Laboratory Billing", desc: "Connect medicine and diagnostic charges with the relevant patient billing record.", icon: Pill },
      { title: "Invoice Generation", desc: "Create clear and organized invoices for patient services.", icon: FileText },
      { title: "Payment Collection", desc: "Record patient payments against corresponding bills and invoices.", icon: CreditCard },
      { title: "Outstanding Balance Tracking", desc: "Identify unpaid amounts and monitor pending patient balances.", icon: Receipt },
      { title: "Discounts & Adjustments", desc: "Maintain authorized billing discounts, concessions, adjustments, and corrections.", icon: Tag },
      { title: "Insurance & TPA Billing", desc: "Support applicable billing processes involving insurance providers and Third-Party Administrators.", icon: ShieldCheck },
      { title: "Financial Reports", desc: "Review billing activity, payments, outstanding amounts, and related financial information.", icon: BarChart3 },
    ],
    benefits: [
      "Better billing accuracy",
      "Reduced manual billing effort",
      "Improved payment visibility",
      "Better tracking of outstanding amounts",
      "Connected department billing",
      "Stronger financial control",
    ],
    faqs: [
      {
        q: "What is hospital billing software?",
        a: "Hospital billing software manages charges, invoices, payments, outstanding balances, and other patient billing activities.",
      },
      {
        q: "Can OPD and IPD billing be managed separately?",
        a: "Yes. Outpatient and inpatient billing workflows can be managed according to their respective services and charges.",
      },
      {
        q: "Can pharmacy and laboratory charges be included in patient bills?",
        a: "In a connected hospital system, applicable pharmacy and laboratory charges can be linked to the patient's billing record.",
      },
      {
        q: "How can billing software reduce manual errors?",
        a: "Connected billing reduces repeated data entry and makes service charges easier to capture and review.",
      },
    ],
    seo: {
      title: "Hospital Billing & Invoice Software | MedicoreERP",
      description: "Manage OPD, IPD, pharmacy, laboratory, patient invoices, payments and outstanding balances with MedicoreERP Hospital Billing Software.",
      keywords: [
        "Hospital Billing Software",
        "Medical billing software",
        "hospital invoice software",
        "OPD billing software",
        "IPD billing system",
        "healthcare billing software",
      ],
    },
    landing: {
      featuresTitle: "What hospital teams can bill",
      benefitsTitle: "Why connected hospital billing matters",
      faqsTitle: "Hospital billing questions",
      ctaTitle: "See billing from consultation to discharge",
      ctaSubtitle: "Book a demo to review OPD/IPD billing, invoices, payments, outstanding balances and TPA workflows in MedicoreERP.",
    },
    moats: ["Connected OPD & IPD billing", "Outstanding balance tracking", "Insurance & TPA billing"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "patient-reminders",
    name: "Patient Reminder Software",
    tagline: "Keep Patients Informed Before Every Visit",
    problem: "Missed appointments and follow-ups increase when patients are not reminded in time, and front-desk teams spend hours making repetitive calls.",
    overview: [
      "MedicoreERP Patient Reminder Software helps hospitals maintain timely communication with patients through automated notifications.",
      "Patients can receive reminders about upcoming appointments, follow-up consultations, recalls, and schedule changes through supported communication channels such as SMS or WhatsApp.",
      "Automating routine reminders can reduce repetitive calling by front-desk teams while helping patients remain informed throughout their healthcare journey.",
    ],
    features: [
      { title: "Appointment Reminders", desc: "Notify patients before scheduled doctor consultations or healthcare appointments.", icon: Bell },
      { title: "Follow-Up Reminders", desc: "Remind patients when they are due for a clinical review or follow-up visit.", icon: Calendar },
      { title: "Patient Recall Notifications", desc: "Reconnect with patients requiring periodic consultations, screenings, or check-ups.", icon: Users },
      { title: "SMS Notifications", desc: "Send important appointment and follow-up information through SMS.", icon: Mail },
      { title: "WhatsApp Communication", desc: "Use supported WhatsApp workflows for convenient patient communication.", icon: MessageSquareText },
      { title: "Schedule-Change Alerts", desc: "Notify patients when appointment dates, times, or schedules change.", icon: Clock },
      { title: "Appointment Confirmations", desc: "Send confirmation messages after an appointment has been successfully scheduled.", icon: BadgeCheck },
      { title: "Automated Communication Workflows", desc: "Configure routine reminder processes to reduce repetitive administrative communication.", icon: Workflow },
    ],
    benefits: [
      "Improved patient communication",
      "Reduced manual calling",
      "Better follow-up consistency",
      "Fewer missed communications",
      "Improved patient engagement",
    ],
    faqs: [
      {
        q: "What is patient reminder software?",
        a: "Patient reminder software automates notifications for appointments, follow-ups, recalls, and other healthcare activities.",
      },
      {
        q: "Can reminders be sent through SMS?",
        a: "Yes. SMS can be used as a supported communication channel for patient reminders.",
      },
      {
        q: "Can WhatsApp reminders be used?",
        a: "WhatsApp communication can be supported when the required messaging integration is configured.",
      },
      {
        q: "How do automated reminders help hospital teams?",
        a: "They reduce repetitive front-desk communication while helping patients stay informed about scheduled healthcare activities.",
      },
    ],
    seo: {
      title: "Patient Reminder Software for Hospitals | MedicoreERP",
      description: "Automate patient appointment, follow-up and recall reminders through SMS and WhatsApp with MedicoreERP Patient Reminder Software.",
      keywords: [
        "Patient Reminder Software",
        "Appointment reminder system",
        "healthcare SMS reminders",
        "WhatsApp patient reminders",
        "patient engagement software",
      ],
    },
    landing: {
      featuresTitle: "How hospitals keep patients informed",
      benefitsTitle: "Why automated patient reminders matter",
      faqsTitle: "Patient reminder questions",
      ctaTitle: "See reminders before every visit",
      ctaSubtitle: "Book a demo to review appointment, follow-up and recall reminders through SMS and WhatsApp.",
    },
    moats: ["SMS & WhatsApp reminders", "Follow-up and recall workflows", "Schedule-change alerts"],
    image: "https://images.unsplash.com/photo-1576671081837-49000212a370?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "patient-access",
    name: "Patient Access Software",
    tagline: "Make Patient Registration Faster and Simpler",
    problem: "Paper forms and duplicate records slow front-desk teams and make returning patients repeat the same details at every visit.",
    overview: [
      "MedicoreERP Patient Access Software helps hospitals simplify registration, check-in, and front-desk workflows.",
      "Patient demographic details, contact information, identification data, consent information, and relevant documents can be organized within one digital profile.",
      "When returning patients visit again, authorized teams can retrieve existing information instead of creating unnecessary duplicate records. This can reduce repetitive data entry and make the registration experience smoother for patients and hospital staff.",
    ],
    features: [
      { title: "New Patient Registration", desc: "Capture essential patient identity, demographic, and contact information.", icon: UserPlus },
      { title: "Returning Patient Identification", desc: "Locate existing patient records quickly to reduce duplicate registration.", icon: Users },
      { title: "Digital Patient Profiles", desc: "Maintain patient information within an organized digital profile.", icon: FolderOpen },
      { title: "Quick Check-In", desc: "Simplify arrival workflows for scheduled and walk-in patients.", icon: Clock },
      { title: "Demographic Management", desc: "Maintain accurate patient contact, personal, and demographic information.", icon: ClipboardList },
      { title: "Consent Capture", desc: "Record relevant patient consent information digitally.", icon: ShieldCheck },
      { title: "Document Management", desc: "Maintain applicable patient documents and records in an organized format.", icon: FileText },
      { title: "Patient Search", desc: "Search for existing patients using available identifiers such as patient ID, name, or contact details.", icon: Search },
      { title: "Front-Desk Workflow Management", desc: "Coordinate registration, check-in, appointment verification, and patient routing.", icon: Workflow },
    ],
    benefits: [
      "Faster patient registration",
      "Reduced duplicate records",
      "Less repetitive data entry",
      "Improved front-desk productivity",
      "Better patient experience",
    ],
    faqs: [
      {
        q: "What is patient registration software?",
        a: "Patient registration software helps healthcare organizations capture and manage patient demographic, contact, identity, and registration information digitally.",
      },
      {
        q: "Can returning patients be identified quickly?",
        a: "Yes. Existing patient profiles can be searched and retrieved to reduce unnecessary re-registration.",
      },
      {
        q: "Can documents be stored with a patient profile?",
        a: "Relevant patient documents can be associated with the appropriate digital patient record.",
      },
      {
        q: "How does digital registration improve patient experience?",
        a: "It can reduce repetitive paperwork and help front-desk teams complete registration more efficiently.",
      },
    ],
    seo: {
      title: "Patient Registration & Access Software | MedicoreERP",
      description: "Simplify patient registration, digital profiles, check-in and front-desk workflows with MedicoreERP Patient Access Software.",
      keywords: [
        "Patient Registration Software",
        "Patient access software",
        "patient management system",
        "hospital front desk software",
        "digital patient registration",
      ],
    },
    landing: {
      featuresTitle: "What front-desk teams can manage",
      benefitsTitle: "Why digital patient registration matters",
      faqsTitle: "Patient registration questions",
      ctaTitle: "See faster patient registration",
      ctaSubtitle: "Book a demo to review registration, digital profiles, check-in and front-desk workflows in MedicoreERP.",
    },
    moats: ["Returning patient identification", "Digital patient profiles", "Front-desk check-in"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "clinical-emr-opd-ipd",
    name: "Clinical Management Software",
    tagline: "Connect the Complete Patient Journey from OPD to IPD",
    problem: "When OPD, IPD, EMR, nursing, and discharge live in separate systems, care teams lose the complete patient journey.",
    overview: [
      "MedicoreERP Clinical Management Software connects Electronic Medical Records with outpatient and inpatient workflows.",
      "Doctors can manage consultations, diagnoses, prescriptions, clinical notes, investigations, and treatment plans, while inpatient teams can coordinate admissions, wards, beds, nursing activities, transfers, and discharge.",
      "A connected clinical environment gives authorized healthcare professionals a more complete view of the patient journey and reduces the need to maintain separate information across different hospital departments.",
      "OPD/IPD management, admissions, bed allocation, discharge summaries, EMR, prescriptions, pharmacy, and laboratory connectivity are common core modules in competitor HIMS platforms.",
    ],
    features: [
      { title: "OPD Management", desc: "Manage outpatient registration, consultation, diagnosis, prescriptions, and follow-up activities.", icon: Activity },
      { title: "IPD Management", desc: "Coordinate patient admission, inpatient care, transfers, and discharge processes.", icon: Hospital },
      { title: "Electronic Medical Records", desc: "Maintain connected clinical information throughout the patient's care journey.", icon: ClipboardList },
      { title: "Clinical Notes", desc: "Allow doctors to record assessments, observations, findings, and treatment information.", icon: ClipboardPen },
      { title: "Diagnosis Documentation", desc: "Maintain diagnosis information within the patient's clinical record.", icon: Stethoscope },
      { title: "Electronic Prescriptions", desc: "Create digital prescriptions and connect them with applicable pharmacy workflows.", icon: Pill },
      { title: "Investigation Orders", desc: "Send laboratory and radiology investigation requests electronically.", icon: FlaskConical },
      { title: "Nursing Documentation", desc: "Record nursing observations, vital information, medications, and care activities.", icon: HeartPulse },
      { title: "Bed & Ward Management", desc: "Monitor patient allocation and available capacity across hospital wards.", icon: BedDouble },
      { title: "Treatment Plans", desc: "Document planned medicines, procedures, therapies, and clinical interventions.", icon: GitBranch },
      { title: "Discharge Summaries", desc: "Prepare structured patient discharge information including diagnosis, treatment, and follow-up instructions.", icon: FileText },
      { title: "Patient History", desc: "Review available previous visits, diagnoses, prescriptions, treatments, and investigations.", icon: BookOpen },
    ],
    benefits: [
      "Better clinical coordination",
      "Connected OPD and IPD workflows",
      "Faster access to patient history",
      "Reduced duplicate documentation",
      "Better visibility for care teams",
      "More organized patient journeys",
    ],
    faqs: [
      {
        q: "What is OPD and IPD management software?",
        a: "It manages outpatient and inpatient workflows including consultation, admission, beds, treatment, nursing, and discharge.",
      },
      {
        q: "Can EMR be connected with OPD and IPD workflows?",
        a: "Yes. A connected system can maintain patient clinical information across outpatient and inpatient interactions.",
      },
      {
        q: "Can doctors request laboratory tests electronically?",
        a: "Investigation orders can be sent to connected laboratory or radiology workflows.",
      },
      {
        q: "Can discharge summaries be generated digitally?",
        a: "Yes. Relevant inpatient and clinical information can be used to prepare structured digital discharge summaries.",
      },
    ],
    seo: {
      title: "OPD & IPD Management Software with EMR | MedicoreERP",
      description: "Connect OPD, IPD, EMR, prescriptions, nursing, admissions and discharge workflows with MedicoreERP Clinical Management Software.",
      keywords: [
        "OPD IPD Management Software",
        "OPD software",
        "IPD software",
        "clinical management software",
        "hospital EMR",
        "inpatient management system",
        "outpatient management system",
      ],
    },
    landing: {
      featuresTitle: "What clinical teams can manage",
      benefitsTitle: "Why connected OPD and IPD workflows matter",
      faqsTitle: "OPD, IPD and EMR questions",
      ctaTitle: "See the complete patient journey from OPD to IPD",
      ctaSubtitle: "Book a demo to review OPD, IPD, EMR, prescriptions, nursing, admissions and discharge in MedicoreERP.",
    },
    moats: ["Connected OPD and IPD", "EMR across the care journey", "Digital discharge summaries"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "pharmacy",
    name: "Hospital Pharmacy Management Software",
    tagline: "Connect Prescriptions, Pharmacy Inventory and Dispensing",
    problem: "Disconnected pharmacy workflows make it harder to track stock, expiry, purchases, and prescription fulfillment across hospital teams.",
    overview: [
      "MedicoreERP Hospital Pharmacy Management Software helps pharmacy teams manage medicines from procurement and inventory through prescription fulfillment, dispensing, and billing.",
      "Teams can monitor stock availability, medicine batches, expiry information, purchase activity, stock movement, and replenishment requirements.",
      "When pharmacy workflows are connected with hospital clinical systems, electronic prescriptions can move directly from doctors to pharmacy teams, reducing repetitive entry.",
      "Competitor pharmacy products prominently use terms such as stock tracking, expiry alerts, batch management, prescriptions, purchasing, reorder alerts, multi-location inventory, and pharmacy billing.",
    ],
    features: [
      { title: "E-Prescription Integration", desc: "Receive prescription information from connected clinical workflows without unnecessary re-entry.", icon: FileText },
      { title: "Medicine Inventory Tracking", desc: "Monitor available medicine quantities and stock movement.", icon: Boxes },
      { title: "Batch Management", desc: "Maintain batch-level medicine information for improved traceability.", icon: Package },
      { title: "Expiry Monitoring", desc: "Identify medicines that are approaching or have reached their expiry date.", icon: Clock },
      { title: "Low-Stock Alerts", desc: "Highlight products when quantities fall below defined minimum stock levels.", icon: Bell },
      { title: "Reorder Management", desc: "Support timely replenishment based on available inventory and stock requirements.", icon: TrendingUp },
      { title: "Purchase Management", desc: "Manage pharmacy procurement, purchase orders, and goods receipts.", icon: ShoppingCart },
      { title: "Supplier Management", desc: "Maintain relevant vendor and purchasing information in one place.", icon: Building2 },
      { title: "Pharmacy Billing", desc: "Generate applicable charges for medicines supplied to patients.", icon: CreditCard },
      { title: "Dispensing Records", desc: "Maintain records of medicines issued against patient prescriptions.", icon: ClipboardList },
      { title: "Stock Movement Tracking", desc: "Track receipts, issues, returns, transfers, and inventory adjustments.", icon: ArrowLeftRight },
    ],
    benefits: [
      "Better pharmacy stock visibility",
      "Reduced risk of stock-outs",
      "Better expiry monitoring",
      "Faster prescription processing",
      "Improved medicine traceability",
      "More organized procurement",
    ],
    faqs: [
      {
        q: "What is hospital pharmacy management software?",
        a: "It manages prescriptions, medicine inventory, batches, expiry information, purchases, dispensing, and pharmacy billing.",
      },
      {
        q: "Can medicine expiry dates be tracked?",
        a: "Yes. Expiry information can be monitored so pharmacy teams can identify medicines approaching expiry.",
      },
      {
        q: "Can pharmacy teams receive electronic prescriptions?",
        a: "When connected with clinical workflows, prescription information can be transferred electronically to the pharmacy.",
      },
      {
        q: "Can low-stock medicines be identified?",
        a: "Yes. Reorder levels and stock alerts can help pharmacy teams identify medicines requiring replenishment.",
      },
    ],
    seo: {
      title: "Hospital Pharmacy Management Software | MedicoreERP",
      description: "Manage prescriptions, medicine inventory, batches, expiry dates, purchases and dispensing with MedicoreERP Pharmacy Management Software.",
      keywords: [
        "Hospital Pharmacy Management Software",
        "Pharmacy inventory software",
        "medicine stock management",
        "pharmacy billing software",
        "e-prescription software",
        "hospital pharmacy system",
      ],
    },
    landing: {
      featuresTitle: "What pharmacy teams can manage",
      benefitsTitle: "Why connected pharmacy workflows matter",
      faqsTitle: "Hospital pharmacy questions",
      ctaTitle: "See prescriptions, inventory and dispensing in one workflow",
      ctaSubtitle: "Book a demo to review e-prescriptions, batches, expiry, purchases and pharmacy billing in MedicoreERP.",
    },
    moats: ["E-prescription integration", "Batch and expiry tracking", "Pharmacy billing connected"],
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "laboratory",
    name: "Laboratory Information System",
    tagline: "Manage the Laboratory from Sample Collection to Report",
    problem: "Paper registers and disconnected lab systems slow sample tracking, result validation, and clinician access to diagnostic reports.",
    overview: [
      "MedicoreERP Laboratory Information System (LIS/LIMS) helps diagnostic teams manage the complete laboratory workflow more efficiently.",
      "Test requests, sample collection, barcode identification, test processing, result entry, validation, and report generation can be handled through one structured laboratory system.",
      "By connecting laboratory workflows with patient records, clinicians can access completed diagnostic information without depending on separate paper reports.",
      "Competitor LIMS products emphasize barcode sample management, analyzer integration, validation workflows, reporting, turnaround-time monitoring, and patient-record integration.",
    ],
    features: [
      { title: "Laboratory Test Ordering", desc: "Receive diagnostic test requests from authorized doctors and departments.", icon: FlaskConical },
      { title: "Sample Collection", desc: "Record sample collection information and maintain the current sample status.", icon: TestTube2 },
      { title: "Barcode & Sample Tracking", desc: "Use unique identification to follow specimens throughout the laboratory workflow.", icon: Barcode },
      { title: "Analyzer Integration", desc: "Connect compatible laboratory equipment to streamline supported result-processing activities.", icon: Share2 },
      { title: "Test Processing", desc: "Organize tests according to pending, in-process, and completed stages.", icon: Workflow },
      { title: "Result Entry", desc: "Record diagnostic findings against the correct patient and test request.", icon: ClipboardPen },
      { title: "Result Validation", desc: "Enable authorized laboratory personnel to review results before final release.", icon: BadgeCheck },
      { title: "Digital Lab Reports", desc: "Generate structured electronic laboratory reports for easier access.", icon: FileText },
      { title: "Patient Record Integration", desc: "Connect completed laboratory reports with the corresponding patient record.", icon: FolderOpen },
      { title: "Turnaround-Time Monitoring", desc: "Track the time between sample collection, processing, validation, and final reporting.", icon: Clock },
    ],
    benefits: [
      "Better sample visibility",
      "Reduced repetitive data entry",
      "More organized laboratory workflows",
      "Faster access to diagnostic reports",
      "Improved result traceability",
      "Better turnaround monitoring",
    ],
    faqs: [
      {
        q: "What is LIS or LIMS software?",
        a: "LIS/LIMS software manages laboratory workflows such as test orders, samples, processing, results, validation, and reporting.",
      },
      {
        q: "Can laboratory samples be tracked using barcodes?",
        a: "Barcode-based workflows can help identify and track individual samples through different laboratory stages.",
      },
      {
        q: "Can laboratory analyzers be integrated?",
        a: "Compatible laboratory equipment can be integrated where supported to streamline information exchange.",
      },
      {
        q: "Can lab reports be connected with patient records?",
        a: "Yes. Final laboratory reports can be associated with the appropriate patient record in a connected hospital system.",
      },
    ],
    seo: {
      title: "Laboratory Information System LIS/LIMS | MedicoreERP",
      description: "Manage lab orders, samples, barcode tracking, results, validation and digital reports with MedicoreERP Laboratory Information System.",
      keywords: [
        "Laboratory Information System",
        "LIS software",
        "LIMS software",
        "laboratory management software",
        "sample tracking software",
        "lab reporting system",
        "analyzer integration",
      ],
    },
    landing: {
      featuresTitle: "What laboratory teams can manage",
      benefitsTitle: "Why a connected LIS/LIMS matters",
      faqsTitle: "Laboratory information system questions",
      ctaTitle: "See the laboratory from sample collection to report",
      ctaSubtitle: "Book a demo to review orders, barcode tracking, analyzer integration, validation and digital reports in MedicoreERP.",
    },
    moats: ["Barcode sample tracking", "Analyzer integration", "Patient-record lab reports"],
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "radiology",
    name: "Radiology Management Software",
    tagline: "Connect Radiology from Imaging Order to Final Report",
    problem: "Disconnected imaging orders, worklists, and reports make it harder for radiology and clinical teams to share completed studies.",
    overview: [
      "MedicoreERP Radiology Management Software helps hospitals organize imaging workflows from test requests and scheduling through examination, reporting, and patient-record access.",
      "Radiology teams can manage worklists, monitor examination status, organize reports, and connect imaging information with relevant patient records.",
      "Support for RIS/PACS and DICOM-based workflows can also help healthcare organizations maintain a more connected medical imaging environment.",
      "Radiology Information Systems in competitor HIMS platforms commonly emphasize imaging worklists, PACS connectivity, DICOM workflows, and structured radiology reporting.",
    ],
    features: [
      { title: "Radiology Order Management", desc: "Receive and organize imaging requests from doctors and authorized clinical departments.", icon: Scan },
      { title: "Imaging Appointment Scheduling", desc: "Schedule radiology examinations according to available equipment and time slots.", icon: Calendar },
      { title: "Radiologist Worklists", desc: "Organize pending examinations and reporting tasks for radiologists.", icon: ClipboardList },
      { title: "RIS Workflow Management", desc: "Manage the imaging workflow from order receipt through examination and reporting.", icon: Workflow },
      { title: "PACS Integration", desc: "Connect with supported Picture Archiving and Communication Systems for medical image management.", icon: Share2 },
      { title: "DICOM Connectivity", desc: "Support standardized medical imaging data exchange with compatible systems.", icon: ArrowLeftRight },
      { title: "Digital Radiology Reports", desc: "Prepare and maintain radiology reports electronically.", icon: FileText },
      { title: "Examination Status Tracking", desc: "Monitor imaging requests across scheduled, completed, reporting, and finalized stages.", icon: Activity },
      { title: "Patient Record Integration", desc: "Link radiology reports with the corresponding patient's clinical information.", icon: FolderOpen },
    ],
    benefits: [
      "Better radiology workflow visibility",
      "More organized imaging schedules",
      "Faster access to completed reports",
      "Reduced duplicate information entry",
      "Improved clinical and radiology coordination",
    ],
    faqs: [
      {
        q: "What is a Radiology Information System?",
        a: "A RIS helps healthcare organizations manage imaging orders, scheduling, examination workflows, worklists, and reporting.",
      },
      {
        q: "What is PACS?",
        a: "PACS, or Picture Archiving and Communication System, is used to store, retrieve, and manage medical images digitally.",
      },
      {
        q: "What is DICOM?",
        a: "DICOM is a widely used standard for exchanging and managing medical imaging information.",
      },
      {
        q: "Can radiology reports be connected to patient records?",
        a: "Yes. Completed imaging reports can be associated with the relevant patient's clinical record.",
      },
    ],
    seo: {
      title: "RIS & Radiology Management Software | MedicoreERP",
      description: "Manage radiology orders, imaging workflows, RIS, PACS connectivity and digital reports with MedicoreERP Radiology Management Software.",
      keywords: [
        "Radiology Management Software",
        "RIS software",
        "Radiology Information System",
        "PACS integration",
        "DICOM integration",
        "medical imaging software",
      ],
    },
    landing: {
      featuresTitle: "What radiology teams can manage",
      benefitsTitle: "Why connected imaging workflows matter",
      faqsTitle: "Radiology, RIS, PACS and DICOM questions",
      ctaTitle: "See radiology from imaging order to final report",
      ctaSubtitle: "Book a demo to review orders, worklists, RIS/PACS connectivity and digital radiology reports in MedicoreERP.",
    },
    moats: ["RIS workflow management", "PACS and DICOM connectivity", "Reports in the patient record"],
    image: "https://images.unsplash.com/photo-1631563019676-dade0dbdb8fc?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "revenue-cycle",
    name: "Healthcare Revenue Cycle Management Software",
    tagline: "Improve Financial Visibility Across the Patient Revenue Cycle",
    problem: "When charge capture, billing, claims, collections, and receivables sit in separate processes, finance teams lose visibility into outstanding amounts and hospital revenue.",
    overview: [
      "MedicoreERP Healthcare Revenue Cycle Management Software helps hospitals manage the financial journey associated with patient services.",
      "From charge capture and billing to insurance workflows, outstanding balances, payment collection, reconciliation, and financial reporting, revenue-related information can be organized in one connected system.",
      "Better visibility helps finance teams identify outstanding amounts sooner, monitor collections, and understand how different hospital services contribute to overall revenue.",
      "Billing, insurance/TPA claims, payment tracking, and revenue reporting are commonly integrated into comprehensive hospital management platforms.",
    ],
    features: [
      { title: "Automated Charge Capture", desc: "Capture applicable charges when patient services and hospital activities are recorded.", icon: Zap },
      { title: "Patient Billing", desc: "Bring relevant healthcare charges together into organized patient billing records.", icon: FileText },
      { title: "Insurance & TPA Workflows", desc: "Manage applicable billing, authorization, and payment processes involving third-party payers.", icon: ShieldCheck },
      { title: "Claims Tracking", desc: "Monitor claims throughout preparation, submission, processing, and settlement stages.", icon: ClipboardList },
      { title: "Outstanding Payment Monitoring", desc: "Identify unpaid balances that may require collection follow-up.", icon: Receipt },
      { title: "Payment Reconciliation", desc: "Match payments with relevant invoices, patients, or payer records.", icon: ArrowLeftRight },
      { title: "Collection Tracking", desc: "Monitor collected and pending payments across different payer categories.", icon: CreditCard },
      { title: "Revenue Reporting", desc: "Review billing, collections, outstanding balances, and revenue information.", icon: BarChart3 },
      { title: "Department Revenue Analysis", desc: "Understand revenue contribution from individual departments, specialties, or services.", icon: Building2 },
      { title: "Accounts Receivable Visibility", desc: "Maintain a clearer view of amounts that remain outstanding.", icon: Eye },
    ],
    benefits: [
      "Better revenue visibility",
      "Improved collection monitoring",
      "Reduced missed financial follow-up",
      "Faster reconciliation",
      "Better accounts receivable visibility",
      "Stronger financial control",
    ],
    faqs: [
      {
        q: "What is healthcare revenue cycle management?",
        a: "Healthcare RCM covers financial processes such as charge capture, billing, claims, payments, collections, and reconciliation.",
      },
      {
        q: "Can outstanding payments be monitored?",
        a: "Yes. Finance teams can identify and monitor unpaid balances requiring follow-up.",
      },
      {
        q: "Can revenue be analyzed by department?",
        a: "Revenue information can be organized by department or service to provide management with better financial visibility.",
      },
      {
        q: "How does RCM software help hospitals?",
        a: "It brings financial workflows together so billing, collections, claims, and outstanding amounts can be monitored more effectively.",
      },
    ],
    seo: {
      title: "Healthcare Revenue Cycle Management | MedicoreERP",
      description: "Manage hospital billing, claims, collections, reconciliation and receivables with MedicoreERP Revenue Cycle Management Software.",
      keywords: [
        "Healthcare Revenue Cycle Management Software",
        "Hospital RCM software",
        "medical revenue cycle management",
        "healthcare billing",
        "claims management software",
        "hospital revenue management",
      ],
    },
    landing: {
      featuresTitle: "What finance teams can manage",
      benefitsTitle: "Why connected revenue cycle visibility matters",
      faqsTitle: "Healthcare revenue cycle questions",
      ctaTitle: "See financial visibility across the patient revenue cycle",
      ctaSubtitle: "Book a demo to review charge capture, claims, collections, reconciliation and receivables in MedicoreERP.",
    },
    moats: ["Automated charge capture", "Claims and TPA workflows", "Accounts receivable visibility"],
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "supply-chain",
    name: "Hospital Supply Chain Management Software",
    tagline: "Keep Hospital Inventory Available When It Is Needed",
    problem: "Without connected inventory, procurement, and stock movement, hospitals struggle to know what is available, what is being consumed, and what needs replenishment.",
    overview: [
      "MedicoreERP Hospital Supply Chain Management Software helps hospitals manage medical supplies, consumables, procurement, suppliers, inventory, and stock movement.",
      "Teams can understand what is currently available, what is being consumed, what needs replenishment, and where inventory is located across departments or facilities.",
      "A connected supply chain process supports better purchasing decisions while helping healthcare organizations reduce unnecessary stock-outs and improve inventory visibility.",
      "Inventory control and procurement are also regularly included among core Hospital Management System capabilities.",
    ],
    features: [
      { title: "Medical Inventory Management", desc: "Maintain visibility into consumables, medical supplies, and other hospital inventory.", icon: Boxes },
      { title: "Purchase Requisitions", desc: "Allow authorized departments to raise structured requests for required materials.", icon: ClipboardList },
      { title: "Purchase Order Management", desc: "Create, approve, and track procurement orders through a controlled purchasing workflow.", icon: ShoppingCart },
      { title: "Supplier Management", desc: "Maintain relevant vendor profiles and purchasing information.", icon: Building2 },
      { title: "Goods Receipt", desc: "Record inventory received against applicable purchase orders.", icon: Package },
      { title: "Stock Transfers", desc: "Track material movement between warehouses, stores, wards, and departments.", icon: ArrowLeftRight },
      { title: "Department-Wise Stock", desc: "View inventory availability according to individual departments or storage locations.", icon: MapPin },
      { title: "Reorder-Level Alerts", desc: "Identify items reaching predefined stock levels so replenishment can be planned.", icon: Bell },
      { title: "Consumption Tracking", desc: "Understand how supplies are being used across hospital departments.", icon: TrendingUp },
      { title: "Multi-Location Inventory", desc: "Maintain inventory visibility across multiple stores, branches, or hospital facilities.", icon: Network },
      { title: "Inventory Reporting", desc: "Review stock, consumption, purchases, ageing, and inventory movement information.", icon: BarChart3 },
    ],
    benefits: [
      "Better inventory visibility",
      "Reduced stock-out risk",
      "Improved procurement planning",
      "Better supplier management",
      "Reduced unnecessary inventory",
      "Improved stock traceability",
    ],
    faqs: [
      {
        q: "What is hospital inventory management software?",
        a: "It helps hospitals manage inventory, medical supplies, stock levels, purchasing, suppliers, consumption, and stock movement.",
      },
      {
        q: "Can inventory be viewed by department?",
        a: "Yes. Inventory can be organized according to departments, stores, warehouses, or locations.",
      },
      {
        q: "Can low-stock items be identified automatically?",
        a: "Configured reorder levels can help identify inventory items that require replenishment.",
      },
      {
        q: "Can multiple facilities manage inventory centrally?",
        a: "Multi-location workflows can provide centralized visibility across supported hospital locations or stores.",
      },
    ],
    seo: {
      title: "Hospital Supply Chain & Inventory Software | MedicoreERP",
      description: "Manage hospital inventory, suppliers, procurement, stock transfers and reorder levels with MedicoreERP Supply Chain Management Software.",
      keywords: [
        "Hospital Inventory Management Software",
        "Healthcare supply chain software",
        "hospital procurement software",
        "medical inventory management",
        "hospital stock management software",
      ],
    },
    landing: {
      featuresTitle: "What supply chain teams can manage",
      benefitsTitle: "Why connected hospital inventory matters",
      faqsTitle: "Hospital supply chain questions",
      ctaTitle: "See hospital inventory available when it is needed",
      ctaSubtitle: "Book a demo to review inventory, procurement, suppliers, stock transfers and reorder alerts in MedicoreERP.",
    },
    moats: ["Department-wise stock visibility", "Controlled procurement workflows", "Multi-location inventory"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=70",
  },
  {
    slug: "workforce-hrm",
    name: "Hospital HR Management Software",
    tagline: "Manage the Healthcare Workforce from One System",
    problem: "Separate employee spreadsheets and attendance records make it harder for HR and hospital teams to see staff availability, shifts, and departmental coverage.",
    overview: [
      "Healthcare organizations depend on doctors, nurses, technicians, administrative teams, and support staff working together every day.",
      "MedicoreERP Hospital HR Management Software helps centralize employee information, attendance, shifts, rosters, leave, departmental assignments, and routine workforce administration.",
      "Instead of maintaining separate employee spreadsheets and attendance records, HR and hospital management teams gain one organized view of workforce information.",
      "Human Resource Management and staff administration are also commonly positioned as core modules within comprehensive Hospital Management Systems.",
    ],
    features: [
      { title: "Employee Master Records", desc: "Maintain centralized professional and employment information for hospital staff.", icon: UsersRound },
      { title: "Attendance Management", desc: "Track employee attendance, working hours, absences, and related information.", icon: Clock },
      { title: "Shift Scheduling", desc: "Assign staff to appropriate working shifts according to hospital requirements.", icon: Calendar },
      { title: "Roster Management", desc: "Plan workforce coverage across departments, shifts, and operational periods.", icon: ClipboardList },
      { title: "Leave Management", desc: "Manage leave requests, approvals, balances, and employee availability.", icon: FileText },
      { title: "Department Allocation", desc: "Associate employees with the appropriate hospital departments or functions.", icon: Building2 },
      { title: "Employee Documentation", desc: "Maintain relevant professional certificates, employment documents, and records.", icon: FolderOpen },
      { title: "Staff Availability", desc: "View employee availability to support workforce planning and scheduling.", icon: Users },
      { title: "HR Reporting", desc: "Generate structured reports covering employee, attendance, leave, and workforce information.", icon: BarChart3 },
      { title: "Workforce Administration", desc: "Centralize routine HR activities to reduce disconnected employee records.", icon: Settings2 },
    ],
    benefits: [
      "Centralized workforce information",
      "Better staff scheduling",
      "Easier attendance monitoring",
      "Reduced HR administrative effort",
      "Improved workforce visibility",
      "Better departmental planning",
    ],
    faqs: [
      {
        q: "What is hospital HR management software?",
        a: "Hospital HR software helps manage employee records, attendance, shifts, rosters, leave, documents, and workforce administration.",
      },
      {
        q: "Can doctors and nurses be scheduled by shift?",
        a: "Yes. Staff can be assigned according to configured shift and department requirements.",
      },
      {
        q: "Can employee documents be maintained digitally?",
        a: "Relevant professional and employment documents can be organized as part of employee records.",
      },
      {
        q: "How does HR software help healthcare organizations?",
        a: "It centralizes workforce information and reduces the administrative effort involved in maintaining separate employee records.",
      },
    ],
    seo: {
      title: "Hospital HR & Workforce Management Software | MedicoreERP",
      description: "Manage hospital employees, attendance, shifts, rosters, leave and workforce information with MedicoreERP Hospital HR Management Software.",
      keywords: [
        "Hospital HR Management Software",
        "Healthcare workforce management",
        "hospital HRMS",
        "staff scheduling software",
        "healthcare HR software",
        "employee management system",
      ],
    },
    landing: {
      featuresTitle: "What HR and hospital teams can manage",
      benefitsTitle: "Why centralized workforce information matters",
      faqsTitle: "Hospital HR management questions",
      ctaTitle: "See healthcare workforce management in one system",
      ctaSubtitle: "Book a demo to review employees, attendance, shifts, rosters, leave and HR reporting in MedicoreERP.",
    },
    moats: ["Centralized employee records", "Shift and roster planning", "Attendance and leave in one view"],
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
      "Competitor hospital management solutions increasingly position dashboards, MIS, patient-flow reporting, revenue analytics, inventory information, and operational KPIs as important management capabilities.",
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
    landing: {
      featuresTitle: "What hospital teams can monitor",
      benefitsTitle: "Why hospital analytics matters",
      faqsTitle: "Hospital analytics questions",
      ctaTitle: "See hospital data as clear, actionable insights",
      ctaSubtitle: "Book a demo to review KPI dashboards, occupancy, revenue, inventory and MIS reports in MedicoreERP.",
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
  { slug: "diagnostics", href: "/solutions/diagnostic-lab-management-software", name: "Diagnostics / Labs", hero: "From sample to signed report, automated.", pains: ["Analyzer silos", "QC scramble", "Slow TAT"], bundle: ["LIS", "RIS/PACS", "Home-collection", "Patient reports", "B2B portal"], priceFrom: "₹15,000/mo" },
  { slug: "pharmacy", href: "/solutions/pharmacy-management-software", name: "Pharmacy Chains", hero: "One ledger across every outlet.", pains: ["Stock-outs & expiry loss", "No central visibility", "Manual reorder"], bundle: ["Multi-store inventory", "POS & returns", "Demand forecast", "Loyalty", "Analytics"], priceFrom: "₹6,000/store/mo" },
  { slug: "enterprise", href: "/solutions/enterprise-healthcare-erp", name: "Enterprise Networks", hero: "Coherence across every branch.", pains: ["Inconsistent processes", "No network view", "Slow rollout"], bundle: ["Everything", "Command Center", "Multi-tenant admin", "Developer platform", "Dedicated success"], priceFrom: "Custom" },
  { slug: "government", href: "/solutions/government-payer-management", name: "Government / Payer", hero: "Public-health scale, compliant by default.", pains: ["ABDM mandates", "Population reporting", "Interoperability"], bundle: ["ABDM-ready HMIS", "Registries", "Claims/TPA", "Analytics", "Data-freedom exports"], priceFrom: "Custom" },
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
      desc: "Create a digital patient profile with identity, demographics, contact information, consent and relevant documents.",
      icon: UserPlus,
      href: "/product/patient-access",
    },
    {
      title: "Smart Appointment Scheduling",
      desc: "Manage doctor availability, consultation slots, walk-ins, patient queues, rescheduling and appointment reminders.",
      icon: Calendar,
      href: "/product/appointments",
    },
    {
      title: "OPD Management",
      desc: "Manage outpatient consultation, diagnosis, prescriptions, investigation orders and follow-up activities.",
      icon: Activity,
      href: "/product/clinical-emr-opd-ipd",
    },
    {
      title: "Electronic Medical Records",
      desc: "Maintain diagnoses, allergies, medications, vitals, clinical notes, medical history and previous visits digitally.",
      icon: ClipboardList,
      href: "/product/electronic-medical-records",
    },
    {
      title: "Clinical Documentation",
      desc: "Give doctors access to clinical notes, diagnosis documentation, treatment plans and connected EMR information.",
      icon: ClipboardPen,
      href: "/product/clinical-emr-opd-ipd",
    },
    {
      title: "e-Prescriptions",
      desc: "Generate digital prescriptions as part of the patient's clinical record and send them to connected pharmacy workflows.",
      icon: Pill,
      href: "/product/pharmacy",
    },
    {
      title: "Laboratory & Radiology",
      desc: "Create diagnostic orders and make laboratory and imaging reports available within the patient record.",
      icon: FlaskConical,
      href: "/product/laboratory",
    },
    {
      title: "Billing & Payments",
      desc: "Generate OPD and service bills, invoices, receipts and payment records without combining charges from separate systems.",
      icon: CreditCard,
      href: "/product/billing-invoices",
    },
    {
      title: "Patient Communication",
      desc: "Send appointment confirmations, reminders, follow-up communication and recall notifications through SMS, WhatsApp and related workflows.",
      icon: MessageSquareText,
      href: "/integrations/whatsapp",
    },
    {
      title: "Reports & Analytics",
      desc: "Monitor patient volumes, OPD/IPD activity, revenue, occupancy and operational KPIs without combining multiple spreadsheets.",
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
      desc: "Register new patients, identify returning patients and maintain centralized digital profiles at the front desk.",
      icon: UserPlus,
      href: "/product/patient-access",
    },
    {
      title: "Appointments & Front Office",
      desc: "Manage bookings, doctor availability, time slots, walk-ins, queues and appointment reminders.",
      icon: Calendar,
      href: "/product/appointments",
    },
    {
      title: "OPD Management",
      desc: "Connect consultation, EMR, prescriptions, investigation orders and outpatient follow-up.",
      icon: Activity,
      href: "/product/clinical-emr-opd-ipd",
    },
    {
      title: "IPD / ADT Management",
      desc: "Coordinate admissions, beds, wards, nursing, transfers and discharge from one inpatient workflow.",
      icon: BedDouble,
      href: "/product/clinical-emr-opd-ipd",
    },
    {
      title: "Electronic Medical Records",
      desc: "Maintain longitudinal clinical information throughout the care journey.",
      icon: ClipboardList,
      href: "/product/electronic-medical-records",
    },
    {
      title: "Nursing Management",
      desc: "Manage vitals, nursing assessments, notes, medications and bedside-care records.",
      icon: HeartPulse,
      href: "/product/clinical-emr-opd-ipd",
    },
    {
      title: "Emergency & Day Care",
      desc: "Support acute and short-stay patient workflows.",
      icon: Ambulance,
      href: "/product/clinical-emr-opd-ipd",
    },
    {
      title: "Operation Theatre",
      desc: "Coordinate theatre schedules, procedures and related patient workflows.",
      icon: ClipboardPen,
      href: "/product/clinical-emr-opd-ipd",
    },
    {
      title: "ICU / Critical Care",
      desc: "Maintain structured information for critical-care teams.",
      icon: Activity,
      href: "/product/clinical-emr-opd-ipd",
    },
    {
      title: "Laboratory / LIS",
      desc: "Connect test ordering, sample tracking, processing, result validation and digital reports with patient records.",
      icon: FlaskConical,
      href: "/product/laboratory",
    },
    {
      title: "Radiology / RIS + PACS",
      desc: "Manage imaging orders, schedules, worklists, RIS/PACS connectivity, DICOM workflows and digital radiology reports.",
      icon: Scan,
      href: "/product/radiology",
    },
    {
      title: "Pharmacy",
      desc: "Connect e-prescriptions with inventory, batches, expiry monitoring, dispensing and pharmacy billing.",
      icon: Pill,
      href: "/product/pharmacy",
    },
    {
      title: "Inventory & Procurement",
      desc: "Manage medical supplies, consumables, purchase orders, suppliers, stock transfers and departmental inventory.",
      icon: Boxes,
      href: "/product/supply-chain",
    },
    {
      title: "Billing & Revenue Cycle",
      desc: "Connect OPD, IPD, pharmacy, laboratory and procedure charges with invoices, payments and outstanding balances.",
      icon: CreditCard,
      href: "/product/billing-invoices",
    },
    {
      title: "Insurance & eClaims",
      desc: "Manage insurance and TPA billing, authorization, claims tracking, collections and settlement workflows.",
      icon: ShieldCheck,
      href: "/product/revenue-cycle",
    },
    {
      title: "Discharge Management",
      desc: "Coordinate discharge summaries, medicines, final billing and follow-up.",
      icon: FileText,
      href: "/product/clinical-emr-opd-ipd",
    },
    {
      title: "HIS Dashboard",
      desc: "Give administrators a centralized view of hospital KPIs, OPD/IPD activity, bed occupancy, billing, revenue and department performance.",
      icon: LayoutDashboard,
      href: "/product/his-dashboard",
    },
    {
      title: "Hospital Analytics & MIS",
      desc: "Turn patient volumes, OPD/IPD activity, occupancy, revenue, collections, department performance and inventory into dashboards, KPIs and MIS reports.",
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

export const DIAGNOSTIC_LAB_LANDING = {
  seo: {
    title: "Diagnostic Lab Management Software Hyderabad | MedicoreERP",
    description:
      "Manage test orders, sample tracking, analyzer integration, reporting, billing and multi-location labs with MedicoreERP Diagnostic Lab Management Software.",
    keywords: [
      "Diagnostic Lab Management Software in Hyderabad",
      "Laboratory management software",
      "LIMS software Hyderabad",
      "diagnostic centre software",
      "pathology lab software",
      "lab billing software",
      "sample tracking software",
      "laboratory information system",
      "multi-location lab software",
    ],
    canonical: "/solutions/diagnostic-lab-management-software",
  },
  heroTitle: "Diagnostic & Laboratory Management Software",
  heroSubtitle: "From Test Order to Final Report—Manage Every Step in One Connected System.",
  overview: [
    "MedicoreERP helps diagnostic centres, pathology laboratories and hospital labs manage the complete diagnostic workflow from patient registration and test booking to sample collection, processing, result validation, reporting and billing.",
    "By connecting laboratory operations with patient records, diagnostics, billing and reporting, MedicoreERP helps teams reduce manual work, improve sample visibility and deliver a smoother patient experience.",
  ],
  journey: [
    { step: "1", title: "Order" },
    { step: "2", title: "Collection" },
    { step: "3", title: "Tracking" },
    { step: "4", title: "Processing" },
    { step: "5", title: "Validation" },
    { step: "6", title: "Report" },
  ],
  audiences: [
    {
      title: "Independent Diagnostic Centres",
      desc: "Manage patients, tests, samples, billing and reports through one connected platform.",
      icon: Microscope,
    },
    {
      title: "Pathology Laboratories",
      desc: "Simplify sample processing, result validation and report generation.",
      icon: FlaskConical,
    },
    {
      title: "Hospital Laboratories",
      desc: "Connect laboratory orders and results directly with OPD, IPD and patient records.",
      icon: Hospital,
    },
    {
      title: "Multi-Location Diagnostic Networks",
      desc: "Standardize test workflows and maintain centralized visibility across branches.",
      icon: Network,
    },
    {
      title: "Collection Centres",
      desc: "Connect sample collection locations with central laboratories and improve sample traceability.",
      icon: MapPin,
    },
  ],
  modules: [
    {
      title: "Patient Registration",
      desc: "Create or retrieve patient profiles and maintain demographic, contact, consent and document information in one place.",
      icon: UserPlus,
      href: "/product/patient-access",
    },
    {
      title: "Test & Package Management",
      desc: "Configure individual tests, panels, profiles and diagnostic packages according to your service offerings.",
      icon: Package,
      href: "/product/laboratory",
    },
    {
      title: "Test Order Management",
      desc: "Manage laboratory orders generated by doctors, hospitals, clinics or walk-in patients.",
      icon: ClipboardList,
      href: "/product/laboratory",
    },
    {
      title: "Sample Collection",
      desc: "Record sample type, collection time, collection location and related specimen information.",
      icon: TestTube2,
      href: "/product/laboratory",
    },
    {
      title: "Barcode & Sample Tracking",
      desc: "Track samples from collection through processing, testing and final report generation.",
      icon: Barcode,
      href: "/product/laboratory",
    },
    {
      title: "Laboratory Processing",
      desc: "Monitor sample status across different laboratory stages and departments.",
      icon: Activity,
      href: "/product/laboratory",
    },
    {
      title: "Analyzer Integration",
      desc: "Connect compatible analyzers and laboratory systems to improve data flow and reduce repetitive manual entry.",
      icon: Share2,
      href: "/integrations/third-party-api",
    },
    {
      title: "Result Entry & Validation",
      desc: "Enter, review and validate test results before final report approval.",
      icon: BadgeCheck,
      href: "/product/laboratory",
    },
    {
      title: "Multi-Level Approval",
      desc: "Configure result verification and authorization workflows based on laboratory requirements.",
      icon: ShieldCheck,
      href: "/product/platform",
    },
    {
      title: "Report Management",
      desc: "Generate structured diagnostic reports and connect completed reports with patient records.",
      icon: FileText,
      href: "/product/laboratory",
    },
    {
      title: "Report Delivery",
      desc: "Share reports through configured patient communication channels and digital workflows.",
      icon: Bell,
      href: "/integrations/whatsapp",
    },
    {
      title: "Laboratory Billing",
      desc: "Manage test pricing, packages, invoices, receipts and payments.",
      icon: CreditCard,
      href: "/product/billing-invoices",
    },
    {
      title: "Reagent & Inventory Management",
      desc: "Track reagents, kits, consumables and laboratory stock.",
      icon: Boxes,
      href: "/product/supply-chain",
    },
    {
      title: "Multi-Location Management",
      desc: "Manage multiple diagnostic centres and collection points through centralized workflows.",
      icon: Network,
      href: "/solutions/enterprise-healthcare-erp",
    },
    {
      title: "MIS & Analytics",
      desc: "Monitor test volumes, pending samples, revenue, branch activity and operational performance.",
      icon: BarChart3,
      href: "/product/analytics",
    },
  ],
  reasons: [
    {
      title: "Complete Sample Visibility",
      desc: "Track every stage from sample collection to final reporting.",
    },
    {
      title: "Faster Laboratory Workflows",
      desc: "Reduce unnecessary manual steps across test ordering, processing and reporting.",
    },
    {
      title: "Connected Patient Information",
      desc: "Keep diagnostic results linked with the patient's broader healthcare record.",
    },
    {
      title: "Better Result Management",
      desc: "Use structured validation and approval workflows before reports are released.",
    },
    {
      title: "Centralized Multi-Location Control",
      desc: "Maintain visibility across diagnostic centres, labs and collection points.",
    },
    {
      title: "Integrated Billing",
      desc: "Connect tests and packages directly with billing and payment workflows.",
    },
  ],
  faqs: [
    {
      q: "What is Diagnostic Lab Management Software?",
      a: "Diagnostic Lab Management Software helps laboratories manage patient registration, test orders, sample collection, processing, results, reports, billing and inventory.",
    },
    {
      q: "What is LIMS?",
      a: "LIMS stands for Laboratory Information Management System. It helps organize laboratory samples, workflows, test information, results and operational data.",
    },
    {
      q: "Can MedicoreERP track laboratory samples?",
      a: "Yes. MedicoreERP can manage sample collection, processing status, testing and report workflows in a structured way.",
    },
    {
      q: "Can MedicoreERP connect with laboratory analyzers?",
      a: "Yes. Compatible laboratory analyzers and systems can be integrated based on the organization's technical requirements.",
    },
    {
      q: "Can MedicoreERP manage lab billing?",
      a: "Yes. Tests, diagnostic packages and other services can be connected directly with billing and payment workflows.",
    },
    {
      q: "Can lab reports be connected with patient records?",
      a: "Yes. Laboratory information and reports can be linked with the patient's connected healthcare record.",
    },
    {
      q: "Is MedicoreERP suitable for multiple diagnostic centres?",
      a: "Yes. MedicoreERP can support centralized operations and reporting across multiple labs and collection locations.",
    },
    {
      q: "Can patients receive reports digitally?",
      a: "Digital report delivery can be configured through supported communication channels.",
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
      href: "/product/electronic-medical-records",
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

export const GOVERNMENT_PAYER_LANDING = {
  seo: {
    title: "Government & Healthcare Payer Management Software | MedicoreERP",
    description:
      "Manage eligibility, pre-authorizations, insurance, TPA claims, settlements and government healthcare workflows with MedicoreERP.",
    keywords: [
      "Healthcare Payer Management Software",
      "Government healthcare software",
      "TPA management software",
      "hospital insurance software",
      "healthcare claims management",
      "eClaims software",
      "pre-authorization software",
      "payer management system",
      "government health scheme software",
    ],
    canonical: "/solutions/government-payer-management",
  },
  heroTitle: "Government & Healthcare Payer Management Software",
  heroSubtitle: "Connect Eligibility, Approvals, Claims and Settlements in One Workflow.",
  overview: [
    "Healthcare organizations often deal with multiple insurers, TPAs, government programs, authorization processes and claim workflows.",
    "MedicoreERP helps connect patient care with payer-related operations such as eligibility verification, pre-authorization, billing, claims, approvals and settlements through one integrated healthcare platform.",
    "Improve visibility across payer workflows, reduce repetitive coordination and create better alignment between clinical, administrative and financial teams.",
  ],
  audiences: [
    {
      title: "Government Health Programs",
      desc: "Manage healthcare-program-related patient, billing and reporting workflows.",
      icon: Landmark,
    },
    {
      title: "Insurance Companies",
      desc: "Support structured information exchange between healthcare providers and insurers.",
      icon: ShieldCheck,
    },
    {
      title: "Third-Party Administrators",
      desc: "Manage pre-authorizations, claims, supporting documents and settlement workflows.",
      icon: Users,
    },
    {
      title: "Hospitals with Multiple Payers",
      desc: "Centralize payer information instead of managing each insurer through separate processes.",
      icon: Hospital,
    },
    {
      title: "Healthcare Networks",
      desc: "Standardize payer and claim workflows across multiple facilities.",
      icon: Network,
    },
  ],
  modules: [
    {
      title: "Patient & Beneficiary Management",
      desc: "Maintain patient, beneficiary and payer-related information in one connected record.",
      icon: UserPlus,
      href: "/product/patient-access",
    },
    {
      title: "Payer Management",
      desc: "Maintain insurer, TPA and healthcare program information associated with patient care.",
      icon: FolderOpen,
      href: "/product/revenue-cycle",
    },
    {
      title: "Policy & Scheme Management",
      desc: "Record policy, scheme, package and payer information based on applicable workflows.",
      icon: FileText,
      href: "/product/revenue-cycle",
    },
    {
      title: "Eligibility Verification",
      desc: "Verify patient eligibility before providing covered services.",
      icon: BadgeCheck,
      href: "/product/revenue-cycle",
    },
    {
      title: "Pre-Authorization Management",
      desc: "Manage authorization requests, treatment information and supporting documentation.",
      icon: ClipboardPen,
      href: "/product/revenue-cycle",
    },
    {
      title: "Package & Tariff Management",
      desc: "Configure payer-specific packages, service rates and approved tariffs.",
      icon: Tag,
      href: "/product/billing-invoices",
    },
    {
      title: "Insurance & TPA Management",
      desc: "Connect patient services with insurers and third-party administrators.",
      icon: ShieldCheck,
      href: "/product/revenue-cycle",
    },
    {
      title: "Claims Management",
      desc: "Manage claims from preparation and submission through review and settlement.",
      icon: ClipboardList,
      href: "/product/revenue-cycle",
    },
    {
      title: "eClaims Management",
      desc: "Support electronic claim workflows with compatible payer platforms.",
      icon: Share2,
      href: "/integrations/third-party-api",
    },
    {
      title: "Claims Documentation",
      desc: "Maintain supporting medical and billing documentation throughout the claim process.",
      icon: BookOpen,
      href: "/product/revenue-cycle",
    },
    {
      title: "Approval & Deduction Tracking",
      desc: "Track approved amounts, deductions, rejections and payer decisions.",
      icon: TrendingUp,
      href: "/product/revenue-cycle",
    },
    {
      title: "Settlement Management",
      desc: "Maintain settlement information against patient claims and invoices.",
      icon: CreditCard,
      href: "/product/billing-invoices",
    },
    {
      title: "Claims Receivable Tracking",
      desc: "Monitor outstanding claims and payer receivables.",
      icon: Receipt,
      href: "/product/revenue-cycle",
    },
    {
      title: "Hospital Billing Integration",
      desc: "Connect treatment, services and patient billing with insurance and payer workflows.",
      icon: GitBranch,
      href: "/product/billing-invoices",
    },
    {
      title: "Government Health Program Integration",
      desc: "Support compatible government healthcare program integrations where interfaces are available.",
      icon: Landmark,
      href: "/integrations/third-party-api",
    },
    {
      title: "ABDM / ABHA Integration",
      desc: "Support applicable digital-health and consent-based healthcare workflows.",
      icon: Globe,
      href: "/interoperability/abdm",
    },
    {
      title: "Audit Trail",
      desc: "Maintain traceable information for claim, authorization and payer-related transactions.",
      icon: Activity,
      href: "/product/platform",
    },
    {
      title: "Payer Analytics & MIS",
      desc: "Monitor pending claims, approvals, settlements, receivables and payer performance.",
      icon: BarChart3,
      href: "/product/analytics",
    },
  ],
  reasons: [
    {
      title: "Connected Payer Workflows",
      desc: "Keep eligibility, authorization, claims, billing and settlements in one process.",
    },
    {
      title: "Better Claims Visibility",
      desc: "Know which claims are pending, approved, rejected or settled.",
    },
    {
      title: "Faster Pre-Authorization",
      desc: "Keep patient, treatment and payer information organized for authorization workflows.",
    },
    {
      title: "Reduced Manual Coordination",
      desc: "Limit dependency on spreadsheets, emails and disconnected systems.",
    },
    {
      title: "Better Financial Visibility",
      desc: "Track approved values, deductions, pending receivables and settlements.",
    },
    {
      title: "Support Multiple Payers",
      desc: "Manage multiple insurers, TPAs and government-health programs from a centralized platform.",
    },
  ],
  faqs: [
    {
      q: "What is Healthcare Payer Management Software?",
      a: "Healthcare Payer Management Software helps providers manage workflows with insurers, TPAs and government health programs, including eligibility, pre-authorization, claims and settlements.",
    },
    {
      q: "Who are healthcare payers?",
      a: "Healthcare payers can include insurance companies, TPAs, government healthcare programs and other organizations that fund or reimburse patient care.",
    },
    {
      q: "Can MedicoreERP support pre-authorization workflows?",
      a: "Yes. MedicoreERP can support structured pre-authorization processes linked with patient and treatment information.",
    },
    {
      q: "Can MedicoreERP manage insurance claims?",
      a: "Yes. Claim-related information can be managed from preparation and submission through approval and settlement.",
    },
    {
      q: "Can MedicoreERP work with multiple insurers and TPAs?",
      a: "Yes. MedicoreERP can support healthcare organizations that work with multiple payer organizations.",
    },
    {
      q: "Can MedicoreERP track pending claims?",
      a: "Yes. Claims can be organized according to their status, allowing teams to monitor pending, approved, rejected and settled cases.",
    },
    {
      q: "Can payer workflows connect with hospital billing?",
      a: "Yes. Payer and claims information can be connected with hospital billing and patient-service workflows.",
    },
    {
      q: "Does MedicoreERP support government healthcare integrations?",
      a: "Compatible government-health and digital-health integrations can be implemented based on supported APIs and program requirements.",
    },
    {
      q: "Can MedicoreERP support ABDM and ABHA workflows?",
      a: "MedicoreERP can support applicable ABDM and ABHA interoperability workflows based on implementation requirements.",
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
    relatedProduct: "clinical-emr-opd-ipd",
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
    relatedProduct: "clinical-emr-opd-ipd",
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
    desc: "Register new patients, identify returning patients, capture consent and documents, and manage check-in from one digital profile.",
    href: "/product/patient-access",
    icon: Users,
  },
  {
    title: "Medical Records (EMR)",
    desc: "Maintain consultations, diagnoses, prescriptions, allergies, clinical notes, lab results and patient history in one digital record.",
    href: "/product/electronic-medical-records",
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
    desc: "Manage doctor availability, appointment bookings, time slots, walk-ins, patient queues and reminders from one system.",
    href: "/product/appointments",
    icon: Calendar,
  },
  {
    title: "Medical Workflows",
    desc: "Connect OPD, IPD, EMR, prescriptions, nursing, admissions and discharge through one clinical journey.",
    href: "/product/clinical-emr-opd-ipd",
    icon: GitBranch,
  },
  {
    title: "Medical Billing & Claims",
    desc: "Generate OPD and IPD bills, connect pharmacy and laboratory charges, collect payments and track outstanding balances.",
    href: "/product/billing-invoices",
    icon: CreditCard,
  },
  {
    title: "Wards Management",
    desc: "Manage admissions, bed allocation, ward occupancy, transfers, nursing activity and inpatient movement in real time.",
    href: "/product/clinical-emr-opd-ipd",
    icon: BedDouble,
  },
  {
    title: "Laboratory (LIS)",
    desc: "Manage test orders, sample collection, barcode tracking, results, validation and digital reports in one laboratory system.",
    href: "/product/laboratory",
    icon: FlaskConical,
  },
  {
    title: "Imaging / Radiology",
    desc: "Manage radiology orders, imaging schedules, RIS workflows, PACS connectivity and digital reports.",
    href: "/product/radiology",
    icon: Scan,
  },
  {
    title: "Nurses Module",
    desc: "Record patient vitals, nursing assessments, notes, medication administration and bedside care.",
    href: "/product/clinical-emr-opd-ipd",
    icon: HeartPulse,
  },
  {
    title: "Pharmacy",
    desc: "Manage e-prescriptions, medicine inventory, batches, expiry dates, purchases, dispensing and pharmacy billing.",
    href: "/product/pharmacy",
    icon: Pill,
  },
  {
    title: "Inventory Management",
    desc: "Monitor medical supplies, consumables, purchases, stock transfers, reorder levels and department-wise inventory.",
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
    desc: "Send appointment confirmations, follow-up reminders, recall notifications and other patient communications through SMS and WhatsApp.",
    href: "/integrations/whatsapp",
    icon: MessageSquareText,
  },
  {
    title: "HIS Dashboard",
    desc: "Monitor hospital KPIs, patient volumes, OPD/IPD activity, bed occupancy, billing, revenue and department performance from one view.",
    href: "/product/his-dashboard",
    icon: LayoutDashboard,
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
    definition: "Software that digitally stores and manages patient clinical information such as diagnoses, prescriptions, consultation notes, treatment history, and investigation results.",
    related: ["his", "fhir", "appointments"],
  },
  {
    slug: "appointments",
    term: "Appointments",
    definition: "A digital solution for managing appointment bookings, doctor availability, consultation slots, walk-ins, rescheduling, cancellations, and queues.",
    related: ["emr", "patient-reminders"],
  },
  {
    slug: "billing-invoices",
    term: "Billing & Invoices",
    definition: "Software that manages hospital charges, invoices, payments, outstanding balances, and other patient billing activities across OPD, IPD, pharmacy, and laboratory services.",
    related: ["rcm", "clean-claim"],
  },
  {
    slug: "patient-reminders",
    term: "Patient Reminders",
    definition: "Software that automates notifications for appointments, follow-ups, recalls, and other healthcare activities through supported channels such as SMS and WhatsApp.",
    related: ["appointments", "emr"],
  },
  {
    slug: "patient-access",
    term: "Patient Access / Patient Registration",
    definition: "Software that helps healthcare organizations capture and manage patient demographic, contact, identity, consent, and registration information digitally.",
    related: ["appointments", "emr"],
  },
  {
    slug: "clinical-emr-opd-ipd",
    term: "OPD / IPD Clinical Management",
    definition: "Software that manages outpatient and inpatient workflows including consultation, admission, beds, treatment, nursing, EMR, and discharge.",
    related: ["emr", "patient-access"],
  },
  {
    slug: "pharmacy",
    term: "Hospital Pharmacy Management",
    definition: "Software that manages prescriptions, medicine inventory, batches, expiry information, purchases, dispensing, and pharmacy billing.",
    related: ["clinical-emr-opd-ipd", "billing-invoices"],
  },
  {
    slug: "radiology",
    term: "Radiology Information System (RIS)",
    definition: "Software that helps healthcare organizations manage imaging orders, scheduling, examination workflows, worklists, PACS/DICOM connectivity, and radiology reporting.",
    related: ["dicom", "clinical-emr-opd-ipd"],
  },
  {
    slug: "supply-chain",
    term: "Hospital Inventory / Supply Chain",
    definition: "Software that helps hospitals manage inventory, medical supplies, stock levels, purchasing, suppliers, consumption, and stock movement.",
    related: ["pharmacy", "clinical-emr-opd-ipd"],
  },
  {
    slug: "workforce-hrm",
    term: "Hospital HR Management",
    definition: "Software that helps healthcare organizations manage employee records, attendance, shifts, rosters, leave, documents, and workforce administration.",
    related: ["clinical-emr-opd-ipd"],
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
    definition: "Healthcare RCM covers financial processes such as charge capture, billing, claims, payments, collections, and reconciliation.",
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
    definition: "Laboratory Information System / LIMS software that manages laboratory workflows such as test orders, samples, processing, results, validation, and reporting.",
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
    slug: "his-dashboard",
    term: "Hospital HIS Dashboard",
    definition: "A centralized hospital management view of clinical, operational, administrative, and financial KPIs — including patient volumes, OPD/IPD activity, bed occupancy, billing, revenue, and department performance.",
    related: ["his", "hospital-analytics"],
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
