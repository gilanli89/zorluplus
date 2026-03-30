import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatPriceWithVAT } from "@/lib/pricing";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import type { Product } from "@/lib/types";

interface SearchDropdownProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const MAX_RESULTS = 6;

export default function SearchDropdown({
  query,
  isOpen,
  onClose,
  products,
}: SearchDropdownProps) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const t = {
    seeAll: lang === "tr" ? "Tum sonuclari gor" : "See all results",
    noResults: lang === "tr" ? "Sonuc bulunamadi" : "No results found",
  };

  // Filter products by query
  const filtered = query.trim().length > 0
    ? products
        .filter((p) => {
          const q = query.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q)
          );
        })
        .slice(0, MAX_RESULTS)
    : [];

  // Reset active index on query change
  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  const navigateToProduct = useCallback(
    (slug: string) => {
      onClose();
      navigate(`/urun/${slug}`);
    },
    [navigate, onClose]
  );

  const navigateToSearch = useCallback(() => {
    onClose();
    navigate(`/arama?q=${encodeURIComponent(query)}`);
  }, [navigate, onClose, query]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const totalItems = filtered.length + 1; // +1 for "see all" link

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % totalItems);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => (prev <= 0 ? totalItems - 1 : prev - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < filtered.length) {
            navigateToProduct(filtered[activeIndex].slug);
          } else if (activeIndex === filtered.length) {
            navigateToSearch();
          }
          break;
        case "Escape":
          onClose();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, activeIndex, navigateToProduct, navigateToSearch, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex < 0 || !listRef.current) return;
    const items = listRef.current.querySelectorAll("[data-search-item]");
    items[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!query.trim()) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-1 w-full max-h-96 overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl"
        >
          {filtered.length === 0 ? (
            <div className="flex items-center justify-center gap-2 py-8 text-sm text-gray-400">
              <Search className="h-4 w-4" />
              {t.noResults}
            </div>
          ) : (
            <ul ref={listRef} className="py-1">
              {filtered.map((product, index) => (
                <li
                  key={product.id}
                  data-search-item
                  onClick={() => navigateToProduct(product.slug)}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors ${
                    index === activeIndex
                      ? "bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {/* Product image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg border border-gray-100 object-cover"
                  />

                  {/* Product info */}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {product.name}
                    </p>
                    <span className="inline-block mt-0.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                      {product.brand}
                    </span>
                  </div>

                  {/* Price */}
                  <span className="whitespace-nowrap text-sm font-bold text-blue-700">
                    {formatPriceWithVAT(
                      product.salePrice ?? product.price,
                      lang
                    )}
                  </span>
                </li>
              ))}

              {/* See all results link */}
              <li
                data-search-item
                onClick={navigateToSearch}
                className={`flex cursor-pointer items-center justify-center gap-2 border-t border-gray-100 px-4 py-3 text-sm font-semibold transition-colors ${
                  activeIndex === filtered.length
                    ? "bg-blue-50 text-blue-700"
                    : "text-blue-600 hover:bg-gray-50"
                }`}
              >
                <Search className="h-4 w-4" />
                {t.seeAll} ({query})
              </li>
            </ul>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
