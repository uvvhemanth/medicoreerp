import { createHash, timingSafeEqual } from "node:crypto";

/** Username for the admin area. Override with ADMIN_DASHBOARD_USER. */
const DEFAULT_USER = "admin";

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeEqual(a: string, b: string) {
  return timingSafeEqual(digest(a), digest(b));
}

/** True when the admin area is enabled (a password is configured). */
export function adminEnabled() {
  return Boolean(process.env.ADMIN_DASHBOARD_PASSWORD);
}

/**
 * Check an HTTP Basic `Authorization` header against the configured admin
 * credentials. Fails closed when no password is configured.
 */
export function isAdminAuthorized(header: string | null) {
  const password = process.env.ADMIN_DASHBOARD_PASSWORD;
  if (!password || !header?.startsWith("Basic ")) return false;

  let decoded: string;
  try {
    decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  } catch {
    return false;
  }
  const sep = decoded.indexOf(":");
  if (sep < 0) return false;

  const user = process.env.ADMIN_DASHBOARD_USER || DEFAULT_USER;
  // Evaluate both comparisons so timing does not reveal which one failed.
  const userOk = safeEqual(decoded.slice(0, sep), user);
  const passOk = safeEqual(decoded.slice(sep + 1), password);
  return userOk && passOk;
}
