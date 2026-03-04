import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND } from "@/lib/constants";
import banner1 from "@/assets/banner-1.jpg";
import banner2 from "@/assets/banner-2.jpg";
import banner3 from "@/assets/banner-3.jpg";

const slides = [
  {
    image: banner1,
    badge: "✨ Samsung & LG Yetkili Bayi",
    title: "Evinize Teknoloji,",
    subtitle: "Hayatınıza Konfor.",
    desc: "OLED TV, Soundbar ve daha fazlası — yetkili garantiyle evinize gelsin.",
    cta: { label: "TV & Görüntü Keşfet", href: "/kategori/tv-goruntu" },
    overlay: "from-black/70 via-black/40 to-transparent",
  },
  {
    image: banner2,
    badge: "🏠 Mutfağınızı Yenileyin",
    title: "Beyaz Eşyada",
    subtitle: "En İyi Fiyatlar.",
    desc: "2 yıl garanti, ücretsiz montaj ve kişiye özel fiyatlarla hayalinizdeki ürünlere ulaşın.",
    cta: { label: "Beyaz Eşya Keşfet", href: "/kategori/beyaz-esya" },
    overlay: "from-black/60 via-black/30 to-transparent",
  },
  {
    image: banner3,
    badge: "❄️ Yaz Kampanyası",
    title: "Klima & İklimlendirme",
    subtitle: "Serinliğin Adresi.",
    desc: "Split klima, portatif klima ve ısıtıcılarda özel fiyatlar sizi bekliyor.",
    cta: { label: "Klimaları İncele", href: "/kategori/klima-isitma" },
    overlay: "from-black/60 via-black/30 to-transparent",
  },
];

const AUTOPLAY_MS = 5500;

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  }, [current]);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next]);

  const slide = slides[current];

  const imageVariants = {
    enter: (d: number) => ({
      x: d > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const },
    },
    exit: (d: number) => ({
      x: d > 0 ? "-30%" : "30%",
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
    }),
  };

  return (
    <section className="relative w-full h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[70vh] overflow-hidden bg-foreground">
      {/* Background images */}
      <AnimatePresence custom={direction} mode="popLayout">
        <motion.div
          key={current}
          custom={direction}
          variants={imageVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full container flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="max-w-xl lg:max-w-2xl"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.span
              custom={0}
              variants={textVariants}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white mb-5 border border-white/20"
            >
              {slide.badge}
            </motion.span>

            <motion.h1
              custom={1}
              variants={textVariants}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-2 text-white"
            >
              {slide.title}
            </motion.h1>

            <motion.h1
              custom={2}
              variants={textVariants}
              className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.08] mb-5 text-white/60"
            >
              {slide.subtitle}
            </motion.h1>

            <motion.p
              custom={3}
              variants={textVariants}
              className="text-white/70 text-base md:text-lg mb-8 max-w-md leading-relaxed"
            >
              {slide.desc}
            </motion.p>

            <motion.div custom={4} variants={textVariants} className="flex flex-wrap gap-3">
              <Link to={slide.cta.href}>
                <Button size="lg" variant="secondary" className="font-semibold gap-2 rounded-full px-6 shadow-lg">
                  {slide.cta.label} <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={BRAND.whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="font-semibold gap-2 rounded-full px-6 shadow-lg border-0"
                  style={{ backgroundColor: "#25D366", color: "#fff" }}
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
        aria-label="Önceki"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
        aria-label="Sonraki"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots + Progress */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="relative h-2 rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === current ? 32 : 8 }}
            aria-label={`Slide ${i + 1}`}
          >
            <span className="absolute inset-0 bg-white/40 rounded-full" />
            {i === current && (
              <motion.span
                className="absolute inset-0 bg-white rounded-full origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
