import { Wrench, Truck } from "lucide-react";
import { motion } from "framer-motion";

const items = [
{ icon: null, label: "Yetkili Servis", desc: "Samsung & LG", hasBrandLogos: true, customIcon: null },
{ icon: null, label: "2 Yıl Garanti", desc: "Resmi garanti", hasBrandLogos: false, customIcon: null },
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