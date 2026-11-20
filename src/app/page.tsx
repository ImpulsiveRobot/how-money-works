"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import { BookCheck, ArrowUp } from "lucide-react";
import { CitationProvider, useCitation } from "@/components/CitationContext";
import { NavbarAndProgress } from "@/components/NavbarAndProgress";
import { HeroSection } from "@/components/HeroSection";
import { Chapter01History } from "@/components/Chapter01History";
import { Chapter02BankCreation } from "@/components/Chapter02BankCreation";
import { Chapter03Plumbing } from "@/components/Chapter03Plumbing";
import { Chapter04CentralBank } from "@/components/Chapter04CentralBank";
import { Chapter05Inflation } from "@/components/Chapter05Inflation";
import { Chapter06SovereignDebt } from "@/components/Chapter06SovereignDebt";
import { SourcesDialog } from "@/components/SourcesDialog";
import { VERIFIED_SOURCES } from "@/data/verifiedSources";

function FooterSection() {
  const { openSourcesDialog } = useCitation();

  return (
    <footer className="border-t border-[#e2dacb] bg-[#141a1f] py-14 text-[#faf7f2]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-7">
            <h2 className="font-serif text-2xl font-semibold text-white">
              How Money Works — Interactive Monetary Atlas
            </h2>
            <p className="prose-pretty text-sm leading-relaxed text-gray-300">
              Built as an animated visual reference grounded in primary central bank publications
              and official statistical series. Every interactive simulation simplifies real-world
              balance sheets for clarity while preserving the exact accounting identities and
              verified institutional mechanics.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openSourcesDialog()}
                className="inline-flex min-h-[2.5rem] items-center gap-2 rounded-full bg-[#0f6e56] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#138568]"
              >
                <BookCheck className="h-4 w-4" aria-hidden="true" />
                <span>Open Full Research Ledger ({VERIFIED_SOURCES.length} Sources)</span>
              </button>
              <a
                href="#main-content"
                className="inline-flex min-h-[2.5rem] items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-gray-200 transition-colors hover:bg-white/10"
              >
                <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Back to top</span>
              </a>
            </div>
          </div>

          <div className="space-y-2 md:col-span-5">
            <h3 className="font-mono text-xs font-semibold tracking-wider text-amber-300 uppercase">
              Primary Institutions Cited
            </h3>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-gray-300 sm:grid-cols-2">
              <li>Bank of England (Quarterly Bulletin 2014)</li>
              <li>Deutsche Bundesbank (Monthly Report 2017)</li>
              <li>Board of Governors of the Federal Reserve</li>
              <li>Federal Reserve Financial Services (Fedwire)</li>
              <li>U.S. Bureau of Labor Statistics (CPI-U)</li>
              <li>U.S. Department of the Treasury (TIC)</li>
              <li>Reserve Bank of New Zealand (1989 Act)</li>
              <li>Federal Reserve History Archives</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <CitationProvider>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <NavbarAndProgress />
        <main>
          <HeroSection />
          <Chapter01History />
          <Chapter02BankCreation />
          <Chapter03Plumbing />
          <Chapter04CentralBank />
          <Chapter05Inflation />
          <Chapter06SovereignDebt />
        </main>
        <FooterSection />
        <SourcesDialog />
      </CitationProvider>
    </MotionConfig>
  );
}
