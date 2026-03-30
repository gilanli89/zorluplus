import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";
import {
  Loader2, TrendingUp, ShoppingCart, DollarSign, BarChart3,
} from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { formatPriceWithVAT } from "@/lib/pricing";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar,
} from "recharts";

// ── Component ───────────────────────────────────────────────────────────────

export default function AdminReports() {
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ["admin-report-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: inventory = [], isLoading: inventoryLoading } = useQuery({
    queryKey: ["admin-report-inventory"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("product_name");
      if (error) throw error;
      return data;
    },
  });

  const isLoading = ordersLoading || inventoryLoading;

  // ── Statistics ──────────────────────────────────────────────────────────

  const stats = useMemo(() => {
    const paidOrders = orders.filter((o: any) =>
      o.status === "paid" || o.status === "shipped" || o.status === "delivered"
    );
    const totalRevenue = paidOrders.reduce((sum: number, o: any) => sum + (Number(o.total_amount) || 0), 0);

    const now = new Date();
    const thisMonth = orders.filter((o: any) => {
      const d = new Date(o.created_at);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    const avgOrderValue = paidOrders.length > 0 ? totalRevenue / paidOrders.length : 0;

    // Top category from inventory
    const catCounts = new Map<string, number>();
    inventory.forEach((item: any) => {
      if (item.category) {
        catCounts.set(item.category, (catCounts.get(item.category) || 0) + 1);
      }
    });
    let topCategory = "N/A";
    let maxCount = 0;
    catCounts.forEach((count, cat) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = cat;
      }
    });

    return {
      totalRevenue,
      ordersThisMonth: thisMonth.length,
      avgOrderValue,
      topCategory,
    };
  }, [orders, inventory]);

  // ── Chart data: Sales over time (last 30 days) ─────────────────────────

  const salesOverTime = useMemo(() => {
    const days: Record<string, number> = {};
    const now = new Date();

    // Initialize last 30 days
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days[key] = 0;
    }

    orders.forEach((o: any) => {
      if (o.status === "cancelled" || o.status === "refunded") return;
      const key = new Date(o.created_at).toISOString().slice(0, 10);
      if (days[key] !== undefined) {
        days[key] += Number(o.total_amount) || 0;
      }
    });

    return Object.entries(days).map(([date, total]) => ({
      date: new Date(date).toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit" }),
      total: Math.round(total),
    }));
  }, [orders]);

  // ── Chart data: Sales by category ──────────────────────────────────────

  const salesByCategory = useMemo(() => {
    const catTotals = new Map<string, number>();

    orders.forEach((o: any) => {
      if (o.status === "cancelled" || o.status === "refunded") return;
      const items = Array.isArray(o.items) ? o.items : [];
      items.forEach((item: any) => {
        const cat = item.category || "Diger";
        catTotals.set(cat, (catTotals.get(cat) || 0) + (Number(item.price || item.unit_price || 0) * (item.quantity || 1)));
      });
      // If no items data, attribute to "Genel"
      if (items.length === 0) {
        catTotals.set("Genel", (catTotals.get("Genel") || 0) + (Number(o.total_amount) || 0));
      }
    });

    return Array.from(catTotals.entries())
      .map(([category, total]) => ({ category, total: Math.round(total) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);
  }, [orders]);

  // ── Top 5 selling products ─────────────────────────────────────────────

  const topProducts = useMemo(() => {
    const productSales = new Map<string, { name: string; quantity: number; revenue: number }>();

    orders.forEach((o: any) => {
      if (o.status === "cancelled" || o.status === "refunded") return;
      const items = Array.isArray(o.items) ? o.items : [];
      items.forEach((item: any) => {
        const name = item.name || item.product_name || "Urun";
        const existing = productSales.get(name) || { name, quantity: 0, revenue: 0 };
        existing.quantity += item.quantity || 1;
        existing.revenue += (Number(item.price || item.unit_price || 0) * (item.quantity || 1));
        productSales.set(name, existing);
      });
    });

    return Array.from(productSales.values())
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }, [orders]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Raporlar & Analiz</h1>
        <p className="text-sm text-muted-foreground mt-1">Satis verileri ve istatistikler</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card-premium card-premium-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <PremiumIconInline icon={DollarSign} size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Toplam Gelir</p>
              <p className="text-lg font-bold">{formatPriceWithVAT(stats.totalRevenue)}</p>
            </div>
          </div>
        </div>
        <div className="card-premium card-premium-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <PremiumIconInline icon={ShoppingCart} size={20} color="text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Bu Ay Siparis</p>
              <p className="text-lg font-bold">{stats.ordersThisMonth}</p>
            </div>
          </div>
        </div>
        <div className="card-premium card-premium-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <PremiumIconInline icon={TrendingUp} size={20} color="text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ort. Siparis Tutari</p>
              <p className="text-lg font-bold">{formatPriceWithVAT(stats.avgOrderValue)}</p>
            </div>
          </div>
        </div>
        <div className="card-premium card-premium-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <PremiumIconInline icon={BarChart3} size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">En Cok Kategori</p>
              <p className="text-lg font-bold truncate max-w-[140px]">{stats.topCategory}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Line Chart: Sales over time */}
        <div className="card-premium card-premium-border rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">Son 30 Gun Satis</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesOverTime}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  interval="preserveStartEnd"
                />
                <YAxis
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString("tr-TR")} TL`, "Satis"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Sales by category */}
        <div className="card-premium card-premium-border rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4">Kategoriye Gore Satis</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesByCategory} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis
                  type="number"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
                />
                <YAxis
                  type="category"
                  dataKey="category"
                  tick={{ fontSize: 11 }}
                  className="text-muted-foreground"
                  width={100}
                />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString("tr-TR")} TL`, "Satis"]}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.75rem",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top 5 Products */}
      <div className="card-premium card-premium-border rounded-2xl overflow-hidden">
        <div className="p-6 pb-3">
          <h2 className="font-semibold text-lg">En Cok Satan 5 Urun</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">#</th>
                <th className="text-left px-4 py-3 font-semibold">Urun</th>
                <th className="text-left px-4 py-3 font-semibold">Adet</th>
                <th className="text-left px-4 py-3 font-semibold">Gelir</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Badge variant={i === 0 ? "default" : "outline"} className="w-7 h-7 rounded-full flex items-center justify-center p-0">
                      {i + 1}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 font-medium max-w-[300px] truncate">{p.name}</td>
                  <td className="px-4 py-3">{p.quantity} adet</td>
                  <td className="px-4 py-3 font-semibold">{Number(p.revenue).toLocaleString("tr-TR")} TL</td>
                </tr>
              ))}
              {topProducts.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-muted-foreground">
                    Henuz satis verisi yok
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
