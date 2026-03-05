import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ShieldPlus, Zap, ArrowLeft, CreditCard, Banknote, Package, Building2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/products";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import { BRAND } from "@/lib/constants";

const EXPRESS_FEE = 2000;

export default function CartPage() {
  const {
    items, removeItem, updateQuantity, clearCart, addItem,
    toggleWarranty, toggleExpressDelivery,
    subtotal, warrantyTotal, expressTotal, grandTotal, itemCount,
  } = useCart();

  const { data: allProducts = [] } = useProducts();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash" | "transfer">("card");
  const [customerInfo, setCustomerInfo] = useState({ name: "", phone: "", email: "", address: "" });

  // Check if any cart item is a TV
  const hasTv = items.some(i => i.product.category === "tv-goruntu" && !i.product.subcategory?.includes("aksesuar"));

  // Recommended products: TV mounts + HDMI cables (not already in cart)
  const recommended = useMemo(() => {
    if (!hasTv) return [];
    const cartIds = new Set(items.map(i => i.product.id));
    return allProducts.filter(p => {
      if (cartIds.has(p.id)) return false;
      const nameL = p.name.toLowerCase();
      const catL = (p.category + " " + p.subcategory).toLowerCase();
      return nameL.includes("hdmi") || nameL.includes("askı") || nameL.includes("mount") || catL.includes("tv askı");
    }).slice(0, 6);
  }, [hasTv, items, allProducts]);

  if (items.length === 0) {
    return (
      <div className="container max-w-3xl py-16 text-center">
        <ShoppingCart className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Sepetiniz Boş</h1>
        <p className="text-muted-foreground mb-6">Alışverişe başlamak için ürünleri keşfedin.</p>
        <Link to="/">
          <Button className="rounded-full gap-2"><ArrowLeft className="h-4 w-4" /> Alışverişe Başla</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast.error("Lütfen ad, telefon ve adres bilgilerinizi giriniz.");
      return;
    }

    const orderId = `ORD-${Date.now()}`;
    const orderItems = items.map(i => ({
      productId: i.product.id,
      name: i.product.name,
      sku: i.product.sku,
      quantity: i.quantity,
      unitPrice: i.product.salePrice || i.product.price,
      extendedWarranty: i.extendedWarranty,
      expressDelivery: i.expressDelivery,
    }));

    // Save order to DB
    try {
      await supabase.from("orders").insert({
        order_number: orderId,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_email: customerInfo.email || null,
        shipping_address: customerInfo.address || null,
        items: orderItems,
        total_amount: grandTotal,
        status: paymentMethod === "card" ? "pending" : "pending",
        payment_method: paymentMethod === "card" ? "cardplus" : paymentMethod === "transfer" ? "bank_transfer" : "cash_on_delivery",
      });
    } catch (err) {
      console.error("Order save error:", err);
    }

    if (paymentMethod === "card") {
      const params = new URLSearchParams({
        orderId,
        product: items.map(i => i.product.name).join(", "),
      });
      window.location.href = `/odeme?${params.toString()}`;
    } else {
      // Cash on delivery or bank transfer — send WhatsApp order
      const methodLabel = paymentMethod === "transfer" ? "Havale/EFT" : "Kapıda Ödeme";
      const orderLines = items.map(i => {
        const price = i.product.salePrice || i.product.price;
        let line = `• ${i.product.name} x${i.quantity} — ${formatPrice(price * i.quantity)}`;
        if (i.extendedWarranty) line += ` (+2 Yıl Garanti: ${formatPrice(price * 0.5 * i.quantity)})`;
        if (i.expressDelivery) line += ` (Express Kurulum: ${formatPrice(EXPRESS_FEE * i.quantity)})`;
        return line;
      }).join("\n");

      const message = `🛒 Yeni Sipariş (${methodLabel})\n\nSipariş No: ${orderId}\n\n${orderLines}\n\n💰 Toplam: ${formatPrice(grandTotal)}\n\n👤 ${customerInfo.name}\n📱 ${customerInfo.phone}\n📧 ${customerInfo.email}\n📍 ${customerInfo.address}`;

      window.open(`https://wa.me/${BRAND.phone.replace(/\s/g, "")}?text=${encodeURIComponent(message)}`, "_blank");
      toast.success(paymentMethod === "transfer" ? "Siparişiniz oluşturuldu! Havale sonrası onaylanacaktır." : "Siparişiniz oluşturuldu!");
      clearCart();
    }
  };

  return (
    <div className="container max-w-4xl py-6 md:py-10">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> Alışverişe Devam Et
      </Link>

      <h1 className="font-display text-2xl font-bold text-foreground mb-6">
        Sepetim <span className="text-muted-foreground font-normal text-lg">({itemCount} ürün)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => {
            const price = item.product.salePrice || item.product.price;
            const warrantyPrice = price * 0.5;
            const isAccessory = /hdmi|askı|mount|kablo|aparat/i.test(item.product.name) || item.product.subcategory?.includes("aksesuar");
            const showExpress = index === 0;

            return (
              <Card key={item.product.id} className="border-border">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link to={`/urun/${item.product.slug}`}>
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-24 w-24 rounded-xl object-contain bg-muted/50 border border-border p-2"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-primary/70 uppercase">{item.product.brand}</p>
                      <Link to={`/urun/${item.product.slug}`}>
                        <p className="text-sm font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">{item.product.name}</p>
                      </Link>
                      {/* price hidden */}

                      {/* Quantity */}
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-full" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground hover:text-destructive gap-1" onClick={() => removeItem(item.product.id)}>
                          <Trash2 className="h-4 w-4" /> Sil
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Upsells */}
                  {(!isAccessory || showExpress) && (
                    <div className="mt-4 space-y-3 border-t border-border pt-4">
                      {/* Extended Warranty - hide for accessories */}
                      {!isAccessory && (
                        <div className="flex items-start gap-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-3">
                          <ShieldPlus className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-semibold text-foreground">+2 Yıl Ekstra Garanti</p>
                                <p className="text-xs text-muted-foreground">Toplam 4 yıl garanti kapsamı</p>
                              </div>
                              <Switch
                                checked={item.extendedWarranty}
                                onCheckedChange={() => toggleWarranty(item.product.id)}
                              />
                            </div>
                            <p className="text-sm font-bold text-amber-700 dark:text-amber-400 mt-1">
                              Garanti Ücreti
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Express Delivery - only for first item */}
                      {showExpress && (
                        <div className="flex items-start gap-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-3">
                          <Zap className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm font-semibold text-foreground">Express Kurulum (Bugün)</p>
                                <p className="text-xs text-muted-foreground">Aynı gün teslimat ve kurulum</p>
                              </div>
                              <Switch
                                checked={item.expressDelivery}
                                onCheckedChange={() => toggleExpressDelivery(item.product.id)}
                              />
                            </div>
                            <p className="text-sm font-bold text-blue-700 dark:text-blue-400 mt-1">
                              +{formatPrice(EXPRESS_FEE)}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
          {/* Recommended Products for TV */}
          {recommended.length > 0 && (
            <div className="mt-6">
              <h3 className="font-display font-bold text-foreground text-lg mb-3 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" /> Birlikte Öneriliyor
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {recommended.map(rp => {
                  const rpPrice = rp.salePrice || rp.price;
                  return (
                    <Card key={rp.id} className="border-border overflow-hidden">
                      <CardContent className="p-3">
                        <Link to={`/urun/${rp.slug}`}>
                          <img src={rp.image} alt={rp.name} className="h-20 w-full object-contain mb-2" loading="lazy" />
                        </Link>
                        <p className="text-xs font-medium text-foreground line-clamp-2 mb-1">{rp.name}</p>
                        <p className="text-sm font-bold text-foreground mb-2">{formatPrice(rpPrice)}</p>
                        <Button
                          size="sm"
                          className="w-full rounded-full text-xs gap-1"
                          onClick={() => { addItem(rp); toast.success(`${rp.name} sepete eklendi`); }}
                        >
                          <ShoppingCart className="h-3 w-3" /> Sepete Ekle
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Summary + Payment */}
        <div className="space-y-4">
          {/* Customer Info */}
          <Card className="border-border">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-display font-bold text-foreground">Müşteri Bilgileri</h3>
              <Input
                placeholder="Ad Soyad *"
                value={customerInfo.name}
                onChange={e => setCustomerInfo(p => ({ ...p, name: e.target.value }))}
              />
              <Input
                placeholder="Telefon *"
                value={customerInfo.phone}
                onChange={e => setCustomerInfo(p => ({ ...p, phone: e.target.value }))}
                inputMode="tel"
              />
              <Input
                placeholder="E-posta"
                value={customerInfo.email}
                onChange={e => setCustomerInfo(p => ({ ...p, email: e.target.value }))}
                type="email"
              />
              <Input
                placeholder="Teslimat Adresi *"
                value={customerInfo.address}
                onChange={e => setCustomerInfo(p => ({ ...p, address: e.target.value }))}
              />
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="border-border">
            <CardContent className="p-4 space-y-3">
              <h3 className="font-display font-bold text-foreground">Ödeme Yöntemi</h3>
              <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as "card" | "cash" | "transfer")}>
                <div className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Kredi Kartı</p>
                      <p className="text-xs text-muted-foreground">3D Secure güvenli ödeme</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="transfer" id="transfer" />
                  <Label htmlFor="transfer" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Building2 className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Havale / EFT</p>
                      <p className="text-xs text-muted-foreground">Banka havalesi ile ödeme</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                    <Banknote className="h-4 w-4 text-primary" />
                    <div>
                      <p className="font-semibold text-sm">Kapıda Ödeme</p>
                      <p className="text-xs text-muted-foreground">Nakit veya POS ile</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
              {paymentMethod === "transfer" && (
                <div className="mt-3 rounded-xl bg-muted/50 border border-border p-4 space-y-1.5">
                  <p className="text-sm font-bold text-foreground">Banka Hesap Bilgileri</p>
                  <p className="text-xs text-muted-foreground">Zorlu Digital Trade and Services Ltd.</p>
                  <p className="text-xs text-muted-foreground">Türkiye İş Bankası — Hamitköy Lefkoşa Şubesi</p>
                  <p className="text-xs font-mono font-semibold text-foreground select-all">TR75 0006 4000 0016 8180 8102 16</p>
                  <p className="text-xs text-muted-foreground mt-2">Açıklama kısmına sipariş numaranızı yazınız.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="border-border bg-muted/30">
            <CardContent className="p-4 space-y-2">
              <h3 className="font-display font-bold text-foreground mb-3">Sipariş Özeti</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ürünler ({itemCount})</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              {warrantyTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">+2 Yıl Garanti</span>
                  <span className="font-medium text-amber-600">{formatPrice(warrantyTotal)}</span>
                </div>
              )}
              {expressTotal > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-blue-600">Express Kurulum</span>
                  <span className="font-medium text-blue-600">{formatPrice(expressTotal)}</span>
                </div>
              )}
              <hr className="border-border" />
              <div className="flex justify-between text-lg font-bold">
                <span className="text-foreground">Toplam</span>
                <span className="text-primary">{formatPrice(grandTotal)}</span>
              </div>

              <Button
                className="w-full rounded-full font-semibold gap-2 mt-2"
                size="lg"
                onClick={handleCheckout}
              >
                {paymentMethod === "card" ? (
                  <><CreditCard className="h-4 w-4" /> Kredi Kartı ile Öde</>
                ) : paymentMethod === "transfer" ? (
                  <><Building2 className="h-4 w-4" /> Havale ile Sipariş Ver</>
                ) : (
                  <><Banknote className="h-4 w-4" /> Kapıda Ödeme ile Sipariş Ver</>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
