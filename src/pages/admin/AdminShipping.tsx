import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import {
  Search, Loader2, Truck, Package, MapPin, Clock, CheckCircle2, ArrowRight,
} from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { createShipment, trackShipment } from "@/lib/hizliApi";

// ── Types ───────────────────────────────────────────────────────────────────

type ShippingStatus = "pending" | "picked_up" | "in_transit" | "delivered";

const STATUS_CONFIG: Record<ShippingStatus, { label: string; class: string; icon: typeof Package }> = {
  pending: { label: "Beklemede", class: "bg-warning/10 text-warning", icon: Clock },
  picked_up: { label: "Alindi", class: "bg-blue-500/10 text-blue-500", icon: Package },
  in_transit: { label: "Yolda", class: "bg-primary/10 text-primary", icon: Truck },
  delivered: { label: "Teslim Edildi", class: "bg-success/10 text-success", icon: CheckCircle2 },
};

interface TrackingEvent {
  date: string;
  status: string;
  location: string;
}

// ── Component ───────────────────────────────────────────────────────────────

export default function AdminShipping() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [trackingOrderId, setTrackingOrderId] = useState("");
  const [assigningId, setAssigningId] = useState<string | null>(null);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-shipping"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", ["paid", "shipped", "delivered"])
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const assignCourier = useMutation({
    mutationFn: async (orderId: string) => {
      setAssigningId(orderId);
      const order = orders.find((o: any) => o.id === orderId);
      if (!order) throw new Error("Siparis bulunamadi");

      const result = await createShipment(orderId, {
        pickup: "Zorlu Digital Plaza",
        delivery: (order as any).shipping_address || "Belirtilmemis",
        weight: 5,
      });

      const { error } = await supabase.from("orders").update({
        status: "shipped",
        tracking_id: result.trackingId,
      }).eq("id", orderId);
      if (error) throw error;

      return result;
    },
    onSuccess: (result) => {
      qc.invalidateQueries({ queryKey: ["admin-shipping"] });
      toast.success(`Kurye atandi - Takip: ${result.trackingId}`);
      setAssigningId(null);
    },
    onError: (e: Error) => {
      toast.error(e.message);
      setAssigningId(null);
    },
  });

  const openTracking = async (order: any) => {
    setTrackingOrderId(order.id.slice(0, 8));
    try {
      const trackingId = order.tracking_id || "HZL-MOCK";
      const info = await trackShipment(trackingId);
      setTrackingEvents(
        info.updates.map((u) => ({
          date: u.date,
          status: u.status,
          location: u.location,
        }))
      );
    } catch {
      setTrackingEvents([
        { date: new Date().toISOString(), status: "Siparis alindi", location: "Lefkosa" },
      ]);
    }
    setTrackingOpen(true);
  };

  const getShippingStatus = (order: any): ShippingStatus => {
    if (order.status === "delivered") return "delivered";
    if (order.status === "shipped") return order.tracking_id ? "in_transit" : "picked_up";
    return "pending";
  };

  const filtered = useMemo(() => {
    if (!search) return orders;
    const q = search.toLowerCase();
    return orders.filter((o: any) =>
      (o.customer_name || "").toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      (o.tracking_id || "").toLowerCase().includes(q)
    );
  }, [orders, search]);

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Kargo Yonetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">{orders.length} gonderi</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Siparis no, musteri veya takip kodu ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Shipping Table */}
      <div className="card-premium card-premium-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Siparis No</th>
                <th className="text-left px-4 py-3 font-semibold">Musteri</th>
                <th className="text-left px-4 py-3 font-semibold">Adres</th>
                <th className="text-left px-4 py-3 font-semibold">Durum</th>
                <th className="text-left px-4 py-3 font-semibold">Takip Kodu</th>
                <th className="text-left px-4 py-3 font-semibold">Kurye</th>
                <th className="text-left px-4 py-3 font-semibold">Islem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order: any) => {
                const status = getShippingStatus(order);
                const cfg = STATUS_CONFIG[status];
                return (
                  <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs">#{order.id.slice(0, 8)}</td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-medium">{order.customer_name || "Misafir"}</span>
                        {order.customer_phone && (
                          <span className="text-xs text-muted-foreground block">{order.customer_phone}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground max-w-[200px] truncate">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {order.shipping_address || "Belirtilmemis"}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={cfg.class}>{cfg.label}</Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {order.tracking_id || "\u2014"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {order.tracking_id ? "Hizli Kurye" : "\u2014"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {status === "pending" && (
                          <Button
                            size="sm"
                            variant="default"
                            className="gap-1 rounded-full"
                            disabled={assigningId === order.id}
                            onClick={() => assignCourier.mutate(order.id)}
                          >
                            {assigningId === order.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <Truck className="h-3 w-3" />
                            )}
                            Kurye Ata
                          </Button>
                        )}
                        {order.tracking_id && (
                          <Button size="sm" variant="ghost" onClick={() => openTracking(order)} className="gap-1">
                            <Package className="h-3 w-3" /> Takip
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    Gonderi bulunamadi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tracking Detail Dialog */}
      <Dialog open={trackingOpen} onOpenChange={setTrackingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <PremiumIconInline icon={Truck} size={20} /> Kargo Takip - #{trackingOrderId}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {trackingEvents.length > 0 ? (
              <div className="relative pl-6">
                {/* Timeline line */}
                <div className="absolute left-[9px] top-2 bottom-2 w-0.5 bg-border" />
                <div className="space-y-4">
                  {trackingEvents.map((event, i) => (
                    <div key={i} className="relative">
                      <div className={`absolute -left-6 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        i === 0 ? "bg-primary border-primary" : "bg-background border-border"
                      }`}>
                        {i === 0 && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">{event.status}</p>
                        <p className="text-xs text-muted-foreground">{event.location}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleString("tr-TR")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center">Takip bilgisi bulunamadi</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
