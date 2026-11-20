"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sliders, RefreshCw, ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { ChapterHeader, Cite, MythRealityCard } from "./CitationContext";

export function Chapter04CentralBank() {
  const [activeTab, setActiveTab] = useState<"rates" | "qe">("rates");

  // Mode A: Policy Rate Slider (0.25% to 7.00%)
  const [policyRate, setPolicyRate] = useState<number>(4.5);

  // Derived realistic stylized transmission outputs (illustrative economic relationships)
  const onRrpRate = Math.max(0.05, +(policyRate - 0.2).toFixed(2));
  const iorbRate = +(policyRate - 0.1).toFixed(2);
  const effrRate = +(policyRate - 0.17).toFixed(2);
  const mortgageRate = +(policyRate + 1.85).toFixed(2);
  const creditPace = Math.max(12, Math.min(96, Math.round(98 - policyRate * 11.5)));
  const demandHeat = Math.max(15, Math.min(95, Math.round(95 - policyRate * 11)));
  const policyStance =
    policyRate <= 1.75
      ? { label: "Accommodative (Stimulating)", color: "text-emerald-800 bg-emerald-50 border-emerald-700/25" }
      : policyRate <= 3.75
      ? { label: "Near Neutral", color: "text-amber-900 bg-amber-50 border-amber-700/25" }
      : { label: "Restrictive (Cooling Inflation)", color: "text-red-900 bg-red-50 border-red-700/25" };

  // Mode B: QE / QT Step Animator
  const [qeBalance, setQeBalance] = useState<number>(0); // Billions of bonds bought via QE (0..400)
  const [lastQeAction, setLastQeAction] = useState<"none" | "qe" | "qt">("none");

  const bondYield = +(4.8 - (qeBalance / 100) * 0.45).toFixed(2);
  const bondPriceIdx = Math.round(100 + (qeBalance / 100) * 4.2);

  const handleQeBuy = () => {
    if (qeBalance >= 400) return;
    setQeBalance((prev) => prev + 100);
    setLastQeAction("qe");
  };

  const handleQtRunoff = () => {
    if (qeBalance <= 0) return;
    setQeBalance((prev) => prev - 100);
    setLastQeAction("qt");
  };

  return (
    <section
      id="chapter-4"
      className="scroll-mt-20 border-t border-[#e2dacb] bg-[#f5f0e6]/70 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ChapterHeader
          number="04"
          eyebrow="Monetary Policy & Transmission"
          title="How Central Banks Steer the Entire Economy"
          subtitle="Central banks don't set every loan rate by decree. Instead, they adjust the overnight price of reserves—and during crises, swap long-term bonds for liquid deposits via Quantitative Easing."
          citationIds={[5, 6, 1]}
        />

        <div className="rounded-3xl border border-[#e2dacb] bg-white p-5 shadow-xs md:p-8">
          {/* Dual Mode Switcher */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#ece4d5] pb-5">
            <div
              className="inline-flex rounded-full border border-[#d6ccb8] bg-[#faf7f2] p-1"
              role="tablist"
              aria-label="Central bank policy tools"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "rates"}
                onClick={() => setActiveTab("rates")}
                className={`inline-flex min-h-[2.375rem] items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "rates"
                    ? "bg-[#141a1f] text-[#faf7f2]"
                    : "text-[#374151] hover:text-[#141a1f]"
                }`}
              >
                <Sliders className="h-3.5 w-3.5" aria-hidden="true" />
                <span>1. Interest Rates (Floor System)</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "qe"}
                onClick={() => setActiveTab("qe")}
                className={`inline-flex min-h-[2.375rem] items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  activeTab === "qe"
                    ? "bg-[#141a1f] text-[#faf7f2]"
                    : "text-[#374151] hover:text-[#141a1f]"
                }`}
              >
                <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>2. Quantitative Easing (QE / QT)</span>
              </button>
            </div>
            <span className="font-mono text-xs text-[#6b7280]">
              {activeTab === "rates"
                ? "Ample-reserves framework: IORB + ON RRP"
                : "Non-bank bond swap & portfolio rebalancing"}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "rates" ? (
              <motion.div
                key="rates"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                {/* Interactive Policy Rate Slider */}
                <div className="mb-6 rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <label
                        htmlFor="policy-rate-slider"
                        className="block font-serif text-lg font-semibold text-[#141a1f]"
                      >
                        Central Bank Target Policy Rate (Fed Funds Upper Bound)
                      </label>
                      <p className="text-xs text-[#4b5563]">
                        Drag the lever to see how raising or cutting administered rates ripples across the economy <Cite id={5} />.
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${policyStance.color}`}
                      >
                        {policyStance.label}
                      </span>
                      <span className="font-mono text-3xl font-bold text-[#141a1f] tabular-nums">
                        {policyRate.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      id="policy-rate-slider"
                      type="range"
                      min={0.25}
                      max={7.0}
                      step={0.25}
                      value={policyRate}
                      onChange={(e) => setPolicyRate(parseFloat(e.target.value))}
                      className="atlas-range h-2.5 w-full rounded-lg bg-[#e2dacb]"
                    />
                    <div className="mt-1.5 flex justify-between font-mono text-[0.7rem] text-[#6b7280]">
                      <span>0.25% (Zero Lower Bound)</span>
                      <span>3.00% (Neutral Zone)</span>
                      <span>7.00% (Tightening)</span>
                    </div>
                  </div>
                </div>

                {/* Corridor + Transmission Chain */}
                <div className="grid gap-6 lg:grid-cols-12">
                  {/* Left: Ample Reserves Floor Corridor */}
                  <div className="rounded-2xl border border-[#e2dacb] bg-white p-5 lg:col-span-5">
                    <h4 className="font-serif text-base font-semibold text-[#141a1f]">
                      How the Fed Enforces Its Rate (Ample-Reserves Floor)
                    </h4>
                    <p className="mt-1 text-xs text-[#4b5563]">
                      Because banks hold ample reserves, the Fed steers overnight market rates using two administered floors <Cite id={5} />:
                    </p>

                    <div className="relative mt-5 h-52 rounded-xl border border-[#ece4d5] bg-[#faf7f2] p-4">
                      {/* Grid lines */}
                      {[0, 2, 4, 6].map((tick) => (
                        <div
                          key={tick}
                          className="absolute right-3 left-10 border-t border-dashed border-[#dfd6c5]"
                          style={{ bottom: `${(tick / 7.5) * 84 + 8}%` }}
                        >
                          <span className="absolute -top-2 -left-8 font-mono text-[0.65rem] text-[#6b7280] tabular-nums">
                            {tick}%
                          </span>
                        </div>
                      ))}

                      {/* Animated Target Corridor Band */}
                      <motion.div
                        animate={{
                          bottom: `${(onRrpRate / 7.5) * 84 + 8}%`,
                        }}
                        transition={{ type: "spring", stiffness: 160, damping: 24 }}
                        className="absolute right-4 left-12 flex flex-col justify-between rounded-lg border-2 border-[#0f6e56] bg-emerald-500/15 px-3 py-2"
                        style={{ minHeight: "3.4rem" }}
                      >
                        <div className="flex items-center justify-between text-[0.7rem] font-semibold text-emerald-950">
                          <span>IORB (Banks)</span>
                          <span className="font-mono tabular-nums">{iorbRate.toFixed(2)}%</span>
                        </div>
                        <div className="my-0.5 h-[2px] w-full bg-[#0f6e56]" />
                        <div className="flex items-center justify-between text-[0.7rem] font-semibold text-amber-950">
                          <span>ON RRP (Money Funds Floor)</span>
                          <span className="font-mono tabular-nums">{onRrpRate.toFixed(2)}%</span>
                        </div>
                      </motion.div>
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-lg bg-[#faf7f2] px-3 py-2 text-xs">
                      <span className="font-medium text-[#4b5563]">Effective Fed Funds Rate:</span>
                      <span className="font-mono font-bold text-[#0f6e56] tabular-nums">
                        ~{effrRate.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  {/* Right: 4-Stage Transmission Chain */}
                  <div className="rounded-2xl border border-[#e2dacb] bg-white p-5 lg:col-span-7">
                    <h4 className="font-serif text-base font-semibold text-[#141a1f]">
                      Transmission Ripple to the Real Economy
                    </h4>
                    <p className="mt-1 text-xs text-[#4b5563]">
                      Changes in overnight policy rates propagate with a lag (typically 6–18 months) through credit markets:
                    </p>

                    <div className="mt-4 space-y-3">
                      {[
                        {
                          step: "1. Retail & Mortgage Rates",
                          value: `~${mortgageRate.toFixed(2)}% est. 30Y mortgage`,
                          pct: Math.min(100, (mortgageRate / 9.5) * 100),
                          barColor: "bg-[#1e3a5f]",
                          note: "Higher bank funding costs & Treasury yields raise borrowing costs for homebuyers and firms.",
                        },
                        {
                          step: "2. Commercial Bank Credit Creation",
                          value: creditPace > 65 ? "Rapid Expansion" : creditPace > 40 ? "Moderate Pace" : "Slowing Sharply",
                          pct: creditPace,
                          barColor: "bg-[#0f6e56]",
                          note: "When loans cost more, fewer households & businesses borrow—slowing new deposit creation.",
                        },
                        {
                          step: "3. Aggregate Spending & Hiring",
                          value: demandHeat > 65 ? "High Demand" : demandHeat > 40 ? "Balanced" : "Cooling Economy",
                          pct: demandHeat,
                          barColor: "bg-[#d97706]",
                          note: "Higher rates also incentivize saving over spending and reduce present value of asset prices.",
                        },
                        {
                          step: "4. Inflation Pressure",
                          value: demandHeat > 68 ? "Upward Pressure" : demandHeat > 42 ? "Near ~2% Target" : "Disinflationary",
                          pct: Math.max(10, demandHeat - 5),
                          barColor: demandHeat > 68 ? "bg-red-700" : "bg-emerald-700",
                          note: "Cooler aggregate demand reduces businesses' ability to raise prices rapidly.",
                        },
                      ].map((stage, i) => (
                        <div key={stage.step} className="rounded-xl border border-[#ece4d5] bg-[#faf7f2] p-3">
                          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="font-semibold text-[#141a1f]">{stage.step}</span>
                            <span className="font-mono font-semibold text-[#374151] tabular-nums">
                              {stage.value}
                            </span>
                          </div>
                          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white ring-1 ring-[#e2dacb]">
                            <motion.div
                              className={`h-full rounded-full ${stage.barColor}`}
                              animate={{ width: `${stage.pct}%` }}
                              transition={{ type: "spring", stiffness: 130, damping: 22, delay: i * 0.04 }}
                            />
                          </div>
                          <p className="mt-1.5 text-[0.72rem] text-[#4b5563]">{stage.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="qe"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                {/* QE / QT Controls */}
                <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-[#141a1f]">
                      How Quantitative Easing (QE) Actually Works
                    </h4>
                    <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[#4b5563]">
                      When interest rates hit the Zero Lower Bound, central banks buy long-term government bonds from{" "}
                      <strong>non-banks (like pension funds)</strong>—creating new central bank reserves <em>and</em> matching commercial bank deposits <Cite id={6} />.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleQeBuy}
                      disabled={qeBalance >= 400}
                      className="inline-flex min-h-[2.625rem] items-center gap-1.5 rounded-full bg-[#0f6e56] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#0b5643] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
                    >
                      <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Run +$100B QE Purchase</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleQtRunoff}
                      disabled={qeBalance <= 0}
                      className="inline-flex min-h-[2.625rem] items-center gap-1.5 rounded-full border border-red-800/30 bg-red-50 px-4 py-2 text-xs font-semibold text-red-900 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-45"
                    >
                      <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Run -$100B QT Runoff</span>
                    </button>
                  </div>
                </div>

                {/* 3-Actor QE Flow Diagram */}
                <div className="grid gap-4 md:grid-cols-3">
                  {/* Actor 1: Central Bank */}
                  <motion.div
                    animate={lastQeAction === "qe" ? { scale: [1, 1.02, 1] } : {}}
                    className="rounded-2xl border border-amber-700/30 bg-amber-50/50 p-5"
                  >
                    <div className="font-mono text-[0.7rem] font-bold tracking-wider text-amber-900 uppercase">
                      1. Central Bank
                    </div>
                    <h5 className="mt-1 font-serif text-lg font-semibold text-[#141a1f]">
                      Creates Reserves &amp; Buys Bonds
                    </h5>
                    <div className="mt-4 space-y-2 rounded-xl bg-white p-3 font-mono text-xs ring-1 ring-amber-800/15">
                      <div className="flex justify-between">
                        <span className="text-[#4b5563]">Asset: Gov Bonds</span>
                        <span className="font-bold text-[#1e3a5f] tabular-nums">+${qeBalance}B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4b5563]">Liability: Reserves</span>
                        <span className="font-bold text-amber-800 tabular-nums">+${qeBalance}B</span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#4b5563]">
                      Electronically credits the commercial bank&apos;s reserve account in exchange for the bond.
                    </p>
                  </motion.div>

                  {/* Actor 2: Commercial Bank (Pass-through) */}
                  <motion.div
                    animate={lastQeAction === "qe" ? { scale: [1, 1.02, 1] } : {}}
                    className="rounded-2xl border border-emerald-700/30 bg-emerald-50/50 p-5"
                  >
                    <div className="font-mono text-[0.7rem] font-bold tracking-wider text-emerald-900 uppercase">
                      2. Commercial Bank (Conduit)
                    </div>
                    <h5 className="mt-1 font-serif text-lg font-semibold text-[#141a1f]">
                      Neutral Balance-Sheet Pass-Through
                    </h5>
                    <div className="mt-4 space-y-2 rounded-xl bg-white p-3 font-mono text-xs ring-1 ring-emerald-800/15">
                      <div className="flex justify-between">
                        <span className="text-[#4b5563]">Asset: CB Reserves</span>
                        <span className="font-bold text-amber-800 tabular-nums">+${qeBalance}B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4b5563]">Liability: Pension Dep.</span>
                        <span className="font-bold text-emerald-800 tabular-nums">+${qeBalance}B</span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#4b5563]">
                      Because pension funds cannot hold Central Bank accounts, the commercial bank receives the reserves and credits the pension fund&apos;s deposit.
                    </p>
                  </motion.div>

                  {/* Actor 3: Pension Fund / Non-Bank */}
                  <motion.div
                    animate={lastQeAction === "qe" ? { scale: [1, 1.02, 1] } : {}}
                    className="rounded-2xl border border-[#1e3a5f]/30 bg-slate-50/80 p-5"
                  >
                    <div className="font-mono text-[0.7rem] font-bold tracking-wider text-[#1e3a5f] uppercase">
                      3. Pension Fund / Insurer
                    </div>
                    <h5 className="mt-1 font-serif text-lg font-semibold text-[#141a1f]">
                      Portfolio Rebalancing
                    </h5>
                    <div className="mt-4 space-y-2 rounded-xl bg-white p-3 font-mono text-xs ring-1 ring-[#1e3a5f]/15">
                      <div className="flex justify-between">
                        <span className="text-[#4b5563]">Gov Bonds Held</span>
                        <span className="font-bold text-red-800 tabular-nums">-${qeBalance}B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#4b5563]">Liquid Bank Deposits</span>
                        <span className="font-bold text-emerald-800 tabular-nums">+${qeBalance}B</span>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-[#4b5563]">
                      Now flush with low-yielding cash, the pension fund buys corporate bonds and equities—pushing down economy-wide borrowing costs <Cite id={6} />.
                    </p>
                  </motion.div>
                </div>

                {/* Resulting Market Impact Strip */}
                <div className="mt-5 grid gap-3 rounded-2xl border border-[#e2dacb] bg-[#141a1f] p-4 text-[#faf7f2] sm:grid-cols-3">
                  <div>
                    <div className="font-mono text-[0.68rem] text-gray-400 uppercase">
                      Cumulative QE Purchases
                    </div>
                    <div className="mt-0.5 font-mono text-2xl font-bold text-emerald-300 tabular-nums">
                      ${qeBalance}B
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[0.68rem] text-gray-400 uppercase">
                      10Y Gov Bond Price Index
                    </div>
                    <div className="mt-0.5 flex items-center gap-1.5 font-mono text-2xl font-bold text-amber-300 tabular-nums">
                      <span>{bondPriceIdx}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" aria-hidden="true" />
                      <span className="text-xs font-normal text-gray-300">
                        {qeBalance > 0 ? "Prices pushed up" : "Baseline"}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[0.68rem] text-gray-400 uppercase">
                      10Y Gov Bond Yield
                    </div>
                    <div className="mt-0.5 font-mono text-2xl font-bold text-sky-300 tabular-nums">
                      {bondYield.toFixed(2)}%
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MythRealityCard
          myth="Quantitative Easing means the central bank prints stacks of cash to spend directly on government projects or hands free money to commercial banks to lend out."
          reality="QE is an asset swap conducted on secondary markets. The central bank buys long-term government bonds primarily from pension funds and insurers, crediting their commercial banks with reserves and the sellers with bank deposits. It stimulates the economy mainly by lowering long-term yields and triggering portfolio rebalancing."
          citationIds={[6, 5]}
        />
      </div>
    </section>
  );
}
