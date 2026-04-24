import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-[var(--radius-ui)] border border-[#cfbca4] p-5 shadow-[var(--shadow-ui)]", {
  variants: {
    tone: {
      default: "bg-[#f8f1e6]",
      warm: "bg-[linear-gradient(180deg,#f9f2e7_0%,#f5ebdd_100%)]",
      muted: "bg-[#f3e8d9]",
      elevated: "bg-[linear-gradient(180deg,#faf4ea_0%,#f6ecdf_100%)] border-[#c9b79f]",
    },
  },
  defaultVariants: {
    tone: "warm",
  },
});

export function Card({
  className,
  tone,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>) {
  return (
    <div
      className={cn(cardVariants({ tone }), className)}
      {...props}
    />
  );
}
