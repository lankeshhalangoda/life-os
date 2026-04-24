"use client";

import { useState } from "react";
import {
  Activity,
  Bell,
  Download,
  Fingerprint,
  Palette,
  Shield,
  Sparkles,
  Target,
  Trophy,
  UserCircle2,
  Workflow,
} from "lucide-react";
import { cn } from "@/lib/utils";

const growthStory = [
  { month: "Jan", note: "Established daily planning ritual and reduced context switching.", score: 68 },
  { month: "Feb", note: "Built stronger recovery boundaries and improved weekly consistency.", score: 73 },
  { month: "Mar", note: "Decision confidence increased through written trade-off reviews.", score: 79 },
  { month: "Apr", note: "Execution quality improved with protected morning deep work.", score: 84 },
];

const tools = [
  { name: "Google Calendar", status: "Connected" },
  { name: "Notion", status: "Connected" },
  { name: "Apple Health", status: "Connected" },
  { name: "Bank Feeds", status: "Review needed" },
];

export function ProfileCommandCenter() {
  const [theme, setTheme] = useState<"warm" | "sepia" | "contrast">("warm");
  const [notifications, setNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const lifeScore = 86;

  return (
    <div className="space-y-10 pb-10 text-[#2f2117]">
      <header className="rounded-none border border-[#cfbca4] bg-gradient-to-b from-[#f8f1e6] to-[#efe2cf] px-4 py-5 sm:px-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-16 w-16 place-items-center rounded-none border border-[#cfbca4] bg-[#fdf9f3] text-[#5a3d2b]">
              <UserCircle2 className="h-9 w-9" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7862]">Profile</p>
              <h1 className="text-2xl font-semibold tracking-tight">Lankesh Halangoda</h1>
              <p className="mt-1 text-sm text-[#5f4733]">Strategic builder designing a calm, high-performance life system.</p>
            </div>
          </div>
          <div className="rounded-none border border-[#cfc0ae] bg-[#fdf9f3] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#8f7862]">Overall LifeOS score</p>
            <p className="mt-1 text-3xl font-light tabular-nums text-[#1f1610]">{lifeScore}</p>
          </div>
        </div>
      </header>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-4" aria-labelledby="preferences">
          <div className="border-b border-[#cfc0ae] px-4 py-3">
            <h2 id="preferences" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Preferences
            </h2>
          </div>
          <div className="space-y-2 px-4 py-4 text-sm text-[#4f3928]">
            <p className="rounded-none border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2">Morning strategy block: 09:00-11:30</p>
            <p className="rounded-none border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2">Weekly review cadence: Friday 16:30</p>
            <p className="rounded-none border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2">Decision style: Evidence first, reversible bets</p>
          </div>
        </section>

        <section className="bg-[#f1e4d2] lg:col-span-4" aria-labelledby="routines">
          <div className="border-b border-[#cfc0ae] px-4 py-3">
            <h2 id="routines" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Core routines
            </h2>
          </div>
          <ul className="space-y-2 px-4 py-4 text-sm text-[#4f3928]">
            {["Daily planning (8 min)", "Two deep-work blocks", "Evening reflection", "Sunday systems reset"].map((r) => (
              <li key={r} className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">
                {r}
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-[#ebe0d0] lg:col-span-4" aria-labelledby="tools">
          <div className="border-b border-[#cfc0ae] px-4 py-3">
            <h2 id="tools" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Connected tools
            </h2>
          </div>
          <ul className="divide-y divide-[#e8dcc9]">
            {tools.map((tool) => (
              <li key={tool.name} className="flex items-center justify-between gap-2 px-4 py-3 text-sm">
                <span className="text-[#4f3928]">{tool.name}</span>
                <span
                  className={cn(
                    "rounded-none border px-2 py-0.5 text-[10px] uppercase tracking-wide",
                    tool.status === "Connected"
                      ? "border-[#6b8f5e] bg-[#e8f0e4] text-[#3d5a32]"
                      : "border-[#b58a64] bg-[#f6ecd9] text-[#7a5a3e]",
                  )}
                >
                  {tool.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-6" aria-labelledby="goals-snapshot">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="goals-snapshot" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Target className="h-4 w-4 text-[#7f6651]" /> Goals snapshot
            </h2>
          </div>
          <div className="space-y-3 px-4 py-4 sm:px-5">
            {[
              { goal: "Scale LifeOS pilot to 50 users", progress: 64 },
              { goal: "Stabilize energy rhythm at 75+", progress: 58 },
              { goal: "Build 12-month savings runway", progress: 49 },
            ].map((item) => (
              <div key={item.goal}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-[#4f3928]">{item.goal}</span>
                  <span className="font-mono text-xs text-[#8f7862]">{item.progress}%</span>
                </div>
                <div className="h-2 bg-[#e8dcc9]">
                  <div className="h-full bg-[#5a3d2b]" style={{ width: `${item.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f1e4d2] lg:col-span-3" aria-labelledby="workstyle">
          <div className="border-b border-[#cfc0ae] px-4 py-3">
            <h2 id="workstyle" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Workflow className="h-4 w-4 text-[#7f6651]" /> Work style
            </h2>
          </div>
          <div className="space-y-2 px-4 py-4 text-sm text-[#4f3928]">
            <p className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">Builder-strategist with systems mindset</p>
            <p className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">Best in focused mornings</p>
            <p className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">Prefers written clarity before decisions</p>
          </div>
        </section>

        <section className="bg-[#ebe0d0] lg:col-span-3" aria-labelledby="achievements">
          <div className="border-b border-[#cfc0ae] px-4 py-3">
            <h2 id="achievements" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Trophy className="h-4 w-4 text-[#7f6651]" /> Achievements
            </h2>
          </div>
          <ul className="space-y-2 px-4 py-4 text-sm text-[#4f3928]">
            {["14 deep work sessions this week", "4/4 weekly accountability check-ins", "Decision turnaround improved by 22%"].map((a) => (
              <li key={a} className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">
                {a}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-7" aria-labelledby="growth-story">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="growth-story" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Sparkles className="h-4 w-4 text-[#7f6651]" /> Your Growth Story
            </h2>
          </div>
          <ol className="relative space-y-0 border-l-2 border-[#5a3d2b] py-5 pl-7 pr-4 sm:pr-6">
            {growthStory.map((g) => (
              <li key={g.month} className="relative pb-8 pl-2 last:pb-0">
                <span className="absolute left-0 top-1.5 h-3 w-3 -translate-x-1/2 border-2 border-[#5a3d2b] bg-[#f8f1e6]" />
                <p className="font-mono text-xs text-[#8f7862]">{g.month}</p>
                <p className="mt-1 text-sm text-[#4f3928]">{g.note}</p>
                <div className="mt-2 h-1.5 max-w-[220px] bg-[#e8dcc9]">
                  <div className="h-full bg-[#5a3d2b]" style={{ width: `${g.score}%` }} />
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-[#f1e4d2] lg:col-span-5" aria-labelledby="settings">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="settings" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              System settings
            </h2>
          </div>
          <div className="space-y-4 px-4 py-4 sm:px-5">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[#7f6651]">
                <Palette className="h-4 w-4" /> Theme settings
              </p>
              <div className="flex gap-2">
                {(["warm", "sepia", "contrast"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setTheme(option)}
                    className={cn(
                      "rounded-none border px-3 py-1.5 text-xs uppercase tracking-wide",
                      theme === option
                        ? "border-[#5a3d2b] bg-[#5a3d2b] text-[#f9f4ea]"
                        : "border-[#cfbca4] bg-[#fdf9f3] text-[#5f4733]",
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm text-[#4f3928]">
              <label className="flex items-center justify-between border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">
                <span className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-[#7f6651]" /> Notification preferences
                </span>
                <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} className="h-4 w-4 accent-[#5a3d2b]" />
              </label>
              <label className="flex items-center justify-between border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">
                <span className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#7f6651]" /> Weekly digest
                </span>
                <input type="checkbox" checked={weeklyDigest} onChange={(e) => setWeeklyDigest(e.target.checked)} className="h-4 w-4 accent-[#5a3d2b]" />
              </label>
              <label className="flex items-center justify-between border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2">
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-[#7f6651]" /> Privacy controls
                </span>
                <input type="checkbox" checked={dataSharing} onChange={(e) => setDataSharing(e.target.checked)} className="h-4 w-4 accent-[#5a3d2b]" />
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="inline-flex items-center gap-2 rounded-none border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2 text-xs text-[#5f4733]">
                <Download className="h-4 w-4" /> Export data
              </button>
              <button type="button" className="inline-flex items-center gap-2 rounded-none border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2 text-xs text-[#5f4733]">
                <Fingerprint className="h-4 w-4" /> Security settings
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
