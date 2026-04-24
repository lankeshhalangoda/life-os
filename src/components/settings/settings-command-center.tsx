"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CheckCircle2,
  Clock3,
  CreditCard,
  Database,
  Fingerprint,
  Link2,
  Search,
  Shield,
  Sparkles,
  UserCircle2,
  Workflow,
} from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SettingItem = {
  id: string;
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
};

type Section = {
  id: string;
  icon: typeof UserCircle2;
  title: string;
  subtitle: string;
  rows: SettingItem[];
  custom?: ReactNode;
};

function SettingRow({ label, description, value, onChange }: SettingItem) {
  return (
    <div className="grid gap-3 border-b border-[#e8dcc9] px-4 py-3 last:border-b-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:px-5">
      <div>
        <p className="text-sm font-medium text-[#2f2117]">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-[#6f5641]">{description}</p>
      </div>
      <button
        type="button"
        onClick={() => onChange(!value)}
        aria-pressed={value}
        className={cn(
          "inline-flex h-7 w-14 items-center rounded-none border p-1 transition-colors",
          value ? "border-[#5a3d2b] bg-[#5a3d2b]" : "border-[#cfbca4] bg-[#f8f1e6]",
        )}
      >
        <span
          className={cn(
            "h-5 w-5 rounded-none bg-[#fdf9f3] transition-transform",
            value ? "translate-x-7" : "translate-x-0",
          )}
        />
      </button>
    </div>
  );
}

export function SettingsCommandCenter() {
  const [query, setQuery] = useState("");
  const [autoArchive, setAutoArchive] = useState(true);
  const [compactCalendar, setCompactCalendar] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [focusHardLock, setFocusHardLock] = useState(true);
  const [allowMobileDuringFocus, setAllowMobileDuringFocus] = useState(false);
  const [bankSync, setBankSync] = useState(true);
  const [healthSync, setHealthSync] = useState(true);
  const [shareAnalytics, setShareAnalytics] = useState(false);
  const [biometricLock, setBiometricLock] = useState(true);
  const [slackIntegration, setSlackIntegration] = useState(false);
  const [calendarIntegration, setCalendarIntegration] = useState(true);
  const [themePreview, setThemePreview] = useState<"warm" | "sepia" | "contrast">("warm");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved">("idle");

  const sections: Section[] = [
    {
      id: "account",
      icon: UserCircle2,
      title: "Account",
      subtitle: "Identity, security posture, and profile-level configuration.",
      rows: [],
      custom: (
        <div className="border-b border-[#e8dcc9] px-4 py-3 last:border-b-0 sm:px-5">
          <p className="text-sm font-medium text-[#2f2117]">Account summary</p>
          <p className="mt-1 text-xs text-[#6f5641]">Lankesh Halangoda · Pro plan · Last login 08:42</p>
        </div>
      ),
    },
    {
      id: "productivity",
      icon: Workflow,
      title: "Productivity Preferences",
      subtitle: "Default behaviors for planning and execution workflows.",
      rows: [
        {
          id: "auto-archive",
          label: "Auto-archive completed priorities",
          description: "Moves completed items out of active surfaces after 24h.",
          value: autoArchive,
          onChange: setAutoArchive,
        },
        {
          id: "compact-calendar",
          label: "Compact calendar mode",
          description: "Shows denser schedule blocks with tighter context labels.",
          value: compactCalendar,
          onChange: setCompactCalendar,
        },
      ],
    },
    {
      id: "reminders",
      icon: Bell,
      title: "Reminders",
      subtitle: "Delivery cadence for nudges and accountability prompts.",
      rows: [
        {
          id: "weekly-digest",
          label: "Weekly strategist digest",
          description: "Friday summary covering momentum, blockers, and next actions.",
          value: weeklyDigest,
          onChange: setWeeklyDigest,
        },
        {
          id: "deadline-reminders",
          label: "Upcoming deadline reminders",
          description: "Notify 24 hours and 2 hours before critical commitments.",
          value: deadlineReminders,
          onChange: setDeadlineReminders,
        },
      ],
    },
    {
      id: "focus-rules",
      icon: Clock3,
      title: "Focus Rules",
      subtitle: "Boundaries used during Focus Mode sessions.",
      rows: [
        {
          id: "focus-hard-lock",
          label: "Hard lock distracting apps",
          description: "Blocks configured distractors until focus session ends.",
          value: focusHardLock,
          onChange: setFocusHardLock,
        },
        {
          id: "mobile-focus",
          label: "Allow mobile exceptions",
          description: "Permit calls/messages from emergency contacts only.",
          value: allowMobileDuringFocus,
          onChange: setAllowMobileDuringFocus,
        },
      ],
    },
    {
      id: "data-sources",
      icon: Database,
      title: "Data Sources",
      subtitle: "Connected data feeds powering insights and recommendations.",
      rows: [
        {
          id: "bank-sync",
          label: "Bank transaction sync",
          description: "Refresh spending and cashflow data every 6 hours.",
          value: bankSync,
          onChange: setBankSync,
        },
        {
          id: "health-sync",
          label: "Health signal sync",
          description: "Import sleep and activity data for energy analytics.",
          value: healthSync,
          onChange: setHealthSync,
        },
      ],
    },
    {
      id: "privacy",
      icon: Shield,
      title: "Privacy",
      subtitle: "Controls for analytics usage and sensitive access.",
      rows: [
        {
          id: "share-analytics",
          label: "Share anonymous product analytics",
          description: "Help improve model quality with de-identified usage data.",
          value: shareAnalytics,
          onChange: setShareAnalytics,
        },
        {
          id: "biometric-lock",
          label: "Biometric lock for critical pages",
          description: "Require biometric unlock for Profile and Settings surfaces.",
          value: biometricLock,
          onChange: setBiometricLock,
        },
      ],
    },
    {
      id: "integrations",
      icon: Link2,
      title: "Integrations",
      subtitle: "External workflow links and automations.",
      rows: [
        {
          id: "slack-integration",
          label: "Slack accountability push",
          description: "Post daily commitments and completion summaries to Slack.",
          value: slackIntegration,
          onChange: setSlackIntegration,
        },
        {
          id: "calendar-integration",
          label: "Calendar sync",
          description: "Read events for planning and decision load forecasting.",
          value: calendarIntegration,
          onChange: setCalendarIntegration,
        },
      ],
    },
    {
      id: "billing",
      icon: CreditCard,
      title: "Billing",
      subtitle: "Plan status, invoices, and renewal preferences.",
      rows: [],
      custom: (
        <>
          <div className="border-b border-[#e8dcc9] px-4 py-3 sm:px-5">
            <p className="text-sm font-medium text-[#2f2117]">Current plan</p>
            <p className="mt-1 text-xs text-[#6f5641]">LifeOS Pro · $19/month · Renews May 12</p>
          </div>
          <div className="px-4 py-3 text-xs text-[#6f5641] sm:px-5">
            Next invoice preview: $19.00 · Includes AI strategist package
          </div>
        </>
      ),
    },
  ];

  const filteredSections = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sections;
    return sections.filter((s) => {
      if (s.title.toLowerCase().includes(q) || s.subtitle.toLowerCase().includes(q)) return true;
      return s.rows.some((row) => `${row.label} ${row.description}`.toLowerCase().includes(q));
    });
  }, [query, sections]);

  const save = () => {
    setSaveState("saving");
    window.setTimeout(() => {
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1700);
    }, 700);
  };

  return (
    <div className="space-y-8 pb-10 text-[#2f2117]">
      <header className="rounded-none border border-[#cfbca4] bg-gradient-to-b from-[#f8f1e6] to-[#efe2cf] px-4 py-5 sm:px-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7862]">Settings</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Configuration center</h1>
            <p className="mt-1 text-sm text-[#5f4733]">Control system behavior with clear grouped preferences and live previews.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={save}
              disabled={saveState === "saving"}
              className="rounded-none border border-[#5a3d2b] bg-[#5a3d2b] px-4 py-2 text-sm text-[#f9f4ea] disabled:opacity-70"
            >
              {saveState === "saving" ? "Saving..." : "Save Changes"}
            </button>
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-none border px-2 py-1 text-xs",
                saveState === "saved"
                  ? "border-[#6b8f5e] bg-[#e8f0e4] text-[#3d5a32]"
                  : "border-[#cfbca4] bg-[#fdf9f3] text-[#7f6651]",
              )}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {saveState === "saved" ? "Saved" : "Unsaved preview"}
            </span>
          </div>
        </div>
      </header>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="settings-search">
        <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
          <h2 id="settings-search" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
            Search settings
          </h2>
          <div className="mt-2 flex items-center gap-2 border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2">
            <Search className="h-4 w-4 text-[#8f7862]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search account, reminders, privacy, billing..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#a89882]"
            />
          </div>
        </div>

        <div className="px-4 py-3 text-xs text-[#6f5641] sm:px-5">
          Preview state: <strong>{themePreview}</strong> theme · Reminders {deadlineReminders ? "enabled" : "disabled"}
        </div>
      </section>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="theme-preview">
        <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
          <h2 id="theme-preview" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
            <Sparkles className="h-4 w-4 text-[#7f6651]" />
            Theme preview
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 px-4 py-3 sm:px-5">
          {(["warm", "sepia", "contrast"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setThemePreview(option)}
              className={cn(
                "rounded-none border px-3 py-1.5 text-xs uppercase tracking-wide",
                themePreview === option
                  ? "border-[#5a3d2b] bg-[#5a3d2b] text-[#f9f4ea]"
                  : "border-[#cfbca4] bg-[#fdf9f3] text-[#5f4733]",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        {filteredSections.map((section) => {
          const Icon = section.icon;
          return (
            <section key={section.id} className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]">
              <header className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
                <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
                  <Icon className="h-4 w-4 text-[#7f6651]" />
                  {section.title}
                </h3>
                <p className="mt-1 text-xs text-[#6f5641]">{section.subtitle}</p>
              </header>
              <div>
                {section.custom}
                {section.rows.map((row) => (
                  <SettingRow key={row.id} {...row} />
                ))}
              </div>
            </section>
          );
        })}
        {!filteredSections.length ? (
          <div className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-4 py-6 text-sm text-[#6f5641] sm:px-5">
            No settings matched your search. Try broader keywords like "privacy", "focus", or "billing".
          </div>
        ) : null}
      </div>

      <footer className="flex flex-wrap items-center gap-3 border-t border-[#cfc0ae] pt-4 text-xs text-[#6f5641]">
        <Shield className="h-4 w-4 text-[#7f6651]" />
        <span>Changes remain local until saved.</span>
        <Fingerprint className="h-4 w-4 text-[#7f6651]" />
        <span>Security-critical controls require biometric confirmation.</span>
      </footer>
    </div>
  );
}
