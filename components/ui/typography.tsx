import { cn } from "@/lib/utils";
import React from "react";

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "lead" | "large" | "small" | "muted";
  as?: React.ElementType;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", as, ...props }, ref) => {
    const Component = as || (variant === "lead" || variant === "large" || variant === "small" || variant === "muted" ? "p" : variant);

    const variants = {
      h1: "scroll-m-20 text-3xl md:text-4xl lg:text-6xl font-bold tracking-tighter text-foreground",
      h2: "scroll-m-20 text-2xl md:text-3xl lg:text-5xl font-bold tracking-tight text-foreground",
      h3: "scroll-m-20 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight text-foreground",
      h4: "scroll-m-20 text-lg md:text-xl font-bold tracking-tight text-foreground",
      p: "leading-7 md:leading-8 [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6 text-foreground text-sm md:text-base font-medium",
      lead: "text-base md:text-lg text-muted-foreground font-medium leading-relaxed",
      large: "text-base md:text-lg font-bold",
      small: "text-xs md:text-sm font-medium leading-none",
      muted: "text-xs md:text-sm text-muted-foreground font-medium",
    };

    return (
      <Component
        ref={ref}
        className={cn(variants[variant], className)}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";
