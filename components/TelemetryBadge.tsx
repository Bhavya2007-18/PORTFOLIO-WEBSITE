import React from 'react';

interface TelemetryBadgeProps {
  statusText: string;
}

/**
 * TelemetryBadge Component
 * Glassmorphic UI overlay badge with backdrop-blur-md, bg-black/40, border-white/10
 * Contains a pulsing emerald-green dot and monospaced status readout.
 */
export default function TelemetryBadge({ statusText }: TelemetryBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/10 shadow-lg shadow-black/50 text-neutral-200 text-xs font-mono tracking-wider pointer-events-none select-none">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="font-semibold text-[0.7rem] uppercase">{statusText}</span>
    </div>
  );
}
