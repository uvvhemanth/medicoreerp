import { createSign } from "node:crypto";

/**
 * Minimal Google service-account client: signs a JWT with the account's
 * private key and exchanges it for an OAuth access token. Server-only.
 */

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const tokenCache = new Map<string, { token: string; expiresAt: number }>();

function b64url(input: string) {
  return Buffer.from(input).toString("base64url");
}

export function serviceAccountConfigured() {
  return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY);
}

function privateKey() {
  // Hosting dashboards often store the PEM with literal "\n" sequences.
  return (process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
}

async function accessToken(scope: string) {
  const cached = tokenCache.get(scope);
  if (cached && cached.expiresAt > Date.now() + 60_000) return cached.token;

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({
      iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      scope,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const signature = createSign("RSA-SHA256").update(`${header}.${claims}`).sign(privateKey()).toString("base64url");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${header}.${claims}.${signature}`,
    }),
    cache: "no-store",
  });
  const json = (await res.json()) as { access_token?: string; expires_in?: number; error_description?: string; error?: string };
  if (!res.ok || !json.access_token) {
    throw new Error(`Google sign-in failed: ${json.error_description ?? json.error ?? res.status}`);
  }
  tokenCache.set(scope, { token: json.access_token, expiresAt: Date.now() + (json.expires_in ?? 3600) * 1000 });
  return json.access_token;
}

/** POST JSON to a Google API with a service-account token for `scope`. */
export async function googlePost<T>(url: string, scope: string, body: unknown): Promise<T> {
  const token = await accessToken(scope);
  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  const json = (await res.json()) as T & { error?: { message?: string } };
  if (!res.ok) throw new Error(json.error?.message ?? `Google API error ${res.status}`);
  return json;
}
