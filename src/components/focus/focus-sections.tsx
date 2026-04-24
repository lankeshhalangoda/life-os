"use client";

import Image from "next/image";
import { BarChart3, CheckCircle2, Flame, Headphones, Pause, Play, RotateCcw, ShieldBan, Target, Timer, TrendingUp, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ambientModes, completedSessions } from "@/components/focus/focus-data";

export function FocusHero({ sessionGoal }: { sessionGoal: string }) {
  return (
    <header className="border-b border-[#cfbca4] bg-[#ece1d3]">
      <div className="py-4 lg:py-5">
        <div className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] p-4 sm:p-5">
          <div className="grid gap-4 border border-[#cfbca4] bg-[#fdf9f3] p-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7862]">Focus tracker</p>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#2f2117] sm:text-3xl">Focus command center</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#5f4733]">Deep-work control room for cycles, blockers, and execution quality.</p>
            </div>
            <div className="relative h-28">
              <Image src="/images/undraw_plan-mode_rs7h.svg" alt="Focus planning visual" fill className="object-contain" sizes="220px" />
            </div>
          </div>
          <div className="mt-4 grid divide-y divide-[#cfc0ae] border border-[#cfc0ae] bg-[#fdf9f3] md:grid-cols-4 md:divide-x md:divide-y-0">
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Focus streak</p>
              <p className="mt-1 text-2xl font-medium tabular-nums text-[#241a14]">11d</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Hours this week</p>
              <p className="mt-1 text-2xl font-medium tabular-nums text-[#241a14]">18.4h</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Best window</p>
              <p className="mt-1 font-mono text-lg text-[#241a14]">09:00 — 11:30</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Session goal</p>
              <p className="mt-1 text-sm font-medium text-[#2f2117]">{sessionGoal}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function FocusTimerSection({
  isWork,
  minutes,
  secs,
  running,
  onToggle,
  onReset,
  onBreak,
}: {
  isWork: boolean;
  minutes: string;
  secs: string;
  running: boolean;
  onToggle: () => void;
  onReset: () => void;
  onBreak: () => void;
}) {
  const totalSecs = (isWork ? 50 : 10) * 60;
  const elapsedRatio = 1 - (Number(minutes) * 60 + Number(secs)) / totalSecs;

  return (
    <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="timer">
      <div className="border-b border-[#cfc0ae] px-4 py-4">
        <h2 id="timer" className="text-lg font-semibold tracking-tight text-[#2f2117]">
          Work / break cycle timer
        </h2>
        <p className="mt-1 text-sm text-[#6f5641]">{isWork ? "Deep work cycle" : "Recovery break"} in progress</p>
      </div>
      <div className="px-4 py-6">
        <div className="grid gap-0 border border-[#cfbca4] bg-[#fdf9f3] lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="border-b border-[#cfc0ae] p-5 lg:border-b-0 lg:border-r">
            <div className="inline-flex w-fit items-center gap-2 border border-[#cfbca4] bg-[#f8f1e6] px-3 py-1 text-xs uppercase tracking-[0.12em] text-[#7f6651]">
              <Timer className="h-4 w-4" aria-hidden />
              {isWork ? "Work cycle 50:10" : "Break cycle 10:50"}
            </div>
            <p className="mt-4 font-mono text-7xl font-semibold tracking-tight text-[#1f1610] sm:text-8xl">
              {minutes}:{secs}
            </p>
            <div className="mt-4 h-2 border border-[#d6c8b4] bg-[#ebe0d0]">
              <div className="h-full bg-[#5a3d2b] transition-[width] duration-500" style={{ width: `${Math.max(0, Math.min(100, elapsedRatio * 100))}%` }} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button type="button" onClick={onToggle} className="h-10 border border-[#5a3d2b] bg-[#5a3d2b] px-4 text-sm font-medium text-[#f9f4ea]">
                {running ? <Pause className="mr-2 inline h-4 w-4" aria-hidden /> : <Play className="mr-2 inline h-4 w-4" aria-hidden />}
                {running ? "Pause" : "Start"}
              </button>
              <button type="button" onClick={onReset} className="h-10 border border-[#cfbca4] bg-[#fdf9f3] px-4 text-sm text-[#5f4733]">
                <RotateCcw className="mr-2 inline h-4 w-4" aria-hidden />
                Reset
              </button>
              <button type="button" onClick={onBreak} className="h-10 border border-[#cfbca4] bg-[#f3e8d9] px-4 text-sm text-[#5f4733]">
                <Timer className="mr-2 inline h-4 w-4" aria-hidden />
                Start break
              </button>
            </div>
          </div>
          <aside className="space-y-3 bg-[#f8f1e6] p-5 text-sm text-[#5f4733]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Session guidance</p>
            <p>Single objective only. No context switches until timer ends.</p>
            <p className="border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2 text-xs text-[#6f5641]">
              {isWork ? "Work mode active: protect attention." : "Break mode active: stand up, reset breathing."}
            </p>
            <p className="border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2 text-xs text-[#6f5641]">
              Completion quality is higher when you finish with one written outcome.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function FocusControlsGrid({
  ambientMode,
  setAmbientMode,
  tasks,
  toggleTask,
  toggles,
}: {
  ambientMode: string;
  setAmbientMode: (id: string) => void;
  tasks: { title: string; done: boolean }[];
  toggleTask: (i: number) => void;
  toggles: Array<{ label: string; value: boolean; onChange: (v: boolean) => void; kind: "block" | "sound" }>;
}) {
  return (
    <div className="grid gap-px border border-[#cfbca4] bg-[#cfc0ae] lg:grid-cols-12">
      <section className="bg-[#f8f1e6] lg:col-span-4" aria-labelledby="ambient">
        <div className="border-b border-[#cfc0ae] px-4 py-3">
          <h2 id="ambient" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Ambient mode</h2>
        </div>
        <div className="space-y-2 px-4 py-4">
          {ambientModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                type="button"
                onClick={() => setAmbientMode(mode.id)}
                className={cn(
                  "flex w-full items-center gap-2 border px-3 py-2 text-left text-sm",
                  ambientMode === mode.id ? "border-[#5a3d2b] bg-[#5a3d2b] text-[#f9f4ea]" : "border-[#cfbca4] bg-[#fdf9f3] text-[#4f3928]",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {mode.label}
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-[#f1e4d2] lg:col-span-4" aria-labelledby="tasks">
        <div className="border-b border-[#cfc0ae] px-4 py-3">
          <h2 id="tasks" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Session task queue</h2>
        </div>
        <ul className="space-y-2 px-4 py-4">
          {tasks.map((task, i) => (
            <li key={task.title}>
              <button
                type="button"
                onClick={() => toggleTask(i)}
                className={cn(
                  "flex w-full items-center gap-2 border px-3 py-2 text-left text-sm",
                  task.done ? "border-[#6b8f5e] bg-[#e8f0e4] text-[#3d5a32]" : "border-[#cfbca4] bg-[#fdf9f3] text-[#4f3928]",
                )}
              >
                {task.done ? <CheckCircle2 className="h-4 w-4" aria-hidden /> : <Target className="h-4 w-4" aria-hidden />}
                {task.title}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-[#ebe0d0] lg:col-span-4" aria-labelledby="controls">
        <div className="border-b border-[#cfc0ae] px-4 py-3">
          <h2 id="controls" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Blockers + sound controls</h2>
        </div>
        <div className="space-y-3 px-4 py-4 text-sm text-[#4f3928]">
          {toggles.map((item) => (
            <label key={item.label} className="flex items-center justify-between gap-2 border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">
              <span className="flex items-center gap-2">
                {item.kind === "block" ? <ShieldBan className="h-4 w-4 text-[#7f6651]" /> : item.label.includes("noise") ? <Volume2 className="h-4 w-4 text-[#7f6651]" /> : <Headphones className="h-4 w-4 text-[#7f6651]" />}
                {item.label}
              </span>
              <input type="checkbox" checked={item.value} onChange={(e) => item.onChange(e.target.checked)} className="h-4 w-4 accent-[#5a3d2b]" />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

export function FocusAnalyticsSection({
  bestHours,
  avgSessionLength,
  interruptionTrend,
  productivityScore,
}: {
  bestHours: string;
  avgSessionLength: number;
  interruptionTrend: string;
  productivityScore: number;
}) {
  return (
    <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="analytics">
      <div className="border-b border-[#cfc0ae] px-4 py-4">
        <h2 id="analytics" className="text-lg font-semibold tracking-tight">Focus analytics</h2>
        <p className="mt-1 text-sm text-[#6f5641]">Best hours, interruption trend, and deep-work quality indicators.</p>
      </div>
      <div className="grid divide-y divide-[#cfc0ae] md:grid-cols-4 md:divide-x md:divide-y-0">
        <div className="px-4 py-4"><p className="text-[10px] uppercase tracking-[0.12em] text-[#8f7862]">Best hours</p><p className="mt-1 text-sm font-medium">{bestHours}</p></div>
        <div className="px-4 py-4"><p className="text-[10px] uppercase tracking-[0.12em] text-[#8f7862]">Avg session length</p><p className="mt-1 text-sm font-medium">{avgSessionLength} min</p></div>
        <div className="px-4 py-4"><p className="text-[10px] uppercase tracking-[0.12em] text-[#8f7862]">Interruption trend</p><p className="mt-1 text-sm font-medium">{interruptionTrend}</p></div>
        <div className="px-4 py-4"><p className="text-[10px] uppercase tracking-[0.12em] text-[#8f7862]">Productivity score</p><p className="mt-1 text-2xl font-light tabular-nums">{productivityScore}</p></div>
      </div>
    </section>
  );
}

export function FocusTimelineSection({ motivation, totalDone }: { motivation: string; totalDone: number }) {
  return (
    <div className="grid gap-px border border-[#cfbca4] bg-[#cfc0ae] lg:grid-cols-12">
      <section className="bg-[#f8f1e6] lg:col-span-7" aria-labelledby="timeline">
        <div className="border-b border-[#cfc0ae] px-4 py-3"><h2 id="timeline" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Completed session timeline</h2></div>
        <ol className="space-y-0 divide-y divide-[#e8dcc9]">
          {completedSessions.map((session) => (
            <li key={session.time} className="flex items-start justify-between gap-3 px-4 py-3">
              <div>
                <p className="font-mono text-xs text-[#8f7862]">{session.time}</p>
                <p className="mt-1 text-sm text-[#4f3928]">{session.focus}</p>
              </div>
              <span className="border border-[#cfbca4] bg-[#fdf9f3] px-2 py-0.5 font-mono text-xs">{session.score}</span>
            </li>
          ))}
        </ol>
      </section>
      <section className="bg-[#ebe0d0] lg:col-span-5" aria-labelledby="motivation">
        <div className="border-b border-[#cfc0ae] px-4 py-3"><h2 id="motivation" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Motivation insights</h2></div>
        <div className="space-y-3 px-4 py-4">
          <div className="border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2 text-sm text-[#4f3928]">{motivation}</div>
          <div className="border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2 text-sm text-[#4f3928]">
            {totalDone >= 2 ? "You are in execution rhythm. Hold this environment for one more cycle." : "Clear one task fully before switching context. Partial progress increases residue."}
          </div>
          <div className="flex items-center gap-2 border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2 text-xs text-[#6f5641]">
            <Flame className="h-4 w-4 text-[#9a6b5a]" aria-hidden />
            Deep work compounds when initiation friction is near zero.
          </div>
        </div>
      </section>
    </div>
  );
}

export function FocusFooter() {
  return (
    <footer className="flex flex-wrap items-center gap-3 border-t border-[#cfc0ae] pt-4 text-xs text-[#6f5641]">
      <BarChart3 className="h-4 w-4 text-[#7f6651]" aria-hidden />
      <span>Track interruptions, not just timer minutes.</span>
      <TrendingUp className="h-4 w-4 text-[#6b8f5e]" aria-hidden />
      <span>Protect your best hours first.</span>
    </footer>
  );
}
