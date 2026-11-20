"use client";

import React, { useEffect, useRef } from "react";
import { X, ExternalLink, ShieldCheck } from "lucide-react";
import { VERIFIED_SOURCES } from "@/data/verifiedSources";
import { useCitation } from "./CitationContext";

export function SourcesDialog() {
  const { isDialogOpen, activeSourceId, closeSourcesDialog } = useCitation();
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync React open state with native showModal() / close()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isDialogOpen && !dialog.open) {
      dialog.showModal();
      if (activeSourceId !== null) {
        const target = dialog.querySelector<HTMLElement>(
          `[data-source-id="${activeSourceId}"]`
        );
        target?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    } else if (!isDialogOpen && dialog.open) {
      dialog.close();
    }
  }, [isDialogOpen, activeSourceId]);

  // Native close event & pointer-position light-dismiss fallback for browsers without closedBy
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      closeSourcesDialog();
    };

    dialog.addEventListener("close", handleClose);

    // Fallback per modern-web-guidance (dialog): test bounding rect on both pointerdown and pointerup
    let cleanupFallback: (() => void) | undefined;
    if (typeof window !== "undefined" && !("closedBy" in HTMLDialogElement.prototype)) {
      const outside = (e: PointerEvent) => {
        const r = dialog.getBoundingClientRect();
        return (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        );
      };
      let pressedOutside = false;
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = outside(e);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e)) {
          dialog.close();
        }
        pressedOutside = false;
      };
      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);
      cleanupFallback = () => {
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      cleanupFallback?.();
    };
  }, [closeSourcesDialog]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="sources-dialog-title"
      className="sources-dialog"
      {...({ closedby: "any" } as Record<string, string>)}
    >
      <div className="flex items-start justify-between gap-4 border-b border-[#e2dacb] bg-[#faf7f2] px-6 py-5">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider text-emerald-900 uppercase">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Primary Institutional Citations</span>
          </div>
          <h2
            id="sources-dialog-title"
            className="font-serif text-2xl font-semibold text-[#141a1f]"
          >
            Research &amp; Fact-Check Ledger
          </h2>
          <p className="text-sm text-[#4b5563]">
            Every mechanism, date, and statistic in this interactive guide is cross-checked
            against central bank research and official statistical agencies.
          </p>
        </div>
        <form method="dialog">
          <button
            type="submit"
            value="close"
            autoFocus
            aria-label="Close research ledger"
            className="inline-flex min-h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-full border border-[#d6ccb8] bg-white text-[#141a1f] transition-colors hover:bg-[#f2ede3]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5">
        <ol className="space-y-4">
          {VERIFIED_SOURCES.map((source) => {
            const isHighlighted = activeSourceId === source.id;
            return (
              <li
                key={source.id}
                data-source-id={source.id}
                className={`rounded-xl border p-4 transition-colors ${
                  isHighlighted
                    ? "border-emerald-700 bg-emerald-50/70 shadow-xs"
                    : "border-[#e2dacb] bg-[#faf7f2]/60"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex rounded bg-[#141a1f] px-2 py-0.5 font-mono text-xs font-semibold text-[#faf7f2]">
                        [{source.id}]
                      </span>
                      <span className="text-xs font-semibold tracking-wide text-emerald-900 uppercase">
                        {source.institution}
                      </span>
                      <span className="font-mono text-xs text-[#6b7280]">
                        {source.year}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#141a1f]">
                      {source.title}
                    </h3>
                    <p className="text-xs text-[#4b5563]">{source.authorsOrDivision}</p>
                  </div>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[2rem] items-center gap-1 rounded-full border border-[#d6ccb8] bg-white px-3 py-1 text-xs font-medium text-[#141a1f] transition-colors hover:border-emerald-700 hover:text-emerald-900"
                  >
                    <span>Official Source</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>

                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#374151]">
                  {source.keyVerifiedFacts.map((fact, idx) => (
                    <li key={idx}>{fact}</li>
                  ))}
                </ul>

                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-medium text-[#6b7280]">Cited in:</span>
                  {source.chapterRefs.map((ref) => (
                    <span
                      key={ref}
                      className="rounded-md bg-white px-2 py-0.5 font-mono text-[0.7rem] text-[#374151] ring-1 ring-[#e2dacb]"
                    >
                      {ref}
                    </span>
                  ))}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </dialog>
  );
}
