import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import {
  Search, Loader2, Users, ShoppingBag, StickyNote, X,
} from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { formatPriceWithVAT } from "@/lib/pricing";

// ── Types ───────────────────────────────────────────────────────────────────

interface Customer {
  name: string;
  email: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  lastOrder: string;
  orders: any[];
}

// ── Component ───────────────────────────────────────────────────────────────

export default function AdminCustomers() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [notes, setNotes] = useState<Record<string, string[]>>(() => {
    try {
      return JSON.parse(localStorage.getItem("zorlu-customer-notes") || "{}");
    } catch {
      return {};
    }
  });
  const [newNote, setNewNote] = useState("");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const customers: Customer[] = useMemo(() => {
    const map = new Map<string, Customer>();

    orders.forEach((order: any) => {
      const key = order.customer_email || order.customer_phone || order.id;
      const existing = map.get(key);

      if (existing) {
        existing.orderCount++;
        existing.totalSpent += Number(order.total_amount) || 0;
        if (new Date(order.created_at) > new Date(existing.lastOrder)) {
          existing.lastOrder = order.created_at;
        }
        existing.orders.push(order);
      } else {
        map.set(key, {
          name: order.customer_name || "Misafir",
          email: order.customer_email || "",
          phone: order.customer_phone || "",
          orderCount: 1,
          totalSpent: Number(order.total_amount) || 0,
          lastOrder: order.created_at,
          orders: [order],
        });
      }
    });

    return Array.from(map.values()).sort((a, b) => b.totalSpent - a.totalSpent);
  }, [orders]);

  const filtered = useMemo(() => {
    if (!search) return customers;
    const q = search.toLowerCase();
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q)
    );
  }, [customers, search]);

  const openDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setSheetOpen(true);
    setNewNote("");
  };

  const customerKey = (c: Customer) => c.email || c.phone || c.name;

  const addNote = () => {
    if (!newNote.trim() || !selectedCustomer) return;
    const key = customerKey(selectedCustomer);
    const updated = {
      ...notes,
      [key]: [...(notes[key] || []), `[${new Date().toLocaleDateString("tr-TR")}] ${newNote.trim()}`],
    };
    setNotes(updated);
    localStorage.setItem("zorlu-customer-notes", JSON.stringify(updated));
    setNewNote("");
    toast.success("Not eklendi");
  };

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
          <h1 className="font-display text-2xl font-bold text-foreground">Musteri Yonetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">{customers.length} musteri</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Ad, email veya telefon ile ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="card-premium card-premium-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Musteri</th>
                <th className="text-left px-4 py-3 font-semibold">Email</th>
                <th className="text-left px-4 py-3 font-semibold">Telefon</th>
                <th className="text-left px-4 py-3 font-semibold">Siparis Sayisi</th>
                <th className="text-left px-4 py-3 font-semibold">Toplam Harcama</th>
                <th className="text-left px-4 py-3 font-semibold">Son Siparis</th>
                <th className="text-left px-4 py-3 font-semibold">Durum</th>
                <th className="text-left px-4 py-3 font-semibold">Islem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, idx) => {
                const daysSinceLastOrder = Math.floor(
                  (Date.now() - new Date(c.lastOrder).getTime()) / (1000 * 60 * 60 * 24)
                );
                const status =
                  daysSinceLastOrder <= 30
                    ? "Aktif"
                    : daysSinceLastOrder <= 90
                    ? "Pasif"
                    : "Kayip";
                const statusClass =
                  status === "Aktif"
                    ? "bg-success/10 text-success"
                    : status === "Pasif"
                    ? "bg-warning/10 text-warning"
                    : "bg-muted text-muted-foreground";

                return (
                  <tr key={idx} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                          {c.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{c.email || "\u2014"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{c.phone || "\u2014"}</td>
                    <td className="px-4 py-3 text-center">{c.orderCount}</td>
                    <td className="px-4 py-3 font-semibold">{Number(c.totalSpent).toLocaleString("tr-TR")} TL</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(c.lastOrder).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={statusClass}>{status}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button size="sm" variant="ghost" onClick={() => openDetail(c)}>
                        Detay
                      </Button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-muted-foreground">
                    {customers.length === 0 ? "Henuz musteri kaydı yok" : "Sonuc bulunamadi"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          {selectedCustomer && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                    {selectedCustomer.name.charAt(0).toUpperCase()}
                  </div>
                  {selectedCustomer.name}
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Contact Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Iletisim</h3>
                  <div className="space-y-1 text-sm">
                    {selectedCustomer.email && <p>Email: {selectedCustomer.email}</p>}
                    {selectedCustomer.phone && <p>Telefon: {selectedCustomer.phone}</p>}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-muted/50">
                    <p className="text-xs text-muted-foreground">Toplam Siparis</p>
                    <p className="text-lg font-bold">{selectedCustomer.orderCount}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50">
                    <p className="text-xs text-muted-foreground">Toplam Harcama</p>
                    <p className="text-lg font-bold">{formatPriceWithVAT(selectedCustomer.totalSpent)}</p>
                  </div>
                </div>

                {/* Order History */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <PremiumIconInline icon={ShoppingBag} size={16} /> Siparis Gecmisi
                  </h3>
                  <div className="space-y-2">
                    {selectedCustomer.orders.map((order: any) => (
                      <div key={order.id} className="p-3 rounded-xl border bg-background">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-mono text-xs text-muted-foreground">#{order.id.slice(0, 8)}</span>
                            <p className="text-sm font-medium">{Number(order.total_amount).toLocaleString("tr-TR")} TL</p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs">{order.status}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(order.created_at).toLocaleDateString("tr-TR")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-2">
                    <PremiumIconInline icon={StickyNote} size={16} /> Notlar
                  </h3>
                  <div className="space-y-2 mb-3">
                    {(notes[customerKey(selectedCustomer)] || []).map((note, i) => (
                      <div key={i} className="p-2 rounded-lg bg-muted/50 text-sm">{note}</div>
                    ))}
                    {!(notes[customerKey(selectedCustomer)] || []).length && (
                      <p className="text-sm text-muted-foreground">Henuz not yok</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Not ekle..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      rows={2}
                      className="text-sm"
                    />
                    <Button size="sm" onClick={addNote} disabled={!newNote.trim()} className="shrink-0">
                      Ekle
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
