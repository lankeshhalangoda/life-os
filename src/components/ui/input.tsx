import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-[var(--radius-ui)] border border-[#d2c3ae] bg-[#f9f4ea] px-3 text-sm text-[#2f2117] outline-none placeholder:text-[#8f7862] focus:border-[#5a3d2b]",
        className,
      )}
      {...props}
    />
  );
}
