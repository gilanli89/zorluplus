import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const AUTH_TIMEOUT = 10_000;

function withTimeout<T>(promise: Promise<T>, ms = AUTH_TIMEOUT): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Auth timeout")), ms)
    ),
  ]);
}

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const adminCacheRef = useRef<{ isAdmin: boolean; isSuperAdmin: boolean }>({
    isAdmin: false,
    isSuperAdmin: false,
  });

  const fetchAdminStatus = async (userId: string) => {
    try {
      const [adminRes, saRes] = await withTimeout(
        Promise.all([
          supabase.rpc("check_own_admin_status"),
          supabase.rpc("is_super_admin", { _user_id: userId }),
        ])
      );
      const status = { isAdmin: !!adminRes.data, isSuperAdmin: !!saRes.data };
      adminCacheRef.current = status;
      setIsAdmin(status.isAdmin);
      setIsSuperAdmin(status.isSuperAdmin);
    } catch {
      // On timeout, keep cached values instead of resetting to false
      setIsAdmin(adminCacheRef.current.isAdmin);
      setIsSuperAdmin(adminCacheRef.current.isSuperAdmin);
    }
  };

  useEffect(() => {
    // Set up listener FIRST (per Supabase best practice)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      const u = session?.user ?? null;
      setUser(u);

      if (event === "SIGNED_OUT") {
        adminCacheRef.current = { isAdmin: false, isSuperAdmin: false };
        setIsAdmin(false);
        setIsSuperAdmin(false);
        setLoading(false);
        return;
      }

      if (event === "TOKEN_REFRESHED") {
        // Session refreshed — keep existing admin state, don't re-check
        setLoading(false);
        return;
      }

      if (u && (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "USER_UPDATED")) {
        await fetchAdminStatus(u.id);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isSuperAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
