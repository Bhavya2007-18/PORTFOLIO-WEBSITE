'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TERMINAL_LINES = [
  { text: '$ nvidia-smi --query-gpu=name,memory.total,utilization.gpu,temperature.gpu --format=csv', color: 'text-white/90', isPrompt: true },
  { text: 'name, memory.total [MiB], utilization.gpu [%], temperature.gpu', color: 'text-white/50' },
  { text: 'NVIDIA GeForce RTX 5070, 12288 MiB, 42 %, 48 C', color: 'text-[#3C9952] font-semibold' },
  { text: '$ ollama run deepseek-coder:6.7b --verbose', color: 'text-white/90', isPrompt: true },
  { text: '>>> System initialized. Context window: 16k tokens.', color: 'text-white/70' },
  { text: '>>> VRAM Allocated: 4.8 GiB / 12.0 GiB (Dedicated CUDA Core)', color: 'text-[#00f3ff]' },
  { text: '>>> Prompt evaluation: 142.6 tokens/sec | Eval rate: 64.2 tokens/sec', color: 'text-[#c8f135]' },
  { text: '$ python3 -m vllm.entrypoints.openai.api_server --model mistralai/Mistral-7B-v0.1', color: 'text-white/90', isPrompt: true },
  { text: 'INFO: Started engine process | GPU memory utilization: 0.90', color: 'text-white/60' },
  { text: 'INFO: Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)', color: 'text-[#3C9952]' },
  { text: '[ACTIVE COMPUTE STATUS: 12GB VRAM ALLOCATED // LATENCY: 12ms // 60 FPS]', color: 'text-[#3C9952] font-bold' }
];

export default function TerminalWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [displayedLineCount, setDisplayedLineCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setDisplayedLineCount((prev) => {
        if (prev < TERMINAL_LINES.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 280);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/15 rounded-lg overflow-hidden shadow-2xl shadow-black/80 font-mono text-xs"
    >
      {/* Terminal Title Bar */}
      <div className="bg-[#121217] px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
          <span className="ml-3 text-[11px] text-white/50 tracking-wider">
            bhavya@rtx-5070-compute-node:~
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-[#3C9952]">
          <span className="w-2 h-2 rounded-full bg-[#3C9952] animate-pulse" />
          <span>CUDA 12.4 // ONLINE</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-5 space-y-2 min-h-[300px] overflow-x-auto text-[12px] leading-relaxed selection:bg-[#3C9952]/30 selection:text-white">
        {TERMINAL_LINES.slice(0, displayedLineCount).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`whitespace-pre-wrap ${line.color}`}
          >
            {line.text}
          </motion.div>
        ))}

        {displayedLineCount < TERMINAL_LINES.length && (
          <div className="flex items-center gap-1 text-[#3C9952]">
            <span>&gt;</span>
            <span className="inline-block w-2 h-4 bg-[#3C9952] animate-pulse" />
          </div>
        )}

        {displayedLineCount >= TERMINAL_LINES.length && (
          <div className="pt-2 flex items-center gap-2 text-white/40 text-[11px]">
            <span className="text-[#3C9952]">&gt;</span>
            <span>Awaiting input...</span>
            <span className="inline-block w-2 h-3.5 bg-[#3C9952] animate-pulse" />
          </div>
        )}
      </div>

      {/* Terminal Footer Telemetry Bar */}
      <div className="px-4 py-2 bg-[#0d0d11] border-t border-white/5 flex flex-wrap items-center justify-between text-[10px] text-white/50 gap-2">
        <div className="flex items-center gap-3">
          <span>ARCH: <strong className="text-white/80">Blackwell (GB205)</strong></span>
          <span>•</span>
          <span>VRAM: <strong className="text-[#3C9952]">12GB GDDR7</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span>FAN: 38%</span>
          <span>•</span>
          <span>POWER: 145W / 250W</span>
        </div>
      </div>
    </div>
  );
}
