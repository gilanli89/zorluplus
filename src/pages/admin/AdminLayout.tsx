import { useEffect, useState } from "react";
import { Outlet, useNavigate, Link, useLocation } from "react-router-dom";
import { ShoppingCart, Package, Wrench, LogOut, LayoutDashboard, Users, Shield } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/Logo";

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
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { title: "Özet", url: "/admin", icon: LayoutDashboard },
  { title: "Siparişler", url: "/admin/siparisler", icon: ShoppingCart },
  { title: "Stok Yönetimi", url: "/admin/stok", icon: Package },
  { title: "Servis Talepleri", url: "/admin/servis", icon: Wrench },
  { title: "Kullanıcılar", url: "/admin/kullanicilar", icon: Users },
  { title: "Roller", url: "/admin/roller", icon: Shield },
];

export default function AdminLayout() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/giris");
    }
  }, [user, isAdmin, loading, navigate]);

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
                  {NAV_ITEMS.map(item => {
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
              <Button variant="ghost" size="sm" onClick={signOut} className="gap-1.5">
                <LogOut className="h-4 w-4" /> Çıkış
              </Button>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto bg-muted/20">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
