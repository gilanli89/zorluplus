import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumIconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "glow" | "gradient" | "float";
  className?: string;
  containerClassName?: string;
}

const sizeMap = {
  sm: { container: "w-8 h-8", icon: "h-4 w-4" },
  md: { container: "w-10 h-10", icon: "h-5 w-5" },
  lg: { container: "w-12 h-12", icon: "h-6 w-6" },
  xl: { container: "w-16 h-16", icon: "h-8 w-8" },
};

export default function PremiumIcon({
  icon: Icon,
  size = "md",
  variant = "default",
  className,
  containerClassName,
}: PremiumIconProps) {
  const s = sizeMap[size];

  return (
    <div
      className={cn(
        "premium-icon-wrap relative flex items-center justify-center rounded-xl transition-all duration-300",
        s.container,
        variant === "glow" && "premium-icon-glow",
        variant === "gradient" && "premium-icon-gradient",
        variant === "float" && "float-subtle",
        containerClassName
      )}
    >
      {/* 3D depth layer */}
      <div className="absolute inset-0 rounded-xl bg-primary/10 translate-y-[2px] blur-[2px] opacity-50" />
      {/* Main icon container */}
      <div className={cn(
        "relative z-10 flex items-center justify-center rounded-xl w-full h-full premium-icon-inner",
        "bg-gradient-to-br from-primary/15 via-primary/10 to-accent/10",
        "border border-primary/20",
        "shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.25),inset_0_1px_0_hsl(var(--primary-foreground)/0.1)]"
      )}>
        <Icon
          className={cn(
            s.icon,
            "text-primary drop-shadow-[0_1px_2px_hsl(var(--primary)/0.3)]",
            "transition-all duration-300",
            className
          )}
          strokeWidth={2}
        />
      </div>
    </div>
  );
}

/** Inline version without container - just makes the icon look 3D */
export function PremiumIconInline({
  icon: Icon,
  size = 20,
  className,
}: {
  icon: LucideIcon;
  size?: number;
  className?: string;
}) {
  return (
    <Icon
      size={size}
      className={cn(
        "text-primary drop-shadow-[0_1px_3px_hsl(var(--primary)/0.4)]",
        "filter brightness-110",
        "transition-all duration-300",
        className
      )}
      strokeWidth={2.2}
    />
  );
}
