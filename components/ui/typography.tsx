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
      h1: "scroll-m-20 text-2xl md:text-3xl lg:text-5xl font-bold tracking-tighter text-foreground",
      h2: "scroll-m-20 text-xl md:text-2xl lg:text-4xl font-bold tracking-tight text-foreground",
      h3: "scroll-m-20 text-lg md:text-xl lg:text-2xl font-bold tracking-tight text-foreground",
      h4: "scroll-m-20 text-base md:text-lg font-bold tracking-tight text-foreground",
      p: "leading-6 md:leading-7 [&:not(:first-child)]:mt-4 md:[&:not(:first-child)]:mt-6 text-foreground text-sm md:text-base font-normal",
      lead: "text-sm md:text-base text-muted-foreground font-normal leading-relaxed",
      large: "text-sm md:text-base font-semibold",
      small: "text-xs md:text-sm font-normal leading-none",
      muted: "text-xs md:text-sm text-muted-foreground font-normal",
    };

    let variantClass = variants[variant];
    if (className) {
      const hasCustomSize = /(?:^|\s)(?:[a-z0-9-]+:)?text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[[^\]]+\])(?:\s|$)/.test(className);
      const hasCustomLeading = /(?:^|\s)(?:[a-z0-9-]+:)?leading-(none|tight|snug|normal|relaxed|loose|[0-9]+|\[[^\]]+\])(?:\s|$)/.test(className);
      
      if (hasCustomSize) {
        variantClass = variantClass.replace(/(?:^|\s)(?:[a-z0-9-]+:)?text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\[[^\]]+\])(?:\s|$)/g, ' ');
      }
      if (hasCustomLeading || hasCustomSize) {
        variantClass = variantClass.replace(/(?:^|\s)(?:[a-z0-9-]+:)?leading-(none|tight|snug|normal|relaxed|loose|[0-9]+|\[[^\]]+\])(?:\s|$)/g, ' ');
      }
    }

    return (
      <Component
        ref={ref}
        className={cn(variantClass, className)}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";
