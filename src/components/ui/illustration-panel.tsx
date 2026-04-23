import Image from "next/image";
import { cn } from "@/lib/utils";

export function IllustrationPanel({
  title,
  src,
  className,
}: {
  title: string;
  src?: string;
  className?: string;
}) {
  return (
    <div className={cn("h-fit self-start rounded-[var(--radius-ui)] border border-[#d2c3ae] bg-[#f6eddf] p-3", className)}>
      <div className="relative w-full overflow-hidden border border-[#d2c3ae] bg-[#efe2d2] aspect-[16/9] max-h-[260px]">
        {src ? (
          <Image src={src} alt={title} fill sizes="(max-width: 1024px) 100vw, 520px" className="object-contain p-2" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[#7e6753]">No image source</div>
        )}
      </div>
    </div>
  );
}
