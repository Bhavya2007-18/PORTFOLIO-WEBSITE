'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section id="about" className="py-28 px-6 sm:px-10 md:px-16 border-t border-white/10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-4 font-mono text-xs text-[#3C9952] uppercase tracking-widest flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[#3C9952]" />
          <span>[04 // BIO &amp; CREDENTIALS]</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="md:col-span-8 space-y-8"
        >
          <div>
            <span className="font-mono text-xs text-white/50 uppercase tracking-widest block mb-2">
              FOUNDER &amp; LEAD SYSTEMS ENGINEER
            </span>
            <h2 className="text-4xl sm:text-6xl font-extrabold uppercase tracking-tight text-white text-readable">
              BHAVYA PORWAL
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-[#b0ada8] font-light leading-relaxed text-readable">
            Computer Science &amp; Engineering specialist specializing in Artificial Intelligence and Machine Learning. Passionate about bridging frontier deep learning research with production-grade engineering, spatial visual computing, and local edge inference clusters.
          </p>

          <div className="bg-[#0c0c10]/80 backdrop-blur-md border border-white/10 p-6 sm:p-8 font-mono text-xs space-y-4">
            <div className="text-[#3C9952] font-bold text-sm tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3C9952] animate-ping" />
              <span>ACADEMIC FOUNDATION</span>
            </div>
            <div className="text-white text-base font-sans font-bold">
              B.Tech in Computer Science &amp; Engineering (AI/ML)
            </div>
            <div className="text-[#999999]">
              Guru Gobind Singh Indraprastha University (GGSIPU) — Delhi, India
            </div>
            <div className="flex flex-wrap gap-4 pt-3 border-t border-white/10 text-white/70">
              <span>Cumulative SGPA: <strong className="text-white font-bold">8.74 / 10.0</strong></span>
              <span>•</span>
              <span>Specialization: <strong className="text-[#3C9952]">Neural Architectures &amp; Distributed Systems</strong></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
