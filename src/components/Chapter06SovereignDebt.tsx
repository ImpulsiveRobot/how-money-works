"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scale, PieChart, Building, Landmark } from "lucide-react";
import { US_DEBT_HOLDERS } from "@/data/verifiedSources";
import { ChapterHeader, Cite, MythRealityCard } from "./CitationContext";

// Exact Present Value of a 10-year $1,000 Treasury bond with fixed 4% annual coupon (paid semiannually)
function calculateBondPrice(marketYieldPct: number, couponPct = 4.0, years = 10, faceValue = 1000): number {
  const periods = years * 2;
  const r = marketYieldPct / 100 / 2;
  const couponPayment = (faceValue * (couponPct / 100)) / 2;
  if (r <= 0.0001) {
    return faceValue + couponPayment * periods;
  }
  const pvCoupons = couponPayment * ((1 - Math.pow(1 + r, -periods)) / r);
  const pvFace = faceValue / Math.pow(1 + r, periods);
  return pvCoupons + pvFace;
}

export function Chapter06SovereignDebt() {
  const [marketYield, setMarketYield] = useState<number>(4.0);
  const [activeHolderId, setActiveHolderId] = useState<string>("domestic-private");

  const bondPrice = calculateBondPrice(marketYield);
  const priceDelta = bondPrice - 1000;
  // Seesaw tilt angle: higher yield pushes right side down (or left price down) -> range approx -14deg to +14deg
  const tiltDeg = (marketYield - 4.0) * 3.4;

  const activeHolder =
    US_DEBT_HOLDERS.find((h) => h.id === activeHolderId) ?? US_DEBT_HOLDERS[0];

  return (
    <section
      id="chapter-6"
      className="scroll-mt-20 border-t border-[#e2dacb] bg-[#f5f0e6]/70 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ChapterHeader
          number="06"
          eyebrow="Fiscal Policy, Bonds & Sovereign Finance"
          title="Government Debt, Taxes & The Bond Seesaw"
          subtitle="When governments spend more than they collect in taxes, the Treasury bridges the gap by auctioning government bonds to investors—whose market prices always move opposite to interest rates."
          citationIds={[10, 5]}
        />

        {/* Interactive Lab 1: Bond Price vs. Market Yield Seesaw */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="rounded-3xl border border-[#e2dacb] bg-white p-6 shadow-xs lg:col-span-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-[#1e3a5f]" aria-hidden="true" />
                <h3 className="font-serif text-xl font-semibold text-[#141a1f]">
                  Interactive Bond Price ↔ Yield Seesaw
                </h3>
              </div>
              <span className="rounded-full bg-[#faf7f2] px-3 py-1 font-mono text-xs font-semibold text-[#4b5563] ring-1 ring-[#e2dacb]">
                10-Year $1,000 Bond • Fixed 4.0% Coupon
              </span>
            </div>

            <p className="prose-pretty text-sm text-[#4b5563]">
              Suppose you hold a $1,000 Treasury bond that pays a fixed <strong>$40/year</strong> (4%). Slide market interest rates up or down to see what investors will pay for your existing bond today:
            </p>

            {/* Yield Slider */}
            <div className="mt-4 rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-4">
              <div className="flex items-center justify-between">
                <label htmlFor="bond-yield-slider" className="text-xs font-semibold text-[#141a1f]">
                  Current Market Interest Rate (Yield):
                </label>
                <span className="font-mono text-xl font-bold text-[#1e3a5f] tabular-nums">
                  {marketYield.toFixed(2)}%
                </span>
              </div>
              <input
                id="bond-yield-slider"
                type="range"
                min={1.0}
                max={8.0}
                step={0.25}
                value={marketYield}
                onChange={(e) => setMarketYield(parseFloat(e.target.value))}
                className="atlas-range mt-2.5 h-2.5 w-full rounded-lg bg-[#e2dacb]"
              />
              <div className="mt-1 flex justify-between font-mono text-[0.68rem] text-[#6b7280]">
                <span>1.00% (Rates Fall)</span>
                <span>4.00% (Par Value)</span>
                <span>8.00% (Rates Surge)</span>
              </div>
            </div>

            {/* Animated SVG Physical Seesaw */}
            <div className="mt-5 rounded-2xl border border-[#ece4d5] bg-[#faf7f2] p-4">
              <svg
                viewBox="0 0 460 190"
                className="mx-auto h-auto w-full max-w-[460px]"
                role="img"
                aria-label={`Seesaw showing bond market price of $${bondPrice.toFixed(0)} at a market yield of ${marketYield.toFixed(2)} percent`}
              >
                <title>Inverse Relationship Between Bond Price and Market Yield</title>

                {/* Base ground */}
                <line x1="60" y1="168" x2="400" y2="168" stroke="#d6ccb8" strokeWidth="2" />

                {/* Fulcrum triangle */}
                <polygon points="230,104 205,168 255,168" fill="#141a1f" />
                <circle cx="230" cy="106" r="6" fill="#d97706" />

                {/* Rotating Beam */}
                <motion.g
                  animate={{ rotate: tiltDeg }}
                  transition={{ type: "spring", stiffness: 150, damping: 18 }}
                  style={{ originX: "230px", originY: "106px" }}
                >
                  <rect x="46" y="101" width="368" height="10" rx="5" fill="#374151" />

                  {/* Left Weight: Existing Bond Market Price */}
                  <g transform="translate(56, 36)">
                    <rect
                      width="126"
                      height="62"
                      rx="12"
                      fill={priceDelta >= 0 ? "#0f6e56" : "#b91c1c"}
                    />
                    <text x="63" y="22" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#e5e7eb">
                      BOND MARKET PRICE
                    </text>
                    <text
                      x="63"
                      y="46"
                      textAnchor="middle"
                      fontSize="17"
                      fontFamily="var(--font-jetbrains), monospace"
                      fontWeight="700"
                      fill="#ffffff"
                    >
                      ${bondPrice.toFixed(0)}
                    </text>
                  </g>

                  {/* Right Weight: Market Yield */}
                  <g transform="translate(278, 36)">
                    <rect width="126" height="62" rx="12" fill="#1e3a5f" />
                    <text x="63" y="22" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#dbeafe">
                      MARKET YIELD
                    </text>
                    <text
                      x="63"
                      y="46"
                      textAnchor="middle"
                      fontSize="17"
                      fontFamily="var(--font-jetbrains), monospace"
                      fontWeight="700"
                      fill="#ffffff"
                    >
                      {marketYield.toFixed(2)}%
                    </text>
                  </g>
                </motion.g>
              </svg>

              <p className="mt-2 text-center text-xs text-[#374151]">
                {Math.abs(priceDelta) < 2 ? (
                  <>
                    At <strong>4.00%</strong>, your 4% coupon matches newly issued bonds, so it trades right at <strong>$1,000 par value</strong>.
                  </>
                ) : priceDelta > 0 ? (
                  <>
                    Because market rates fell below 4%, your fixed $40/yr coupon is extra valuable—buyers bid your bond up by{" "}
                    <strong className="font-mono text-emerald-800">+${priceDelta.toFixed(0)}</strong>!
                  </>
                ) : (
                  <>
                    Because new bonds pay {marketYield.toFixed(2)}%, nobody will pay $1,000 for your 4% bond—its market price drops by{" "}
                    <strong className="font-mono text-red-800">${Math.abs(priceDelta).toFixed(0)}</strong> so the buyer earns {marketYield.toFixed(2)}%.
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Interactive Lab 2: Who Owns U.S. Federal Debt? */}
          <div className="flex flex-col justify-between rounded-3xl border border-[#e2dacb] bg-white p-6 shadow-xs lg:col-span-5">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-[#0f6e56]" aria-hidden="true" />
                <h3 className="font-serif text-xl font-semibold text-[#141a1f]">
                  Who Owns U.S. Federal Debt?
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-[#4b5563]">
                Click any segment below to see the real breakdown of gross U.S. Treasury ownership per U.S. Treasury Bulletin &amp; TIC reports <Cite id={10} />:
              </p>

              {/* Stacked Proportional Bar */}
              <div
                className="mt-4 flex h-11 w-full overflow-hidden rounded-xl bg-[#ebe3d4]"
                role="group"
                aria-label="Ownership breakdown of U.S. federal debt"
              >
                {US_DEBT_HOLDERS.map((slice) => {
                  const isSelected = slice.id === activeHolderId;
                  return (
                    <button
                      key={slice.id}
                      type="button"
                      onClick={() => setActiveHolderId(slice.id)}
                      aria-pressed={isSelected}
                      style={{
                        width: `${slice.sharePercent}%`,
                        backgroundColor: slice.color,
                      }}
                      className={`flex items-center justify-center font-mono text-xs font-bold text-white transition-opacity ${
                        isSelected ? "opacity-100 ring-2 ring-inset ring-white" : "opacity-80 hover:opacity-100"
                      }`}
                      title={`${slice.label}: ${slice.rangeLabel}`}
                    >
                      {slice.sharePercent >= 10 ? `${Math.round(slice.sharePercent)}%` : ""}
                    </button>
                  );
                })}
              </div>

              {/* Slice Selector Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {US_DEBT_HOLDERS.map((slice) => {
                  const isSelected = slice.id === activeHolderId;
                  return (
                    <button
                      key={slice.id}
                      type="button"
                      onClick={() => setActiveHolderId(slice.id)}
                      aria-pressed={isSelected}
                      className={`flex items-start gap-2 rounded-xl border p-2.5 text-left transition-colors ${
                        isSelected
                          ? "border-[#141a1f] bg-[#faf7f2]"
                          : "border-[#ece4d5] bg-white hover:bg-[#faf7f2]"
                      }`}
                    >
                      <span
                        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-xs"
                        style={{ backgroundColor: slice.color }}
                        aria-hidden="true"
                      />
                      <div>
                        <div className="text-xs font-semibold leading-tight text-[#141a1f]">
                          {slice.label}
                        </div>
                        <div className="mt-0.5 font-mono text-[0.7rem] text-[#6b7280]">
                          {slice.rangeLabel}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Detail Card for Active Slice */}
              <motion.div
                key={activeHolder.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-4 rounded-2xl border border-[#e2dacb] bg-[#faf7f2] p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-serif text-base font-semibold text-[#141a1f]">
                    {activeHolder.label}
                  </span>
                  <span
                    className="rounded-md px-2 py-0.5 font-mono text-xs font-bold text-white"
                    style={{ backgroundColor: activeHolder.color }}
                  >
                    {activeHolder.rangeLabel}
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[#374151]">
                  {activeHolder.description}
                </p>
                <p className="mt-2 border-t border-[#e2dacb] pt-2 text-[0.72rem] text-[#4b5563]">
                  <strong>Includes:</strong> {activeHolder.examples}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Fiscal vs Monetary Quick Distinction */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[#1e3a5f]/25 bg-white p-5">
            <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[#1e3a5f] uppercase">
              <Building className="h-4 w-4" aria-hidden="true" />
              <span>Fiscal Policy (Elected Government &amp; Treasury)</span>
            </div>
            <p className="prose-pretty text-sm text-[#374151]">
              Controls <strong>taxation, public spending, and Treasury bond issuance</strong>.
              Directly injects or withdraws net financial wealth from the private sector and targets specific parts of the economy (infrastructure, defense, healthcare, transfers).
            </p>
          </div>
          <div className="rounded-2xl border border-amber-700/25 bg-white p-5">
            <div className="mb-2 flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-amber-900 uppercase">
              <Landmark className="h-4 w-4" aria-hidden="true" />
              <span>Monetary Policy (Independent Central Bank)</span>
            </div>
            <p className="prose-pretty text-sm text-[#374151]">
              Controls <strong>short-term policy rates, reserve supply, and lender-of-last-resort liquidity</strong>.
              Central banks in advanced economies are institutionally independent so elected politicians cannot force them to finance deficits with runaway money creation.
            </p>
          </div>
        </div>

        <MythRealityCard
          myth="Most of the U.S. national debt is owned by foreign countries like China, and a nation's budget works identically to a household credit card."
          reality="Per U.S. Treasury Bulletin and TIC data, foreign holders own roughly 23%–24% of gross U.S. federal debt (with Japan and the UK ahead of China). The largest share—over 45%—is owned domestically by U.S. pensions, mutual funds, households, banks, and local governments, while ~19%–20% is intragovernmental trust funds. Unlike a household, a sovereign currency issuer taxes a growing economy and issues debt in its own currency—though unsustainable deficits still risk higher real borrowing costs and inflation."
          citationIds={[10]}
        />
      </div>
    </section>
  );
}
