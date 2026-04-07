import { Award } from "lucide-react";
import { motion } from "framer-motion";

const AUTHORIZED_BRANDS = [
  { name: "Samsung", authorized: true },
  { name: "LG", authorized: true },
  { name: "Bosch", authorized: true },
  { name: "Siemens", authorized: false },
  { name: "Beko", authorized: false },
  { name: "Arçelik", authorized: false },
  { name: "Vestel", authorized: false },
  { name: "Daikin", authorized: false },
  { name: "Mitsubishi", authorized: false },
  { name: "Midea", authorized: false },
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

        <div className="flex items-center justify-center gap-6 md:gap-10 flex-wrap">
          {AUTHORIZED_BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col items-center gap-2 group"
            >
              <div className="w-20 h-20 bg-muted/50 rounded-2xl flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
                <span className="text-sm font-bold text-muted-foreground group-hover:text-foreground transition-colors">
                  {brand.name}
                </span>
              </div>
              {brand.authorized && (
                <span className="text-[10px] text-primary font-medium uppercase tracking-wider">
                  Yetkili
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
