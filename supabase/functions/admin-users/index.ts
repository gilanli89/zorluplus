import { createClient } from "https://esm.sh/@supabase/supabase-js@2.98.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function validatePassword(password: string): string | null {
  if (password.length < 8) return "Şifre en az 8 karakter olmalı";
  if (!/[A-Z]/.test(password)) return "Şifre en az 1 büyük harf içermeli";
  if (!/[a-z]/.test(password)) return "Şifre en az 1 küçük harf içermeli";
  if (!/\d/.test(password)) return "Şifre en az 1 rakam içermeli";
  if (!/[^a-zA-Z\d]/.test(password)) return "Şifre en az 1 özel karakter içermeli";
  return null;
}

async function verifySuperAdmin(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;

  const anonClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await anonClient.auth.getClaims(token);
  if (error || !data?.claims) return null;

  const userId = data.claims.sub as string;
  const { data: isAdmin } = await anonClient.rpc("check_own_admin_status");
  if (!isAdmin) return null;
  return userId;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const callerId = await verifySuperAdmin(req);
  if (!callerId) {
    return jsonResponse({ error: "Unauthorized – super_admin required" }, 403);
  }

  const serviceClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    // GET – list users
    if (req.method === "GET") {
      const { data: { users }, error } = await serviceClient.auth.admin.listUsers({ perPage: 200 });
      if (error) return jsonResponse({ error: error.message }, 500);

      const { data: roles } = await serviceClient.from("user_roles").select("*");

      const mapped = users.map((u: any) => {
        const userRole = roles?.find((r: any) => r.user_id === u.id);
        return {
          id: u.id,
          email: u.email,
          created_at: u.created_at,
          banned_until: u.banned_until,
          role: userRole?.role ?? "user",
          role_id: userRole?.id ?? null,
        };
      });

      return jsonResponse({ users: mapped });
    }

    // POST – create user
    if (req.method === "POST") {
      const body = await req.json();
      const { email, password, role } = body;
      if (!email || !password) return jsonResponse({ error: "email and password required" }, 400);

      const pwError = validatePassword(password);
      if (pwError) return jsonResponse({ error: pwError }, 400);

      const validRoles = ["super_admin", "admin", "moderator", "user"];
      const selectedRole = validRoles.includes(role) ? role : "user";

      const { data: newUser, error } = await serviceClient.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });
      if (error) return jsonResponse({ error: error.message }, 400);

      if (selectedRole !== "user") {
        await serviceClient.from("user_roles").insert({
          user_id: newUser.user.id,
          role: selectedRole,
        });
      }

      return jsonResponse({ user: { id: newUser.user.id, email, role: selectedRole } }, 201);
    }

    // PATCH – update role, ban/unban, or reset password
    if (req.method === "PATCH") {
      const body = await req.json();
      const { user_id, action, role, ban, password } = body;
      if (!user_id) return jsonResponse({ error: "user_id required" }, 400);

      // Prevent self-modification
      if (user_id === callerId) return jsonResponse({ error: "Cannot modify yourself" }, 400);

      if (action === "role" && role) {
        const validRoles = ["super_admin", "admin", "moderator", "user"];
        if (!validRoles.includes(role)) return jsonResponse({ error: "Invalid role" }, 400);

        await serviceClient.from("user_roles").delete().eq("user_id", user_id);
        if (role !== "user") {
          await serviceClient.from("user_roles").insert({ user_id, role });
        }
        return jsonResponse({ success: true });
      }

      if (action === "ban") {
        if (ban) {
          const { error } = await serviceClient.auth.admin.updateUserById(user_id, {
            ban_duration: "876000h",
          });
          if (error) return jsonResponse({ error: error.message }, 500);
        } else {
          const { error } = await serviceClient.auth.admin.updateUserById(user_id, {
            ban_duration: "none",
          });
          if (error) return jsonResponse({ error: error.message }, 500);
        }
        return jsonResponse({ success: true });
      }

      if (action === "reset_password") {
        if (!password) return jsonResponse({ error: "password required" }, 400);
        const pwError = validatePassword(password);
        if (pwError) return jsonResponse({ error: pwError }, 400);

        const { error } = await serviceClient.auth.admin.updateUserById(user_id, { password });
        if (error) return jsonResponse({ error: error.message }, 500);
        return jsonResponse({ success: true });
      }

      return jsonResponse({ error: "Invalid action" }, 400);
    }

    // DELETE – delete user
    if (req.method === "DELETE") {
      const body = await req.json();
      const { user_id } = body;
      if (!user_id) return jsonResponse({ error: "user_id required" }, 400);
      if (user_id === callerId) return jsonResponse({ error: "Cannot delete yourself" }, 400);

      const { error } = await serviceClient.auth.admin.deleteUser(user_id);
      if (error) return jsonResponse({ error: error.message }, 500);

      return jsonResponse({ success: true });
    }

    return jsonResponse({ error: "Method not allowed" }, 405);
  } catch (e) {
    return jsonResponse({ error: e.message }, 500);
  }
});
