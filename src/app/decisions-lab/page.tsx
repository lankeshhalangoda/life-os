"use client";

import { useState } from "react";
import { Bot, Scale, SlidersHorizontal, Table2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { IllustrationPanel } from "@/components/ui/illustration-panel";
import { decisionOptions } from "@/lib/data";

export default function DecisionsLabPage() {
  const [riskWeight, setRiskWeight] = useState(50);
  const matrixCriteria = [
    { key: "upside", label: "12-month upside", weight: 0.18 },
    { key: "cashflow", label: "Cashflow reliability", weight: 0.14 },
    { key: "learning", label: "Skill compounding", weight: 0.16 },
    { key: "optionality", label: "Future optionality", weight: 0.12 },
    { key: "energyFit", label: "Energy sustainability", weight: 0.12 },
    { key: "execution", label: "Execution complexity", weight: 0.1 },
    { key: "network", label: "Strategic network value", weight: 0.08 },
    { key: "reversibility", label: "Reversibility if wrong", weight: 0.1 },
  ] as const;

  const criteriaScores: Record<string, [number, number, number]> = {
    upside: [92, 74, 85],
    cashflow: [65, 91, 82],
    learning: [95, 78, 88],
    optionality: [70, 86, 92],
    energyFit: [62, 84, 78],
    execution: [58, 83, 68],
    network: [88, 76, 84],
    reversibility: [60, 90, 80],
  };

  const options = decisionOptions.slice(0, 3);
  const optionScores = options.map((_, optionIndex) =>
    Math.round(
      matrixCriteria.reduce((acc, criterion) => {
        const baseWeight = criterion.weight;
        const riskAdjustedWeight =
          criterion.key === "reversibility"
            ? baseWeight * (1 + (riskWeight - 50) / 120)
            : criterion.key === "upside"
              ? baseWeight * (1 - (riskWeight - 50) / 180)
              : baseWeight;
        return acc + criteriaScores[criterion.key][optionIndex] * riskAdjustedWeight;
      }, 0),
    ),
  );

  const highestScoreIndex = optionScores.indexOf(Math.max(...optionScores));
  const recommendation =
    options[highestScoreIndex]?.name ?? "Option C: Hybrid 4-day operator + advisory";

  return (
    <div className="page-root">
      <section>
        <Card className="space-y-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Scale className="h-5 w-5 text-[#7f6651]" />
            <h2 className="text-2xl font-semibold text-[#2f2117]">Decisions Lab</h2>
          </div>
          <p className="text-sm text-[#7d6652]">
            Weighted comparison with explicit trade-offs, confidence evidence, and recommendation
            outputs.
          </p>
        </Card>
      </section>

      <section className="grid gap-3 xl:grid-cols-[1.45fr_0.95fr]">
        <Card className="overflow-x-auto rounded-2xl">
          <div className="mb-3 flex items-center gap-2">
            <Table2 className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-sm font-semibold text-[#2f2117]">Decision comparison matrix (8 criteria)</h3>
          </div>
          <table className="w-full min-w-[860px] text-sm">
            <thead className="text-left text-[#7d6652]">
              <tr className="border-b border-[#d2c3ae]">
                <th className="py-2 font-medium">Criteria</th>
                <th className="py-2 font-medium">Weight</th>
                <th className="py-2 font-medium">{options[0]?.name}</th>
                <th className="py-2 font-medium">{options[1]?.name}</th>
                <th className="py-2 font-medium">{options[2]?.name}</th>
                <th className="py-2 font-medium">Top option</th>
              </tr>
            </thead>
            <tbody>
              {matrixCriteria.map((criterion) => {
                const scores = criteriaScores[criterion.key];
                const winnerIndex = scores.indexOf(Math.max(...scores));
                return (
                  <tr key={criterion.key} className="border-b border-[#e1d5c5] text-[#4f3928]">
                    <td className="py-3 font-medium">{criterion.label}</td>
                    <td>{Math.round(criterion.weight * 100)}%</td>
                    <td>{scores[0]}</td>
                    <td>{scores[1]}</td>
                    <td>{scores[2]}</td>
                    <td className="text-xs text-[#6c5440]">{options[winnerIndex]?.name}</td>
                  </tr>
                );
              })}
              <tr className="bg-[#f3e8d9] font-semibold text-[#3f2d20]">
                <td className="py-3">Weighted total</td>
                <td>100%</td>
                <td>{optionScores[0]}</td>
                <td>{optionScores[1]}</td>
                <td>{optionScores[2]}</td>
                <td>{recommendation}</td>
                </tr>
            </tbody>
          </table>
        </Card>
        <Card className="space-y-4 rounded-2xl xl:sticky xl:top-16 xl:h-fit">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">Decision profile</h3>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={riskWeight}
            onChange={(e) => setRiskWeight(Number(e.target.value))}
            className="w-full accent-[#5a3d2b]"
          />
          <p className="text-sm text-[#7d6652]">Risk tolerance weighting: {riskWeight}%</p>
          <div className="border border-[#d2c3ae] bg-[#f3e8d9] p-3">
            <p className="text-xs uppercase tracking-[0.08em] text-[#7d6652]">System recommendation</p>
            <p className="mt-1 text-sm font-medium text-[#3b2a1e]">{recommendation}</p>
          </div>
          <IllustrationPanel
            title="Decisions Side Illustration"
            src="/images/undraw_thought-process_ze2r.svg"
          />
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.15fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Pros / cons evidence board</h3>
          <div className="grid gap-2 md:grid-cols-2">
            {decisionOptions.map((option) => (
              <div key={option.name} className="border border-[#d2c3ae] bg-[#f3e8d9] p-3">
                <p className="text-sm font-medium text-[#2f2117]">{option.name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.08em] text-[#7d6652]">Support</p>
                <ul className="mt-1 space-y-1 text-sm text-[#4f3928]">
                  {option.pros.slice(0, 2).map((pro) => (
                    <li key={pro}>+ {pro}</li>
                  ))}
                </ul>
                <p className="mt-2 text-xs uppercase tracking-[0.08em] text-[#7d6652]">Risks</p>
                <ul className="mt-1 space-y-1 text-sm text-[#4f3928]">
                  {option.cons.slice(0, 2).map((con) => (
                    <li key={con}>- {con}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Scenario outcomes</h3>
          {[
            "Best-case: Option A accelerates leadership growth with 12-month upside.",
            "Balanced-case: Option C sustains optionality while protecting cashflow.",
            "Conservative-case: Option B reduces volatility but limits scale learning.",
          ].map((row) => (
            <div key={row} className="border-l-2 border-[#5a3d2b] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              {row}
            </div>
          ))}
        </Card>
      </section>

      <section className="grid gap-3 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="space-y-2 rounded-2xl">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-[#7f6651]" />
            <h3 className="text-base font-semibold text-[#2f2117]">AI recommendation summary</h3>
          </div>
          <p className="text-sm leading-6 text-[#5b4432]">
            With current risk weighting and confidence evidence, {recommendation} offers the
            strongest strategic fit this quarter. Re-test with energy constraints before final lock.
          </p>
          <details className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-xs text-[#5b4432]">
            <summary className="cursor-pointer font-medium">Show confidence assumptions</summary>
            Confidence score prioritizes evidence density, reversibility, and expected time-to-learn.
          </details>
        </Card>
        <div className="grid gap-3 md:grid-cols-3">
        {decisionOptions.map((option) => (
            <Card key={option.name} className="space-y-3 rounded-2xl">
              <h4 className="text-base font-semibold text-[#2f2117]">{option.name}</h4>
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide text-[#7d6652]">Pros</p>
              <ul className="space-y-1 text-sm text-[#4f3928]">
                {option.pros.map((pro) => (
                  <li key={pro}>+ {pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-wide text-[#7d6652]">Cons</p>
              <ul className="space-y-1 text-sm text-[#4f3928]">
                {option.cons.map((con) => (
                  <li key={con}>- {con}</li>
                ))}
              </ul>
            </div>
            </Card>
        ))}
        </div>
      </section>

      <section className="grid gap-3 lg:grid-cols-[1.1fr_1fr]">
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Decision checklist zone</h3>
          {[
            "Have I written the downside explicitly?",
            "Did I separate data from fear?",
            "What assumptions can be tested in 7 days?",
            "Who needs to be informed after this call?",
          ].map((q) => (
            <label key={q} className="flex items-center gap-2 border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2 text-sm text-[#4f3928]">
              <input type="checkbox" className="h-3.5 w-3.5 accent-[#5a3d2b]" />
              <span>{q}</span>
            </label>
          ))}
        </Card>
        <Card className="space-y-3 rounded-2xl">
          <h3 className="text-base font-semibold text-[#2f2117]">Post-decision review notes</h3>
          <div className="grid gap-2 text-sm text-[#4f3928]">
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Decision made: Friday 16:00</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Validation window: 14 days</p>
            <p className="border border-[#d2c3ae] bg-[#f3e8d9] px-3 py-2">Success metrics: confidence trend, output quality, cashflow stability</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
