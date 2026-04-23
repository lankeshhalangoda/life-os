import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-ui)] border border-[#cfbca4] bg-[#f9f1e4] p-5 shadow-[var(--shadow-ui)]",
        className,
      )}
      {...props}
    />
  );
}
