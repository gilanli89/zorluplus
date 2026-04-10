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
  Filter, Package, AlertTriangle, Eye, EyeOff, CheckSquare, XSquare,
  Star
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

// Category-based attribute templates
const CATEGORY_ATTR_TEMPLATES: Record<string, { key: string; value: string }[]> = {
  "TV & Görüntü Sistemleri": [
    { key: "Ekran Boyutu", value: "" },
    { key: "Panel Türü", value: "" },
    { key: "Çözünürlük", value: "" },
    { key: "Smart TV", value: "" },
  ],
  "İklimlendirme": [
    { key: "BTU", value: "" },
    { key: "Enerji Sınıfı", value: "" },
    { key: "Inverter", value: "" },
  ],
  "Beyaz Eşya": [
    { key: "Kapasite", value: "" },
    { key: "Enerji Sınıfı", value: "" },
    { key: "Devir", value: "" },
  ],
  "Ankastre": [
    { key: "Tip", value: "" },
    { key: "Enerji Sınıfı", value: "" },
  ],
  "Mutfak Aletleri": [
    { key: "Kapasite", value: "" },
    { key: "Güç (Watt)", value: "" },
  ],
  "Ses Sistemleri": [
    { key: "Güç (Watt)", value: "" },
    { key: "Bağlantı", value: "" },
  ],
};

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

// ─── Dropzone Component ───
function ImageDropzone({
  images,
  onImagesChange,
  maxImages = 10,
  productId,
}: {
  images: { url: string; path?: string; iscover?: boolean }[];
  onImagesChange: (imgs: { url: string; path?: string; iscover?: boolean }[]) => void;
  maxImages?: number;
  productId?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFiles = async (files: File[]) => {
    const validFiles = files.filter(f => f.type.startsWith("image/") && f.size <= 5 * 1024 * 1024);
    if (validFiles.length === 0) { toast.error("Geçerli görsel dosyası bulunamadı (max 5MB)"); return; }
    const remaining = maxImages - images.length;
    if (remaining <= 0) { toast.error(`En fazla ${maxImages} görsel ekleyebilirsiniz`); return; }
    const toUpload = validFiles.slice(0, remaining);

    setUploading(true);
    const newImages = [...images];

    for (const file of toUpload) {
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${productId || "new"}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}.${ext}`;
      const { data, error } = await supabase.storage.from("product-images").upload(fileName, file, { upsert: true });
      if (error) { toast.error("Yükleme hatası: " + error.message); continue; }
      const { data: pub } = supabase.storage.from("product-images").getPublicUrl(data.path);
      newImages.push({ url: pub.publicUrl, path: data.path, iscover: newImages.length === 0 });
    }

    onImagesChange(newImages);
    setUploading(false);
    toast.success(`${toUpload.length} görsel yüklendi`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    uploadFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    uploadFiles(files);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (idx: number) => {
    const next = images.filter((_, i) => i !== idx);
    if (next.length > 0 && !next.some(img => img.iscover)) next[0].iscover = true;
    onImagesChange(next);
  };

  const setCover = (idx: number) => {
    const next = images.map((img, i) => ({ ...img, iscover: i === idx }));
    onImagesChange(next);
  };

  return (
    <div className="space-y-3">
      {/* Dropzone area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
          dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Yükleniyor...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm font-medium">Görselleri sürükle-bırak veya tıkla</p>
            <p className="text-xs text-muted-foreground">Max {maxImages} görsel, her biri max 5MB</p>
          </div>
        )}
      </div>

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, idx) => (
            <div key={idx} className={`relative group rounded-lg border-2 overflow-hidden aspect-square ${img.iscover ? "border-primary" : "border-border"}`}>
              <img src={img.url} alt="" className="h-full w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
              {img.iscover && (
                <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[9px] font-bold px-1.5 py-0.5 rounded">
                  KAPAK
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                {!img.iscover && (
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); setCover(idx); }} title="Kapak yap">
                    <Star className="h-3.5 w-3.5" />
                  </Button>
                )}
                <Button size="icon" variant="ghost" className="h-7 w-7 text-white hover:bg-white/20" onClick={(e) => { e.stopPropagation(); removeImage(idx); }} title="Kaldır">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Image Processing Checkboxes ───
function ImageProcessingOptions({
  options,
  onChange,
}: {
  options: { removeBg: boolean; autoScale: boolean; center: boolean };
  onChange: (opts: { removeBg: boolean; autoScale: boolean; center: boolean }) => void;
}) {
  return (
    <div className="flex flex-wrap gap-4 p-3 rounded-lg bg-muted/30 border border-border">
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox checked={options.removeBg} onCheckedChange={(v) => onChange({ ...options, removeBg: !!v })} />
        <span className="text-xs font-medium">Arka planı kaldır</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox checked={options.autoScale} onCheckedChange={(v) => onChange({ ...options, autoScale: !!v })} />
        <span className="text-xs font-medium">Otomatik ölçekle</span>
      </label>
      <label className="flex items-center gap-2 cursor-pointer">
        <Checkbox checked={options.center} onCheckedChange={(v) => onChange({ ...options, center: !!v })} />
        <span className="text-xs font-medium">Merkeze yerleştir</span>
      </label>
    </div>
  );
}

// ─── Add Product Dialog ───
function AddProductDialog({ onAdded, categories = [] }: { onAdded: () => void; categories?: string[] }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    product_name: "",
    brand: "",
    model: "",
    category: "",
    description: "",
    original_price: "",
    quantity: "1",
  });
  const [images, setImages] = useState<{ url: string; path?: string; iscover?: boolean }[]>([]);
  const [imgOptions, setImgOptions] = useState({ removeBg: false, autoScale: false, center: false });
  const [attrs, setAttrs] = useState<{ key: string; value: string }[]>([]);

  const set = (field: string, value: string) => setForm(p => ({ ...p, [field]: value }));

  const addAttr = () => setAttrs(p => [...p, { key: "", value: "" }]);
  const removeAttr = (i: number) => setAttrs(p => p.filter((_, idx) => idx !== i));
  const updateAttr = (i: number, field: "key" | "value", value: string) => {
    setAttrs(p => p.map((a, idx) => idx === i ? { ...a, [field]: value } : a));
  };

  // Auto-fill attributes based on category
  const handleCategoryChange = (category: string) => {
    set("category", category);
    // Find matching template
    const matchKey = Object.keys(CATEGORY_ATTR_TEMPLATES).find(k =>
      category.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(category.toLowerCase())
    );
    if (matchKey && attrs.length === 0) {
      setAttrs(CATEGORY_ATTR_TEMPLATES[matchKey].map(a => ({ ...a })));
    }
  };

  const reset = () => {
    setForm({ product_name: "", brand: "", model: "", category: "", description: "", original_price: "", quantity: "1" });
    setImages([]);
    setImgOptions({ removeBg: false, autoScale: false, center: false });
    setAttrs([]);
  };

  const processImages = async (imageList: { url: string; path?: string }[]) => {
    if (!imgOptions.removeBg && !imgOptions.autoScale && !imgOptions.center) return imageList;
    const processed = [];
    for (const img of imageList) {
      if (!img.path) { processed.push(img); continue; }
      try {
        const { data, error } = await supabase.functions.invoke("process-product-image", {
          body: { imagePath: img.path, ...imgOptions },
        });
        if (error || !data?.url) { processed.push(img); continue; }
        processed.push({ ...img, url: data.url, path: data.path });
      } catch { processed.push(img); }
    }
    return processed;
  };

  const handleSave = async () => {
    if (!form.product_name.trim()) { toast.error("İlan başlığı zorunludur"); return; }
    if (!form.original_price) { toast.error("Fiyat zorunludur"); return; }
    setSaving(true);

    const attributes: Record<string, string> = {};
    attrs.forEach(a => { if (a.key.trim()) attributes[a.key.trim()] = a.value.trim(); });

    try {
      await ensureAdminSession();

      // Process images if options selected
      const processedImages = await processImages(images);
      const coverImage = processedImages.find(i => i.iscover) || processedImages[0];
      const imageUrls = processedImages.map(i => i.url);

      const { data: insertedRows, error } = await withTimeout(supabase.from("inventory").insert({
        product_name: form.product_name.trim(),
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        category: form.category.trim() || null,
        description: form.description.trim() || null,
        original_price: parseFloat(form.original_price) || null,
        quantity: parseInt(form.quantity) || 1,
        image_url: coverImage?.url || null,
        images: imageUrls.length > 0 ? imageUrls : [],
        attributes: Object.keys(attributes).length > 0 ? attributes : {},
      }).select("id"), 8000);

      if (error) { toast.error("Ürün eklenemedi: " + error.message); return; }

      // Async translation — now we have the inserted product ID
      const insertedId = insertedRows?.[0]?.id;
      if (insertedId && (form.product_name.trim() || form.description.trim())) {
        const textsToTranslate = [form.product_name.trim(), form.description.trim()].filter(Boolean);
        supabase.functions.invoke("ai-translate", {
          body: { texts: textsToTranslate, targetLang: "en" },
        }).then(({ data }) => {
          if (data?.translations) {
            const updateData: Record<string, string> = {};
            if (form.product_name.trim()) updateData.title_en = data.translations[0];
            if (form.description.trim()) updateData.description_en = data.translations[form.product_name.trim() ? 1 : 0];
            if (Object.keys(updateData).length > 0) {
              supabase.from("inventory").update(updateData).eq("id", insertedId).select().then(() => {});
            }
          }
        }).catch(() => {});
      }

      toast.success("Ürün başarıyla eklendi ve yayınlandı!");
      logActivity("inventory_create", "inventory", undefined, { product_name: form.product_name });
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-[hsl(var(--muted)/0.3)] p-6 space-y-5">
          <DialogHeader className="p-0">
            <DialogTitle className="text-xl font-bold">Yeni Ürün Ekle</DialogTitle>
            <DialogDescription>Ürün bilgilerini girin, görselleri yükleyin ve yayınlayın.</DialogDescription>
          </DialogHeader>

          {/* Image Upload Section */}
          <div className="bg-background rounded-xl border border-border p-4 space-y-3">
            <Label className="text-sm font-semibold">Görseller</Label>
            <ImageDropzone images={images} onImagesChange={setImages} />
            {images.length > 0 && (
              <ImageProcessingOptions options={imgOptions} onChange={setImgOptions} />
            )}
          </div>

          {/* Product Info Card */}
          <div className="bg-background rounded-xl border border-border p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-xs font-semibold">İlan Başlığı *</Label>
                <p className="text-[10px] text-muted-foreground mb-1">(Otomatik EN çeviri yapılır)</p>
                <Input value={form.product_name} onChange={e => set("product_name", e.target.value)} placeholder="Samsung 55&quot; OLED TV" />
              </div>
              <div>
                <Label className="text-xs font-semibold">Marka</Label>
                <Input value={form.brand} onChange={e => set("brand", e.target.value)} placeholder="Samsung" className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">Model</Label>
                <Input value={form.model} onChange={e => set("model", e.target.value)} placeholder="QE55S95B" className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold">Kategori</Label>
                <Select value={form.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
                  <SelectContent>
                    {allCategories(categories).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Fiyat (₺) *</Label>
                  <Input type="number" value={form.original_price} onChange={e => set("original_price", e.target.value)} placeholder="25000" className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-semibold">Stok Adeti</Label>
                  <Input type="number" value={form.quantity} onChange={e => set("quantity", e.target.value)} placeholder="1" className="mt-1" />
                </div>
              </div>
            </div>

            {/* Attributes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs font-semibold">Özellikler</Label>
                <Button type="button" size="sm" variant="outline" onClick={addAttr} className="h-7 text-xs gap-1">
                  <Plus className="h-3 w-3" /> Özellik Ekle
                </Button>
              </div>
              {attrs.length === 0 && (
                <p className="text-xs text-muted-foreground">Kategori seçtiğinizde ilgili özellikler otomatik eklenir.</p>
              )}
              <div className="space-y-2">
                {attrs.map((a, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Input value={a.key} onChange={e => updateAttr(i, "key", e.target.value)} placeholder="Özellik (Ekran Boyutu)" className="h-8 text-xs flex-1" />
                    <Input value={a.value} onChange={e => updateAttr(i, "value", e.target.value)} placeholder="Değer (55&quot;)" className="h-8 text-xs flex-1" />
                    <Button type="button" size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => removeAttr(i)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-xs font-semibold">Açıklama</Label>
              <p className="text-[10px] text-muted-foreground mb-1">(Otomatik EN çeviri yapılır)</p>
              <Textarea value={form.description} onChange={e => set("description", e.target.value)} placeholder="Ürün açıklaması..." rows={3} className="text-sm" />
            </div>
          </div>

          {/* Save button */}
          <Button className="w-full h-11 gap-2 text-base font-semibold" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Kaydediliyor..." : "Ürünü Ekle ve Yayınla"}
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
  model?: string | null;
  images?: string[] | null;
  title_en?: string | null;
  description_en?: string | null;
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
  model: string;
  description: string;
  images: string[];
  title_en: string;
  description_en: string;
  attributes: Record<string, string>;
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
    model: item.model || "",
    category: item.category || "",
    description: item.description || "",
    original_price: item.original_price ? String(item.original_price) : "",
    sale_price: item.sale_price ? String(item.sale_price) : "",
    quantity: String(item.quantity),
    is_active: item.is_active,
  });

  // Initialize images from item
  const existingImages = (item.images as string[] || []).map((url: string, i: number) => ({
    url,
    iscover: url === item.image_url || (i === 0 && !item.image_url),
  }));
  // If item has image_url but not in images array, add it
  if (item.image_url && !existingImages.some(img => img.url === item.image_url)) {
    existingImages.unshift({ url: item.image_url, iscover: true });
  }
  const [images, setImages] = useState<{ url: string; path?: string; iscover?: boolean }[]>(
    existingImages.length > 0 ? existingImages : []
  );
  const [imgOptions, setImgOptions] = useState({ removeBg: false, autoScale: false, center: false });

  const existingAttrs = item.attributes || {};
  const [attrs, setAttrs] = useState<{ key: string; value: string }[]>(
    Object.entries(existingAttrs).map(([k, v]) => ({ key: k, value: String(v) }))
  );

  const set = (field: string, value: string | boolean) => setForm(p => ({ ...p, [field]: value }));

  const addAttr = () => setAttrs(p => [...p, { key: "", value: "" }]);
  const removeAttr = (i: number) => setAttrs(p => p.filter((_, idx) => idx !== i));
  const updateAttr = (i: number, field: "key" | "value", value: string) => {
    setAttrs(p => p.map((a, idx) => idx === i ? { ...a, [field]: value } : a));
  };

  const processImages = async (imageList: { url: string; path?: string }[]) => {
    if (!imgOptions.removeBg && !imgOptions.autoScale && !imgOptions.center) return imageList;
    const processed = [];
    for (const img of imageList) {
      if (!img.path) { processed.push(img); continue; }
      try {
        const { data, error } = await supabase.functions.invoke("process-product-image", {
          body: { imagePath: img.path, ...imgOptions },
        });
        if (error || !data?.url) { processed.push(img); continue; }
        processed.push({ ...img, url: data.url, path: data.path });
      } catch { processed.push(img); }
    }
    return processed;
  };

  const handleSave = async () => {
    if (!form.product_name.trim()) { toast.error("İlan başlığı zorunludur"); return; }
    setSaving(true);

    const attributes: Record<string, string> = {};
    attrs.forEach(a => { if (a.key.trim()) attributes[a.key.trim()] = a.value.trim(); });

    try {
      await ensureAdminSession();

      const processedImages = await processImages(images);
      const coverImage = processedImages.find(i => i.iscover) || processedImages[0];
      const imageUrls = processedImages.map(i => i.url);

      const { error } = await withTimeout(supabase.from("inventory").update({
        product_name: form.product_name.trim(),
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        category: form.category.trim() || null,
        description: form.description.trim() || null,
        original_price: form.original_price ? parseFloat(form.original_price) : null,
        sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
        quantity: parseInt(form.quantity) || 0,
        image_url: coverImage?.url || null,
        images: imageUrls.length > 0 ? imageUrls : [],
        is_active: form.is_active,
        attributes: Object.keys(attributes).length > 0 ? attributes : {},
        price_updated_at: new Date().toISOString(),
      }).eq("id", item.id).select(), 8000);

      if (error) { toast.error("Güncellenemedi: " + error.message); return; }

      // Async translation
      const textsToTranslate = [form.product_name.trim(), form.description.trim()].filter(Boolean);
      if (textsToTranslate.length > 0) {
        supabase.functions.invoke("ai-translate", {
          body: { texts: textsToTranslate, targetLang: "en" },
        }).then(({ data }) => {
          if (data?.translations) {
            const updateData: Record<string, string> = {};
            if (form.product_name.trim()) updateData.title_en = data.translations[0];
            if (form.description.trim()) updateData.description_en = data.translations[form.product_name.trim() ? 1 : 0];
            if (Object.keys(updateData).length > 0) {
              supabase.from("inventory").update(updateData).eq("id", item.id).select().then(() => {});
            }
          }
        }).catch(() => {});
      }

      toast.success("Ürün güncellendi!");
      logActivity("inventory_update", "inventory", item.id, { product_name: form.product_name });
      onOpenChange(false);
      onSaved();
    } catch (e: any) {
      toast.error(getErrorMessage(e));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-[hsl(var(--muted)/0.3)] p-6 space-y-5">
          <DialogHeader className="p-0">
            <DialogTitle className="text-xl font-bold">Ürün Düzenle</DialogTitle>
            <DialogDescription>Ürün bilgilerini düzenleyin.</DialogDescription>
          </DialogHeader>

          {/* Image Upload Section */}
          <div className="bg-background rounded-xl border border-border p-4 space-y-3">
            <Label className="text-sm font-semibold">Görseller</Label>
            <ImageDropzone images={images} onImagesChange={setImages} productId={item.id} />
            {images.length > 0 && (
              <ImageProcessingOptions options={imgOptions} onChange={setImgOptions} />
            )}
          </div>

          {/* Product Info Card */}
          <div className="bg-background rounded-xl border border-border p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label className="text-xs font-semibold">İlan Başlığı *</Label>
                <p className="text-[10px] text-muted-foreground mb-1">(Otomatik EN çeviri yapılır)</p>
                <Input value={form.product_name} onChange={e => set("product_name", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs font-semibold">Marka</Label>
                <Input value={form.brand} onChange={e => set("brand", e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs font-semibold">Model</Label>
                <Input value={form.model} onChange={e => set("model", e.target.value)} className="mt-1" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold">Kategori</Label>
                <Select value={form.category} onValueChange={v => set("category", v)}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Kategori seçin" /></SelectTrigger>
                  <SelectContent>
                    {allCategories(categories).map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-semibold">Fiyat (₺)</Label>
                  <Input type="number" value={form.original_price} onChange={e => set("original_price", e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-semibold">İndirimli (₺)</Label>
                  <Input type="number" value={form.sale_price} onChange={e => set("sale_price", e.target.value)} className="mt-1" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs font-semibold">Stok Adeti</Label>
                <Input type="number" value={form.quantity} onChange={e => set("quantity", e.target.value)} className="mt-1" />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <Switch checked={form.is_active as boolean} onCheckedChange={v => set("is_active", v)} />
                <Label className="text-xs">{form.is_active ? "Aktif" : "Pasif"}</Label>
              </div>
            </div>

            {/* Attributes */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-xs font-semibold">Özellikler</Label>
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

            {/* Description */}
            <div>
              <Label className="text-xs font-semibold">Açıklama</Label>
              <p className="text-[10px] text-muted-foreground mb-1">(Otomatik EN çeviri yapılır)</p>
              <Textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} className="text-sm" />
            </div>
          </div>

          {/* Save button */}
          <Button className="w-full h-11 gap-2 text-base font-semibold" onClick={handleSave} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {saving ? "Kaydediliyor..." : "Güncelle ve Yayınla"}
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
