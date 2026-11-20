"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Pause, Play, Landmark } from "lucide-react";
import { useCitation } from "./CitationContext";
import { VERIFIED_SOURCES } from "@/data/verifiedSources";

const CHAPTER_LINKS = [
  { id: "chapter-1", label: "01 Origins" },
  { id: "chapter-2", label: "02 Creation" },
  { id: "chapter-3", label: "03 Plumbing" },
  { id: "chapter-4", label: "04 Policy" },
  { id: "chapter-5", label: "05 Inflation" },
  { id: "chapter-6", label: "06 Debt" },
];

export function NavbarAndProgress() {
  const { openSourcesDialog, animationsPaused, toggleAnimationsPaused } = useCitation();
  const [fallbackProgress, setFallbackProgress] = useState(0);
  const [supportsScrollTimeline, setSupportsScrollTimeline] = useState(true);

  useEffect(() => {
    const supported =
      typeof CSS !== "undefined" &&
      CSS.supports &&
      CSS.supports("animation-timeline", "scroll()");
    setSupportsScrollTimeline(supported);

    if (supported) return;

    const onScroll = () => {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setFallbackProgress(Math.min(1, Math.max(0, window.scrollY / docHeight)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-[#e2dacb] bg-[#faf7f2]/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:flex-nowrap">
        <a
          href="#main-content"
          className="inline-flex shrink-0 items-center gap-2 text-[#141a1f] transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0f6e56] text-[#faf7f2] shadow-xs">
            <Landmark className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-serif text-base font-semibold tracking-tight xl:text-lg">
            How Money Works
          </span>
        </a>

        <nav
          aria-label="Chapters"
          className="hidden items-center gap-0.5 lg:flex xl:gap-1"
        >
          {CHAPTER_LINKS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 rounded-full px-2 py-1.5 font-mono text-[0.72rem] font-medium text-[#374151] transition-colors hover:bg-[#ece4d5] hover:text-[#141a1f] xl:px-2.5 xl:text-xs"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* WCAG 2.2.2 Pause/Play control: label toggles, so intentionally no aria-pressed */}
          <button
            type="button"
            onClick={toggleAnimationsPaused}
            className="inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-full border border-[#d6ccb8] bg-white px-3 py-1.5 text-xs font-medium text-[#1f2937] transition-colors hover:bg-[#f2ede3]"
          >
            {animationsPaused ? (
              <>
                <Play className="h-3.5 w-3.5 text-emerald-800" aria-hidden="true" />
                <span>Play motion</span>
              </>
            ) : (
              <>
                <Pause className="h-3.5 w-3.5 text-amber-800" aria-hidden="true" />
                <span>Pause motion</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => openSourcesDialog()}
            className="inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-full bg-[#141a1f] px-3.5 py-1.5 text-xs font-semibold text-[#faf7f2] transition-colors hover:bg-[#27313a]"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Sources ({VERIFIED_SOURCES.length})</span>
          </button>
        </div>
      </div>

      {/* Reading progress bar (CSS scroll-driven animation with JS fallback) */}
      <div className="h-[3px] w-full bg-[#ebe3d4]" aria-hidden="true">
        <div
          className="scroll-progress-bar h-full w-full bg-gradient-to-r from-[#0f6e56] via-[#d97706] to-[#1e3a5f]"
          style={
            supportsScrollTimeline
              ? undefined
              : { transform: `scaleX(${fallbackProgress})` }
          }
        />
      </div>
    </header>
  );
}
