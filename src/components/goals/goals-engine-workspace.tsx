"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle2,
  Circle,
  GitBranch,
  Medal,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { goals } from "@/lib/data";
import { cn } from "@/lib/utils";

type QuarterPlan = {
  id: "Q1" | "Q2" | "Q3" | "Q4";
  theme: string;
  deadline: string;
  milestones: Array<{ label: string; due: string; done: boolean }>;
};

const quarterPlan: QuarterPlan[] = [
  {
    id: "Q1",
    theme: "Stabilize execution systems",
    deadline: "Mar 31",
    milestones: [
      { label: "Finalize annual operating thesis", due: "Jan 18", done: true },
      { label: "Install weekly review cadence", due: "Feb 05", done: true },
      { label: "Close 2 process bottlenecks", due: "Mar 12", done: false },
    ],
  },
  {
    id: "Q2",
    theme: "Pilot growth and retention engine",
    deadline: "Jun 30",
    milestones: [
      { label: "Onboard 50 active pilots", due: "Apr 24", done: false },
      { label: "Ship behavior dashboard v1", due: "May 09", done: false },
      { label: "Document retention loops", due: "Jun 20", done: false },
    ],
  },
  {
    id: "Q3",
    theme: "Scale distribution channels",
    deadline: "Sep 30",
    milestones: [
      { label: "Launch partner referral model", due: "Jul 15", done: false },
      { label: "Codify growth playbook", due: "Aug 22", done: false },
      { label: "Improve paid conversion +20%", due: "Sep 24", done: false },
    ],
  },
  {
    id: "Q4",
    theme: "Consolidate long-term moat",
    deadline: "Dec 31",
    milestones: [
      { label: "Publish annual operating review", due: "Oct 30", done: false },
      { label: "Lock 2027 strategy map", due: "Nov 26", done: false },
      { label: "Team systems hardening sprint", due: "Dec 18", done: false },
    ],
  },
];

const activeCategories = ["Career", "Health", "Wealth", "Relationships", "Systems"] as const;

const weeklyChecks = [
  { week: "Wk 14", committed: 8, completed: 7, score: 88 },
  { week: "Wk 15", committed: 9, completed: 6, score: 74 },
  { week: "Wk 16", committed: 10, completed: 8, score: 83 },
  { week: "Wk 17", committed: 7, completed: 7, score: 100 },
] as const;

const stalledGoals = [
  {
    goal: "Retention dashboard launch",
    blockedBy: "Data schema drift",
    daysStalled: 9,
    severity: "high" as const,
  },
  {
    goal: "Morning energy consistency",
    blockedBy: "Late-evening schedule creep",
    daysStalled: 6,
    severity: "medium" as const,
  },
];

const achievements = [
  { title: "Completed 4 consecutive weekly reviews", when: "Last Friday" },
  { title: "Shipped pilot onboarding v0.9", when: "Apr 16" },
  { title: "Hit 82% habit consistency for execution system", when: "Apr 11" },
] as const;

const dependencyChains = [
  {
    chain: "User interviews -> Insight synthesis -> Product priorities -> Weekly ship targets",
    status: "healthy",
  },
  {
    chain: "Sleep discipline -> Morning focus blocks -> Output quality -> Retention improvements",
    status: "at-risk",
  },
  {
    chain: "Cashflow runway -> Hiring confidence -> Feature throughput -> Growth leverage",
    status: "watch",
  },
] as const;

function average(values: number[]) {
  return Math.round(values.reduce((acc, v) => acc + v, 0) / values.length);
}

export function GoalsEngineWorkspace() {
  const [accountabilityWeight, setAccountabilityWeight] = useState(55);
  const [consistencyWeight, setConsistencyWeight] = useState(45);

  const annualProgress = Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length);
  const completedMilestones = quarterPlan.flatMap((q) => q.milestones).filter((m) => m.done).length;
  const totalMilestones = quarterPlan.flatMap((q) => q.milestones).length;
  const weeklyAvg = average(weeklyChecks.map((w) => w.score));

  const momentumScore = useMemo(() => {
    const weighted = weeklyAvg * (accountabilityWeight / 100) + annualProgress * (consistencyWeight / 100);
    const stallPenalty = stalledGoals.reduce((acc, s) => acc + (s.severity === "high" ? 6 : 3), 0);
    return Math.max(0, Math.round(weighted - stallPenalty));
  }, [weeklyAvg, annualProgress, accountabilityWeight, consistencyWeight]);

  const nextBestActions = useMemo(
    () => [
      `Protect one no-meeting morning on Tuesday to unblock "${stalledGoals[0]?.goal}".`,
      "Move one milestone from Q2 into a fixed calendar slot with owner + evidence of done.",
      "Run Friday review using dependency chain #2 as the agenda to reduce hidden drag.",
    ],
    [],
  );

  return (
    <div className="space-y-10 pb-10 text-[#2f2117]">
      <header className="rounded-none border border-[#cfbca4] bg-gradient-to-b from-[#f8f1e6] to-[#f0e3d2] px-4 py-5 sm:px-5">
        <div className="grid gap-4 border border-[#cfbca4] bg-[#fdf9f3] p-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7862]">Goals Engine</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Strategic growth operating system</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#5f4733]">
              Annual vision converted into quarterly milestones, habit systems, dependency maps, and accountable weekly
              execution.
            </p>
          </div>
          <div className="relative h-28">
            <Image src="/images/undraw_goals_dwgr.svg" alt="Goals roadmap visual" fill className="object-contain" sizes="220px" />
          </div>
        </div>

        <div className="mt-4 grid divide-y divide-[#cfc0ae] border border-[#cfc0ae] bg-[#fdf9f3] md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Annual vision</p>
            <p className="mt-2 text-sm font-medium text-[#2f2117]">
              Build a resilient life-company system that compounds impact, health, and optionality.
            </p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Progress</p>
            <p className="mt-1 text-3xl font-light tabular-nums text-[#1f1610]">{annualProgress}%</p>
            <div className="mt-2 h-1.5 bg-[#e8dcc9]">
              <div className="h-full bg-[#5a3d2b]" style={{ width: `${annualProgress}%` }} />
            </div>
            <p className="mt-2 text-xs text-[#6f5641]">
              {completedMilestones}/{totalMilestones} milestone checkpoints closed
            </p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Active categories</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {activeCategories.map((cat) => (
                <span key={cat} className="rounded-none border border-[#cfbca4] bg-[#f3e8d9] px-2 py-1 text-xs text-[#5f4733]">
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="roadmap">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="roadmap" className="text-lg font-semibold tracking-tight">
            Yearly roadmap timeline
          </h2>
          <p className="mt-1 text-sm text-[#6f5641]">Four-quarter view with deadlines, milestone states, and delivery intent.</p>
        </div>
        <div className="overflow-x-auto px-4 py-5 sm:px-5">
          <div className="grid min-w-[820px] gap-3 lg:grid-cols-4">
            {quarterPlan.map((quarter) => (
              <article key={quarter.id} className="rounded-none border border-[#cfbca4] bg-[#fdf9f3]">
                <div className="border-b border-[#e8dcc9] bg-[#efe3d2] px-3 py-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8f7862]">{quarter.id}</p>
                  <p className="mt-0.5 text-sm font-medium text-[#2f2117]">{quarter.theme}</p>
                  <p className="mt-1 font-mono text-[11px] text-[#6f5641]">Deadline: {quarter.deadline}</p>
                </div>
                <ul className="space-y-0 divide-y divide-[#e8dcc9]">
                  {quarter.milestones.map((m) => (
                    <li key={m.label} className="px-3 py-2.5">
                      <div className="flex items-start gap-2">
                        {m.done ? (
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#6b8f5e]" aria-hidden />
                        ) : (
                          <Circle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b7a48f]" aria-hidden />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm leading-snug text-[#4f3928]">{m.label}</p>
                          <p className="mt-1 font-mono text-[11px] text-[#8f7862]">{m.due}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-7" aria-labelledby="habit-board">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="habit-board" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Habit systems board
            </h2>
            <p className="mt-1 text-sm text-[#6f5641]">Kanban lanes tied to long-term outcomes.</p>
          </div>
          <div className="grid gap-0 md:grid-cols-3 md:divide-x md:divide-[#cfc0ae]">
            {[
              {
                lane: "Foundation",
                items: ["Sleep by 23:00", "Sunday weekly planning", "Morning hydration + light"],
              },
              {
                lane: "Execution",
                items: ["2 maker blocks/day", "1 interview/day", "Daily milestone check"],
              },
              {
                lane: "Leverage",
                items: ["Friday synthesis memo", "Partner outreach batch", "Metrics review with decisions"],
              },
            ].map((col) => (
              <div key={col.lane} className="border-t border-[#cfc0ae] px-4 py-4 first:border-t-0 md:border-t-0 sm:px-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7f6651]">{col.lane}</p>
                <ul className="mt-3 space-y-2">
                  {col.items.map((item) => (
                    <li key={item} className="rounded-none border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2 text-sm text-[#4f3928]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f1e4d2] lg:col-span-5" aria-labelledby="weekly-accountability">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="weekly-accountability" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Weekly accountability tracker
            </h2>
            <p className="mt-1 text-xs text-[#6f5641]">Commitments vs completions with execution score trend.</p>
          </div>
          <div className="overflow-x-auto px-4 py-4 sm:px-5">
            <table className="w-full min-w-[360px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#cfc0ae] text-[11px] uppercase tracking-[0.1em] text-[#8f7862]">
                  <th className="py-2 font-medium">Week</th>
                  <th className="py-2 font-medium text-center">Committed</th>
                  <th className="py-2 font-medium text-center">Done</th>
                  <th className="py-2 font-medium text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {weeklyChecks.map((row) => (
                  <tr key={row.week} className="border-b border-[#e8dcc9] last:border-b-0">
                    <td className="py-2.5 font-mono text-xs text-[#6f5641]">{row.week}</td>
                    <td className="py-2.5 text-center tabular-nums text-[#4f3928]">{row.committed}</td>
                    <td className="py-2.5 text-center tabular-nums text-[#4f3928]">{row.completed}</td>
                    <td className="py-2.5 text-right tabular-nums font-medium text-[#2f2117]">{row.score}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-[#cfc0ae] px-4 py-3 sm:px-5">
            <p className="text-xs text-[#6f5641]">
              4-week average accountability: <strong className="text-[#2f2117]">{weeklyAvg}%</strong>
            </p>
          </div>
        </section>
      </div>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-4" aria-labelledby="stalled-goals">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="stalled-goals" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Stalled goal alerts
            </h2>
          </div>
          <ul className="divide-y divide-[#e8dcc9]">
            {stalledGoals.map((s) => (
              <li key={s.goal} className="px-4 py-3 sm:px-5">
                <div className="flex items-start gap-2">
                  <AlertTriangle
                    className={cn("mt-0.5 h-4 w-4 shrink-0", s.severity === "high" ? "text-[#9a6b5a]" : "text-[#b58a64]")}
                    aria-hidden
                  />
                  <div>
                    <p className="text-sm font-medium text-[#2f2117]">{s.goal}</p>
                    <p className="mt-1 text-xs text-[#6f5641]">{s.blockedBy}</p>
                    <p className="mt-1 font-mono text-[11px] text-[#8f7862]">{s.daysStalled} days stalled</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#f3e8d9] lg:col-span-4" aria-labelledby="momentum">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="momentum" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Momentum score
            </h2>
          </div>
          <div className="space-y-4 px-4 py-4 sm:px-5">
            <div className="flex items-end gap-2">
              <TrendingUp className="h-5 w-5 text-[#5a3d2b]" aria-hidden />
              <p className="text-4xl font-light tabular-nums text-[#1f1610]">{momentumScore}</p>
              <p className="pb-1 text-xs text-[#8f7862]">/ 100</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-[#8f7862]">Weighting controls</p>
              <label className="mt-2 block text-xs text-[#6f5641]">Accountability ({accountabilityWeight}%)</label>
              <input
                type="range"
                min={20}
                max={80}
                value={accountabilityWeight}
                onChange={(e) => setAccountabilityWeight(Number(e.target.value))}
                className="mt-1 w-full accent-[#5a3d2b]"
              />
              <label className="mt-2 block text-xs text-[#6f5641]">Consistency ({consistencyWeight}%)</label>
              <input
                type="range"
                min={20}
                max={80}
                value={consistencyWeight}
                onChange={(e) => setConsistencyWeight(Number(e.target.value))}
                className="mt-1 w-full accent-[#5a3d2b]"
              />
            </div>
            <p className="text-xs leading-relaxed text-[#6f5641]">
              Score blends weekly accountability, annual progress consistency, and stall penalties.
            </p>
          </div>
        </section>

        <section className="bg-[#f1e4d2] lg:col-span-4" aria-labelledby="achievements">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="achievements" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Celebration strip
            </h2>
          </div>
          <ul className="divide-y divide-[#e8dcc9]">
            {achievements.map((item) => (
              <li key={item.title} className="flex items-start gap-2 px-4 py-3 sm:px-5">
                <Medal className="mt-0.5 h-4 w-4 shrink-0 text-[#7f6651]" aria-hidden />
                <div>
                  <p className="text-sm text-[#4f3928]">{item.title}</p>
                  <p className="mt-1 font-mono text-[11px] text-[#8f7862]">{item.when}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-7" aria-labelledby="dependencies">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="dependencies" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Dependency chains
            </h2>
            <p className="mt-1 text-sm text-[#6f5641]">Critical sequence mapping across goals and systems.</p>
          </div>
          <ul className="divide-y divide-[#e8dcc9]">
            {dependencyChains.map((dep) => (
              <li key={dep.chain} className="flex items-start gap-2 px-4 py-3 sm:px-5">
                <GitBranch className="mt-0.5 h-4 w-4 shrink-0 text-[#7f6651]" aria-hidden />
                <div className="min-w-0">
                  <p className="text-sm leading-relaxed text-[#4f3928]">{dep.chain}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.08em] text-[#8f7862]">Status: {dep.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#ebe0d0] lg:col-span-5" aria-labelledby="ai-actions">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="ai-actions" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#5f4733]">
              <Sparkles className="h-4 w-4 text-[#5a3d2b]" aria-hidden />
              AI next best actions
            </h2>
          </div>
          <ol className="space-y-3 px-4 py-4 sm:px-5">
            {nextBestActions.map((action, idx) => (
              <li key={action} className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2.5 text-sm text-[#4f3928]">
                <span className="mr-2 font-mono text-xs text-[#8f7862]">{String(idx + 1).padStart(2, "0")}.</span>
                {action}
              </li>
            ))}
          </ol>
          <div className="border-t border-[#cfc0ae] px-4 py-3 sm:px-5">
            <p className="text-xs leading-relaxed text-[#6f5641]">
              Suggestions prioritize stalled-goal recovery with highest downstream leverage.
            </p>
          </div>
        </section>
      </div>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="analytics">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="analytics" className="text-lg font-semibold tracking-tight">
            Progress analytics
          </h2>
          <p className="mt-1 text-sm text-[#6f5641]">Goal-level rails show compounding pace and current execution health.</p>
        </div>
        <div className="space-y-0 divide-y divide-[#e8dcc9]">
          {goals.map((goal) => (
            <div key={goal.id} className="px-4 py-4 sm:px-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-[#2f2117]">{goal.title}</p>
                <p className="font-mono text-xs text-[#8f7862]">{goal.progress}%</p>
              </div>
              <div className="mt-2 h-2 bg-[#e8dcc9]">
                <div className="h-full bg-[#5a3d2b]" style={{ width: `${goal.progress}%` }} />
              </div>
              <p className="mt-2 text-xs text-[#6f5641]">{goal.milestone}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
