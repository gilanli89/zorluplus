import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { logActivity } from "@/lib/activityLogger";
import { format } from "date-fns";
import { Constants } from "@/integrations/supabase/types";
import type { Database } from "@/integrations/supabase/types";

type OrderStatus = Database["public"]["Enums"]["order_status"];

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Beklemede",
  paid: "Ödendi",
  shipped: "Kargoda",
  delivered: "Teslim Edildi",
  cancelled: "İptal",
  refunded: "İade",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: "bg-warning/10 text-warning",
  paid: "bg-success/10 text-success",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
  refunded: "bg-muted text-muted-foreground",
};

export default function AdminOrders() {
  const qc = useQueryClient();
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: OrderStatus }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_data, variables) => { qc.invalidateQueries({ queryKey: ["admin-orders"] }); toast.success("Durum güncellendi"); logActivity("order_status_update", "order", variables.id, { new_status: variables.status }); },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="text-muted-foreground">Yükleniyor...</div>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Siparişler</h1>
      <div className="card-premium card-premium-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Sipariş No</th>
                <th className="text-left px-4 py-3 font-semibold">Müşteri</th>
                <th className="text-left px-4 py-3 font-semibold">Telefon</th>
                <th className="text-left px-4 py-3 font-semibold">Toplam</th>
                <th className="text-left px-4 py-3 font-semibold">Ödeme</th>
                <th className="text-left px-4 py-3 font-semibold">Durum</th>
                <th className="text-left px-4 py-3 font-semibold">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs">{o.order_number}</td>
                  <td className="px-4 py-3">{o.customer_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.customer_phone || "—"}</td>
                  <td className="px-4 py-3 font-semibold">{Number(o.total_amount).toLocaleString("tr-TR")} TL</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{o.payment_method || "—"}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={o.status}
                      onValueChange={v => updateStatus.mutate({ id: o.id, status: v as OrderStatus })}
                    >
                      <SelectTrigger className="h-8 w-36">
                        <SelectValue>
                          <Badge variant="secondary" className={STATUS_COLORS[o.status as OrderStatus]}>
                            {STATUS_LABELS[o.status as OrderStatus]}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Constants.public.Enums.order_status.map(s => (
                          <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{format(new Date(o.created_at), "dd.MM.yyyy HH:mm")}</td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr><td colSpan={7} className="text-center py-8 text-muted-foreground">Henüz sipariş yok</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
