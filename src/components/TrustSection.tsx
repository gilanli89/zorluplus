import { Shield, Award, Wrench } from "lucide-react";

const items = [
  { icon: Shield, label: "Yetkili Servis", desc: "Samsung & LG yetkili servis noktası" },
  { icon: Award, label: "2 Yıl Garanti", desc: "Tüm ürünlerde resmi garanti" },
  { icon: Wrench, label: "Ücretsiz Montaj", desc: "Uygun ürünlerde ücretsiz kurulum" },
];

export default function TrustSection() {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map(item => (
            <div key={item.label} className="flex flex-col items-center text-center gap-3 p-6 rounded-xl bg-card border border-border">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-foreground">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
