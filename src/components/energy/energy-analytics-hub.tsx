"use client";

import { compositeToday } from "@/components/energy/energy-analytics-data";
import {
  CheckinSection,
  EnergyHeroCard,
  HabitsSection,
  InsightsSection,
  ProductivitySection,
  StressHeatmapSection,
  WeeklyRhythmSection,
} from "@/components/energy/energy-analytics-sections";

export function EnergyAnalyticsHub() {
  const todayComposite = compositeToday();

  return (
    <div className="scroll-smooth text-[#2f2117]">
      <EnergyHeroCard todayComposite={todayComposite} />

      <div className="space-y-10 px-3 pb-12 sm:px-4">
        <WeeklyRhythmSection />
        <ProductivitySection />
        <StressHeatmapSection />
        <HabitsSection />
        <CheckinSection />
        <InsightsSection />
      </div>
    </div>
  );
}
