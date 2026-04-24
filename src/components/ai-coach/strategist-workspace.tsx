"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Bot,
  Brain,
  CalendarCheck2,
  HeartPulse,
  Lightbulb,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Role = "coach" | "you";
type Msg = { id: string; role: Role; text: string; at: string };

const initialConversation: Msg[] = [
  { id: "m1", role: "coach", text: "Weekly read complete. You are strongest when strategy work starts before 10:00.", at: "09:02" },
  { id: "m2", role: "you", text: "Help me pick this week's single focus theme.", at: "09:03" },
  { id: "m3", role: "coach", text: "Recommendation: decisive execution. Protect two morning blocks and reduce evening commitments.", at: "09:04" },
];

const suggestedPrompts = [
  "Where am I losing momentum this week?",
  "Turn my top 3 goals into a daily sequence",
  "What is the highest-risk decision right now?",
  "Give me a recovery-adjusted execution plan",
];

const memoryContext = [
  "You perform best on Tuesdays and Thursdays before noon.",
  "Long meetings reduce evening reflection quality.",
  "Decision confidence rises after morning writing.",
  "Sleep under 7h predicts next-day reactivity.",
];

const actionPlan = [
  { day: "Mon", action: "Lock weekly priority + remove one low-value commitment" },
  { day: "Tue", action: "Run 2 deep blocks on product strategy and decision memo" },
  { day: "Wed", action: "Midweek review: unblock one stalled goal" },
  { day: "Thu", action: "Execute hardest conversation before lunch" },
  { day: "Fri", action: "Close loop: reflection + next-week pre-commitment" },
];

const habitSuggestions = [
  "5-minute planning ritual before first meeting",
  "No notifications during deep-work block",
  "Evening shutdown note: 3 lines only",
  "One recovery walk after intense sessions",
];

function makeReply(input: string) {
  const text = input.toLowerCase();
  if (text.includes("decision")) return "Use a 2x2: impact and reversibility. Choose the option with highest upside and fastest feedback.";
  if (text.includes("blocker")) return "Your top blocker is context switching after lunch. Batch operational tasks in one 45-minute window.";
  if (text.includes("health")) return "Health warning: two short-sleep nights in a row. Reduce cognitive load tonight and protect recovery.";
  return "Best next move: pick one lever for the next 24h and commit to a measurable outcome by tomorrow evening.";
}

export function StrategistWorkspace() {
  const [messages, setMessages] = useState<Msg[]>(initialConversation);
  const [draft, setDraft] = useState("");

  const weeklyLifeScore = 83;
  const momentumTrend = "+9% vs last week";
  const focusTheme = "Decisive execution with protected recovery";

  const productivitySignal = useMemo(() => {
    const userMessages = messages.filter((m) => m.role === "you").length;
    return Math.min(96, 72 + userMessages * 3);
  }, [messages]);

  return (
    <div className="space-y-10 pb-10 text-[#2f2117]">
      <header className="rounded-none border border-[#cfbca4] bg-gradient-to-b from-[#f8f1e6] to-[#efe2cf] px-4 py-4 sm:px-5">
        <div className="grid gap-4 border border-[#cfbca4] bg-[#fdf9f3] p-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7862]">AI Coach</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Life strategist assistant</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#5f4733]">
              Strategy-first advising across decisions, goals, health signals, and accountability.
            </p>
          </div>
          <div className="relative h-28">
            <Image src="/images/undraw_artificial-intelligence_43qa.svg" alt="AI coach visual" fill className="object-contain" sizes="220px" />
          </div>
        </div>

        <div className="mt-4 grid divide-y divide-[#cfc0ae] border border-[#cfc0ae] bg-[#fdf9f3] md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Weekly life score</p>
            <p className="mt-1 text-3xl font-light tabular-nums text-[#1f1610]">{weeklyLifeScore}</p>
            <div className="mt-2 h-1.5 bg-[#e8dcc9]">
              <div className="h-full bg-[#5a3d2b]" style={{ width: `${weeklyLifeScore}%` }} />
            </div>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Momentum trend</p>
            <p className="mt-1 flex items-center gap-1 text-2xl font-light text-[#1f1610]">
              <ArrowUpRight className="h-5 w-5 text-[#6b8f5e]" aria-hidden />
              {momentumTrend}
            </p>
            <p className="mt-1 text-xs text-[#6f5641]">Execution quality and recovery are both improving.</p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Recommended focus theme</p>
            <p className="mt-1 text-sm font-medium text-[#2f2117]">{focusTheme}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-8" aria-labelledby="conversation">
          <div className="flex items-center justify-between border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="conversation" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Advisor conversation
            </h2>
            <span className="text-xs text-[#6f5641]">{messages.length} exchanges</span>
          </div>

          <div className="space-y-4 bg-gradient-to-b from-[#f3e8d9] to-[#efe2d1] px-4 py-5 sm:px-5">
            {messages.map((m) => (
              <article key={m.id} className={cn("flex gap-2", m.role === "you" ? "justify-end" : "justify-start")}>
                {m.role === "coach" ? (
                  <div className="grid h-8 w-8 place-items-center rounded-none border border-[#cfbca4] bg-[#fdf9f3] text-[#5a3d2b]">
                    <Bot className="h-4 w-4" />
                  </div>
                ) : null}
                <div
                  className={cn(
                    "max-w-[85%] rounded-none border px-3 py-2 text-sm leading-relaxed",
                    m.role === "coach"
                      ? "border-[#cfbca4] bg-[#fdf9f3] text-[#3f2d20]"
                      : "border-[#4a3224] bg-[#5a3d2b] text-[#fdf8f0]",
                  )}
                >
                  {m.text}
                  <p className={cn("mt-1 text-[10px]", m.role === "coach" ? "text-[#8f7862]" : "text-[#dcc9b4]")}>{m.at}</p>
                </div>
                {m.role === "you" ? (
                  <div className="grid h-8 w-8 place-items-center rounded-none border border-[#4a3224] bg-[#5a3d2b] text-[#fdf8f0]">
                    <UserRound className="h-4 w-4" />
                  </div>
                ) : null}
              </article>
            ))}
          </div>

          <div className="border-t border-[#cfc0ae] bg-[#fdf9f3] px-4 py-3 sm:px-5">
            <p className="mb-2 text-[11px] uppercase tracking-[0.1em] text-[#8f7862]">Suggested prompts</p>
            <div className="mb-3 flex flex-wrap gap-2">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() =>
                    setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: "you", text: p, at: "Now" }, { id: crypto.randomUUID(), role: "coach", text: makeReply(p), at: "Now" }])
                  }
                  className="rounded-none border border-[#cfbca4] bg-[#f3e8d9] px-3 py-1.5 text-xs text-[#5f4733]"
                >
                  {p}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={2}
                placeholder="Ask your strategist assistant..."
                className="min-h-[52px] flex-1 resize-none rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2 text-sm outline-none placeholder:text-[#a89882]"
              />
              <button
                type="button"
                onClick={() => {
                  const text = draft.trim();
                  if (!text) return;
                  setMessages((prev) => [
                    ...prev,
                    { id: crypto.randomUUID(), role: "you", text, at: "Now" },
                    { id: crypto.randomUUID(), role: "coach", text: makeReply(text), at: "Now" },
                  ]);
                  setDraft("");
                }}
                className="rounded-none border border-[#5a3d2b] bg-[#5a3d2b] px-4 text-sm text-[#fdf8f0]"
              >
                Send
              </button>
            </div>
          </div>
        </section>

        <aside className="bg-[#f1e4d2] lg:col-span-4" aria-labelledby="memory">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="memory" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Contextual memory
            </h2>
          </div>
          <ul className="space-y-2 px-4 py-4 sm:px-5">
            {memoryContext.map((m) => (
              <li key={m} className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2 text-sm text-[#4f3928]">
                {m}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-6" aria-labelledby="patterns">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="patterns" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Activity className="h-4 w-4 text-[#7f6651]" />
              Pattern detection
            </h2>
          </div>
          <ul className="divide-y divide-[#e8dcc9]">
            {[
              "You perform best on Tuesdays and Thursdays before noon.",
              "Decision quality drops after three context switches.",
              "Evening planning predicts next-day execution reliability.",
            ].map((p) => (
              <li key={p} className="px-4 py-3 text-sm text-[#4f3928] sm:px-5">
                {p}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#f3e8d9] lg:col-span-3" aria-labelledby="guidance">
          <div className="border-b border-[#cfc0ae] px-4 py-3">
            <h2 id="guidance" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Target className="h-4 w-4 text-[#7f6651]" />
              Decision guidance
            </h2>
          </div>
          <div className="space-y-2 px-4 py-4 text-sm text-[#4f3928]">
            <p className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">Prioritize reversibility when confidence is below 70.</p>
            <p className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">Schedule high-stakes decisions in your top energy window.</p>
          </div>
        </section>

        <section className="bg-[#ebe0d0] lg:col-span-3" aria-labelledby="warnings">
          <div className="border-b border-[#cfc0ae] px-4 py-3">
            <h2 id="warnings" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <ShieldAlert className="h-4 w-4 text-[#9a6b5a]" />
              Health warnings
            </h2>
          </div>
          <div className="space-y-2 px-4 py-4 text-sm text-[#4f3928]">
            <p className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">Two short-sleep nights detected. Reduce evening cognitive load.</p>
            <p className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">High stress after back-to-back calls. Insert transition buffer.</p>
          </div>
        </section>
      </div>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-6" aria-labelledby="weekly-plan">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="weekly-plan" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <CalendarCheck2 className="h-4 w-4 text-[#7f6651]" />
              Weekly action plan
            </h2>
          </div>
          <ol className="divide-y divide-[#e8dcc9]">
            {actionPlan.map((step) => (
              <li key={step.day} className="grid grid-cols-[56px_minmax(0,1fr)] gap-2 px-4 py-3 sm:px-5">
                <span className="font-mono text-xs text-[#8f7862]">{step.day}</span>
                <span className="text-sm text-[#4f3928]">{step.action}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-[#f1e4d2] lg:col-span-3" aria-labelledby="accountability">
          <div className="border-b border-[#cfc0ae] px-4 py-3">
            <h2 id="accountability" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <AlertTriangle className="h-4 w-4 text-[#b58a64]" />
              Accountability reminders
            </h2>
          </div>
          <ul className="space-y-2 px-4 py-4 text-sm text-[#4f3928]">
            <li className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">Send weekly update by Friday 17:00.</li>
            <li className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">Review blockers before scheduling new work.</li>
            <li className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">Close one open decision this week.</li>
          </ul>
        </section>

        <section className="bg-[#ebe0d0] lg:col-span-3" aria-labelledby="habits">
          <div className="border-b border-[#cfc0ae] px-4 py-3">
            <h2 id="habits" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Lightbulb className="h-4 w-4 text-[#7f6651]" />
              Habit suggestions
            </h2>
          </div>
          <ul className="space-y-2 px-4 py-4 text-sm text-[#4f3928]">
            {habitSuggestions.map((h) => (
              <li key={h} className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">
                {h}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="summary">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="summary" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Sparkles className="h-4 w-4 text-[#5a3d2b]" />
            Smart summary
          </h2>
        </div>
        <div className="grid divide-y divide-[#cfc0ae] md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#8f7862]">Goal blockers</p>
            <p className="mt-2 text-sm text-[#4f3928]">Calendar overflow and context switching are your top execution blockers.</p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#8f7862]">Growth opportunities</p>
            <p className="mt-2 text-sm text-[#4f3928]">Protect morning strategy windows and you can raise weekly output quality.</p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#8f7862]">Advisor signal</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-[#4f3928]">
              <TrendingUp className="h-4 w-4 text-[#6b8f5e]" /> Productivity confidence {productivitySignal}%
            </p>
          </div>
        </div>
      </section>

      <footer className="flex flex-wrap items-center gap-3 border-t border-[#cfc0ae] pt-4 text-xs text-[#6f5641]">
        <Brain className="h-4 w-4 text-[#7f6651]" />
        <span>Think in systems, not isolated tasks.</span>
        <HeartPulse className="h-4 w-4 text-[#7f6651]" />
        <span>Recovery is part of execution.</span>
      </footer>
    </div>
  );
}
