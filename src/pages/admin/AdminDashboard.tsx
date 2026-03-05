import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart, Package, Users, Wrench } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { format } from "date-fns";

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const orderIcon = new L.DivIcon({
  html: `<div style="background: hsl(142, 71%, 45%); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 3px solid white;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
  </div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -34],
});

const serviceIcon = new L.DivIcon({
  html: `<div style="background: hsl(221, 83%, 53%); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(0,0,0,0.3); border: 3px solid white;">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
  </div>`,
  className: "",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -34],
});

const branchIcon = new L.DivIcon({
  html: `<div style="background: hsl(24, 95%, 53%); width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 6px 16px rgba(0,0,0,0.35); border: 3px solid white;">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  </div>`,
  className: "",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -42],
});

const CYPRUS_CENTER: [number, number] = [35.17, 33.43];
const BRANCHES_GEO = [
  { name: "Zorlu Digital Plaza Lefkoşa", lat: 35.2024, lng: 33.3344 },
  { name: "Zorlu Digital Plaza Mağusa", lat: 35.1254, lng: 33.9414 },
];

function distributeCoord(index: number, total: number): [number, number] {
  const branch = BRANCHES_GEO[index % 2];
  const angle = (index / total) * Math.PI * 2 + index * 0.7;
  const radius = 0.01 + Math.random() * 0.04;
  return [branch.lat + Math.sin(angle) * radius, branch.lng + Math.cos(angle) * radius];
}

function FitBounds({ positions }: { positions: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (positions.length > 0) {
      const bounds = L.latLngBounds(positions.map(p => L.latLng(p[0], p[1])));
      BRANCHES_GEO.forEach(b => bounds.extend(L.latLng(b.lat, b.lng)));
      map.fitBounds(bounds, { padding: [40, 40] });
    } else {
      map.setView(CYPRUS_CENTER, 10);
    }
  }, [positions, map]);
  return null;
}

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

  // Map data
  const { data: orders = [] } = useQuery({
    queryKey: ["admin-map-orders"],
    queryFn: async () => {
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(50);
      return data ?? [];
    },
  });

  const { data: services = [] } = useQuery({
    queryKey: ["admin-map-services"],
    queryFn: async () => {
      const { data } = await supabase.from("service_requests").select("*").order("created_at", { ascending: false }).limit(50);
      return data ?? [];
    },
  });

  const orderPositions = useRef<Map<string, [number, number]>>(new Map());
  const servicePositions = useRef<Map<string, [number, number]>>(new Map());

  orders.forEach((o, i) => {
    if (!orderPositions.current.has(o.id)) {
      orderPositions.current.set(o.id, distributeCoord(i, Math.max(orders.length + services.length, 1)));
    }
  });
  services.forEach((s, i) => {
    if (!servicePositions.current.has(s.id)) {
      servicePositions.current.set(s.id, distributeCoord(i + orders.length, Math.max(orders.length + services.length, 1)));
    }
  });

  const allPositions: [number, number][] = [
    ...BRANCHES_GEO.map(b => [b.lat, b.lng] as [number, number]),
    ...Array.from(orderPositions.current.values()),
    ...Array.from(servicePositions.current.values()),
  ];

  const stats = [
    { label: "Siparişler", value: orderCount, icon: ShoppingCart, color: "text-primary" },
    { label: "Ürünler", value: inventoryCount, icon: Package, color: "text-accent" },
    { label: "Leadler", value: leadsCount, icon: Users, color: "text-success" },
    { label: "Servis Talepleri", value: serviceCount, icon: Wrench, color: "text-warning" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Yönetim Paneli</h1>
      
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className={`h-9 w-9 rounded-xl bg-muted flex items-center justify-center ${s.color}`}>
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium text-muted-foreground">{s.label}</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-display font-bold text-foreground">Kıbrıs Haritası</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(142, 71%, 45%)" }} />
              <span className="text-xs text-muted-foreground">Sipariş ({orders.length})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(221, 83%, 53%)" }} />
              <span className="text-xs text-muted-foreground">Servis ({services.length})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: "hsl(24, 95%, 53%)" }} />
              <span className="text-xs text-muted-foreground">Şube</span>
            </div>
          </div>
        </div>
        <div style={{ height: "500px" }}>
          <MapContainer center={CYPRUS_CENTER} zoom={10} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <FitBounds positions={allPositions} />

            {BRANCHES_GEO.map(b => (
              <Marker key={b.name} position={[b.lat, b.lng]} icon={branchIcon}>
                <Popup><div className="text-sm font-semibold">{b.name}</div></Popup>
              </Marker>
            ))}

            {orders.map(o => {
              const pos = orderPositions.current.get(o.id);
              if (!pos) return null;
              return (
                <Marker key={`order-${o.id}`} position={pos} icon={orderIcon}>
                  <Popup>
                    <div className="min-w-[180px]">
                      <div className="font-semibold text-sm mb-1">Sipariş #{o.order_number}</div>
                      <div className="text-xs text-gray-600">{o.customer_name}</div>
                      <div className="text-xs text-gray-600">{o.customer_phone}</div>
                      <div className="text-xs font-semibold mt-1">{Number(o.total_amount).toLocaleString("tr-TR")} TL</div>
                      <div className="text-[10px] text-gray-400 mt-1">{format(new Date(o.created_at), "dd.MM.yyyy HH:mm")}</div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}

            {services.map(s => {
              const pos = servicePositions.current.get(s.id);
              if (!pos) return null;
              return (
                <Marker key={`service-${s.id}`} position={pos} icon={serviceIcon}>
                  <Popup>
                    <div className="min-w-[180px]">
                      <div className="font-semibold text-sm mb-1">Servis Talebi</div>
                      <div className="text-xs text-gray-600">{s.full_name}</div>
                      <div className="text-xs text-gray-600">{s.phone}</div>
                      <div className="text-xs text-gray-600">{s.product_type} — {s.brand}</div>
                      <div className="text-[10px] text-gray-400 mt-1">{format(new Date(s.created_at), "dd.MM.yyyy HH:mm")}</div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
