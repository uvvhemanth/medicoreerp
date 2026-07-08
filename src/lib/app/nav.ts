import type { Role } from "@/lib/auth";
import {
  LayoutDashboard, Users, CalendarClock, BedDouble, Stethoscope, Pill, FlaskConical,
  Scan, Receipt, FileWarning, Boxes, UsersRound, BarChart3, MonitorPlay, Settings,
  ClipboardList, HeartPulse, Building2,
} from "lucide-react";

export interface NavLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  roles?: Role[]; // if omitted, visible to all
}
export interface NavGroup {
  group: string;
  links: NavLink[];
}

/** Role-filtered module navigation (§8.3). */
export const APP_NAV: NavGroup[] = [
  {
    group: "Overview",
    links: [
      { label: "Dashboard", href: "/app", icon: LayoutDashboard },
      { label: "Command Center", href: "/app/command-center", icon: MonitorPlay, roles: ["admin", "executive"] },
    ],
  },
  {
    group: "Patient Access",
    links: [
      { label: "Patients", href: "/app/patients", icon: Users, badge: 3 },
      { label: "Appointments", href: "/app/appointments", icon: CalendarClock, badge: 12 },
      { label: "Register Patient", href: "/app/register-patient", icon: ClipboardList, roles: ["front-office", "nurse", "admin"] },
    ],
  },
  {
    group: "Clinical",
    links: [
      { label: "OPD Consult", href: "/app/opd", icon: Stethoscope, roles: ["doctor", "nurse", "admin"] },
      { label: "Bed Board", href: "/app/ipd/bed-board", icon: BedDouble, roles: ["doctor", "nurse", "admin"] },
      { label: "Nursing & eMAR", href: "/app/nursing", icon: HeartPulse, roles: ["nurse", "doctor", "admin"] },
    ],
  },
  {
    group: "Ancillary",
    links: [
      { label: "Pharmacy", href: "/app/pharmacy", icon: Pill, roles: ["pharmacist", "admin"], badge: 4 },
      { label: "Laboratory", href: "/app/lab", icon: FlaskConical, roles: ["lab", "admin"] },
      { label: "Radiology", href: "/app/radiology", icon: Scan, roles: ["lab", "doctor", "admin"] },
    ],
  },
  {
    group: "Revenue Cycle",
    links: [
      { label: "Billing", href: "/app/billing", icon: Receipt, roles: ["biller", "finance", "admin"] },
      { label: "Denial Queue", href: "/app/rcm/denials", icon: FileWarning, roles: ["biller", "finance", "admin"], badge: 9 },
    ],
  },
  {
    group: "Operations",
    links: [
      { label: "Inventory", href: "/app/inventory", icon: Boxes, roles: ["pharmacist", "admin"] },
      { label: "Workforce", href: "/app/hrm", icon: UsersRound, roles: ["hr", "admin"] },
    ],
  },
  {
    group: "Insight",
    links: [
      { label: "Analytics", href: "/app/analytics", icon: BarChart3 },
      { label: "Admin & Settings", href: "/app/settings", icon: Settings, roles: ["admin"] },
    ],
  },
];

export function filterNavForRole(role: Role): NavGroup[] {
  return APP_NAV.map((g) => ({
    ...g,
    links: g.links.filter((l) => !l.roles || l.roles.includes(role)),
  })).filter((g) => g.links.length > 0);
}

export const KIOSK_ICON = Building2;
