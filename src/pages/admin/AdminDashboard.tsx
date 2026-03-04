import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Package, Users, Wrench } from "lucide-react";

export default function AdminDashboard() {
  const { data: orderCount = 0 } = useQuery({
    queryKey: ["admin-orders-count"],
    queryFn: async () => {
      const { count } = await supabase.from("orders").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: inventoryCount = 0 } = useQuery({
    queryKey: ["admin-inventory-count"],
    queryFn: async () => {
      const { count } = await supabase.from("inventory").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: leadsCount = 0 } = useQuery({
    queryKey: ["admin-leads-count"],
    queryFn: async () => {
      const { count } = await supabase.from("leads").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const { data: serviceCount = 0 } = useQuery({
    queryKey: ["admin-service-count"],
    queryFn: async () => {
      const { count } = await supabase.from("service_requests").select("*", { count: "exact", head: true });
      return count ?? 0;
    },
  });

  const stats = [
    { label: "Siparişler", value: orderCount, icon: ShoppingCart, color: "text-primary" },
    { label: "Stok Ürün", value: inventoryCount, icon: Package, color: "text-accent" },
    { label: "Müşteri Talepleri", value: leadsCount, icon: Users, color: "text-success" },
    { label: "Servis Talepleri", value: serviceCount, icon: Wrench, color: "text-warning" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Yönetim Paneli</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className={`h-10 w-10 rounded-xl bg-muted flex items-center justify-center ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
