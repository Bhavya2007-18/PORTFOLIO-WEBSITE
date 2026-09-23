'use client';

import { motion } from 'framer-motion';

export default function HeroOverlay() {
  const scrollToExplore = () => {
    const el = document.getElementById('build');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between p-6 sm:p-10 md:p-16 max-w-7xl mx-auto">
      {/* Top System Status Tag */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-3 text-xs font-mono text-[#999999] uppercase tracking-widest pt-8"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#3C9952] animate-pulse" />
        <span className="text-[#3C9952] font-semibold">[01.0 // SYSTEM INIT]</span>
        <span className="hidden sm:inline text-white/30">|</span>
        <span className="hidden sm:inline text-white/60">AUTONOMOUS COMPUTATIONAL ARCHITECTURE</span>
      </motion.div>

      {/* Hero Massive Brutalist Typography */}
      <div className="my-auto py-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-6xl"
        >
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter uppercase leading-[0.88] text-white text-readable">
            I BUILD MACHINES <br />
            <span className="text-stroke-hero">THAT THINK.</span>
          </h1>
          <p className="mt-8 text-base sm:text-lg md:text-xl text-[#b0ada8] max-w-2xl font-light leading-relaxed text-readable">
            Architecting high-performance intelligent systems, real-time neural vision pipelines, and localized edge compute clusters on physical silicon.
          </p>

          {/* Glowing Neon Green CTA Button */}
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <button
              onClick={scrollToExplore}
              className="px-7 py-4 bg-[#3C9952] text-[#080808] font-mono font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-[0_0_30px_rgba(60,153,82,0.55)] hover:shadow-[0_0_45px_rgba(60,153,82,0.85)] hover:bg-[#4ed26c] hover:scale-[1.02] flex items-center gap-3 group active:scale-95 cursor-pointer"
            >
              <span>ENTER 3D COMMAND CENTER</span>
              <span className="group-hover:translate-x-1 transition-transform font-bold">→</span>
            </button>

            <a
              href="#compute"
              className="px-6 py-4 bg-black/60 border border-white/20 text-white font-mono text-xs uppercase tracking-wider hover:border-[#3C9952] hover:text-[#3C9952] transition-colors"
            >
              INSPECT HARDWARE RIG [RTX 5070]
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom Telemetry & Tags */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-xs font-mono text-[#777777] pb-4 border-b border-white/10"
      >
        <div className="flex flex-wrap gap-4 text-[11px]">
          <span className="text-white border-b border-[#3C9952] pb-0.5">AI & ML CORE</span>
          <span className="text-white/30">·</span>
          <span className="text-white/80">REAL-TIME PIPELINES</span>
          <span className="text-white/30">·</span>
          <span className="text-white/80">LOCAL GPU INFERENCE</span>
          <span className="text-white/30">·</span>
          <span className="text-white/80">SPATIAL WEBGL</span>
        </div>

        <div className="text-[11px] text-[#3C9952] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3C9952] animate-ping" />
          <span>NEURAL MESH SYNCHRONIZED</span>
        </div>
      </motion.div>
    </section>
  );
}
