import { Card } from "@/components/ui/card";
import { AlertTriangle, Flag, ListChecks, Milestone, Target } from "lucide-react";
import { IllustrationPanel } from "@/components/ui/illustration-panel";
import { Progress } from "@/components/ui/progress";
import { goals } from "@/lib/data";

export default function GoalsEnginePage() {
  return (
    <div className="page-root">
      <section>
        <Card className="space-y-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-[#7f6651]" />
            <h2 className="text-2xl font-semibold text-[#2f2117]">Goals Engine</h2>
          </div>
          <p className="text-sm text-[#7d6652]">
            Convert long-term ambitions into milestones and daily repeatable habits.
          </p>
        </Card>
      </section>
      <section>
        <IllustrationPanel
          title="Goals Banner Illustration"
          src="/images/undraw_goals_dwgr.svg"
          className="p-5"
        />
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.2fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Goal roadmap timeline</h3>
          </div>
          {[
            "Q2 Week 1: Pilot scope freeze",
            "Q2 Week 2: Onboard 10 beta users",
            "Q2 Week 3: Retention behavior analysis",
            "Q2 Week 4: Iterate and prep expansion",
          ].map((step) => (
            <div key={step} className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              {step}
            </div>
          ))}
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Goal risk alerts</h3>
          </div>
          <div className="space-y-2 text-sm text-[#5b4432]">
            <p>- Scope creep risk on product launch objective.</p>
            <p>- Recovery deficit may reduce consistency for health goal.</p>
            <p>- Calendar saturation above 75% affects execution quality.</p>
          </div>
        </Card>
      </section>

      <section className="grid gap-3">
        {goals.map((goal) => (
          <Card key={goal.id} className="space-y-4 rounded-2xl">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-[#2f2117]">{goal.title}</h3>
              <p className="text-sm text-[#7d6652]">{goal.milestone}</p>
            </div>
            <Progress value={goal.progress} />
            <div className="flex flex-wrap gap-2">
              {goal.habits.map((habit) => (
                <span
                  key={habit}
                  className="rounded-sm border border-[#d2c3ae] bg-[#f3e8d9] px-2.5 py-1 text-xs text-[#604a36]"
                >
                  {habit}
                </span>
              ))}
            </div>
            <div className="grid gap-2 text-xs text-[#7d6652] sm:grid-cols-3">
              <p>Milestones complete: 5 / 8</p>
              <p>Habit consistency: 82%</p>
              <p>Accountability check-ins: 4 this week</p>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.05fr_1fr_0.9fr]">
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <ListChecks className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Habit systems board</h3>
          </div>
          <div className="grid gap-2 text-sm text-[#4f3928]">
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Morning system: Plan + energy check</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Execution system: Two maker blocks/day</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Review system: Weekly synthesis Friday</p>
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Milestone className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Milestone progress tracker</h3>
          </div>
          <div className="space-y-2 text-sm text-[#4f3928]">
            <p>Discovery: 100%</p>
            <p>Prototype: 82%</p>
            <p>Validation: 61%</p>
            <p>Refinement: 38%</p>
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Accountability stats</h3>
          <p className="text-sm text-[#5b4432]">Check-ins completed: 4/4</p>
          <p className="text-sm text-[#5b4432]">Commitments closed: 11</p>
          <p className="text-sm text-[#5b4432]">Carry-overs: 2</p>
          <details className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-xs text-[#5b4432]">
            <summary className="cursor-pointer font-medium">Show blocker breakdown</summary>
            Main blockers: context switching, calendar drift, and under-scoped weekly goals.
          </details>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Quarterly scope commitments</h3>
          <div className="space-y-2 text-sm text-[#4f3928]">
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Must ship: pilot onboarding flow + retention dashboard</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Should ship: habit score recommendation engine</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Won&apos;t ship: non-critical visual refactors</p>
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Goal review journal</h3>
          {[
            "Week 1: execution quality improved after scope cuts.",
            "Week 2: momentum slowed due to meeting overload.",
            "Week 3: strong recovery with tighter focus cadence.",
          ].map((line) => (
            <div key={line} className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              {line}
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
