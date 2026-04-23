"use client";

import { HeartPulse, MoonStar, NotebookPen, Pill } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IllustrationPanel } from "@/components/ui/illustration-panel";
import { energyData, weeklyInsightBullets } from "@/lib/data";
import { EnergyChart } from "@/components/charts/energy-chart";

export default function EnergyTrackerPage() {
  return (
    <div className="page-root">
      <section>
        <Card className="space-y-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-[#7f6651]" />
            <h2 className="text-2xl font-semibold text-[#2f2117]">Energy Tracker</h2>
          </div>
          <p className="text-sm text-[#7d6652]">
            Monitor mental, physical, and emotional energy with a simple weekly view.
          </p>
        </Card>
      </section>
      <section className="grid gap-3 xl:grid-cols-[1.55fr_0.9fr]">
        <Card className="space-y-4 rounded-2xl">
        <EnergyChart data={energyData} />
        <div className="grid gap-1 text-sm text-[#4f3928] sm:grid-cols-3">
          <p>Mental average: 74</p>
          <p>Physical average: 69</p>
          <p>Emotional average: 74</p>
        </div>
        </Card>
        <Card className="space-y-3 rounded-2xl xl:sticky xl:top-16 xl:h-fit">
          <div className="flex items-center gap-2">
            <MoonStar className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Mood / sleep correlations</h3>
          </div>
          <div className="space-y-2 text-sm text-[#5b4432]">
            <p>Sleep 7h+ correlates with +11 mental energy points.</p>
            <p>Late caffeine after 15:00 correlates with next-day emotional dip.</p>
            <p>Morning sunlight before 09:00 improves physical baseline consistency.</p>
          </div>
          <IllustrationPanel
            title="Energy Support Illustration"
            src="/images/undraw_mindfulness_d853.svg"
          />
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Habit impact analysis</h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {[
              ["Strength session", "+9 physical"],
              ["Morning planning", "+7 mental"],
              ["Social downtime", "+6 emotional"],
              ["Deep work >2h", "-4 emotional late day"],
            ].map(([habit, impact]) => (
              <div key={habit} className="border border-[#d2c3ae] bg-[#f3e8d9] p-3">
                <p className="text-sm font-medium text-[#2f2117]">{habit}</p>
                <p className="mt-1 text-xs text-[#7d6652]">{impact}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Weekly insights</h3>
          {weeklyInsightBullets.map((bullet) => (
            <p key={bullet} className="text-sm leading-6 text-[#5b4432]">
              {bullet}
            </p>
          ))}
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Pill className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Recovery recommendations</h3>
          </div>
          <ul className="space-y-2 text-sm text-[#4f3928]">
            <li>- Add 15-minute transition reset between work contexts.</li>
            <li>- Shift high-cognition tasks to pre-lunch block.</li>
            <li>- Protect two low-stimulus evenings this week.</li>
          </ul>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <NotebookPen className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Weekly trend journal</h3>
          </div>
          <div className="space-y-2">
            {["Mon: Low sleep, guarded output", "Wed: Strong alignment, high emotional steadiness", "Fri: Excellent focus after reduced meetings"].map(
              (item) => (
                <div key={item} className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
                  {item}
                </div>
              ),
            )}
          </div>
          <details className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-xs text-[#5b4432]">
            <summary className="cursor-pointer font-medium">Expand trend notes</summary>
            Emotion dips occur on days with fewer than two intentional breaks and no mobility session.
          </details>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.15fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Energy operating protocol</h3>
          <div className="grid gap-2 text-sm text-[#4f3928]">
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Morning baseline check before commitments</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Midday reset and hydration checkpoint</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Evening emotional unload before planning tomorrow</p>
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Energy heatmap by hour</h3>
          <div className="grid grid-cols-7 gap-1">
            {[
              3, 2, 4, 5, 5, 4, 3, 2, 3, 4, 5, 5, 4, 3, 2, 2, 3, 4, 5, 4, 3, 2, 2, 3, 4, 5, 5, 4,
            ].map((score, index) => (
              <div
                key={`${score}-${index}`}
                className="h-7 rounded-md border border-[#d5c5b1]"
                style={{ backgroundColor: `rgba(91,61,42,${0.15 + score * 0.12})` }}
                title={`Energy intensity ${score}/5`}
              />
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
