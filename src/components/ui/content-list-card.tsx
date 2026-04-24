import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

/** Same list-card treatment everywhere (onboarding, what’s new, any bullet list). */
export function ContentListCard({ title, items, icon }: { title: string; items: string[]; icon?: ReactNode }) {
  return (
    <Card className="flex min-h-0 flex-col">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="text-base font-semibold text-[#2f2117]">{title}</h3>
      </div>
      <ul className="min-h-0 flex-1 space-y-2 text-sm leading-relaxed text-[#5c4532]">
        {items.map((item) => (
          <li key={item} className="border-b border-[#e8dcc9] pb-2 last:border-b-0 last:pb-0">
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
