'use client';

import { motion } from 'framer-motion';
import { usePortfolioStore } from '@/lib/store';
import { Activity } from 'lucide-react';

export default function FooterSection() {
  const isDiagnosticsActive = usePortfolioStore((s) => s.isDiagnosticsActive);
  const toggleDiagnostics = usePortfolioStore((s) => s.toggleDiagnostics);

  return (
    <footer id="contact" className="py-28 px-6 sm:px-10 md:px-16 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[50vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div className="font-mono text-xs text-[#3C9952] uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#3C9952] animate-pulse" />
            <span>[07 // SYSTEM SHUTDOWN &amp; TRANSMISSION]</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter hover:text-[#3C9952] transition-colors leading-[0.9] text-white text-readable">
            LET&apos;S BUILD <br />
            INTELLIGENT SYSTEMS.
          </h2>

          <p className="mt-8 text-base sm:text-lg text-[#b0ada8] font-light max-w-xl text-readable">
            Open for high-impact AI/ML engineering roles, autonomous agent research, and real-time spatial vision systems.
          </p>
        </motion.div>

        {/* Footer Bottom Bar with Diagnostics Toggle and Social Links */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 font-mono text-xs text-[#999999]">
          {/* Bottom-left diagnostics toggle */}
          <button
            onClick={toggleDiagnostics}
            className={`px-4 py-2.5 backdrop-blur-md border rounded-none text-xs font-mono flex items-center gap-3 transition-all cursor-pointer ${
              isDiagnosticsActive
                ? 'bg-[#3C9952]/20 border-[#3C9952] text-[#3C9952] shadow-[0_0_20px_rgba(60,153,82,0.3)]'
                : 'bg-black/60 border-white/20 text-white/80 hover:text-white hover:border-[#3C9952]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#3C9952] animate-ping inline-block" />
            <Activity className="w-3.5 h-3.5 text-[#3C9952]" />
            <span>DIAGNOSTICS MODE: {isDiagnosticsActive ? 'ON' : 'OFF'}</span>
          </button>

          {/* Social Links */}
          <div className="flex flex-wrap gap-6 text-white/80">
            <a href="mailto:porwalbhavya07@gmail.com" className="hover:text-[#3C9952] transition-colors">
              EMAIL ↗
            </a>
            <a href="https://github.com/Bhavya2007-18" target="_blank" rel="noopener noreferrer" className="hover:text-[#3C9952] transition-colors">
              GITHUB ↗
            </a>
            <a href="https://www.linkedin.com/in/bhavya-porwal-1a1283370/" target="_blank" rel="noopener noreferrer" className="hover:text-[#3C9952] transition-colors">
              LINKEDIN ↗
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#3C9952] transition-colors">
              X (TWITTER) ↗
            </a>
          </div>

          <div className="text-white/40 text-[11px]">
            © 2026 BHAVYA PORWAL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
