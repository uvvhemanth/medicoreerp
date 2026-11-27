export type UseCase = {
  slug: string;
  seo: { title: string; description: string; keywords: string[] };
  cardTitle: string;
  cardSummary: string;
  heroTitle: string;
  heroSubtitle: string;
  profile: { label: string; value: string }[];
  challenges: string[];
  workflow: { title: string; desc: string; href: string }[];
  outcomes: { title: string; desc: string }[];
  rollout: { phase: string; desc: string }[];
  faqs: { q: string; a: string }[];
};

export const USE_CASES: UseCase[] = [
  {
    slug: "50-bed-multi-specialty-hospital",
    seo: {
      title: "50-Bed Hospital on MedicoreERP: Example Workflow",
      description:
        "How a 50-bed multi-specialty hospital in India can run OPD, IPD, lab, pharmacy, insurance and billing on one MedicoreERP patient record.",
      keywords: [
        "hospital management software for 50 bed hospital",
        "multi specialty hospital software",
        "HMS implementation example",
        "hospital management system workflow",
      ],
    },
    cardTitle: "A 50-bed multi-specialty hospital",
    cardSummary: "OPD, IPD, lab, pharmacy, insurance and billing on one patient record.",
    heroTitle: "How a 50-bed multi-specialty hospital runs on MedicoreERP",
    heroSubtitle: "An example workflow from registration to discharge.",
    profile: [
      { label: "Setting", value: "Multi-specialty hospital, tier-2 city or metro" },
      { label: "Size", value: "About 50 beds, 10–15 consultants" },
      { label: "Departments", value: "OPD, IPD, ICU, OT, lab, radiology, pharmacy" },
      { label: "Payers", value: "Cash, corporate, insurance and TPA" },
    ],
    challenges: [
      "Registration, billing, lab and pharmacy run in separate software, so staff re-enter the same patient details several times.",
      "IPD charges from wards, OT, lab and pharmacy are collected on paper and added at discharge, which delays the final bill.",
      "Insurance pre-authorisation and claim documents are assembled by hand from different departments.",
      "Management has no same-day view of occupancy, collections or pending bills.",
    ],
    workflow: [
      { title: "Registration with a single UHID", desc: "The front desk registers the patient once. Returning patients are found by phone number or UHID, and ABHA can be linked.", href: "/product/patient-access" },
      { title: "OPD consultation", desc: "The doctor sees history, vitals and past reports in one screen and writes notes, orders and an e-prescription.", href: "/product/clinical-emr-opd-ipd" },
      { title: "Admission and bed allocation", desc: "Admission picks a free bed from the live bed board. Nursing notes, medication charts and transfers are recorded on the same record.", href: "/product/clinical-emr-opd-ipd" },
      { title: "Lab and radiology orders", desc: "Orders flow to the lab and imaging worklists. Results return to the patient record without paper slips.", href: "/product/laboratory" },
      { title: "Pharmacy issues", desc: "Ward indents and OPD prescriptions reach the pharmacy with batch and expiry tracking. Issues post to the patient bill.", href: "/product/pharmacy" },
      { title: "Running bill and insurance", desc: "Every service posts to the IPD bill as it happens. Pre-authorisation and claim documents are pulled from the record.", href: "/product/billing-invoices" },
      { title: "Discharge and dashboard", desc: "The discharge summary and final bill come from the same record. Management sees occupancy and collections on the HIS dashboard.", href: "/product/his-dashboard" },
    ],
    outcomes: [
      { title: "One entry, used everywhere", desc: "Patient details are captured once at registration and reused by every department." },
      { title: "Bills ready at discharge", desc: "Charges post through the stay, so the final bill doesn't wait for paper slips from each department." },
      { title: "Claims from the record", desc: "Insurance and TPA documents are assembled from clinical and billing data already in the system." },
      { title: "Daily visibility", desc: "Occupancy, admissions, collections and pending bills are visible on the dashboard every day." },
    ],
    rollout: [
      { phase: "Weeks 1–2", desc: "Configure departments, doctors, tariffs, packages and users. Migrate patient masters." },
      { phase: "Weeks 3–4", desc: "Go live with registration, OPD, billing and pharmacy. Train front-desk and pharmacy staff." },
      { phase: "Weeks 5–6", desc: "Add IPD, nursing, lab and radiology. Train doctors and nurses on the ward workflow." },
      { phase: "Week 7 onward", desc: "Insurance and TPA workflows, dashboards and fine-tuning based on staff feedback." },
    ],
    faqs: [
      { q: "Is this a real customer story?", a: "No. This page describes a typical workflow for a hospital of this size. Timelines and steps vary by hospital; the team plans them with you during the demo." },
      { q: "Can we go live department by department?", a: "Yes. Most hospitals start with registration, OPD and billing, then add IPD, lab and pharmacy in phases." },
      { q: "Do we need our own servers?", a: "No. MedicoreERP is web-based, with hosting, backups and updates handled for you." },
    ],
  },
  {
    slug: "clinic-going-paperless",
    seo: {
      title: "How a Small Clinic Goes Paperless: Example Workflow",
      description:
        "An example of how a 2–4 doctor clinic in India can move appointments, e-prescriptions, records and billing from paper to MedicoreERP.",
      keywords: [
        "paperless clinic software",
        "clinic management software example",
        "e-prescription software for clinics",
        "clinic appointment and billing software",
      ],
    },
    cardTitle: "A 3-doctor clinic going paperless",
    cardSummary: "Appointments, e-prescriptions, records and billing without registers.",
    heroTitle: "How a 3-doctor clinic goes paperless with MedicoreERP",
    heroSubtitle: "An example workflow for a small clinic or polyclinic.",
    profile: [
      { label: "Setting", value: "Neighbourhood clinic or polyclinic" },
      { label: "Size", value: "2–4 doctors, 1–2 front-desk staff" },
      { label: "Services", value: "Consultations, minor procedures, in-house pharmacy" },
      { label: "Payers", value: "Mostly cash and UPI" },
    ],
    challenges: [
      "Appointments are kept in a register or on WhatsApp, so evening OPD gets crowded and patients wait without knowing their turn.",
      "Prescriptions are handwritten, and past visits are hard to find when a patient returns.",
      "Daily collections are added up by hand at closing time.",
    ],
    workflow: [
      { title: "Online and walk-in appointments", desc: "Patients book slots or walk in and get a token. The queue is visible to the front desk and doctors.", href: "/product/appointments" },
      { title: "Automatic reminders", desc: "Patients get appointment and follow-up reminders, which helps reduce no-shows.", href: "/product/patient-reminders" },
      { title: "Consultation and e-prescription", desc: "The doctor records complaints, diagnosis and medicines using templates and prints or shares a clear prescription.", href: "/product/electronic-medical-records" },
      { title: "Billing at the counter", desc: "Consultation, procedure and pharmacy charges are billed together with GST invoices and UPI or cash receipts.", href: "/product/billing-invoices" },
      { title: "Day-end summary", desc: "Collections, patient counts and follow-ups are available as a report at closing time.", href: "/product/his-dashboard" },
    ],
    outcomes: [
      { title: "A calmer waiting room", desc: "Tokens and reminders spread patients across the session instead of everyone arriving at once." },
      { title: "History on one screen", desc: "Past visits, prescriptions and reports are available when a patient returns." },
      { title: "Readable prescriptions", desc: "Printed or shared prescriptions avoid handwriting errors at the pharmacy." },
      { title: "Collections without manual totals", desc: "The day-end report replaces adding up the register." },
    ],
    rollout: [
      { phase: "Day 1–3", desc: "Set up doctors, timings, fees and prescription templates." },
      { phase: "Week 1", desc: "Go live with appointments, tokens and billing. Short training for the front desk." },
      { phase: "Week 2", desc: "Doctors move to e-prescriptions and digital records. Reminders switched on." },
    ],
    faqs: [
      { q: "Is this a real customer story?", a: "No. It's an example of a typical setup for a small clinic. The demo team adapts it to your doctors, timings and services." },
      { q: "Do doctors need to type everything?", a: "No. Templates and favourites for common complaints, diagnoses and medicines keep typing to a minimum." },
      { q: "Can we use it on a tablet?", a: "Yes. MedicoreERP runs in the browser on desktops, laptops and tablets." },
    ],
  },
  {
    slug: "diagnostic-lab-sample-to-report",
    seo: {
      title: "Diagnostic Lab Workflow: Sample to Report Example",
      description:
        "An example of how a diagnostic lab can manage registration, barcoded samples, analyzer results, approvals and digital reports in MedicoreERP.",
      keywords: [
        "diagnostic lab software workflow",
        "LIS sample tracking",
        "pathology lab report software",
        "lab management system example",
      ],
    },
    cardTitle: "A diagnostic lab from sample to report",
    cardSummary: "Barcoded samples, analyzer results, approvals and digital reports.",
    heroTitle: "How a diagnostic lab manages sample to report on MedicoreERP",
    heroSubtitle: "An example workflow for a pathology or diagnostic centre.",
    profile: [
      { label: "Setting", value: "Standalone diagnostic centre or hospital lab" },
      { label: "Volume", value: "A few hundred samples a day" },
      { label: "Sections", value: "Biochemistry, haematology, microbiology, serology" },
      { label: "Channels", value: "Walk-ins, home collection, referring doctors" },
    ],
    challenges: [
      "Sample labels are handwritten, and mix-ups are caught late, if at all.",
      "Results are typed from analyzer printouts into report templates.",
      "Patients and referring doctors call repeatedly to ask whether reports are ready.",
    ],
    workflow: [
      { title: "Registration and test booking", desc: "Patients are registered with tests or packages, referring doctor and payment in one step.", href: "/product/patient-access" },
      { title: "Barcoded samples", desc: "Each sample gets a barcode label at collection, so it's tracked through every section.", href: "/product/laboratory" },
      { title: "Analyzer results", desc: "Results from connected analyzers flow into the worklist instead of being retyped.", href: "/product/laboratory" },
      { title: "Validation and approval", desc: "Technicians enter and check results. The pathologist reviews flagged values and approves the report.", href: "/product/laboratory" },
      { title: "Digital report delivery", desc: "Approved reports are shared with patients and doctors digitally, for example on WhatsApp.", href: "/integrations/whatsapp" },
    ],
    outcomes: [
      { title: "Fewer labelling errors", desc: "Barcodes replace handwritten labels from collection to report." },
      { title: "Less retyping", desc: "Analyzer integration removes most manual entry of results." },
      { title: "Fewer 'is my report ready?' calls", desc: "Patients get reports as soon as they're approved." },
    ],
    rollout: [
      { phase: "Week 1", desc: "Set up the test master, reference ranges, packages and report formats." },
      { phase: "Week 2", desc: "Go live with registration, barcodes and manual result entry." },
      { phase: "Weeks 3–4", desc: "Connect analyzers and switch on digital report delivery." },
    ],
    faqs: [
      { q: "Is this a real customer story?", a: "No. It's an example lab workflow. Analyzer connections depend on your equipment, which the team checks during the demo." },
      { q: "Can reports carry our letterhead?", a: "Yes. Report formats are configured with your branding, signatures and reference ranges." },
    ],
  },
  {
    slug: "nursing-home-insurance-billing",
    seo: {
      title: "Nursing Home Insurance & TPA Billing: Example Workflow",
      description:
        "An example of how a nursing home in India can manage packages, running IPD bills, insurance pre-authorisation and TPA claims in MedicoreERP.",
      keywords: [
        "nursing home billing software",
        "TPA billing software India",
        "insurance billing for hospitals",
        "IPD package billing software",
      ],
    },
    cardTitle: "A nursing home handling insurance and TPA",
    cardSummary: "Packages, running IPD bills, pre-authorisation and claims.",
    heroTitle: "How a nursing home handles insurance and TPA billing on MedicoreERP",
    heroSubtitle: "An example workflow for a 20–30 bed nursing home.",
    profile: [
      { label: "Setting", value: "Nursing home or small surgical hospital" },
      { label: "Size", value: "20–30 beds, one or two OTs" },
      { label: "Specialities", value: "General surgery, gynaecology, orthopaedics" },
      { label: "Payers", value: "Cash, insurance, TPA and government schemes" },
    ],
    challenges: [
      "Package and non-package charges are mixed up, so final bills need manual correction.",
      "Pre-authorisation requests are prepared by hand, and supporting documents are scattered.",
      "Claim status is tracked in spreadsheets, and payments are hard to reconcile.",
    ],
    workflow: [
      { title: "Admission with payer details", desc: "At admission, staff record the payer, policy and TPA, and select the surgical package.", href: "/product/patient-access" },
      { title: "Pre-authorisation", desc: "Diagnosis, planned procedure and estimates are taken from the record to prepare the pre-auth request.", href: "/product/revenue-cycle" },
      { title: "Running IPD bill", desc: "OT, ward, pharmacy and lab charges post to the bill, split between package and extra items.", href: "/product/billing-invoices" },
      { title: "Discharge and claim file", desc: "Discharge summary, bills and reports are compiled for the claim submission.", href: "/product/revenue-cycle" },
      { title: "Claim tracking", desc: "Each claim's status, deductions and settlement are tracked against the bill.", href: "/product/revenue-cycle" },
    ],
    outcomes: [
      { title: "Clear package billing", desc: "Package inclusions and extras are separated as charges are posted." },
      { title: "Faster claim files", desc: "Documents come from the record instead of being collected from each department." },
      { title: "Visible receivables", desc: "Pending claims and deductions are tracked in one place." },
    ],
    rollout: [
      { phase: "Weeks 1–2", desc: "Configure tariffs, packages, payers and TPAs. Train billing staff." },
      { phase: "Weeks 3–4", desc: "Go live with admissions, IPD billing and pharmacy." },
      { phase: "Week 5 onward", desc: "Pre-authorisation, claim tracking and reconciliation reports." },
    ],
    faqs: [
      { q: "Is this a real customer story?", a: "No. It's an example of a typical nursing-home billing workflow. Payer and scheme rules are configured for your hospital during implementation." },
      { q: "Does it support government schemes?", a: "Scheme packages and documentation can be configured. Discuss your schemes with the team during the demo." },
    ],
  },
];

export function useCaseBySlug(slug: string) {
  return USE_CASES.find((u) => u.slug === slug);
}
