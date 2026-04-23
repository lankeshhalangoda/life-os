"use client";

import { Calculator, Landmark, Lightbulb, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IllustrationPanel } from "@/components/ui/illustration-panel";
import { budgets } from "@/lib/data";
import { BudgetChart } from "@/components/charts/budget-chart";

export default function MoneyClarityPage() {
  return (
    <div className="page-root">
      <section>
        <Card className="space-y-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-[#7f6651]" />
            <h2 className="text-2xl font-semibold text-[#2f2117]">Money Clarity</h2>
          </div>
          <p className="text-sm text-[#7d6652]">
            Keep budgets and spending calm, visible, and grounded in runway context.
          </p>
        </Card>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.45fr_0.9fr]">
        <Card className="rounded-2xl">
          <BudgetChart data={budgets} />
        </Card>
        <Card className="space-y-3 rounded-2xl xl:sticky xl:top-16 xl:h-fit">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Monthly cashflow board</h3>
          </div>
          <p className="text-sm text-[#604a36]">Runway: 8.7 months</p>
          <p className="text-sm text-[#604a36]">Savings rate: 24%</p>
          <p className="text-sm text-[#604a36]">Top category: Housing</p>
          <p className="text-sm text-[#604a36]">Spending trend: down 4.2% vs previous month</p>
          <div className="border border-[#d2c3ae] bg-[#f3e8d9] p-3 text-xs text-[#735c47]">
            Savings priority: increase emergency reserves by $500 before discretionary upgrades.
          </div>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Spending priorities chart narrative</h3>
          <div className="space-y-2 text-sm text-[#4f3928]">
            <p>1. Protect essentials under 55% of monthly income.</p>
            <p>2. Cap variable lifestyle to preserve investment capacity.</p>
            <p>3. Increase education spend only when recovery buffer stays green.</p>
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Runway calculator</h3>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="border border-[#d2c3ae] bg-[#f3e8d9] p-3 text-sm text-[#4f3928]">
              Current reserves: $31,200
            </div>
            <div className="border border-[#d2c3ae] bg-[#f3e8d9] p-3 text-sm text-[#4f3928]">
              Burn baseline: $3,580 / month
            </div>
          </div>
          <p className="text-xs text-[#7d6652]">Scenario A (cut 8% spend): runway extends to 9.5 months.</p>
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1fr_1.1fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Savings goals planner</h3>
          {["Emergency buffer +$500", "Tax reserve +$300", "Learning fund +$150"].map((goal) => (
            <div key={goal} className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              {goal}
            </div>
          ))}
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Smart budget suggestions</h3>
          </div>
          <ul className="space-y-2 text-sm text-[#4f3928]">
            <li>- Shift two discretionary subscriptions to annual billing review.</li>
            <li>- Reduce short-notice delivery spend by meal batching.</li>
            <li>- Re-allocate 3% from experiences to strategic reserve this month.</li>
          </ul>
          <details className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-xs text-[#5b4432]">
            <summary className="cursor-pointer font-medium">View expected impact</summary>
            Suggested adjustments free an estimated $280/month for buffer growth.
          </details>
          <IllustrationPanel
            title="Money Clarity Side Illustration"
            src="/images/undraw_empty-wallet_j0kn.svg"
          />
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Monthly commitments tracker</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {[
              "Rent + utilities: paid",
              "Insurance + health: scheduled",
              "Tax reserve transfer: pending",
              "Emergency top-up: pending",
            ].map((item) => (
              <label key={item} className="flex items-center gap-2 border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
                <input type="checkbox" className="h-3.5 w-3.5 accent-[#5a3d2b]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Risk watchlist</h3>
          <p className="text-sm text-[#5b4432]">- Housing cost increase risk in next lease cycle.</p>
          <p className="text-sm text-[#5b4432]">- Irregular variable spending spikes on weekends.</p>
          <p className="text-sm text-[#5b4432]">- Training investments need quarterly cap guardrail.</p>
        </Card>
      </section>
    </div>
  );
}
