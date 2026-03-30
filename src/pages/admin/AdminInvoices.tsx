import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import {
  FileText, Download, Loader2, DollarSign, Clock, CheckCircle, XCircle,
} from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import { generateInvoice, type InvoiceData } from "@/lib/invoiceGenerator";
import { formatPriceWithVAT } from "@/lib/pricing";

// ── Types ───────────────────────────────────────────────────────────────────

type InvoiceStatus = "paid" | "pending" | "cancelled";

interface InvoiceRow {
  id: string;
  invoiceNumber: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  amount: number;
  status: InvoiceStatus;
  items: { name: string; quantity: number; unitPrice: number; total: number }[];
  paymentMethod: string;
}

const STATUS_CONFIG: Record<InvoiceStatus, { label: string; class: string; icon: typeof CheckCircle }> = {
  paid: { label: "Odendi", class: "bg-success/10 text-success", icon: CheckCircle },
  pending: { label: "Beklemede", class: "bg-warning/10 text-warning", icon: Clock },
  cancelled: { label: "Iptal", class: "bg-destructive/10 text-destructive", icon: XCircle },
};

const TABS: { value: "all" | InvoiceStatus; label: string }[] = [
  { value: "all", label: "Tumunu Gor" },
  { value: "paid", label: "Odendi" },
  { value: "pending", label: "Beklemede" },
  { value: "cancelled", label: "Iptal" },
];

// ── Component ───────────────────────────────────────────────────────────────

export default function AdminInvoices() {
  const [activeTab, setActiveTab] = useState<"all" | InvoiceStatus>("all");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["admin-invoices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const invoices: InvoiceRow[] = useMemo(() => {
    return orders.map((order: any) => {
      let status: InvoiceStatus = "pending";
      if (order.status === "paid" || order.status === "delivered" || order.status === "shipped") status = "paid";
      else if (order.status === "cancelled" || order.status === "refunded") status = "cancelled";

      const items = Array.isArray(order.items)
        ? order.items.map((item: any) => ({
            name: item.name || item.product_name || "Urun",
            quantity: item.quantity || 1,
            unitPrice: item.price || item.unit_price || 0,
            total: (item.quantity || 1) * (item.price || item.unit_price || 0),
          }))
        : [{ name: "Siparis", quantity: 1, unitPrice: Number(order.total_amount) || 0, total: Number(order.total_amount) || 0 }];

      return {
        id: order.id,
        invoiceNumber: `ZDPF-${new Date(order.created_at).getFullYear()}-${order.id.slice(0, 6).toUpperCase()}`,
        date: order.created_at,
        customerName: order.customer_name || "Misafir",
        customerEmail: order.customer_email || "",
        customerPhone: order.customer_phone || "",
        customerAddress: order.shipping_address || "",
        amount: Number(order.total_amount) || 0,
        status,
        items,
        paymentMethod: order.payment_method || "Nakit",
      };
    });
  }, [orders]);

  const filtered = useMemo(() => {
    if (activeTab === "all") return invoices;
    return invoices.filter((inv) => inv.status === activeTab);
  }, [invoices, activeTab]);

  const summaries = useMemo(() => {
    const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
    const paid = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
    const pending = invoices.filter((inv) => inv.status === "pending").reduce((sum, inv) => sum + inv.amount, 0);
    return { total, paid, pending };
  }, [invoices]);

  const handleDownload = (inv: InvoiceRow) => {
    try {
      const vatRate = 0.20;
      const subtotal = inv.amount / (1 + vatRate);
      const vatAmount = inv.amount - subtotal;

      const invoiceData: InvoiceData = {
        invoiceNumber: inv.invoiceNumber,
        date: new Date(inv.date).toLocaleDateString("tr-TR"),
        customer: {
          name: inv.customerName,
          phone: inv.customerPhone,
          email: inv.customerEmail,
          address: inv.customerAddress,
        },
        items: inv.items,
        subtotal,
        vatRate,
        vatAmount,
        total: inv.amount,
        paymentMethod: inv.paymentMethod,
      };
      generateInvoice(invoiceData);
      toast.success("Fatura PDF olarak indirildi");
    } catch (e: any) {
      toast.error("Fatura olusturulamadi: " + e.message);
    }
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
      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">Fatura Yonetimi</h1>
        <p className="text-sm text-muted-foreground mt-1">{invoices.length} fatura</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="card-premium card-premium-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <PremiumIconInline icon={DollarSign} size={20} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Toplam Fatura</p>
              <p className="text-lg font-bold">{formatPriceWithVAT(summaries.total)}</p>
            </div>
          </div>
        </div>
        <div className="card-premium card-premium-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <PremiumIconInline icon={CheckCircle} size={20} color="text-success" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Odenen</p>
              <p className="text-lg font-bold text-success">{formatPriceWithVAT(summaries.paid)}</p>
            </div>
          </div>
        </div>
        <div className="card-premium card-premium-border rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <PremiumIconInline icon={Clock} size={20} color="text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Bekleyen</p>
              <p className="text-lg font-bold text-warning">{formatPriceWithVAT(summaries.pending)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex gap-2 mb-4">
        {TABS.map((tab) => (
          <Button
            key={tab.value}
            size="sm"
            variant={activeTab === tab.value ? "default" : "outline"}
            onClick={() => setActiveTab(tab.value)}
            className="rounded-full"
          >
            {tab.label}
          </Button>
        ))}
      </div>

      {/* Invoice Table */}
      <div className="card-premium card-premium-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Fatura No</th>
                <th className="text-left px-4 py-3 font-semibold">Tarih</th>
                <th className="text-left px-4 py-3 font-semibold">Musteri</th>
                <th className="text-left px-4 py-3 font-semibold">Tutar</th>
                <th className="text-left px-4 py-3 font-semibold">Durum</th>
                <th className="text-left px-4 py-3 font-semibold">Islem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => {
                const cfg = STATUS_CONFIG[inv.status];
                return (
                  <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs">{inv.invoiceNumber}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(inv.date).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <span className="font-medium">{inv.customerName}</span>
                        {inv.customerEmail && (
                          <span className="text-xs text-muted-foreground block">{inv.customerEmail}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold">
                      {Number(inv.amount).toLocaleString("tr-TR")} TL
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={cfg.class}>{cfg.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => handleDownload(inv)} className="gap-1">
                          <Download className="h-3 w-3" /> PDF
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-muted-foreground">
                    Fatura bulunamadi
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
