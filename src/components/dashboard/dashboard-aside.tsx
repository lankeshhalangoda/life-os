"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const recommendationItems = [
  "Move strategic calls before noon to increase decision quality by 11%.",
  "Shift Friday discretionary spend cap to $160 to maintain runway target.",
  "Schedule reflection at 20:00 to preserve journaling streak momentum.",
];

const activityTimeline = [
  { time: "09:12", title: "Energy check-in", detail: "Mental 82 · Physical 76", kind: "energy" as const },
  { time: "10:04", title: "Priority closed", detail: "Pilot onboarding copy finalization", kind: "work" as const },
  { time: "13:40", title: "Focus sprint", detail: "Roadmap architecture", kind: "focus" as const },
  { time: "18:20", title: "Reflection draft", detail: "Weekly summary queued", kind: "reflect" as const },
];

const setupItems = [
  "Pre-select your first deep-work task before 21:00.",
  "Confirm one decision to close by midday.",
  "Block a 20-minute recovery reset after lunch.",
];

const statsItems = [
  "Streak: 13 days",
  "Focus score: 82",
  "Decision index: 84",
  "Energy baseline: 77%",
  "Deep work sessions: 14",
  "Goals on track: 5/6",
  "Priority completion: 86%",
  "Reflection quality: 8.4/10",
];

const lineTone: Record<(typeof activityTimeline)[number]["kind"], string> = {
  energy: "bg-[#7a9e6c]",
  work: "bg-[#5a3d2b]",
  focus: "bg-[#8b6b4f]",
  reflect: "bg-[#6b5a8f]",
};

export function DashboardAside() {
  const [checks, setChecks] = useState<boolean[]>(() => setupItems.map(() => false));
  const [reflection, setReflection] = useState("");

  return (
    <aside className="min-w-0 w-full space-y-3 xl:sticky xl:top-16 xl:h-fit">
      <Card>
        <div className="mb-3 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-[#7f6651]" />
          <h3 className="text-base font-semibold text-[#2f2117]">AI recommendations</h3>
        </div>
        <ul className="space-y-2 text-sm text-[#5c4532]">
          {recommendationItems.map((item) => (
            <li key={item} className="flex items-start justify-between gap-2">
              <span className="min-w-0">{item}</span>
              <Button type="button" size="sm" variant="outline" className="shrink-0 px-2 text-xs">
                Queue
              </Button>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3 className="mb-3 text-base font-semibold text-[#2f2117]">Recent activity timeline</h3>
        <ol className="space-y-5 border-l border-[#d2c3ae] pl-7">
          {activityTimeline.map((row, i) => (
            <li key={row.time} className="relative pl-2">
              <span className={`absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-1/2 ring-[3px] ring-[#f9f1e4] ${lineTone[row.kind]}`} aria-hidden />
              <p className="text-[11px] font-medium uppercase tracking-wide text-[#8f7862]">{row.time}</p>
              <p className="text-sm font-medium text-[#3b2a1e]">{row.title}</p>
              <p className="text-xs text-[#6f5641]">{row.detail}</p>
              {i === 0 ? (
                <button type="button" className="mt-1 text-xs font-medium text-[#5a3d2b] underline-offset-2 hover:underline">
                  View details
                </button>
              ) : null}
            </li>
          ))}
        </ol>
      </Card>

      <Card>
        <h3 className="mb-2 text-base font-semibold text-[#2f2117]">Weekly reflection prompt</h3>
        <p className="mb-2 text-sm text-[#5c4532]">
          Which choice this week moved you closer to your long-term identity, and what will you repeat next week?
        </p>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
          placeholder="Write a short note…"
          className="mb-2 w-full resize-y rounded-[var(--radius-ui)] border border-[#d2c3ae] bg-[#fffcf7] px-3 py-2 text-sm text-[#2f2117] outline-none placeholder:text-[#8f7862] focus:border-[#5a3d2b]"
        />
        <Button type="button" size="sm">
          Save draft
        </Button>
      </Card>

      <Card>
        <h3 className="mb-2 text-base font-semibold text-[#2f2117]">Tomorrow setup checklist</h3>
        <ul className="space-y-2 text-sm text-[#4f3928]">
          {setupItems.map((item, i) => (
            <li key={item}>
              <label className="flex cursor-pointer items-start gap-2 rounded-[var(--radius-ui)] px-1 py-1 hover:bg-[#f3e8d9]/60">
                <input
                  type="checkbox"
                  checked={checks[i]}
                  onChange={() =>
                    setChecks((prev) => {
                      const next = [...prev];
                      next[i] = !next[i];
                      return next;
                    })
                  }
                  className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#5a3d2b]"
                />
                <span className={checks[i] ? "text-[#7d6652] line-through" : ""}>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h3 className="mb-2 text-base font-semibold text-[#2f2117]">Personal stats snapshot</h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-[#4f3928]">
          {statsItems.map((label) => (
            <div key={label} className="rounded-[var(--radius-ui)] border border-[#d3c0a9] bg-[#f3e8d9] px-2 py-2">
              {label}
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}
