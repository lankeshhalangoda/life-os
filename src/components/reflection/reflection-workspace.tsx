"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  BookOpenText,
  Brain,
  CalendarDays,
  Heart,
  Search,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { journalHistory } from "@/lib/data";
import { cn } from "@/lib/utils";

const moodSeries = [
  { day: "Mon", value: 54, label: "Tired" },
  { day: "Tue", value: 76, label: "Inspired" },
  { day: "Wed", value: 68, label: "Focused" },
  { day: "Thu", value: 73, label: "Calm" },
  { day: "Fri", value: 79, label: "Focused" },
  { day: "Sat", value: 71, label: "Calm" },
  { day: "Sun", value: 82, label: "Inspired" },
] as const;

const weeklySummaries = [
  {
    week: "Week 16",
    title: "Boundary clarity increased",
    body: "You said no earlier and protected morning depth. Entries moved from reactive narration to deliberate redesign.",
  },
  {
    week: "Week 15",
    title: "Evening fatigue still leaks",
    body: "Most blockers happened after 17:30. You identified this pattern, but end-of-day planning ritual was inconsistent.",
  },
  {
    week: "Week 14",
    title: "Confidence improved through writing",
    body: "Decision quality improved when options were written before conversation. Reflection turned uncertainty into action.",
  },
] as const;

const wisdom =
  "Between stimulus and response there is a space. In that space is our power to choose our response. In our response lies our growth and our freedom.";

const recurringThemes = [
  { theme: "Boundary drift after 4 PM", mentions: 9, trend: "down" },
  { theme: "Clarity from writing before speaking", mentions: 7, trend: "up" },
  { theme: "Sleep quality shapes emotional tone", mentions: 6, trend: "up" },
  { theme: "Overloading tomorrow's plan", mentions: 5, trend: "down" },
] as const;

type PromptField = "wins" | "lessons" | "gratitude" | "blockers" | "focus";

export function ReflectionWorkspace() {
  const [search, setSearch] = useState("");
  const [entry, setEntry] = useState<Record<PromptField, string>>({
    wins: "",
    lessons: "",
    gratitude: "",
    blockers: "",
    focus: "",
  });

  const streakDays = 13;
  const consistencyScore = 84;
  const moodTrend = useMemo(() => Math.round(moodSeries.reduce((acc, m) => acc + m.value, 0) / moodSeries.length), []);

  const filteredHistory = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return journalHistory;
    return journalHistory.filter((item) => {
      return `${item.date} ${item.mood} ${item.prompt}`.toLowerCase().includes(q);
    });
  }, [search]);

  const growthInsights = useMemo(
    () => [
      "Reflection consistency above 80% correlates with calmer evening entries and fewer carry-over tasks.",
      "When gratitude is specific, tomorrow focus statements become shorter and more executable.",
      "Naming one blocker and one redesign step predicts better next-day momentum than long narrative entries.",
    ],
    [],
  );

  const filledFields = Object.values(entry).filter((v) => v.trim().length > 0).length;
  const completionPct = Math.round((filledFields / 5) * 100);

  return (
    <div className="space-y-10 pb-10 text-[#2f2117]">
      <header className="rounded-none border border-[#cfbca4] bg-gradient-to-b from-[#f8f1e6] to-[#f0e3d2] px-4 py-5 sm:px-5">
        <div className="grid gap-4 border border-[#cfbca4] bg-[#fdf9f3] p-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7862]">Reflection Journal</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Self-awareness workspace</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#5f4733]">
              A beautiful thinking tool for learning patterns, refining behavior, and writing tomorrow with intention.
            </p>
          </div>
          <div className="relative h-28">
            <Image src="/images/undraw_mindfulness_d853.svg" alt="Reflection insights visual" fill className="object-contain" sizes="220px" />
          </div>
        </div>

        <div className="mt-4 grid divide-y divide-[#cfc0ae] border border-[#cfc0ae] bg-[#fdf9f3] md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Current streak</p>
            <p className="mt-1 text-3xl font-light tabular-nums text-[#1f1610]">{streakDays}d</p>
            <p className="mt-1 text-xs text-[#6f5641]">Consecutive reflection days</p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Mood trend</p>
            <div className="mt-1 flex items-baseline gap-2">
              <p className="text-3xl font-light tabular-nums text-[#1f1610]">{moodTrend}</p>
              <p className="text-xs text-[#8f7862]">/100 weekly average</p>
            </div>
            <p className="mt-1 text-xs text-[#6f5641]">Upward momentum with lower volatility</p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Consistency score</p>
            <p className="mt-1 text-3xl font-light tabular-nums text-[#1f1610]">{consistencyScore}</p>
            <div className="mt-2 h-1.5 bg-[#e8dcc9]">
              <div className="h-full bg-[#5a3d2b]" style={{ width: `${consistencyScore}%` }} />
            </div>
          </div>
        </div>
      </header>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="editor">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="editor" className="text-lg font-semibold tracking-tight">
            Today's reflection editor
          </h2>
          <p className="mt-1 text-sm text-[#6f5641]">Guided prompts for wins, lessons, gratitude, blockers, and tomorrow focus.</p>
        </div>
        <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
          <div className="bg-[#fdf9f3] px-4 py-5 lg:col-span-8 sm:px-5">
            <div className="space-y-4">
              {(
                [
                  { key: "wins", label: "Wins", placeholder: "What worked today that you want repeated?" },
                  { key: "lessons", label: "Lessons", placeholder: "What did today teach you about how you work?" },
                  { key: "gratitude", label: "Gratitude", placeholder: "What are you genuinely thankful for right now?" },
                  { key: "blockers", label: "Blockers", placeholder: "What created friction, and why?" },
                  { key: "focus", label: "Tomorrow focus", placeholder: "What are the 1-2 highest leverage priorities for tomorrow?" },
                ] as const
              ).map((row) => (
                <div key={row.key}>
                  <label className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7f6651]">{row.label}</label>
                  <textarea
                    value={entry[row.key]}
                    onChange={(e) => setEntry((prev) => ({ ...prev, [row.key]: e.target.value }))}
                    rows={3}
                    placeholder={row.placeholder}
                    className="mt-1 w-full resize-y rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2 text-sm text-[#2f2117] outline-none placeholder:text-[#a89882] focus:border-[#8c6346]"
                  />
                </div>
              ))}
            </div>
          </div>

          <aside className="bg-[#f1e4d2] px-4 py-5 lg:col-span-4 sm:px-5">
            <div className="border border-[#cfbca4] bg-[#f8f1e6] px-3 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7f6651]">Entry completion</p>
              <p className="mt-1 text-2xl font-light tabular-nums text-[#1f1610]">{completionPct}%</p>
              <div className="mt-2 h-1.5 bg-[#e8dcc9]">
                <div className="h-full bg-[#5a3d2b]" style={{ width: `${completionPct}%` }} />
              </div>
              <p className="mt-2 text-xs text-[#6f5641]">{filledFields}/5 guided prompts drafted</p>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#7f6651]">Prompt cues</p>
              {[
                "Where did I protect my energy today?",
                "What feeling did I avoid naming?",
                "What is one small redesign for tomorrow?",
              ].map((q) => (
                <div key={q} className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2 text-sm text-[#4f3928]">
                  {q}
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-5" aria-labelledby="mood-timeline">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="mood-timeline" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Heart className="h-4 w-4 text-[#7f6651]" aria-hidden />
              Mood timeline
            </h2>
          </div>
          <div className="space-y-3 px-4 py-4 sm:px-5">
            {moodSeries.map((m) => (
              <div key={m.day}>
                <div className="mb-1 flex items-center justify-between text-xs text-[#6f5641]">
                  <span className="font-mono">{m.day}</span>
                  <span>
                    {m.label} · {m.value}
                  </span>
                </div>
                <div className="h-2 bg-[#e8dcc9]">
                  <div className="h-full bg-[#5a3d2b]" style={{ width: `${m.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f1e4d2] lg:col-span-7" aria-labelledby="past-entries">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="past-entries" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Search className="h-4 w-4 text-[#7f6651]" aria-hidden />
              Searchable past entries
            </h2>
            <div className="mt-2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by mood, date, or phrase..."
                className="w-full rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2 text-sm outline-none placeholder:text-[#a89882] focus:border-[#8c6346]"
              />
            </div>
          </div>
          <div className="max-h-[360px] space-y-0 overflow-y-auto divide-y divide-[#e8dcc9]">
            {filteredHistory.map((entryItem) => (
              <article key={`${entryItem.date}-${entryItem.prompt}`} className="px-4 py-3 sm:px-5">
                <div className="flex items-center justify-between gap-2">
                  <time className="font-mono text-xs text-[#8f7862]">{entryItem.date}</time>
                  <span className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#5f4733]">
                    {entryItem.mood}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#4f3928]">{entryItem.prompt}</p>
              </article>
            ))}
            {!filteredHistory.length ? (
              <p className="px-4 py-4 text-sm text-[#6f5641] sm:px-5">No entries found for this query.</p>
            ) : null}
          </div>
        </section>
      </div>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-5" aria-labelledby="themes-ai">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="themes-ai" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Brain className="h-4 w-4 text-[#7f6651]" aria-hidden />
              Recurring themes (AI detected)
            </h2>
          </div>
          <ul className="divide-y divide-[#e8dcc9]">
            {recurringThemes.map((theme) => (
              <li key={theme.theme} className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="text-sm text-[#4f3928]">{theme.theme}</p>
                  <p className="mt-1 font-mono text-[11px] text-[#8f7862]">{theme.mentions} mentions</p>
                </div>
                <span
                  className={cn(
                    "rounded-none border px-2 py-0.5 text-[10px] uppercase tracking-wide",
                    theme.trend === "up"
                      ? "border-[#6b8f5e] bg-[#e8f0e4] text-[#3d5a32]"
                      : "border-[#9a6b5a] bg-[#f4e3df] text-[#7b4d40]",
                  )}
                >
                  {theme.trend}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#ebe0d0] lg:col-span-7" aria-labelledby="growth-insights">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2
              id="growth-insights"
              className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#5f4733]"
            >
              <Sparkles className="h-4 w-4 text-[#5a3d2b]" aria-hidden />
              Growth insights over time
            </h2>
          </div>
          <ol className="space-y-3 px-4 py-4 sm:px-5">
            {growthInsights.map((insight, idx) => (
              <li key={insight} className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2.5 text-sm text-[#4f3928]">
                <span className="mr-2 font-mono text-xs text-[#8f7862]">{String(idx + 1).padStart(2, "0")}.</span>
                {insight}
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="wisdom">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="wisdom" className="text-lg font-semibold tracking-tight">
            Wisdom section
          </h2>
        </div>
        <blockquote className="px-4 py-6 sm:px-8">
          <p className="max-w-4xl text-lg font-light leading-relaxed text-[#3f2d20]">"{wisdom}"</p>
          <footer className="mt-3 text-xs uppercase tracking-[0.12em] text-[#8f7862]">Viktor E. Frankl</footer>
        </blockquote>
      </section>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="weekly-summary">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="weekly-summary" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <CalendarDays className="h-4 w-4 text-[#7f6651]" aria-hidden />
            Weekly reflection summaries
          </h2>
        </div>
        <div className="divide-y divide-[#e8dcc9]">
          {weeklySummaries.map((summary) => (
            <article key={summary.week} className="grid gap-2 px-4 py-4 sm:grid-cols-[120px_minmax(0,1fr)] sm:px-5">
              <div>
                <p className="font-mono text-xs text-[#8f7862]">{summary.week}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#7f6651]">Editorial note</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#2f2117]">{summary.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#4f3928]">{summary.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="flex flex-wrap items-center gap-3 border-t border-[#cfc0ae] pt-4 text-xs text-[#6f5641]">
        <BookOpenText className="h-4 w-4 text-[#7f6651]" aria-hidden />
        <span>Write for signal, not volume.</span>
        <Target className="h-4 w-4 text-[#7f6651]" aria-hidden />
        <span>Name one behavior change for tomorrow.</span>
        <TrendingUp className="h-4 w-4 text-[#6b8f5e]" aria-hidden />
        <span>Consistency compounds clarity.</span>
      </footer>
    </div>
  );
}
