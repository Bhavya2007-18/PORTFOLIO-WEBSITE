'use client';

import { motion } from 'framer-motion';

const CARDS = [
  {
    num: '01',
    meta: '[01 // AGENTS & MEMORY]',
    title: 'INTELLIGENT SYSTEMS',
    desc: 'Autonomous multi-agent orchestration, dynamic knowledge graph memory architectures, and stateful reasoning loops capable of executing tools in production environments.',
    tags: ['Autonomous Agents', 'LangGraph', 'FAISS', 'State Management'],
  },
  {
    num: '02',
    meta: '[02 // COMPUTER VISION]',
    title: 'REAL-TIME AI PIPELINES',
    desc: 'Sub-millisecond landmark extraction, spatial depth estimation, gesture-driven spatial WebGL interaction, and low-latency live camera streaming pipelines.',
    tags: ['MediaPipe', 'YOLOv8', 'OpenCV', 'WebRTC'],
  },
  {
    num: '03',
    meta: '[03 // EDGE ACCELERATION]',
    title: 'LOCAL COMPUTE NODES',
    desc: 'Deploying high-throughput 4-bit/8-bit quantized LLMs natively on dedicated RTX GPU architecture using custom C++/CUDA kernels and vLLM batch schedulers.',
    tags: ['vLLM', 'Ollama', 'CUDA', 'Quantization (GGUF)'],
  },
  {
    num: '04',
    meta: '[04 // SPATIAL GRAPHICS]',
    title: 'SPATIAL 3D INTERFACES',
    desc: 'Cyber-physical visualization, custom GLSL vertex shaders, interactive Three.js/R3F scenes, and real-time GPU telemetry telemetry dashboards.',
    tags: ['Three.js', 'React Three Fiber', 'GLSL', 'Framer Motion'],
  },
];

export default function WhatIBuildSection() {
  return (
    <section id="build" className="py-28 px-6 sm:px-10 md:px-16 border-t border-white/10 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
      >
        <div>
          <div className="font-mono text-xs text-[#3C9952] uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3C9952]" />
            <span>[02 // CORE CAPABILITIES & STACK ARCHITECTURE]</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white text-readable">
            INTELLIGENT SYSTEMS &amp; <br />
            <span className="text-[#3C9952]">REAL-TIME AI PIPELINES</span>
          </h2>
        </div>
        <p className="text-sm font-mono text-[#999999] max-w-md">
          MODULAR 2X2 ARCHITECTURE // BACKED BY PHYSICAL COMPUTE HARDWARE &amp; SPATIAL RUNTIMES
        </p>
      </motion.div>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARDS.map((card, i) => (
          <motion.div
            key={card.num}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="h-full"
          >
            <div className="group relative p-6 sm:p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-400 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 hover:shadow-[0_20px_40px_-15px_rgba(60,153,82,0.2)] hover:z-10 flex flex-col justify-between min-h-[300px] h-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:shadow-[0_20px_40px_-15px_rgba(60,153,82,0.25),inset_0_1px_0_0_rgba(255,255,255,0.15)]">
              {/* Top Tag & Index */}
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="font-mono text-xs text-[#3C9952] font-semibold tracking-wider">
                    {card.meta}
                  </span>
                  <span className="font-mono text-xs text-white/30 font-bold">
                    {card.num} //
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white mb-4 group-hover:text-[#3C9952] transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-[#b0ada8] font-light leading-relaxed mb-6">
                  {card.desc}
                </p>
              </div>

              {/* Stack Chips */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/70 group-hover:border-[#3C9952]/40 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
