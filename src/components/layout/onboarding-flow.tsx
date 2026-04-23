"use client";

import { useSyncExternalStore, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function OnboardingFlow() {
  const [dismissed, setDismissed] = useState(false);
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const open =
    isClient && !dismissed && window.localStorage.getItem("lifeos-onboarded") !== "true";

  const handleClose = () => {
    window.localStorage.setItem("lifeos-onboarded", "true");
    setDismissed(true);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-[#2f2117]/25 p-4">
      <div className="w-full max-w-lg">
        <Card className="space-y-4 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-[#2f2117]">Welcome to your LifeOS cockpit</h2>
          <p className="text-sm leading-6 text-[#604a36]">
            In five minutes you can set daily priorities, compare hard decisions, protect your energy,
            and get AI-guided next actions. Start with one priority, then open the command palette with{" "}
            <span className="rounded-sm bg-[#efe3d2] px-1.5 py-0.5 text-xs">Cmd/Ctrl + K</span>.
          </p>
          <div className="space-y-2 rounded-xl border border-[#d4c3ad] bg-[#f3e8d9] p-3 text-xs text-[#735c47]">
            <p>1) Dashboard: understand your day in one glance.</p>
            <p>2) Decisions Lab: score options with weighted outcomes.</p>
            <p>3) Focus + Reflection: execute deeply and learn daily.</p>
          </div>
          <div className="flex items-center justify-end">
            <Button onClick={handleClose}>Start guided walkthrough</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
