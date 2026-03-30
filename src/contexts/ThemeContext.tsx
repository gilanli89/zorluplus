import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface ThemeOverride {
  id: string;
  name: string;
  primaryColor?: string;
  accentColor?: string;
  bannerGradient?: string;
  bannerImage?: string;
  buttonStyle?: string;
  iconStyle?: string;
  isActive: boolean;
  startDate?: string;
  endDate?: string;
}

interface ThemeContextType {
  currentTheme: ThemeOverride | null;
  setThemeOverride: (theme: ThemeOverride | null) => void;
  availableThemes: ThemeOverride[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "zorlu-theme-overrides";

// Pre-built special day themes
const specialDayThemes: ThemeOverride[] = [
  {
    id: "mothers-day",
    name: "Anneler Gunu",
    primaryColor: "#ec4899",
    accentColor: "#fb7185",
    bannerGradient: "linear-gradient(135deg, #fda4af 0%, #ec4899 50%, #db2777 100%)",
    buttonStyle: "bg-pink-500 hover:bg-pink-600 text-white",
    iconStyle: "text-pink-500",
    isActive: false,
    startDate: "05-10",
    endDate: "05-15",
  },
  {
    id: "fathers-day",
    name: "Babalar Gunu",
    primaryColor: "#2563eb",
    accentColor: "#1e3a5f",
    bannerGradient: "linear-gradient(135deg, #60a5fa 0%, #2563eb 50%, #1e3a8a 100%)",
    buttonStyle: "bg-blue-700 hover:bg-blue-800 text-white",
    iconStyle: "text-blue-700",
    isActive: false,
    startDate: "06-15",
    endDate: "06-22",
  },
  {
    id: "black-friday",
    name: "Black Friday",
    primaryColor: "#000000",
    accentColor: "#eab308",
    bannerGradient: "linear-gradient(135deg, #1c1917 0%, #000000 50%, #292524 100%)",
    buttonStyle: "bg-yellow-500 hover:bg-yellow-400 text-black font-bold",
    iconStyle: "text-yellow-500",
    isActive: false,
    startDate: "11-24",
    endDate: "11-30",
  },
  {
    id: "new-year",
    name: "Yeni Yil",
    primaryColor: "#eab308",
    accentColor: "#dc2626",
    bannerGradient: "linear-gradient(135deg, #fbbf24 0%, #eab308 40%, #dc2626 100%)",
    buttonStyle: "bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-400 hover:to-red-400 text-white",
    iconStyle: "text-yellow-500",
    isActive: false,
    startDate: "12-25",
    endDate: "01-03",
  },
  {
    id: "halloween",
    name: "Halloween",
    primaryColor: "#f97316",
    accentColor: "#7c3aed",
    bannerGradient: "linear-gradient(135deg, #fdba74 0%, #f97316 40%, #7c3aed 100%)",
    buttonStyle: "bg-orange-500 hover:bg-orange-600 text-white",
    iconStyle: "text-orange-500",
    isActive: false,
    startDate: "10-28",
    endDate: "11-01",
  },
  {
    id: "bayram",
    name: "Bayram",
    primaryColor: "#059669",
    accentColor: "#10b981",
    bannerGradient: "linear-gradient(135deg, #6ee7b7 0%, #059669 50%, #047857 100%)",
    buttonStyle: "bg-emerald-600 hover:bg-emerald-700 text-white",
    iconStyle: "text-emerald-600",
    isActive: false,
  },
  {
    id: "valentines",
    name: "Sevgililer Gunu",
    primaryColor: "#dc2626",
    accentColor: "#ec4899",
    bannerGradient: "linear-gradient(135deg, #fca5a5 0%, #dc2626 50%, #ec4899 100%)",
    buttonStyle: "bg-red-500 hover:bg-red-600 text-white",
    iconStyle: "text-red-500",
    isActive: false,
    startDate: "02-10",
    endDate: "02-15",
  },
  {
    id: "republic-day",
    name: "Cumhuriyet Bayrami",
    primaryColor: "#dc2626",
    accentColor: "#ffffff",
    bannerGradient: "linear-gradient(135deg, #dc2626 0%, #ef4444 40%, #fca5a5 70%, #ffffff 100%)",
    buttonStyle: "bg-red-600 hover:bg-red-700 text-white",
    iconStyle: "text-red-600",
    isActive: false,
    startDate: "10-28",
    endDate: "10-30",
  },
];

function isDateInRange(startDate?: string, endDate?: string): boolean {
  if (!startDate || !endDate) return false;

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentDay = now.getDate();
  const todayMMDD = `${String(currentMonth).padStart(2, "0")}-${String(currentDay).padStart(2, "0")}`;

  // Handle wrap-around ranges (e.g., 12-25 to 01-03)
  if (startDate > endDate) {
    return todayMMDD >= startDate || todayMMDD <= endDate;
  }

  return todayMMDD >= startDate && todayMMDD <= endDate;
}

function applyCSSProperties(theme: ThemeOverride | null) {
  const root = document.documentElement;
  if (!theme) {
    root.style.removeProperty("--theme-primary");
    root.style.removeProperty("--theme-accent");
    root.style.removeProperty("--theme-banner-gradient");
    root.style.removeProperty("--theme-button-style");
    root.style.removeProperty("--theme-icon-style");
    return;
  }

  if (theme.primaryColor) root.style.setProperty("--theme-primary", theme.primaryColor);
  if (theme.accentColor) root.style.setProperty("--theme-accent", theme.accentColor);
  if (theme.bannerGradient) root.style.setProperty("--theme-banner-gradient", theme.bannerGradient);
  if (theme.buttonStyle) root.style.setProperty("--theme-button-style", theme.buttonStyle);
  if (theme.iconStyle) root.style.setProperty("--theme-icon-style", theme.iconStyle);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeOverride | null>(null);
  const [availableThemes] = useState<ThemeOverride[]>(specialDayThemes);

  // On mount, determine active theme
  useEffect(() => {
    // 1. Check admin overrides from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const adminOverride = JSON.parse(stored) as ThemeOverride;
        if (adminOverride && adminOverride.isActive) {
          setCurrentTheme(adminOverride);
          applyCSSProperties(adminOverride);
          return;
        }
      }
    } catch {
      // Ignore invalid JSON
    }

    // 2. Auto-detect from special day dates
    const activeTheme = specialDayThemes.find((theme) =>
      isDateInRange(theme.startDate, theme.endDate)
    );

    if (activeTheme) {
      const activated = { ...activeTheme, isActive: true };
      setCurrentTheme(activated);
      applyCSSProperties(activated);
    }
  }, []);

  const setThemeOverride = (theme: ThemeOverride | null) => {
    setCurrentTheme(theme);
    applyCSSProperties(theme);

    if (theme) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, setThemeOverride, availableThemes }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
