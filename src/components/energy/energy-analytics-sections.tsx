"use client";

import Image from "next/image";
import { Activity, ArrowDownRight, ArrowUpRight, Brain, Clock, Droplets, HeartPulse } from "lucide-react";
import { weeklyInsightBullets, energyData } from "@/lib/data";
import { EnergyChart } from "@/components/charts/energy-chart";
import { EnergyMoodCorrelationChart, EnergyProductivityComposed } from "@/components/energy/energy-insights-charts";
import { cn } from "@/lib/utils";
import {
  checkInLog,
  dayLabels,
  habitsDrag,
  heatCellClass,
  moodCorrelationNotes,
  peakWindow,
  recoveryLevel,
  recoveryRecs,
  routinesBoost,
  sleepQuality,
  stressRows,
} from "@/components/energy/energy-analytics-data";

export function EnergyHeroCard({ todayComposite }: { todayComposite: number }) {
  return (
    <header className="border-b border-[#cfbca4] bg-[#ece1d3]">
      <div className="px-3 py-8 sm:px-4 lg:py-10">
        <div className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] p-4 sm:p-5">
          <div className="grid gap-4 border border-[#cfbca4] bg-[#fdf9f3] p-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7862]">
                <HeartPulse className="h-4 w-4 text-[#7d8f72]" aria-hidden />
                Energy tracker
              </div>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[#2f2117] sm:text-3xl">Energy command center</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#5f4733]">Weekly capacity signals for planning, recovery, and decision quality.</p>
            </div>
            <div className="relative h-28">
              <Image src="/images/undraw_mindfulness_d853.svg" alt="Energy insights visual" fill className="object-contain" sizes="220px" />
            </div>
          </div>
          <div className="mt-4 grid divide-y divide-[#cfc0ae] border border-[#cfc0ae] bg-[#fdf9f3] md:grid-cols-4 md:divide-x md:divide-y-0">
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Composite vitality</p>
              <div className="mt-1 flex items-end gap-2">
                <span className="text-3xl font-light tabular-nums text-[#1f1610]">{todayComposite}</span>
                <span className="pb-1 text-sm text-[#8a7d6f]">/ 100</span>
              </div>
            </div>
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Sleep quality</p>
              <p className="mt-1 text-2xl font-medium tabular-nums text-[#241a14]">{sleepQuality.score}</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Recovery level</p>
              <p className="mt-1 text-2xl font-medium text-[#241a14]">{recoveryLevel.label}</p>
            </div>
            <div className="px-4 py-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Best window</p>
              <p className="mt-1 font-mono text-lg text-[#241a14]">{peakWindow.range}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function WeeklyRhythmSection() {
  return (
    <section aria-labelledby="weekly-rhythm">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-[#cfc0ae] pb-3">
        <div>
          <h2 id="weekly-rhythm" className="text-xl font-semibold tracking-tight text-[#2f2117]">
            Weekly rhythm
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6b6158]">
            Three-channel trend (mental, physical, emotional) with mood-aligned correlation view alongside.
          </p>
        </div>
        <p className="text-xs text-[#a39a8f]">Last 7 check-ins · local time</p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-8">
        <div className="surface min-w-0 p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#9a8b7a]">Tri-channel trend</span>
            <Activity className="h-4 w-4 text-[#c4b8a8]" aria-hidden />
          </div>
          <div className="min-h-[260px]">
            <EnergyChart data={energyData} heightClass="h-72" />
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#a39a8f]">
            Legend: mental · physical · emotional — overlap shows where channels diverge (stress vs fatigue vs mood).
          </p>
        </div>
        <div className="flex min-w-0 flex-col justify-between gap-6">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#9a8b7a]">Mood correlations</h3>
            <p className="mt-2 text-sm text-[#6b6158]">Mental vs emotional spread across the week.</p>
            <div className="surface-muted mt-4 border border-[#cfbca4] p-4">
              <EnergyMoodCorrelationChart data={energyData} />
            </div>
          </div>
          <ul className="space-y-5 border-t border-[#d9cab4] pt-6">
            {moodCorrelationNotes.map((item) => (
              <li key={item.title}>
                <p className="text-sm font-medium text-[#241a14]">{item.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#6b6158]">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProductivitySection() {
  return (
    <section aria-labelledby="load-output">
      <div className="mb-4 border-b border-[#cfc0ae] pb-3">
        <h2 id="load-output" className="text-xl font-semibold tracking-tight text-[#2f2117]">
          Cognitive load vs output
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6b6158]">
          Bars approximate productivity index from calendar completion; line is composite energy. Divergence flags days you pushed
          through depleted capacity.
        </p>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] lg:items-center">
        <div className="surface min-w-0 p-4 md:p-5">
          <EnergyProductivityComposed data={energyData} />
        </div>
        <aside className="space-y-6 text-sm leading-relaxed text-[#6b6158]">
          <p>
            When productivity runs above energy for multiple consecutive days, your model is borrowing from recovery — not
            expanding capacity.
          </p>
          <p className="border-l-2 border-[#8b9a7e] pl-4 text-[#5c5349]">
            <strong className="font-medium text-[#241a14]">Interpretation:</strong> align demanding deliverables with the morning ascent;
            treat afternoon as consolidation.
          </p>
        </aside>
      </div>
    </section>
  );
}

export function StressHeatmapSection() {
  return (
    <section aria-labelledby="stress-heatmap">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-[#cfc0ae] pb-3">
        <div>
          <h2 id="stress-heatmap" className="text-xl font-semibold tracking-tight text-[#2f2117]">
            Stress trigger surface
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6b6158]">
            Intensity 0–4 (subjective load index). Darker cells mean trigger co-occurred with low recovery or emotional dip.
          </p>
        </div>
        <Brain className="h-5 w-5 text-[#c4b8a8]" aria-hidden />
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#cfbca4] text-xs font-semibold uppercase tracking-wide text-[#9a8b7a]">
              <th className="py-3 pr-6 font-medium">Trigger</th>
              {dayLabels.map((d) => (
                <th key={d} className="px-1 py-3 text-center font-medium">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {stressRows.map((row) => (
              <tr key={row.trigger} className="border-b border-[#e8dcc9]">
                <td className="py-3 pr-6 text-[#4a4238]">{row.trigger}</td>
                {row.values.map((v, i) => (
                  <td key={i} className="px-1 py-2 text-center">
                    <span className={cn("inline-flex h-9 w-full max-w-[44px] items-center justify-center text-xs font-medium", heatCellClass(v))}>{v}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export function HabitsSection() {
  return (
    <section className="grid gap-px overflow-hidden border border-[#cfbca4] bg-[#d9cab4] md:grid-cols-3" aria-label="Habits and recovery">
      <div className="bg-[#f8f1e6] p-5 md:p-6">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6b8f5e]">
          <ArrowUpRight className="h-4 w-4" aria-hidden />
          Routines that raise energy
        </h3>
        <ul className="mt-6 space-y-5">
          {routinesBoost.map((r) => (
            <li key={r.name}>
              <p className="font-medium text-[#241a14]">{r.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#6b6158]">{r.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-[#f8f1e6] p-5 md:p-6">
        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#9a6b5a]">
          <ArrowDownRight className="h-4 w-4" aria-hidden />
          Habits that tax capacity
        </h3>
        <ul className="mt-6 divide-y divide-[#cfc0ae]">
          {habitsDrag.map((h) => (
            <li key={h.name} className="py-4 first:pt-0">
              <p className="text-sm font-medium text-[#241a14]">{h.name}</p>
              <p className="mt-1 text-sm text-[#7a6f66]">{h.impact}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative bg-[#f8f1e6] p-5 md:p-6">
        <Droplets className="absolute right-5 top-5 h-14 w-14 text-[#d7c9b6]" aria-hidden />
        <h3 className="relative text-xs font-semibold uppercase tracking-[0.14em] text-[#7f6651]">Recovery recommendations</h3>
        <ul className="relative mt-6 space-y-4 text-sm leading-relaxed text-[#5c5349]">
          {recoveryRecs.map((r) => (
            <li key={r} className="flex gap-3">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#8b9a7e]" aria-hidden />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CheckinSection() {
  return (
    <section aria-labelledby="checkin-log">
      <div className="mb-4 border-b border-[#cfc0ae] pb-3">
        <h2 id="checkin-log" className="text-xl font-semibold tracking-tight text-[#2f2117]">
          Daily check-in log
        </h2>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,200px)] lg:items-start">
        <div className="surface min-w-0 overflow-hidden border border-[#cfbca4]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#cfc0ae] bg-[#f9f4ea] text-xs font-semibold uppercase tracking-wide text-[#9a8b7a]">
                <th className="px-4 py-2.5 font-medium">When</th>
                <th className="hidden w-[88px] px-2 py-2.5 text-center font-medium sm:table-cell">Score</th>
                <th className="px-4 py-2.5 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              {checkInLog.map((row, idx) => (
                <tr key={row.day + row.time} className={cn("border-b border-[#e8dcc9] last:border-b-0", idx === 0 && "bg-[#f4f0e8]/80")}>
                  <td className="whitespace-nowrap px-4 py-3 align-top font-mono text-xs text-[#7a6f66]">
                    {row.day} · {row.time}
                  </td>
                  <td className="hidden px-2 py-3 align-top text-center sm:table-cell">
                    <span className="inline-flex min-w-[2.25rem] items-center justify-center border border-[#cfbca4] bg-[#f9f4ea] px-1.5 py-0.5 text-xs font-medium tabular-nums text-[#6b6158]">
                      {row.composite}
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top text-[#4a4238]">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="relative mx-auto hidden min-h-[200px] w-full max-w-[200px] lg:block">
          <Image src="/images/undraw_mindfulness_d853.svg" alt="Mindfulness visual" fill className="object-contain opacity-[0.85]" sizes="200px" />
        </div>
      </div>
    </section>
  );
}

export function InsightsSection() {
  return (
    <section className="border-t border-[#d9cab4] pt-10" aria-labelledby="insights">
      <div className="flex flex-wrap items-start gap-4">
        <Clock className="mt-1 h-5 w-5 shrink-0 text-[#b5a99a]" aria-hidden />
        <div>
          <h2 id="insights" className="text-lg font-semibold text-[#2f2117]">
            Synthesis · this week
          </h2>
          <ul className="mt-4 space-y-4 text-sm leading-relaxed text-[#5c5349]">
            {weeklyInsightBullets.map((b) => (
              <li key={b} className="max-w-3xl border-l border-[#cfc0ae] pl-5">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
