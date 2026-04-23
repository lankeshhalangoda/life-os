"use client";

import { Area, AreaChart, Bar, BarChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, RadialBar, RadialBarChart, Tooltip, XAxis, YAxis } from "recharts";
import { useClientReady } from "@/hooks/use-client-ready";
import { useElementSize } from "@/hooks/use-element-size";
import { cn } from "@/lib/utils";

const focusTrend = [
  { day: "Mon", focus: 61, completion: 58 },
  { day: "Tue", focus: 54, completion: 52 },
  { day: "Wed", focus: 68, completion: 64 },
  { day: "Thu", focus: 78, completion: 73 },
  { day: "Fri", focus: 75, completion: 71 },
  { day: "Sat", focus: 66, completion: 60 },
  { day: "Sun", focus: 70, completion: 67 },
];

const habitMomentum = [
  { habit: "Sleep", score: 84 },
  { habit: "Planning", score: 78 },
  { habit: "Focus", score: 82 },
  { habit: "Movement", score: 73 },
  { habit: "Reflection", score: 88 },
];

const lifeWheel = [{ score: 79, full: 100 }];

export function DashboardAreaChart() {
  const mounted = useClientReady();
  const { ref, size } = useElementSize<HTMLDivElement>();
  if (!mounted) return <div className="h-56 w-full animate-pulse rounded-xl bg-[#f1e4d2]" />;
  return (
    <div ref={ref} className="h-56 w-full min-w-0">
      {size.width > 0 && size.height > 0 ? (
        <AreaChart width={size.width} height={size.height} data={focusTrend}>
          <defs>
            <linearGradient id="focusGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#5b3d2a" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#5b3d2a" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#8f7862" />
          <YAxis axisLine={false} tickLine={false} stroke="#8f7862" />
          <Tooltip />
          <Area type="monotone" dataKey="focus" stroke="#5b3d2a" fillOpacity={1} fill="url(#focusGradient)" strokeWidth={2.2} />
        </AreaChart>
      ) : (
        <div className="h-full w-full animate-pulse rounded-xl bg-[#f1e4d2]" />
      )}
    </div>
  );
}

export function HabitBarChart() {
  const mounted = useClientReady();
  const { ref, size } = useElementSize<HTMLDivElement>();
  if (!mounted) return <div className="h-52 w-full animate-pulse rounded-xl bg-[#f1e4d2]" />;
  return (
    <div ref={ref} className="h-52 w-full min-w-0">
      {size.width > 0 && size.height > 0 ? (
        <BarChart width={size.width} height={size.height} data={habitMomentum}>
          <XAxis dataKey="habit" axisLine={false} tickLine={false} stroke="#8f7862" />
          <YAxis axisLine={false} tickLine={false} stroke="#8f7862" />
          <Tooltip />
          <Bar dataKey="score" fill="#7a5a41" radius={[6, 6, 0, 0]} />
        </BarChart>
      ) : (
        <div className="h-full w-full animate-pulse rounded-xl bg-[#f1e4d2]" />
      )}
    </div>
  );
}

export function LifeWheelChart({ className }: { className?: string }) {
  const mounted = useClientReady();
  const { ref, size } = useElementSize<HTMLDivElement>();
  if (!mounted) return <div className="h-44 w-full animate-pulse rounded-xl bg-[#f1e4d2]" />;
  return (
    <div ref={ref} className={cn("relative h-44 w-full min-w-0", className)}>
      {size.width > 0 && size.height > 0 ? (
        <RadialBarChart
          width={size.width}
          height={size.height}
          innerRadius="64%"
          outerRadius="96%"
          data={lifeWheel}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar dataKey="full" fill="#e8d8c4" cornerRadius={10} />
          <RadialBar dataKey="score" fill="#5b3d2a" cornerRadius={10} />
          <Tooltip />
        </RadialBarChart>
      ) : (
        <div className="h-full w-full animate-pulse rounded-xl bg-[#f1e4d2]" />
      )}
      <div className="pointer-events-none absolute inset-0 grid place-items-center">
        <div className="text-center">
          <p className="text-2xl font-semibold text-[#3b2a1e]">79</p>
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#7f6651]">health</p>
        </div>
      </div>
    </div>
  );
}

export function RadarQualityChart() {
  const mounted = useClientReady();
  const { ref, size } = useElementSize<HTMLDivElement>();
  if (!mounted) return <div className="h-56 w-full animate-pulse rounded-xl bg-[#f1e4d2]" />;
  return (
    <div ref={ref} className="h-56 w-full min-w-0">
      {size.width > 0 && size.height > 0 ? (
        <RadarChart
          width={size.width}
          height={size.height}
          data={[
            { metric: "Clarity", score: 83 },
            { metric: "Focus", score: 79 },
            { metric: "Energy", score: 76 },
            { metric: "Money", score: 72 },
            { metric: "Goals", score: 81 },
            { metric: "Growth", score: 85 },
          ]}
        >
          <PolarGrid stroke="#d8c8b3" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: "#6e543f", fontSize: 11 }} />
          <Radar dataKey="score" fill="#7a5a41" fillOpacity={0.33} stroke="#5b3d2a" />
        </RadarChart>
      ) : (
        <div className="h-full w-full animate-pulse rounded-xl bg-[#f1e4d2]" />
      )}
    </div>
  );
}
