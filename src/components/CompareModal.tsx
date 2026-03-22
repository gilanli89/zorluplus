import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, ExternalLink, MessageCircle } from "lucide-react";
import { useCompare } from "@/contexts/CompareContext";
import { formatPrice, getWhatsAppLink } from "@/lib/products";
import { getProductAttrs } from "@/hooks/useProductFilter";
import { Link } from "react-router-dom";

export default function CompareModal() {
  const { items, removeItem, isOpen, setIsOpen } = useCompare();

  if (items.length < 2) return null;

  // Collect all spec keys across all products
  const allSpecKeys = new Set<string>();
  const allAttrKeys = new Set<string>();

  items.forEach((p) => {
    Object.keys(p.specs).forEach((k) => allSpecKeys.add(k));
    const attrs = getProductAttrs(p);
    Object.keys(attrs).forEach((k) => {
      if (k !== "brand") allAttrKeys.add(k);
    });
  });

  // Combine and deduplicate
  const specRows = [...allSpecKeys];
  const attrRows = [...allAttrKeys].filter((k) => !allSpecKeys.has(k));

  // Friendly labels for common attr keys
  const ATTR_LABELS: Record<string, string> = {
    screen_size_inch: "Ekran Boyutu",
    panel_type: "Panel Türü",
    resolution: "Çözünürlük",
    refresh_hz: "Yenileme Hızı",
    smart_tv: "Smart TV",
    os: "İşletim Sistemi",
    ac_type: "Klima Tipi",
    btu: "BTU",
    inverter: "Inverter",
    no_frost: "No-Frost",
    capacity_lt: "Kapasite (LT)",
    capacity_kg: "Kapasite (KG)",
    fridge_type: "Buzdolabı Tipi",
    freezer_type: "Dondurucu Tipi",
    water_type: "Damacana Yeri",
    water_size: "Boy",
    color: "Renk",
    wifi: "Wi-Fi",
    watt: "Güç (Watt)",
    coffee_type: "Kahve Türü",
    microwave_type: "Mikrodalga Tipi",
    grill: "Izgara",
    stove_type: "Ocak Tipi",
    surface: "Yüzey",
    hood_type: "Davlumbaz Tipi",
    vacuum_type: "Süpürge Tipi",
    bagless: "Toz Torbasız",
    heater_mount: "Montaj",
    audio_type: "Ses Tipi",
    mount_type: "Askı Tipi",
    fan_type: "Vantilatör Tipi",
    dishwasher_type: "Montaj Tipi",
    program_count: "Program Sayısı",
    has_dryer: "Kurutmalı",
    water_dispenser: "Su Pınarı",
    remote_type: "Kumanda Tipi",
    thermostat: "Termostat",
    timer: "Zamanlayıcı",
  };

  const formatAttrValue = (val: string | number | boolean): string => {
    if (typeof val === "boolean") return val ? "Evet" : "Hayır";
    return String(val);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[90vh] p-0">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="font-display text-lg">
            Ürün Karşılaştırma ({items.length} ürün)
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="p-4 overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              {/* Product headers */}
              <thead>
                <tr>
                  <th className="w-[140px] p-2 text-left text-xs font-semibold text-muted-foreground align-top sticky left-0 bg-background z-10">
                    Ürün
                  </th>
                  {items.map((product) => (
                    <th
                      key={product.id}
                      className="p-2 text-center align-top min-w-[180px]"
                    >
                      <div className="relative group">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                        <div className="w-24 h-24 mx-auto mb-2 rounded-xl border border-border bg-muted/30 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <p className="text-[10px] text-primary/70 font-semibold uppercase">
                          {product.brand}
                        </p>
                        <Link
                          to={`/urun/${product.slug}`}
                          className="text-xs font-semibold text-foreground hover:text-primary line-clamp-2 leading-snug"
                          onClick={() => setIsOpen(false)}
                        >
                          {product.name}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Price row */}
                <tr className="border-t border-border bg-muted/30">
                  <td className="p-2.5 text-xs font-semibold text-foreground sticky left-0 bg-muted/30">
                    Fiyat
                  </td>
                  {items.map((product) => (
                    <td key={product.id} className="p-2.5 text-center">
                      {product.salePrice ? (
                        <div>
                          <span className="text-sm font-bold text-primary">
                            {formatPrice(product.salePrice)}
                          </span>
                          <br />
                          <span className="text-[10px] line-through text-muted-foreground">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-foreground">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>

                {/* Stock row */}
                <tr className="border-t border-border">
                  <td className="p-2.5 text-xs font-semibold text-foreground sticky left-0 bg-background">
                    Stok
                  </td>
                  {items.map((product) => (
                    <td key={product.id} className="p-2.5 text-center">
                      <Badge
                        variant={product.inStock ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {product.inStock ? "Stokta" : "Stok Yok"}
                      </Badge>
                    </td>
                  ))}
                </tr>

                {/* Enriched attrs rows */}
                {attrRows.map((key) => (
                  <tr key={key} className="border-t border-border">
                    <td className="p-2.5 text-xs font-semibold text-foreground sticky left-0 bg-background">
                      {ATTR_LABELS[key] || key}
                    </td>
                    {items.map((product) => {
                      const attrs = getProductAttrs(product);
                      const val = attrs[key];
                      return (
                        <td
                          key={product.id}
                          className="p-2.5 text-center text-xs text-foreground"
                        >
                          {val !== undefined ? formatAttrValue(val) : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Spec rows */}
                {specRows.map((key) => (
                  <tr key={key} className="border-t border-border">
                    <td className="p-2.5 text-xs font-semibold text-foreground sticky left-0 bg-background">
                      {key}
                    </td>
                    {items.map((product) => (
                      <td
                        key={product.id}
                        className="p-2.5 text-center text-xs text-foreground"
                      >
                        {product.specs[key] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Actions row */}
                <tr className="border-t border-border bg-muted/30">
                  <td className="p-2.5 sticky left-0 bg-muted/30" />
                  {items.map((product) => (
                    <td key={product.id} className="p-3 text-center">
                      <div className="flex flex-col gap-2">
                        <Link
                          to={`/urun/${product.slug}`}
                          onClick={() => setIsOpen(false)}
                        >
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full text-xs gap-1.5 rounded-full"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Detay
                          </Button>
                        </Link>
                        <a
                          href={getWhatsAppLink(product)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className="w-full text-xs gap-1.5 rounded-full"
                            style={{ backgroundColor: "#25D366", color: "#fff" }}
                          >
                            <MessageCircle className="h-3 w-3" />
                            Bilgi Al
                          </Button>
                        </a>
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
