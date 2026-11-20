"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, RotateCcw, ShieldAlert, Landmark, ArrowLeftRight } from "lucide-react";
import { ChapterHeader, Cite, MythRealityCard } from "./CitationContext";

interface LedgerEvent {
  id: number;
  label: string;
  delta: number;
  type: "create" | "destroy";
}

const INITIAL_RESERVES = 150; // $150k
const INITIAL_LOANS = 400; // $400k
const INITIAL_DEPOSITS = 450; // $450k
const BANK_EQUITY_CET1 = 100; // $100k (Assets 550 = Liabilities 450 + Equity 100)
const MIN_CET1_RATIO = 8.0; // Basel III stylized guardrail threshold (%)

export function Chapter02BankCreation() {
  const [loans, setLoans] = useState(INITIAL_LOANS);
  const [deposits, setDeposits] = useState(INITIAL_DEPOSITS);
  const [reserves] = useState(INITIAL_RESERVES);
  const [events, setEvents] = useState<LedgerEvent[]>([]);
  const [pulseState, setPulseState] = useState<"idle" | "create" | "destroy">("idle");

  // Risk-weighted assets stylized: reserves 0% risk weight, loans 100% risk weight
  const riskWeightedAssets = Math.max(1, loans);
  const cet1Ratio = (BANK_EQUITY_CET1 / riskWeightedAssets) * 100;
  const isAtCapitalLimit = cet1Ratio <= MIN_CET1_RATIO + 0.5;
  const totalAssets = reserves + loans;
  const totalLiabilitiesAndEquity = deposits + BANK_EQUITY_CET1;

  const triggerPulse = (kind: "create" | "destroy") => {
    setPulseState(kind);
    window.setTimeout(() => setPulseState("idle"), 850);
  };

  const handleIssueLoan = (amount: number, label: string) => {
    const nextLoans = loans + amount;
    const nextCet1 = (BANK_EQUITY_CET1 / nextLoans) * 100;
    if (nextCet1 < MIN_CET1_RATIO) return;

    setLoans(nextLoans);
    setDeposits((prev) => prev + amount);
    setEvents((prev) => [
      { id: Date.now(), label, delta: amount, type: "create" },
      ...prev.slice(0, 4),
    ]);
    triggerPulse("create");
  };

  const handleRepayLoan = (amount: number) => {
    if (loans < amount || deposits < amount) return;
    setLoans((prev) => prev - amount);
    setDeposits((prev) => prev - amount);
    setEvents((prev) => [
      { id: Date.now(), label: "Borrower repays loan principal", delta: -amount, type: "destroy" },
      ...prev.slice(0, 4),
    ]);
    triggerPulse("destroy");
  };

  const handleReset = () => {
    setLoans(INITIAL_LOANS);
    setDeposits(INITIAL_DEPOSITS);
    setEvents([]);
    setPulseState("idle");
  };

  const maxBarScale = 1400; // $1,400k visual bar scale

  return (
    <section
      id="chapter-2"
      className="scroll-mt-20 border-t border-[#e2dacb] bg-[#f5f0e6]/70 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ChapterHeader
          number="02"
          eyebrow="The Biggest Surprise in Economics"
          title="Where Does Money Actually Come From?"
          subtitle="Whenever a commercial bank makes a loan, it does not hand out someone else's savings. It simultaneously creates a new loan asset and a brand-new deposit in the borrower's account—expanding the money supply with keystrokes."
          citationIds={[1, 2, 3]}
        />

        {/* Interactive Double-Entry Balance Sheet Simulator */}
        <div className="rounded-3xl border border-[#e2dacb] bg-white p-5 shadow-sm md:p-8">
          {/* Top Action Bar */}
          <div className="mb-6 flex flex-col gap-4 border-b border-[#ece4d5] pb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#141a1f]">
                Live Commercial Bank Balance Sheet Simulator
              </h3>
              <p className="mt-1 text-sm text-[#4b5563]">
                Issue new loans or repay principal and watch both sides of the ledger expand or contract in lockstep. Notice what happens to{" "}
                <strong className="text-amber-900">Central Bank Reserves</strong>!
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => handleIssueLoan(200, "Issued $200k Home Mortgage")}
                disabled={(BANK_EQUITY_CET1 / (loans + 200)) * 100 < MIN_CET1_RATIO}
                className="inline-flex min-h-[2.625rem] items-center gap-1.5 rounded-full bg-[#0f6e56] px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#0b5643] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Issue $200k Mortgage</span>
              </button>

              <button
                type="button"
                onClick={() => handleIssueLoan(100, "Issued $100k Business Loan")}
                disabled={(BANK_EQUITY_CET1 / (loans + 100)) * 100 < MIN_CET1_RATIO}
                className="inline-flex min-h-[2.625rem] items-center gap-1.5 rounded-full bg-emerald-800 px-4 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-emerald-900 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Issue $100k Business Loan</span>
              </button>

              <button
                type="button"
                onClick={() => handleRepayLoan(100)}
                disabled={loans < 100 || deposits < 100}
                className="inline-flex min-h-[2.625rem] items-center gap-1.5 rounded-full border border-red-800/30 bg-red-50 px-4 py-2 text-xs font-semibold text-red-900 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-45"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Repay $100k Principal</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                aria-label="Reset balance sheet simulator"
                className="inline-flex min-h-[2.625rem] items-center gap-1.5 rounded-full border border-[#d6ccb8] bg-[#faf7f2] px-3.5 py-2 text-xs font-semibold text-[#374151] transition-colors hover:bg-[#ece4d5]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Broad Money Headline Ticker + Pulse Banner */}
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <motion.div
              animate={
                pulseState === "create"
                  ? { scale: [1, 1.025, 1] }
                  : pulseState === "destroy"
                  ? { scale: [1, 0.985, 1] }
                  : {}
              }
              transition={{ duration: 0.4 }}
              className="rounded-2xl border border-emerald-800/25 bg-emerald-50/60 p-4"
            >
              <div className="font-mono text-[0.7rem] font-semibold tracking-wider text-emerald-900 uppercase">
                Broad Money Supply (Customer Deposits)
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-emerald-950 tabular-nums">
                  ${deposits.toLocaleString()}k
                </span>
                <span className="font-mono text-xs font-medium text-emerald-800">
                  ({deposits - INITIAL_DEPOSITS >= 0 ? "+" : ""}
                  ${deposits - INITIAL_DEPOSITS}k net)
                </span>
              </div>
              <p className="mt-1 text-xs text-emerald-900/80">
                Spendable electronic money in the real economy
              </p>
            </motion.div>

            <div className="rounded-2xl border border-amber-800/25 bg-amber-50/60 p-4">
              <div className="font-mono text-[0.7rem] font-semibold tracking-wider text-amber-900 uppercase">
                Central Bank Reserves Held by Bank
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-3xl font-bold text-amber-950 tabular-nums">
                  ${reserves}k
                </span>
                <span className="font-mono text-xs font-semibold text-amber-800">
                  UNCHANGED
                </span>
              </div>
              <p className="mt-1 text-xs text-amber-900/80">
                U.S. reserve requirement has been <strong>0% since Mar 26, 2020</strong> <Cite id={3} />
              </p>
            </div>

            <div
              className={`rounded-2xl border p-4 transition-colors ${
                isAtCapitalLimit
                  ? "border-red-700 bg-red-50/80"
                  : "border-[#e2dacb] bg-[#faf7f2]"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-[0.7rem] font-semibold tracking-wider uppercase">
                <span className={isAtCapitalLimit ? "text-red-900" : "text-[#4b5563]"}>
                  Basel III CET1 Capital Ratio
                </span>
                <span className="text-[#6b7280]">Min {MIN_CET1_RATIO}%</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span
                  className={`font-mono text-3xl font-bold tabular-nums ${
                    isAtCapitalLimit ? "text-red-800" : "text-[#141a1f]"
                  }`}
                >
                  {cet1Ratio.toFixed(1)}%
                </span>
                <span className="font-mono text-xs text-[#6b7280]">
                  (${BANK_EQUITY_CET1}k / ${loans}k RWA)
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e2dacb]">
                <motion.div
                  className={`h-full rounded-full ${
                    cet1Ratio < 10 ? "bg-red-700" : cet1Ratio < 14 ? "bg-amber-600" : "bg-[#0f6e56]"
                  }`}
                  animate={{ width: `${Math.min(100, (cet1Ratio / 30) * 100)}%` }}
                  transition={{ type: "spring", stiffness: 160, damping: 24 }}
                />
              </div>
            </div>
          </div>

          {/* Double-Entry T-Account Visual */}
          <div className="grid items-stretch gap-4 lg:grid-cols-11">
            {/* ASSETS */}
            <div className="rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-5 lg:col-span-5">
              <div className="mb-4 flex items-center justify-between border-b border-[#e2dacb] pb-2">
                <span className="font-serif text-lg font-semibold text-[#141a1f]">
                  Bank Assets
                </span>
                <span className="font-mono text-sm font-bold text-[#141a1f] tabular-nums">
                  Total: ${totalAssets.toLocaleString()}k
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-xs font-medium">
                    <span className="text-amber-900">Central Bank Reserves (Vault &amp; Fed Acct)</span>
                    <span className="font-mono font-semibold tabular-nums">${reserves}k</span>
                  </div>
                  <div className="h-7 w-full overflow-hidden rounded-lg bg-white ring-1 ring-[#e2dacb]">
                    <div
                      className="flex h-full items-center bg-[#d97706] px-2.5 font-mono text-[0.7rem] font-semibold text-white"
                      style={{ width: `${(reserves / maxBarScale) * 100}%`, minWidth: "3.5rem" }}
                    >
                      Base
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs font-medium">
                    <span className="text-[#1e3a5f]">Loans to Households &amp; Businesses (IOUs)</span>
                    <span className="font-mono font-semibold tabular-nums">${loans.toLocaleString()}k</span>
                  </div>
                  <div className="h-10 w-full overflow-hidden rounded-lg bg-white ring-1 ring-[#e2dacb]">
                    <motion.div
                      animate={{ width: `${Math.min(100, (loans / maxBarScale) * 100)}%` }}
                      transition={{ type: "spring", stiffness: 140, damping: 22 }}
                      className="flex h-full items-center justify-between bg-[#1e3a5f] px-3 font-mono text-xs font-semibold text-white"
                      style={{ minWidth: "4.5rem" }}
                    >
                      <span className="truncate">Loans Asset</span>
                      <span className="tabular-nums">${loans}k</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Equals / Double-Entry Connector */}
            <div className="flex flex-col items-center justify-center gap-2 py-2 lg:col-span-1">
              <motion.div
                animate={
                  pulseState === "create"
                    ? { scale: [1, 1.25, 1], backgroundColor: "#10b981" }
                    : pulseState === "destroy"
                    ? { scale: [1, 1.25, 1], backgroundColor: "#b91c1c" }
                    : { scale: 1, backgroundColor: "#141a1f" }
                }
                transition={{ duration: 0.45 }}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-sm"
                aria-hidden="true"
              >
                <ArrowLeftRight className="h-5 w-5" />
              </motion.div>
              <span className="text-center font-mono text-[0.65rem] font-semibold text-[#4b5563] uppercase">
                Double Entry
              </span>
            </div>

            {/* LIABILITIES & EQUITY */}
            <div className="rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-5 lg:col-span-5">
              <div className="mb-4 flex items-center justify-between border-b border-[#e2dacb] pb-2">
                <span className="font-serif text-lg font-semibold text-[#141a1f]">
                  Liabilities &amp; Equity
                </span>
                <span className="font-mono text-sm font-bold text-[#141a1f] tabular-nums">
                  Total: ${totalLiabilitiesAndEquity.toLocaleString()}k
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between text-xs font-medium">
                    <span className="text-emerald-900">Customer Deposits (= Spendable Money!)</span>
                    <span className="font-mono font-semibold tabular-nums">${deposits.toLocaleString()}k</span>
                  </div>
                  <div className="h-10 w-full overflow-hidden rounded-lg bg-white ring-1 ring-[#e2dacb]">
                    <motion.div
                      animate={{ width: `${Math.min(100, (deposits / maxBarScale) * 100)}%` }}
                      transition={{ type: "spring", stiffness: 140, damping: 22 }}
                      className="flex h-full items-center justify-between bg-[#0f6e56] px-3 font-mono text-xs font-semibold text-white"
                      style={{ minWidth: "4.5rem" }}
                    >
                      <span className="truncate">Deposits</span>
                      <span className="tabular-nums">${deposits}k</span>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between text-xs font-medium">
                    <span className="text-[#4b5563]">Shareholder Equity (CET1 Loss Buffer)</span>
                    <span className="font-mono font-semibold tabular-nums">${BANK_EQUITY_CET1}k</span>
                  </div>
                  <div className="h-7 w-full overflow-hidden rounded-lg bg-white ring-1 ring-[#e2dacb]">
                    <div
                      className="flex h-full items-center bg-[#374151] px-2.5 font-mono text-[0.7rem] font-semibold text-white"
                      style={{ width: `${(BANK_EQUITY_CET1 / maxBarScale) * 100}%`, minWidth: "3.5rem" }}
                    >
                      CET1
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Capital Limit Guardrail Alert */}
          <AnimatePresence>
            {isAtCapitalLimit && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                role="status"
                className="mt-5 flex items-start gap-3 rounded-2xl border border-red-800/30 bg-red-50 p-4 text-sm text-red-950"
              >
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-800" aria-hidden="true" />
                <div>
                  <strong>Guardrail Reached — Why Banks Can&apos;t Create Infinite Money:</strong>{" "}
                  Your bank hit its Basel III CET1 capital threshold ({MIN_CET1_RATIO}%). Even
                  without reserve-ratio limits, commercial banks are bounded by{" "}
                  <strong>capital adequacy (CET1), liquidity rules (LCR), loan default risk, borrower demand, and central bank interest rates</strong>{" "}
                  <Cite id={1} />
                  <Cite id={2} />.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Live Ledger Audit Tape */}
          <div className="mt-6 rounded-2xl border border-[#ece4d5] bg-[#faf7f2] p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-[#4b5563] uppercase">
                <Landmark className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Live Accounting Ledger Tape</span>
              </span>
              <span className="font-mono text-xs text-[#6b7280]">
                {events.length === 0 ? "Click a loan button above to watch money creation" : `${events.length} recent entries`}
              </span>
            </div>
            {events.length === 0 ? (
              <p className="text-xs text-[#6b7280]">
                Accounting identity always holds: Assets (${totalAssets}k) = Liabilities (${deposits}k) + Equity (${BANK_EQUITY_CET1}k).
              </p>
            ) : (
              <ul className="space-y-1.5">
                <AnimatePresence initial={false}>
                  {events.map((ev) => (
                    <motion.li
                      key={ev.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white px-3 py-2 text-xs ring-1 ring-[#e2dacb]"
                    >
                      <span className="font-medium text-[#141a1f]">{ev.label}</span>
                      <span
                        className={`font-mono font-semibold tabular-nums ${
                          ev.type === "create" ? "text-emerald-800" : "text-red-800"
                        }`}
                      >
                        {ev.type === "create"
                          ? `+$${ev.delta}k Loans & +$${ev.delta}k New Money`
                          : `$${ev.delta}k Loans & $${ev.delta}k Money Destroyed`}
                      </span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>
        </div>

        <MythRealityCard
          myth="Banks simply collect deposits from savers, keep a fixed 10% fraction in a vault, and lend the remaining 90% out—multiplying central bank reserves mechanically."
          reality="Both the Bank of England (2014) and Deutsche Bundesbank (2017) explicitly refuted this textbook model. In reality, loans create deposits first—not the other way around. In the U.S., statutory reserve requirements have been 0% since March 26, 2020. Lending is actually constrained by profitability, credit risk, borrower demand, Basel III capital/liquidity rules, and central bank interest rates."
          citationIds={[1, 2, 3]}
        />
      </div>
    </section>
  );
}
