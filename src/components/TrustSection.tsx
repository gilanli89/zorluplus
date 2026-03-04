import { Shield, Award, Wrench, Truck } from "lucide-react";

const items = [
  { icon: Shield, label: "Yetkili Servis", desc: "Samsung & LG" },
  { icon: Award, label: "2 Yıl Garanti", desc: "Resmi garanti" },
  { icon: Wrench, label: "Ücretsiz Montaj", desc: "Uygun ürünlerde" },
  { icon: Truck, label: "Hızlı Teslimat", desc: "Tüm KKTC'ye" },
];

export default function TrustSection() {
  return (
    <section className="border-b border-border bg-card">
      <div className="container py-5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {items.map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-foreground leading-tight">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
