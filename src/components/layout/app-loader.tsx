"use client";

import { LogoMark } from "@/components/layout/logo-mark";

export function AppLoader({ fullscreen = false }: { fullscreen?: boolean }) {
  const containerClass = fullscreen
    ? "fixed inset-0 z-[70] grid place-items-center bg-[#efe7dc]/96"
    : "grid min-h-[35vh] place-items-center";

  return (
    <div className={containerClass}>
      <div className="space-y-3 text-center">
        <LogoMark className="text-3xl font-semibold text-[#5a3d2b]" />
        <div className="mx-auto h-1 w-32 overflow-hidden rounded-[var(--radius-ui)] border border-[#cfbca4] bg-[#dccbb5]">
          <div className="h-full w-1/2 animate-pulse bg-[#5a3d2b]" />
        </div>
        <p className="text-xs uppercase tracking-[0.14em] text-[#7d6652]">Loading workspace</p>
      </div>
    </div>
  );
}
