"use client";

import { useEffect, useState } from "react";
import { BarChart3, ShieldBan, Timer, WandSparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IllustrationPanel } from "@/components/ui/illustration-panel";

export default function FocusModePage() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = (seconds % 60).toString().padStart(2, "0");

  return (
    <div className="page-root">
      <section>
        <Card className="space-y-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <Timer className="h-5 w-5 text-[#7f6651]" />
            <h2 className="text-2xl font-semibold text-[#2f2117]">Focus Mode</h2>
          </div>
          <p className="text-sm text-[#7d6652]">
            Run distraction-free sessions, protect deep work, and track execution quality.
          </p>
        </Card>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.5fr_0.85fr]">
        <Card className="space-y-4 rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-[#7f6651]" />
            <p className="text-sm uppercase tracking-[0.14em] text-[#7d6652]">Focus Mode</p>
          </div>
          <p
            key={`${minutes}:${secs}`}
            className="text-7xl font-semibold tracking-tight text-[#2f2117] transition-opacity duration-200"
          >
            {minutes}:{secs}
          </p>
          <p className="max-w-xl text-sm leading-6 text-[#604a36]">
            Fullscreen concentration timer with session controls, ambient protocol, and execution
            boundaries.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setRunning((v) => !v)}>{running ? "Pause" : "Start"}</Button>
            <Button
              variant="outline"
              onClick={() => {
                setRunning(false);
                setSeconds(25 * 60);
              }}
            >
              Reset
            </Button>
            <Button variant="subtle">Start 50-min sprint</Button>
          </div>
        </Card>
        <IllustrationPanel
          title="Focus Hero Illustration"
          src="/images/undraw_focused_m9bj.svg"
        />
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Session history</h3>
          {["09:00-09:45 Product architecture", "11:10-11:40 Decision synthesis", "15:00-15:35 Budget review"].map(
            (session) => (
              <div key={session} className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
                {session}
              </div>
            ),
          )}
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <ShieldBan className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Distraction blockers</h3>
          </div>
          <div className="grid gap-2 text-sm text-[#4f3928]">
            <p className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2">Notifications muted</p>
            <p className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2">Social apps blocked</p>
            <p className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2">Meeting buffer closed</p>
          </div>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Deep work analytics</h3>
          </div>
          <p className="text-sm text-[#5b4432]">Sessions this week: 14</p>
          <p className="text-sm text-[#5b4432]">Average uninterrupted block: 43 minutes</p>
          <p className="text-sm text-[#5b4432]">Best completion window: 09:00-11:30</p>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <WandSparkles className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Focus rituals panel</h3>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="border border-[#d2c3ae] bg-[#f3e8d9] p-3 text-sm text-[#4f3928]">2-min breathing reset</div>
            <div className="border border-[#d2c3ae] bg-[#f3e8d9] p-3 text-sm text-[#4f3928]">Intent note before session</div>
            <div className="border border-[#d2c3ae] bg-[#f3e8d9] p-3 text-sm text-[#4f3928]">Single-task commit</div>
            <div className="border border-[#d2c3ae] bg-[#f3e8d9] p-3 text-sm text-[#4f3928]">Post-session recap</div>
          </div>
          <details className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-xs text-[#5b4432]">
            <summary className="cursor-pointer font-medium">Customize ritual order</summary>
            Current order: breathing -&gt; intent note -&gt; single-task commit -&gt; recap.
          </details>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Environment controls</h3>
          <div className="grid gap-2 text-sm text-[#4f3928]">
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Sound profile: low instrumental</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Device profile: phone in focus mode</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Workspace profile: notifications hidden</p>
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Session debrief prompts</h3>
          <ul className="space-y-2 text-sm text-[#4f3928]">
            <li>- What advanced the key objective most?</li>
            <li>- Where did attention drift and why?</li>
            <li>- What should be adjusted for next session?</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
