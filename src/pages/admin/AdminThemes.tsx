import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Plus, Loader2, Palette, Calendar, Trash2, Eye, Sun, Moon, Sparkles,
} from "lucide-react";
import { PremiumIconInline } from "@/components/PremiumIcon";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { getTodaySpecialDay } from "@/lib/specialDays";

// ── Types ───────────────────────────────────────────────────────────────────

interface ThemeOverride {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  primaryColor: string;
  accentColor: string;
  bannerGradient: string;
  bannerImage: string;
  buttonStyle: string;
  iconStyle: string;
  isActive: boolean;
}

interface ThemeForm {
  name: string;
  startDate: string;
  endDate: string;
  primaryColor: string;
  accentColor: string;
  bannerGradient: string;
  bannerImage: string;
  buttonStyle: string;
  iconStyle: string;
}

const EMPTY_FORM: ThemeForm = {
  name: "",
  startDate: "",
  endDate: "",
  primaryColor: "#6366f1",
  accentColor: "#f59e0b",
  bannerGradient: "from-primary to-accent",
  bannerImage: "",
  buttonStyle: "rounded-full",
  iconStyle: "default",
};

const GRADIENT_PRESETS = [
  { label: "Varsayilan", value: "from-primary to-accent" },
  { label: "Gece", value: "from-slate-900 to-indigo-900" },
  { label: "Gunbatimi", value: "from-orange-500 to-pink-600" },
  { label: "Orman", value: "from-green-600 to-emerald-800" },
  { label: "Okyanus", value: "from-blue-500 to-cyan-600" },
  { label: "Bayrak", value: "from-red-700 to-red-500" },
  { label: "Ramazan", value: "from-emerald-700 to-yellow-600" },
  { label: "Sevgililer", value: "from-rose-500 to-pink-600" },
];

const BUTTON_PRESETS = [
  { label: "Yuvarlak", value: "rounded-full" },
  { label: "Kose", value: "rounded-lg" },
  { label: "Keskin", value: "rounded-none" },
  { label: "Pill", value: "rounded-full px-8" },
];

const ICON_PRESETS = [
  { label: "Varsayilan", value: "default" },
  { label: "Parlak", value: "glow" },
  { label: "Gradyan", value: "gradient" },
  { label: "Yuzen", value: "float" },
];

const STORAGE_KEY = "zorlu-theme-overrides";

function loadThemes(): ThemeOverride[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveThemes(themes: ThemeOverride[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(themes));
}

// ── Upcoming special days ───────────────────────────────────────────────────

const UPCOMING_SPECIAL_DAYS = [
  { date: "2026-04-23", name: "23 Nisan Ulusal Egemenlik ve Cocuk Bayrami" },
  { date: "2026-05-01", name: "1 Mayis Emek ve Dayanisma Gunu" },
  { date: "2026-05-19", name: "19 Mayis Ataturk'u Anma Genclik ve Spor Bayrami" },
  { date: "2026-05-27", name: "Kurban Bayrami (Baslangic)" },
  { date: "2026-07-20", name: "20 Temmuz Baris ve Ozgurluk Bayrami" },
  { date: "2026-08-30", name: "30 Agustos Zafer Bayrami" },
  { date: "2026-10-29", name: "29 Ekim Cumhuriyet Bayrami" },
  { date: "2026-11-15", name: "15 Kasim Cumhuriyet Bayrami (KKTC)" },
];

// ── Component ───────────────────────────────────────────────────────────────

export default function AdminThemes() {
  const [themes, setThemes] = useState<ThemeOverride[]>(loadThemes);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState<ThemeForm>(EMPTY_FORM);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<ThemeOverride | null>(null);

  const todaySpecial = useMemo(() => getTodaySpecialDay(), []);

  useEffect(() => {
    saveThemes(themes);
  }, [themes]);

  const addTheme = () => {
    if (!form.name || !form.startDate || !form.endDate) {
      toast.error("Lutfen tum alanlari doldurun");
      return;
    }
    const newTheme: ThemeOverride = {
      id: crypto.randomUUID(),
      ...form,
      isActive: true,
    };
    setThemes((prev) => [...prev, newTheme]);
    toast.success("Tema olusturuldu");
    setAddOpen(false);
    setForm(EMPTY_FORM);
  };

  const toggleActive = (id: string) => {
    setThemes((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
    toast.success("Tema durumu guncellendi");
  };

  const deleteTheme = (id: string) => {
    setThemes((prev) => prev.filter((t) => t.id !== id));
    toast.success("Tema silindi");
  };

  const openPreview = (theme: ThemeOverride) => {
    setPreviewTheme(theme);
    setPreviewOpen(true);
  };

  const getStatus = (t: ThemeOverride) => {
    if (!t.isActive) return "inactive";
    const now = new Date();
    if (now < new Date(t.startDate)) return "scheduled";
    if (now > new Date(t.endDate)) return "expired";
    return "active";
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Tema & Ozel Gun Yonetimi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {todaySpecial ? `Bugun: ${todaySpecial.name}` : "Bugun ozel bir gun yok"}
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-full" onClick={() => setForm(EMPTY_FORM)}>
              <PremiumIconInline icon={Plus} size={16} className="text-white" /> Tema Olustur
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Tema Olustur</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <label className="text-sm font-medium mb-1 block">Tema Adi *</label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Ornek: Ramazan Temasi" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Baslangic Tarihi *</label>
                  <Input type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Bitis Tarihi *</label>
                  <Input type="date" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Ana Renk</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={form.primaryColor} onChange={(e) => setForm((f) => ({ ...f, primaryColor: e.target.value }))} className="w-10 h-10 rounded-lg border cursor-pointer" />
                    <Input value={form.primaryColor} onChange={(e) => setForm((f) => ({ ...f, primaryColor: e.target.value }))} className="flex-1" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Vurgu Renk</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" value={form.accentColor} onChange={(e) => setForm((f) => ({ ...f, accentColor: e.target.value }))} className="w-10 h-10 rounded-lg border cursor-pointer" />
                    <Input value={form.accentColor} onChange={(e) => setForm((f) => ({ ...f, accentColor: e.target.value }))} className="flex-1" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Banner Gradyan</label>
                <Select value={form.bannerGradient} onValueChange={(v) => setForm((f) => ({ ...f, bannerGradient: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {GRADIENT_PRESETS.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-6 h-3 rounded bg-gradient-to-r ${g.value}`} />
                          {g.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Banner Gorsel URL</label>
                <Input value={form.bannerImage} onChange={(e) => setForm((f) => ({ ...f, bannerImage: e.target.value }))} placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Buton Stili</label>
                  <Select value={form.buttonStyle} onValueChange={(v) => setForm((f) => ({ ...f, buttonStyle: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {BUTTON_PRESETS.map((b) => (
                        <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Ikon Stili</label>
                  <Select value={form.iconStyle} onValueChange={(v) => setForm((f) => ({ ...f, iconStyle: v }))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {ICON_PRESETS.map((i) => (
                        <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddOpen(false)}>Iptal</Button>
              <Button onClick={addTheme} className="gap-2">
                <Palette className="h-4 w-4" /> Olustur
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Upcoming Special Days Calendar */}
      <div className="card-premium card-premium-border rounded-2xl p-6 mb-6">
        <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <PremiumIconInline icon={Calendar} size={20} /> Yaklasan Ozel Gunler
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {UPCOMING_SPECIAL_DAYS.map((day) => {
            const d = new Date(day.date);
            const isPast = d < new Date();
            return (
              <div
                key={day.date}
                className={`p-3 rounded-xl border ${isPast ? "opacity-50 bg-muted/30" : "bg-muted/50 hover:bg-muted/80"} transition`}
              >
                <div className="text-xs text-muted-foreground">{d.toLocaleDateString("tr-TR", { weekday: "long", day: "numeric", month: "long" })}</div>
                <div className="text-sm font-medium mt-1">{day.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Theme list */}
      <div className="card-premium card-premium-border rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold">Tema</th>
                <th className="text-left px-4 py-3 font-semibold">Tarih Araligi</th>
                <th className="text-left px-4 py-3 font-semibold">Renkler</th>
                <th className="text-left px-4 py-3 font-semibold">Banner</th>
                <th className="text-left px-4 py-3 font-semibold">Durum</th>
                <th className="text-left px-4 py-3 font-semibold">Aktif</th>
                <th className="text-left px-4 py-3 font-semibold">Islem</th>
              </tr>
            </thead>
            <tbody>
              {themes.map((t) => {
                const status = getStatus(t);
                return (
                  <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium">{t.name}</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">
                      {new Date(t.startDate).toLocaleDateString("tr-TR")} - {new Date(t.endDate).toLocaleDateString("tr-TR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: t.primaryColor }} title="Ana Renk" />
                        <div className="w-6 h-6 rounded-full border" style={{ backgroundColor: t.accentColor }} title="Vurgu Renk" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className={`w-20 h-6 rounded bg-gradient-to-r ${t.bannerGradient}`} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={
                        status === "active" ? "bg-success/10 text-success" :
                        status === "scheduled" ? "bg-primary/10 text-primary" :
                        status === "inactive" ? "bg-muted text-muted-foreground" :
                        "bg-muted text-muted-foreground"
                      }>
                        {status === "active" ? "Aktif" : status === "scheduled" ? "Planlanmis" : status === "inactive" ? "Pasif" : "Bitmis"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Switch checked={t.isActive} onCheckedChange={() => toggleActive(t.id)} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => openPreview(t)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive" onClick={() => deleteTheme(t.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {themes.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-muted-foreground">
                    Henuz tema olusturulmamis
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Theme Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Tema Onizleme: {previewTheme?.name}</DialogTitle>
          </DialogHeader>
          {previewTheme && (
            <div className="space-y-4">
              {/* Banner preview */}
              <div className={`h-32 rounded-xl bg-gradient-to-r ${previewTheme.bannerGradient} flex items-center justify-center`}>
                <div className="text-white text-center">
                  <h3 className="text-xl font-bold">Zorlu Digital Plaza</h3>
                  <p className="text-sm opacity-80">{previewTheme.name}</p>
                </div>
              </div>
              {/* Color preview */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: previewTheme.primaryColor }} />
                  <span className="text-sm">Ana Renk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: previewTheme.accentColor }} />
                  <span className="text-sm">Vurgu Renk</span>
                </div>
              </div>
              {/* Button preview */}
              <div className="flex gap-2">
                <button className={`px-4 py-2 text-white text-sm font-medium ${previewTheme.buttonStyle}`} style={{ backgroundColor: previewTheme.primaryColor }}>
                  Sepete Ekle
                </button>
                <button className={`px-4 py-2 text-white text-sm font-medium ${previewTheme.buttonStyle}`} style={{ backgroundColor: previewTheme.accentColor }}>
                  Hemen Al
                </button>
              </div>
              {/* Info */}
              <div className="text-xs text-muted-foreground space-y-1">
                <p>Buton: {BUTTON_PRESETS.find((b) => b.value === previewTheme.buttonStyle)?.label}</p>
                <p>Ikon: {ICON_PRESETS.find((i) => i.value === previewTheme.iconStyle)?.label}</p>
                <p>Tarih: {new Date(previewTheme.startDate).toLocaleDateString("tr-TR")} - {new Date(previewTheme.endDate).toLocaleDateString("tr-TR")}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
