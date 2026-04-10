import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: isAdmin } = await userClient.rpc("check_own_admin_status");
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { snapshot_id } = await req.json();
    if (!snapshot_id) {
      return new Response(JSON.stringify({ error: "snapshot_id required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    const { data: snapshot, error: snapError } = await adminClient
      .from("service_snapshots")
      .select("id, snapshot_at, data, request_count")
      .eq("id", snapshot_id)
      .single();

    if (snapError || !snapshot) {
      return new Response(JSON.stringify({ error: "Snapshot not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const items = snapshot.data as Array<Record<string, unknown>>;
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Empty snapshot" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let updated = 0;
    let errors = 0;

    for (const item of items) {
      const { error } = await adminClient
        .from("service_requests")
        .update({
          full_name: item.full_name,
          phone: item.phone,
          email: item.email,
          brand: item.brand,
          product_type: item.product_type,
          issue_description: item.issue_description,
          address: item.address,
          preferred_date: item.preferred_date,
          status: item.status,
          technician_notes: item.technician_notes,
          source: item.source,
        })
        .eq("id", item.id as string);

      if (error) {
        errors++;
        console.error(`Failed to update service ${item.id}:`, error.message);
      } else {
        updated++;
      }
    }

    const { data: { user } } = await userClient.auth.getUser();
    if (user) {
      await adminClient.from("activity_logs").insert({
        user_id: user.id,
        user_email: user.email || "unknown",
        action: "service_restore",
        entity_type: "service_snapshot",
        entity_id: snapshot_id,
        details: { snapshot_at: snapshot.snapshot_at, request_count: snapshot.request_count, updated, errors },
      });
    }

    return new Response(
      JSON.stringify({ success: true, updated, errors, snapshot_at: snapshot.snapshot_at }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("Restore error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
