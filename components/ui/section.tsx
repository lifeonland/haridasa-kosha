import { cn } from "@/lib/utils";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "none";
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "md", ...props }, ref) => {
    const spacingClasses = {
      sm: "py-8 md:py-12",
      md: "py-12 md:py-16",
      lg: "py-16 md:py-20",
      none: "py-0",
    };

    return (
      <section
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      />
    );
  }
);

Section.displayName = "Section";
