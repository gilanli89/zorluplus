import { Shield, Award, Wrench, Truck } from "lucide-react";
import { motion } from "framer-motion";

const samsungLogo = (
  <svg viewBox="0 0 2500 400" className="h-3 w-auto inline-block">
    <path fill="currentColor" d="M246.5 63.2c-61.5 0-111.5 15.8-111.5 77.5 0 53.8 39.3 68.6 95.8 79.5 42.3 8.2 49.8 18.5 49.8 33.2 0 19.2-21.5 29-47.5 29-39.8 0-61.5-14.2-61.5-14.2l-17.8 52.5s28.8 17.5 82.2 17.5c65.2 0 117.5-23.2 117.5-82.2 0-51.2-37.5-68.5-97.5-80.5-40.5-8.2-48.2-16.8-48.2-31 0-17.2 17.2-27.5 44.2-27.5 34.5 0 57.5 11 57.5 11l16.5-50.8s-25.2-14-79.5-14zm320.8 5.5l-65.5 170.8L436.3 68.7h-72.5l-65.2 170.8L233.3 68.7h-67.8l100.2 262h67.5l67.5-170.5 67.5 170.5h67.5l100.2-262h-68.6zm247.2 0l-112 262h65l22-55.5h117l22.5 55.5h67.5l-113.5-262h-68.5zm34 60l42 150h-84.5l42.5-150zm310 -60l-112 262h65l22-55.5h117l22.5 55.5h67.5l-113.5-262h-68.5zm34 60l42 150h-84.5l42.5-150zm428-60h-70l-90 130-90-130h-70l128 186v76h64v-76l128-186zm202.5 0h-64v262h64v-262zm172 0l-170 185v-185h-64v262h58l170-185v185h64v-262h-58z"/>
  </svg>
);

const lgLogo = (
  <svg viewBox="0 0 140 140" className="h-4 w-auto inline-block">
    <path fill="currentColor" d="M70 0C31.3 0 0 31.3 0 70s31.3 70 70 70 70-31.3 70-70S108.7 0 70 0zm0 132.5C35.5 132.5 7.5 104.5 7.5 70S35.5 7.5 70 7.5 132.5 35.5 132.5 70 104.5 132.5 70 132.5zm-20-95h-10v52.5h35v-10h-25V37.5zm55 0h-10v17.5H85V65h10v15h10v10H80v10h35V37.5z"/>
  </svg>
);

const items = [
  { icon: Shield, label: "Yetkili Servis", desc: "Samsung & LG", hasBrandLogos: true },
  { icon: Award, label: "2 Yıl Garanti", desc: "Resmi garanti", hasBrandLogos: false },
  { icon: Wrench, label: "Ücretsiz Montaj", desc: "Uygun ürünlerde", hasBrandLogos: false },
  { icon: Truck, label: "Hızlı Teslimat", desc: "Tüm KKTC'ye", hasBrandLogos: false },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
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
          viewport={{ once: true }}
        >
          {items.map(item => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="flex items-center gap-3 group"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors duration-300">
                <item.icon className="h-5 w-5 icon-hover-rotate" />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-foreground leading-tight">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
