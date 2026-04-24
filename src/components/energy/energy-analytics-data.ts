import { energyData } from "@/lib/data";

export const sleepQuality = { score: 82, copy: "Restorative blocks intact Tue–Thu; Sunday dip from travel." };
export const recoveryLevel = { label: "Moderate", copy: "HRV trend stable; add one passive recovery block before Friday load." };
export const peakWindow = { range: "09:30 — 11:45", copy: "Highest cognitive output when meetings start after 10:00." };

export const moodCorrelationNotes = [
  { title: "Sleep 7h+", body: "Average +11 mental index vs short-sleep days; emotional volatility drops sharply." },
  { title: "Caffeine after 15:00", body: "Next-day emotional baseline −6 to −9 pts in 4 of last 6 trials." },
  { title: "Morning light < 30 min", body: "Physical scores plateau; pairing with a short walk restores spread." },
];

export const routinesBoost = [
  { name: "Strength + mobility stack", detail: "Lower-body + 10 min breath · +9 physical, steadier PM emotional curve." },
  { name: "Planning before 08:30", detail: "Anchors mental load; fewer context switches before noon." },
  { name: "Social recovery evenings", detail: "Twice weekly · emotional rebound +6 average within 24h." },
];

export const habitsDrag = [
  { name: "Back-to-back calls >90m", impact: "Drains mental by late afternoon; emotional recovery delayed." },
  { name: "Skipping lunch movement", impact: "Physical score −5 to −8; focus quality drops hour 3–5." },
  { name: "Screens past 23:30", impact: "Sleep latency +40m avg; next-day mental ceiling capped." },
];

export const recoveryRecs = [
  "Insert a 15-minute transition between deep work and people work — reduces emotional whiplash.",
  "Batch cognitively heavy tasks into your peak window; defer logistics to post-lunch trough.",
  "Protect two low-stimulus evenings; your best reflection and planning happen there.",
];

export const stressRows = [
  { trigger: "Sleep debt", values: [2, 3, 1, 1, 0, 1, 2] },
  { trigger: "Late caffeine", values: [1, 2, 0, 3, 2, 0, 0] },
  { trigger: "Context switching", values: [3, 4, 3, 2, 4, 2, 1] },
  { trigger: "Social overload", values: [0, 1, 2, 1, 3, 4, 2] },
  { trigger: "Training load", values: [1, 1, 2, 2, 1, 0, 1] },
];

export const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const checkInLog = [
  { day: "Sun", time: "20:10", composite: 79, note: "Wind-down walk; emotional score highest of week." },
  { day: "Sat", time: "09:05", composite: 74, note: "Late start; physical still strong after sleep extension." },
  { day: "Fri", time: "07:40", composite: 81, note: "Short journal before email — mental clarity carried through AM." },
  { day: "Thu", time: "07:55", composite: 85, note: "Peak window used for strategy; avoided meeting creep." },
  { day: "Wed", time: "08:12", composite: 77, note: "Noted tension after dense afternoon; scheduled recovery block." },
  { day: "Tue", time: "07:48", composite: 69, note: "Early dip; compensated with lighter task load after 14:00." },
  { day: "Mon", time: "07:30", composite: 75, note: "Baseline check-in; flagged sleep under target." },
];

export function compositeToday() {
  const sun = energyData[energyData.length - 1];
  return Math.round((sun.mental + sun.physical + sun.emotional) / 3);
}

export function heatCellClass(v: number) {
  const tones = [
    "bg-[#f4f1ec] text-[#b0a69a]",
    "bg-[#e8dfd4]",
    "bg-[#d4c4b2]",
    "bg-[#b89b82]",
    "bg-[#8a6b52] text-[#fdfcfa]",
  ];
  return tones[Math.min(4, Math.max(0, v))] ?? tones[0];
}
