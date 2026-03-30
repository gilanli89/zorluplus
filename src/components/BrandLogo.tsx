import { forwardRef } from "react";

const BRAND_LOGOS: Record<string, string> = {
  samsung: "/brands/samsung-logo.png",
  lg: "/brands/lg-logo.png",
  midea: "/brands/midea.png",
  aux: "/brands/aux.png",
  toshiba: "/brands/toshiba.png",
  philips: "/brands/philips.png",
  krups: "/brands/krups.png",
  sharp: "/brands/sharp.png",
  bosch: "/brands/bosch.png",
  sony: "/brands/sony.png",
  xiaomi: "/brands/xiaomi.png",
  tcl: "/brands/tcl.png",
  jbl: "/brands/jbl.png",
  tefal: "/brands/tefal.png",
  indesit: "/brands/indesit.png",
  adax: "/brands/adax.png",
  atlantic: "/brands/atlantic.png",
};

function normalizeBrand(brand: string): string {
  return brand.toLowerCase().trim();
}

interface BrandLogoProps {
  brand: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

const SIZES = {
  xs: "h-4 max-w-[52px]",
  sm: "h-5 max-w-[60px]",
  md: "h-6 max-w-[78px]",
  lg: "h-8 max-w-[104px]",
};

const BrandLogo = forwardRef<HTMLSpanElement | HTMLImageElement, BrandLogoProps>(
  ({ brand, size = "sm", className = "" }, ref) => {
    const key = normalizeBrand(brand);
    const logo = BRAND_LOGOS[key];

    if (!logo) {
      return (
        <span ref={ref as React.Ref<HTMLSpanElement>} className={`text-[11px] font-semibold text-primary/70 uppercase tracking-wider ${className}`}>
          {brand}
        </span>
      );
    }

    const sizeClass = SIZES[size];

    return (
      <img
        ref={ref as React.Ref<HTMLImageElement>}
        src={logo}
        alt={brand}
        className={`${sizeClass} w-auto object-contain select-none opacity-80 hover:opacity-100 transition-opacity ${className}`}
        loading="lazy"
      />
    );
  }
);

BrandLogo.displayName = "BrandLogo";

export default BrandLogo;
