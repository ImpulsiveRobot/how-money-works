"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { BookCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { VERIFIED_SOURCES } from "@/data/verifiedSources";

interface CitationContextValue {
  openSourcesDialog: (sourceId?: number) => void;
  activeSourceId: number | null;
  isDialogOpen: boolean;
  closeSourcesDialog: () => void;
  animationsPaused: boolean;
  toggleAnimationsPaused: () => void;
}

const CitationContext = createContext<CitationContextValue | null>(null);

export function CitationProvider({ children }: { children: React.ReactNode }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeSourceId, setActiveSourceId] = useState<number | null>(null);
  const [animationsPaused, setAnimationsPaused] = useState(false);

  const openSourcesDialog = useCallback((sourceId?: number) => {
    setActiveSourceId(sourceId ?? null);
    setIsDialogOpen(true);
  }, []);

  const closeSourcesDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const toggleAnimationsPaused = useCallback(() => {
    setAnimationsPaused((prev) => !prev);
  }, []);

  return (
    <CitationContext.Provider
      value={{
        openSourcesDialog,
        activeSourceId,
        isDialogOpen,
        closeSourcesDialog,
        animationsPaused,
        toggleAnimationsPaused,
      }}
    >
      <div data-motion-paused={animationsPaused ? "true" : "false"}>
        {children}
      </div>
    </CitationContext.Provider>
  );
}

export function useCitation() {
  const ctx = useContext(CitationContext);
  if (!ctx) {
    throw new Error("useCitation must be used within CitationProvider");
  }
  return ctx;
}

export function Cite({ id }: { id: number }) {
  const { openSourcesDialog } = useCitation();
  const source = VERIFIED_SOURCES.find((s) => s.id === id);

  return (
    <button
      type="button"
      onClick={() => openSourcesDialog(id)}
      className="mx-0.5 inline-flex min-h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-md border border-emerald-800/25 bg-emerald-50/90 px-1.5 py-0.5 align-baseline font-mono text-[0.72rem] font-semibold text-emerald-900 transition-colors hover:border-emerald-700 hover:bg-emerald-100"
      aria-label={`View verified source ${id}: ${source?.institution ?? ""} ${source?.shortLabel ?? ""}`}
    >
      [{id}]
    </button>
  );
}

export function ChapterHeader({
  number,
  eyebrow,
  title,
  subtitle,
  citationIds,
}: {
  number: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  citationIds: number[];
}) {
  const { openSourcesDialog } = useCitation();

  return (
    <div className="mb-8 flex flex-col gap-3 border-b border-[#e2dacb] pb-6 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="inline-flex items-center rounded-full bg-[#141a1f] px-3 py-1 font-mono text-xs font-semibold tracking-wider text-[#faf7f2]">
            CHAPTER {number}
          </span>
          <span className="font-mono text-xs font-medium tracking-wide text-amber-800 uppercase">
            {eyebrow}
          </span>
        </div>
        <h2
          className="heading-balance font-serif font-semibold tracking-tight text-[#141a1f]"
          style={{ fontSize: "clamp(1.75rem, 1.2rem + 1.8vw, 2.75rem)", lineHeight: 1.15 }}
        >
          {title}
        </h2>
        <p className="prose-pretty text-base text-[#4b5563] md:text-[1.0625rem]">
          {subtitle}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-1.5 pt-2 md:justify-end">
        <button
          type="button"
          onClick={() => openSourcesDialog(citationIds[0])}
          className="inline-flex min-h-[2.25rem] items-center gap-1.5 rounded-full border border-emerald-800/25 bg-white px-3 py-1.5 text-xs font-medium text-emerald-900 shadow-xs transition-colors hover:bg-emerald-50"
        >
          <BookCheck className="h-3.5 w-3.5" aria-hidden="true" />
          <span>
            Verified ({citationIds.map((id) => `[${id}]`).join(" ")})
          </span>
        </button>
      </div>
    </div>
  );
}

export function MythRealityCard({
  myth,
  reality,
  citationIds,
}: {
  myth: string;
  reality: string;
  citationIds: number[];
}) {
  return (
    <div className="mt-8 grid gap-4 rounded-2xl border border-[#e2dacb] bg-[#f6f1e7] p-5 md:grid-cols-2 md:p-6">
      <div className="rounded-xl border border-red-900/15 bg-white/85 p-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-red-800 uppercase">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Common Misconception</span>
        </div>
        <p className="prose-pretty text-sm leading-relaxed text-[#374151]">{myth}</p>
      </div>
      <div className="rounded-xl border border-emerald-800/20 bg-emerald-950/[0.03] p-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-900 uppercase">
          <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>Verified Economic Reality</span>
        </div>
        <p className="prose-pretty text-sm leading-relaxed text-[#1f2937]">
          {reality}{" "}
          {citationIds.map((id) => (
            <Cite key={id} id={id} />
          ))}
        </p>
      </div>
    </div>
  );
}
