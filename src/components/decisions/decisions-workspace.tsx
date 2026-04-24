"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  GitBranch,
  Layers,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { decisionOptions, upcomingDecisions } from "@/lib/data";
import type { DecisionOption } from "@/types/lifeos";
import { cn } from "@/lib/utils";

const OPTION_D: DecisionOption = {
  name: "Option D: Pause + 90-day discovery",
  impact: 56,
  effort: 38,
  confidence: 86,
  pros: ["Irreversible commitments delayed", "Cleaner signal from experiments", "Lower coordination tax now"],
  cons: ["Window risk if competitors move", "Momentum cost", "Stakeholder impatience"],
};

const CRITERIA = [
  { id: "money", label: "Money & security" },
  { id: "growth", label: "Career growth" },
  { id: "happiness", label: "Happiness & fit" },
  { id: "time", label: "Time freedom" },
  { id: "risk", label: "Risk / reversibility" },
  { id: "learning", label: "Learning & skills" },
] as const;

type CriterionId = (typeof CRITERIA)[number]["id"];
type Scenario = "best" | "realistic" | "worst";

const SCENARIO_FACTORS: Record<Scenario, Record<CriterionId, number>> = {
  best: {
    money: 1.06,
    growth: 1.12,
    happiness: 1.08,
    time: 1.1,
    risk: 1.05,
    learning: 1.14,
  },
  realistic: {
    money: 1,
    growth: 1,
    happiness: 1,
    time: 1,
    risk: 1,
    learning: 1,
  },
  worst: {
    money: 0.9,
    growth: 0.88,
    happiness: 0.92,
    time: 0.85,
    risk: 0.82,
    learning: 0.9,
  },
};

const TIMELINE = [
  {
    when: "Mar 2026",
    title: "Chose advisory-heavy mix over full-time offer",
    outcome: "Cashflow stable; missed one internal promotion cycle — learned to price retainers higher upfront.",
  },
  {
    when: "Nov 2025",
    title: "Declined cross-country relocation",
    outcome: "Preserved family rhythm; accepted slower title path — reframed “growth” as craft depth, not geography.",
  },
  {
    when: "Jul 2025",
    title: "Exited side project partnership",
    outcome: "Freed 8h/week; emotional load dropped within two weeks — now use written exit criteria before joining.",
  },
  {
    when: "Feb 2025",
    title: "Committed to morning focus block policy",
    outcome: "Decision quality up; fewer reactive pivots — evidence that time freedom scores were underweighted before.",
  },
] as const;

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}

function seedScores(opts: DecisionOption[]): number[][] {
  return opts.map((o) => [
    clamp(0, 100, Math.round(o.impact * 0.9 + 6)),
    clamp(0, 100, Math.round(o.impact * 1.02)),
    clamp(0, 100, Math.round(92 - o.effort * 0.55)),
    clamp(0, 100, Math.round(96 - o.effort * 0.82)),
    clamp(0, 100, Math.round(o.confidence * 0.9)),
    clamp(0, 100, Math.round((o.impact + (100 - o.effort)) * 0.52)),
  ]);
}

function normalize(raw: number[]): number[] {
  const s = raw.reduce((a, b) => a + b, 0) || 1;
  return raw.map((w) => w / s);
}

export function DecisionsWorkspace() {
  const allOptions = useMemo(() => [...decisionOptions, OPTION_D], []);
  const [optionCount, setOptionCount] = useState<2 | 3 | 4>(3);
  const [scores, setScores] = useState<number[][]>(() => seedScores(allOptions));
  const [rawWeights, setRawWeights] = useState<number[]>(() => CRITERIA.map(() => 100));
  const [scenario, setScenario] = useState<Scenario>("realistic");
  const [notes, setNotes] = useState(
    "Assumptions: offer A remains open through month-end. If B’s retainer renews at +15%, re-run money weighting.",
  );

  const visibleIndices = useMemo(() => Array.from({ length: optionCount }, (_, i) => i), [optionCount]);
  const visibleOptions = visibleIndices.map((i) => allOptions[i]!);
  const weights = useMemo(() => normalize(rawWeights), [rawWeights]);

  const factors = SCENARIO_FACTORS[scenario];

  const adjustedScores = useMemo(
    () =>
      scores.map((row) =>
        CRITERIA.map((c, j) => clamp(0, 100, Math.round(row[j]! * factors[c.id]))),
      ),
    [scores, factors],
  );

  const totals = useMemo(() => {
    return visibleIndices.map((oi) =>
      CRITERIA.reduce((acc, _, ci) => acc + weights[ci]! * adjustedScores[oi]![ci]!, 0),
    );
  }, [visibleIndices, weights, adjustedScores]);

  const ranking = useMemo(() => {
    const indexed = totals.map((t, vi) => ({ t, oi: visibleIndices[vi]! }));
    indexed.sort((a, b) => b.t - a.t);
    return indexed;
  }, [totals, visibleIndices]);

  const leaderIdx = ranking[0]?.oi ?? 0;
  const runnerTotal = ranking[1]?.t ?? ranking[0]?.t ?? 0;
  const margin = (ranking[0]?.t ?? 0) - runnerTotal;

  const confidencePct = useMemo(() => {
    if (totals.length < 2) return 72;
    const sorted = [...totals].sort((a, b) => b - a);
    const gap = sorted[0]! - sorted[1]!;
    return clamp(38, 96, Math.round(48 + gap * 1.85));
  }, [totals]);

  const setWeight = useCallback((criterionIndex: number, value: number) => {
    setRawWeights((prev) => {
      const n = [...prev];
      n[criterionIndex] = clamp(4, 100, value);
      return n;
    });
  }, []);

  const setScoreCell = useCallback((optionIndex: number, criterionIndex: number, value: number) => {
    setScores((prev) => {
      const next = prev.map((r) => [...r]);
      if (!next[optionIndex]) return prev;
      next[optionIndex]![criterionIndex] = clamp(0, 100, value);
      return next;
    });
  }, []);

  const aiBrief = useMemo(() => {
    const lead = allOptions[leaderIdx]?.name ?? "";
    const topCriterion = CRITERIA.reduce(
      (best, c, i) => {
        const contrib = visibleIndices.map((oi) => weights[i]! * adjustedScores[oi]![i]!);
        const spread = Math.max(...contrib) - Math.min(...contrib);
        return spread > best.spread ? { id: c.id, label: c.label, spread } : best;
      },
      { id: "" as string, label: "", spread: -1 },
    );
    return {
      lead,
      topCriterion: topCriterion.label || "Money & security",
      margin: margin.toFixed(1),
    };
  }, [allOptions, leaderIdx, visibleIndices, weights, adjustedScores, margin]);

  const maxTotal = Math.max(...totals, 1);

  return (
    <div className="space-y-10 pb-10 text-[#2f2117]">
      {/* —— Command strip —— */}
      <header className="rounded-none border border-[#cfbca4] bg-gradient-to-b from-[#f8f1e6] to-[#f1e6d8] px-4 py-4 sm:px-5">
        <div className="grid gap-4 border border-[#cfbca4] bg-[#fdf9f3] p-4 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8f7862]">Decisions Lab</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Life &amp; career decision workspace
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5f4733]">
              Weight what matters, score each path honestly, and stress-test the narrative before you commit.
            </p>
          </div>
          <div className="space-y-2">
            <div className="relative h-24">
              <Image src="/images/undraw_thought-process_ze2r.svg" alt="Decision modeling visual" fill className="object-contain" sizes="220px" />
            </div>
          </div>
        </div>

        {/* Summary metrics — single instrument panel, not cards */}
        <div className="mt-6 grid divide-y divide-[#cfc0ae] border border-[#cfc0ae] bg-[#fdf9f3] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex flex-col gap-1 px-4 py-4 sm:px-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8f7862]">Active decisions</span>
            <span className="text-3xl font-light tabular-nums text-[#1f1610]">{upcomingDecisions.length}</span>
            <span className="text-xs text-[#6f5641]">Open threads requiring a dated choice</span>
          </div>
          <div className="flex flex-col gap-1 px-4 py-4 sm:px-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8f7862]">Model confidence</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light tabular-nums text-[#1f1610]">{confidencePct}</span>
              <span className="text-sm text-[#8f7862]">/ 100</span>
            </div>
            <div className="h-1.5 w-full max-w-[200px] bg-[#e8dcc9]">
              <div
                className="h-full bg-[#5a3d2b] transition-[width] duration-300"
                style={{ width: `${confidencePct}%` }}
              />
            </div>
            <span className="text-xs text-[#6f5641]">Rises when weighted totals separate cleanly</span>
          </div>
          <div className="flex flex-col gap-2 px-4 py-4 sm:px-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8f7862]">Next deadline</span>
            <div className="flex items-start gap-2">
              <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-[#7f6651]" aria-hidden />
              <div>
                <p className="text-sm font-medium text-[#2f2117]">{upcomingDecisions[0]?.title}</p>
                <p className="mt-0.5 font-mono text-xs text-[#6f5641]">{upcomingDecisions[0]?.due}</p>
              </div>
            </div>
            <ul className="mt-1 space-y-1 border-t border-[#e8dcc9] pt-2 text-xs text-[#6f5641]">
              {upcomingDecisions.slice(1, 3).map((u) => (
                <li key={u.title} className="flex justify-between gap-2">
                  <span className="line-clamp-1">{u.title}</span>
                  <span className="shrink-0 font-mono text-[#8f7862]">{u.due}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* —— Comparison engine —— */}
      <section aria-labelledby="compare-heading" className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]">
        <div className="flex flex-col gap-4 border-b border-[#cfc0ae] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <h2 id="compare-heading" className="text-lg font-semibold tracking-tight">
              Comparison engine
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-[#6f5641]">
              Compare {optionCount} paths on six weighted criteria. Sliders update totals and the recommendation strip
              in real time.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-[#7f6651]" aria-hidden />
            <span className="text-xs text-[#8f7862]">Options</span>
            {([2, 3, 4] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setOptionCount(n)}
                className={cn(
                  "rounded-none border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors",
                  optionCount === n
                    ? "border-[#5a3d2b] bg-[#5a3d2b] text-[#f9f4ea]"
                    : "border-[#cfbca4] bg-[#fdf9f3] text-[#6f5641] hover:border-[#5a3d2b]/40",
                )}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario strip */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#cfc0ae] bg-[#f3eadc] px-4 py-3 sm:px-5">
          <GitBranch className="h-4 w-4 text-[#7f6651]" aria-hidden />
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Scenario lens</span>
          {(
            [
              { id: "best" as const, label: "Best case" },
              { id: "realistic" as const, label: "Realistic" },
              { id: "worst" as const, label: "Worst case" },
            ] as const
          ).map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setScenario(id)}
              className={cn(
                "rounded-none border px-3 py-1 text-xs font-medium transition-colors",
                scenario === id
                  ? "border-[#5a3d2b] bg-[#5a3d2b] text-[#f9f4ea]"
                  : "border-transparent bg-transparent text-[#5f4733] hover:bg-[#e8dcc9]/80",
              )}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto hidden text-xs text-[#8f7862] sm:inline">
            Adjusts effective scores — totals below reflect this lens.
          </span>
        </div>

        {/* Decision summary rail */}
        <div className="grid gap-px border-b border-[#cfc0ae] bg-[#cfc0ae] sm:grid-cols-3">
          <div className="bg-[#fdf9f3] px-4 py-3 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Current leader</p>
            <p className="mt-1 line-clamp-2 text-sm font-medium text-[#2f2117]">{allOptions[leaderIdx]?.name}</p>
          </div>
          <div className="bg-[#fdf9f3] px-4 py-3 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Confidence signal</p>
            <p className="mt-1 text-sm text-[#5f4733]">
              {confidencePct >= 75 ? "High separation between top options" : "Moderate separation — validate assumptions"}
            </p>
          </div>
          <div className="bg-[#fdf9f3] px-4 py-3 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Margin vs #2</p>
            <p className="mt-1 font-mono text-sm text-[#2f2117]">+{margin.toFixed(1)} weighted points</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#cfc0ae] bg-[#efe3d2] text-left text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8f7862]">
                <th className="sticky left-0 z-10 w-[220px] border-r border-[#d9cab4] bg-[#efe3d2] px-3 py-3 pl-4 sm:pl-5">Criterion</th>
                {visibleIndices.map((oi) => (
                  <th key={oi} className="min-w-[140px] px-2 py-3">
                    <span className="line-clamp-2 font-medium normal-case tracking-normal text-[#2f2117]">
                      {allOptions[oi]?.name.replace(/^Option [A-D]: /, "")}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CRITERIA.map((c, ci) => (
                <tr key={c.id} className={cn("border-b border-[#e8dcc9]", ci % 2 === 0 ? "bg-[#fdf9f3]" : "bg-[#faf4ea]")}>
                  <td className="sticky left-0 z-[1] align-top border-r border-[#eadfce] bg-inherit px-3 py-3 pl-4 sm:pl-5">
                    <p className="font-medium text-[#2f2117]">{c.label}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wide text-[#a39a8f]">Importance</p>
                    <div className="mt-2 h-2 w-full max-w-[180px] border border-[#d9cab4] bg-[#efe4d4]">
                      <div className="h-full bg-[#5a3d2b]" style={{ width: `${Math.min(100, Math.max(0, rawWeights[ci]!))}%` }} />
                    </div>
                    <p className="mt-1 font-mono text-xs tabular-nums text-[#6f5641]">
                      {(weights[ci]! * 100).toFixed(0)}% of total weight
                    </p>
                  </td>
                  {visibleIndices.map((oi) => (
                    <td key={`${oi}-${c.id}`} className="align-top px-2 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs tabular-nums text-[#2f2117]">
                          {adjustedScores[oi]![ci]}
                        </span>
                        <div className="h-2 w-full border border-[#d9cab4] bg-[#efe4d4]">
                          <div
                            className={cn("h-full", oi === leaderIdx ? "bg-[#5a3d2b]" : "bg-[#a89882]")}
                            style={{ width: `${Math.min(100, Math.max(0, adjustedScores[oi]![ci]!))}%` }}
                            aria-label={`${allOptions[oi]?.name} — ${c.label}`}
                          />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="bg-[#ebe0d0]">
                <td className="sticky left-0 z-[1] border-r border-[#d9cab4] bg-[#ebe0d0] px-3 py-4 pl-4 font-semibold sm:pl-5">Weighted total</td>
                {visibleIndices.map((oi, vi) => {
                  const t = totals[vi]!;
                  const isLead = oi === leaderIdx;
                  return (
                    <td key={oi} className="px-2 py-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-semibold tabular-nums text-[#1f1610]">{t.toFixed(1)}</span>
                          {isLead ? (
                            <span className="inline-flex items-center gap-1 border border-[#5a3d2b] bg-[#5a3d2b] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#f9f4ea]">
                              <TrendingUp className="h-3 w-3" aria-hidden />
                              Lead
                            </span>
                          ) : null}
                        </div>
                        <div className="h-2 bg-[#d9cab4]">
                          <div
                            className={cn(
                              "h-full transition-[width] duration-300",
                              isLead ? "bg-[#5a3d2b]" : "bg-[#a89882]",
                            )}
                            style={{ width: `${(t / maxTotal) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#cfc0ae] bg-[#f3eadc] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-center gap-2 text-sm text-[#5f4733]">
            <Target className="h-4 w-4 shrink-0 text-[#5a3d2b]" aria-hidden />
            <span>
              <strong className="font-semibold text-[#2f2117]">Recommendation:</strong>{" "}
              <span className="text-[#3d2a1c]">{allOptions[leaderIdx]?.name}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#6f5641]">
            <span>Margin vs #2:</span>
            <span className="font-semibold text-[#2f2117]">+{margin.toFixed(1)}</span>
            <ArrowRight className="h-3.5 w-3.5 text-[#8f7862]" aria-hidden />
          </div>
        </div>
      </section>

      {/* —— Evidence + notes + AI —— */}
      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        {/* Pros / cons board */}
        <div className="bg-[#f8f1e6] lg:col-span-7">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Evidence board</h2>
            <p className="mt-1 text-sm text-[#6f5641]">Pros and constraints — one row per option.</p>
          </div>
          <div className="divide-y divide-[#cfc0ae]">
            {visibleOptions.map((opt, vi) => (
              <div key={opt.name} className="grid md:grid-cols-2">
                <div className="border-[#cfc0ae] md:border-r">
                  <div className="flex items-center gap-2 border-b border-[#e8dcc9] bg-[#fdf9f3] px-4 py-2 sm:px-5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#5a6b4e]" aria-hidden />
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6b8f5e]">Supporting</span>
                  </div>
                  <div className="px-4 py-4 sm:px-5">
                    <p className="text-sm font-semibold text-[#2f2117]">{opt.name}</p>
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-[#5f4733]">
                      {opt.pros.map((p) => (
                        <li key={p} className="flex gap-2">
                          <span className="font-mono text-[#8f7862]">+</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 border-b border-[#e8dcc9] bg-[#fdf9f3] px-4 py-2 sm:px-5">
                    <AlertTriangle className="h-3.5 w-3.5 text-[#9a6b5a]" aria-hidden />
                    <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9a6b5a]">Constraints</span>
                  </div>
                  <div className="px-4 py-4 sm:px-5">
                    <ul className="space-y-2 text-sm leading-relaxed text-[#5f4733]">
                      {opt.cons.map((c) => (
                        <li key={c} className="flex gap-2">
                          <span className="font-mono text-[#8f7862]">–</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notes + AI column */}
        <div className="flex flex-col bg-[#f1e4d2] lg:col-span-5">
          <div className="flex flex-1 flex-col border-b border-[#cfc0ae]">
            <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Decision notes</h2>
              <p className="mt-1 text-xs text-[#6f5641]">Capture assumptions, people to align, and kill criteria.</p>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
              className="min-h-[180px] flex-1 resize-y border-0 bg-transparent px-4 py-3 text-sm leading-relaxed text-[#2f2117] outline-none placeholder:text-[#a89882] sm:px-5"
              placeholder="What would make you reverse this decision in 30 days?"
              spellCheck
            />
            <div className="border-t border-[#cfc0ae] px-4 py-2 font-mono text-[10px] text-[#8f7862] sm:px-5">
              {notes.length} characters · local draft
            </div>
          </div>

          <div className="bg-[#ebe0d0] px-4 py-4 sm:px-5">
            <div className="flex items-center gap-2 border-b border-[#cfc0ae] pb-3">
              <Sparkles className="h-4 w-4 text-[#5a3d2b]" aria-hidden />
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#5f4733]">AI recommendation</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#3d2a1c]">
              With your current weights, <strong>{aiBrief.lead}</strong> leads the model by{" "}
              <strong>{aiBrief.margin}</strong> weighted points. The largest swing dimension is{" "}
              <strong>{aiBrief.topCriterion}</strong> — if that criterion is wrong by even one notch, rerun the matrix
              with a peer review on that row only.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-[#6f5641]">
              Active lens:{" "}
              <strong className="text-[#2f2117]">
                {scenario === "best" ? "Best case" : scenario === "worst" ? "Worst case" : "Realistic"}
              </strong>{" "}
              adjusts effective scores; use realistic before sharing externally.
            </p>
          </div>
        </div>
      </div>

      {/* —— Scenario simulator detail —— */}
      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="scenario-detail">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="scenario-detail" className="text-lg font-semibold tracking-tight">
            Scenario simulator
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-[#6f5641]">
            Three futures expressed as operating assumptions — not predictions. Use them to test whether your choice
            survives bad luck.
          </p>
        </div>
        <div className="grid divide-y divide-[#cfc0ae] md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-4 py-5 sm:px-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#6b8f5e]">Best case</p>
            <p className="mt-3 text-sm leading-relaxed text-[#5f4733]">
              Markets hold, key relationships stay warm, and you protect deep-work blocks. Learning and growth criteria
              outperform; money follows with a quarter lag.
            </p>
            <ul className="mt-4 space-y-2 border-t border-[#e8dcc9] pt-3 text-xs text-[#6f5641]">
              <li>· Title / rate trajectory stays favorable</li>
              <li>· Health and family bandwidth unchanged</li>
            </ul>
          </div>
          <div className="bg-[#fdf9f3] px-4 py-5 sm:px-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8f7862]">Realistic</p>
            <p className="mt-3 text-sm leading-relaxed text-[#5f4733]">
              Mixed execution: one major distraction, moderate fatigue, one negotiation harder than expected. The
              weighted leader today ({allOptions[leaderIdx]?.name}) still clears if you enforce boundaries.
            </p>
            <ul className="mt-4 space-y-2 border-t border-[#e8dcc9] pt-3 text-xs text-[#6f5641]">
              <li>· 10–15% schedule slippage on non-critical work</li>
              <li>· One dependency outside your control delays upside</li>
            </ul>
          </div>
          <div className="px-4 py-5 sm:px-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9a6b5a]">Worst case</p>
            <p className="mt-3 text-sm leading-relaxed text-[#5f4733]">
              Demand softens or politics intensify; time and happiness scores compress first. If the gap to #2
              collapses under this lens, your decision is too fragile — add reversibility or a staged bet.
            </p>
            <ul className="mt-4 space-y-2 border-t border-[#e8dcc9] pt-3 text-xs text-[#6f5641]">
              <li>· Revenue or political shock within 90 days</li>
              <li>· Personal energy budget −20% sustained</li>
            </ul>
          </div>
        </div>
      </section>

      {/* —— Timeline —— */}
      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="timeline-h">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="timeline-h" className="text-lg font-semibold tracking-tight">
            Decision timeline
          </h2>
          <p className="mt-1 text-sm text-[#6f5641]">Past choices and the lesson carried forward — compressed audit log.</p>
        </div>
        <div className="px-4 py-6 sm:px-6">
          <ol className="relative space-y-0 border-l-2 border-[#5a3d2b] pl-7">
            {TIMELINE.map((item) => (
              <li key={item.title} className="relative pb-10 pl-2 last:pb-0">
                <span className="absolute left-0 top-1.5 flex h-3 w-3 -translate-x-1/2 items-center justify-center border-2 border-[#5a3d2b] bg-[#f8f1e6]" aria-hidden />
                <time className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">
                  {item.when}
                </time>
                <p className="mt-1 text-sm font-semibold text-[#2f2117]">{item.title}</p>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#5f4733]">{item.outcome}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
