"use client";

import { useEffect, useMemo, useState } from "react";
import { breakMinutes, initialTasks, workMinutes } from "@/components/focus/focus-data";
import {
  FocusAnalyticsSection,
  FocusControlsGrid,
  FocusFooter,
  FocusHero,
  FocusTimelineSection,
  FocusTimerSection,
} from "@/components/focus/focus-sections";

export function FocusWorkspace() {
  const [isWork, setIsWork] = useState(true);
  const [seconds, setSeconds] = useState(workMinutes * 60);
  const [running, setRunning] = useState(false);
  const [ambientMode, setAmbientMode] = useState("deep-night");
  const [tasks, setTasks] = useState(initialTasks);
  const [focusMusic, setFocusMusic] = useState(true);
  const [brownNoise, setBrownNoise] = useState(false);
  const [notificationBlock, setNotificationBlock] = useState(true);
  const [socialBlock, setSocialBlock] = useState(true);
  const [siteLock, setSiteLock] = useState(true);
  const [sessionGoal] = useState("Complete 2 uninterrupted deep blocks before 16:00");

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setSeconds((prev) => {
        if (prev > 0) return prev - 1;
        const nextIsWork = !isWork;
        setIsWork(nextIsWork);
        return (nextIsWork ? workMinutes : breakMinutes) * 60;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [running, isWork]);

  const totalDone = tasks.filter((t) => t.done).length;
  const productivityScore = Math.round(
    72 + totalDone * 7 - (notificationBlock ? 0 : 4) - (socialBlock ? 0 : 6) - (siteLock ? 0 : 4),
  );
  const avgSessionLength = 46;
  const bestHours = "09:00-11:30";
  const interruptionTrend = "Down 18% vs last week";

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  const motivation = useMemo(() => {
    if (totalDone >= 3) return "Execution quality is high. Protect one final block for synthesis.";
    if (totalDone >= 1) return "Momentum is established. Keep context switching at zero.";
    return "First 10 minutes decide this session. Stay with one task only.";
  }, [totalDone]);

  return (
    <div className="scroll-smooth text-[#2f2117]">
      <FocusHero sessionGoal={sessionGoal} />

      <div className="space-y-10 pb-10">
        <FocusTimerSection
          isWork={isWork}
          minutes={minutes}
          secs={secs}
          running={running}
          onToggle={() => setRunning((v) => !v)}
          onReset={() => {
            setRunning(false);
            setIsWork(true);
            setSeconds(workMinutes * 60);
          }}
          onBreak={() => {
            setIsWork(false);
            setSeconds(breakMinutes * 60);
          }}
        />

        <FocusControlsGrid
          ambientMode={ambientMode}
          setAmbientMode={setAmbientMode}
          tasks={tasks}
          toggleTask={(i) => setTasks((prev) => prev.map((t, idx) => (idx === i ? { ...t, done: !t.done } : t)))}
          toggles={[
            { label: "Mute notifications", value: notificationBlock, onChange: setNotificationBlock, kind: "block" },
            { label: "Block social apps", value: socialBlock, onChange: setSocialBlock, kind: "block" },
            { label: "Lock distractive sites", value: siteLock, onChange: setSiteLock, kind: "block" },
            { label: "Focus music", value: focusMusic, onChange: setFocusMusic, kind: "sound" },
            { label: "Brown noise layer", value: brownNoise, onChange: setBrownNoise, kind: "sound" },
          ]}
        />

        <FocusAnalyticsSection
          bestHours={bestHours}
          avgSessionLength={avgSessionLength}
          interruptionTrend={interruptionTrend}
          productivityScore={productivityScore}
        />

        <FocusTimelineSection motivation={motivation} totalDone={totalDone} />
        <FocusFooter />
      </div>
    </div>
  );
}
