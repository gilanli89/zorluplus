import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

const AUTH_TIMEOUT = 5000;

function withTimeout<T>(promise: Promise<T>, ms = AUTH_TIMEOUT): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Auth timeout")), ms)
    ),
  ]);
}

async function fetchAdminStatus(userId: string) {
  try {
    const [adminRes, saRes] = await withTimeout(
      Promise.all([
        supabase.rpc("check_own_admin_status"),
        supabase.rpc("is_super_admin", { _user_id: userId }),
      ])
    );
    return { isAdmin: !!adminRes.data, isSuperAdmin: !!saRes.data };
  } catch {
    return { isAdmin: false, isSuperAdmin: false };
  }
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const initialCheckDone = useRef(false);

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        const status = await fetchAdminStatus(u.id);
        setIsAdmin(status.isAdmin);
        setIsSuperAdmin(status.isSuperAdmin);
      }
      setLoading(false);
      initialCheckDone.current = true;
    });

    // Listen only for meaningful auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!initialCheckDone.current) return; // skip during initial load

      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        const u = session?.user ?? null;
        setUser(u);
        if (u) {
          const status = await fetchAdminStatus(u.id);
          setIsAdmin(status.isAdmin);
          setIsSuperAdmin(status.isSuperAdmin);
        } else {
          setIsAdmin(false);
          setIsSuperAdmin(false);
        }
        setLoading(false);
      }
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

  return { user, isAdmin, isSuperAdmin, loading, signIn, signOut };
}
