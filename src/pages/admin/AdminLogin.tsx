import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/Logo";
import { toast } from "@/components/ui/sonner";
import { Loader2 } from "lucide-react";

type Mode = "login" | "forgot" | "reset";

export default function AdminLogin() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConfirm, setNewPwConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAdmin, isRecovery, clearRecovery, loading: authLoading } = useAuth();

  // If already authenticated as admin, go straight to panel
  useEffect(() => {
    if (!authLoading && isAdmin && !isRecovery) {
      navigate("/admin", { replace: true });
    }
  }, [authLoading, isAdmin, isRecovery]);

  // PASSWORD_RECOVERY event fires → show reset form
  useEffect(() => {
    if (isRecovery) setMode("reset");
  }, [isRecovery]);


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error("E-posta veya şifre hatalı");
        setLoading(false);
      }
      // On success: onAuthStateChange fires → AuthContext sets isAdmin → useEffect above navigates
    } catch {
      toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("E-posta adresinizi girin"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "https://zorluplus.com/admin",
      });
      if (error) {
        toast.error("Şifre sıfırlama e-postası gönderilemedi. Lütfen tekrar deneyin.");
      } else {
        toast.success("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi");
        setMode("login");
      }
    } catch {
      toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw.length < 6) { toast.error("Şifre en az 6 karakter olmalıdır"); return; }
    if (newPw !== newPwConfirm) { toast.error("Şifreler eşleşmiyor"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPw });
      if (error) {
        toast.error("Şifre güncellenemedi. Bağlantıyı yeniden açmayı deneyin.");
      } else {
        toast.success("Şifreniz başarıyla güncellendi! Giriş yapabilirsiniz.");
        clearRecovery();
        await supabase.auth.signOut();
        setMode("login");
        setNewPw("");
        setNewPwConfirm("");
      }
    } catch {
      toast.error("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Logo size="sm" />
        </div>
        <div className="card-premium card-premium-border rounded-2xl p-8 shadow-lg">

          {/* ── LOGIN MODE ── */}
          {mode === "login" && (
            <>
              <h1 className="font-display text-xl font-bold text-foreground text-center mb-6">
                Admin Girişi
              </h1>
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="admin@zorludigitalplaza.com"
                    autoComplete="email"
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
                    autoComplete="current-password"
                  />
                </div>
                <Button type="submit" disabled={loading || authLoading} className="w-full rounded-full mt-2 gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
                </Button>
              </form>
            </>
          )}

          {/* ── FORGOT PASSWORD MODE ── */}
          {mode === "forgot" && (
            <>
              <h1 className="font-display text-xl font-bold text-foreground text-center mb-2">
                Şifremi Unuttum
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-6">
                E-posta adresinize şifre sıfırlama bağlantısı göndereceğiz.
              </p>
              <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="reset-email">E-posta</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="admin@zorludigitalplaza.com"
                    autoComplete="email"
                  />
                </div>
                <Button type="submit" disabled={loading} className="w-full rounded-full mt-2 gap-2">
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Gönderiliyor..." : "Sıfırlama Bağlantısı Gönder"}
                </Button>
              </form>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-sm text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors"
                >
                  Geri Dön
                </button>
              </div>
            </>
          )}

          {/* ── RESET PASSWORD MODE (after clicking email link) ── */}
          {mode === "reset" && (
            <>
              <h1 className="font-display text-xl font-bold text-foreground text-center mb-2">
                Yeni Şifre Belirle
              </h1>
              <p className="text-sm text-muted-foreground text-center mb-6">
                Lütfen yeni şifrenizi girin.
              </p>
              <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                <div>
                  <Label htmlFor="new-pw">Yeni Şifre</Label>
                  <Input
                    id="new-pw"
                    type="password"
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    required
                    minLength={6}
                    className="mt-1"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <Label htmlFor="new-pw-confirm">Yeni Şifre (Tekrar)</Label>
                  <Input
                    id="new-pw-confirm"
                    type="password"
                    value={newPwConfirm}
                    onChange={e => setNewPwConfirm(e.target.value)}
                    required
                    minLength={6}
                    className="mt-1"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  {newPwConfirm && newPw !== newPwConfirm && (
                    <p className="text-xs text-destructive mt-1">Şifreler eşleşmiyor</p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={loading || newPw.length < 6 || newPw !== newPwConfirm}
                  className="w-full rounded-full mt-2 gap-2"
                >
                  {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {loading ? "Kaydediliyor..." : "Şifreyi Kaydet"}
                </Button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
