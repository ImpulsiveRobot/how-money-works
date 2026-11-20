"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Flame, TrendingDown, Table as TableIcon, Target, ShoppingBag } from "lucide-react";
import { BLS_CPI_DATA } from "@/data/verifiedSources";
import { ChapterHeader, Cite, MythRealityCard, useCitation } from "./CitationContext";

interface Regime {
  id: "balanced" | "demand" | "supply" | "deflation";
  label: string;
  priceResult: string;
  badgeColor: string;
  moneyTokens: number;
  goodsBoxes: number;
  summary: string;
  example: string;
}

const REGIMES: Regime[] = [
  {
    id: "balanced",
    label: "Balanced (~2% Target)",
    priceResult: "Stable +2% / yr",
    badgeColor: "bg-emerald-100 text-emerald-950",
    moneyTokens: 5,
    goodsBoxes: 5,
    summary:
      "Nominal spending and real productive capacity expand roughly together. Prices rise gently, giving businesses predictability and keeping central bank interest rates comfortably above zero.",
    example: "Typical mid-cycle expansion (e.g., mid-1990s or 2015–2019).",
  },
  {
    id: "demand",
    label: "Demand-Pull Inflation",
    priceResult: "Prices Surge (+6–9%)",
    badgeColor: "bg-red-100 text-red-950",
    moneyTokens: 9,
    goodsBoxes: 5,
    summary:
      "Too much active spending chases a fixed pool of goods and workers. Factories run at full capacity, bidding up wages, rents, and retail prices.",
    example: "Post-war spending booms or rapid fiscal + credit demand outstripping supply.",
  },
  {
    id: "supply",
    label: "Cost-Push / Supply Shock",
    priceResult: "Stagflation Risk",
    badgeColor: "bg-amber-100 text-amber-950",
    moneyTokens: 5,
    goodsBoxes: 2,
    summary:
      "Production costs spike or supply chains break—fewer real goods reach shelves even without a money-printing binge. Central banks face a painful tradeoff between taming prices and avoiding recession.",
    example: "1973 & 1979 oil shocks; 2021–2022 global shipping & energy disruptions.",
  },
  {
    id: "deflation",
    label: "Deflationary Spiral",
    priceResult: "Falling Prices (-3%)",
    badgeColor: "bg-sky-100 text-sky-950",
    moneyTokens: 2,
    goodsBoxes: 5,
    summary:
      "Consumers delay purchases expecting lower prices tomorrow, while fixed nominal debts become heavier in real terms (Fisher debt-deflation)—triggering layoffs and shrinking credit.",
    example: "U.S. Great Depression (CPI fell from 16.7 in 1930 to 14.0 in 1940).",
  },
];

export function Chapter05Inflation() {
  const [regimeId, setRegimeId] = useState<Regime["id"]>("balanced");
  const [startIdx, setStartIdx] = useState<number>(7); // Default 1971 (Nixon Shock)
  const [showTable, setShowTable] = useState<boolean>(false);
  const { animationsPaused } = useCitation();

  const regime = REGIMES.find((r) => r.id === regimeId) ?? REGIMES[0];
  const startPoint = BLS_CPI_DATA[startIdx];
  const latestPoint = BLS_CPI_DATA[BLS_CPI_DATA.length - 1]; // 2025: 321.943

  const priceMultiplier = latestPoint.cpi / startPoint.cpi;
  const equivalentCost = 100 * priceMultiplier;
  const retainedPowerPct = (startPoint.cpi / latestPoint.cpi) * 100;

  return (
    <section id="chapter-5" className="scroll-mt-20 border-t border-[#e2dacb] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ChapterHeader
          number="05"
          eyebrow="Prices, Velocity & Purchasing Power"
          title="Why Inflation Happens—and Why $100 Shrinks Over Time"
          subtitle="Inflation is not just about how much money exists; it is about the balance between how fast money is actively spent (MV) and how many real goods and services the economy can produce (PY)."
          citationIds={[7, 8]}
        />

        {/* Part A: Animated Economy Balance Simulator */}
        <div className="rounded-3xl border border-[#e2dacb] bg-white p-5 shadow-xs md:p-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#141a1f]">
                The Spending vs. Real Output Engine (MV = PY)
              </h3>
              <p className="mt-1 text-sm text-[#4b5563]">
                Switch between four macroeconomic regimes to watch how the ratio of active spending to real goods moves the price level.
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${regime.badgeColor}`}>
              {regime.priceResult}
            </span>
          </div>

          <div
            className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4"
            role="tablist"
            aria-label="Inflation regimes"
          >
            {REGIMES.map((r) => {
              const active = r.id === regimeId;
              return (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setRegimeId(r.id)}
                  className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-all ${
                    active
                      ? "border-[#141a1f] bg-[#141a1f] text-[#faf7f2] shadow-xs"
                      : "border-[#e2dacb] bg-[#faf7f2] text-[#374151] hover:bg-white"
                  }`}
                >
                  {r.label}
                </button>
              );
            })}
          </div>

          {/* Animated Token vs Goods Lanes */}
          <div className="grid gap-4 rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-5 md:grid-cols-2">
            {/* Lane 1: Active Spending (M x V) */}
            <div className="rounded-xl bg-white p-4 ring-1 ring-[#e2dacb]">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-900 uppercase">
                  Active Spending Flow (M × V)
                </span>
                <span className="font-mono text-xs font-semibold text-[#4b5563]">
                  {regime.moneyTokens} units
                </span>
              </div>
              <div className="flex min-h-[3.5rem] flex-wrap items-center gap-2 rounded-lg bg-emerald-50/70 p-3">
                {Array.from({ length: regime.moneyTokens }).map((_, idx) => (
                  <motion.div
                    key={`${regime.id}-m-${idx}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      y: animationsPaused ? 0 : [0, -3, 0],
                    }}
                    transition={{
                      scale: { duration: 0.25, delay: idx * 0.04 },
                      y: { duration: 1.8, repeat: Infinity, delay: idx * 0.12 },
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0f6e56] font-mono text-xs font-bold text-white shadow-xs"
                    aria-hidden="true"
                  >
                    $
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Lane 2: Real Goods & Services (Y) */}
            <div className="rounded-xl bg-white p-4 ring-1 ring-[#e2dacb]">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#1e3a5f] uppercase">
                  Real Goods &amp; Services Produced (Y)
                </span>
                <span className="font-mono text-xs font-semibold text-[#4b5563]">
                  {regime.goodsBoxes} units
                </span>
              </div>
              <div className="flex min-h-[3.5rem] flex-wrap items-center gap-2 rounded-lg bg-slate-100/80 p-3">
                {Array.from({ length: regime.goodsBoxes }).map((_, idx) => (
                  <motion.div
                    key={`${regime.id}-g-${idx}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e3a5f] text-white shadow-xs"
                    aria-hidden="true"
                  >
                    <ShoppingBag className="h-4 w-4" />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-2 rounded-xl bg-white p-4 text-sm ring-1 ring-[#e2dacb] sm:flex-row sm:items-center sm:justify-between">
              <p className="prose-pretty text-[#374151]">
                <strong>What happens:</strong> {regime.summary}
              </p>
              <span className="shrink-0 rounded-lg bg-[#faf7f2] px-3 py-1.5 font-mono text-[0.72rem] text-[#4b5563]">
                {regime.example}
              </span>
            </div>
          </div>
        </div>

        {/* Part B: Verified BLS CPI-U Purchasing Power Time Machine (1913–2025) */}
        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="rounded-3xl border border-[#e2dacb] bg-white p-6 shadow-xs lg:col-span-8">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-red-800 uppercase">
                  <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Official U.S. Bureau of Labor Statistics Data (CPI-U)</span>
                </div>
                <h3 className="mt-1 font-serif text-2xl font-semibold text-[#141a1f]">
                  Purchasing Power Time Machine (1913–2025)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTable((prev) => !prev)}
                aria-expanded={showTable}
                className="inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-full border border-[#d6ccb8] bg-[#faf7f2] px-3.5 py-1.5 text-xs font-semibold text-[#141a1f] transition-colors hover:bg-[#ece4d5]"
              >
                <TableIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{showTable ? "Hide BLS Data Table" : "Inspect BLS Data Table"}</span>
              </button>
            </div>

            {/* Year Selector Slider */}
            <div className="rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <label
                  htmlFor="cpi-year-slider"
                  className="text-sm font-semibold text-[#141a1f]"
                >
                  Select Starting Year to Compare Against 2025:
                </label>
                <span className="font-mono text-2xl font-bold text-[#0f6e56] tabular-nums">
                  {startPoint.year}{" "}
                  <span className="text-xs font-normal text-[#6b7280]">
                    (CPI-U: {startPoint.cpi})
                  </span>
                </span>
              </div>

              <input
                id="cpi-year-slider"
                type="range"
                min={0}
                max={BLS_CPI_DATA.length - 2}
                step={1}
                value={startIdx}
                onChange={(e) => setStartIdx(Number(e.target.value))}
                className="atlas-range mt-3 h-2.5 w-full rounded-lg bg-[#e2dacb]"
              />
              <div className="mt-1.5 flex justify-between font-mono text-[0.68rem] text-[#6b7280]">
                <span>1913 (Fed founded)</span>
                <span>1971 (Nixon Shock)</span>
                <span>2000</span>
                <span>2024</span>
              </div>
              <p className="mt-2.5 text-xs text-[#4b5563]">
                <strong>Historical Context ({startPoint.year}):</strong> {startPoint.note} <Cite id={7} />
              </p>
            </div>

            {/* Live Equivalence Readout */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#e2dacb] bg-white p-4">
                <div className="font-mono text-[0.7rem] font-semibold tracking-wider text-[#6b7280] uppercase">
                  What $100 in {startPoint.year} Costs in 2025
                </div>
                <div className="mt-1.5 font-mono text-3xl font-bold text-[#141a1f] tabular-nums">
                  ${equivalentCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
                <p className="mt-1 text-xs text-[#4b5563]">
                  Overall consumer prices multiplied{" "}
                  <strong className="font-mono">{priceMultiplier.toFixed(2)}×</strong>{" "}
                  (BLS CPI-U {startPoint.cpi} → {latestPoint.cpi}*).
                </p>
              </div>

              <div className="rounded-2xl border border-red-800/20 bg-red-50/50 p-4">
                <div className="font-mono text-[0.7rem] font-semibold tracking-wider text-red-900 uppercase">
                  Buying Power Retained by {startPoint.year} Cash
                </div>
                <div className="mt-1.5 flex items-baseline gap-2">
                  <span className="font-mono text-3xl font-bold text-red-900 tabular-nums">
                    {retainedPowerPct.toFixed(1)}%
                  </span>
                  <TrendingDown className="h-5 w-5 text-red-700" aria-hidden="true" />
                </div>
                <div className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-white ring-1 ring-red-900/15">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#0f6e56] to-[#d97706]"
                    animate={{ width: `${Math.max(3, Math.min(100, retainedPowerPct))}%` }}
                    transition={{ type: "spring", stiffness: 150, damping: 24 }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-red-950/80">
                  $100 held as idle paper cash since {startPoint.year} buys only ${retainedPowerPct.toFixed(2)} of {startPoint.year} goods today.
                </p>
              </div>
            </div>

            {/* Accessible Semantic BLS Data Table (Toggleable) */}
            {showTable && (
              <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e2dacb]">
                <table className="w-full border-collapse text-left text-xs">
                  <caption className="bg-[#faf7f2] px-4 py-2.5 text-left font-mono text-[0.72rem] font-semibold text-[#4b5563]">
                    Official U.S. BLS CPI-U Annual Averages (1982–84 = 100) — Selected Benchmark Years
                  </caption>
                  <thead className="border-y border-[#e2dacb] bg-[#f5f0e6] font-mono text-[#141a1f]">
                    <tr>
                      <th scope="col" className="px-4 py-2">Year</th>
                      <th scope="col" className="px-4 py-2">CPI-U Index</th>
                      <th scope="col" className="px-4 py-2">$100 Equivalent (2025)</th>
                      <th scope="col" className="px-4 py-2">Context</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ece4d5] bg-white">
                    {BLS_CPI_DATA.map((row) => (
                      <tr key={row.year} className={row.year === startPoint.year ? "bg-emerald-50/70" : ""}>
                        <th scope="row" className="px-4 py-2 font-mono font-semibold text-[#141a1f]">
                          {row.year}
                        </th>
                        <td className="px-4 py-2 font-mono tabular-nums">{row.cpi}</td>
                        <td className="px-4 py-2 font-mono tabular-nums">
                          ${((100 * latestPoint.cpi) / row.cpi).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-4 py-2 text-[#4b5563]">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <p className="mt-3 text-[0.7rem] text-[#6b7280]">
              *Note: Per U.S. BLS reporting, the 2025 annual average (321.943) reflects an 11-month average because October 2025 price data was not collected during a federal funding lapse <Cite id={7} />.
            </p>
          </div>

          {/* Right Sidebar: Why 2% Inflation Target? */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#e2dacb] bg-[#141a1f] p-6 text-[#faf7f2] lg:col-span-4">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 font-mono text-xs font-semibold text-emerald-300">
                <Target className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Why Target 2% Instead of 0%?</span>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-white">
                The Surprising Story of the 2% Standard
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                The 2% target didn&apos;t come from a pure math theorem—it originated in{" "}
                <strong className="text-white">New Zealand under the Reserve Bank Act of 1989</strong>{" "}
                (initially a 0%–2% band) and was formally adopted by the U.S. Federal Reserve in{" "}
                <strong className="text-white">January 2012</strong> <Cite id={8} />.
              </p>

              <ul className="space-y-3 pt-1 text-xs leading-relaxed text-gray-300">
                <li className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <strong className="block text-amber-300">1. Zero Lower Bound Buffer</strong>
                  Positive ~2% inflation keeps normal interest rates higher (e.g., 4%–5%), giving central banks room to cut rates during recessions before hitting 0%.
                </li>
                <li className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <strong className="block text-emerald-300">2. Avoiding Deflation Spirals</strong>
                  Aiming for 0% leaves no margin of safety against falling prices, which increase real debt burdens and stall consumer spending.
                </li>
                <li className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <strong className="block text-sky-300">3. Measurement Bias &amp; Wage Flexibility</strong>
                  Price indexes slightly overstate inflation when product quality improves, and modest inflation eases real wage adjustments without nominal pay cuts.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <MythRealityCard
          myth="Any increase in the central bank's base money supply automatically causes immediate, one-for-one consumer price inflation."
          reality="Between 2008 and 2020, U.S. central bank reserves expanded dramatically via QE while consumer inflation remained near or below 2%, because money velocity fell and bank reserves stayed inside the interbank circuit. Inflation surged in 2021–2022 when pandemic supply shocks collided with fiscal transfers and rapid consumer demand."
          citationIds={[7, 8, 6]}
        />
      </div>
    </section>
  );
}
