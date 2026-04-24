"use client";

import { ArrowRight, Brain, ListChecks } from "lucide-react";
import { Card } from "@/components/ui/card";
export function DailyPrioritiesCard({ items }: { items: string[] }) {
  return (
    <Card className="flex min-h-0 flex-col">
      <div className="mb-3 flex items-center gap-2">
        <Brain className="h-4 w-4 text-[#7f6651]" />
        <h3 className="text-base font-semibold text-[#2f2117]">Daily priorities workspace</h3>
      </div>
      <div className="min-h-0 flex-1 space-y-2">
        {items.map((item) => (
          <button
            key={item}
            type="button"
            className="group flex w-full items-center justify-between rounded-[var(--radius-ui)] border border-[#d3c0a9] bg-[#f3e8d9] px-3 py-2.5 text-left text-sm text-[#4f3928] shadow-[var(--shadow-ui)] transition duration-200 hover:-translate-y-px hover:border-[#b89b7c] hover:bg-[#efe4d4] active:translate-y-0 active:scale-[0.995]"
          >
            <span>{item}</span>
            <ArrowRight className="h-4 w-4 shrink-0 text-[#8f7862] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-[#5a3d2b]" />
          </button>
        ))}
      </div>
    </Card>
  );
}

export function DecisionsQueueCard({ items }: { items: { title: string; due: string }[] }) {
  return (
    <Card className="flex min-h-0 flex-col">
      <div className="mb-3 flex items-center gap-2">
        <ListChecks className="h-4 w-4 text-[#7f6651]" />
        <h3 className="text-base font-semibold text-[#2f2117]">Decisions queue</h3>
      </div>
      <div className="min-h-0 flex-1 space-y-2">
        {items.map((item) => (
          <button
            key={item.title}
            type="button"
            className="group w-full rounded-[var(--radius-ui)] border border-[#d3c0a9] bg-[#f3e8d9] px-3 py-2 text-left text-sm shadow-[var(--shadow-ui)] transition duration-200 hover:-translate-y-px hover:border-[#b89b7c] hover:bg-[#efe4d4] active:translate-y-0 active:scale-[0.995]"
          >
            <p className="font-medium text-[#4f3928]">{item.title}</p>
            <p className="text-xs text-[#7d6652]">Due {item.due}</p>
          </button>
        ))}
      </div>
    </Card>
  );
}
