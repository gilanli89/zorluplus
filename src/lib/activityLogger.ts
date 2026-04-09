import { supabase } from "@/integrations/supabase/client";

export async function logActivity(
  action: string,
  entityType: string,
  entityId?: string | null,
  details?: Record<string, unknown>
) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    await supabase.from("activity_logs").insert([{
      user_id: session.user.id,
      user_email: session.user.email || "unknown",
      action,
      entity_type: entityType,
      entity_id: entityId || null,
      details: (details || {}) as any,
    }]);
  } catch {
    // Silent fail — don't break user flow
  }
}
