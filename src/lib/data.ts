import type { BudgetCategory, DecisionOption, EnergyPoint, Goal, JournalEntry } from "@/types/lifeos";

export const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Decisions Lab", href: "/decisions-lab" },
  { label: "Energy Tracker", href: "/energy-tracker" },
  { label: "Goals Engine", href: "/goals-engine" },
  { label: "Money Clarity", href: "/money-clarity" },
  { label: "Reflection Journal", href: "/reflection-journal" },
  { label: "Focus Mode", href: "/focus-mode" },
  { label: "AI Coach", href: "/ai-coach" },
];

export const priorities = [
  "Finalize the LifeOS onboarding launch checklist before 13:00",
  "Score the top product decision with a 5-factor matrix",
  "Protect two 90-minute focus blocks for roadmap execution",
  "Complete evening reflection and queue tomorrow's top three outcomes",
];

export const upcomingDecisions = [
  { title: "Accept advisory partnership terms", due: "Today 17:30" },
  { title: "Choose pricing test cohort size", due: "Tomorrow 10:00" },
  { title: "Commit to July travel budget cap", due: "Saturday" },
  { title: "Decide podcast production cadence", due: "Monday" },
];

export const energyData: EnergyPoint[] = [
  { day: "Mon", mental: 78, physical: 69, emotional: 74 },
  { day: "Tue", mental: 71, physical: 63, emotional: 68 },
  { day: "Wed", mental: 80, physical: 72, emotional: 76 },
  { day: "Thu", mental: 86, physical: 76, emotional: 82 },
  { day: "Fri", mental: 82, physical: 74, emotional: 79 },
  { day: "Sat", mental: 73, physical: 78, emotional: 81 },
  { day: "Sun", mental: 77, physical: 80, emotional: 83 },
];

export const goals: Goal[] = [
  {
    id: "g1",
    title: "Grow LifeOS to 50 active pilot users",
    progress: 64,
    milestone: "35 active weekly users by end of month",
    habits: ["2 user interviews each week", "Ship one UX improvement daily", "Weekly retention review"],
  },
  {
    id: "g2",
    title: "Build energy-stable personal schedule",
    progress: 58,
    milestone: "4 straight weeks with recovery score above 75",
    habits: ["Sleep before 11:00 PM", "Morning walk before 08:30", "No meetings before 10:00"],
  },
];

export const decisionOptions: DecisionOption[] = [
  {
    name: "Option A: Full-time product operator role",
    impact: 88,
    effort: 76,
    confidence: 70,
    pros: ["Maximum skill compounding", "High mission alignment", "Fast leadership growth"],
    cons: ["Less schedule flexibility", "Higher weekly cognitive load"],
  },
  {
    name: "Option B: Independent advisory portfolio",
    impact: 74,
    effort: 56,
    confidence: 82,
    pros: ["Revenue stability across clients", "Control over weekly calendar", "Lower downside risk"],
    cons: ["Fragmented strategic focus", "Lower long-term equity upside"],
  },
  {
    name: "Option C: Hybrid operator plus advisory",
    impact: 84,
    effort: 68,
    confidence: 77,
    pros: ["Balanced upside and flexibility", "Broader network effects", "Optionality across outcomes"],
    cons: ["Coordination complexity", "Requires strong boundary discipline"],
  },
];

export const budgets: BudgetCategory[] = [
  { name: "Housing", spent: 1480, budget: 1550 },
  { name: "Food", spent: 520, budget: 620 },
  { name: "Health", spent: 240, budget: 320 },
  { name: "Learning", spent: 180, budget: 260 },
  { name: "Ops", spent: 210, budget: 240 },
  { name: "Leisure", spent: 290, budget: 360 },
];

export const journalHistory: JournalEntry[] = [
  {
    date: "Today",
    mood: "Focused",
    prompt: "What decision reduced noise and improved execution quality?",
  },
  {
    date: "Yesterday",
    mood: "Calm",
    prompt: "Where did I protect energy boundaries successfully?",
  },
  {
    date: "Tuesday",
    mood: "Inspired",
    prompt: "What insight changed how I plan this week?",
  },
  {
    date: "Monday",
    mood: "Tired",
    prompt: "Which commitment looked urgent but was not valuable?",
  },
];

export const weeklyInsightBullets = [
  "Decision clarity improved 13% after using weighted criteria before conversations.",
  "Focus completion is strongest in the 09:00-11:30 window with notifications blocked.",
  "Energy stability rises when total context switches stay below four major domains daily.",
];
