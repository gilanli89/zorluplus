/**
 * Pricing utility functions for Zorlu Digital Plaza
 */

/**
 * Formats a price number into a localized currency string.
 * TR: "1.500,00 TL" | EN: "1,500.00 TL"
 */
export function formatPrice(price: number, lang: "tr" | "en" = "tr"): string {
  if (lang === "en") {
    return (
      price
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " TL"
    );
  }

  // Turkish format: dot as thousands separator, comma as decimal
  const [integer, decimal] = price.toFixed(2).split(".");
  const formattedInteger = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formattedInteger},${decimal} TL`;
}

/**
 * Formats a price and appends a VAT-included label.
 * TR: "1.500,00 TL (KDV Dahil)" | EN: "1,500.00 TL (VAT Incl.)"
 */
export function formatPriceWithVAT(
  price: number,
  lang: "tr" | "en" = "tr"
): string {
  const formatted = formatPrice(price, lang);
  const vatLabel = lang === "tr" ? "(KDV Dahil)" : "(VAT Incl.)";
  return `${formatted} ${vatLabel}`;
}

/**
 * Calculates the discount percentage between an original and sale price.
 * Returns a whole number (e.g. 30 for 30% off).
 */
export function calculateDiscount(
  originalPrice: number,
  salePrice: number
): number {
  if (originalPrice <= 0) return 0;
  if (salePrice >= originalPrice) return 0;

  const discount = ((originalPrice - salePrice) / originalPrice) * 100;
  return Math.round(discount);
}

/**
 * Returns a formatted discount badge string, e.g. "-%30".
 */
export function formatDiscountBadge(percentage: number): string {
  return `-%${Math.abs(Math.round(percentage))}`;
}
