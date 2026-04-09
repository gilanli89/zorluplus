import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { logActivity } from "@/lib/activityLogger";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  Save, RefreshCw, X, Loader2, Plus, Trash2,
  Search, ImageIcon, Upload, Check, ChevronDown, ChevronUp,
  Filter, Package, AlertTriangle, Eye, EyeOff, CheckSquare, XSquare
} from "lucide-react";

import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { CATEGORIES } from "@/lib/constants";

// Merge DB categories with predefined ones, deduplicated & sorted
function allCategories(dbCats: string[]): string[] {
  const predefined = CATEGORIES.map(c => c.name);
  const set = new Set([...predefined, ...dbCats]);
  return Array.from(set).sort();
}

// ─── Timeout & Session Helpers ───
const withTimeout = <T,>(promise: Promise<T> | PromiseLike<T>, ms = 5000): Promise<T> =>
  Promise.race([
    Promise.resolve(promise),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), ms)
    ),
  ]);

const ensureAdminSession = async () => {
  const { data, error } = await withTimeout(supabase.auth.getSession(), 3000);
  if (error || !data.session) throw new Error("session");
  return data.session;
};

const getErrorMessage = (e: any): string => {
  if (e?.message === "timeout") return "İşlem zaman aşımına uğradı. Oturum veya ağ bağlantısını kontrol edin.";
  if (e?.message === "session") return "Oturum doğrulanamadı. Lütfen tekrar giriş yapın.";
  if (e?.message === "not-admin") return "Bu işlem için admin yetkisi doğrulanamadı.";
  return e?.message || "Bilinmeyen bir hata oluştu.";
};

// ─── Add Product Dialog ───
function AddProductDialog({ onAdded, categories = [] }: { onAdded: () => void; categories?: string[] }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    product_name: "",
    brand: "",
    category: "",
    sku: "",
    description: "",
    original_price: "",
    sale_price: "",
    quantity: "1",
    image_url: "",
  });
  const [attrs, setAttrs] = useState<{ key: string; value: string }[]>([]);

  const set = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  const addAttr = () => setAttrs(p => [...p, { key: "", value: "" }]);
  const removeAttr = (i: number) => setAttrs(p => p.filter((_, idx) => idx !== i));
  const updateAttr = (i: number, field: "key" | "value", value: string) => {
    setAttrs(p => p.map((a, idx) => idx === i ? { ...a, [field]: value } : a));
  };

  const reset = () => {
    setForm({ product_name: "", brand: "", category: "", sku: "", description: "", original_price: "", sale_price: "", quantity: "1", image_url: "" });
    setAttrs([]);
  };

  const handleSave = async () => {
    if (!form.product_name.trim()) { toast.error("Ürün adı zorunludur"); return; }
    setSaving(true);

    const attributes: Record<string, string> = {};
    attrs.forEach(a => { if (a.key.trim()) attributes[a.key.trim()] = a.value.trim(); });

    try {
      await ensureAdminSession();

      const { error } = await withTimeout(supabase.from("inventory").insert({
        product_name: form.product_name.trim(),
        brand: form.brand.trim() || null,
        category: form.category.trim() || null,
        sku: form.sku.trim() || null,
        description: form.description.trim() || null,
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
        quantity: parseInt(form.quantity) || 1,
        image_url: form.image_url.trim() || null,
        attributes: Object.keys(attributes).length > 0 ? attributes : {},
      } as any).select(), 5000);

      if (error) { toast.error("Ürün eklenemedi: " + error.message); return; }
      toast.success("Ürün başarıyla eklendi!");
      reset();
      setOpen(false);
      onAdded();
    } catch (e: any) {
      toast.error(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-1.5">
          <Plus className="h-3.5 w-3.5" /> Ürün Ekle
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Yeni Ürün Ekle</DialogTitle>
          <DialogDescription>Ürün bilgilerini girin ve özelliklerini ekleyin.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Ürün Adı *</Label>
              <Input value={form.product_name} onChange={e => set("product_name", e.target.value)} placeholder="Samsung 55&quot; OLED TV" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Marka</Label>
              <Input value={form.brand} onChange={e => set("brand", e.target.value)} placeholder="Samsung" className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Stok Kodu (SKU)</Label>
              <Input value={form.sku} onChange={e => set("sku", e.target.value)} placeholder="SAM-TV55-OLED" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Kategori</Label>
              <Select value={form.category} onValueChange={v => set("category", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
                <SelectContent>
                  {allCategories(categories).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs">Açıklama</Label>
            <Textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Ürün açıklaması..." rows={2} className="mt-1 text-sm" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Fiyat (₺)</Label>
              <Input type="number" value={form.original_price} onChange={e => set("original_price", e.target.value)} placeholder="25000" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">İndirimli Fiyat (₺)</Label>
              <Input type="number" value={form.sale_price} onChange={e => set("sale_price", e.target.value)} placeholder="22000" className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Stok Adeti</Label>
              <Input type="number" value={form.quantity} onChange={e => set("quantity", e.target.value)} placeholder="1" className="mt-1" />
            </div>
          </div>

          <div>
            <Label className="text-xs">Görsel URL</Label>
            <Input value={form.image_url} onChange={e => set("image_url", e.target.value)} placeholder="https://..." className="mt-1" />
          </div>

          {/* Attributes / Variables */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold">Özellikler (Değişkenler)</Label>
              <Button type="button" size="sm" variant="outline" onClick={addAttr} className="h-7 text-xs gap-1">
                <Plus className="h-3 w-3" /> Özellik Ekle
              </Button>
            </div>
            {attrs.length === 0 && (
              <p className="text-xs text-muted-foreground">Henüz özellik eklenmedi. Örn: Ekran Boyutu → 55", Panel Türü → OLED</p>
            )}
            <div className="space-y-2">
              {attrs.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={a.key}
                    onChange={e => updateAttr(i, "key", e.target.value)}
                    placeholder="Özellik (Ekran Boyutu)"
                    className="h-8 text-xs flex-1"
                  />
                  <Input
                    value={a.value}
                    onChange={e => updateAttr(i, "value", e.target.value)}
                    placeholder="Değer (55&quot;)"
                    className="h-8 text-xs flex-1"
                  />
                  <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeAttr(i)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>İptal</Button>
          <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
            {saving ? "Kaydediliyor..." : "Kaydet"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Types ───
type InventoryItem = {
  id: string;
  sku: string | null;
  product_name: string;
  brand: string | null;
  category: string | null;
  quantity: number;
  original_price: number | null;
  sale_price: number | null;
  unit_price: number | null;
  is_active: boolean;
  image_url: string | null;
  min_quantity: number;
  created_at: string;
  updated_at: string;
  price_updated_at: string | null;
  description?: string | null;
  attributes?: Record<string, string> | null;
};

type EditableFields = {
  product_name: string;
  brand: string;
  category: string;
  quantity: number;
  original_price: number;
  sale_price: number;
  image_url: string;
  is_active: boolean;
};

type PendingChange = Partial<EditableFields> & { id: string };

const normalizeImageUrl = (url: string | null | undefined) => {
  if (!url) return "";
  return url.replace("https://zorluplus.com/wp-content/", "https://cms.zorluplus.com/wp-content/");
};

// ─── Edit Product Dialog ───
function EditProductDialog({ item, open, onOpenChange, onSaved, categories = [] }: { item: InventoryItem; open: boolean; onOpenChange: (v: boolean) => void; onSaved: () => void; categories?: string[] }) {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    product_name: item.product_name,
    brand: item.brand || "",
    category: item.category || "",
    sku: item.sku || "",
    description: (item as any).description || "",
    original_price: item.original_price ? String(item.original_price) : "",
    sale_price: item.sale_price ? String(item.sale_price) : "",
    quantity: String(item.quantity),
    image_url: item.image_url || "",
    is_active: item.is_active,
  });

  const existingAttrs = (item as any).attributes || {};
  const [attrs, setAttrs] = useState<{ key: string; value: string }[]>(
    Object.entries(existingAttrs).map(([k, v]) => ({ key: k, value: String(v) }))
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const set = (field: string, value: string | boolean) => setForm(p => ({ ...p, [field]: value }));

  const addAttr = () => setAttrs(p => [...p, { key: "", value: "" }]);
  const removeAttr = (i: number) => setAttrs(p => p.filter((_, idx) => idx !== i));
  const updateAttr = (i: number, field: "key" | "value", value: string) => {
    setAttrs(p => p.map((a, idx) => idx === i ? { ...a, [field]: value } : a));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) { toast.error("Dosya 5MB'dan küçük olmalı"); return; }
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${item.sku || item.id}_${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from("product-images").upload(fileName, file, { upsert: true });
    if (error) { toast.error("Yükleme hatası"); setUploading(false); return; }
    const { data: pub } = supabase.storage.from("product-images").getPublicUrl(data.path);
    set("image_url", pub.publicUrl);
    setUploading(false);
    toast.success("Görsel yüklendi!");
  };

  const handleSave = async () => {
    if (!form.product_name.trim()) { toast.error("Ürün adı zorunludur"); return; }
    setSaving(true);

    const attributes: Record<string, string> = {};
    attrs.forEach(a => { if (a.key.trim()) attributes[a.key.trim()] = a.value.trim(); });

    try {
      await ensureAdminSession();

      const { error } = await withTimeout(supabase.from("inventory").update({
        product_name: form.product_name.trim(),
        brand: form.brand.trim() || null,
        category: form.category.trim() || null,
        sku: form.sku.trim() || null,
        description: form.description.trim() || null,
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
        quantity: parseInt(form.quantity) || 0,
        image_url: form.image_url.trim() || null,
        is_active: form.is_active,
        attributes: Object.keys(attributes).length > 0 ? attributes : {},
        price_updated_at: new Date().toISOString(),
      } as any).eq("id", item.id).select(), 5000);

      if (error) { toast.error("Güncellenemedi: " + error.message); return; }
      toast.success("Ürün güncellendi!");
      onOpenChange(false);
      onSaved();
    } catch (e: any) {
      toast.error(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  const imgUrl = normalizeImageUrl(form.image_url);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ürün Düzenle</DialogTitle>
          <DialogDescription>Ürün bilgilerini düzenleyin.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {/* Image preview */}
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-lg border border-border bg-muted/30 flex items-center justify-center overflow-hidden flex-shrink-0">
              {imgUrl ? (
                <img src={imgUrl} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
              ) : (
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <Input value={form.image_url} onChange={e => set("image_url", e.target.value)} placeholder="Görsel URL'si" className="h-8 text-xs" />
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              <Button type="button" variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                {uploading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Upload className="h-3 w-3" />}
                {uploading ? "Yükleniyor..." : "Görsel Yükle"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Ürün Adı *</Label>
              <Input value={form.product_name} onChange={e => set("product_name", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Marka</Label>
              <Input value={form.brand} onChange={e => set("brand", e.target.value)} className="mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Stok Kodu (SKU)</Label>
              <Input value={form.sku} onChange={e => set("sku", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Kategori</Label>
              <Select value={form.category} onValueChange={v => set("category", v)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
                <SelectContent>
                  {allCategories(categories).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs">Açıklama</Label>
            <Textarea value={form.description} onChange={e => set("description", e.target.value)} rows={2} className="mt-1 text-sm" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <Label className="text-xs">Fiyat (₺)</Label>
              <Input type="number" value={form.original_price} onChange={e => set("original_price", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">İndirimli Fiyat (₺)</Label>
              <Input type="number" value={form.sale_price} onChange={e => set("sale_price", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Stok Adeti</Label>
              <Input type="number" value={form.quantity} onChange={e => set("quantity", e.target.value)} className="mt-1" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={form.is_active as boolean} onCheckedChange={v => set("is_active", v)} />
            <Label className="text-xs">{form.is_active ? "Aktif" : "Pasif"}</Label>
          </div>

          {/* Attributes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-semibold">Özellikler (Değişkenler)</Label>
              <Button type="button" size="sm" variant="outline" onClick={addAttr} className="h-7 text-xs gap-1">
                <Plus className="h-3 w-3" /> Özellik Ekle
              </Button>
            </div>
            {attrs.length === 0 && (
              <p className="text-xs text-muted-foreground">Henüz özellik eklenmedi.</p>
            )}
            <div className="space-y-2">
              {attrs.map((a, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input value={a.key} onChange={e => updateAttr(i, "key", e.target.value)} placeholder="Özellik" className="h-8 text-xs flex-1" />
                  <Input value={a.value} onChange={e => updateAttr(i, "value", e.target.value)} placeholder="Değer" className="h-8 text-xs flex-1" />
                  <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeAttr(i)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>İptal</Button>
          <Button size="sm" onClick={handleSave} disabled={saving} className="gap-1.5">
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
            {saving ? "Kaydediliyor..." : "Güncelle"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ImagePreviewDialog({ item, onChangeUrl }: { item: InventoryItem; onChangeUrl: (url: string) => void }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(normalizeImageUrl(item.image_url));
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onChangeUrl(url);
    setOpen(false);
    toast.success("Görsel URL güncellendi");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Sadece görsel dosyaları yükleyebilirsiniz");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Dosya boyutu 5MB'dan küçük olmalı");
      return;
    }

    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const fileName = `${item.sku || item.id}_${Date.now()}.${ext}`;

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(fileName, file, { upsert: true });

    if (error) {
      toast.error("Görsel yüklenemedi: " + error.message);
      setUploading(false);
      return;
    }

    const { data: publicUrl } = supabase.storage
      .from("product-images")
      .getPublicUrl(data.path);

    setUrl(publicUrl.publicUrl);
    setUploading(false);
    toast.success("Görsel yüklendi!");
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (v) setUrl(normalizeImageUrl(item.image_url)); }}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="h-7 w-7 text-primary" title="Görsel Düzenle">
          <ImageIcon className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <ImageIcon className="h-5 w-5 text-primary" /> Ürün Görseli
          </DialogTitle>
          <DialogDescription>Ürünün mevcut görselini önizle, yeni görsel yükle veya URL gir.</DialogDescription>
        </DialogHeader>
        <p className="text-sm text-muted-foreground font-medium truncate">{item.product_name}</p>
        <div className="mt-2 rounded-lg border border-border overflow-hidden bg-muted/30 flex items-center justify-center min-h-[200px]">
          {url ? (
            <img src={url} alt={item.product_name} className="max-h-[280px] object-contain p-2" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground py-8">
              <ImageIcon className="h-10 w-10" />
              <span className="text-xs">Görsel yok</span>
            </div>
          )}
        </div>

        {/* Upload button */}
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 w-full"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          {uploading ? "Yükleniyor..." : "Görsel Yükle"}
        </Button>

        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">veya URL girin</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Input
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Görsel URL'si girin..."
          className="text-sm"
        />
        <div className="flex justify-end gap-2 mt-1">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>İptal</Button>
          <Button size="sm" onClick={handleSave} className="gap-1.5">
            <Check className="h-3.5 w-3.5" /> Kaydet
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Image Cell ───
function ImageCell({ url, isEditing, onChange }: { url: string | null; isEditing: boolean; onChange: (v: string) => void }) {
  const [showFull, setShowFull] = useState(false);
  const [imgError, setImgError] = useState(false);
  const normalizedUrl = normalizeImageUrl(url);
  const hasUrl = !!normalizedUrl && normalizedUrl.trim().length > 0;

  return (
    <div className="flex items-center gap-2">
      {hasUrl && !imgError ? (
        <img
          src={normalizedUrl}
          alt=""
          className="h-10 w-10 rounded-lg object-cover border border-border cursor-pointer flex-shrink-0"
          onClick={() => setShowFull(true)}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </div>
      )}
      {isEditing && (
        <Input
          value={url || ""}
          onChange={e => onChange(e.target.value)}
          placeholder="Görsel URL'si"
          className="h-8 text-xs flex-1 min-w-[150px]"
        />
      )}
      {showFull && hasUrl && (
        <Dialog open={showFull} onOpenChange={setShowFull}>
          <DialogContent className="max-w-md p-2">
            <img src={normalizedUrl} alt="" className="w-full rounded-lg" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// ─── Product Row ───
function ProductRow({
  item,
  pending,
  onFieldChange,
  onToggleActive,
  onSaved,
  categories,
  isSelected,
  onToggleSelect,
}: {
  item: InventoryItem;
  pending: PendingChange | undefined;
  onFieldChange: (id: string, field: keyof EditableFields, value: string | number | boolean) => void;
  onToggleActive: (id: string, value: boolean) => void;
  onSaved: () => void;
  categories: string[];
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const hasChanges = !!pending;

  const getValue = <K extends keyof EditableFields>(field: K): EditableFields[K] => {
    if (pending && field in pending) return (pending as any)[field];
    if (field === "product_name") return item.product_name as any;
    if (field === "brand") return (item.brand || "") as any;
    if (field === "category") return (item.category || "") as any;
    if (field === "quantity") return item.quantity as any;
    if (field === "original_price") return (item.original_price || 0) as any;
    if (field === "sale_price") return (item.sale_price || 0) as any;
    if (field === "image_url") return (item.image_url || "") as any;
    if (field === "is_active") return item.is_active as any;
    return "" as any;
  };

  const priceDisplay = (val: number | null) =>
    val ? `${Number(val).toLocaleString("tr-TR")} ₺` : "—";

  return (
    <>
      <tr className={`border-b border-border/50 transition-colors ${isSelected ? "bg-primary/5" : hasChanges ? "bg-amber-50/50 dark:bg-amber-950/20" : "hover:bg-muted/30"}`}>
        {/* Checkbox */}
        <td className="px-2 py-2 w-[40px]">
          <Checkbox checked={isSelected} onCheckedChange={() => onToggleSelect(item.id)} />
        </td>
        {/* Image */}
        <td className="px-3 py-2">
          <ImageCell
            url={getValue("image_url") as string}
            isEditing={expanded}
            onChange={v => onFieldChange(item.id, "image_url", v)}
          />
        </td>

        {/* Product Name */}
        <td className="px-3 py-2">
          {expanded ? (
            <Input
              value={getValue("product_name") as string}
              onChange={e => onFieldChange(item.id, "product_name", e.target.value)}
              className="h-8 text-sm font-medium"
            />
          ) : (
            <div className="cursor-pointer" onClick={() => setEditOpen(true)}>
              <p className="font-medium text-sm leading-tight truncate max-w-[220px] hover:text-primary transition-colors" title={item.product_name}>
                {getValue("product_name") as string}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{item.sku || "—"}</p>
            </div>
          )}
        </td>

        {/* Brand */}
        <td className="px-3 py-2">
          {expanded ? (
            <Input
              value={getValue("brand") as string}
              onChange={e => onFieldChange(item.id, "brand", e.target.value)}
              className="h-8 text-xs w-24"
            />
          ) : (
            <span className="text-xs text-muted-foreground">{getValue("brand") as string || "—"}</span>
          )}
        </td>

        {/* Category */}
        <td className="px-3 py-2">
          {expanded ? (
            <Input
              value={getValue("category") as string}
              onChange={e => onFieldChange(item.id, "category", e.target.value)}
              className="h-8 text-xs w-28"
            />
          ) : (
            item.category ? <Badge variant="outline" className="text-[10px] font-normal">{item.category}</Badge> : <span className="text-xs text-muted-foreground">—</span>
          )}
        </td>

        {/* Stock */}
        <td className="px-3 py-2">
          <Input
            type="number"
            value={String(getValue("quantity"))}
            onChange={e => onFieldChange(item.id, "quantity", parseInt(e.target.value) || 0)}
            className={`h-8 w-16 text-center text-xs ${(getValue("quantity") as number) <= item.min_quantity ? "border-destructive text-destructive" : ""}`}
          />
        </td>

        {/* Price */}
        <td className="px-3 py-2">
          <Input
            type="number"
            value={String(getValue("original_price") || "")}
            onChange={e => onFieldChange(item.id, "original_price", parseFloat(e.target.value) || 0)}
            className="h-8 w-24 text-xs"
            placeholder="0"
          />
        </td>

        {/* Sale Price */}
        <td className="px-3 py-2">
          <Input
            type="number"
            value={String(getValue("sale_price") || "")}
            onChange={e => onFieldChange(item.id, "sale_price", parseFloat(e.target.value) || 0)}
            className="h-8 w-24 text-xs text-emerald-600"
            placeholder="—"
          />
        </td>

        {/* Active */}
        <td className="px-3 py-2 text-center">
          <Switch
            checked={getValue("is_active") as boolean}
            onCheckedChange={v => onToggleActive(item.id, v)}
            className="scale-90"
          />
        </td>

        {/* Actions */}
        <td className="px-3 py-2">
          <div className="flex items-center gap-0.5">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
              onClick={() => setExpanded(!expanded)}
              title={expanded ? "Daralt" : "Genişlet"}
            >
              {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </Button>
            <ImagePreviewDialog item={item} onChangeUrl={(v) => onFieldChange(item.id, "image_url", v)} />
            {hasChanges && (
              <Badge className="bg-amber-500/20 text-amber-700 dark:text-amber-400 text-[10px] px-1.5 h-5">
                Değişti
              </Badge>
            )}
          </div>
        </td>
      </tr>
      {editOpen && (
        <EditProductDialog item={item} open={editOpen} onOpenChange={setEditOpen} onSaved={onSaved} categories={categories} />
      )}
    </>
  );
}

// ─── Main Component ───
export default function AdminInventory() {
  const qc = useQueryClient();
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkConfirm, setBulkConfirm] = useState<{ type: "delete" | "active" | "inactive"; } | null>(null);
  const [bulkCategoryOpen, setBulkCategoryOpen] = useState(false);
  const [bulkProcessing, setBulkProcessing] = useState(false);
  
  const [publishing, setPublishing] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [stockFilter, setStockFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 50;

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-inventory"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inventory").select("*").order("product_name");
      if (error) throw error;
      return data as InventoryItem[];
    },
  });

  // ─── Derived data ───
  const categories = useMemo(() => {
    const cats = new Set(items.map(i => i.category).filter(Boolean));
    return Array.from(cats).sort() as string[];
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter(item => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        const match = item.product_name.toLowerCase().includes(q) ||
          (item.sku || "").toLowerCase().includes(q) ||
          (item.brand || "").toLowerCase().includes(q);
        if (!match) return false;
      }
      // Category
      if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
      // Stock
      if (stockFilter === "low" && item.quantity > item.min_quantity) return false;
      if (stockFilter === "out" && item.quantity > 0) return false;
      // Active
      if (activeFilter === "active" && !item.is_active) return false;
      if (activeFilter === "inactive" && item.is_active) return false;
      return true;
    });
  }, [items, search, categoryFilter, stockFilter, activeFilter]);

  const paged = useMemo(() => {
    return filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  }, [filtered, page]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  // ─── Change tracking ───
  const handleFieldChange = useCallback((id: string, field: keyof EditableFields, value: string | number | boolean) => {
    setPendingChanges(prev => {
      const next = new Map(prev);
      const existing = next.get(id) || { id };
      next.set(id, { ...existing, [field]: value });
      return next;
    });
  }, []);

  const handleToggleActive = useCallback(async (id: string, value: boolean) => {
    try {
      await ensureAdminSession();
      const { error } = await withTimeout(
        supabase.from("inventory").update({ is_active: value, price_updated_at: new Date().toISOString() }).eq("id", id).select(),
        5000
      );
      if (error) {
        toast.error("Durum güncellenemedi: " + error.message);
      } else {
        toast.success(value ? "Ürün aktif yapıldı" : "Ürün pasife alındı");
        qc.invalidateQueries({ queryKey: ["admin-inventory"] });
        qc.invalidateQueries({ queryKey: ["products"] });
      }
    } catch (e: any) {
      toast.error(getErrorMessage(e));
    }
  }, [qc]);

  const discardChanges = useCallback(() => {
    setPendingChanges(new Map());
    toast.info("Değişiklikler iptal edildi");
  }, []);

  // ─── Selection helpers ───
  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setSelectedIds(prev => {
      if (prev.size === filtered.length && filtered.length > 0) return new Set();
      return new Set(filtered.map(i => i.id));
    });
  }, [filtered]);

  const clearSelection = useCallback(() => setSelectedIds(new Set()), []);

  // ─── Bulk operations ───
  const chunkArray = (arr: string[], size: number) => {
    const chunks: string[][] = [];
    for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
    return chunks;
  };

  const bulkDelete = async () => {
    setBulkProcessing(true);
    setBulkConfirm(null);
    try {
      await ensureAdminSession();
      const ids = Array.from(selectedIds);
      const chunks = chunkArray(ids, 500);
      let failed = 0;
      for (const chunk of chunks) {
        try {
          const { error } = await withTimeout(
            supabase.from("inventory").update({ is_active: false }).in("id", chunk).select(),
            5000
          );
          if (error) { failed += chunk.length; console.error(error); }
        } catch { failed += chunk.length; }
      }
      if (failed > 0) toast.error(`${failed} ürün pasife alınamadı`);
      else toast.success(`${ids.length} ürün yayından kaldırıldı`);
      setSelectedIds(new Set());
      qc.invalidateQueries({ queryKey: ["admin-inventory"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    } catch (e: any) {
      toast.error(getErrorMessage(e));
    } finally {
      setBulkProcessing(false);
    }
  };

  const bulkSetActive = async (active: boolean) => {
    setBulkProcessing(true);
    setBulkConfirm(null);
    try {
      await ensureAdminSession();
      const ids = Array.from(selectedIds);
      const chunks = chunkArray(ids, 500);
      let failed = 0;
      for (const chunk of chunks) {
        try {
          const { error } = await withTimeout(
            supabase.from("inventory").update({ is_active: active }).in("id", chunk).select(),
            5000
          );
          if (error) { failed += chunk.length; console.error(error); }
        } catch { failed += chunk.length; }
      }
      if (failed > 0) toast.error(`${failed} ürün güncellenemedi`);
      else toast.success(`${ids.length} ürün ${active ? "aktif" : "pasif"} yapıldı`);
      setSelectedIds(new Set());
      qc.invalidateQueries({ queryKey: ["admin-inventory"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    } catch (e: any) {
      toast.error(getErrorMessage(e));
    } finally {
      setBulkProcessing(false);
    }
  };

  const bulkSetCategory = async (category: string) => {
    setBulkProcessing(true);
    try {
      await ensureAdminSession();
      const ids = Array.from(selectedIds);
      const chunks = chunkArray(ids, 500);
      let failed = 0;
      for (const chunk of chunks) {
        try {
          const { error } = await withTimeout(
            supabase.from("inventory").update({ category }).in("id", chunk).select(),
            5000
          );
          if (error) { failed += chunk.length; console.error(error); }
        } catch { failed += chunk.length; }
      }
      if (failed > 0) toast.error(`${failed} ürün güncellenemedi`);
      else toast.success(`${ids.length} ürünün kategorisi güncellendi`);
      setSelectedIds(new Set());
      qc.invalidateQueries({ queryKey: ["admin-inventory"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    } catch (e: any) {
      toast.error(getErrorMessage(e));
    } finally {
      setBulkProcessing(false);
      setBulkCategoryOpen(false);
    }
  };

  // ─── Publish (batch save) ───
  const publishChanges = async () => {
    if (pendingChanges.size === 0) return;
    setPublishing(true);

    try {
      await ensureAdminSession();

      const entries = Array.from(pendingChanges.entries());
      const results = await Promise.all(
        entries.map(async ([id, changes]) => {
          const updateData: Record<string, any> = {};
          if ("product_name" in changes) updateData.product_name = changes.product_name;
          if ("brand" in changes) updateData.brand = changes.brand || null;
          if ("category" in changes) updateData.category = changes.category || null;
          if ("quantity" in changes) updateData.quantity = changes.quantity;
          if ("original_price" in changes) updateData.original_price = changes.original_price || null;
          if ("sale_price" in changes) updateData.sale_price = changes.sale_price || null;
          if ("image_url" in changes) updateData.image_url = changes.image_url || null;
          if ("is_active" in changes) updateData.is_active = changes.is_active;
          updateData.price_updated_at = new Date().toISOString();

          try {
            const { error } = await withTimeout(
              supabase.from("inventory").update(updateData).eq("id", id).select(),
              5000
            );
            return { ok: !error, id, error };
          } catch (e: any) {
            return { ok: false, id, error: e };
          }
        })
      );

      const success = results.filter(r => r.ok).length;
      const failed = results.filter(r => !r.ok).length;

      if (failed > 0 && success === 0) {
        toast.error("Hiçbir güncelleme yapılamadı. Oturumunuzu kontrol edin.");
      } else if (failed > 0) {
        toast.error(`${failed} ürün güncellenemedi`);
      }
      if (success > 0) {
        toast.success(`${success} ürün başarıyla güncellendi`);
        setPendingChanges(new Map());
        qc.invalidateQueries({ queryKey: ["admin-inventory"] });
        qc.invalidateQueries({ queryKey: ["products"] });
      }
    } catch (e: any) {
      toast.error(getErrorMessage(e));
    } finally {
      setPublishing(false);
    }
  };

  // ─── Refresh from DB ───
  const refreshData = () => {
    qc.invalidateQueries({ queryKey: ["admin-inventory"] });
    toast.success("Veriler güncellendi");
  };

  // ─── Stats ───
  const stats = useMemo(() => {
    const active = items.filter(i => i.is_active).length;
    const outOfStock = items.filter(i => i.quantity === 0).length;
    const lowStock = items.filter(i => i.quantity > 0 && i.quantity <= i.min_quantity).length;
    return { total: items.length, active, outOfStock, lowStock };
  }, [items]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Stok Yönetimi</h1>
          <p className="text-sm text-muted-foreground mt-0.5">{stats.total} ürün</p>
        </div>
        <div className="flex items-center gap-2">
          <AddProductDialog onAdded={() => { qc.invalidateQueries({ queryKey: ["admin-inventory"] }); }} categories={categories} />
          <Button onClick={refreshData} variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" />
            Güncelle
          </Button>
        </div>
      </div>

      {/* ─── Quick Stats ─── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Toplam", value: stats.total, icon: Package, color: "text-foreground" },
          { label: "Aktif", value: stats.active, icon: Eye, color: "text-emerald-600" },
          { label: "Stok Yok", value: stats.outOfStock, icon: AlertTriangle, color: "text-destructive" },
          { label: "Az Stok", value: stats.lowStock, icon: AlertTriangle, color: "text-amber-500" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 flex items-center gap-3">
            <s.icon className={`h-4 w-4 ${s.color}`} />
            <div>
              <p className="text-lg font-bold">{s.value}</p>
              <p className="text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Publish Bar ─── */}
      {pendingChanges.size > 0 && (
        <div className="sticky top-0 z-20 rounded-xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/40 p-3 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800 dark:text-amber-300">
              {pendingChanges.size} ürün değiştirildi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={discardChanges} className="gap-1 text-muted-foreground">
              <X className="h-3.5 w-3.5" /> İptal
            </Button>
            <Button
              size="sm"
              onClick={publishChanges}
              disabled={publishing}
              className="gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              {publishing ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
              {publishing ? "Yayınlanıyor..." : "Yayınla"}
            </Button>
          </div>
        </div>
      )}

      {/* ─── Bulk Actions Bar ─── */}
      {selectedIds.size > 0 && (
        <div className="sticky top-0 z-30 rounded-xl border-2 border-primary/50 bg-primary/5 dark:bg-primary/10 p-3 flex flex-wrap items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {selectedIds.size} ürün seçildi
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setBulkConfirm({ type: "active" })} className="gap-1 text-xs">
              <Eye className="h-3.5 w-3.5" /> Aktif Yap
            </Button>
            <Button variant="outline" size="sm" onClick={() => setBulkConfirm({ type: "inactive" })} className="gap-1 text-xs">
              <EyeOff className="h-3.5 w-3.5" /> Pasif Yap
            </Button>
            <Button variant="outline" size="sm" onClick={() => setBulkCategoryOpen(true)} className="gap-1 text-xs">
              <Filter className="h-3.5 w-3.5" /> Kategori Değiştir
            </Button>
            <Button variant="destructive" size="sm" onClick={() => setBulkConfirm({ type: "delete" })} className="gap-1 text-xs">
              <Trash2 className="h-3.5 w-3.5" /> Sil
            </Button>
            <Button variant="ghost" size="sm" onClick={clearSelection} className="gap-1 text-xs text-muted-foreground">
              <X className="h-3.5 w-3.5" /> Seçimi Temizle
            </Button>
          </div>
        </div>
      )}
      {/* ─── Filters ─── */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Ürün adı, SKU veya marka..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(0); }}
            className="pl-9 h-9"
          />
        </div>
        <Select value={categoryFilter} onValueChange={v => { setCategoryFilter(v); setPage(0); }}>
          <SelectTrigger className="w-[150px] h-9 text-xs">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Kategoriler</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={stockFilter} onValueChange={v => { setStockFilter(v); setPage(0); }}>
          <SelectTrigger className="w-[120px] h-9 text-xs">
            <SelectValue placeholder="Stok" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Stok</SelectItem>
            <SelectItem value="low">Az Stok</SelectItem>
            <SelectItem value="out">Stok Yok</SelectItem>
          </SelectContent>
        </Select>
        <Select value={activeFilter} onValueChange={v => { setActiveFilter(v); setPage(0); }}>
          <SelectTrigger className="w-[120px] h-9 text-xs">
            <SelectValue placeholder="Durum" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tümü</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Pasif</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} sonuç
        </span>
      </div>

      {/* ─── Table ─── */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-2 py-2.5 w-[40px]">
                  <Checkbox
                    checked={filtered.length > 0 && selectedIds.size === filtered.length}
                    onCheckedChange={toggleSelectAll}
                  />
                </th>
                <th className="text-left px-3 py-2.5 font-semibold text-xs w-[80px]">Görsel</th>
                <th className="text-left px-3 py-2.5 font-semibold text-xs">Ürün / SKU</th>
                <th className="text-left px-3 py-2.5 font-semibold text-xs w-[90px]">Marka</th>
                <th className="text-left px-3 py-2.5 font-semibold text-xs w-[110px]">Kategori</th>
                <th className="text-center px-3 py-2.5 font-semibold text-xs w-[70px]">Stok</th>
                <th className="text-left px-3 py-2.5 font-semibold text-xs w-[100px]">Fiyat</th>
                <th className="text-left px-3 py-2.5 font-semibold text-xs w-[100px]">İndirimli</th>
                <th className="text-center px-3 py-2.5 font-semibold text-xs w-[60px]">Aktif</th>
                <th className="text-left px-3 py-2.5 font-semibold text-xs w-[100px]">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {paged.map(item => (
                <ProductRow
                  key={item.id}
                  item={item}
                  pending={pendingChanges.get(item.id)}
                  onFieldChange={handleFieldChange}
                  onToggleActive={handleToggleActive}
                  onSaved={() => { qc.invalidateQueries({ queryKey: ["admin-inventory"] }); qc.invalidateQueries({ queryKey: ["products"] }); }}
                  categories={categories}
                  isSelected={selectedIds.has(item.id)}
                  onToggleSelect={toggleSelect}
                />
              ))}
              {paged.length === 0 && (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-muted-foreground">
                    {items.length === 0 ? "Henüz ürün yok" : "Sonuç bulunamadı"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ─── Pagination ─── */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/30">
            <span className="text-xs text-muted-foreground">
              Sayfa {page + 1} / {totalPages}
            </span>
            <div className="flex gap-1">
              <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(p => p - 1)} className="h-7 text-xs">← Önceki</Button>
              <Button size="sm" variant="outline" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="h-7 text-xs">Sonraki →</Button>
            </div>
          </div>
        )}
      </div>

      {/* ─── Bulk Confirm Dialog ─── */}
      <AlertDialog open={!!bulkConfirm} onOpenChange={(v) => { if (!v) setBulkConfirm(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {bulkConfirm?.type === "delete" && `${selectedIds.size} ürünü yayından kaldırmak istediğinize emin misiniz?`}
              {bulkConfirm?.type === "active" && `${selectedIds.size} ürünü aktif yapmak istediğinize emin misiniz?`}
              {bulkConfirm?.type === "inactive" && `${selectedIds.size} ürünü pasif yapmak istediğinize emin misiniz?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {bulkConfirm?.type === "delete"
                ? "Seçili ürünler pasife alınarak siteden kaldırılacaktır. Tekrar aktif edebilirsiniz."
                : "Seçili ürünlerin durumu güncellenecektir."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={bulkProcessing}>İptal</AlertDialogCancel>
            <AlertDialogAction
              disabled={bulkProcessing}
              onClick={(e) => {
                e.preventDefault();
                if (bulkConfirm?.type === "delete") bulkDelete();
                else if (bulkConfirm?.type === "active") bulkSetActive(true);
                else if (bulkConfirm?.type === "inactive") bulkSetActive(false);
              }}
              className={bulkConfirm?.type === "delete" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
            >
              {bulkProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              {bulkConfirm?.type === "delete" ? "Yayından Kaldır" : "Onayla"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ─── Bulk Category Dialog ─── */}
      <Dialog open={bulkCategoryOpen} onOpenChange={setBulkCategoryOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Kategori Değiştir</DialogTitle>
            <DialogDescription>{selectedIds.size} ürünün kategorisini değiştirin.</DialogDescription>
          </DialogHeader>
          <Select onValueChange={(v) => bulkSetCategory(v)}>
            <SelectTrigger><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
            <SelectContent>
              {allCategories(categories).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          {bulkProcessing && (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
