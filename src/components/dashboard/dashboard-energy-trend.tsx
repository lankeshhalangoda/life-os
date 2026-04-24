"use client";

import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { useClientReady } from "@/hooks/use-client-ready";
import { useElementSize } from "@/hooks/use-element-size";
import type { EnergyPoint } from "@/types/lifeos";

export function DashboardEnergyTrendChart({ data }: { data: EnergyPoint[] }) {
  const mounted = useClientReady();
  const { ref, size } = useElementSize<HTMLDivElement>();
  const chartData = data.map((d) => ({ day: d.day, mental: d.mental, physical: d.physical }));

  if (!mounted) return <div className="h-44 w-full animate-pulse rounded-none bg-[#e5d8c8]" />;

  return (
    <div ref={ref} className="h-44 w-full min-w-0">
      {size.width > 0 && size.height > 0 ? (
        <LineChart width={size.width} height={size.height} data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#7a6049" tick={{ fontSize: 10 }} />
          <YAxis axisLine={false} tickLine={false} stroke="#7a6049" width={28} tick={{ fontSize: 10 }} domain={[60, 90]} />
          <Tooltip
            contentStyle={{
              background: "#fdfaf6",
              border: "1px solid #c9b89f",
              borderRadius: 0,
              fontSize: 12,
            }}
          />
          <Line type="monotone" dataKey="mental" name="Mental" stroke="#5b3d2a" strokeWidth={2} dot={{ r: 2, fill: "#5b3d2a" }} />
          <Line type="monotone" dataKey="physical" name="Physical" stroke="#9a7b5c" strokeWidth={1.5} dot={{ r: 2, fill: "#9a7b5c" }} />
        </LineChart>
      ) : (
        <div className="h-full w-full animate-pulse rounded-none bg-[#e5d8c8]" />
      )}
    </div>
  );
}
