import { Card } from "@/components/ui/card";
import { BookOpenText, LibraryBig, MessageSquareQuote, Tags } from "lucide-react";
import { IllustrationPanel } from "@/components/ui/illustration-panel";
import { Textarea } from "@/components/ui/textarea";
import { journalHistory } from "@/lib/data";

export default function ReflectionJournalPage() {
  return (
    <div className="page-root">
      <section>
        <Card className="space-y-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <BookOpenText className="h-5 w-5 text-[#7f6651]" />
            <h2 className="text-2xl font-semibold text-[#2f2117]">Reflection Journal</h2>
          </div>
          <p className="text-sm text-[#7d6652]">
            Capture daily patterns with focused prompts and lightweight mood tags.
          </p>
        </Card>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.45fr_0.95fr]">
        <Card className="space-y-3 rounded-2xl">
          <p className="text-sm text-[#7d6652]">
            Prompt: What did you choose with intention today, and what did it cost?
          </p>
          <Textarea placeholder="Write your reflection..." />
          <div className="flex gap-2">
            {["Calm", "Focused", "Tired", "Inspired"].map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-[#d2c3ae] bg-[#f3e8d9] px-2.5 py-1 text-xs text-[#604a36]"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="grid gap-1 text-xs text-[#7d6652]">
            <p>Writing streak: 13 days</p>
            <p>Average entry length: 190 words</p>
            <p>Most frequent pattern: over-commitment after 4 PM</p>
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl xl:sticky xl:top-16 xl:h-fit">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Prompt cards</h3>
          </div>
          {[
            "Where did you override your own boundaries?",
            "What choice felt both difficult and right?",
            "What would make tomorrow 15% calmer?",
          ].map((prompt) => (
            <div key={prompt} className="border border-[#d2c3ae] bg-[#f3e8d9] p-3 text-sm text-[#4f3928]">
              {prompt}
            </div>
          ))}
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.15fr_0.9fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Daily entry feed</h3>
          {journalHistory.map((entry) => (
            <div key={entry.date} className="rounded-sm border border-[#d2c3ae] bg-[#f3e8d9] p-3">
              <p className="text-xs text-[#7d6652]">{entry.date}</p>
              <p className="mt-1 text-sm text-[#4f3928]">{entry.prompt}</p>
              <p className="mt-2 text-xs text-[#7d6652]">Mood: {entry.mood}</p>
            </div>
          ))}
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Tags className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Mood tagging timeline</h3>
          </div>
          {["Mon - Inspired", "Tue - Focused", "Wed - Tired", "Thu - Calm", "Fri - Focused"].map((mood) => (
            <div key={mood} className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              {mood}
            </div>
          ))}
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <LibraryBig className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Lessons learned archive</h3>
          </div>
          <p className="text-sm leading-6 text-[#604a36]">
            Theme 1: Over-optimism on evening energy. Theme 2: Clarity improves when decisions are
            written before discussing. Theme 3: Sleep quality predicts emotional reactivity next day.
          </p>
        </Card>
        <Card className="space-y-2 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">AI reflection summary</h3>
          <p className="text-sm leading-6 text-[#604a36]">
            Your strongest journal entries identify one emotional trigger, one behavior response,
            and one design change for tomorrow. You are trending toward better boundary-setting.
          </p>
          <details className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-xs text-[#5b4432]">
            <summary className="cursor-pointer font-medium">Open suggested prompts</summary>
            Try: &quot;What was avoided today?&quot;, &quot;What did I protect?&quot;,
            &quot;What should be redesigned?&quot;.
          </details>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-2 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Editorial reflection section</h3>
          <p className="text-sm leading-6 text-[#604a36]">
            Keep each entry concrete: what happened, what it meant, what changes tomorrow.
          </p>
        </Card>
        <IllustrationPanel
          title="Reflection Editorial Illustration"
          src="/images/undraw_mindfulness_d853.svg"
        />
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_1.15fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Weekly reflection checklist</h3>
          {[
            "Capture one repeated emotional trigger",
            "Record one decision that improved clarity",
            "Identify one habit to stop next week",
            "Define one experiment for personal growth",
          ].map((item) => (
            <label key={item} className="flex items-center gap-2 border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              <input type="checkbox" className="h-3.5 w-3.5 accent-[#5a3d2b]" />
              <span>{item}</span>
            </label>
          ))}
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Theme archive by month</h3>
          {[
            "January: boundary clarity and over-commitment reduction",
            "February: energy-aware planning and recovery discipline",
            "March: decision confidence and execution consistency",
          ].map((theme) => (
            <div key={theme} className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              {theme}
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}
