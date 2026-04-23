"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { navItems } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return navItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-[#2f2117]/30 p-4 pt-24" onClick={onClose}>
      <Card className="w-full max-w-xl rounded-2xl p-3" onClick={(e) => e.stopPropagation()}>
        <div className="mb-3 flex items-center gap-2 border-b border-[#d2c3ae] pb-3">
          <Search className="h-4 w-4 text-[#7e6753]" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Jump to module..."
            className="border-0 bg-transparent p-0 focus:border-0"
          />
        </div>
        <div className="space-y-1">
          {filtered.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-[#402d20] hover:bg-[#efe3d2]"
            >
              <span>{item.label}</span>
              <span className="text-xs text-[#8f7862]">Enter</span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
