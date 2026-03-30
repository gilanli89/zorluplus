import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useState, useMemo } from "react";
import {
  Plus, Search, Trash2, Pencil, Save, X, Loader2, ImageIcon, Upload, Eraser,
} from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, CATEGORY_GROUPS } from "@/lib/constants";
import { useDropzone } from "react-dropzone";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// ── Types ───────────────────────────────────────────────────────────────────

interface ProductForm {
  product_name: string;
  brand: string;
  category: string;
  subcategory: string;
  description: string;
  original_price: number;
  sale_price: number;
  campaign_label: string;
  images: File[];
  sku: string;
  quantity: number;
  is_active: boolean;
}

const EMPTY_FORM: ProductForm = {
  product_name: "",
  brand: "",
  category: "",
  subcategory: "",
  description: "",
  original_price: 0,
  sale_price: 0,
  campaign_label: "",
  images: [],
  sku: "",
  quantity: 1,
  is_active: true,
};

const BRANDS = [
  "Samsung", "LG", "Beko", "Arcelik", "Vestel", "Bosch", "Siemens",
  "Grundig", "Profilo", "Toshiba", "Philips", "Sony", "Hisense",
  "TCL", "Regal", "Altus", "Fakir", "Arzum", "Korkmaz", "Diger",
];

function generateSKU(brand: string, category: string): string {
  const b = (brand || "ZDP").substring(0, 3).toUpperCase();
  const c = (category || "GEN").substring(0, 3).toUpperCase();
  const ts = Date.now().toString(36).toUpperCase().slice(-5);
  return `${b}-${c}-${ts}`;
}

// ── Component ───────────────────────────────────────────────────────────────

export default function AdminProducts() {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterBrand, setFilterBrand] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("inventory")
        .select("*")
        .order("product_name");
      if (error) throw error;
      return data;
    },
  });

  const createProduct = useMutation({
    mutationFn: async (values: ProductForm) => {
      const sku = values.sku || generateSKU(values.brand, values.category);
      const { error } = await supabase.from("inventory").insert({
        sku,
        product_name: values.product_name,
        brand: values.brand || null,
        category: values.category || null,
        description: values.description || null,
        original_price: values.original_price || null,
        sale_price: values.sale_price || null,
        campaign_label: values.campaign_label || null,
        quantity: values.quantity,
        is_active: values.is_active,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Urun eklendi");
      setAddOpen(false);
      setForm(EMPTY_FORM);
      setImagePreviewUrls([]);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const updateProduct = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<ProductForm> }) => {
      const { error } = await supabase.from("inventory").update({
        product_name: values.product_name,
        brand: values.brand || null,
        category: values.category || null,
        description: values.description || null,
        original_price: values.original_price || null,
        sale_price: values.sale_price || null,
        campaign_label: values.campaign_label || null,
        quantity: values.quantity,
        is_active: values.is_active,
        price_updated_at: new Date().toISOString(),
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Urun guncellendi");
      setEditOpen(false);
      setEditId(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("inventory").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Urun silindi");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setForm((f) => ({ ...f, images: [...f.images, ...files] }));
    const urls = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...urls]);
  };

  const removeImage = (idx: number) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleRemoveBg = () => {
    const apiKey = import.meta.env.VITE_REMOVEBG_API_KEY;
    if (!apiKey) {
      toast.error("remove.bg API key gerekli. .env dosyasina VITE_REMOVEBG_API_KEY ekleyin.");
      return;
    }
    toast.info("Arka plan kaldiriliyor...");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    onDrop: (acceptedFiles) => {
      setForm((f) => ({ ...f, images: [...f.images, ...acceptedFiles] }));
      const urls = acceptedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviewUrls((prev) => [...prev, ...urls]);
    },
  });

  const openEdit = (item: (typeof items)[0]) => {
    setEditId(item.id);
    setForm({
      product_name: item.product_name || "",
      brand: item.brand || "",
      category: item.category || "",
      subcategory: "",
      description: (item as any).description || "",
      original_price: Number(item.original_price) || 0,
      sale_price: Number(item.sale_price) || 0,
      campaign_label: (item as any).campaign_label || "",
      images: [],
      sku: item.sku || "",
      quantity: item.quantity || 0,
      is_active: item.is_active,
    });
    setImagePreviewUrls([]);
    setEditOpen(true);
  };

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (filterBrand !== "all" && item.brand !== filterBrand) return false;
      if (filterCategory !== "all" && item.category !== filterCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          item.product_name.toLowerCase().includes(q) ||
          (item.sku || "").toLowerCase().includes(q) ||
          (item.brand || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [items, search, filterBrand, filterCategory]);

  const uniqueBrands = useMemo(
    () => [...new Set(items.map((i) => i.brand).filter(Boolean))] as string[],
    [items]
  );
  const uniqueCategories = useMemo(
    () => [...new Set(items.map((i) => i.category).filter(Boolean))] as string[],
    [items]
  );

  // ── Shared form JSX ─────────────────────────────────────────────────────

  const renderForm = () => (
    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Urun Adi *</label>
          <Input value={form.product_name} onChange={(e) => setForm((f) => ({ ...f, product_name: e.target.value }))} placeholder="Urun adi" />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Marka</label>
          <Select value={form.brand} onValueChange={(v) => setForm((f) => ({ ...f, brand: v }))}>
            <SelectTrigger><SelectValue placeholder="Marka secin" /></SelectTrigger>
            <SelectContent>
              {BRANDS.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Kategori</label>
          <Select value={form.category} onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}>
            <SelectTrigger><SelectValue placeholder="Kategori secin" /></SelectTrigger>
            <SelectContent>
              {CATEGORY_GROUPS.map((g) => {
                const groupCats = CATEGORIES.filter((c: any) => c.group === g.id);
                return groupCats.map((c) => (
                  <SelectItem key={c.slug} value={c.name}>
                    <span className="text-muted-foreground text-[10px]">{g.name} →</span> {c.name}
                  </SelectItem>
                ));
              })}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Alt Kategori</label>
          <Input value={form.subcategory} onChange={(e) => setForm((f) => ({ ...f, subcategory: e.target.value }))} placeholder="Alt kategori" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Aciklama</label>
        <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} placeholder="Urun aciklamasi..." />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Fiyat (TL)</label>
          <Input type="number" value={form.original_price || ""} onChange={(e) => setForm((f) => ({ ...f, original_price: Number(e.target.value) }))} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Indirimli Fiyat (TL)</label>
          <Input type="number" value={form.sale_price || ""} onChange={(e) => setForm((f) => ({ ...f, sale_price: Number(e.target.value) }))} />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Stok Adedi</label>
          <Input type="number" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: Number(e.target.value) }))} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Kampanya Etiketi</label>
          <Input value={form.campaign_label} onChange={(e) => setForm((f) => ({ ...f, campaign_label: e.target.value }))} placeholder='Ornek: %30 INDIRIM' />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">SKU</label>
          <Input value={form.sku || generateSKU(form.brand, form.category)} readOnly className="bg-muted" />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Gorseller</label>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <PremiumIconInline icon={Upload} size={24} />
            <span className="text-sm text-muted-foreground">
              {isDragActive ? "Birakin..." : "Gorsel suruklein veya tiklayin"}
            </span>
          </div>
        </div>
        {imagePreviewUrls.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {imagePreviewUrls.map((url, i) => (
              <div key={i} className="relative group">
                <img src={url} alt="" className="w-16 h-16 object-cover rounded-lg border" />
                <div className="absolute -top-1 -right-1 flex gap-0.5">
                  <button onClick={() => handleRemoveBg()} className="bg-primary text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition" title="remove.bg">
                    <Eraser className="h-3 w-3" />
                  </button>
                  <button onClick={() => removeImage(i)} className="bg-destructive text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Switch checked={form.is_active} onCheckedChange={(v) => setForm((f) => ({ ...f, is_active: v }))} />
        <span className="text-sm">{form.is_active ? "Aktif" : "Pasif"}</span>
      </div>
    </div>
  );

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
          <h1 className="font-display text-2xl font-bold text-foreground">Urun Yonetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} urun kayitli</p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-full" onClick={() => { setForm(EMPTY_FORM); setImagePreviewUrls([]); }}>
              <PremiumIconInline icon={Plus} size={16} className="text-white" /> Urun Ekle
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Urun Ekle</DialogTitle>
            </DialogHeader>
            {renderForm()}
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Iptal</Button>
              <Button onClick={() => createProduct.mutate(form)} disabled={createProduct.isPending || !form.product_name} className="gap-2">
                {createProduct.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                Kaydet
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Urun ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterBrand} onValueChange={setFilterBrand}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Marka" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tum Markalar</SelectItem>
            {uniqueBrands.map((b) => (
              <SelectItem key={b} value={b}>{b}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="Kategori" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tum Kategoriler</SelectItem>
            {uniqueCategories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="card-premium card-premium-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Gorsel</th>
                <th className="text-left px-4 py-3 font-semibold">Urun Adi</th>
                <th className="text-left px-4 py-3 font-semibold">Marka</th>
                <th className="text-left px-4 py-3 font-semibold">Kategori</th>
                <th className="text-left px-4 py-3 font-semibold">Fiyat</th>
                <th className="text-left px-4 py-3 font-semibold">Indirimli</th>
                <th className="text-left px-4 py-3 font-semibold">Kampanya</th>
                <th className="text-left px-4 py-3 font-semibold">Stok</th>
                <th className="text-left px-4 py-3 font-semibold">Durum</th>
                <th className="text-left px-4 py-3 font-semibold">Islem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium max-w-[200px] truncate">{item.product_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{item.brand || "\u2014"}</td>
                  <td className="px-4 py-3">
                    {item.category ? <Badge variant="outline" className="text-xs">{item.category}</Badge> : "\u2014"}
                  </td>
                  <td className="px-4 py-3">
                    {item.original_price ? `${Number(item.original_price).toLocaleString("tr-TR")} TL` : "\u2014"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-accent font-semibold">
                      {item.sale_price ? `${Number(item.sale_price).toLocaleString("tr-TR")} TL` : "\u2014"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {(item as any).campaign_label ? (
                      <Badge className="bg-accent/10 text-accent text-xs">{(item as any).campaign_label}</Badge>
                    ) : "\u2014"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={item.quantity <= (item.min_quantity || 0) ? "text-destructive font-semibold" : ""}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={item.is_active ? "default" : "secondary"} className={item.is_active ? "bg-success/10 text-success" : ""}>
                      {item.is_active ? "Aktif" : "Pasif"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(item)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="ghost" className="text-destructive">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Urunu Sil</AlertDialogTitle>
                            <AlertDialogDescription>
                              "{item.product_name}" urununu silmek istediginizden emin misiniz? Bu islem geri alinamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Iptal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteProduct.mutate(item.id)} className="bg-destructive text-destructive-foreground">
                              Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-8 text-muted-foreground">
                    {items.length === 0 ? "Henuz urun yok" : "Sonuc bulunamadi"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Urunu Duzenle</DialogTitle>
          </DialogHeader>
          {renderForm()}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Iptal</Button>
            <Button
              onClick={() => editId && updateProduct.mutate({ id: editId, values: form })}
              disabled={updateProduct.isPending || !form.product_name}
              className="gap-2"
            >
              {updateProduct.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
              <Save className="h-4 w-4" /> Guncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
