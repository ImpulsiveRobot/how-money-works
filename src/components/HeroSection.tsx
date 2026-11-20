"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, Sparkles, Coins, Building2, Landmark } from "lucide-react";
import { Cite, useCitation } from "./CitationContext";

export function HeroSection() {
  const { animationsPaused, openSourcesDialog } = useCitation();

  return (
    <section className="relative overflow-hidden border-b border-[#e2dacb] bg-ledger-grid pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Narrative Column */}
          <div className="space-y-6 lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex flex-wrap items-center gap-2 rounded-full border border-emerald-800/20 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-emerald-950 shadow-xs"
            >
              <ShieldCheck className="h-4 w-4 text-emerald-700" aria-hidden="true" />
              <span>Double-checked against Bank of England, Federal Reserve, Bundesbank &amp; BLS data</span>
            </motion.div>

            <motion.h1
              id="main-content"
              tabIndex={-1}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="heading-balance font-serif font-semibold tracking-tight text-[#141a1f]"
              style={{
                fontSize: "clamp(2.4rem, 1.5rem + 3.4vw, 4.35rem)",
                lineHeight: 1.06,
              }}
            >
              How Money{" "}
              <span className="italic text-[#0f6e56]">Actually</span> Works
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
              className="prose-pretty text-lg leading-relaxed text-[#374151] md:text-xl"
            >
              Almost everything we use as money today isn&apos;t printed paper or vaults of gold—it is an
              electronic ledger of promises created primarily when commercial banks issue loans
              <Cite id={1} />. Explore the real machinery of the modern monetary system through
              interactive simulations.
            </motion.p>

            {/* Key Fact Bar: 97% Digital Deposits vs 3% Cash */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.24 }}
              className="rounded-2xl border border-[#e2dacb] bg-white/95 p-5 shadow-xs"
            >
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#4b5563] uppercase">
                  Composition of Broad Money (UK Benchmark, BoE)
                </span>
                <span className="font-mono text-xs text-emerald-900">
                  Digital ledger dominates <Cite id={1} />
                </span>
              </div>
              <div
                className="flex h-8 w-full overflow-hidden rounded-lg bg-[#ebe3d4]"
                role="img"
                aria-label="97 percent commercial bank electronic deposits versus 3 percent physical banknotes and coins"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
                  style={{ originX: 0, width: "97%" }}
                  className="flex items-center justify-between bg-[#0f6e56] px-3 text-xs font-semibold text-white"
                >
                  <span className="truncate">Commercial Bank Deposits</span>
                  <span className="font-mono tabular-nums">~97%</span>
                </motion.div>
                <div
                  style={{ width: "3%" }}
                  className="bg-[#d97706]"
                  title="Physical Cash (~3%)"
                />
              </div>
              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4b5563]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#0f6e56]" aria-hidden="true" />
                  Electronic bank deposits (~97%)
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-xs bg-[#d97706]" aria-hidden="true" />
                  Physical banknotes &amp; coins (~3%)
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href="#chapter-1"
                className="inline-flex min-h-[2.875rem] items-center gap-2 rounded-full bg-[#0f6e56] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0b5643]"
              >
                <span>Start the Visual Journey</span>
                <ArrowDown className="h-4 w-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => openSourcesDialog()}
                className="inline-flex min-h-[2.875rem] items-center gap-2 rounded-full border border-[#d6ccb8] bg-white px-5 py-3 text-sm font-semibold text-[#141a1f] transition-colors hover:bg-[#f2ede3]"
              >
                <Sparkles className="h-4 w-4 text-amber-700" aria-hidden="true" />
                <span>Inspect Fact-Check Sources</span>
              </button>
            </motion.div>
          </div>

          {/* Right Animated Monetary Ecosystem SVG */}
          <div className="lg:col-span-5">
            <figure className="relative rounded-3xl border border-[#e2dacb] bg-white p-5 shadow-md sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold tracking-wider text-[#4b5563] uppercase">
                  Live Two-Tier Monetary Circuit
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-mono text-[0.7rem] font-medium text-emerald-900">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      animationsPaused ? "bg-amber-600" : "bg-emerald-500"
                    }`}
                    aria-hidden="true"
                  />
                  {animationsPaused ? "Paused" : "Live Flow"}
                </span>
              </div>

              <svg
                viewBox="0 0 420 360"
                className="h-auto w-full"
                role="img"
                aria-label="Diagram of the two-tier monetary system connecting the Central Bank, Commercial Banks, and Households and Businesses"
              >
                <title>Two-Tier Monetary Circuit</title>
                {/* Background Tier Labels */}
                <rect
                  x="12"
                  y="14"
                  width="396"
                  height="112"
                  rx="16"
                  fill="#fef8ec"
                  stroke="#f0d9b0"
                />
                <text
                  x="26"
                  y="36"
                  fontSize="10"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontWeight="600"
                  fill="#92400e"
                >
                  TIER 1: CENTRAL BANK MONEY (BASE MONEY / M0)
                </text>

                <rect
                  x="12"
                  y="144"
                  width="396"
                  height="202"
                  rx="16"
                  fill="#f2f9f6"
                  stroke="#cce4da"
                />
                <text
                  x="26"
                  y="166"
                  fontSize="10"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontWeight="600"
                  fill="#065f46"
                >
                  TIER 2: COMMERCIAL BANK MONEY (BROAD MONEY)
                </text>

                {/* Animated connecting pipes */}
                {/* Central Bank -> Bank A & Bank B (Reserves) */}
                <path
                  d="M 185 104 C 140 130, 115 155, 110 185"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.5"
                  className="flow-dash flow-dash-animated"
                />
                <path
                  d="M 235 104 C 280 130, 305 155, 310 185"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="2.5"
                  className="flow-dash flow-dash-animated"
                />

                {/* Interbank Settlement line */}
                <path
                  d="M 162 214 L 258 214"
                  fill="none"
                  stroke="#b45309"
                  strokeWidth="2"
                  className="flow-dash flow-dash-animated-slow"
                />

                {/* Banks <-> Households/Businesses (Loans & Deposits) */}
                <path
                  d="M 110 245 C 110 278, 155 292, 175 298"
                  fill="none"
                  stroke="#0f6e56"
                  strokeWidth="2.75"
                  className="flow-dash flow-dash-animated"
                />
                <path
                  d="M 310 245 C 310 278, 265 292, 245 298"
                  fill="none"
                  stroke="#0f6e56"
                  strokeWidth="2.75"
                  className="flow-dash flow-dash-reverse"
                />

                {/* Central Bank Node */}
                <g transform="translate(135, 48)">
                  <rect
                    width="150"
                    height="56"
                    rx="12"
                    fill="#ffffff"
                    stroke="#b45309"
                    strokeWidth="2"
                  />
                  <text
                    x="75"
                    y="25"
                    textAnchor="middle"
                    fontSize="12.5"
                    fontWeight="700"
                    fill="#141a1f"
                  >
                    Central Bank
                  </text>
                  <text
                    x="75"
                    y="43"
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains), monospace"
                    fill="#92400e"
                  >
                    Reserves &amp; Policy Rate
                  </text>
                </g>

                {/* Commercial Bank A */}
                <g transform="translate(36, 186)">
                  <rect
                    width="126"
                    height="58"
                    rx="12"
                    fill="#ffffff"
                    stroke="#0f6e56"
                    strokeWidth="2"
                  />
                  <text
                    x="63"
                    y="25"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="#141a1f"
                  >
                    Bank A
                  </text>
                  <text
                    x="63"
                    y="42"
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="var(--font-jetbrains), monospace"
                    fill="#0f6e56"
                  >
                    Loans → Deposits
                  </text>
                </g>

                {/* Commercial Bank B */}
                <g transform="translate(258, 186)">
                  <rect
                    width="126"
                    height="58"
                    rx="12"
                    fill="#ffffff"
                    stroke="#0f6e56"
                    strokeWidth="2"
                  />
                  <text
                    x="63"
                    y="25"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="#141a1f"
                  >
                    Bank B
                  </text>
                  <text
                    x="63"
                    y="42"
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="var(--font-jetbrains), monospace"
                    fill="#0f6e56"
                  >
                    Credit &amp; Clearing
                  </text>
                </g>

                {/* Real Economy Node */}
                <g transform="translate(115, 276)">
                  <rect
                    width="190"
                    height="54"
                    rx="12"
                    fill="#141a1f"
                  />
                  <text
                    x="95"
                    y="24"
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    fill="#faf7f2"
                  >
                    Households &amp; Businesses
                  </text>
                  <text
                    x="95"
                    y="41"
                    textAnchor="middle"
                    fontSize="9.5"
                    fontFamily="var(--font-jetbrains), monospace"
                    fill="#6ee7b7"
                  >
                    Wages • Spending • Mortgages
                  </text>
                </g>

                {/* Animated glowing value pulses */}
                {!animationsPaused && (
                  <>
                    <motion.circle
                      cx={185}
                      cy={104}
                      r={5}
                      fill="#d97706"
                      initial={{ cx: 185, cy: 104, opacity: 0 }}
                      animate={{
                        cx: [185, 145, 110],
                        cy: [104, 140, 185],
                        opacity: [0, 1, 0],
                      }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.circle
                      cx={110}
                      cy={245}
                      r={5}
                      fill="#10b981"
                      initial={{ cx: 110, cy: 245, opacity: 0 }}
                      animate={{
                        cx: [110, 130, 175],
                        cy: [245, 282, 298],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.0,
                        repeat: Infinity,
                        delay: 0.7,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.circle
                      cx={245}
                      cy={298}
                      r={5}
                      fill="#10b981"
                      initial={{ cx: 245, cy: 298, opacity: 0 }}
                      animate={{
                        cx: [245, 290, 310],
                        cy: [298, 282, 245],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2.0,
                        repeat: Infinity,
                        delay: 1.4,
                        ease: "easeInOut",
                      }}
                    />
                  </>
                )}
              </svg>

              <figcaption className="mt-3 grid grid-cols-3 gap-2 border-t border-[#efe8db] pt-3 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Landmark className="h-4 w-4 text-amber-700" aria-hidden="true" />
                  <span className="text-[0.7rem] font-medium text-[#4b5563]">
                    Central Bank steers rates
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Building2 className="h-4 w-4 text-emerald-800" aria-hidden="true" />
                  <span className="text-[0.7rem] font-medium text-[#4b5563]">
                    Banks create deposits
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Coins className="h-4 w-4 text-[#141a1f]" aria-hidden="true" />
                  <span className="text-[0.7rem] font-medium text-[#4b5563]">
                    Public transacts daily
                  </span>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
