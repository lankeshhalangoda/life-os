"use client";

import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EnergyPoint } from "@/types/lifeos";
import { useClientReady } from "@/hooks/use-client-ready";
import { useElementSize } from "@/hooks/use-element-size";

export function EnergyChart({ data, heightClass = "h-72" }: { data: EnergyPoint[]; heightClass?: string }) {
  const mounted = useClientReady();
  const { ref, size } = useElementSize<HTMLDivElement>();

  if (!mounted) {
    return <div className={`${heightClass} w-full rounded-sm border border-[#cfbca4] bg-[#efe3d2]`} />;
  }

  return (
    <div ref={ref} className={`${heightClass} w-full min-w-0`}>
      {size.width > 0 && size.height > 0 ? (
        <LineChart width={size.width} height={size.height} data={data}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} stroke="#8f7862" />
          <YAxis axisLine={false} tickLine={false} stroke="#a7937f" />
          <Tooltip
            contentStyle={{
              borderRadius: 2,
              border: "1px solid #d2c3ae",
              backgroundColor: "#f9f4ea",
            }}
          />
          <Line type="monotone" dataKey="mental" stroke="#5a3d2b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="physical" stroke="#7d6652" strokeWidth={2} dot={false} />
          <Line
            type="monotone"
            dataKey="emotional"
            stroke="#ad957f"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      ) : (
        <div className="h-full w-full animate-pulse rounded-sm bg-[#efe3d2]" />
      )}
    </div>
  );
}
