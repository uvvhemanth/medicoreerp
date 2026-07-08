"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  type SessionUser, type Role, type Edition,
  createToken, parseToken, readSessionCookie, setSessionCookie, clearSessionCookie,
} from "@/lib/auth";
import { sleep } from "@/lib/utils";

interface AuthState {
  user: SessionUser | null;
  loading: boolean;
  login: (opts: { email: string; role?: Role; edition?: Edition; name?: string }) => Promise<void>;
  register: (opts: { name: string; email: string; role: Role; edition: Edition; org: string }) => Promise<void>;
  logout: () => void;
  switchBranch: (branch: string) => void;
}

const AuthCtx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = readSessionCookie();
    setUser(parseToken(token));
    setLoading(false);
  }, []);

  const persist = useCallback((u: Omit<SessionUser, "exp">) => {
    const token = createToken(u);
    setSessionCookie(token);
    setUser(parseToken(token));
  }, []);

  const login: AuthState["login"] = useCallback(
    async ({ email, role = "doctor", edition = "hospital", name }) => {
      await sleep(700); // simulate IdP + MFA round-trip
      persist({
        sub: `usr_${email.split("@")[0]}`,
        name: name ?? email.split("@")[0].replace(/\./g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role,
        edition,
        tenant: "Aether Demo Hospital",
        branch: "Main Campus",
      });
    },
    [persist],
  );

  const register: AuthState["register"] = useCallback(
    async ({ name, email, role, edition, org }) => {
      await sleep(900);
      persist({
        sub: `usr_${email.split("@")[0]}`,
        name,
        email,
        role,
        edition,
        tenant: org,
        branch: "Main Campus",
      });
    },
    [persist],
  );

  const logout = useCallback(() => {
    clearSessionCookie();
    // Clear any cached mock state on shared-terminal sign-out (§20.1.5)
    try {
      localStorage.removeItem("aether-app-cache");
    } catch {}
    setUser(null);
    router.push("/login");
  }, [router]);

  const switchBranch = useCallback(
    (branch: string) => {
      if (!user) return;
      persist({ ...user, branch });
    },
    [user, persist],
  );

  return (
    <AuthCtx.Provider value={{ user, loading, login, register, logout, switchBranch }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
