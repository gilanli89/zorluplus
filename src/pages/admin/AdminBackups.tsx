import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Database, RefreshCw, RotateCcw, Loader2, Clock, Package, ShoppingCart, Wrench } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

interface Snapshot {
  id: string;
  snapshot_at: string;
  count: number;
  created_at: string;
}

type BackupType = "inventory" | "orders" | "services";

const TAB_CONFIG: Record<BackupType, {
  label: string;
  icon: React.ReactNode;
  table: string;
  countField: string;
  queryKey: string;
  restoreFunction: string;
  restoreEntityType: string;
  invalidateKey: string;
}> = {
  inventory: {
    label: "Envanter",
    icon: <Package className="h-4 w-4" />,
    table: "inventory_snapshots",
    countField: "product_count",
    queryKey: "inventory-snapshots",
    restoreFunction: "restore-inventory",
    restoreEntityType: "inventory_snapshot",
    invalidateKey: "products",
  },
  orders: {
    label: "Siparişler",
    icon: <ShoppingCart className="h-4 w-4" />,
    table: "order_snapshots",
    countField: "order_count",
    queryKey: "order-snapshots",
    restoreFunction: "restore-orders",
    restoreEntityType: "order_snapshot",
    invalidateKey: "orders",
  },
  services: {
    label: "Servis Talepleri",
    icon: <Wrench className="h-4 w-4" />,
    table: "service_snapshots",
    countField: "request_count",
    queryKey: "service-snapshots",
    restoreFunction: "restore-services",
    restoreEntityType: "service_snapshot",
    invalidateKey: "service-requests",
  },
};

function useSnapshots(type: BackupType) {
  const config = TAB_CONFIG[type];
  return useQuery({
    queryKey: [config.queryKey],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(config.table as any)
        .select(`id, snapshot_at, ${config.countField}, created_at`)
        .order("snapshot_at", { ascending: false })
        .limit(200);
      if (error) throw error;
      return (data as any[]).map((s) => ({
        id: s.id,
        snapshot_at: s.snapshot_at,
        count: s[config.countField],
        created_at: s.created_at,
      })) as Snapshot[];
    },
  });
}

function groupByDay(snapshots: Snapshot[]) {
  return snapshots.reduce<Record<string, Snapshot[]>>((acc, s) => {
    const day = format(new Date(s.snapshot_at), "yyyy-MM-dd");
    if (!acc[day]) acc[day] = [];
    acc[day].push(s);
    return acc;
  }, {});
}

export default function AdminBackups() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<BackupType>("inventory");
  const [restoreId, setRestoreId] = useState<string | null>(null);
  const [restoreType, setRestoreType] = useState<BackupType>("inventory");
  const [restoring, setRestoring] = useState(false);
  const [creatingSnapshot, setCreatingSnapshot] = useState(false);

  const inventoryQuery = useSnapshots("inventory");
  const ordersQuery = useSnapshots("orders");
  const servicesQuery = useSnapshots("services");

  const queries: Record<BackupType, ReturnType<typeof useSnapshots>> = {
    inventory: inventoryQuery,
    orders: ordersQuery,
    services: servicesQuery,
  };

  const handleCreateSnapshot = async () => {
    try {
      setCreatingSnapshot(true);
      const { error } = await supabase.rpc("create_full_backup" as any);
      if (error) throw error;
      toast.success("Tam yedek oluşturuldu (envanter + siparişler + servis)");
      queryClient.invalidateQueries({ queryKey: ["inventory-snapshots"] });
      queryClient.invalidateQueries({ queryKey: ["order-snapshots"] });
      queryClient.invalidateQueries({ queryKey: ["service-snapshots"] });
    } catch (e: any) {
      toast.error("Yedek oluşturulamadı: " + e.message);
    } finally {
      setCreatingSnapshot(false);
    }
  };

  const handleRestore = async () => {
    if (!restoreId) return;
    const config = TAB_CONFIG[restoreType];
    try {
      setRestoring(true);
      const { data, error } = await supabase.functions.invoke(config.restoreFunction, {
        body: { snapshot_id: restoreId },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      toast.success(`Geri yükleme tamamlandı: ${data.updated} kayıt güncellendi`);
      queryClient.invalidateQueries({ queryKey: [config.invalidateKey] });
      setRestoreId(null);
    } catch (e: any) {
      toast.error("Geri yükleme başarısız: " + e.message);
    } finally {
      setRestoring(false);
    }
  };

  const openRestore = (id: string, type: BackupType) => {
    setRestoreType(type);
    setRestoreId(id);
  };

  const currentQuery = queries[restoreType];
  const selectedSnapshot = currentQuery.data?.find((s) => s.id === restoreId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Database className="h-6 w-6" /> Yedekleme Merkezi
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

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as BackupType)}>
        <TabsList>
          <TabsTrigger value="inventory" className="gap-1.5">
            <Package className="h-4 w-4" /> Envanter
          </TabsTrigger>
          <TabsTrigger value="orders" className="gap-1.5">
            <ShoppingCart className="h-4 w-4" /> Siparişler
          </TabsTrigger>
          <TabsTrigger value="services" className="gap-1.5">
            <Wrench className="h-4 w-4" /> Servis
          </TabsTrigger>
        </TabsList>

        {(["inventory", "orders", "services"] as BackupType[]).map((type) => {
          const query = queries[type];
          const config = TAB_CONFIG[type];
          const grouped = groupByDay(query.data || []);

          return (
            <TabsContent key={type} value={type} className="space-y-4">
              {query.isLoading ? (
                <div className="flex items-center justify-center py-12 text-muted-foreground">
                  <Loader2 className="h-5 w-5 animate-spin mr-2" /> Yedekler yükleniyor...
                </div>
              ) : !query.data?.length ? (
                <Card>
                  <CardContent className="py-12 text-center text-muted-foreground">
                    Henüz {config.label.toLowerCase()} yedeği bulunmuyor. İlk yedek 1 saat içinde otomatik oluşturulacak.
                  </CardContent>
                </Card>
              ) : (
                Object.entries(grouped).map(([day, daySnapshots]) => (
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
                            <TableHead>Kayıt Sayısı</TableHead>
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
                                  {config.icon}
                                  {s.count}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => openRestore(s.id, type)}
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
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Restore confirmation dialog */}
      <Dialog open={!!restoreId} onOpenChange={(open) => !open && !restoring && setRestoreId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{TAB_CONFIG[restoreType].label} Geri Yükleme</DialogTitle>
            <DialogDescription>
              {selectedSnapshot && (
                <>
                  <strong>
                    {format(new Date(selectedSnapshot.snapshot_at), "d MMMM yyyy HH:mm", { locale: tr })}
                  </strong>{" "}
                  tarihindeki yedeğe geri dönülecek. Bu işlem mevcut {TAB_CONFIG[restoreType].label.toLowerCase()} verilerini
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
