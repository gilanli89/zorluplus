import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Database, RefreshCw, RotateCcw, Loader2, Clock, Package } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface Snapshot {
  id: string;
  snapshot_at: string;
  product_count: number;
  created_at: string;
}

export default function AdminBackups() {
  const queryClient = useQueryClient();
  const [restoreId, setRestoreId] = useState<string | null>(null);
  const [restoring, setRestoring] = useState(false);
  const [creatingSnapshot, setCreatingSnapshot] = useState(false);

  const { data: snapshots, isLoading } = useQuery({
    queryKey: ["inventory-snapshots"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory_snapshots")
        .select("id, snapshot_at, product_count, created_at")
        .order("snapshot_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return data as Snapshot[];
    },
  });

  const handleCreateSnapshot = async () => {
    try {
      setCreatingSnapshot(true);
      const { error } = await supabase.rpc("create_inventory_snapshot");
      if (error) throw error;
      toast.success("Manuel yedek oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["inventory-snapshots"] });
    } catch (e: any) {
      toast.error("Yedek oluşturulamadı: " + e.message);
    } finally {
      setCreatingSnapshot(false);
    }
  };

  const handleRestore = async () => {
    if (!restoreId) return;
    try {
      setRestoring(true);
      const { data, error } = await supabase.functions.invoke("restore-inventory", {
        body: { snapshot_id: restoreId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`Geri yükleme tamamlandı: ${data.updated} ürün güncellendi`);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setRestoreId(null);
    } catch (e: any) {
      toast.error("Geri yükleme başarısız: " + e.message);
    } finally {
      setRestoring(false);
    }
  };

  const selectedSnapshot = snapshots?.find((s) => s.id === restoreId);

  // Group snapshots by day
  const groupedByDay = (snapshots || []).reduce<Record<string, Snapshot[]>>((acc, s) => {
    const day = format(new Date(s.snapshot_at), "yyyy-MM-dd");
    if (!acc[day]) acc[day] = [];
    acc[day].push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6" /> Envanter Yedekleri
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Her saat başı otomatik yedeklenir. Son 5 güne kadar geri dönülebilir.
          </p>
        </div>
        <Button onClick={handleCreateSnapshot} disabled={creatingSnapshot} className="gap-2">
          {creatingSnapshot ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Manuel Yedek Al
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Yedekler yükleniyor...
        </div>
      ) : !snapshots?.length ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Henüz yedek bulunmuyor. İlk yedek 1 saat içinde otomatik oluşturulacak.
          </CardContent>
        </Card>
      ) : (
        Object.entries(groupedByDay).map(([day, daySnapshots]) => (
          <Card key={day}>
            <CardHeader className="py-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {format(new Date(day), "d MMMM yyyy, EEEE", { locale: tr })}
                <span className="text-xs text-muted-foreground font-normal">({daySnapshots.length} yedek)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Saat</TableHead>
                    <TableHead>Ürün Sayısı</TableHead>
                    <TableHead className="text-right">İşlem</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {daySnapshots.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">
                        {format(new Date(s.snapshot_at), "HH:mm")}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-1">
                          <Package className="h-3.5 w-3.5 text-muted-foreground" />
                          {s.product_count}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRestoreId(s.id)}
                          className="gap-1.5"
                        >
                          <RotateCcw className="h-3.5 w-3.5" /> Geri Yükle
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ))
      )}

      {/* Restore confirmation dialog */}
      <Dialog open={!!restoreId} onOpenChange={(open) => !open && !restoring && setRestoreId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Envanter Geri Yükleme</DialogTitle>
            <DialogDescription>
              {selectedSnapshot && (
                <>
                  <strong>
                    {format(new Date(selectedSnapshot.snapshot_at), "d MMMM yyyy HH:mm", { locale: tr })}
                  </strong>{" "}
                  tarihindeki yedeğe geri dönülecek. Bu işlem mevcut stok miktarlarını, fiyatları ve ürün bilgilerini
                  değiştirecektir.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
            ⚠️ Bu işlem geri alınamaz. Devam etmeden önce mevcut durumun yedeğini almak isteyebilirsiniz.
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRestoreId(null)} disabled={restoring}>
              İptal
            </Button>
            <Button variant="destructive" onClick={handleRestore} disabled={restoring} className="gap-2">
              {restoring && <Loader2 className="h-4 w-4 animate-spin" />}
              Geri Yükle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
