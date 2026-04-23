import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[var(--radius-ui)] border border-[#d2c3ae] bg-[#ece0d1] px-2.5 py-1 text-xs font-medium uppercase tracking-[0.08em] text-[#6d5642]",
        className,
      )}
    >
      {children}
    </span>
  );
}
