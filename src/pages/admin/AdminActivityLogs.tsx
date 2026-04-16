import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { withTimeout } from "@/lib/adminQueryHelpers";
import { format, startOfDay, endOfDay } from "date-fns";
import { tr } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronLeft, ChevronRight, Activity, CalendarIcon, X, Download } from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { toast } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const ENTITY_LABELS: Record<string, string> = {
  order: "Sipariş",
  inventory: "Stok",
  user: "Kullanıcı",
  user_role: "Rol",
  service_request: "Servis",
  lead: "Talep",
  leave_request: "İzin",
  self: "Hesap",
  session: "Oturum",
};

const ACTION_LABELS: Record<string, string> = {
  order_status_update: "Sipariş durumu güncellendi",
  inventory_create: "Ürün eklendi",
  inventory_update: "Ürün güncellendi",
  inventory_delete: "Ürün silindi",
  inventory_batch_publish: "Toplu yayınlama",
  inventory_batch_unpublish: "Toplu gizleme",
  user_create: "Kullanıcı oluşturuldu",
  user_ban: "Kullanıcı askıya alındı",
  user_unban: "Kullanıcı aktifleştirildi",
  user_delete: "Kullanıcı silindi",
  user_password_reset: "Şifre sıfırlandı",
  role_change: "Rol değiştirildi",
  service_status_update: "Servis durumu güncellendi",
  lead_status_update: "Talep durumu güncellendi",
  leave_approve: "İzin onaylandı",
  leave_reject: "İzin reddedildi",
  self_password_change: "Şifre değiştirildi",
  idle_timeout_logout: "Hareketsizlik nedeniyle oturum kapatıldı",
};

const PAGE_SIZE = 25;

export default function AdminActivityLogs() {
  const [page, setPage] = useState(0);
  const [entityFilter, setEntityFilter] = useState("all");
  const [searchEmail, setSearchEmail] = useState("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  const { data, isLoading } = useQuery({
    queryKey: ["activity-logs", page, entityFilter, searchEmail, dateFrom?.toISOString(), dateTo?.toISOString()],
    queryFn: async () => {
      let query = supabase
        .from("activity_logs")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      if (entityFilter !== "all") {
        query = query.eq("entity_type", entityFilter);
      }
      if (searchEmail.trim()) {
        query = query.ilike("user_email", `%${searchEmail.trim()}%`);
      }
      if (dateFrom) {
        query = query.gte("created_at", startOfDay(dateFrom).toISOString());
      }
      if (dateTo) {
        query = query.lte("created_at", endOfDay(dateTo).toISOString());
      }

      const { data, error, count } = await withTimeout(query);
      if (error) throw error;
      return { logs: data || [], total: count || 0 };
    },
  });

  const logs = data?.logs || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const clearDates = () => {
    setDateFrom(undefined);
    setDateTo(undefined);
    setPage(0);
  };

  const [exporting, setExporting] = useState(false);

  const exportCSV = useCallback(async () => {
    setExporting(true);
    try {
      let query = supabase
        .from("activity_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5000);

      if (entityFilter !== "all") query = query.eq("entity_type", entityFilter);
      if (searchEmail.trim()) query = query.ilike("user_email", `%${searchEmail.trim()}%`);
      if (dateFrom) query = query.gte("created_at", startOfDay(dateFrom).toISOString());
      if (dateTo) query = query.lte("created_at", endOfDay(dateTo).toISOString());

      const { data: rows, error } = await query;
      if (error) throw error;
      if (!rows?.length) { toast.error("Dışa aktarılacak kayıt bulunamadı"); return; }

      const header = "Tarih,Kullanıcı,İşlem,Modül,Varlık ID,Detay";
      const csvRows = rows.map((r: any) => {
        const date = format(new Date(r.created_at), "dd.MM.yyyy HH:mm");
        const action = ACTION_LABELS[r.action] || r.action;
        const entity = ENTITY_LABELS[r.entity_type] || r.entity_type;
        const details = r.details && Object.keys(r.details).length > 0
          ? JSON.stringify(r.details).replace(/"/g, '""')
          : "";
        return `"${date}","${r.user_email}","${action}","${entity}","${r.entity_id || ""}","${details}"`;
      });

      const bom = "\uFEFF";
      const blob = new Blob([bom + header + "\n" + csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `aktivite-loglari-${format(new Date(), "yyyy-MM-dd")}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success(`${rows.length} kayıt dışa aktarıldı`);
    } catch (e: any) {
      toast.error(e.message || "Dışa aktarma hatası");
    } finally {
      setExporting(false);
    }
  }, [entityFilter, searchEmail, dateFrom, dateTo]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <PremiumIconInline icon={Activity} size={24} />
        <h1 className="font-display text-2xl font-bold text-foreground">Aktivite Logları</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <Select value={entityFilter} onValueChange={v => { setEntityFilter(v); setPage(0); }}>
          <SelectTrigger className="w-44 h-9">
            <SelectValue placeholder="Tüm Modüller" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Modüller</SelectItem>
            {Object.entries(ENTITY_LABELS).map(([k, v]) => (
              <SelectItem key={k} value={k}>{v}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          placeholder="E-posta ara..."
          value={searchEmail}
          onChange={e => { setSearchEmail(e.target.value); setPage(0); }}
          className="w-56 h-9"
        />

        {/* Date From */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("h-9 w-40 justify-start text-left font-normal", !dateFrom && "text-muted-foreground")}
            >
              <PremiumIconInline icon={CalendarIcon} size={16} className="mr-2" />
              {dateFrom ? format(dateFrom, "dd.MM.yyyy") : "Başlangıç"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={(d) => { setDateFrom(d); setPage(0); }}
              disabled={(date) => dateTo ? date > dateTo : false}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        {/* Date To */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("h-9 w-40 justify-start text-left font-normal", !dateTo && "text-muted-foreground")}
            >
              <PremiumIconInline icon={CalendarIcon} size={16} className="mr-2" />
              {dateTo ? format(dateTo, "dd.MM.yyyy") : "Bitiş"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={(d) => { setDateTo(d); setPage(0); }}
              disabled={(date) => dateFrom ? date < dateFrom : false}
              initialFocus
              className={cn("p-3 pointer-events-auto")}
            />
          </PopoverContent>
        </Popover>

        {(dateFrom || dateTo) && (
          <Button variant="ghost" size="sm" onClick={clearDates} className="h-9 gap-1 text-muted-foreground">
            <X className="h-3.5 w-3.5" /> Temizle
          </Button>
        )}

        <Button variant="outline" size="sm" onClick={exportCSV} disabled={exporting} className="h-9 gap-1.5">
          <PremiumIconInline icon={Download} size={14} />
          {exporting ? "Aktarılıyor..." : "CSV İndir"}
        </Button>

        <span className="text-sm text-muted-foreground self-center ml-auto">
          Toplam: {total} kayıt
        </span>
      </div>

      {/* Table */}
      <div className="card-premium card-premium-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Tarih</th>
                <th className="text-left px-4 py-3 font-semibold">Kullanıcı</th>
                <th className="text-left px-4 py-3 font-semibold">İşlem</th>
                <th className="text-left px-4 py-3 font-semibold">Modül</th>
                <th className="text-left px-4 py-3 font-semibold">Detay</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">Yükleniyor...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-muted-foreground">Henüz log kaydı yok</td></tr>
              ) : logs.map((log: any) => (
                <tr key={log.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3 text-muted-foreground text-xs whitespace-nowrap">
                    {format(new Date(log.created_at), "dd.MM.yyyy HH:mm", { locale: tr })}
                  </td>
                  <td className="px-4 py-3 text-xs">{log.user_email}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-xs">
                      {ACTION_LABELS[log.action] || log.action}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {ENTITY_LABELS[log.entity_type] || log.entity_type}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground max-w-[300px] truncate">
                    {log.details && Object.keys(log.details).length > 0
                      ? JSON.stringify(log.details)
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={() => setPage(p => p - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            {page + 1} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={() => setPage(p => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
