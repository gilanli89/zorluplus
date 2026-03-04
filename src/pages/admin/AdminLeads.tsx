import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { Constants } from "@/integrations/supabase/types";
import type { Database } from "@/integrations/supabase/types";

type LeadStatus = Database["public"]["Enums"]["lead_status"];
type LeadSource = Database["public"]["Enums"]["lead_source"];

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Yeni",
  contacted: "İletişime Geçildi",
  qualified: "Nitelikli",
  converted: "Dönüştürüldü",
  lost: "Kayıp",
};

const SOURCE_LABELS: Record<LeadSource, string> = {
  zorluplus: "ZorluPlus",
  zorluservis: "Servis",
  whatsapp: "WhatsApp",
  phone: "Telefon",
  other: "Diğer",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-warning/10 text-warning",
  qualified: "bg-accent/10 text-accent",
  converted: "bg-success/10 text-success",
  lost: "bg-destructive/10 text-destructive",
};

export default function AdminLeads() {
  const qc = useQueryClient();
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: LeadStatus }) => {
      const { error } = await supabase.from("leads").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["admin-leads"] }); toast.success("Durum güncellendi"); },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) return <div className="text-muted-foreground">Yükleniyor...</div>;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Müşteri Talepleri</h1>
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Ad Soyad</th>
                <th className="text-left px-4 py-3 font-semibold">Telefon</th>
                <th className="text-left px-4 py-3 font-semibold">E-posta</th>
                <th className="text-left px-4 py-3 font-semibold">Kaynak</th>
                <th className="text-left px-4 py-3 font-semibold">İlgi Alanı</th>
                <th className="text-left px-4 py-3 font-semibold">Mesaj</th>
                <th className="text-left px-4 py-3 font-semibold">Durum</th>
                <th className="text-left px-4 py-3 font-semibold">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {leads.map(l => (
                <tr key={l.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium">{l.full_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.phone || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{l.email || "—"}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline">{SOURCE_LABELS[l.source as LeadSource] || l.source}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-[150px] truncate">{l.product_interest || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs max-w-[200px] truncate">{l.message || "—"}</td>
                  <td className="px-4 py-3">
                    <Select
                      value={l.status}
                      onValueChange={v => updateStatus.mutate({ id: l.id, status: v as LeadStatus })}
                    >
                      <SelectTrigger className="h-8 w-40">
                        <SelectValue>
                          <Badge variant="secondary" className={STATUS_COLORS[l.status as LeadStatus]}>
                            {STATUS_LABELS[l.status as LeadStatus]}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Constants.public.Enums.lead_status.map(s => (
                          <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{format(new Date(l.created_at), "dd.MM.yyyy HH:mm")}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={8} className="text-center py-8 text-muted-foreground">Henüz talep yok</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
