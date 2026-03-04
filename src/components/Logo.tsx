import zorluLogo from "@/assets/zorlu-logo.png";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function Logo({ size = "md" }: LogoProps) {
  const heights = {
    sm: "h-8",
    md: "h-10",
    lg: "h-16",
  };

  return (
    <img
      src={zorluLogo}
      alt="Zorlu Digital Plaza"
      className={`${heights[size]} w-auto object-contain select-none`}
    />
  );
}
