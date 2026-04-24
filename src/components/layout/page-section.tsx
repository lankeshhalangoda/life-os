"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

/** Section heading + one-sentence intro; wrap cards in `children`. */
export function PageSection({
  title,
  intro,
  children,
  className,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <header className="space-y-1 border-b border-[#cfc0ae] pb-3">
        <h2 className="text-lg font-semibold tracking-tight text-[#2f2117]">{title}</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-[#6f5641]">{intro}</p>
      </header>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}

/** First section on every module page: copy left, single image panel right (no nested “card in card”). */
export function ModuleIntroHero({
  heading,
  description,
  icon,
  badge,
  imageSrc,
  imageAlt,
  priority,
  footer,
}: {
  heading: string;
  description: string;
  icon?: ReactNode;
  badge?: ReactNode;
  imageSrc: string;
  imageAlt: string;
  priority?: boolean;
  footer?: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="grid-row-cards grid gap-4 lg:grid-cols-[1.25fr_1fr]">
        <div className="flex min-w-0 flex-col gap-2.5">
          {badge}
          {icon ? <div className="flex items-center gap-2 text-[#7f6651]">{icon}</div> : null}
          <h1 className="text-2xl font-semibold tracking-tight text-[#2f2117]">{heading}</h1>
          <p className="max-w-2xl text-sm leading-relaxed text-[#5f4733]">{description}</p>
          {footer}
        </div>
        <div className="relative min-h-[200px] overflow-hidden rounded-[var(--radius-ui)] border border-[#cfbca4] bg-[#efe0cd] lg:min-h-[260px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority={priority}
            loading={priority ? "eager" : undefined}
            className="object-contain p-4"
          />
        </div>
      </div>
    </Card>
  );
}
