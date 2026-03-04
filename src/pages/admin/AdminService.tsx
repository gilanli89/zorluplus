import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { Constants } from "@/integrations/supabase/types";
import type { Database } from "@/integrations/supabase/types";

type ServiceStatus = Database["public"]["Enums"]["service_status"];

const STATUS_LABELS: Record<ServiceStatus, string> = {
  pending: "Beklemede",
  in_progress: "Devam Ediyor",
  completed: "Tamamlandı",
  cancelled: "İptal",
};

const STATUS_COLORS: Record<ServiceStatus, string> = {
  pending: "bg-warning/10 text-warning",
  in_progress: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  cancelled: "bg-destructive/10 text-destructive",
};

export default function AdminService() {
  const qc = useQueryClient();
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["admin-service"],
    queryFn: async () => {
      const { data, error } = await supabase.from("service_requests").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: ServiceStatus }) => {
      const { error } = await supabase.from("service_requests").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-service"] }); toast.success("Durum güncellendi"); },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="text-muted-foreground">Yükleniyor...</div>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Servis Talepleri</h1>
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Ad Soyad</th>
                <th className="text-left px-4 py-3 font-semibold">Telefon</th>
                <th className="text-left px-4 py-3 font-semibold">Ürün Tipi</th>
                <th className="text-left px-4 py-3 font-semibold">Marka</th>
                <th className="text-left px-4 py-3 font-semibold">Sorun</th>
                <th className="text-left px-4 py-3 font-semibold">Tercih Edilen Tarih</th>
                <th className="text-left px-4 py-3 font-semibold">Durum</th>
                <th className="text-left px-4 py-3 font-semibold">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(r => (
                <tr key={r.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{r.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.product_type || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{r.brand || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px] truncate">{r.issue_description}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{r.preferred_date ? format(new Date(r.preferred_date), "dd.MM.yyyy") : "—"}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={r.status}
                      onValueChange={v => updateStatus.mutate({ id: r.id, status: v as ServiceStatus })}
                    >
                      <SelectTrigger className="h-8 w-36">
                        <SelectValue>
                          <Badge variant="secondary" className={STATUS_COLORS[r.status as ServiceStatus]}>
                            {STATUS_LABELS[r.status as ServiceStatus]}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Constants.public.Enums.service_status.map(s => (
                          <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{format(new Date(r.created_at), "dd.MM.yyyy HH:mm")}</td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-muted-foreground">Henüz servis talebi yok</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
