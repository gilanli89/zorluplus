import { Globe } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { globe: 22, zorlu: "text-xl", digital: "text-[7px]", gap: "gap-0", lineW: "w-3" },
    md: { globe: 30, zorlu: "text-3xl", digital: "text-[9px]", gap: "gap-0", lineW: "w-4" },
    lg: { globe: 48, zorlu: "text-5xl", digital: "text-sm", gap: "gap-0.5", lineW: "w-6" },
  };
  const s = sizes[size];

  return (
    <div className={`flex flex-col items-center ${s.gap} select-none`}>
      {/* ZORLU with spinning globe as O */}
      <div
        className={`font-display font-black ${s.zorlu} tracking-tight leading-none flex items-center`}
        style={{ color: "hsl(210, 80%, 22%)" }}
      >
        <span>Z</span>
        <span className="relative inline-flex items-center justify-center mx-[-1px]">
          {/* Glow behind globe */}
          <span
            className="absolute inset-0 rounded-full blur-sm animate-[pulse_3s_ease-in-out_infinite]"
            style={{ background: "hsl(200, 70%, 55%, 0.3)" }}
          />
          <Globe
            className="relative animate-[spin_10s_linear_infinite] drop-shadow-[0_0_6px_hsl(200,80%,55%)]"
            size={s.globe}
            style={{ color: "hsl(200, 75%, 50%)" }}
            strokeWidth={2}
          />
        </span>
        <span>RLU</span>
      </div>

      {/* DIGITAL PLAZA */}
      {showText && (
        <div className="flex items-center justify-center gap-1.5 -mt-0.5">
          <div className={`${s.lineW} h-[2px] rounded-full`} style={{ background: "hsl(210, 80%, 22%)" }} />
          <div className={`${s.lineW} h-[2px] rounded-full opacity-50`} style={{ background: "hsl(210, 80%, 22%)" }} />
          <span
            className={`${s.digital} font-bold tracking-[0.3em] uppercase`}
            style={{ color: "hsl(210, 80%, 22%)" }}
          >
            Digital Plaza
          </span>
          <div className={`${s.lineW} h-[2px] rounded-full opacity-50`} style={{ background: "hsl(210, 80%, 22%)" }} />
          <div className={`${s.lineW} h-[2px] rounded-full`} style={{ background: "hsl(210, 80%, 22%)" }} />
        </div>
      )}
    </div>
  );
}
