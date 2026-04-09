

## Fix: Kullanıcı Rol Detay Dialog'u Düzeltme

### Sorun
Konsol loglarında `DialogFooter` bileşenine ref verilemiyor hatası ve `DialogDescription` eksikliği uyarısı var. Bu, rol düzenleme dialog'unun düzgün render edilmemesine neden oluyor.

### Çözüm

**`src/pages/admin/AdminUsers.tsx` düzeltmeleri:**

1. Rol detay dialog'una `DialogDescription` ekle (accessibility uyarısını gider)
2. "Yeni Kullanıcı" dialog'una da `DialogDescription` ekle
3. Dialog'ların düzgün çalıştığından emin ol

**`src/components/ui/dialog.tsx` düzeltmesi:**

1. `DialogFooter` bileşenini `React.forwardRef` ile sar (ref hatası çözülür)
2. `DialogHeader` bileşenini de `React.forwardRef` ile sar (tutarlılık)

### Teknik Detay
- `DialogFooter` şu an düz bir function component; Radix Dialog içsel olarak ref geçmeye çalışıyor ve hata veriyor
- `DialogDescription` eklenmezse Radix erişilebilirlik uyarısı veriyor
- Her iki sorun da dialog'un düzgün çalışmamasına neden olabiliyor

