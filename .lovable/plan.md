

## Problem

Admin panelden silinen/deaktive edilen ürünler, `staleTime: 5 dakika` olmasına rağmen 15+ dakika sonra bile sitede görünmeye devam ediyor. Bunun nedeni:

1. **React Query sadece window focus'ta refetch yapar** — kullanıcı sekmeyi değiştirmediyse refetch tetiklenmez
2. **CSV verileri cache'lenmiş olabilir** — tarayıcı HTTP cache'inden eski CSV dönüyor
3. **Realtime yok** — veritabanı değişiklikleri istemciye push edilmiyor

## Çözüm: Realtime Subscription ile Anlık Güncelleme

### 1. `inventory` tablosunu Realtime'a ekle (Migration)
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.inventory;
```

### 2. `useProducts.ts`'e Realtime dinleyici ekle
- `useQueryClient` ile query client'a erişim
- `supabase.channel('inventory-changes')` ile `inventory` tablosundaki `INSERT`, `UPDATE`, `DELETE` olaylarını dinle
- Değişiklik geldiğinde `queryClient.invalidateQueries({ queryKey: ["products"] })` çağır → anlık refetch
- Component unmount'ta channel cleanup

### 3. `staleTime`'ı 2 dakikaya düşür (fallback)
Realtime bağlantı kopsa bile makul sürede güncelleme gelsin.

### Dosya Değişiklikleri
1. **Migration** — `ALTER PUBLICATION supabase_realtime ADD TABLE public.inventory`
2. **`src/hooks/useProducts.ts`** — Realtime subscription + `staleTime` düşürme

Bu sayede admin panelden yapılan her silme/güncelleme işlemi **saniyeler içinde** canlı siteye yansıyacak.

