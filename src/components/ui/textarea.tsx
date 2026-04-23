import * as React from "react";
import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-[var(--radius-ui)] border border-[#d2c3ae] bg-[#f9f4ea] px-3 py-2 text-sm text-[#2f2117] outline-none placeholder:text-[#8f7862] focus:border-[#5a3d2b]",
        className,
      )}
      {...props}
    />
  );
}
