"use client";

import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import type { BudgetCategory } from "@/types/lifeos";
import { useClientReady } from "@/hooks/use-client-ready";
import { useElementSize } from "@/hooks/use-element-size";

export function BudgetChart({ data }: { data: BudgetCategory[] }) {
  const mounted = useClientReady();
  const { ref, size } = useElementSize<HTMLDivElement>();

  if (!mounted) {
    return <div className="h-72 w-full rounded-sm border border-[#d2c3ae] bg-[#f3e8d9]" />;
  }

  return (
    <div ref={ref} className="h-72 w-full min-w-0">
      {size.width > 0 && size.height > 0 ? (
        <BarChart width={size.width} height={size.height} data={data}>
          <XAxis dataKey="name" axisLine={false} tickLine={false} stroke="#8f7862" />
          <YAxis axisLine={false} tickLine={false} stroke="#a7937f" />
          <Tooltip
            contentStyle={{
              borderRadius: 2,
              border: "1px solid #d2c3ae",
              backgroundColor: "#f9f4ea",
            }}
          />
          <Bar dataKey="spent" fill="#5a3d2b" radius={[2, 2, 0, 0]} />
        </BarChart>
      ) : (
        <div className="h-full w-full animate-pulse rounded-xl bg-[#f1e4d2]" />
      )}
    </div>
  );
}
