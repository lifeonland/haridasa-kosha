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
      h1: "scroll-m-20 text-4xl font-bold tracking-tighter lg:text-6xl text-foreground",
      h2: "scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl text-foreground",
      h3: "scroll-m-20 text-2xl font-bold tracking-tight lg:text-3xl text-foreground",
      h4: "scroll-m-20 text-xl font-bold tracking-tight text-foreground",
      p: "leading-8 [&:not(:first-child)]:mt-6 text-foreground text-base font-medium",
      lead: "text-lg text-muted-foreground font-medium leading-relaxed",
      large: "text-lg font-bold",
      small: "text-sm font-medium leading-none",
      muted: "text-sm text-muted-foreground font-medium",
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
