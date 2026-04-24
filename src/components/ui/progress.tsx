"use client";

import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("h-2 w-full overflow-hidden rounded-[var(--radius-ui)] border border-[#d5c5b1] bg-[#e4d8c8]", className)}>
      <div
        className="h-full rounded-[var(--radius-ui)] bg-[#5a3d2b] transition-[width] duration-300 ease-out"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
