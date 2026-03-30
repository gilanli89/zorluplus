import { useState, useCallback, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Phone, Menu, X, FileText, Wrench, Shield, Award, Mic, MicOff, Globe, MapPin, MessageCircle } from "lucide-react";
import { PremiumIconInline, PremiumBadgeIcon } from "@/components/PremiumIcon";
import { CATEGORY_3D_ICONS } from "@/lib/categoryIcons";
import { motion, AnimatePresence } from "framer-motion";
import CartSheet from "@/components/CartSheet";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { BRAND, CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

// Speech Recognition types
interface SpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } };
  resultIndex: number;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
  interface SpeechRecognition extends EventTarget {
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    start(): void;
    stop(): void;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onend: (() => void) | null;
    onerror: ((event: { error: string }) => void) | null;
  }
}

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const navigate = useNavigate();
  const { lang, setLang, t, greeting } = useLanguage();

  const hasSpeechSupport = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      stopListening();
    }
  };

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!hasSpeechSupport) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang === "tr" ? "tr-TR" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;
    let finalTranscript = "";
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      if ((event.results[0] as any).isFinal) {
        finalTranscript = transcript;
      }
    };
    recognition.onend = () => {
      setIsListening(false);
      if (finalTranscript.trim()) {
        navigate(`/arama?q=${encodeURIComponent(finalTranscript.trim())}`);
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    recognition.onerror = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setSearchOpen(true);
  }, [hasSpeechSupport, navigate, lang]);

  useEffect(() => {
    return () => { recognitionRef.current?.stop(); };
  }, []);

  const getCatName = (slug: string) => t(`cat.${slug}`) || CATEGORIES.find(c => c.slug === slug)?.name || slug;

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-card/90 backdrop-blur-2xl shadow-lg shadow-foreground/5" 
        : "bg-card/95 backdrop-blur-xl shadow-sm"
    )}>
      {/* Top bar - animated gradient */}
      <div className="bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 opacity-50" />
        <div className="container relative flex items-center justify-between py-1.5 text-[11px]">
          <div className="flex items-center gap-4 font-medium">
            <span className="hidden sm:inline-flex items-center gap-1 text-primary-foreground/80 font-semibold">{greeting}</span>
            <span className="hidden md:inline-flex items-center gap-1"><PremiumIconInline icon={Shield} size={12} className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" /> {t("header.authorized")}</span>
            <span className="inline-flex items-center gap-1"><PremiumIconInline icon={Award} size={12} className="text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" /> {t("header.warranty")}</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Language switcher */}
            <button
              onClick={() => setLang(lang === "tr" ? "en" : "tr")}
              className="flex items-center gap-1 font-semibold hover:opacity-80 transition-opacity"
              title={lang === "tr" ? "Switch to English" : "Türkçeye geç"}
            >
              <PremiumIconInline icon={Globe} size={12} className="text-white" />
              <span>{lang === "tr" ? "EN" : "TR"}</span>
            </button>
            <a href={`tel:${BRAND.phone}`} className="flex items-center gap-1.5 font-semibold hover:opacity-80 transition-opacity">
              <PremiumIconInline icon={Phone} size={12} className="text-white" />
              {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex items-center justify-between gap-3 py-3">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden tap-scale">
              <PremiumIconInline icon={Menu} size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetTitle className="text-lg font-display font-bold">{BRAND.name}</SheetTitle>
            <nav className="mt-6 flex flex-col gap-1">
              {CATEGORIES.map((cat, i) => {
                const icon3d = CATEGORY_3D_ICONS[cat.slug];
                return (
                  <motion.div
                    key={cat.slug}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      to={`/kategori/${cat.slug}`}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-foreground hover:bg-muted transition-colors"
                    >
                      {icon3d && (
                        <img
                          src={icon3d}
                          alt={getCatName(cat.slug)}
                          className="h-6 w-6 object-contain drop-shadow-[0_2px_4px_hsl(var(--primary)/0.2)]"
                          width={24}
                          height={24}
                        />
                      )}
                      {getCatName(cat.slug)}
                    </Link>
                    {cat.children.length > 0 && (
                      <div className="ml-4 flex flex-col">
                        {cat.children.map(sub => (
                          <Link
                            key={sub.slug}
                            to={`/kategori/${cat.slug}/${sub.slug}`}
                            className="block rounded-xl px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-9"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                );
              })}
              <hr className="my-3 border-border" />
              <Link to="/e-katalog" className="flex items-center gap-3 px-3 py-2.5 font-medium text-foreground hover:bg-muted rounded-xl transition-colors">
                <PremiumIconInline icon={FileText} size={20} /> {t("header.eCatalogue")}
              </Link>
              <Link to="/subelerimiz" className="flex items-center gap-3 px-3 py-2.5 font-medium text-foreground hover:bg-muted rounded-xl transition-colors">
                <PremiumIconInline icon={MapPin} size={20} /> {t("header.branches")}
              </Link>
              <Link to="/iletisim" className="flex items-center gap-3 px-3 py-2.5 font-medium text-foreground hover:bg-muted rounded-xl transition-colors">
                <PremiumIconInline icon={MessageCircle} size={20} /> {t("header.contactUs")}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <Logo size="sm" />
        </Link>

        {/* Search + Voice */}
        <div className="flex items-center gap-1">
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.form
                key="search-form"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                onSubmit={handleSearch}
                className="flex items-center gap-1.5 overflow-hidden"
              >
                <div className="relative">
                  <PremiumIconInline icon={Search} size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder={t("header.search")}
                    className="w-40 sm:w-64 h-9 rounded-full pl-9 pr-3 border-primary/30 focus-visible:ring-primary/20"
                    autoFocus
                  />
                </div>
                {hasSpeechSupport && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-full shrink-0 transition-colors tap-scale",
                      isListening && "text-destructive bg-destructive/10 animate-pulse"
                    )}
                    onClick={isListening ? stopListening : startListening}
                    title={isListening ? t("header.stopListening") : t("header.voiceSearch")}
                  >
                    {isListening ? <PremiumIconInline icon={MicOff} size={16} /> : <PremiumIconInline icon={Mic} size={16} />}
                  </Button>
                )}
                <Button type="button" variant="ghost" size="icon" className="rounded-full shrink-0 tap-scale" onClick={() => { setSearchOpen(false); stopListening(); }}>
                  <PremiumIconInline icon={X} size={16} />
                </Button>
              </motion.form>
            ) : (
              <motion.div key="search-icons" className="flex items-center gap-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Button variant="ghost" size="icon" className="rounded-full tap-scale" onClick={() => setSearchOpen(true)}>
                  <PremiumIconInline icon={Search} size={20} />
                </Button>
                {hasSpeechSupport && (
                  <Button variant="ghost" size="icon" className="rounded-full tap-scale" onClick={startListening} title={t("header.voiceSearch")}>
                    <PremiumIconInline icon={Mic} size={20} />
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <Link
            to="/e-katalog"
            className="link-underline rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            {t("header.eCatalogue")}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <CartSheet />
          <a href="https://servis.zorluplus.com/" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="rounded-full gap-1.5 border-primary/30 text-primary hover:bg-primary/5 font-semibold hidden sm:inline-flex tap-scale">
              <PremiumIconInline icon={Wrench} size={14} /> {t("header.serviceRequest")}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full sm:hidden tap-scale">
              <PremiumIconInline icon={Wrench} size={20} />
            </Button>
          </a>
          <Link to="/magaza">
            <Button size="sm" className="hidden sm:inline-flex font-semibold rounded-full px-5 tap-scale shadow-md hover:shadow-lg transition-shadow">
              {t("header.store")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
