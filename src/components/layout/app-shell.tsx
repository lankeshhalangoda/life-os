"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, ChevronRight, Command, Menu, Search, Settings, UserCircle2 } from "lucide-react";
import { navItems } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AppLoader } from "@/components/layout/app-loader";
import { CommandPalette } from "@/components/layout/command-palette";
import { LogoMark } from "@/components/layout/logo-mark";
import { Button } from "@/components/ui/button";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [openPalette, setOpenPalette] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [routeLoading, setRouteLoading] = useState(false);

  useEffect(() => {
    let gPressedAt = 0;
    const onKeyDown = (event: KeyboardEvent) => {
      const isMeta = event.metaKey || event.ctrlKey;
      if (isMeta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpenPalette((prev) => !prev);
      }
      if (event.key.toLowerCase() === "g") gPressedAt = Date.now();
      if (event.key.toLowerCase() === "d" && Date.now() - gPressedAt < 1200) router.push("/");
      if (event.key.toLowerCase() === "f" && !isMeta) router.push("/focus-mode");
      if (event.key === "Escape") {
        setOpenPalette(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setRouteLoading(true));
    const timer = window.setTimeout(() => setRouteLoading(false), 240);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    const open = () => setOpenPalette(true);
    window.addEventListener("lifeos:open-command-palette", open);
    return () => window.removeEventListener("lifeos:open-command-palette", open);
  }, []);

  const currentLabel = navItems.find((item) => item.href === pathname)?.label ?? "Dashboard";

  return (
    <div className="mx-auto flex w-full max-w-[1860px] flex-1 gap-3 px-3 py-3 lg:gap-4 lg:px-4">
      <aside className="surface sticky top-3 hidden h-[calc(100vh-1.5rem)] w-[16.5rem] shrink-0 p-4 lg:flex lg:flex-col">
        <div className="mb-7 border-b border-[#cfbca4] pb-4">
          <LogoMark className="text-3xl font-semibold text-[#4a2f20]" />
          <p className="mt-2 whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[#8f7862]">Personal Operating System</p>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-[var(--radius-ui)] px-3 py-2.5 text-sm transition-colors",
                pathname === item.href
                  ? "bg-[#5a3d2b] font-medium text-[#f9f4ea]"
                  : "text-[#604a36] hover:bg-[#efe3d2]",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto space-y-3 rounded-[var(--radius-ui)] border border-[#ccb79d] bg-[#efe0cd] p-3">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-[var(--radius-ui)] bg-[#dcc4a8] text-[#553a2a]">
              <UserCircle2 className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#4a3324]">Lankesh Halangoda</p>
              <p className="text-xs text-[#735c47]">Focus score 82, streak 13d</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/settings">
              <Button size="sm" variant="outline" className="w-full">
                <Settings className="mr-1 h-4 w-4" />
                Settings
              </Button>
            </Link>
            <Link href="/profile">
              <Button size="sm" variant="subtle" className="w-full">
                <UserCircle2 className="mr-1 h-4 w-4" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <header className="surface sticky top-0 z-30 flex h-14 items-center justify-between px-4">
          <div className="flex min-w-0 flex-col gap-0.5 text-[#5d4633]">
            <div className="flex min-w-0 items-center gap-2 text-xs text-[#7f6651]">
              <span className="shrink-0">LifeOS</span>
              <ChevronRight className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate font-medium text-[#5d4633]">{currentLabel}</span>
            </div>
          </div>
          <div className="hidden h-9 items-center gap-2 rounded-[var(--radius-ui)] border border-[#d3c1aa] bg-[#efe3d2] px-3 text-xs text-[#7a6049] xl:flex">
            <Search className="h-3.5 w-3.5" />
            Search priorities, decisions, goals, and actions...
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="lg:hidden" onClick={() => setMobileNavOpen((v) => !v)}>
              <Menu className="mr-1 h-4 w-4" /> Modules
            </Button>
            <Button variant="outline" size="sm" onClick={() => setOpenPalette(true)}>
              <Command className="mr-1 h-4 w-4" /> Command
            </Button>
            <Button variant="subtle" size="sm" type="button">
              <Bell className="mr-1 h-4 w-4" /> Updates
            </Button>
          </div>
        </header>
        {mobileNavOpen && (
          <nav className="surface grid gap-2 p-3 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNavOpen(false)}
                className={cn(
                  "rounded-[var(--radius-ui)] h-10 px-3 text-sm flex items-center",
                  pathname === item.href
                    ? "bg-[#5a3d2b] text-[#f9f4ea]"
                    : "bg-[#f3e8d9] text-[#5d4633]",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        <main key={pathname} className="min-w-0 pb-2">
          {children}
        </main>
      </div>

      <CommandPalette open={openPalette} onClose={() => setOpenPalette(false)} />
      {routeLoading && <AppLoader fullscreen />}
    </div>
  );
}
