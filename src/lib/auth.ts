/**
 * Mock authentication (Requirements §4.4, §20).
 * Simulates OIDC: a signed-looking token stored in a cookie (session) + a
 * refresh marker. NOT secure — swap for real OIDC/PKCE later. No real PHI.
 */

export type Role =
  | "doctor"
  | "nurse"
  | "front-office"
  | "pharmacist"
  | "lab"
  | "biller"
  | "finance"
  | "hr"
  | "admin"
  | "executive";

export type Edition = "clinic" | "hospital" | "diagnostics" | "pharmacy" | "enterprise";

export interface SessionUser {
  sub: string;
  name: string;
  email: string;
  role: Role;
  edition: Edition;
  tenant: string;
  branch: string;
  exp: number;
}

export const SESSION_COOKIE = "aether_session";
export const REFRESH_COOKIE = "aether_refresh";

export const ROLE_LABELS: Record<Role, string> = {
  doctor: "Doctor / Physician",
  nurse: "Nurse",
  "front-office": "Front Office",
  pharmacist: "Pharmacist",
  lab: "Lab Technician",
  biller: "Biller / RCM",
  finance: "Finance",
  hr: "HR Manager",
  admin: "Administrator",
  executive: "Executive / CXO",
};

/** base64url encode (works in browser + edge middleware). */
function b64urlEncode(obj: unknown) {
  const json = JSON.stringify(obj);
  const b64 = typeof btoa !== "undefined" ? btoa(unescape(encodeURIComponent(json))) : Buffer.from(json).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function b64urlDecode(str: string): unknown {
  try {
    const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const json = typeof atob !== "undefined" ? decodeURIComponent(escape(atob(b64))) : Buffer.from(b64, "base64").toString();
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function createToken(user: Omit<SessionUser, "exp">): string {
  const exp = Date.now() + 1000 * 60 * 60 * 8; // 8h
  const header = b64urlEncode({ alg: "mock", typ: "JWT" });
  const payload = b64urlEncode({ ...user, exp });
  return `${header}.${payload}.mocksig`;
}

export function parseToken(token: string | undefined | null): SessionUser | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const payload = b64urlDecode(parts[1]) as SessionUser | null;
  if (!payload || !payload.exp || payload.exp < Date.now()) return null;
  return payload;
}

/* ---------- Client cookie helpers ---------- */
export function setSessionCookie(token: string) {
  if (typeof document === "undefined") return;
  const maxAge = 60 * 60 * 8;
  document.cookie = `${SESSION_COOKIE}=${token}; path=/; max-age=${maxAge}; samesite=lax`;
  document.cookie = `${REFRESH_COOKIE}=mock_refresh_${Date.now()}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
}

export function clearSessionCookie() {
  if (typeof document === "undefined") return;
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0`;
  document.cookie = `${REFRESH_COOKIE}=; path=/; max-age=0`;
}

export function readSessionCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
  return match ? match[1] : null;
}

/** Demo accounts for one-click login. */
export const DEMO_ACCOUNTS: { role: Role; email: string; name: string; edition: Edition }[] = [
  { role: "doctor", email: "dr.menon@aether.health", name: "Dr. A. Menon", edition: "hospital" },
  { role: "nurse", email: "nurse.priya@aether.health", name: "Priya Nair", edition: "hospital" },
  { role: "front-office", email: "reception@aether.health", name: "Sneha Rao", edition: "clinic" },
  { role: "biller", email: "rcm@aether.health", name: "Karan Das", edition: "hospital" },
  { role: "admin", email: "admin@aether.health", name: "Vikram Singh", edition: "enterprise" },
  { role: "executive", email: "ceo@aether.health", name: "Divya Iyer", edition: "enterprise" },
];
