"use client";

import { Bar, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import type { EnergyPoint } from "@/types/lifeos";
import { useClientReady } from "@/hooks/use-client-ready";
import { useElementSize } from "@/hooks/use-element-size";

const tooltipStyle = {
  borderRadius: 4,
  border: "1px solid #cfbca4",
  backgroundColor: "#f9f4ea",
  fontSize: 12,
};

/** Composite daily energy vs synthetic productivity index (demo). */
export function EnergyProductivityComposed({ data }: { data: EnergyPoint[] }) {
  const mounted = useClientReady();
  const { ref, size } = useElementSize<HTMLDivElement>();
  const chartData = data.map((d, i) => ({
    day: d.day,
    energy: Math.round((d.mental + d.physical + d.emotional) / 3),
    productivity: [58, 54, 68, 86, 82, 64, 70][i] ?? 65,
  }));

  if (!mounted) return <div className="h-72 w-full animate-pulse bg-[#efe3d2]" />;

  return (
    <div ref={ref} className="h-72 w-full min-w-0">
      {size.width > 0 && size.height > 0 ? (
        <ComposedChart width={size.width} height={size.height} data={chartData} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#9a8b7a" tick={{ fontSize: 11 }} />
          <YAxis yAxisId="en" axisLine={false} tickLine={false} stroke="#9a8b7a" width={36} domain={[50, 95]} tick={{ fontSize: 10 }} />
          <YAxis
            yAxisId="pr"
            orientation="right"
            axisLine={false}
            tickLine={false}
            stroke="#b5a89a"
            width={36}
            domain={[40, 100]}
            tick={{ fontSize: 10 }}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
          <Bar yAxisId="pr" dataKey="productivity" name="Productivity index" fill="#d9cec0" radius={[2, 2, 0, 0]} maxBarSize={28} />
          <Line
            yAxisId="en"
            type="monotone"
            dataKey="energy"
            name="Composite energy"
            stroke="#5a3d2b"
            strokeWidth={2.2}
            dot={{ r: 3, fill: "#5a3d2b", strokeWidth: 0 }}
          />
        </ComposedChart>
      ) : (
        <div className="h-full w-full animate-pulse bg-[#efe3d2]" />
      )}
    </div>
  );
}

/** Mental + emotional weekly trend (calm second line view). */
export function EnergyMoodCorrelationChart({ data }: { data: EnergyPoint[] }) {
  const mounted = useClientReady();
  const { ref, size } = useElementSize<HTMLDivElement>();
  const chartData = data.map((d) => ({
    day: d.day,
    emotional: d.emotional,
    mental: d.mental,
    spread: Math.abs(d.emotional - d.mental),
  }));

  if (!mounted) return <div className="h-56 w-full animate-pulse bg-[#efe3d2]" />;

  return (
    <div ref={ref} className="h-56 w-full min-w-0">
      {size.width > 0 && size.height > 0 ? (
        <LineChart width={size.width} height={size.height} data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#9a8b7a" tick={{ fontSize: 11 }} />
          <YAxis axisLine={false} tickLine={false} stroke="#9a8b7a" width={32} domain={[60, 95]} tick={{ fontSize: 10 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Line type="monotone" dataKey="mental" name="Mental" stroke="#5a3d2b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="emotional" name="Emotional" stroke="#8b9a7e" strokeWidth={2} dot={false} />
        </LineChart>
      ) : (
        <div className="h-full w-full animate-pulse bg-[#efe3d2]" />
      )}
    </div>
  );
}
