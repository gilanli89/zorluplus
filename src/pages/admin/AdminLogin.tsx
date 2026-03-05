import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import Logo from "@/components/Logo";
import { toast } from "sonner";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const email = `${username}@zorluplus.com`;

    // Try sign in first
    let { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error && error.message.includes("Invalid login credentials")) {
      // First time: create the account, then sign in
      const { error: signUpError } = await supabase.auth.signUp({ email, password });
      if (signUpError) {
        toast.error("Giriş başarısız: " + signUpError.message);
        setLoading(false);
        return;
      }
      // Sign in after signup
      const result = await supabase.auth.signInWithPassword({ email, password });
      error = result.error;
    }

    if (error) {
      toast.error("Giriş başarısız: " + error.message);
    } else {
      // Verify admin status
      const { data } = await supabase.rpc("is_admin", { check_email: email });
      if (data) {
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
        <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
          <h1 className="font-display text-xl font-bold text-foreground text-center mb-6">
            Admin Girişi
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username">Kullanıcı Adı</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ""))}
                required
                className="mt-1"
                placeholder="zorluadmin"
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
