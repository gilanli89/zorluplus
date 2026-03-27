import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.4)]",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-[0_1px_4px_-1px_hsl(var(--foreground)/0.1)]",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-[0_2px_8px_-2px_hsl(var(--destructive)/0.4)]",
        outline: "text-foreground shadow-[0_1px_4px_-1px_hsl(var(--foreground)/0.08)]",
        premium: "border-primary/30 bg-gradient-to-r from-primary/15 to-accent/10 text-primary font-bold shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.3),inset_0_1px_0_hsl(var(--primary-foreground)/0.1)] hover:shadow-[0_4px_12px_-2px_hsl(var(--primary)/0.4)]",
        success: "border-transparent bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] shadow-[0_2px_8px_-2px_hsl(var(--success)/0.4)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
