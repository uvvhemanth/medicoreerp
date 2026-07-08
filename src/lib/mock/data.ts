import { seededRandom } from "@/lib/utils";
import type {
  Patient, Appointment, Bed, RxItem, Claim, InventoryItem, Employee,
  Lead, AppNotification, Task, VitalPoint, TimelineEvent, KPI,
} from "./types";

const rand = seededRandom("aether-health-os-2026");
const pick = <T,>(arr: T[]) => arr[Math.floor(rand() * arr.length)];
const int = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;

const firstNames = ["Meera", "Arjun", "Priya", "Rahul", "Ananya", "Vikram", "Sneha", "Karan", "Divya", "Rohan", "Fatima", "Aditya", "Kavya", "Imran", "Nisha", "Sanjay", "Zara", "Deepak", "Aisha", "Manoj"];
const lastNames = ["Sharma", "Patel", "Reddy", "Nair", "Iyer", "Khan", "Gupta", "Menon", "Rao", "Singh", "Das", "Bose", "Verma", "Joshi", "Pillai"];
const departments = ["General Medicine", "Cardiology", "Orthopedics", "Pediatrics", "OB-GYN", "Neurology", "Oncology", "ENT", "Dermatology", "Emergency"];
const doctors = ["Dr. S. Kulkarni", "Dr. A. Menon", "Dr. R. Bose", "Dr. P. Nair", "Dr. K. Iyer", "Dr. M. Khan", "Dr. V. Rao"];
const allergyList = ["Penicillin", "Sulfa", "Latex", "Aspirin", "Iodine", "Peanuts"];
const chronicList = ["Type 2 Diabetes", "Hypertension", "Asthma", "CKD Stage 2", "Hypothyroid"];
const bloodGroups = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-"];

const name = () => `${pick(firstNames)} ${pick(lastNames)}`;
const photo = (i: number) => `https://i.pravatar.cc/120?img=${(i % 70) + 1}`;

export const patients: Patient[] = Array.from({ length: 240 }, (_, i) => {
  const hasAllergy = rand() > 0.5;
  return {
    id: `P${1000 + i}`,
    uhid: `UH${240100 + i}`,
    name: name(),
    age: int(1, 92),
    sex: pick(["M", "F", "F", "M", "O"]) as Patient["sex"],
    phone: `+91 ${int(70, 99)}${int(10000000, 99999999)}`,
    abha: rand() > 0.3 ? `${int(10, 99)}-${int(1000, 9999)}-${int(1000, 9999)}-${int(1000, 9999)}` : undefined,
    allergies: hasAllergy ? [pick(allergyList)] : [],
    chronic: rand() > 0.6 ? [pick(chronicList)] : [],
    bloodGroup: pick(bloodGroups),
    photo: rand() > 0.4 ? photo(i) : undefined,
    matchConfidence: undefined,
    duplicate: rand() > 0.93,
    lastVisit: `2026-0${int(1, 7)}-${int(10, 28)}`,
    registeredAt: `2024-0${int(1, 9)}-${int(1, 28)}`,
    insurance: rand() > 0.5 ? pick(["Star Health", "HDFC Ergo", "CGHS", "Aditya Birla", "Self-pay"]) : "Self-pay",
    status: rand() > 0.1 ? "active" : "inactive",
  };
});

export const appointments: Appointment[] = Array.from({ length: 60 }, (_, i) => {
  const h = 8 + Math.floor(i / 4);
  return {
    id: `A${5000 + i}`,
    patientName: name(),
    uhid: `UH${240100 + int(0, 239)}`,
    doctor: pick(doctors),
    department: pick(departments),
    time: `${String(h).padStart(2, "0")}:${pick(["00", "15", "30", "45"])}`,
    channel: pick(["walk-in", "online", "phone", "referral"]) as Appointment["channel"],
    status: pick(["scheduled", "scheduled", "checked-in", "in-consult", "done", "no-show"]) as Appointment["status"],
    noShowRisk: Math.round(rand() * 100),
    token: `T${int(1, 99)}`,
  };
});

const wards = ["ICU", "General-A", "General-B", "Pediatric", "Maternity", "Surgical"];
export const beds: Bed[] = wards.flatMap((ward) =>
  Array.from({ length: 12 }, (_, n) => {
    const status = pick(["occupied", "occupied", "occupied", "vacant", "cleaning", "reserved", "blocked"]) as Bed["status"];
    const occ = status === "occupied";
    return {
      id: `${ward}-${n + 1}`,
      ward,
      number: `${ward.slice(0, 3).toUpperCase()}-${n + 1}`,
      status,
      patient: occ ? name() : undefined,
      uhid: occ ? `UH${240100 + int(0, 239)}` : undefined,
      isolation: occ && rand() > 0.85,
      attending: occ ? pick(doctors) : undefined,
      los: occ ? int(1, 14) : undefined,
      predictedDischarge: occ && rand() > 0.6 ? `in ${int(1, 4)} days` : undefined,
    };
  }),
);

const drugs = ["Amoxicillin 500mg", "Metformin 850mg", "Atorvastatin 20mg", "Amlodipine 5mg", "Pantoprazole 40mg", "Insulin Glargine", "Warfarin 5mg", "Ceftriaxone 1g"];
export const rxQueue: RxItem[] = Array.from({ length: 34 }, (_, i) => {
  const interaction = rand() > 0.8;
  return {
    id: `RX${7000 + i}`,
    patient: name(),
    uhid: `UH${240100 + int(0, 239)}`,
    drug: pick(drugs),
    dose: pick(["1-0-1", "0-0-1", "1-1-1", "1-0-0", "SOS"]),
    priority: pick(["routine", "routine", "urgent", "stat"]) as RxItem["priority"],
    status: pick(["pending", "pending", "verified", "dispensed", "hold"]) as RxItem["status"],
    prescriber: pick(doctors),
    interaction: interaction ? "Warfarin + Aspirin — bleeding risk" : undefined,
    time: `${int(1, 59)} min ago`,
  };
});

const payers = ["Star Health", "HDFC Ergo", "CGHS", "ESIC", "Aditya Birla", "Care Health"];
const denialReasons = ["Missing pre-auth", "Coding mismatch", "Non-covered service", "Duplicate claim", "Eligibility lapsed"];
export const claims: Claim[] = Array.from({ length: 48 }, (_, i) => {
  const status = pick(["denied", "denied", "at-risk", "submitted", "scrubbed-clean", "draft", "paid"]) as Claim["status"];
  return {
    id: `CLM${9000 + i}`,
    patient: name(),
    payer: pick(payers),
    amount: int(5, 380) * 1000,
    status,
    denialRisk: Math.round(rand() * 100),
    denialReason: status === "denied" || status === "at-risk" ? pick(denialReasons) : undefined,
    codes: [`ICD-${pick(["E11.9", "I10", "J45.9", "N18.2", "K21.9"])}`, `CPT-${int(10000, 99999)}`],
    aiSuggested: rand() > 0.5,
    submittedAt: `2026-07-0${int(1, 8)}`,
  };
});

const items = ["Surgical Gloves (M)", "N95 Masks", "IV Cannula 18G", "Paracetamol 500mg", "Normal Saline 500ml", "Syringe 5ml", "Suture 3-0", "Betadine 100ml", "ECG Electrodes", "Insulin Pen Needles"];
export const inventory: InventoryItem[] = Array.from({ length: 52 }, (_, i) => {
  const qty = int(0, 500);
  const reorder = int(50, 120);
  const near = rand() > 0.8;
  return {
    id: `ITM${2000 + i}`,
    name: pick(items),
    category: pick(["Consumable", "Drug", "Surgical", "Reagent", "PPE"]),
    store: pick(["Central", "Ward-A", "Pharmacy", "OT"]),
    batch: `B${int(1000, 9999)}`,
    expiry: `2026-${String(int(8, 12)).padStart(2, "0")}-${int(1, 28)}`,
    qty,
    reorderLevel: reorder,
    status: qty === 0 ? "out" : near ? "near-expiry" : qty < reorder ? "low" : rand() > 0.95 ? "dead-stock" : "ok",
    unitCost: int(5, 900),
  };
});

const roles = ["Consultant", "Resident", "Staff Nurse", "Pharmacist", "Lab Tech", "Radiographer", "Receptionist", "Biller"];
export const employees: Employee[] = Array.from({ length: 40 }, (_, i) => {
  const ls = pick(["valid", "valid", "valid", "expiring", "lapsed"]) as Employee["licenseStatus"];
  return {
    id: `EMP${300 + i}`,
    name: name(),
    role: pick(roles),
    department: pick(departments),
    status: pick(["active", "active", "on-leave", "on-call"]) as Employee["status"],
    licenseExpiry: `2026-${String(int(7, 12)).padStart(2, "0")}-${int(1, 28)}`,
    licenseStatus: ls,
    photo: rand() > 0.5 ? photo(i + 20) : undefined,
  };
});

const orgs = ["Sunrise Multispecialty", "CityCare Clinics", "Metro Diagnostics", "Wellness Pharmacy Chain", "Apollo-ish Networks", "Rural Health Trust"];
export const leads: Lead[] = Array.from({ length: 30 }, (_, i) => ({
  id: `LD${400 + i}`,
  org: pick(orgs),
  contact: name(),
  edition: pick(["Clinic", "Hospital", "Diagnostics", "Pharmacy", "Enterprise"]),
  value: int(2, 90) * 100000,
  stage: pick(["capture", "qualify", "nurture", "convert", "retain", "win-back"]) as Lead["stage"],
  region: pick(["North", "South", "West", "MENA", "SEA"]),
  owner: pick(["A. Rao", "S. Menon", "K. Das"]),
  updatedAt: `${int(1, 12)}h ago`,
}));

export const notifications: AppNotification[] = [
  { id: "n1", kind: "critical", title: "Critical lab value", body: "K+ 6.8 mmol/L — Meera Sharma (UH240188)", time: "2 min ago", read: false },
  { id: "n2", kind: "approval", title: "Discount approval needed", body: "₹18,000 waiver on INV-4521", time: "12 min ago", read: false },
  { id: "n3", kind: "result", title: "Radiology report ready", body: "CT Chest — Arjun Patel", time: "25 min ago", read: false },
  { id: "n4", kind: "message", title: "New referral", body: "Dr. Iyer referred a cardiology case", time: "1 h ago", read: true },
  { id: "n5", kind: "system", title: "Roster published", body: "Next week's ICU roster is live", time: "3 h ago", read: true },
];

export const tasks: Task[] = [
  { id: "t1", title: "Verify 4 pending prescriptions", module: "Pharmacy", due: "Now", priority: "high", done: false },
  { id: "t2", title: "Countersign resident notes (3)", module: "IPD", due: "10:30", priority: "med", done: false },
  { id: "t3", title: "Approve leave request — S. Nurse", module: "HRM", due: "Today", priority: "low", done: false },
  { id: "t4", title: "Review denied claim CLM-9003", module: "RCM", due: "Today", priority: "high", done: false },
  { id: "t5", title: "Discharge summary — Bed GEN-4", module: "IPD", due: "12:00", priority: "med", done: true },
];

export const vitals: VitalPoint[] = Array.from({ length: 24 }, (_, i) => ({
  t: `${String(i).padStart(2, "0")}:00`,
  hr: 62 + Math.round(Math.sin(i / 3) * 10 + rand() * 8),
  bp: 110 + Math.round(Math.cos(i / 4) * 8 + rand() * 6),
  spo2: 95 + Math.round(rand() * 4),
  temp: 97 + Math.round(rand() * 20) / 10,
}));

export const timeline: TimelineEvent[] = [
  { id: "e1", type: "admit", title: "Admitted to General-A", detail: "Chest pain, r/o ACS", date: "2026-07-05 09:12", by: "Dr. S. Kulkarni" },
  { id: "e2", type: "lab", title: "Troponin I ordered", detail: "STAT · elevated 0.9 ng/mL", date: "2026-07-05 09:40", by: "Dr. S. Kulkarni" },
  { id: "e3", type: "imaging", title: "ECG performed", detail: "ST changes lead II, III", date: "2026-07-05 10:05", by: "Cardiology" },
  { id: "e4", type: "rx", title: "Aspirin + Atorvastatin started", detail: "Interaction check passed", date: "2026-07-05 10:30", by: "Dr. A. Menon" },
  { id: "e5", type: "note", title: "Progress note", detail: "Stable, pain controlled", date: "2026-07-06 08:15", by: "Dr. A. Menon" },
];

export const dashboardKPIs: KPI[] = [
  { label: "Occupancy", value: "78%", delta: 4, trend: [60, 64, 70, 68, 74, 78], tone: "teal" },
  { label: "OPD Today", value: "342", delta: 12, trend: [280, 300, 290, 320, 335, 342], tone: "blue" },
  { label: "Avg Wait", value: "14 min", delta: -8, trend: [22, 20, 19, 17, 16, 14], tone: "green" },
  { label: "Denial Rate", value: "6.2%", delta: -3, trend: [11, 10, 9, 8, 7, 6.2], tone: "amber" },
  { label: "Collections", value: "₹42.8L", delta: 9, trend: [30, 33, 35, 38, 40, 42.8], tone: "teal" },
  { label: "Critical Alerts", value: "3", delta: 1, trend: [1, 2, 1, 3, 2, 3], tone: "red" },
];

export function getPatient(id: string) {
  return patients.find((p) => p.id === id || p.uhid === id);
}
