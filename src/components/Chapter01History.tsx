"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Repeat, Sparkles, Clock } from "lucide-react";
import { HISTORICAL_ERAS } from "@/data/verifiedSources";
import { ChapterHeader, Cite, MythRealityCard, useCitation } from "./CitationContext";

const TRADERS = [
  { id: "baker", name: "Baker", makes: "Bread", wants: "Shoes", x: 210, y: 42 },
  { id: "cobbler", name: "Cobbler", makes: "Shoes", wants: "Cloth", x: 355, y: 155 },
  { id: "weaver", name: "Weaver", makes: "Cloth", wants: "Pottery", x: 210, y: 268 },
  { id: "potter", name: "Potter", makes: "Pottery", wants: "Bread", x: 65, y: 155 },
];

export function Chapter01History() {
  const [tradeMode, setTradeMode] = useState<"barter" | "money">("barter");
  const [selectedEraIdx, setSelectedEraIdx] = useState<number>(0);
  const { animationsPaused } = useCitation();

  const currentEra = HISTORICAL_ERAS[selectedEraIdx];

  return (
    <section id="chapter-1" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ChapterHeader
          number="01"
          eyebrow="Trust, Ledgers & Evolution"
          title="What Is Money, Really?"
          subtitle="Money is a social technology: a shared ledger that solves the friction of matching wants and lets strangers measure, trade, and store value across time."
          citationIds={[9, 1]}
        />

        {/* Interactive Lab 1: Barter Friction vs Shared Medium */}
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-3xl border border-[#e2dacb] bg-white p-6 shadow-xs lg:col-span-7">
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-serif text-xl font-semibold text-[#141a1f]">
                    Interactive Simulation: The Double Coincidence Problem
                  </h3>
                  <p className="mt-1 text-sm text-[#4b5563]">
                    Toggle between direct barter and a shared unit of account to see why trade unlocks.
                  </p>
                </div>
                <div
                  className="inline-flex rounded-full border border-[#d6ccb8] bg-[#faf7f2] p-1"
                  role="group"
                  aria-label="Exchange mechanism"
                >
                  <button
                    type="button"
                    onClick={() => setTradeMode("barter")}
                    aria-pressed={tradeMode === "barter"}
                    className={`inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      tradeMode === "barter"
                        ? "bg-red-800 text-white shadow-xs"
                        : "text-[#374151] hover:text-[#141a1f]"
                    }`}
                  >
                    <Repeat className="h-3.5 w-3.5" aria-hidden="true" />
                    Direct Barter
                  </button>
                  <button
                    type="button"
                    onClick={() => setTradeMode("money")}
                    aria-pressed={tradeMode === "money"}
                    className={`inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                      tradeMode === "money"
                        ? "bg-[#0f6e56] text-white shadow-xs"
                        : "text-[#374151] hover:text-[#141a1f]"
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    Shared Money
                  </button>
                </div>
              </div>

              <svg
                viewBox="0 0 420 310"
                className="mx-auto h-auto w-full max-w-[460px]"
                role="img"
                aria-label={
                  tradeMode === "barter"
                    ? "Barter gridlock: four traders cannot match their goods directly"
                    : "Money network: four traders exchange smoothly using a central shared unit of account"
                }
              >
                <title>
                  {tradeMode === "barter"
                    ? "Direct Barter Gridlock"
                    : "Shared Money Circulation"}
                </title>

                {/* Outer circular trade paths */}
                {tradeMode === "barter" ? (
                  <g>
                    {/* Failed direct barter arrows */}
                    <path
                      d="M 255 62 L 325 125"
                      stroke="#b91c1c"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      fill="none"
                    />
                    <path
                      d="M 325 188 L 255 248"
                      stroke="#b91c1c"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      fill="none"
                    />
                    <path
                      d="M 165 248 L 95 188"
                      stroke="#b91c1c"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      fill="none"
                    />
                    <path
                      d="M 95 125 L 165 62"
                      stroke="#b91c1c"
                      strokeWidth="2"
                      strokeDasharray="5 5"
                      fill="none"
                    />

                    {/* Central deadlock badge */}
                    <rect
                      x="138"
                      y="130"
                      width="144"
                      height="50"
                      rx="12"
                      fill="#fef2f2"
                      stroke="#fecaca"
                    />
                    <text
                      x="210"
                      y="151"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="#991b1b"
                    >
                      TRADE GRIDLOCK
                    </text>
                    <text
                      x="210"
                      y="168"
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="#b91c1c"
                    >
                      No direct two-way match
                    </text>
                  </g>
                ) : (
                  <g>
                    {/* Smooth emerald circular flow */}
                    <circle
                      cx="210"
                      cy="155"
                      r="108"
                      fill="none"
                      stroke="#0f6e56"
                      strokeWidth="3"
                      className="flow-dash flow-dash-animated"
                    />

                    {/* Animated money tokens orbiting smoothly */}
                    {!animationsPaused && (
                      <>
                        <motion.g
                          animate={{ rotate: 360 }}
                          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                          style={{ originX: "210px", originY: "155px" }}
                        >
                          <circle cx="210" cy="47" r="9" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                          <text
                            x="210"
                            y="50.5"
                            textAnchor="middle"
                            fontSize="9.5"
                            fontWeight="700"
                            fill="#ffffff"
                          >
                            $
                          </text>
                        </motion.g>
                        <motion.g
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 7,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 3.5,
                          }}
                          style={{ originX: "210px", originY: "155px" }}
                        >
                          <circle cx="210" cy="47" r="9" fill="#d97706" stroke="#ffffff" strokeWidth="2" />
                          <text
                            x="210"
                            y="50.5"
                            textAnchor="middle"
                            fontSize="9.5"
                            fontWeight="700"
                            fill="#ffffff"
                          >
                            $
                          </text>
                        </motion.g>
                      </>
                    )}

                    {/* Center badge */}
                    <rect
                      x="138"
                      y="130"
                      width="144"
                      height="50"
                      rx="12"
                      fill="#ecfdf5"
                      stroke="#a7f3d0"
                    />
                    <text
                      x="210"
                      y="151"
                      textAnchor="middle"
                      fontSize="11"
                      fontWeight="700"
                      fill="#065f46"
                    >
                      UNIVERSAL LEDGER
                    </text>
                    <text
                      x="210"
                      y="168"
                      textAnchor="middle"
                      fontSize="9.5"
                      fill="#047857"
                    >
                      All 4 trades clear instantly
                    </text>
                  </g>
                )}

                {/* Trader Nodes */}
                {TRADERS.map((t) => (
                  <g key={t.id} transform={`translate(${t.x - 56}, ${t.y - 26})`}>
                    <rect
                      width="112"
                      height="52"
                      rx="12"
                      fill="#ffffff"
                      stroke={tradeMode === "money" ? "#0f6e56" : "#d6ccb8"}
                      strokeWidth="1.75"
                    />
                    <text
                      x="56"
                      y="20"
                      textAnchor="middle"
                      fontSize="11.5"
                      fontWeight="700"
                      fill="#141a1f"
                    >
                      {t.name}
                    </text>
                    <text
                      x="56"
                      y="38"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontFamily="var(--font-jetbrains), monospace"
                      fill="#4b5563"
                    >
                      Has {t.makes} → {t.wants}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="mt-4 rounded-xl bg-[#faf7f2] p-4 text-sm text-[#374151]">
              {tradeMode === "barter" ? (
                <p className="prose-pretty">
                  <strong>Why barter stalls among strangers:</strong> The Baker needs Shoes,
                  but the Cobbler wants Cloth, not Bread. Without a shared medium, every trade
                  requires a rare <em>double coincidence of wants</em>—or a trusted credit ledger.
                </p>
              ) : (
                <p className="prose-pretty">
                  <strong>How money unlocks specialization:</strong> Everyone accepts the same
                  unit of account. The Baker sells Bread to the Potter for money, then immediately
                  buys Shoes from the Cobbler—breaking the chain of coincidence.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: The Three Classic Functions + Quick Facts */}
          <div className="flex flex-col justify-between gap-4 lg:col-span-5">
            <div className="rounded-3xl border border-[#e2dacb] bg-white p-6 shadow-xs">
              <h3 className="font-serif text-xl font-semibold text-[#141a1f]">
                The Three Jobs of Money
              </h3>
              <p className="mt-1.5 text-sm text-[#4b5563]">
                Economists define money not by what it is made of, but by the three roles it performs
                <Cite id={1} />:
              </p>
              <ol className="mt-4 space-y-3.5">
                <li className="rounded-xl border border-[#ece4d5] bg-[#faf7f2] p-3.5">
                  <div className="flex items-center gap-2 font-semibold text-[#141a1f]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0f6e56] font-mono text-xs text-white">
                      1
                    </span>
                    <span>Unit of Account</span>
                  </div>
                  <p className="mt-1 text-sm text-[#4b5563]">
                    The shared yardstick used to quote prices, wages, debts, and profits—like inches for length.
                  </p>
                </li>
                <li className="rounded-xl border border-[#ece4d5] bg-[#faf7f2] p-3.5">
                  <div className="flex items-center gap-2 font-semibold text-[#141a1f]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#d97706] font-mono text-xs text-white">
                      2
                    </span>
                    <span>Medium of Exchange</span>
                  </div>
                  <p className="mt-1 text-sm text-[#4b5563]">
                    Widely accepted in payment for goods, services, and taxes—because everyone trusts everyone else will accept it too.
                  </p>
                </li>
                <li className="rounded-xl border border-[#ece4d5] bg-[#faf7f2] p-3.5">
                  <div className="flex items-center gap-2 font-semibold text-[#141a1f]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1e3a5f] font-mono text-xs text-white">
                      3
                    </span>
                    <span>Store of Value</span>
                  </div>
                  <p className="mt-1 text-sm text-[#4b5563]">
                    Preserves purchasing power from today into the future—though inflation gradually erodes cash if left idle.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Interactive Lab 2: 5,000-Year Timeline Scrubber */}
        <div className="mt-8 rounded-3xl border border-[#e2dacb] bg-white p-6 shadow-xs md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-amber-800 uppercase">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                <span>5,000 Years of Monetary Technology</span>
              </div>
              <h3 className="mt-1 font-serif text-2xl font-semibold text-[#141a1f]">
                From Clay Credit Tablets to Modern Fiat
              </h3>
            </div>
            <span className="font-mono text-xs text-[#6b7280]">
              Select any milestone to inspect
            </span>
          </div>

          {/* Era Selector Buttons */}
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-5"
            role="tablist"
            aria-label="Historical eras of money"
          >
            {HISTORICAL_ERAS.map((era, idx) => {
              const active = idx === selectedEraIdx;
              return (
                <button
                  key={era.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedEraIdx(idx)}
                  className={`flex flex-col items-start rounded-xl border p-3 text-left transition-all ${
                    active
                      ? "border-[#0f6e56] bg-[#0f6e56] text-white shadow-sm"
                      : "border-[#e2dacb] bg-[#faf7f2] text-[#141a1f] hover:border-[#0f6e56]/50 hover:bg-white"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.7rem] font-semibold ${
                      active ? "text-emerald-200" : "text-amber-800"
                    }`}
                  >
                    {era.year}
                  </span>
                  <span className="mt-0.5 text-xs font-semibold leading-snug">
                    {era.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated Era Detail Panel */}
          <div className="mt-6 min-h-[13.5rem] overflow-hidden rounded-2xl border border-[#ece4d5] bg-[#faf7f2] p-5 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEra.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="grid gap-6 md:grid-cols-12"
              >
                <div className="space-y-2.5 md:col-span-7">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-amber-100 px-2.5 py-0.5 font-mono text-xs font-semibold text-amber-950">
                      {currentEra.year}
                    </span>
                    <span className="text-xs font-medium text-[#4b5563]">
                      {currentEra.region}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl font-semibold text-[#141a1f]">
                    {currentEra.title}
                  </h4>
                  <p className="prose-pretty text-sm leading-relaxed text-[#374151] md:text-base">
                    {currentEra.summary} <Cite id={currentEra.citationId} />
                  </p>
                </div>

                <div className="space-y-3 md:col-span-5">
                  <div className="rounded-xl bg-white p-3.5 ring-1 ring-[#e2dacb]">
                    <div className="font-mono text-[0.68rem] font-semibold tracking-wider text-[#6b7280] uppercase">
                      What Backed It
                    </div>
                    <p className="mt-1 text-sm font-medium text-[#141a1f]">
                      {currentEra.backing}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-emerald-50/75 p-3 ring-1 ring-emerald-800/15">
                      <div className="font-mono text-[0.68rem] font-semibold tracking-wider text-emerald-900 uppercase">
                        Breakthrough
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-emerald-950">
                        {currentEra.breakthrough}
                      </p>
                    </div>
                    <div className="rounded-xl bg-amber-50/80 p-3 ring-1 ring-amber-800/15">
                      <div className="font-mono text-[0.68rem] font-semibold tracking-wider text-amber-900 uppercase">
                        Limitation
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-amber-950">
                        {currentEra.limitation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() =>
                  setSelectedEraIdx((prev) => (prev + 1) % HISTORICAL_ERAS.length)
                }
                className="inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-full bg-[#141a1f] px-4 py-1.5 text-xs font-semibold text-[#faf7f2] transition-colors hover:bg-[#2a343d]"
              >
                <span>
                  Next Era:{" "}
                  {HISTORICAL_ERAS[(selectedEraIdx + 1) % HISTORICAL_ERAS.length].title}
                </span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <MythRealityCard
          myth="Early villages traded everything via spot barter until someone invented gold coins to make barter easier."
          reality="Archaeological and anthropological evidence shows no society ever relied purely on spot barter before money. Ancient Mesopotamian cuneiform clay tablets (c. 3000 BCE) prove credit and debt ledgers preceded stamped metal coins by over two millennia—spot barter usually occurred only between strangers or when a currency collapsed."
          citationIds={[9]}
        />
      </div>
    </section>
  );
}
