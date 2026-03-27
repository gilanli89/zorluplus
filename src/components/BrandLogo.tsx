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
};

function normalizeBrand(brand: string): string {
  return brand.toLowerCase().trim();
}

interface BrandLogoProps {
  brand: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

// Per-brand size overrides for visual parity (LG logo is compact, needs more space)
const BRAND_SIZE_OVERRIDES: Record<string, Partial<Record<"xs" | "sm" | "md" | "lg", string>>> = {
  lg: {
    xs: "h-4 max-w-[52px]",
    sm: "h-5 max-w-[60px]",
    md: "h-6 max-w-[78px]",
    lg: "h-8 max-w-[104px]",
  },
};

const SIZES = {
  xs: "h-3.5 max-w-[48px]",
  sm: "h-4 max-w-[56px]",
  md: "h-5 max-w-[72px]",
  lg: "h-7 max-w-[96px]",
};

export default function BrandLogo({ brand, size = "sm", className = "" }: BrandLogoProps) {
  const key = normalizeBrand(brand);
  const logo = BRAND_LOGOS[key];

  if (!logo) {
    return (
      <span className={`text-[11px] font-semibold text-primary/70 uppercase tracking-wider ${className}`}>
        {brand}
      </span>
    );
  }

  const sizeClass = BRAND_SIZE_OVERRIDES[key]?.[size] || SIZES[size];

  return (
    <img
      src={logo}
      alt={brand}
      className={`${sizeClass} w-auto object-contain select-none opacity-80 hover:opacity-100 transition-opacity ${className}`}
      loading="lazy"
    />
  );
}
