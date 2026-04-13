import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";
import { toast } from "@/components/ui/sonner";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Clear any stale/invalid session when login page mounts
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session) {
        const { data: isAdmin, error } = await supabase.rpc("check_own_admin_status");
        if (error) {
          console.error("Admin check error on mount:", error);
          return; // Don't sign out on RPC/network failure
        }
        if (isAdmin === true) {
          navigate("/admin", { replace: true });
        } else if (isAdmin === false) {
          await supabase.auth.signOut();
        }
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error("E-posta veya şifre hatalı");
    } else {
      // Verify admin status
      const { data, error: rpcError } = await supabase.rpc("check_own_admin_status");
      if (rpcError) {
        console.error("Admin status RPC error:", rpcError);
        toast.error("Yetki kontrolü yapılamadı. Lütfen tekrar deneyin.");
      } else if (data) {
        navigate("/admin");
      } else {
        await supabase.auth.signOut();
        toast.error("Bu hesap admin yetkisine sahip değil.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo size="sm" />
        </div>
        <div className="card-premium card-premium-border rounded-2xl p-8 shadow-lg">
          <h1 className="font-display text-xl font-bold text-foreground text-center mb-6">
            Admin Girişi
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
                placeholder="admin@zorluplus.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full rounded-full mt-2">
              {loading ? "İşleniyor..." : "Giriş Yap"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
