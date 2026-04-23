"use client";

import { useState } from "react";
import { Bot, Lightbulb, Radar, Route } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IllustrationPanel } from "@/components/ui/illustration-panel";

type Message = { role: "coach" | "you"; text: string };

const starter: Message[] = [
  {
    role: "coach",
    text: "You are carrying strong momentum this week. Would you like to optimize for clarity, execution, or recovery today?",
  },
  { role: "you", text: "Clarity. I have two major tradeoff decisions pending." },
  {
    role: "coach",
    text: "Great. Start with expected impact horizon, then confidence by evidence. I can generate a matrix from your notes.",
  },
];

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>(starter);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "you", text: input },
      { role: "coach", text: "Insight saved. I recommend creating a weighted decision card next." },
    ]);
    setInput("");
  };

  return (
    <div className="page-root">
      <section>
        <Card className="space-y-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#7f6651]" />
            <h2 className="text-2xl font-semibold text-[#2f2117]">AI Coach</h2>
          </div>
          <p className="text-sm text-[#7d6652]">
            Conversational guidance aligned with your priorities, energy patterns, and goals.
          </p>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_1.2fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Coach usage guide</h3>
          <div className="grid gap-2 text-sm text-[#4f3928]">
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Ask for trade-off analysis before major decisions.</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Request weekly synthesis every Friday.</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Use pattern detection for behavior-level adjustments.</p>
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Recent coach outcomes</h3>
          {[
            "Reduced decision cycle time by introducing a weighted matrix.",
            "Improved deep-work completion with fixed morning focus windows.",
            "Raised reflection consistency after adding evening prompts.",
          ].map((item) => (
            <div key={item} className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              {item}
            </div>
          ))}
        </Card>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.45fr_0.95fr]">
        <Card className="space-y-3 rounded-2xl min-h-[540px]">
          <h3 className="text-base font-semibold text-[#2f2117]">Chat assistant pane</h3>
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`rounded-sm border p-3 text-sm ${
                message.role === "coach"
                  ? "border-[#d2c3ae] bg-[#f3e8d9] text-[#4f3928]"
                  : "border-[#c8b49a] bg-[#f9f4ea] text-[#2f2117]"
              }`}
            >
              {message.text}
            </div>
          ))}
          <div className="mt-auto flex gap-2 pt-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for insight..."
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
            />
            <Button onClick={send}>Send</Button>
          </div>
        </Card>

        <Card className="space-y-3 rounded-2xl xl:sticky xl:top-16 xl:h-fit">
          <h3 className="text-base font-semibold text-[#2f2117]">Weekly life insights</h3>
          <p className="text-sm text-[#604a36]">- Decision confidence improved +8 this week</p>
          <p className="text-sm text-[#604a36]">- Best deep work window: 9:00 to 11:30</p>
          <p className="text-sm text-[#604a36]">- Energy dips after long context switches</p>
          <p className="text-sm text-[#604a36]">- Reflection quality rises when you journal before 20:30</p>
          <IllustrationPanel
            title="AI Coach Assistant Illustration"
            src="/images/undraw_artificial-intelligence_43qa.svg"
          />
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.15fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Radar className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Pattern detection cards</h3>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              "High-value decisions correlate with morning writing",
              "Long meetings reduce evening reflection quality",
              "Recovery days improve next-day strategic clarity",
              "Short breaks preserve emotional steadiness",
            ].map((pattern) => (
              <div key={pattern} className="border border-[#d2c3ae] bg-[#f3e8d9] p-3 text-sm text-[#4f3928]">
                {pattern}
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Action recommendations</h3>
          </div>
          {[
            "Block Monday 09:00 strategy planning",
            "Reduce Thursday context switching by 30%",
            "Anchor financial review right after weekly reflection",
            "Protect two recovery nights this week",
          ].map((item) => (
            <div key={item} className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              {item}
            </div>
          ))}
        </Card>
      </section>

      <section>
        <Card className="space-y-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <Route className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Growth roadmap summary</h3>
          </div>
          <p className="text-sm leading-6 text-[#604a36]">
            Phase 1: stabilize routines and decision hygiene. Phase 2: scale execution quality with
            tighter feedback loops. Phase 3: shift from reactive planning to strategic compounding.
          </p>
          <details className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-xs text-[#5b4432]">
            <summary className="cursor-pointer font-medium">Reveal next checkpoint</summary>
            Next checkpoint: validate consistency trend across 2 full planning cycles.
          </details>
        </Card>
      </section>
    </div>
  );
}
