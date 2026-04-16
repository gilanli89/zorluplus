import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { ShoppingCart, Package, Wrench, LogOut, LayoutDashboard, Users, Shield, KeyRound, Loader2, Activity, Database } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { logActivity } from "@/lib/activityLogger";
import { useIdleTimeout } from "@/hooks/useIdleTimeout";
import IdleTimeoutWarning from "@/components/admin/IdleTimeoutWarning";
import { AdminErrorBoundary } from "@/components/admin/AdminErrorBoundary";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { title: "Özet",            url: "/admin",                    icon: LayoutDashboard },
  { title: "Siparişler",      url: "/admin/siparisler",         icon: ShoppingCart,   adminOnly: true },
  { title: "Stok Yönetimi",   url: "/admin/stok",               icon: Package },
  { title: "Servis Talepleri",url: "/admin/servis",             icon: Wrench,         adminOnly: true },
  { title: "Kullanıcılar",    url: "/admin/kullanicilar",       icon: Users,          adminOnly: true },
  { title: "Roller",          url: "/admin/roller",             icon: Shield,         adminOnly: true },
  { title: "Aktivite Logları",url: "/admin/aktivite-loglari",   icon: Activity,       superAdminOnly: true },
  { title: "Yedekler",        url: "/admin/yedekler",           icon: Database,       superAdminOnly: true },
] as const;

export default function AdminLayout() {
  const { user, isAdmin, isSuperAdmin, userRole, loading, signOut } = useAuth();
  const isModerator = userRole === "moderator";
  const navigate = useNavigate();
  const location = useLocation();
  const { isWarningVisible, countdown, resetTimer } = useIdleTimeout(!loading && !!user && isAdmin);

  // Self password change
  const [pwDialogOpen, setPwDialogOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConfirm, setNewPwConfirm] = useState("");
  const [changingPw, setChangingPw] = useState(false);

  useEffect(() => {
    // AdminGate handles unauthenticated users — AdminLayout only needs to handle moderator restriction
    if (!loading && isModerator) {
      const allowed = ["/admin/stok"];
      const isAllowed = allowed.some(p => location.pathname === p || location.pathname.startsWith(p + "/"));
      if (!isAllowed) navigate("/admin/stok", { replace: true });
    }
  }, [isModerator, loading, navigate, location.pathname]);

  const translateAuthError = (msg: string): string => {
    const map: Record<string, string> = {
      "New password should be different from the old password": "Yeni şifre mevcut şifreden farklı olmalıdır",
      "Password should be at least 6 characters": "Şifre en az 6 karakter olmalıdır",
      "Auth session missing": "Oturum süresi dolmuş, tekrar giriş yapın",
      "Invalid login credentials": "Mevcut şifre yanlış",
    };
    for (const [eng, tr] of Object.entries(map)) {
      if (msg.toLowerCase().includes(eng.toLowerCase())) return tr;
    }
    return "Şifre değiştirme sırasında bir hata oluştu. Lütfen tekrar deneyin.";
  };

  const handleChangePassword = async () => {
    if (newPw.length < 6) { toast.error("Yeni şifre en az 6 karakter olmalıdır"); return; }
    if (newPw !== newPwConfirm) { toast.error("Yeni şifreler eşleşmiyor"); return; }
    setChangingPw(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPw });
      if (error) {
        toast.error(translateAuthError(error.message));
      } else {
        toast.success("Şifreniz başarıyla değiştirildi");
        logActivity("self_password_change", "self");
        setPwDialogOpen(false);
        setCurrentPw(""); setNewPw(""); setNewPwConfirm("");
      }
    } catch {
      toast.error("Bağlantı hatası, tekrar deneyin.");
    } finally {
      setChangingPw(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Yükleniyor...</div>;
  }

  if (!user || !isAdmin) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar collapsible="icon">
          <SidebarContent>
            <div className="p-4">
              <Logo size="sm" />
            </div>
            <SidebarGroup>
              <SidebarGroupLabel>Yönetim</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV_ITEMS.filter(item => {
                    if ('superAdminOnly' in item && item.superAdminOnly && !isSuperAdmin) return false;
                    if ('adminOnly' in item && item.adminOnly && isModerator) return false;
                    return true;
                  }).map(item => {
                    const active = location.pathname === item.url || (item.url !== "/admin" && location.pathname.startsWith(item.url));
                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className={cn(
                              "flex items-center gap-2 px-3 py-2 rounded-lg transition-colors",
                              active ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground hover:bg-muted"
                            )}
                          >
                            <PremiumIconInline icon={item.icon} size={16} />
                            <span className="flex-1">{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b border-border px-4 bg-card/80 backdrop-blur-sm">
            <SidebarTrigger />
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">{user.email}</span>

              <Dialog open={pwDialogOpen} onOpenChange={(open) => {
                setPwDialogOpen(open);
                if (!open) { setCurrentPw(""); setNewPw(""); setNewPwConfirm(""); }
              }}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <KeyRound className="h-4 w-4" /> Şifre Değiştir
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Şifre Değiştir</DialogTitle>
                    <DialogDescription>Güvenliğiniz için mevcut şifrenizi doğrulayın ve yeni şifrenizi belirleyin.</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label>Yeni Şifre</Label>
                      <Input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label>Yeni Şifre (Tekrar)</Label>
                      <Input type="password" value={newPwConfirm} onChange={e => setNewPwConfirm(e.target.value)} placeholder="••••••••" />
                      {newPwConfirm && newPw !== newPwConfirm && (
                        <p className="text-xs text-destructive">Şifreler eşleşmiyor</p>
                      )}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setPwDialogOpen(false)}>İptal</Button>
                    <Button
                      onClick={handleChangePassword}
                      disabled={changingPw || newPw.length < 6 || newPw !== newPwConfirm}
                      className="gap-2"
                    >
                      {changingPw && <Loader2 className="h-4 w-4 animate-spin" />}
                      Şifreyi Değiştir
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5">
                <LogOut className="h-4 w-4" /> Çıkış
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto bg-muted/20">
            <AdminErrorBoundary>
              <Outlet />
            </AdminErrorBoundary>
          </main>
          <IdleTimeoutWarning isVisible={isWarningVisible} countdown={countdown} onExtend={resetTimer} />
        </div>
      </div>
    </SidebarProvider>
  );
}
