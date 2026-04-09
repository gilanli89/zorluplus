

## Admin Stok Yönetimi — Toplu Seçim, Silme ve Değişiklik

### Mevcut Durum
Admin envanter sayfası tek tek ürün düzenleme, aktif/pasif toggle ve batch publish destekliyor. Ancak checkbox ile ürün seçme, toplu silme ve toplu değişiklik (kategori, aktiflik, fiyat vb.) özellikleri yok.

### Yapılacaklar

#### 1. Checkbox ile Seçim Sistemi
- Tabloya ilk sütun olarak checkbox ekle (thead'de "tümünü seç" checkbox'ı)
- `selectedIds: Set<string>` state'i ekle
- Sayfadaki tüm ürünleri seçme/kaldırma toggle'ı
- Seçili ürün sayısını gösteren bilgi barı

#### 2. Toplu İşlem Barı (Bulk Actions Bar)
Seçili ürün varken ekranın üstünde sticky bar göster:
- **Toplu Sil**: Seçili ürünleri veritabanından kalıcı sil (onay dialog'u ile)
- **Toplu Pasif Yap**: Seçili ürünleri `is_active = false` yap
- **Toplu Aktif Yap**: Seçili ürünleri `is_active = true` yap
- **Toplu Kategori Değiştir**: Dropdown ile kategori seç, seçili ürünlere uygula
- Seçimi temizle butonu

#### 3. Onay Dialog'u
Silme ve toplu değişiklik işlemlerinden önce AlertDialog ile onay iste:
- Kaç ürünün etkileneceğini göster
- İşlem türünü belirt (silme geri alınamaz uyarısı)

#### 4. RLS Kontrolü
Mevcut `"Admins can manage inventory"` ALL politikası DELETE dahil tüm işlemleri kapsıyor — ek migration gerekmez.

### Teknik Detaylar

**Dosya:** `src/pages/admin/AdminInventory.tsx`

Yeni state'ler:
```typescript
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
```

Toplu silme fonksiyonu:
```typescript
const bulkDelete = async () => {
  const ids = Array.from(selectedIds);
  const { error } = await supabase.from("inventory").delete().in("id", ids);
  // ...
};
```

Toplu güncelleme fonksiyonu:
```typescript
const bulkUpdate = async (fields: Partial<InventoryItem>) => {
  const ids = Array.from(selectedIds);
  const { error } = await supabase.from("inventory").update(fields).in("id", ids);
  // ...
};
```

Tablo header'ına checkbox:
```tsx
<th className="w-[40px] px-2">
  <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
</th>
```

### Olası Riskler
- Toplu silme geri alınamaz — onay dialog'u ile korunacak
- 1000+ ürün seçilirse Supabase `.in()` limiti aşılabilir — chunk'lara bölme uygulanacak
- Mevcut pending changes barı ile bulk actions barı çakışabilir — ayrı z-index ve konum ile düzenlenecek

