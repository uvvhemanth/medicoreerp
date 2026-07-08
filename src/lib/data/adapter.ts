/**
 * Swappable data adapter (Requirements §4).
 * All UI reads go through this. Today it returns mock data with simulated
 * latency + occasional failures so every loading/error/offline state is real.
 * To go live later, implement `httpAdapter` and switch on NEXT_PUBLIC_DATA_SOURCE.
 */
import { sleep } from "@/lib/utils";
import * as db from "@/lib/mock/data";

const DATA_SOURCE = process.env.NEXT_PUBLIC_DATA_SOURCE ?? "mock";
const FAIL_RATE = 0.0; // set >0 to demo error states globally

export interface ApiError {
  code: string;
  message: string;
  requestId: string;
  field?: string;
}

function maybeFail(resource: string) {
  if (Math.random() < FAIL_RATE) {
    const err: ApiError = {
      code: "UPSTREAM_TIMEOUT",
      message: `Could not load ${resource}. Please retry.`,
      requestId: `req_${Math.random().toString(36).slice(2, 10)}`,
    };
    throw err;
  }
}

async function mock<T>(resource: string, value: T, latency = 350): Promise<T> {
  await sleep(latency + Math.random() * 250);
  maybeFail(resource);
  return value;
}

/** The typed resource surface consumed by hooks. */
export const api = {
  patients: (q?: string) =>
    mock(
      "patients",
      q
        ? db.patients
            .map((p) => ({ ...p, matchConfidence: Math.round(60 + Math.random() * 40) }))
            .filter((p) =>
              [p.name, p.uhid, p.phone, p.abha].join(" ").toLowerCase().includes(q.toLowerCase()),
            )
            .slice(0, 40)
        : db.patients.slice(0, 40),
    ),
  patient: (id: string) => mock("patient", db.getPatient(id) ?? null),
  appointments: () => mock("appointments", db.appointments),
  beds: () => mock("beds", db.beds, 300),
  rxQueue: () => mock("rxQueue", db.rxQueue),
  claims: () => mock("claims", db.claims),
  inventory: () => mock("inventory", db.inventory),
  employees: () => mock("employees", db.employees),
  leads: () => mock("leads", db.leads),
  notifications: () => mock("notifications", db.notifications, 150),
  tasks: () => mock("tasks", db.tasks, 150),
  vitals: () => mock("vitals", db.vitals),
  timeline: () => mock("timeline", db.timeline),
  kpis: () => mock("kpis", db.dashboardKPIs, 250),
};

export const dataSource = DATA_SOURCE;
