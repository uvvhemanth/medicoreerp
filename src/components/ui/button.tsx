"use client";

import { forwardRef } from "react";
import { Slot } from "@/components/ui/slot";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "subtle";
type Size = "sm" | "md" | "lg" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-white hover:bg-teal-dark shadow-soft active:scale-[0.99]",
  secondary:
    "bg-clinical text-white hover:brightness-95 shadow-soft active:scale-[0.99]",
  outline:
    "border border-teal/40 text-teal hover:bg-teal/[0.06] active:scale-[0.99]",
  ghost: "text-heading hover:bg-black/[0.05] dark:hover:bg-white/[0.06]",
  danger: "bg-danger text-white hover:brightness-95 shadow-soft active:scale-[0.99]",
  subtle: "bg-mist text-teal hover:brightness-95 dark:bg-white/[0.06]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3 text-[13px] gap-1.5",
  md: "h-11 px-[18px] text-sm gap-2",
  lg: "h-12 px-6 text-[15px] gap-2",
  icon: "h-10 w-10 justify-center",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", loading, asChild, children, disabled, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-control font-semibold font-sans",
          "transition-all duration-micro ease-standard select-none",
          "disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-2",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";
