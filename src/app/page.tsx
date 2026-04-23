import Image from "next/image";
import { ArrowRight, BatteryMedium, Brain, Compass, Flame, Lightbulb, ListChecks, Scale, Sparkles, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { priorities, upcomingDecisions } from "@/lib/data";
import { DashboardAreaChart, HabitBarChart, LifeWheelChart, RadarQualityChart } from "@/components/charts/dashboard-analytics";

const onboardingItems = [
  "Set top three outcomes before your first meeting.",
  "Score one pending decision in Decisions Lab today.",
  "Protect one 90-minute focus session this afternoon.",
];

const whatsNewItems = [
  "Decision confidence timeline now shows seven-day trend deltas.",
  "Money Clarity adds runway sensitivity scenarios and downside guardrails.",
  "AI Coach now generates weekly action packs with one-click scheduling.",
];

const recommendationItems = [
  "Move strategic calls before noon to increase decision quality by 11%.",
  "Shift Friday discretionary spend cap to $160 to maintain runway target.",
  "Schedule reflection at 20:00 to preserve journaling streak momentum.",
];

const activityItems = [
  "09:12 Logged energy check-in: Mental 82 / Physical 76.",
  "10:04 Closed priority: pilot onboarding copy finalization.",
  "13:40 Started focus sprint: roadmap architecture.",
  "18:20 Drafted weekly reflection summary.",
];

const setupItems = [
  "Pre-select your first deep-work task before 21:00.",
  "Confirm one decision to close by midday.",
  "Block a 20-minute recovery reset after lunch.",
];

const statsItems = [
  { label: "Streak: 13 days", icon: Flame },
  { label: "Focus score: 82", icon: Target },
  { label: "Decision index: 84", icon: Scale },
  { label: "Energy baseline: 77%", icon: BatteryMedium },
  { label: "Deep work sessions: 14", icon: Brain },
  { label: "Goals on track: 5/6", icon: ListChecks },
  { label: "Priority completion: 86%", icon: ArrowRight },
  { label: "Reflection quality: 8.4/10", icon: Sparkles },
];

function TextListCard({ title, items, icon }: { title: string; items: string[]; icon?: React.ReactNode }) {
  return (
    <Card className="rounded-2xl">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <div className="space-y-2 text-sm text-[#5c4532]">{items.map((item) => <p key={item}>- {item}</p>)}</div>
    </Card>
  );
}

export default function DashboardPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.55fr_0.9fr]">
      <div className="space-y-4">
        <Card className="surface relative overflow-hidden rounded-2xl p-6">
          <div className="grid gap-5 lg:grid-cols-[1.25fr_1fr]">
            <div className="space-y-4">
              <Badge>LifeOS Dashboard</Badge>
              <h1 className="text-3xl font-semibold tracking-tight text-[#2f2117]">
                One intelligent system for priorities, decisions, energy, money, and personal growth.
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-[#5f4733]">
                LifeOS turns your day into an operating loop: choose the highest-value work, make better calls, protect recovery, and close each day with insight.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button>Start daily planning</Button>
                <Button variant="outline">Open command palette</Button>
              </div>
            </div>
            <div className="relative h-72 overflow-hidden rounded-xl border border-[#cfbca4] bg-[#efe0cd]">
              <Image
                src="/images/undraw_plan-mode_rs7h.svg"
                alt="LifeOS hero visual"
                fill
                priority
                loading="eager"
                className="object-contain p-4"
              />
            </div>
          </div>
        </Card>

        <section className="grid gap-3 lg:grid-cols-2">
          <TextListCard title="Onboarding guidance" items={onboardingItems} icon={<Compass className="h-4 w-4 text-[#7f6651]" />} />
          <TextListCard title="What's new in LifeOS" items={whatsNewItems} icon={<Sparkles className="h-4 w-4 text-[#7f6651]" />} />
        </section>

        <section className="grid gap-3 2xl:grid-cols-[1.4fr_1fr]">
          <Card className="rounded-2xl">
            <h3 className="mb-2 text-base font-semibold">Focus analytics (area)</h3>
            <DashboardAreaChart />
          </Card>
          <Card className="rounded-2xl">
            <h3 className="mb-4 text-base font-semibold">System health wheel (radial)</h3>
            <LifeWheelChart className="h-52 px-1" />
          </Card>
        </section>

        <section className="grid gap-3 lg:grid-cols-2">
          <Card className="rounded-2xl">
            <h3 className="mb-2 text-base font-semibold">Habit momentum (bar)</h3>
            <HabitBarChart />
          </Card>
          <Card className="rounded-2xl">
            <h3 className="mb-2 text-base font-semibold">Life balance quality (radar)</h3>
            <RadarQualityChart />
          </Card>
        </section>

        <section className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
          <Card className="rounded-2xl">
            <div className="mb-3 flex items-center gap-2">
              <Brain className="h-4 w-4 text-[#7f6651]" />
              <h3 className="text-base font-semibold">Daily priorities workspace</h3>
            </div>
            <div className="space-y-2">
              {priorities.map((item) => (
                <div key={item} className="flex items-center justify-between rounded-xl border border-[#d3c0a9] bg-[#f3e8d9] px-3 py-2.5 text-sm text-[#4f3928]">
                  <span>{item}</span>
                  <ArrowRight className="h-4 w-4 text-[#8f7862]" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="rounded-2xl">
            <div className="mb-3 flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-[#7f6651]" />
              <h3 className="text-base font-semibold">Decisions queue</h3>
            </div>
            <div className="space-y-2">
              {upcomingDecisions.map((item) => (
                <div key={item.title} className="rounded-xl border border-[#d3c0a9] bg-[#f3e8d9] px-3 py-2 text-sm">
                  <p className="font-medium text-[#4f3928]">{item.title}</p>
                  <p className="text-xs text-[#7d6652]">Due {item.due}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>

      <aside className="space-y-3 xl:sticky xl:top-16 xl:h-fit">
        <TextListCard title="AI recommendations" items={recommendationItems} icon={<Lightbulb className="h-4 w-4 text-[#7f6651]" />} />
        <Card className="rounded-2xl">
          <h3 className="mb-2 text-base font-semibold">Recent activity timeline</h3>
          <div className="space-y-2 text-xs text-[#634c38]">{activityItems.map((item) => <p key={item}>{item}</p>)}</div>
        </Card>
        <Card className="rounded-2xl">
          <h3 className="mb-2 text-base font-semibold">Weekly reflection prompt</h3>
          <p className="text-sm text-[#5c4532]">
            Which choice this week moved you closer to your long-term identity, and what will you repeat next week?
          </p>
        </Card>
        <Card className="rounded-2xl">
          <h3 className="mb-2 text-base font-semibold">Tomorrow setup checklist</h3>
          <div className="space-y-2 text-sm text-[#5c4532]">{setupItems.map((item) => <p key={item}>- {item}</p>)}</div>
        </Card>
        <Card className="rounded-2xl">
          <h3 className="mb-2 text-base font-semibold">Personal stats snapshot</h3>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#634c38]">
            {statsItems.map(({ label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-1.5 rounded-xl border border-[#d3c0a9] bg-[#f3e8d9] px-2 py-2">
                <Icon className="h-3.5 w-3.5 text-[#7f6651]" />
                <p>{label}</p>
              </div>
            ))}
          </div>
        </Card>
      </aside>
    </div>
  );
}
