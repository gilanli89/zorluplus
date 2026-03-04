import { Globe } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { globe: 18, zorlu: "text-lg", digital: "text-[7px]", gap: "gap-0", lineW: "w-3" },
    md: { globe: 24, zorlu: "text-2xl", digital: "text-[9px]", gap: "gap-0", lineW: "w-4" },
    lg: { globe: 40, zorlu: "text-4xl", digital: "text-xs", gap: "gap-0.5", lineW: "w-5" },
  };
  const s = sizes[size];

  return (
    <div className={`flex flex-col items-center ${s.gap} select-none`}>
      {/* ZORLU with spinning globe as O */}
      <div className={`font-display font-extrabold ${s.zorlu} tracking-tight leading-none flex items-center`}
           style={{ color: "hsl(210, 70%, 25%)" }}>
        <span>Z</span>
        <span className="relative inline-flex items-center justify-center">
          <Globe
            className="animate-[spin_12s_linear_infinite]"
            size={s.globe}
            style={{ color: "hsl(200, 60%, 65%)" }}
            strokeWidth={1.5}
          />
        </span>
        <span>RLU</span>
      </div>

      {/* DIGITAL PLAZA */}
      {showText && (
        <div className="flex items-center justify-center gap-1.5 -mt-0.5">
          <div className={`${s.lineW} h-[1.5px] rounded-full`} style={{ background: "hsl(210, 70%, 25%)" }} />
          <div className={`${s.lineW} h-[1.5px] rounded-full opacity-60`} style={{ background: "hsl(210, 70%, 25%)" }} />
          <span className={`${s.digital} font-semibold tracking-[0.25em] uppercase`}
                style={{ color: "hsl(210, 70%, 25%)" }}>
            Digital Plaza
          </span>
          <div className={`${s.lineW} h-[1.5px] rounded-full opacity-60`} style={{ background: "hsl(210, 70%, 25%)" }} />
          <div className={`${s.lineW} h-[1.5px] rounded-full`} style={{ background: "hsl(210, 70%, 25%)" }} />
        </div>
      )}
    </div>
  );
}
