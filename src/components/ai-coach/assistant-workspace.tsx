"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Bot,
  Brain,
  Clock,
  Moon,
  SendHorizontal,
  Sparkles,
  Target,
  UserRound,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Role = "coach" | "you";

type Message = {
  id: string;
  role: Role;
  text: string;
  at: number;
};

const initialMessages: Omit<Message, "id" | "at">[] = [
  {
    role: "coach",
    text: "Good to see you. I’ve pulled in this week’s focus score, energy dips, and open decisions. What do you want to work through first—clarity, execution, or recovery?",
  },
  {
    role: "you",
    text: "Clarity. Two tradeoffs are competing for the same calendar block.",
  },
  {
    role: "coach",
    text: "Let’s separate **decision** from **scheduling**. Name the two options in one line each, then tell me which one would still matter in 12 months if everything goes right.",
  },
];

const coachReplies = [
  "Noted. If you had to defend the opposite choice in one paragraph, what’s the strongest honest argument?",
  "I’d map both options on impact vs. reversibility. Want me to walk you through a 3-question stress test?",
  "That pattern often shows up when the real constraint is energy, not priority. Should we check your deep-work windows next?",
  "Captured. A tight next step: pick one assumption you can falsify in the next 48 hours—what would you measure?",
  "Here’s a framing: what would you advise a friend with your same data but none of the fear?",
];

const quickPrompts = [
  "Summarize my week in 5 bullets",
  "Prep me for a hard conversation tomorrow",
  "Where am I overcommitted?",
  "Turn my goals into a 3-day plan",
];

const weeklyPulse = [
  { label: "Focus score", value: "82", hint: "↑ vs last week", icon: Target },
  { label: "Deep work", value: "14 sessions", hint: "best 9–11:30", icon: Clock },
  { label: "Energy", value: "Stable AM", hint: "dip after context switches", icon: Zap },
  { label: "Recovery", value: "2 light nights", hint: "below target", icon: Moon },
];

const coachSignals = [
  "High-value decisions cluster after morning writing.",
  "Long meetings correlate with weaker evening reflections.",
  "Recovery days precede your clearest strategic thinking.",
  "Short breaks preserve emotional steadiness under load.",
];

const suggestedMoves = [
  "Block Monday 09:00 for strategy only",
  "Cap Thursday meetings at 3h total",
  "Pair financial review with Friday journal",
  "Protect two no-screen evenings",
];

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
}

function seedMessages(): Message[] {
  const t = Date.now();
  return initialMessages.map((m, i) => ({
    ...m,
    id: newId(),
    at: t - (initialMessages.length - i) * 60_000,
  }));
}

export function AssistantWorkspace() {
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const replyIndex = useRef(0);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, thinking, scrollToBottom]);

  const pushCoach = useCallback((text: string) => {
    setMessages((prev) => [...prev, { id: newId(), role: "coach", text, at: Date.now() }]);
  }, []);

  const send = useCallback(
    (raw?: string) => {
      const text = (raw ?? draft).trim();
      if (!text || thinking) return;
      setDraft("");
      setMessages((prev) => [...prev, { id: newId(), role: "you", text, at: Date.now() }]);
      setThinking(true);
      const idx = replyIndex.current % coachReplies.length;
      replyIndex.current += 1;
      window.setTimeout(() => {
        pushCoach(coachReplies[idx]);
        setThinking(false);
      }, 650 + Math.random() * 500);
    },
    [draft, thinking, pushCoach],
  );

  return (
    <div className="mx-auto w-full pb-8">
      <div className="overflow-hidden rounded-[var(--radius-ui)] border border-[#c9b89f] bg-[#f9f1e4] shadow-[var(--shadow-ui)]">
        {/* App chrome */}
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[#e1d5c5] bg-gradient-to-b from-[#fffdf9] to-[#f5ecdf] px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-ui)] border border-[#c4a882] bg-[#5a3d2b] text-[#fdf8f0] shadow-inner">
              <Sparkles className="h-5 w-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0">
                <h1 className="text-lg font-semibold tracking-tight text-[#2f2117]">LifeOS Coach</h1>
                <span className="text-xs font-medium text-[#6b8f5b]">Online</span>
              </div>
              <p className="truncate text-xs text-[#7a6049]">
                Conversational layer on your priorities, energy, and decisions — ask anything in plain language.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-[var(--radius-ui)] border border-[#e0d2bf] bg-[#faf6ef] px-3 py-1.5 text-[11px] text-[#6f5641]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#6b8f5b]" aria-hidden />
            Synced to this week’s LifeOS data
          </div>
        </header>

        <div className="flex min-h-[min(72vh,840px)] flex-col lg:flex-row">
          {/* Main chat */}
          <div className="flex min-h-[420px] min-w-0 flex-1 flex-col border-b border-[#e1d5c5] lg:border-b-0 lg:border-r">
            <div className="flex items-center justify-between border-b border-[#efe4d4] px-4 py-2 sm:px-5">
              <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#8f7862]">Session</span>
              <span className="text-xs text-[#9a8570]">{messages.length} messages</span>
            </div>

            <div
              className="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-5"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #efe6d8 0%, #f4eadc 38%, #ebe1d2 100%)",
              }}
            >
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={cn("flex gap-3", m.role === "you" ? "flex-row-reverse" : "flex-row")}
                >
                  <div
                    className={cn(
                      "mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border text-[#5a3d2b]",
                      m.role === "coach"
                        ? "border-[#d4c4b0] bg-[#faf6ef]"
                        : "border-[#b89b7c] bg-[#5a3d2b] text-[#fdf8f0]",
                    )}
                    aria-hidden
                  >
                    {m.role === "coach" ? <Bot className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}
                  </div>
                  <div className={cn("max-w-[min(100%,560px)]", m.role === "you" ? "text-right" : "text-left")}>
                    <div className="mb-1 flex items-center gap-2" style={{ justifyContent: m.role === "you" ? "flex-end" : "flex-start" }}>
                      <span className="text-[11px] font-medium uppercase tracking-wide text-[#9a8570]">
                        {m.role === "coach" ? "Coach" : "You"}
                      </span>
                      <time className="text-[10px] tabular-nums text-[#b5a08c]" dateTime={new Date(m.at).toISOString()}>
                        {new Date(m.at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </time>
                    </div>
                    <div
                      className={cn(
                        "inline-block rounded-2xl px-4 py-3 text-left text-sm leading-relaxed shadow-sm",
                        m.role === "coach"
                          ? "rounded-tl-sm border border-[#dccbb5] bg-[#faf6ef] text-[#3b2a1e]"
                          : "rounded-tr-sm border border-[#4a3224] bg-[#5a3d2b] text-[#fdf8f0]",
                      )}
                    >
                      <MessageBody text={m.text} variant={m.role} />
                    </div>
                  </div>
                </div>
              ))}

              {thinking ? (
                <div className="flex gap-3">
                  <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#d4c4b0] bg-[#faf6ef] text-[#5a3d2b]">
                    <Brain className="h-4 w-4 animate-pulse" aria-hidden />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm border border-[#e5d8c8] bg-[#faf6ef]/90 px-4 py-3 text-sm text-[#7a6049]">
                    <span className="inline-flex items-center gap-2">
                      <span className="flex gap-1" aria-hidden>
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8f7862]" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8f7862]" style={{ animationDelay: "120ms" }} />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#8f7862]" style={{ animationDelay: "240ms" }} />
                      </span>
                      Coach is thinking…
                    </span>
                  </div>
                </div>
              ) : null}

              <div ref={bottomRef} />
            </div>

            <div className="border-t border-[#e1d5c5] bg-[#fdfaf6] px-4 py-3 sm:px-5">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-[#9a8570]">Quick prompts</p>
              <div className="mb-3 flex flex-wrap gap-2">
                {quickPrompts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    disabled={thinking}
                    className="rounded-full border border-[#d9cab4] bg-[#f9f4ea] px-3 py-1.5 text-left text-xs font-medium text-[#5a3d2b] transition hover:border-[#b89b7c] hover:bg-[#f3e8d9] disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <label className="sr-only" htmlFor="coach-input">
                  Message to coach
                </label>
                <textarea
                  id="coach-input"
                  rows={2}
                  value={draft}
                  disabled={thinking}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder="Message LifeOS Coach… (Enter to send, Shift+Enter for newline)"
                  className="min-h-[44px] flex-1 resize-y rounded-[var(--radius-ui)] border border-[#d2c3ae] bg-[#fffcf7] px-3 py-2.5 text-sm text-[#2f2117] outline-none placeholder:text-[#9a8570] focus:border-[#5a3d2b] disabled:opacity-60"
                />
                <Button
                  type="button"
                  className="h-11 shrink-0 gap-2 sm:px-6"
                  onClick={() => send()}
                  disabled={thinking || !draft.trim()}
                >
                  <SendHorizontal className="h-4 w-4" aria-hidden />
                  Send
                </Button>
              </div>
            </div>
          </div>

          {/* Context rail */}
          <aside className="flex w-full shrink-0 flex-col bg-[#fdfaf6] lg:w-[min(100%,320px)] lg:border-l lg:border-[#e1d5c5]">
            <div className="border-b border-[#efe4d4] px-4 py-3 sm:px-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8f7862]">This week</h2>
              <p className="mt-1 text-[11px] leading-snug text-[#9a8570]">What the coach is weighting in replies.</p>
            </div>
            <div className="flex-1 space-y-0 overflow-y-auto px-4 sm:px-5">
              {weeklyPulse.map(({ label, value, hint, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 border-b border-[#efe4d4] py-3 last:border-b-0"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#8f7862]" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-wide text-[#9a8570]">{label}</p>
                    <p className="text-sm font-semibold text-[#2f2117]">{value}</p>
                    <p className="text-[11px] text-[#7a6049]">{hint}</p>
                  </div>
                </div>
              ))}

              <div className="py-4">
                <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
                  <Activity className="h-3.5 w-3.5" aria-hidden />
                  Signals
                </h3>
                <ul className="space-y-2">
                  {coachSignals.map((line) => (
                    <li key={line}>
                      <button
                        type="button"
                        disabled={thinking}
                        onClick={() => {
                          setDraft((d) => (d ? `${d}\n\n` : "") + `Let's unpack this signal: ${line}`);
                        }}
                        className="w-full rounded-[var(--radius-ui)] border border-transparent px-2 py-2 text-left text-xs leading-snug text-[#5b4432] transition hover:border-[#e0d2bf] hover:bg-[#f3e8d9] disabled:opacity-50"
                      >
                        {line}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-[#efe4d4] py-4">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Suggested moves</h3>
                <ul className="space-y-2">
                  {suggestedMoves.map((move) => (
                    <li key={move}>
                      <button
                        type="button"
                        disabled={thinking}
                        onClick={() => send(`Help me plan: ${move}`)}
                        className="group flex w-full items-center justify-between gap-2 rounded-[var(--radius-ui)] border border-[#e5d8c8] bg-[#f9f4ea] px-3 py-2 text-left text-xs font-medium text-[#4a3324] transition hover:border-[#c4a882] hover:bg-[#f3e8d9] disabled:opacity-50"
                      >
                        <span className="min-w-0">{move}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#b5a08c] transition group-hover:text-[#5a3d2b]" aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-[#e1d5c5] bg-[#faf6ef] p-4 sm:p-5">
              <p className="text-[11px] leading-relaxed text-[#7a6049]">
                Coach uses demo replies here — wire your model or API when you are ready. Context rail stays in sync with
                static week snapshot for the prototype.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/** Renders markdown-lite **bold** segments. */
function MessageBody({ text, variant }: { text: string; variant: Role }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*([^*]+)\*\*$/);
        if (m) {
          return (
            <strong
              key={i}
              className={cn("font-semibold", variant === "coach" ? "text-[#2f2117]" : "text-[#fffefc]")}
            >
              {m[1]}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
