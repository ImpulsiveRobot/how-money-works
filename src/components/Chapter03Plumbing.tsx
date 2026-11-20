"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, RotateCcw, Layers, CheckCircle2 } from "lucide-react";
import { ChapterHeader, Cite, MythRealityCard } from "./CitationContext";

type SettlementStep = 0 | 1 | 2 | 3;

const AGGREGATES = [
  {
    id: "m0",
    code: "M0 / Base Money",
    subtitle: "Central Bank Liabilities Only",
    color: "border-amber-700/40 bg-amber-50/70",
    badge: "bg-amber-700 text-white",
    includes: [
      "Physical currency (banknotes & coins) in circulation",
      "Commercial bank reserve balances held at the Central Bank",
    ],
    keyNote:
      "Reserves circulate ONLY inside the interbank settlement circuit—households and businesses cannot spend central bank reserves directly at a grocery store.",
  },
  {
    id: "m1",
    code: "M1 (Liquid Spendable Money)",
    subtitle: "Publicly Held Immediate Payment Money",
    color: "border-emerald-700/40 bg-emerald-50/70",
    badge: "bg-[#0f6e56] text-white",
    includes: [
      "Currency & coins held by the non-bank public (excludes bank vaults)",
      "Demand deposits (checking accounts)",
      "Other liquid deposits — including savings deposits (folded into U.S. M1 in May 2020 after Regulation D removed the 6-transfer limit)",
    ],
    keyNote:
      "Notice: Central bank reserves are NOT part of M1 or M2. Adding reserves via QE does not automatically equal cash in consumer pockets unless non-banks sell assets.",
  },
  {
    id: "m2",
    code: "M2 (Broad Money)",
    subtitle: "M1 + Near-Money Savings Vehicles",
    color: "border-[#1e3a5f]/35 bg-slate-50/90",
    badge: "bg-[#1e3a5f] text-white",
    includes: [
      "Everything in M1",
      "Small-denomination time deposits (CDs under $100,000)",
      "Retail money market fund shares",
    ],
    keyNote:
      "Economists track broad money (M2 / M4) alongside credit growth to gauge economy-wide liquidity available for spending and investment.",
  },
];

export function Chapter03Plumbing() {
  const [step, setStep] = useState<SettlementStep>(0);
  const [aliceDeposit, setAliceDeposit] = useState(500);
  const [bobDeposit, setBobDeposit] = useState(500);
  const [bankAReserves, setBankAReserves] = useState(1000);
  const [bankBReserves, setBankBReserves] = useState(1000);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedAgg, setSelectedAgg] = useState("m1");
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  const handleSendPayment = () => {
    if (isAnimating || aliceDeposit < 100) return;
    clearTimers();
    setIsAnimating(true);

    // Step 1: Debit Alice's Deposit at Bank A
    setStep(1);
    setAliceDeposit((prev) => prev - 100);

    // Step 2: Central Bank RTGS (Fedwire) moves $100 reserves from Bank A -> Bank B
    const t1 = window.setTimeout(() => {
      setStep(2);
      setBankAReserves((prev) => prev - 100);
      setBankBReserves((prev) => prev + 100);
    }, 950);

    // Step 3: Bank B credits Bob's Deposit +$100
    const t2 = window.setTimeout(() => {
      setStep(3);
      setBobDeposit((prev) => prev + 100);
      setIsAnimating(false);
    }, 1950);

    timersRef.current = [t1, t2];
  };

  const handleReset = () => {
    clearTimers();
    setIsAnimating(false);
    setStep(0);
    setAliceDeposit(500);
    setBobDeposit(500);
    setBankAReserves(1000);
    setBankBReserves(1000);
  };

  const activeAggregate = AGGREGATES.find((a) => a.id === selectedAgg) ?? AGGREGATES[1];

  return (
    <section id="chapter-3" className="scroll-mt-20 border-t border-[#e2dacb] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ChapterHeader
          number="03"
          eyebrow="Two-Tier Settlement & Monetary Aggregates"
          title="The Invisible Plumbing Behind Every Tap & Transfer"
          subtitle="When you pay someone at a different bank, your commercial bank deposits don't physically cross the street. Behind the scenes, banks settle with each other using Central Bank Reserves over real-time gross settlement rails."
          citationIds={[4, 3, 1]}
        />

        {/* Interactive Interbank RTGS Settlement Animator */}
        <div className="rounded-3xl border border-[#e2dacb] bg-white p-5 shadow-xs md:p-8">
          <div className="mb-6 flex flex-col gap-4 border-b border-[#ece4d5] pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#141a1f]">
                Interactive Interbank Settlement (RTGS / Fedwire)
              </h3>
              <p className="mt-1 text-sm text-[#4b5563]">
                Watch how a simple $100 transfer from Alice (Bank A) to Bob (Bank B) clears across both monetary tiers.
                Fedwire settles roughly <strong>$4.5T–$4.8T every business day</strong> this way <Cite id={4} />.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleSendPayment}
                disabled={isAnimating || aliceDeposit < 100}
                className="inline-flex min-h-[2.625rem] items-center gap-2 rounded-full bg-[#0f6e56] px-5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#0b5643] disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-600"
              >
                <Send className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{isAnimating ? "Settling..." : "Send $100: Alice → Bob"}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-[2.625rem] items-center gap-1.5 rounded-full border border-[#d6ccb8] bg-[#faf7f2] px-4 py-2 text-xs font-semibold text-[#374151] transition-colors hover:bg-[#ece4d5]"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* 3-Step Visual Progress Pills */}
          <ol className="mb-6 grid gap-2 sm:grid-cols-3">
            {[
              {
                num: 1,
                title: "1. Bank A Debits Alice",
                desc: "Bank A reduces Alice's deposit liability by -$100.",
              },
              {
                num: 2,
                title: "2. Central Bank Moves Reserves",
                desc: "Fedwire debits Bank A's reserves (-$100) & credits Bank B's reserves (+$100).",
              },
              {
                num: 3,
                title: "3. Bank B Credits Bob",
                desc: "Bank B increases Bob's deposit liability by +$100. Settlement is final.",
              },
            ].map((item) => {
              const isCurrent = step === item.num;
              const isDone = step > item.num || (step === 3 && item.num === 3);
              return (
                <li
                  key={item.num}
                  className={`rounded-xl border p-3 transition-colors ${
                    isCurrent
                      ? "border-[#0f6e56] bg-emerald-50/80 shadow-xs"
                      : isDone
                      ? "border-emerald-700/25 bg-[#faf7f2]"
                      : "border-[#ece4d5] bg-[#faf7f2]/50 opacity-75"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#141a1f]">
                      {item.title}
                    </span>
                    {isDone && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-700" aria-hidden="true" />
                    )}
                  </div>
                  <p className="mt-1 text-xs text-[#4b5563]">{item.desc}</p>
                </li>
              );
            })}
          </ol>

          {/* Animated 2-Tier Settlement Diagram */}
          <div className="overflow-hidden rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-4 sm:p-6">
            <svg
              viewBox="0 0 720 330"
              className="mx-auto h-auto w-full"
              role="img"
              aria-label="Two-tier payment settlement diagram showing Bank A reserves transferring via Central Bank RTGS to Bank B while deposits move from Alice to Bob"
            >
              <title>Two-Tier Interbank Payment Settlement</title>

              {/* TIER 1: CENTRAL BANK */}
              <rect
                x="20"
                y="14"
                width="680"
                height="116"
                rx="16"
                fill="#fef8ec"
                stroke="#ecd09b"
                strokeWidth="1.5"
              />
              <text
                x="38"
                y="36"
                fontSize="11"
                fontFamily="var(--font-jetbrains), monospace"
                fontWeight="700"
                fill="#92400e"
              >
                CENTRAL BANK MASTER LEDGER (RTGS / FEDWIRE — CENTRAL BANK RESERVES)
              </text>

              {/* Bank A Reserve Account Box */}
              <g transform="translate(54, 52)">
                <rect width="200" height="62" rx="12" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
                <text x="100" y="24" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#141a1f">
                  Bank A Reserve Acct
                </text>
                <text
                  x="100"
                  y="46"
                  textAnchor="middle"
                  fontSize="16"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontWeight="700"
                  fill="#b45309"
                >
                  ${bankAReserves.toLocaleString()}
                </text>
              </g>

              {/* Reserve Transfer Pipe */}
              <line
                x1="254"
                y1="83"
                x2="466"
                y2="83"
                stroke="#d97706"
                strokeWidth={step === 2 ? "4" : "2.5"}
                strokeDasharray="7 6"
              />
              <polygon points="462,77 474,83 462,89" fill="#d97706" />
              <text
                x="360"
                y="72"
                textAnchor="middle"
                fontSize="10.5"
                fontFamily="var(--font-jetbrains), monospace"
                fontWeight="700"
                fill="#92400e"
              >
                Irrevocable Reserve Transfer
              </text>

              {/* Animated Gold Reserve Token during Step 2 */}
              {step === 2 && (
                <motion.g
                  initial={{ x: 268 }}
                  animate={{ x: 446 }}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                >
                  <circle cx="0" cy="83" r="14" fill="#d97706" stroke="#ffffff" strokeWidth="2.5" />
                  <text
                    x="0"
                    y="87"
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains), monospace"
                    fontWeight="700"
                    fill="#ffffff"
                  >
                    $100
                  </text>
                </motion.g>
              )}

              {/* Bank B Reserve Account Box */}
              <g transform="translate(466, 52)">
                <rect width="200" height="62" rx="12" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
                <text x="100" y="24" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#141a1f">
                  Bank B Reserve Acct
                </text>
                <text
                  x="100"
                  y="46"
                  textAnchor="middle"
                  fontSize="16"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontWeight="700"
                  fill="#b45309"
                >
                  ${bankBReserves.toLocaleString()}
                </text>
              </g>

              {/* Vertical links from Tier 1 to Tier 2 */}
              <line x1="154" y1="114" x2="154" y2="188" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />
              <line x1="566" y1="114" x2="566" y2="188" stroke="#9ca3af" strokeWidth="2" strokeDasharray="4 4" />

              {/* Animated Pulse Up from Alice to Bank A (Step 1) */}
              {step === 1 && (
                <motion.circle
                  cx="154"
                  r="10"
                  fill="#0f6e56"
                  stroke="#ffffff"
                  strokeWidth="2"
                  initial={{ cy: 235 }}
                  animate={{ cy: 120 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              )}

              {/* Animated Pulse Down from Bank B to Bob (Step 3) */}
              {step === 3 && (
                <motion.circle
                  cx="566"
                  r="10"
                  fill="#10b981"
                  stroke="#ffffff"
                  strokeWidth="2"
                  initial={{ cy: 120 }}
                  animate={{ cy: 235 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
              )}

              {/* TIER 2: COMMERCIAL BANKS & PUBLIC */}
              <rect
                x="20"
                y="156"
                width="680"
                height="160"
                rx="16"
                fill="#f2f9f6"
                stroke="#c7e2d7"
                strokeWidth="1.5"
              />
              <text
                x="38"
                y="178"
                fontSize="11"
                fontFamily="var(--font-jetbrains), monospace"
                fontWeight="700"
                fill="#065f46"
              >
                COMMERCIAL BANK LEDGERS (PUBLIC CUSTOMER DEPOSITS — BROAD MONEY)
              </text>

              {/* Alice at Bank A */}
              <g transform="translate(54, 196)">
                <rect
                  width="200"
                  height="98"
                  rx="14"
                  fill="#ffffff"
                  stroke={step === 1 ? "#b91c1c" : "#0f6e56"}
                  strokeWidth="2"
                />
                <text x="100" y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill="#141a1f">
                  Alice (at Bank A)
                </text>
                <text x="100" y="44" textAnchor="middle" fontSize="10" fill="#4b5563">
                  Checking Deposit
                </text>
                <text
                  x="100"
                  y="74"
                  textAnchor="middle"
                  fontSize="20"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontWeight="700"
                  fill="#0f6e56"
                >
                  ${aliceDeposit.toLocaleString()}
                </text>
              </g>

              {/* Center Conservation Note */}
              <g transform="translate(278, 206)">
                <rect width="164" height="78" rx="12" fill="#ffffff" stroke="#d6ccb8" />
                <text x="82" y="25" textAnchor="middle" fontSize="10" fontWeight="700" fill="#141a1f">
                  TOTALS CONSERVED
                </text>
                <text
                  x="82"
                  y="46"
                  textAnchor="middle"
                  fontSize="10.5"
                  fontFamily="var(--font-jetbrains), monospace"
                  fill="#0f6e56"
                >
                  Deposits: ${(aliceDeposit + bobDeposit).toLocaleString()}
                </text>
                <text
                  x="82"
                  y="64"
                  textAnchor="middle"
                  fontSize="10.5"
                  fontFamily="var(--font-jetbrains), monospace"
                  fill="#b45309"
                >
                  Reserves: ${(bankAReserves + bankBReserves).toLocaleString()}
                </text>
              </g>

              {/* Bob at Bank B */}
              <g transform="translate(466, 196)">
                <rect
                  width="200"
                  height="98"
                  rx="14"
                  fill="#ffffff"
                  stroke={step === 3 ? "#10b981" : "#0f6e56"}
                  strokeWidth="2"
                />
                <text x="100" y="25" textAnchor="middle" fontSize="12" fontWeight="700" fill="#141a1f">
                  Bob (at Bank B)
                </text>
                <text x="100" y="44" textAnchor="middle" fontSize="10" fill="#4b5563">
                  Checking Deposit
                </text>
                <text
                  x="100"
                  y="74"
                  textAnchor="middle"
                  fontSize="20"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontWeight="700"
                  fill="#0f6e56"
                >
                  ${bobDeposit.toLocaleString()}
                </text>
              </g>
            </svg>
          </div>

          {/* Monetary Aggregates Explorer (M0 / M1 / M2) */}
          <div className="mt-8 border-t border-[#ece4d5] pt-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-[#1e3a5f]" aria-hidden="true" />
                <h3 className="font-serif text-xl font-semibold text-[#141a1f]">
                  Measuring the Money Supply: M0 vs. M1 vs. M2
                </h3>
              </div>
              <span className="font-mono text-xs text-[#6b7280]">
                Includes May 2020 Federal Reserve Reg D update <Cite id={3} />
              </span>
            </div>

            <div className="grid gap-4 lg:grid-cols-12">
              <div className="flex flex-col gap-2 lg:col-span-5" role="tablist" aria-label="Monetary aggregates">
                {AGGREGATES.map((agg) => {
                  const isActive = agg.id === selectedAgg;
                  return (
                    <button
                      key={agg.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setSelectedAgg(agg.id)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        isActive
                          ? `${agg.color} ring-2 ring-[#141a1f]/15`
                          : "border-[#e2dacb] bg-[#faf7f2]/60 hover:bg-[#faf7f2]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`rounded-md px-2 py-0.5 font-mono text-xs font-bold ${agg.badge}`}>
                          {agg.code}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs font-medium text-[#4b5563]">{agg.subtitle}</p>
                    </button>
                  );
                })}
              </div>

              <div className="rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-5 lg:col-span-7">
                <div className="flex items-center gap-2">
                  <span className={`rounded-md px-2.5 py-1 font-mono text-xs font-bold ${activeAggregate.badge}`}>
                    {activeAggregate.code}
                  </span>
                  <span className="text-xs font-semibold text-[#4b5563]">
                    {activeAggregate.subtitle}
                  </span>
                </div>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[#1f2937]">
                  {activeAggregate.includes.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl bg-white p-3.5 text-xs leading-relaxed text-[#374151] ring-1 ring-[#e2dacb]">
                  <strong>Key Distinction:</strong> {activeAggregate.keyNote}
                </div>
              </div>
            </div>
          </div>
        </div>

        <MythRealityCard
          myth="Bank reserves and customer checking deposits are the same pool of money—so if the Federal Reserve doubles bank reserves, the public's spendable money supply automatically doubles."
          reality="Central bank reserves and commercial bank deposits live in two separate circuits. Only banks and the government hold reserve accounts at the central bank; households and firms hold commercial bank deposits. That is why central bank reserves are excluded from M1 and M2."
          citationIds={[1, 3, 4]}
        />
      </div>
    </section>
  );
}
