"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeDollarSign,
  CalendarRange,
  CheckCircle2,
  Coins,
  Landmark,
  Lightbulb,
  PiggyBank,
  Target,
  TrendingDown,
} from "lucide-react";
import { budgets } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BudgetChart } from "@/components/charts/budget-chart";

const monthlyCashTrend = [
  { month: "Jan", inflow: 6900, outflow: 4920 },
  { month: "Feb", inflow: 7100, outflow: 5100 },
  { month: "Mar", inflow: 7360, outflow: 5220 },
  { month: "Apr", inflow: 7520, outflow: 5350 },
  { month: "May", inflow: 7740, outflow: 5480 },
  { month: "Jun", inflow: 8060, outflow: 5610 },
] as const;

const subscriptions = [
  { name: "Streaming bundle", monthly: 28, status: "review" },
  { name: "Design tooling", monthly: 54, status: "keep" },
  { name: "Cloud storage", monthly: 14, status: "keep" },
  { name: "Fitness app suite", monthly: 22, status: "review" },
  { name: "Newsletter stack", monthly: 31, status: "cancel-candidate" },
] as const;

const financialGoals = [
  { goal: "Emergency fund target", current: 18200, target: 24000 },
  { goal: "Tax reserve", current: 6900, target: 9000 },
  { goal: "Travel sinking fund", current: 1450, target: 3000 },
] as const;

const debtPlan = [
  { debt: "Student loan", balance: 8200, apr: 4.2, payment: 420 },
  { debt: "Credit line", balance: 3100, apr: 12.9, payment: 260 },
] as const;

const investmentAllocation = [
  { bucket: "Global equities", pct: 52 },
  { bucket: "Bonds / cash equivalents", pct: 21 },
  { bucket: "Retirement index funds", pct: 19 },
  { bucket: "Opportunity cash", pct: 8 },
] as const;

function currency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}

export function MoneyClarityWorkspace() {
  const [savingsContribution, setSavingsContribution] = useState(1400);
  const [monthlySpendTarget, setMonthlySpendTarget] = useState(5600);
  const [incomeAdjustment, setIncomeAdjustment] = useState(0);

  const latest = monthlyCashTrend[monthlyCashTrend.length - 1]!;
  const inflow = latest.inflow + incomeAdjustment;
  const outflow = monthlySpendTarget;
  const netCashFlow = inflow - outflow;
  const savingsRate = Math.max(0, Math.round((savingsContribution / inflow) * 100));

  const liquidReserves = 48900;
  const runwayMonths = (liquidReserves / outflow).toFixed(1);

  const disciplineScore = useMemo(() => {
    const budgetBreaches = budgets.filter((b) => b.spent > b.budget).length;
    const subscriptionDrag = subscriptions.filter((s) => s.status !== "keep").length * 2;
    return Math.max(40, Math.min(97, 88 - budgetBreaches * 4 - subscriptionDrag));
  }, []);

  const projectedRunway = useMemo(() => {
    const adjustedOutflow = Math.max(3000, monthlySpendTarget - 220);
    return (liquidReserves / adjustedOutflow).toFixed(1);
  }, [monthlySpendTarget]);

  const totalDebt = debtPlan.reduce((acc, d) => acc + d.balance, 0);
  const debtFreeMonths = Math.ceil(totalDebt / debtPlan.reduce((acc, d) => acc + d.payment, 0));

  const recommendations = useMemo(() => {
    const reduceTarget = subscriptions
      .filter((s) => s.status !== "keep")
      .reduce((acc, s) => acc + s.monthly, 0);
    const savingsLift = Math.max(0, Math.round((inflow * 0.24 - savingsContribution) / 10) * 10);
    return [
      `Reduce recurring tools by ${currency(reduceTarget)} monthly to remove low-value subscription drag.`,
      `Increase savings transfer by ${currency(savingsLift)} to hit a 24% target rate.`,
      `At current spend target, runway improves from ${runwayMonths} to ${projectedRunway} months with a $220 trim.`,
    ];
  }, [inflow, projectedRunway, runwayMonths, savingsContribution]);

  const maxTrend = Math.max(...monthlyCashTrend.map((m) => Math.max(m.inflow, m.outflow)));

  return (
    <div className="space-y-10 pb-10 text-[#2f2117]">
      <header className="rounded-none border border-[#cfbca4] bg-gradient-to-b from-[#f8f1e6] to-[#f0e3d2] px-4 py-5 sm:px-5">
        <div className="grid gap-4 border border-[#cfbca4] bg-[#fdf9f3] p-4 md:grid-cols-[minmax(0,1fr)_220px] md:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8f7862]">Money Clarity</p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Personal finance command center</h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#5f4733]">
              Calm visibility over cash flow, runway, and strategic allocation decisions.
            </p>
          </div>
          <div className="relative h-28">
            <Image src="/images/undraw_empty-wallet_j0kn.svg" alt="Finance operations visual" fill className="object-contain" sizes="220px" />
          </div>
        </div>

        <div className="mt-4 grid divide-y divide-[#cfc0ae] border border-[#cfc0ae] bg-[#fdf9f3] md:grid-cols-4 md:divide-x md:divide-y-0">
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Net cash flow</p>
            <p className="mt-1 text-3xl font-light tabular-nums text-[#1f1610]">{currency(netCashFlow)}</p>
            <p className="mt-1 text-xs text-[#6f5641]">Inflow minus monthly target spend</p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Savings rate</p>
            <p className="mt-1 text-3xl font-light tabular-nums text-[#1f1610]">{savingsRate}%</p>
            <div className="mt-2 h-1.5 bg-[#e8dcc9]">
              <div className="h-full bg-[#5a3d2b]" style={{ width: `${Math.min(100, savingsRate)}%` }} />
            </div>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Runway months</p>
            <p className="mt-1 text-3xl font-light tabular-nums text-[#1f1610]">{runwayMonths}</p>
            <p className="mt-1 text-xs text-[#6f5641]">Based on {currency(liquidReserves)} liquid reserves</p>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8f7862]">Spending discipline</p>
            <p className="mt-1 text-3xl font-light tabular-nums text-[#1f1610]">{disciplineScore}</p>
            <p className="mt-1 text-xs text-[#6f5641]">Composite of budget variance and recurring drag</p>
          </div>
        </div>
      </header>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="flow">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="flow" className="text-lg font-semibold tracking-tight">
            Monthly inflow / outflow trend
          </h2>
          <p className="mt-1 text-sm text-[#6f5641]">Trend graph + forecast controls to test income and spend assumptions.</p>
        </div>

        <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
          <div className="bg-[#fdf9f3] px-4 py-5 lg:col-span-8 sm:px-5">
            <div className="space-y-3">
              {monthlyCashTrend.map((m) => (
                <div key={m.month}>
                  <div className="mb-1 flex items-center justify-between text-xs text-[#6f5641]">
                    <span className="font-mono">{m.month}</span>
                    <span>
                      {currency(m.inflow)} in / {currency(m.outflow)} out
                    </span>
                  </div>
                  <div className="flex h-3 overflow-hidden bg-[#e8dcc9]">
                    <div className="bg-[#6b8f5e]" style={{ width: `${(m.inflow / maxTrend) * 100}%` }} />
                    <div className="bg-[#9a6b5a]" style={{ width: `${(m.outflow / maxTrend) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#f1e4d2] px-4 py-5 lg:col-span-4 sm:px-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">Forecast module</h3>
            <div className="mt-3 space-y-3">
              <label className="block text-xs text-[#6f5641]">
                Income adjustment ({currency(incomeAdjustment)})
                <input
                  type="range"
                  min={-1200}
                  max={1600}
                  step={100}
                  value={incomeAdjustment}
                  onChange={(e) => setIncomeAdjustment(Number(e.target.value))}
                  className="mt-1 w-full accent-[#5a3d2b]"
                />
              </label>
              <label className="block text-xs text-[#6f5641]">
                Spend target ({currency(monthlySpendTarget)})
                <input
                  type="range"
                  min={4200}
                  max={7400}
                  step={100}
                  value={monthlySpendTarget}
                  onChange={(e) => setMonthlySpendTarget(Number(e.target.value))}
                  className="mt-1 w-full accent-[#5a3d2b]"
                />
              </label>
              <label className="block text-xs text-[#6f5641]">
                Savings transfer ({currency(savingsContribution)})
                <input
                  type="range"
                  min={400}
                  max={2600}
                  step={50}
                  value={savingsContribution}
                  onChange={(e) => setSavingsContribution(Number(e.target.value))}
                  className="mt-1 w-full accent-[#5a3d2b]"
                />
              </label>
            </div>
            <div className="mt-4 border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2 text-sm text-[#4f3928]">
              Forecast net: <strong>{currency(netCashFlow)}</strong>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-7" aria-labelledby="category-breakdown">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="category-breakdown" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Category spending + budget planner
            </h2>
          </div>
          <div className="px-4 py-4 sm:px-5">
            <BudgetChart data={budgets} />
          </div>
        </section>

        <section className="bg-[#f1e4d2] lg:col-span-5" aria-labelledby="subscriptions">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="subscriptions" className="text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              Subscriptions tracker
            </h2>
          </div>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#cfc0ae] text-left text-[11px] uppercase tracking-[0.1em] text-[#8f7862]">
                <th className="px-4 py-2.5 font-medium sm:px-5">Service</th>
                <th className="px-2 py-2.5 font-medium text-right">{currency(0).replace("$0", "Monthly")}</th>
                <th className="px-4 py-2.5 font-medium text-right sm:px-5">Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s.name} className="border-b border-[#e8dcc9] last:border-b-0">
                  <td className="px-4 py-3 text-[#4f3928] sm:px-5">{s.name}</td>
                  <td className="px-2 py-3 text-right font-mono text-xs text-[#6f5641]">{currency(s.monthly)}</td>
                  <td className="px-4 py-3 text-right sm:px-5">
                    <span
                      className={cn(
                        "rounded-none border px-2 py-0.5 text-[10px] uppercase tracking-wide",
                        s.status === "keep" && "border-[#6b8f5e] bg-[#e8f0e4] text-[#3d5a32]",
                        s.status === "review" && "border-[#b58a64] bg-[#f6ecd9] text-[#7a5a3e]",
                        s.status === "cancel-candidate" && "border-[#9a6b5a] bg-[#f4e3df] text-[#7b4d40]",
                      )}
                    >
                      {s.status.replace("-", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <div className="grid gap-px bg-[#cfc0ae] lg:grid-cols-12">
        <section className="bg-[#f8f1e6] lg:col-span-4" aria-labelledby="goals">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="goals" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Target className="h-4 w-4 text-[#7f6651]" aria-hidden />
              Financial goals
            </h2>
          </div>
          <ul className="divide-y divide-[#e8dcc9]">
            {financialGoals.map((g) => {
              const pct = Math.round((g.current / g.target) * 100);
              return (
                <li key={g.goal} className="px-4 py-3 sm:px-5">
                  <p className="text-sm font-medium text-[#2f2117]">{g.goal}</p>
                  <div className="mt-2 h-1.5 bg-[#e8dcc9]">
                    <div className="h-full bg-[#5a3d2b]" style={{ width: `${Math.min(100, pct)}%` }} />
                  </div>
                  <p className="mt-1 text-xs text-[#6f5641]">
                    {currency(g.current)} / {currency(g.target)} ({pct}%)
                  </p>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="bg-[#f3e8d9] lg:col-span-4" aria-labelledby="emergency-debt">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="emergency-debt" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <PiggyBank className="h-4 w-4 text-[#7f6651]" aria-hidden />
              Emergency + debt plan
            </h2>
          </div>
          <div className="space-y-4 px-4 py-4 sm:px-5">
            <div className="rounded-none border border-[#cfbca4] bg-[#fdf9f3] px-3 py-2 text-sm text-[#4f3928]">
              Emergency fund completion: <strong>{Math.round((18200 / 24000) * 100)}%</strong>
            </div>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#cfc0ae] text-[11px] uppercase tracking-[0.1em] text-[#8f7862]">
                  <th className="py-2 text-left font-medium">Debt</th>
                  <th className="py-2 text-right font-medium">Balance</th>
                  <th className="py-2 text-right font-medium">APR</th>
                </tr>
              </thead>
              <tbody>
                {debtPlan.map((d) => (
                  <tr key={d.debt} className="border-b border-[#e8dcc9] last:border-b-0">
                    <td className="py-2.5 text-[#4f3928]">{d.debt}</td>
                    <td className="py-2.5 text-right font-mono text-xs text-[#6f5641]">{currency(d.balance)}</td>
                    <td className="py-2.5 text-right font-mono text-xs text-[#6f5641]">{d.apr}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-xs text-[#6f5641]">Debt-free projection: ~{debtFreeMonths} months at current payment pace.</p>
          </div>
        </section>

        <section className="bg-[#f1e4d2] lg:col-span-4" aria-labelledby="investments">
          <div className="border-b border-[#cfc0ae] px-4 py-3 sm:px-5">
            <h2 id="investments" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#8f7862]">
              <Landmark className="h-4 w-4 text-[#7f6651]" aria-hidden />
              Investment allocation
            </h2>
          </div>
          <ul className="space-y-3 px-4 py-4 sm:px-5">
            {investmentAllocation.map((item) => (
              <li key={item.bucket}>
                <div className="mb-1 flex items-center justify-between text-xs text-[#6f5641]">
                  <span>{item.bucket}</span>
                  <span className="font-mono">{item.pct}%</span>
                </div>
                <div className="h-2 bg-[#e8dcc9]">
                  <div className="h-full bg-[#5a3d2b]" style={{ width: `${item.pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="rounded-none border border-[#cfbca4] bg-[#ebe0d0]" aria-labelledby="smart-recs">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="smart-recs" className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <Lightbulb className="h-4 w-4 text-[#5a3d2b]" aria-hidden />
            Smart recommendations
          </h2>
          <p className="mt-1 text-sm text-[#6f5641]">Strategic actions based on your current finance model and forecast sliders.</p>
        </div>
        <ol className="space-y-3 px-4 py-4 sm:px-5">
          {recommendations.map((rec, idx) => (
            <li key={rec} className="rounded-none border border-[#cfbca4] bg-[#f8f1e6] px-3 py-2.5 text-sm text-[#4f3928]">
              <span className="mr-2 font-mono text-xs text-[#8f7862]">{String(idx + 1).padStart(2, "0")}.</span>
              {rec}
            </li>
          ))}
        </ol>
        <div className="grid divide-y divide-[#cfc0ae] border-t border-[#cfc0ae] bg-[#f8f1e6] md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="flex items-center gap-2 px-4 py-3 text-xs text-[#6f5641] sm:px-5">
            <TrendingDown className="h-4 w-4 text-[#9a6b5a]" aria-hidden />
            Reduce avoidable recurring drag
          </div>
          <div className="flex items-center gap-2 px-4 py-3 text-xs text-[#6f5641] sm:px-5">
            <ArrowUpRight className="h-4 w-4 text-[#6b8f5e]" aria-hidden />
            Increase automated savings
          </div>
          <div className="flex items-center gap-2 px-4 py-3 text-xs text-[#6f5641] sm:px-5">
            <BadgeDollarSign className="h-4 w-4 text-[#7f6651]" aria-hidden />
            Extend runway with controlled spend
          </div>
        </div>
      </section>

      <section className="rounded-none border border-[#cfbca4] bg-[#f8f1e6]" aria-labelledby="finance-table">
        <div className="border-b border-[#cfc0ae] px-4 py-4 sm:px-5">
          <h2 id="finance-table" className="text-lg font-semibold tracking-tight">
            Finance command table
          </h2>
          <p className="mt-1 text-sm text-[#6f5641]">Operational checklist of planned moves and projected impact.</p>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[#cfc0ae] bg-[#f3e8d9] text-left text-[11px] uppercase tracking-[0.1em] text-[#8f7862]">
              <th className="px-4 py-2.5 font-medium sm:px-5">Action</th>
              <th className="px-2 py-2.5 font-medium text-right">Monthly impact</th>
              <th className="px-2 py-2.5 font-medium text-right">Runway effect</th>
              <th className="px-4 py-2.5 font-medium text-right sm:px-5">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { action: "Cancel low-value newsletters", impact: 31, runway: "+0.1 mo", status: "Ready" },
              { action: "Shift dining budget to planned meals", impact: 120, runway: "+0.3 mo", status: "In progress" },
              { action: "Raise auto-transfer to emergency fund", impact: -180, runway: "Neutral", status: "Scheduled" },
              { action: "Refinance credit line", impact: 42, runway: "+0.1 mo", status: "Research" },
            ].map((row) => (
              <tr key={row.action} className="border-b border-[#e8dcc9] last:border-b-0">
                <td className="px-4 py-3 text-[#4f3928] sm:px-5">{row.action}</td>
                <td className="px-2 py-3 text-right font-mono text-xs text-[#6f5641]">
                  {row.impact >= 0 ? "+" : ""}
                  {currency(row.impact)}
                </td>
                <td className="px-2 py-3 text-right font-mono text-xs text-[#6f5641]">{row.runway}</td>
                <td className="px-4 py-3 text-right sm:px-5">
                  <span className="rounded-none border border-[#cfbca4] bg-[#fdf9f3] px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#5f4733]">
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className="flex flex-wrap items-center gap-3 border-t border-[#cfc0ae] pt-4 text-xs text-[#6f5641]">
        <Coins className="h-4 w-4 text-[#7f6651]" aria-hidden />
        <span>Finance posture: calm and conservative.</span>
        <CheckCircle2 className="h-4 w-4 text-[#6b8f5e]" aria-hidden />
        <span>Buffer trend stable.</span>
        <AlertTriangle className="h-4 w-4 text-[#b58a64]" aria-hidden />
        <span>Watch discretionary inflation in weekends.</span>
        <CalendarRange className="h-4 w-4 text-[#7f6651]" aria-hidden />
        <span>Next review: Friday 17:00.</span>
      </footer>
    </div>
  );
}
