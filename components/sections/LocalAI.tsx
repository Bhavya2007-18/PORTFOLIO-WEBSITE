'use client';

import { motion } from 'framer-motion';
import TerminalWidget from '@/components/TerminalWidget';

export default function LocalAISection() {
  return (
    <section id="compute" className="py-28 px-6 sm:px-10 md:px-16 border-t border-white/10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Info */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="font-mono text-xs text-[#3C9952] uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3C9952] animate-pulse" />
            <span>[03 // DEDICATED HARDWARE ACCELERATION]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight text-readable">
            RUNNING AI LOCALLY. <br />
            <span className="text-[#3C9952]">RTX 5070 COMPUTE NODE.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#b0ada8] font-light leading-relaxed text-readable">
            I build, fine-tune, and benchmark machine learning architectures directly on local desktop silicon. Zero cloud latency, absolute data sovereignty, and sub-20ms first-token latency on quantized models.
          </p>

          <div className="space-y-3 font-mono text-xs text-white/80 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-white/40">COMPUTE SILICON</span>
              <span className="text-white font-bold">NVIDIA RTX 5070 (12GB GDDR7)</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-white/40">HOST ORCHESTRATOR</span>
              <span className="text-white font-bold">vLLM + Ollama Core Engine</span>
            </div>
            <div className="flex items-center justify-between py-1.5 border-b border-white/5">
              <span className="text-white/40">LATENCY / TPS</span>
              <span className="text-[#3C9952] font-bold">12ms // ~86 tokens/sec</span>
            </div>
            <div className="flex items-center justify-between py-1.5">
              <span className="text-white/40">PIPELINE SECURITY</span>
              <span className="text-white font-bold">Air-Gapped Local Inference</span>
            </div>
          </div>
        </motion.div>

        {/* Right Terminal Widget */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <TerminalWidget />
        </motion.div>
      </div>
    </section>
  );
}
