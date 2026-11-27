export type LocalLanding = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonical: string;
  };
  breadcrumb: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string[];
  areas: { title: string; subtitle: string; items: string[] };
  reasons: { title: string; desc: string }[];
  modules: { title: string; desc: string; href: string }[];
  faqs: { q: string; a: string }[];
  cta: { title: string; subtitle: string };
};

const CITY_MODULES: LocalLanding["modules"] = [
  { title: "Patient registration & UHID", desc: "Front-desk registration, returning-patient lookup and digital profiles.", href: "/product/patient-access" },
  { title: "Appointments & queues", desc: "Doctor schedules, walk-ins, token queues and reminders.", href: "/product/appointments" },
  { title: "OPD & IPD", desc: "Consultations, admissions, beds, nursing, transfers and discharge.", href: "/product/clinical-emr-opd-ipd" },
  { title: "Electronic medical records", desc: "Longitudinal clinical history across every visit.", href: "/product/electronic-medical-records" },
  { title: "Laboratory & radiology", desc: "Lab orders, analyzer results, imaging worklists and digital reports.", href: "/product/laboratory" },
  { title: "Pharmacy", desc: "E-prescriptions, batches, expiry tracking and dispensing.", href: "/product/pharmacy" },
  { title: "Billing & insurance", desc: "OPD, IPD and package billing with insurance and TPA claims.", href: "/product/billing-invoices" },
  { title: "HIS dashboard", desc: "Occupancy, revenue, collections and department KPIs.", href: "/product/his-dashboard" },
];

function cityPage(input: {
  city: string;
  state: string;
  slug: string;
  intro: string[];
  areaTitle: string;
  areaSubtitle: string;
  areas: string[];
  localReasons: LocalLanding["reasons"];
  localFaqs: LocalLanding["faqs"];
  extraKeywords: string[];
}): LocalLanding {
  const { city, state } = input;
  return {
    seo: {
      title: `Hospital Management Software in ${city} | MedicoreERP`,
      description: `Hospital management software for hospitals and nursing homes in ${city}, ${state}: OPD, IPD, EMR, lab, pharmacy, insurance and billing on one platform.`,
      keywords: [
        `hospital management software ${city}`,
        `hospital management system ${city}`,
        `HMS software ${city}`,
        `hospital software ${city}`,
        `clinic management software ${city}`,
        ...input.extraKeywords,
      ],
      canonical: `/hospital-management-software-${input.slug}`,
    },
    breadcrumb: `Hospital Management Software in ${city}`,
    eyebrow: `For hospitals in ${city}`,
    heroTitle: `Hospital Management Software in ${city}`,
    heroSubtitle: `One connected platform for hospitals, nursing homes and clinics in ${city}.`,
    intro: input.intro,
    areas: { title: input.areaTitle, subtitle: input.areaSubtitle, items: input.areas },
    reasons: [
      ...input.localReasons,
      {
        title: "One record from OPD to discharge",
        desc: "Doctors, nurses, labs, pharmacy and billing work from the same patient record instead of separate systems.",
      },
      {
        title: "Indian billing built in",
        desc: "Cash, package, insurance and TPA billing alongside OPD, IPD, pharmacy and lab charges, with GST invoices.",
      },
      {
        title: "ABDM and ABHA ready",
        desc: "Link patient ABHA IDs and support consent-based health-record exchange as your hospital adopts ABDM.",
      },
      {
        title: "Web-based, no server room",
        desc: "Runs in the browser on desktops and tablets, with hosting, backups and updates handled for you.",
      },
    ],
    modules: CITY_MODULES,
    faqs: [
      ...input.localFaqs,
      {
        q: `How much does hospital management software cost in ${city}?`,
        a: "Pricing depends on your beds, users and modules. Book a demo and the team will send a written quote with implementation, training and integrations listed separately.",
      },
      {
        q: "Can we move our existing patient data to MedicoreERP?",
        a: "Yes. The team helps migrate patient masters and history from your current system or spreadsheets during implementation.",
      },
    ],
    cta: {
      title: `Looking for hospital software in ${city}?`,
      subtitle: `Book an online demo and see how MedicoreERP connects OPD, IPD, EMR, lab, pharmacy and billing for hospitals in ${city}.`,
    },
  };
}

export const CITY_PAGES: LocalLanding[] = [
  cityPage({
    city: "Vijayawada",
    state: "Andhra Pradesh",
    slug: "vijayawada",
    intro: [
      "Vijayawada is one of the main healthcare centres of coastal Andhra Pradesh, with hospitals and nursing homes serving patients from across the Krishna and Godavari regions. Many of them still run OPD on paper registers and keep billing in separate software.",
      "MedicoreERP brings registration, OPD, IPD, EMR, laboratory, pharmacy, insurance and billing onto one patient record. Our team is based in Hyderabad, within easy travelling distance of Vijayawada, and supports hospitals here online with visits for implementation on request.",
    ],
    areaTitle: "Hospitals across Vijayawada",
    areaSubtitle: "Supporting hospitals and nursing homes across the city and nearby towns.",
    areas: ["Benz Circle", "Governorpet", "Labbipet", "Moghalrajpuram", "Patamata", "Gunadala", "Suryaraopet", "Auto Nagar", "Poranki", "Gollapudi", "Guntur", "Mangalagiri"],
    localReasons: [
      {
        title: "Close to our Hyderabad team",
        desc: "Implementation visits to Vijayawada are straightforward to arrange, and day-to-day support happens on phone, WhatsApp and video.",
      },
      {
        title: "Built for busy OPDs",
        desc: "Token queues, quick registration and prescription templates keep high-volume outpatient days moving.",
      },
    ],
    localFaqs: [
      {
        q: "Does MedicoreERP have an office in Vijayawada?",
        a: "No. Our office is in Madhapur, Hyderabad. We implement and support Vijayawada hospitals online, and the team can visit for implementation and training on request.",
      },
      {
        q: "Is MedicoreERP suitable for nursing homes in Vijayawada?",
        a: "Yes. Nursing homes can start with registration, OPD, IPD, billing and pharmacy and add laboratory or radiology later.",
      },
    ],
    extraKeywords: ["hospital software Andhra Pradesh", "nursing home software Vijayawada"],
  }),
  cityPage({
    city: "Visakhapatnam",
    state: "Andhra Pradesh",
    slug: "visakhapatnam",
    intro: [
      "Visakhapatnam has a growing mix of corporate hospitals, specialty centres and nursing homes serving north coastal Andhra Pradesh. As hospitals add beds and departments, keeping OPD, IPD, diagnostics and billing in step becomes harder without a single system.",
      "MedicoreERP connects every department on one patient record. Our team works from Hyderabad and supports Visakhapatnam hospitals online, with on-site visits for implementation and training on request.",
    ],
    areaTitle: "Hospitals across Visakhapatnam",
    areaSubtitle: "Supporting hospitals and nursing homes across Vizag and the surrounding region.",
    areas: ["Dwaraka Nagar", "MVP Colony", "Seethammadhara", "Maddilapalem", "Asilmetta", "Siripuram", "Gajuwaka", "Madhurawada", "Pendurthi", "Rushikonda", "Anakapalle", "Vizianagaram"],
    localReasons: [
      {
        title: "Ready for growing hospitals",
        desc: "Add beds, departments or a second facility without changing software or migrating data again.",
      },
      {
        title: "Diagnostics connected",
        desc: "Lab and imaging results flow straight into the patient record and the bill, instead of arriving as printouts.",
      },
    ],
    localFaqs: [
      {
        q: "Does MedicoreERP have an office in Visakhapatnam?",
        a: "No. Our office is in Madhapur, Hyderabad. We implement and support Visakhapatnam hospitals online, and the team can visit for implementation and training on request.",
      },
      {
        q: "Can MedicoreERP manage a multi-specialty hospital in Vizag?",
        a: "Yes. OPD, IPD, OT, ICU, laboratory, radiology, pharmacy, insurance and analytics all run on the same platform.",
      },
    ],
    extraKeywords: ["hospital management software Vizag", "HMS software Vizag"],
  }),
  cityPage({
    city: "Warangal",
    state: "Telangana",
    slug: "warangal",
    intro: [
      "Warangal, Telangana's second-largest city, is a major healthcare centre for the northern districts of the state. Many of its hospitals and nursing homes are moving from paper and standalone billing software to a connected hospital system.",
      "MedicoreERP brings OPD, IPD, EMR, laboratory, pharmacy, insurance and billing onto one patient record. Warangal is within easy reach of our Hyderabad team, so implementation visits are simple to arrange.",
    ],
    areaTitle: "Hospitals across Warangal",
    areaSubtitle: "Supporting hospitals and nursing homes in the tri-city area and nearby districts.",
    areas: ["Hanamkonda", "Kazipet", "Hunter Road", "Subedari", "Nakkalagutta", "Mulugu Road", "Naimnagar", "Fathima Nagar", "Jangaon", "Mahabubabad", "Narsampet", "Parkal"],
    localReasons: [
      {
        title: "Same-state support",
        desc: "Our Hyderabad team supports Warangal hospitals on phone, WhatsApp and video, and can visit for implementation and training.",
      },
      {
        title: "Simple for small teams",
        desc: "Screens are quick to learn for staff who handle registration, billing and the bed register together.",
      },
    ],
    localFaqs: [
      {
        q: "Does MedicoreERP have an office in Warangal?",
        a: "No. Our office is in Madhapur, Hyderabad. We support Warangal hospitals online, and the team can visit for implementation and training on request.",
      },
      {
        q: "Is MedicoreERP suitable for nursing homes in Hanamkonda and Kazipet?",
        a: "Yes. Nursing homes can start with registration, OPD, IPD, billing and pharmacy and add other modules as they grow.",
      },
    ],
    extraKeywords: ["hospital software Hanamkonda", "nursing home software Warangal"],
  }),
  cityPage({
    city: "Bangalore",
    state: "Karnataka",
    slug: "bangalore",
    intro: [
      "Bangalore has one of India's largest private healthcare markets, from multi-specialty hospitals and hospital chains to day-care centres and specialty clinics. Hospitals here often expect modern, integrated software that works across branches and connects to labs, imaging and insurance.",
      "MedicoreERP runs every department on one patient record, with FHIR R4, HL7 and DICOM integration for connected diagnostics. Our team is based in Hyderabad and supports Bangalore hospitals online, with on-site visits for implementation on request.",
    ],
    areaTitle: "Hospitals across Bangalore",
    areaSubtitle: "Supporting hospitals, chains and clinics across Bengaluru.",
    areas: ["Whitefield", "Koramangala", "Indiranagar", "Jayanagar", "JP Nagar", "HSR Layout", "Electronic City", "Bannerghatta Road", "Hebbal", "Yelahanka", "Rajajinagar", "Malleshwaram", "Marathahalli", "Sarjapur Road"],
    localReasons: [
      {
        title: "Built for multi-branch groups",
        desc: "Run several hospitals or clinics on one platform with central reporting and standard processes.",
      },
      {
        title: "Standards-based integration",
        desc: "FHIR R4, HL7 v2 and DICOM connect labs, imaging and other systems without one-off interfaces.",
      },
    ],
    localFaqs: [
      {
        q: "Does MedicoreERP have an office in Bangalore?",
        a: "No. Our office is in Madhapur, Hyderabad. We implement and support Bangalore hospitals online, and the team can visit for implementation and training on request.",
      },
      {
        q: "Can MedicoreERP support a hospital chain in Bangalore?",
        a: "Yes. Multiple facilities can run on one platform with central reporting, shared masters and branch-level access control.",
      },
    ],
    extraKeywords: ["hospital management software Bengaluru", "HMS software Bengaluru"],
  }),
  cityPage({
    city: "Chennai",
    state: "Tamil Nadu",
    slug: "chennai",
    intro: [
      "Chennai is one of India's leading healthcare cities, drawing patients from across Tamil Nadu, other states and abroad. Hospitals here handle high OPD volumes, complex inpatient care and a wide mix of insurance and TPA billing.",
      "MedicoreERP connects OPD, IPD, EMR, diagnostics, pharmacy, insurance and billing on one patient record. Our team is based in Hyderabad and supports Chennai hospitals online, with on-site visits for implementation on request.",
    ],
    areaTitle: "Hospitals across Chennai",
    areaSubtitle: "Supporting hospitals and nursing homes across Chennai and its suburbs.",
    areas: ["Anna Nagar", "T Nagar", "Adyar", "Mylapore", "Nungambakkam", "Vadapalani", "Guindy", "Velachery", "OMR", "Porur", "Tambaram", "Chromepet", "Ambattur", "Perambur"],
    localReasons: [
      {
        title: "Handles insurance-heavy billing",
        desc: "Insurance and TPA pre-authorisation, enhancements, claim tracking and settlement sit inside the IPD bill.",
      },
      {
        title: "Ready for high OPD volumes",
        desc: "Token queues, quick registration and doctor templates keep busy outpatient departments moving.",
      },
    ],
    localFaqs: [
      {
        q: "Does MedicoreERP have an office in Chennai?",
        a: "No. Our office is in Madhapur, Hyderabad. We implement and support Chennai hospitals online, and the team can visit for implementation and training on request.",
      },
      {
        q: "Does MedicoreERP handle insurance and TPA billing?",
        a: "Yes. Insurance and TPA billing, pre-authorisation, claim tracking and settlement are part of the billing and revenue cycle modules.",
      },
    ],
    extraKeywords: ["hospital software Tamil Nadu", "nursing home software Chennai"],
  }),
  cityPage({
    city: "Pune",
    state: "Maharashtra",
    slug: "pune",
    intro: [
      "Pune's healthcare sector has grown with the city, from established hospitals in the centre to new multi-specialty hospitals and clinics in the IT corridors and Pimpri-Chinchwad. Growing hospitals here need software that scales without disrupting care.",
      "MedicoreERP runs registration, OPD, IPD, EMR, laboratory, pharmacy, insurance and billing on one patient record. Our team is based in Hyderabad and supports Pune hospitals online, with on-site visits for implementation on request.",
    ],
    areaTitle: "Hospitals across Pune",
    areaSubtitle: "Supporting hospitals and nursing homes across Pune and Pimpri-Chinchwad.",
    areas: ["Kothrud", "Shivajinagar", "Deccan", "Camp", "Aundh", "Baner", "Wakad", "Hinjewadi", "Kharadi", "Viman Nagar", "Hadapsar", "Kondhwa", "Pimpri", "Chinchwad"],
    localReasons: [
      {
        title: "Scales as you grow",
        desc: "Add beds, departments or a new branch without changing software or migrating data again.",
      },
      {
        title: "Phased go-live",
        desc: "Start with front office and OPD, then add IPD, diagnostics and pharmacy, so care is never disrupted.",
      },
    ],
    localFaqs: [
      {
        q: "Does MedicoreERP have an office in Pune?",
        a: "No. Our office is in Madhapur, Hyderabad. We implement and support Pune hospitals online, and the team can visit for implementation and training on request.",
      },
      {
        q: "Can MedicoreERP be used by new hospitals in Pune?",
        a: "Yes. New hospitals can go live with core modules from the start and add others as departments open.",
      },
    ],
    extraKeywords: ["hospital software Pimpri Chinchwad", "nursing home software Pune"],
  }),
];

export function cityPageBySlug(slug: string) {
  const page = CITY_PAGES.find((p) => p.seo.canonical === `/hospital-management-software-${slug}`);
  if (!page) throw new Error(`Unknown city landing page: ${slug}`);
  return page;
}

export const HYDERABAD_HMS: LocalLanding = {
  seo: {
    title: "Hospital Management Software in Hyderabad | MedicoreERP",
    description:
      "Hyderabad-based hospital management software for OPD, IPD, EMR, lab, pharmacy, insurance and billing. Book a demo with the MedicoreERP team in Madhapur.",
    keywords: [
      "hospital management software Hyderabad",
      "hospital management system Hyderabad",
      "HMS software Hyderabad",
      "hospital software company in Hyderabad",
      "hospital ERP Hyderabad",
      "HIS software Hyderabad",
      "hospital billing software Hyderabad",
      "best hospital software in Hyderabad",
    ],
    canonical: "/hospital-management-software-hyderabad",
  },
  breadcrumb: "Hospital Management Software in Hyderabad",
  eyebrow: "Built in Hyderabad",
  heroTitle: "Hospital Management Software in Hyderabad",
  heroSubtitle: "A Hyderabad team, one connected platform for every hospital department.",
  intro: [
    "MedicoreERP is a hospital management system built by a team based in Madhapur, Hyderabad. Registration, OPD, IPD, EMR, nursing, laboratory, radiology, pharmacy, insurance and billing run on one patient record.",
    "Because we are local, Hyderabad hospitals can see the software at our office, ask for a walkthrough at their own hospital, and talk to the people who configure it, in the same time zone.",
  ],
  areas: {
    title: "Hospitals and nursing homes across Hyderabad",
    subtitle: "We work with hospitals across the city and the wider Hyderabad metropolitan region.",
    items: [
      "Madhapur",
      "HITEC City",
      "Gachibowli",
      "Kondapur",
      "Kukatpally",
      "Miyapur",
      "Ameerpet",
      "Banjara Hills",
      "Jubilee Hills",
      "Begumpet",
      "Secunderabad",
      "Kompally",
      "Uppal",
      "Dilsukhnagar",
      "LB Nagar",
      "Shamshabad",
    ],
  },
  reasons: [
    {
      title: "Meet the team in person",
      desc: "See MedicoreERP at our Madhapur office or ask us to walk your management team through it at your hospital.",
    },
    {
      title: "Configured for how Indian hospitals bill",
      desc: "Cash, package, insurance and TPA billing sit alongside OPD, IPD, pharmacy and lab charges on the same bill.",
    },
    {
      title: "ABDM and ABHA ready",
      desc: "Link patient ABHA IDs and support consent-based health-record exchange as your hospital adopts ABDM.",
    },
    {
      title: "One record from OPD to discharge",
      desc: "Doctors, nurses, labs, pharmacy and billing work from the same patient record instead of separate systems.",
    },
    {
      title: "Web-based, no server room needed",
      desc: "Runs in the browser on desktops and tablets, so new counters and wards come online without installing software.",
    },
    {
      title: "Support in your time zone",
      desc: "Talk to the Hyderabad team on phone or WhatsApp during your working hours, not a ticket queue abroad.",
    },
  ],
  modules: [
    { title: "Patient registration & UHID", desc: "Front-desk registration, returning-patient lookup and digital profiles.", href: "/product/patient-access" },
    { title: "Appointments & queues", desc: "Doctor schedules, walk-ins, token queues and reminders.", href: "/product/appointments" },
    { title: "OPD & IPD", desc: "Consultations, admissions, beds, nursing, transfers and discharge.", href: "/product/clinical-emr-opd-ipd" },
    { title: "Electronic medical records", desc: "Longitudinal clinical history across every visit.", href: "/product/electronic-medical-records" },
    { title: "Laboratory (LIS)", desc: "Orders, samples, analyzer results and digital reports.", href: "/product/laboratory" },
    { title: "Pharmacy", desc: "E-prescriptions, batches, expiry tracking and dispensing.", href: "/product/pharmacy" },
    { title: "Billing & insurance", desc: "OPD, IPD and package billing with insurance and TPA claims.", href: "/product/billing-invoices" },
    { title: "HIS dashboard", desc: "Occupancy, revenue, collections and department KPIs.", href: "/product/his-dashboard" },
  ],
  faqs: [
    {
      q: "Is MedicoreERP a Hyderabad company?",
      a: "Yes. The MedicoreERP team works from Madhapur, Hyderabad, Telangana. You can visit the office or book a demo by phone, WhatsApp or the demo form.",
    },
    {
      q: "Can you show the software at our hospital in Hyderabad?",
      a: "Yes. Ask for an on-site walkthrough when you book the demo and the team will arrange a visit for hospitals in Hyderabad.",
    },
    {
      q: "Which hospitals in Hyderabad is MedicoreERP suitable for?",
      a: "Nursing homes, specialty hospitals, multi-specialty hospitals and hospital groups. The same platform scales from a single facility to multiple branches.",
    },
    {
      q: "How much does hospital management software cost in Hyderabad?",
      a: "Pricing depends on the number of beds, users and modules you need. Book a demo and the team will share a quote for your hospital.",
    },
    {
      q: "Does MedicoreERP handle insurance and TPA billing?",
      a: "Yes. Insurance and TPA billing, pre-authorisation, claim tracking and settlement are part of the billing and revenue cycle modules.",
    },
    {
      q: "Can we move our existing patient data to MedicoreERP?",
      a: "Yes. The team helps migrate patient masters and history from your current system or spreadsheets during implementation.",
    },
  ],
  cta: {
    title: "Looking for hospital software in Hyderabad?",
    subtitle: "Book a demo with the MedicoreERP team in Madhapur and see OPD, IPD, EMR, lab, pharmacy and billing working on one platform.",
  },
};

export const TELANGANA_CLINICS: LocalLanding = {
  seo: {
    title: "Clinic Management Software in Hyderabad & Telangana | MedicoreERP",
    description:
      "Clinic management software for doctors in Hyderabad and Telangana: appointments, OPD, e-prescriptions, billing and WhatsApp reminders. Book a free demo.",
    keywords: [
      "clinic management software Hyderabad",
      "clinic management software Telangana",
      "clinic software Hyderabad",
      "doctor software Hyderabad",
      "OPD software for clinics",
      "polyclinic software Hyderabad",
      "clinic software Warangal",
      "EMR software for clinics in India",
    ],
    canonical: "/clinic-management-software-telangana",
  },
  breadcrumb: "Clinic Management Software in Telangana",
  eyebrow: "For clinics in Telangana",
  heroTitle: "Clinic Management Software in Hyderabad & Telangana",
  heroSubtitle: "Appointments, OPD, prescriptions and billing for doctors and polyclinics.",
  intro: [
    "MedicoreERP gives clinics in Hyderabad and across Telangana one simple system for appointments, patient records, e-prescriptions, billing and follow-up reminders.",
    "Start with a single doctor's chamber and add more doctors, a pharmacy counter or a lab as the clinic grows, without changing software.",
  ],
  areas: {
    title: "Clinics across Telangana",
    subtitle: "Doctors and polyclinics in Hyderabad and towns across the state.",
    items: [
      "Hyderabad",
      "Secunderabad",
      "Warangal",
      "Hanamkonda",
      "Karimnagar",
      "Nizamabad",
      "Khammam",
      "Mahbubnagar",
      "Nalgonda",
      "Siddipet",
      "Suryapet",
      "Adilabad",
    ],
  },
  reasons: [
    {
      title: "Built for every speciality",
      desc: "General physicians, dental, paediatrics, gynaecology, dermatology, ENT, eye and physiotherapy clinics.",
    },
    {
      title: "Fewer no-shows",
      desc: "Appointment and follow-up reminders on WhatsApp and SMS bring patients back on time.",
    },
    {
      title: "Faster OPD",
      desc: "Templates, favourite medicines and printed or digital prescriptions keep each consultation short.",
    },
    {
      title: "Billing that matches the visit",
      desc: "Consultation, procedure and pharmacy charges on one bill, with daily collection reports.",
    },
    {
      title: "Works on any computer",
      desc: "Web-based, so the front desk, doctor and pharmacy can work from different devices.",
    },
    {
      title: "Local support",
      desc: "The MedicoreERP team is based in Hyderabad and supports clinics on phone and WhatsApp.",
    },
  ],
  modules: [
    { title: "Appointments", desc: "Online and walk-in bookings, doctor slots and token queues.", href: "/product/appointments" },
    { title: "Patient records (EMR)", desc: "Visit history, vitals, diagnoses and documents in one place.", href: "/product/electronic-medical-records" },
    { title: "OPD & e-prescriptions", desc: "Consultation notes, investigations and prescriptions.", href: "/product/clinical-emr-opd-ipd" },
    { title: "Billing & invoices", desc: "Consultation, procedure and package billing.", href: "/product/billing-invoices" },
    { title: "Patient reminders", desc: "WhatsApp and SMS reminders for visits and follow-ups.", href: "/product/patient-reminders" },
    { title: "Pharmacy", desc: "Dispense from prescriptions with stock and expiry tracking.", href: "/product/pharmacy" },
  ],
  faqs: [
    {
      q: "Is MedicoreERP suitable for a single-doctor clinic?",
      a: "Yes. A single doctor can start with appointments, OPD records, prescriptions and billing, then add more doctors or a pharmacy later.",
    },
    {
      q: "Do you support clinics outside Hyderabad?",
      a: "Yes. MedicoreERP is web-based, so clinics anywhere in Telangana can use it, with setup and support handled remotely by the Hyderabad team.",
    },
    {
      q: "Can patients get appointment reminders on WhatsApp?",
      a: "Yes. Appointment and follow-up reminders can be sent on WhatsApp and SMS.",
    },
    {
      q: "Can I print prescriptions on my clinic letterhead?",
      a: "Yes. Prescriptions and bills can be printed with your clinic's name, logo and doctor details, or shared digitally.",
    },
    {
      q: "How much does clinic management software cost?",
      a: "Pricing depends on the number of doctors and modules. Book a demo and the team will share a quote for your clinic.",
    },
  ],
  cta: {
    title: "Run your clinic on one simple system",
    subtitle: "Book a free demo and see appointments, OPD, prescriptions, billing and reminders working together for your clinic.",
  },
};

export const ABDM_HMS: LocalLanding = {
  seo: {
    title: "ABDM-Ready Hospital Management Software (ABHA) | MedicoreERP",
    description:
      "ABDM-ready hospital management software for Indian hospitals: ABHA linking, consent-based record sharing, FHIR R4 records and integrated OPD, IPD and billing.",
    keywords: [
      "ABDM hospital management software",
      "ABDM compliant HMS",
      "ABHA integration software",
      "ABDM ready software for hospitals",
      "Ayushman Bharat Digital Mission software",
      "ABDM HMS India",
      "FHIR hospital software India",
    ],
    canonical: "/abdm-hospital-management-software",
  },
  breadcrumb: "ABDM-Ready Hospital Management Software",
  eyebrow: "Ayushman Bharat Digital Mission",
  heroTitle: "ABDM-Ready Hospital Management Software for Indian Hospitals",
  heroSubtitle: "ABHA linking, consent-based record sharing and a full HMS on one platform.",
  intro: [
    "The Ayushman Bharat Digital Mission (ABDM) connects patients, hospitals and health records through ABHA IDs and consent-based data exchange. Hospitals need their software to take part in that network.",
    "MedicoreERP builds ABDM and ABHA workflows into the same hospital management system that runs registration, OPD, IPD, lab, pharmacy and billing, so ABDM is part of daily work, not a separate tool.",
  ],
  areas: {
    title: "ABDM building blocks MedicoreERP works with",
    subtitle: "Capabilities are configured for each hospital during implementation.",
    items: [
      "ABHA linking",
      "ABHA address verification",
      "Health Facility Registry (HFR)",
      "Healthcare Professionals Registry (HPR)",
      "Consent-based record sharing",
      "Health information exchange",
      "FHIR R4 health records",
    ],
  },
  reasons: [
    {
      title: "ABHA at the front desk",
      desc: "Link a patient's ABHA during registration so their records stay connected across visits.",
    },
    {
      title: "Consent first",
      desc: "Health records are shared only with patient consent, using ABDM's consent-based exchange model.",
    },
    {
      title: "Standards-based records",
      desc: "Clinical data is structured in FHIR R4, the standard ABDM uses for health records.",
    },
    {
      title: "One system, not an add-on",
      desc: "ABDM workflows sit inside the same HMS your doctors, labs and billing teams already use.",
    },
    {
      title: "Audit trail for every share",
      desc: "Each access and record share is logged, so you can show who saw which record and when.",
    },
    {
      title: "Implementation support",
      desc: "The Hyderabad team helps with registry setup, testing and go-live for your facility.",
    },
  ],
  modules: [
    { title: "ABDM integration", desc: "ABHA, registries and consent workflows.", href: "/interoperability/abdm" },
    { title: "FHIR R4", desc: "Standards-based health records and APIs.", href: "/interoperability/fhir" },
    { title: "Patient registration", desc: "Registration with ABHA lookup and linking.", href: "/product/patient-access" },
    { title: "Electronic medical records", desc: "Longitudinal records ready to share with consent.", href: "/product/electronic-medical-records" },
    { title: "Laboratory (LIS)", desc: "Digital lab reports linked to the patient record.", href: "/product/laboratory" },
    { title: "Security & access control", desc: "Role-based access and audit trails for health data.", href: "/security/access-control" },
  ],
  faqs: [
    {
      q: "What is ABDM?",
      a: "The Ayushman Bharat Digital Mission is India's national digital health programme. It gives patients an ABHA ID and lets hospitals exchange health records with patient consent.",
    },
    {
      q: "What is ABHA?",
      a: "ABHA (Ayushman Bharat Health Account) is a patient's digital health ID. Hospitals use it to link records from different visits and facilities to the same patient.",
    },
    {
      q: "Does MedicoreERP support ABDM?",
      a: "Yes. MedicoreERP provides ABDM and ABHA integration capabilities, including ABHA linking and consent-based information exchange, configured for each hospital during implementation.",
    },
    {
      q: "Do small hospitals and clinics need ABDM?",
      a: "ABDM participation is growing across India and helps patients carry their records between providers. Facilities of any size can register and link records through ABDM-ready software.",
    },
    {
      q: "Does ABDM change how our staff work?",
      a: "Very little. ABHA linking happens during registration and records are shared from the same EMR your doctors already use.",
    },
  ],
  cta: {
    title: "Get your hospital ABDM-ready",
    subtitle: "Book a demo to see ABHA linking, consent-based sharing and the full MedicoreERP hospital management system.",
  },
};
