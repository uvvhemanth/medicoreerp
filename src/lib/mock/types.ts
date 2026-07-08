/** Domain types — FHIR-flavoured where clinical, so a real API can back them later. */

export type ID = string;

export interface Patient {
  id: ID;
  uhid: string;
  name: string;
  age: number;
  sex: "M" | "F" | "O";
  phone: string;
  abha?: string;
  allergies: string[];
  chronic: string[];
  bloodGroup: string;
  photo?: string;
  matchConfidence?: number;
  duplicate?: boolean;
  lastVisit?: string;
  registeredAt: string;
  insurance?: string;
  status: "active" | "inactive";
}

export interface Appointment {
  id: ID;
  patientName: string;
  uhid: string;
  doctor: string;
  department: string;
  time: string;
  channel: "walk-in" | "online" | "phone" | "referral";
  status: "scheduled" | "checked-in" | "in-consult" | "done" | "cancelled" | "no-show";
  noShowRisk: number;
  token?: string;
}

export interface Bed {
  id: ID;
  ward: string;
  number: string;
  status: "occupied" | "vacant" | "cleaning" | "reserved" | "blocked";
  patient?: string;
  uhid?: string;
  isolation?: boolean;
  attending?: string;
  los?: number;
  predictedDischarge?: string;
}

export interface RxItem {
  id: ID;
  patient: string;
  uhid: string;
  drug: string;
  dose: string;
  priority: "routine" | "urgent" | "stat";
  status: "pending" | "verified" | "dispensed" | "hold";
  prescriber: string;
  interaction?: string;
  time: string;
}

export interface Claim {
  id: ID;
  patient: string;
  payer: string;
  amount: number;
  status: "draft" | "scrubbed-clean" | "submitted" | "denied" | "at-risk" | "paid";
  denialRisk: number;
  denialReason?: string;
  codes: string[];
  aiSuggested?: boolean;
  submittedAt?: string;
}

export interface InventoryItem {
  id: ID;
  name: string;
  category: string;
  store: string;
  batch: string;
  expiry: string;
  qty: number;
  reorderLevel: number;
  status: "ok" | "low" | "near-expiry" | "dead-stock" | "out";
  unitCost: number;
}

export interface Employee {
  id: ID;
  name: string;
  role: string;
  department: string;
  status: "active" | "on-leave" | "on-call";
  licenseExpiry?: string;
  licenseStatus?: "valid" | "expiring" | "lapsed";
  photo?: string;
}

export interface Lead {
  id: ID;
  org: string;
  contact: string;
  edition: string;
  value: number;
  stage: "capture" | "qualify" | "nurture" | "convert" | "retain" | "win-back";
  region: string;
  owner: string;
  updatedAt: string;
}

export interface AppNotification {
  id: ID;
  kind: "result" | "approval" | "critical" | "message" | "system";
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export interface Task {
  id: ID;
  title: string;
  module: string;
  due: string;
  priority: "low" | "med" | "high";
  done: boolean;
}

export interface VitalPoint {
  t: string;
  hr: number;
  bp: number;
  spo2: number;
  temp: number;
}

export interface TimelineEvent {
  id: ID;
  type: "visit" | "lab" | "rx" | "note" | "admit" | "discharge" | "imaging";
  title: string;
  detail: string;
  date: string;
  by: string;
}

export interface KPI {
  label: string;
  value: string;
  delta: number;
  trend: number[];
  tone?: "teal" | "green" | "amber" | "red" | "blue";
}
