

## Sorun Analizi

Admin paneldeki tüm işlemler iki farklı yaklaşım kullanıyor:

| İşlem | Mevcut Davranış | Sorun |
|-------|----------------|-------|
| Switch toggle (tekil) | `pendingChanges` Map'e ekler → "Yayınla" butonuna basılmalı → sıralı 15s timeout | Uzun bekleme |
| Fiyat/stok düzenleme | `pendingChanges` Map'e ekler → "Yayınla" → sıralı 15s timeout | Uzun bekleme |
| Bulk delete (checkbox) | Session yenilemesi yok, timeout koruması yok | Takılma riski |
| Bulk aktif/pasif (checkbox) | Session yenilemesi yok, timeout koruması yok | Takılma riski |
| Bulk kategori | Session yenilemesi yok, timeout koruması yok | Takılma riski |

**Kök neden**: Tüm timeout'lar 15 saniye, session yenilemesi eksik, ve değişiklikler sıralı (sequential) işleniyor.

---

## Çözüm Planı

Tek dosya değişecek: `src/pages/admin/AdminInventory.tsx`

### 1. Switch toggle → Anında DB güncelleme
- `handleToggleActive` fonksiyonunu `pendingChanges`'a eklemekten çıkar
- Doğrudan `supabase.from("inventory").update({ is_active }).eq("id", id)` çağrısı yap
- 5 saniye timeout + session yenilemesi ekle
- Hata durumunda 3 saniye içinde açıklayıcı toast göster

### 2. publishChanges → Paralel toplu güncelleme, 5s timeout
- Tüm pending değişiklikleri `Promise.all` ile paralel gönder (sıralı değil)
- Her birinde 5 saniye timeout
- Session yenilemesi başta bir kez yapılsın
- 3 saniye sonra hata mesajı gösterilsin

### 3. Tüm bulk operasyonlara (delete, aktif/pasif, kategori) koruma ekle
- Her fonksiyonun başına `await supabase.auth.getSession()` ekle
- Timeout'ları 15s → 5s'e düşür
- Hata durumunda açıklayıcı mesaj: "Oturum süresi dolmuş olabilir" veya "Ağ hatası"

### 4. AddProduct ve EditProduct dialog timeout'larını 5s'e düşür
- Mevcut 15s timeout'ları 5s'e çek
- Hata mesajlarını 3 saniye içinde net göster

### Beklenen Sonuç
- Hiçbir işlem 5 saniyeden uzun sürmez
- Hata varsa 3 saniye içinde kullanıcıya açıklayıcı mesaj verilir
- Switch toggle anında çalışır (Yayınla butonuna gerek kalmaz)
- Fiyat/stok değişiklikleri paralel gönderilir

