import { Wrench, Truck } from "lucide-react";
import { motion } from "framer-motion";

const items = [
{ icon: null, label: "Yetkili Servis", desc: "Samsung & LG", hasBrandLogos: true, customIcon: null },
{ icon: Award, label: "2 Yıl Garanti", desc: "Resmi garanti", hasBrandLogos: false, customIcon: null },
{ icon: Wrench, label: "Ücretsiz Montaj", desc: "Uygun ürünlerde", hasBrandLogos: false, customIcon: "/icons/montaj.gif" },
{ icon: Truck, label: "Hızlı Teslimat", desc: "Tüm KKTC'ye", hasBrandLogos: false, customIcon: "/icons/delivery-truck.gif" }];


const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } }
};

export default function TrustSection() {
  return (
    <section className="border-b border-border bg-card">
      <div className="container py-5">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}>
          
          {items.map((item) =>
          <motion.div
            key={item.label}
            variants={itemVariants}
            className="flex items-center gap-3 group">
            
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors duration-300 overflow-hidden">
                {item.customIcon ?
              <img src={item.customIcon} alt={item.label} className="h-12 w-12 object-contain" /> :

              <item.icon className="h-5 w-5 icon-hover-rotate" />
              }
              </div>
              {item.hasBrandLogos ?
            <img src="/brands/yetkili-servis-badge.png" alt="Samsung & LG Yetkili Servis" className="h-56 w-auto object-contain mx-auto" /> :

            <div>
                  <p className="font-display font-bold text-sm text-foreground leading-tight">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
            }
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

}