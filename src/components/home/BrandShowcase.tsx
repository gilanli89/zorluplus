import { Award } from "lucide-react";
import { motion } from "framer-motion";

const AUTHORIZED_BRANDS = [
  { name: "Samsung", logo: "/brands/samsung-logo.png" },
  { name: "LG", logo: "/brands/lg-logo.png" },
];

export default function BrandShowcase() {
  return (
    <section className="py-12 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="h-5 w-5 text-primary" />
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Yetkili Bayi</p>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Dünya Markalarının KKTC Adresi</h2>
        </motion.div>

        <div className="flex items-center justify-center gap-10 md:gap-16">
          {AUTHORIZED_BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-36 h-24 bg-muted/50 rounded-2xl flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors p-4">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-14 w-auto object-contain select-none opacity-85 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
              </div>
              <span className="text-[10px] text-primary font-medium uppercase tracking-wider">
                Yetkili
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
