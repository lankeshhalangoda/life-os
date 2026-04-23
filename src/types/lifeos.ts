export type EnergyPoint = {
  day: string;
  mental: number;
  physical: number;
  emotional: number;
};

export type Goal = {
  id: string;
  title: string;
  progress: number;
  milestone: string;
  habits: string[];
};

export type DecisionOption = {
  name: string;
  impact: number;
  effort: number;
  confidence: number;
  pros: string[];
  cons: string[];
};

export type BudgetCategory = {
  name: string;
  spent: number;
  budget: number;
};

export type JournalEntry = {
  date: string;
  mood: "Calm" | "Focused" | "Tired" | "Inspired";
  prompt: string;
};
