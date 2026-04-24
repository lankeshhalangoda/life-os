import { Brain, MoonStar, Waves } from "lucide-react";

export const workMinutes = 50;
export const breakMinutes = 10;

export const initialTasks = [
  { title: "Finalize Q2 roadmap draft", done: false },
  { title: "Deep review architecture notes", done: false },
  { title: "Write release decision memo", done: false },
];

export const completedSessions = [
  { time: "09:00-09:50", focus: "Roadmap architecture", score: 91 },
  { time: "11:10-12:00", focus: "Decision synthesis", score: 88 },
  { time: "14:30-15:20", focus: "Launch copy polish", score: 84 },
  { time: "16:10-17:00", focus: "Finance review prep", score: 86 },
] as const;

export const ambientModes = [
  { id: "deep-night", label: "Deep Night", icon: MoonStar },
  { id: "clean-air", label: "Clean Air", icon: Waves },
  { id: "studio", label: "Studio Minimal", icon: Brain },
] as const;
