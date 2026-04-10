import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { withTimeout } from "@/lib/adminQueryHelpers";
import { ShoppingCart, Package, Wrench, TrendingUp, LucideIcon } from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";
import { format } from "date-fns";
import PremiumIcon from "@/components/PremiumIcon";
import { Badge } from "@/components/ui/badge";

function StatCard({ stat }: { stat: { label: string; value: number; icon: LucideIcon; color: string } }) {
  const count = useCountUp(stat.value);
  return (
    <div className="card-premium card-premium-border rounded-2xl p-5">
      <div className="flex items-center gap-3 mb-2">
        <PremiumIcon icon={stat.icon} size="md" variant="glow" />
        <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
      </div>
      <p className="text-3xl font-bold text-foreground tabular-nums">{count.toLocaleString("tr-TR")}</p>
    </div>
  );
}

const STATUS_LABELS: Record<string, string> = {
  pending: "Beklemede",
  paid: "Ödendi",
  shipped: "Kargoda",
  delivered: "Teslim Edildi",
  cancelled: "İptal",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  paid: "bg-emerald-100 text-emerald-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminDashboard() {
  const { data: orderCount = 0 } = useQuery({
    queryKey: ["admin-orders-count"],
    queryFn: async () => {
      const { count } = await withTimeout(supabase.from("orders").select("*", { count: "exact", head: true }));
      return count ?? 0;
    },
  });

  const { data: inventoryCount = 0 } = useQuery({
    queryKey: ["admin-inventory-count"],
    queryFn: async () => {
      const { count } = await withTimeout(supabase.from("inventory").select("*", { count: "exact", head: true }));
      return count ?? 0;
    },
  });

  const { data: serviceCount = 0 } = useQuery({
    queryKey: ["admin-service-count"],
    queryFn: async () => {
      const { count } = await withTimeout(supabase.from("service_requests").select("*", { count: "exact", head: true }));
      return count ?? 0;
    },
  });

  const { data: lowStockCount = 0 } = useQuery({
    queryKey: ["admin-lowstock-count"],
    queryFn: async () => {
      const { data } = await withTimeout(supabase.from("inventory").select("id").lte("quantity", 5).eq("is_active", true));
      return data?.length ?? 0;
    },
  });

  const { data: recentOrders = [] } = useQuery({
    queryKey: ["admin-recent-orders"],
    queryFn: async () => {
      const { data } = await withTimeout(supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5));
      return data ?? [];
    },
  });

  const { data: recentServices = [] } = useQuery({
    queryKey: ["admin-recent-services"],
    queryFn: async () => {
      const { data } = await withTimeout(supabase.from("service_requests").select("*").order("created_at", { ascending: false }).limit(5));
      return data ?? [];
    },
  });

  const stats = [
    { label: "Siparişler", value: orderCount, icon: ShoppingCart, color: "text-primary" },
    { label: "Ürünler", value: inventoryCount, icon: Package, color: "text-accent" },
    { label: "Servis Talepleri", value: serviceCount, icon: Wrench, color: "text-warning" },
    { label: "Düşük Stok", value: lowStockCount, icon: TrendingUp, color: "text-destructive" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Yönetim Paneli</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      {/* Recent data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Orders */}
        <div className="card-premium card-premium-border rounded-2xl p-5">
          <h2 className="font-display font-bold text-foreground mb-4">Son Siparişler</h2>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-muted-foreground">Henüz sipariş yok</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((o: any) => (
                <div key={o.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{o.customer_name}</p>
                    <p className="text-xs text-muted-foreground">#{o.order_number} · {format(new Date(o.created_at), "dd.MM.yyyy HH:mm")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[10px] ${STATUS_COLORS[o.status] || "bg-muted text-muted-foreground"}`}>
                      {STATUS_LABELS[o.status] || o.status}
                    </Badge>
                    <span className="text-sm font-semibold whitespace-nowrap">{Number(o.total_amount).toLocaleString("tr-TR")} ₺</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Service Requests */}
        <div className="card-premium card-premium-border rounded-2xl p-5">
          <h2 className="font-display font-bold text-foreground mb-4">Son Servis Talepleri</h2>
          {recentServices.length === 0 ? (
            <p className="text-sm text-muted-foreground">Henüz servis talebi yok</p>
          ) : (
            <div className="space-y-3">
              {recentServices.map((s: any) => (
                <div key={s.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{s.full_name}</p>
                    <p className="text-xs text-muted-foreground">{s.brand} {s.product_type} · {format(new Date(s.created_at), "dd.MM.yyyy HH:mm")}</p>
                  </div>
                  <Badge className={`text-[10px] ${s.status === "pending" ? "bg-amber-100 text-amber-800" : s.status === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-muted text-muted-foreground"}`}>
                    {s.status === "pending" ? "Beklemede" : s.status === "completed" ? "Tamamlandı" : s.status === "in_progress" ? "Devam Ediyor" : s.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
