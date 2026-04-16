import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userRole: "super_admin" | "admin" | "moderator" | "user" | null;
  loading: boolean;
  isRecovery: boolean;
  clearRecovery: () => void;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

type Role = "super_admin" | "admin" | "moderator" | "user";

interface AdminCache {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  userRole: Role | null;
}

const EMPTY_CACHE: AdminCache = { isAdmin: false, isSuperAdmin: false, userRole: null };

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [userRole, setUserRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRecovery, setIsRecovery] = useState(false);
  const cache = useRef<AdminCache>({ ...EMPTY_CACHE });
  // Prevent stale fetchAdminStatus from overwriting newer results
  const fetchId = useRef(0);

  const fetchAdminStatus = async (userId: string) => {
    const id = ++fetchId.current;

    function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
      return Promise.race([p, new Promise<T>((_, reject) => setTimeout(() => reject(new Error("timeout")), ms))]);
    }

    // Step 1: user_roles (fast, no RPC) — set state immediately so UI unblocks
    let role: Role = cache.current.userRole ?? "user";
    try {
      const { data } = await withTimeout(
        supabase.from("user_roles").select("role").eq("user_id", userId).maybeSingle(),
        5000
      );
      if (data?.role) role = data.role as Role;
    } catch { /* keep cached role */ }

    // Derive admin flags from role immediately
    let isAdminVal = role === "admin" || role === "super_admin" || role === "moderator";
    let isSuperAdminVal = role === "super_admin";

    if (id !== fetchId.current) return;
    cache.current = { isAdmin: isAdminVal, isSuperAdmin: isSuperAdminVal, userRole: role };
    setIsAdmin(isAdminVal);
    setIsSuperAdmin(isSuperAdminVal);
    setUserRole(role);

    // Step 2: RPCs in background — refine if they succeed
    const [adminResult, saResult] = await Promise.allSettled([
      withTimeout(supabase.rpc("check_own_admin_status"), 10000),
      withTimeout(supabase.rpc("is_super_admin", { _user_id: userId }), 10000),
    ]);

    if (adminResult.status === "fulfilled") isAdminVal = !!adminResult.value.data;
    if (saResult.status === "fulfilled") isSuperAdminVal = !!saResult.value.data;
    if (adminResult.status === "rejected") console.warn("[Auth] check_own_admin_status failed", adminResult.reason);
    if (saResult.status === "rejected") console.warn("[Auth] is_super_admin failed", saResult.reason);

    // Discard if a newer fetch has already resolved
    if (id !== fetchId.current) return;

    cache.current = { isAdmin: isAdminVal, isSuperAdmin: isSuperAdminVal, userRole: role };
    setIsAdmin(isAdminVal);
    setIsSuperAdmin(isSuperAdminVal);
    setUserRole(role);
  };

  const resetAdminState = () => {
    fetchId.current++;           // invalidate any in-flight fetch
    cache.current = { ...EMPTY_CACHE };
    setIsAdmin(false);
    setIsSuperAdmin(false);
    setUserRole(null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const u = session?.user ?? null;
      setUser(u);

      if (event === "SIGNED_OUT") {
        resetAdminState();
        setIsRecovery(false);
        setLoading(false);
        return;
      }

      if (event === "PASSWORD_RECOVERY") {
        setIsRecovery(true);
        setLoading(false);
        return;
      }

      if (event === "TOKEN_REFRESHED") {
        setLoading(false);
        return;
      }

      if (u && (event === "SIGNED_IN" || event === "INITIAL_SESSION" || event === "USER_UPDATED")) {
        setIsRecovery(false);
        // Unblock the UI immediately — fetch admin status in the background
        setLoading(false);
        if (event === "SIGNED_IN") await new Promise(r => setTimeout(r, 300));
        fetchAdminStatus(u.id);
        return;
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const clearRecovery = () => setIsRecovery(false);

  const signOut = async () => {
    resetAdminState();
    setIsRecovery(false);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isSuperAdmin, userRole, loading, isRecovery, clearRecovery, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
