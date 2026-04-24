"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  ChevronRight,
  Command,
  Flame,
  Layers,
  LayoutGrid,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { budgets, energyData, goals, priorities, upcomingDecisions } from "@/lib/data";
import { DashboardAreaChart, LifeWheelChart } from "@/components/charts/dashboard-analytics";
import { DashboardEnergyTrendChart } from "@/components/dashboard/dashboard-energy-trend";
import { cn } from "@/lib/utils";

const onboardingTips = [
  { n: "01", t: "Name three outcomes before your first meeting — everything else queues behind them." },
  { n: "02", t: "Score one open decision in Decisions Lab; confidence compounds when trade-offs are explicit." },
  { n: "03", t: "Protect two 90-minute maker blocks; LifeOS weights execution quality over raw hours." },
];

const whatsNew = [
  "Decision confidence timeline: 7-day deltas on the dashboard.",
  "Money Clarity: runway sensitivity + downside guardrails.",
  "AI Coach: weekly action packs with one-tap scheduling.",
];

const activityFeed = [
  { time: "09:12", label: "Energy check-in", detail: "Mental 82 · Physical 76" },
  { time: "10:04", label: "Priority closed", detail: "Pilot onboarding copy shipped" },
  { time: "13:40", label: "Focus sprint", detail: "Roadmap architecture — 86 min deep" },
  { time: "18:20", label: "Reflection", detail: "Weekly summary drafted" },
];

const matrixRows = upcomingDecisions.map((d, i) => ({
  ...d,
  urgency: [5, 4, 3, 4][i] ?? 3,
  impact: [4, 5, 4, 3][i] ?? 3,
  status: i === 0 ? "Due today" : i === 1 ? "Queued" : i === 2 ? "Research" : "Watch",
}));

const habitDots = [0.85, 0.72, 0.9, 0.68, 0.8];

function openCommandPalette() {
  window.dispatchEvent(new Event("lifeos:open-command-palette"));
}

function formatLongDate(d: Date) {
  const day = d.getDate();
  const mod100 = day % 100;
  const suffix = mod100 >= 11 && mod100 <= 13 ? "th" : day % 10 === 1 ? "st" : day % 10 === 2 ? "nd" : day % 10 === 3 ? "rd" : "th";
  const weekday = d.toLocaleDateString("en-US", { weekday: "long" });
  const month = d.toLocaleDateString("en-US", { month: "long" });
  const year = d.getFullYear();
  return `${weekday}, ${month} ${day}${suffix}, ${year}`;
}

function greetingFor(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function ControlCenter() {
  const [mounted, setMounted] = useState(false);
  const [taskDone, setTaskDone] = useState<boolean[]>(() => priorities.slice(0, 3).map(() => false));
  const [dateLine, setDateLine] = useState("");
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    setMounted(true);
    const d = new Date();
    d.setDate(12);
    setDateLine(formatLongDate(d));
    setGreeting(greetingFor(d.getHours()));
  }, []);

  const spendPct = useMemo(() => {
    const totalBudget = budgets.reduce((a, b) => a + b.budget, 0);
    const totalSpent = budgets.reduce((a, b) => a + b.spent, 0);
    return Math.round((totalSpent / totalBudget) * 100);
  }, []);

  const topGoal = goals[0];

  return (
    <div className="scroll-smooth pb-20">
      {/* —— Hero —— */}
      <section className="border border-[#b8a08c] bg-gradient-to-br from-[#fffdf9] via-[#f7efe3] to-[#e8dcc9]">
        {!mounted ? (
          <div className="grid gap-6 p-6 lg:grid-cols-[1fr_minmax(240px,320px)_200px] lg:p-8">
            <div className="space-y-4">
              <div className="h-4 w-48 animate-pulse bg-[#d9cab4]/80" />
              <div className="h-10 w-full max-w-lg animate-pulse bg-[#d9cab4]/60" />
              <div className="h-4 w-full max-w-xl animate-pulse bg-[#d9cab4]/50" />
            </div>
            <div className="h-12 animate-pulse bg-[#d9cab4]/50" />
            <div className="h-24 animate-pulse bg-[#d9cab4]/40" />
          </div>
        ) : (
          <div className="grid gap-8 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,360px)_auto] lg:items-center lg:gap-10 lg:p-8">
            <div className="min-w-0 space-y-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a6049]">LifeOS control center</p>
              <h1 className="text-2xl font-semibold tracking-tight text-[#2f2117] sm:text-3xl">
                {greeting},{" "}
                <span className="text-[#5a3d2b]">Lankesh</span>
              </h1>
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[#5b4432]">
                <Calendar className="h-4 w-4 shrink-0 text-[#8f7862]" aria-hidden />
                <span className="font-medium text-[#3b2a1e]">{dateLine}</span>
              </p>
              <p className="max-w-2xl text-sm leading-relaxed text-[#5f4733]">
                <span className="font-medium text-[#2f2117]">One operating system</span> for priorities, energy, money,
                decisions, and growth — so you see trade-offs before the day decides for you.
              </p>
            </div>

            <div className="min-w-0">
              <button
                type="button"
                onClick={openCommandPalette}
                className="group flex w-full items-center gap-3 border border-[#a68b6f] bg-[#fdfaf6] px-4 py-3 text-left transition hover:border-[#5a3d2b] hover:bg-[#f9f4ea]"
              >
                <Search className="h-4 w-4 shrink-0 text-[#7a6049] transition group-hover:text-[#5a3d2b]" aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#3b2a1e]">Jump anywhere</p>
                  <p className="truncate text-xs text-[#8f7862]">Search modules, open Decisions Lab, start Focus…</p>
                </div>
                <kbd className="hidden shrink-0 items-center gap-0.5 border border-[#d4c4b0] bg-[#f3e8d9] px-2 py-1 font-mono text-[10px] text-[#5d4633] sm:inline-flex">
                  <Command className="h-3 w-3" aria-hidden />K
                </kbd>
              </button>
              <p className="mt-2 text-[11px] text-[#8f7862]">Opens the same command palette as the header.</p>
            </div>

            <div className="flex flex-row items-center gap-4 border-t border-[#d9cab4] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <dl className="grid flex-1 grid-cols-2 gap-x-6 gap-y-1 text-xs">
                <div className="border-l-2 border-[#5a3d2b] pl-3">
                  <dt className="text-[10px] uppercase tracking-wide text-[#8f7862]">Focus</dt>
                  <dd className="text-lg font-semibold tabular-nums text-[#2f2117]">82</dd>
                </div>
                <div className="border-l-2 border-[#8f7862] pl-3">
                  <dt className="text-[10px] uppercase tracking-wide text-[#8f7862]">Streak</dt>
                  <dd className="text-lg font-semibold tabular-nums text-[#2f2117]">13d</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </section>

      <div className="mt-12 grid gap-12 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start xl:gap-10">
        <div className="min-w-0 space-y-12">
          {/* —— Today focus —— */}
          <section aria-labelledby="today-focus-heading">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3 border-b border-[#cfc0ae] pb-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a6049]">Execution surface</p>
                <h2 id="today-focus-heading" className="mt-1 text-xl font-semibold tracking-tight text-[#2f2117]">
                  Today focus
                </h2>
              </div>
              <span className="text-xs text-[#8f7862]">Top 3 outcomes · drag order in a future build</span>
            </div>
            <div className="border border-[#b8a08c] bg-[#faf6ef]">
              <div className="grid divide-y divide-[#d9cab4] md:grid-cols-3 md:divide-x md:divide-y-0">
                {priorities.slice(0, 3).map((p, i) => (
                  <label
                    key={p}
                    className={cn(
                      "group flex cursor-pointer gap-3 p-4 transition-colors hover:bg-[#f3e8d9]/70",
                      i === 0 && "md:border-l-0",
                    )}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-[#c4a882] bg-[#5a3d2b] text-xs font-bold text-[#fdf8f0]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={taskDone[i]}
                          onChange={() =>
                            setTaskDone((prev) => {
                              const n = [...prev];
                              n[i] = !n[i];
                              return n;
                            })
                          }
                          className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#5a3d2b]"
                        />
                        <span className={cn("text-sm leading-snug text-[#3b2a1e]", taskDone[i] && "text-[#8f7862] line-through")}>
                          {p}
                        </span>
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* —— Energy + momentum strip —— */}
          <section aria-labelledby="energy-heading">
            <div className="mb-4 border-b border-[#cfc0ae] pb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a6049]">Signals</p>
              <h2 id="energy-heading" className="mt-1 text-xl font-semibold tracking-tight text-[#2f2117]">
                Energy + momentum
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-[#6f5641]">Focus trend, system health dial, and weekly energy traces side by side.</p>
            </div>
            <div className="grid border border-[#b8a08c] lg:grid-cols-[minmax(0,1.35fr)_220px_minmax(0,1fr)]">
              <div className="border-b border-[#d9cab4] p-4 lg:border-b-0 lg:border-r">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8f7862]">Focus depth</span>
                  <TrendingUp className="h-4 w-4 text-[#7a6049]" aria-hidden />
                </div>
                <DashboardAreaChart />
              </div>
              <div className="flex flex-col items-center justify-center border-b border-[#d9cab4] bg-[#f5ecdf] p-4 lg:border-b-0 lg:border-r">
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8f7862]">System health</span>
                <div className="mt-2 w-full max-w-[200px]">
                  <LifeWheelChart className="h-44 px-1" />
                </div>
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#8f7862]">Weekly energy</span>
                  <Zap className="h-4 w-4 text-[#7a6049]" aria-hidden />
                </div>
                <DashboardEnergyTrendChart data={energyData} />
                <p className="mt-2 text-[11px] text-[#8f7862]">Mental vs physical (Mon–Sun)</p>
              </div>
            </div>
          </section>

          {/* —— Decisions: timeline + matrix —— */}
          <section aria-labelledby="decisions-heading">
            <div className="mb-4 border-b border-[#cfc0ae] pb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a6049]">Commitments</p>
              <h2 id="decisions-heading" className="mt-1 text-xl font-semibold tracking-tight text-[#2f2117]">
                Upcoming decisions
              </h2>
              <p className="mt-1 text-sm text-[#6f5641]">Timeline on the left; urgency × impact matrix on the right.</p>
            </div>
            <div className="grid gap-0 border border-[#b8a08c] lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
              <div className="border-b border-[#d9cab4] bg-[#fdfaf6] p-5 lg:border-b-0 lg:border-r">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Due stream</h3>
                <ol className="relative mt-6 border-l border-[#c9b89f]">
                  {upcomingDecisions.map((d, idx) => (
                    <li key={d.title} className="relative pb-8 pl-7 last:pb-0">
                      <span className="absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-1/2 border border-[#fdfaf6] bg-[#5a3d2b]" aria-hidden />
                      <p className="text-[11px] font-medium uppercase tracking-wide text-[#9a8570]">{d.due}</p>
                      <p className="mt-1 text-sm font-medium text-[#2f2117]">{d.title}</p>
                      {idx === 0 ? (
                        <Link
                          href="/decisions-lab"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[#5a3d2b] underline-offset-2 hover:underline"
                        >
                          Open in Decisions Lab <ChevronRight className="h-3 w-3" />
                        </Link>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="overflow-x-auto bg-[#faf6ef] p-4 lg:p-5">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Priority matrix</h3>
                <p className="mt-1 text-[11px] text-[#9a8570]">1–5 scale · synthetic for demo</p>
                <table className="mt-4 w-full min-w-[360px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#d9cab4] text-[11px] uppercase tracking-wide text-[#8f7862]">
                      <th className="py-2 pr-3 font-semibold">Decision</th>
                      <th className="py-2 px-2 font-semibold">Urgency</th>
                      <th className="py-2 px-2 font-semibold">Impact</th>
                      <th className="py-2 pl-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row) => (
                      <tr key={row.title} className="border-b border-[#e8dcc9] transition-colors hover:bg-[#f3e8d9]/50">
                        <td className="max-w-[200px] py-3 pr-3 text-[#3b2a1e]">{row.title}</td>
                        <td className="px-2 py-3 tabular-nums text-[#5b4432]">{row.urgency}</td>
                        <td className="px-2 py-3 tabular-nums text-[#5b4432]">{row.impact}</td>
                        <td className="pl-2 py-3 text-xs text-[#7a6049]">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* —— Guidance + illustration —— */}
          <section aria-labelledby="guidance-heading">
            <div className="mb-4 border-b border-[#cfc0ae] pb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a6049]">Product & onboarding</p>
              <h2 id="guidance-heading" className="mt-1 text-xl font-semibold tracking-tight text-[#2f2117]">
                What&apos;s new · guidance
              </h2>
            </div>
            <div className="grid border border-[#b8a08c] lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
              <div className="relative min-h-[220px] border-b border-[#d9cab4] lg:min-h-[280px] lg:border-b-0 lg:border-r">
                <Image
                  src="/images/undraw_plan-mode_rs7h.svg"
                  alt="Planning illustration"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 280px"
                />
              </div>
              <div className="grid divide-y divide-[#e8dcc9] md:grid-cols-2 md:divide-x md:divide-y-0">
                <div className="p-5">
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
                    <Layers className="h-3.5 w-3.5" aria-hidden />
                    Onboarding
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {onboardingTips.map((tip) => (
                      <li key={tip.n} className="flex gap-3 text-sm leading-snug text-[#4f3928]">
                        <span className="font-mono text-xs text-[#b5a08c]">{tip.n}</span>
                        <span>{tip.t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#fdfaf6] p-5">
                  <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    What&apos;s new
                  </h3>
                  <ul className="mt-4 space-y-3 border-l-2 border-[#5a3d2b] pl-4">
                    {whatsNew.map((line) => (
                      <li key={line} className="text-sm text-[#5b4432]">
                        {line}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/decisions-lab"
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "mt-6 w-full !rounded-none border-[#b8a08c] sm:w-auto",
                    )}
                  >
                    Explore Decisions Lab
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* —— Life snapshot —— */}
          <section aria-labelledby="snapshot-heading">
            <div className="mb-4 border-b border-[#cfc0ae] pb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a6049]">Cross-domain pulse</p>
              <h2 id="snapshot-heading" className="mt-1 text-xl font-semibold tracking-tight text-[#2f2117]">
                Life snapshot
              </h2>
            </div>
            <div className="grid gap-0 border border-[#b8a08c] sm:grid-cols-2 lg:grid-cols-4">
              <div className="border-b border-[#d9cab4] p-4 transition-colors hover:bg-[#f9f4ea] sm:border-r lg:border-b-0">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#8f7862]">
                  <Target className="h-3.5 w-3.5" aria-hidden />
                  Primary goal
                </div>
                <p className="mt-3 line-clamp-2 text-sm font-medium text-[#2f2117]">{topGoal.title}</p>
                <div className="mt-4 h-1.5 w-full bg-[#e5d8c8]">
                  <div className="h-full bg-[#5a3d2b]" style={{ width: `${topGoal.progress}%` }} />
                </div>
                <p className="mt-2 text-xs tabular-nums text-[#7a6049]">{topGoal.progress}% to milestone</p>
              </div>
              <div className="border-b border-[#d9cab4] p-4 transition-colors hover:bg-[#f9f4ea] lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#8f7862]">
                  <Wallet className="h-3.5 w-3.5" aria-hidden />
                  Finances
                </div>
                <p className="mt-3 text-2xl font-semibold tabular-nums text-[#2f2117]">~9.2 mo</p>
                <p className="text-xs text-[#7a6049]">Runway at current burn</p>
                <div className="mt-4 flex items-end gap-2">
                  <div className="flex h-16 flex-1 items-end bg-[#e5d8c8]" title="Spend vs plan">
                    <div className="w-full bg-[#7a5a41]" style={{ height: `${spendPct}%` }} />
                  </div>
                  <span className="pb-0.5 text-[10px] text-[#9a8570]">{spendPct}% used</span>
                </div>
              </div>
              <div className="border-b border-[#d9cab4] p-4 transition-colors hover:bg-[#f9f4ea] sm:border-r sm:border-b-0 lg:border-r">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#8f7862]">
                  <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
                  Habits
                </div>
                <p className="mt-3 text-sm text-[#5b4432]">Consistency heat (last 5 days)</p>
                <div className="mt-4 flex h-14 items-end gap-1">
                  {habitDots.map((v, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#5a3d2b] transition hover:opacity-90"
                      style={{ height: `${Math.round(v * 100)}%`, opacity: 0.35 + v * 0.55 }}
                      title={`Day ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="p-4 transition-colors hover:bg-[#f9f4ea]">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-[#8f7862]">
                  <Flame className="h-3.5 w-3.5 text-[#a85c32]" aria-hidden />
                  Reflection
                </div>
                <p className="mt-3 text-4xl font-semibold tabular-nums text-[#2f2117]">13</p>
                <p className="text-xs text-[#7a6049]">day streak · quality 8.4/10</p>
                <Link href="/reflection-journal" className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-[#5a3d2b] hover:underline">
                  Open journal <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* —— Activity + AI —— */}
          <section aria-labelledby="activity-heading">
            <div className="mb-4 border-b border-[#cfc0ae] pb-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a6049]">Telemetry</p>
              <h2 id="activity-heading" className="mt-1 text-xl font-semibold tracking-tight text-[#2f2117]">
                Activity & AI picks
              </h2>
            </div>
            <div className="grid gap-0 border border-[#b8a08c] lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
              <div className="border-b border-[#d9cab4] p-5 lg:border-b-0 lg:border-r">
                <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Recent actions</h3>
                <ul className="mt-4 space-y-0 divide-y divide-[#e8dcc9]">
                  {activityFeed.map((a) => (
                    <li key={a.time} className="flex gap-4 py-3 first:pt-0 transition-colors hover:bg-[#f9f4ea]/80">
                      <time className="w-14 shrink-0 font-mono text-xs text-[#9a8570]">{a.time}</time>
                      <div>
                        <p className="text-sm font-medium text-[#2f2117]">{a.label}</p>
                        <p className="text-xs text-[#7a6049]">{a.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#2f2117] p-5 text-[#f5ecdf]">
                <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#d9cab4]">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  Coach suggestions
                </h3>
                <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[#ebe0d0]">
                  <li>Move strategic calls before noon — correlates with +11% decision quality in your log.</li>
                  <li>Cap Friday discretionary spend at $160 to hold runway; Money Clarity is already tracking variance.</li>
                  <li>Schedule reflection before 20:30 to protect the streak you are building.</li>
                </ul>
                <Link
                  href="/ai-coach"
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-none border border-[#c9b89f] px-4 text-sm font-medium text-[#fdf8f0] transition hover:bg-[#3b2a1e]"
                >
                  Open AI Coach
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* Sticky rail */}
        <aside className="hidden self-start xl:sticky xl:top-24 xl:block">
          <div className="max-h-[calc(100vh-7rem)] space-y-4 overflow-y-auto border border-[#b8a08c] bg-[#fdfaf6] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f7862]">Quick rail</p>
            <button
              type="button"
              onClick={openCommandPalette}
              className="flex w-full items-center justify-between border border-[#d9cab4] bg-[#faf6ef] px-3 py-2 text-left text-xs font-medium text-[#3b2a1e] transition hover:border-[#5a3d2b]"
            >
              Command palette <Command className="h-3.5 w-3.5" />
            </button>
            <Link
              href="/focus-mode"
              className="flex items-center justify-between border border-[#d9cab4] px-3 py-2 text-xs font-medium text-[#3b2a1e] transition hover:bg-[#f3e8d9]"
            >
              Start focus <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/energy-tracker"
              className="flex items-center justify-between border border-[#d9cab4] px-3 py-2 text-xs font-medium text-[#3b2a1e] transition hover:bg-[#f3e8d9]"
            >
              Log energy <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <div className="border-t border-[#e8dcc9] pt-4 text-[11px] leading-relaxed text-[#7a6049]">
              LifeOS is your <strong className="text-[#3b2a1e]">control room</strong>: one place to align what matters today with how you
              spend energy, money, and attention this week.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
