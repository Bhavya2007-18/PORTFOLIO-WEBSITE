'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-[72px] z-50 bg-[#080808]/85 backdrop-blur-md border-b border-white/10 px-6 sm:px-8 flex items-center justify-between">
      {/* Brand / Logo */}
      <div className="flex items-center gap-6">
        <a href="#" className="font-mono font-bold text-sm tracking-wider text-white hover:text-[#3C9952] transition-colors">
          BHAVYA<span className="text-[#3C9952]">®</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#999999]">
          <a href="#build" className="hover:text-white transition-colors">SYSTEMS</a>
          <a href="#work" className="hover:text-white transition-colors">WORK</a>
          <a href="#compute" className="hover:text-white transition-colors">COMPUTE</a>
          <a href="#lab" className="hover:text-white transition-colors">LAB</a>
          <a href="#stack" className="hover:text-white transition-colors">STACK</a>
          <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
        </div>
      </div>

      {/* Right readout specified by prompt */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-[#3C9952] bg-white/[0.03] px-3 py-1.5 border border-[#3C9952]/30 rounded">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3C9952] animate-pulse" />
          <span>SYS.LOC : DELHI | INDIA [28.6139° N, 77.2090° E]</span>
        </div>

        <a
          href="#contact"
          className="hidden md:inline-block px-3 py-1.5 bg-[#3C9952] text-[#080808] font-mono text-xs font-bold hover:bg-white transition-colors uppercase tracking-wider"
        >
          CONNECT ↗
        </a>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden font-mono text-xs text-white p-2 border border-white/10"
          aria-label="Toggle Navigation"
        >
          {isOpen ? '[CLOSE]' : '[MENU]'}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 top-[72px] bg-black/95 backdrop-blur-2xl z-50 flex flex-col p-8 space-y-6 font-mono text-base text-white border-b border-white/10">
          <div className="text-[11px] text-[#3C9952] pb-3 border-b border-white/10">
            SYS.LOC : DELHI | INDIA [28.6139° N, 77.2090° E]
          </div>
          <a href="#build" onClick={() => setIsOpen(false)} className="hover:text-[#3C9952]">SYSTEMS</a>
          <a href="#work" onClick={() => setIsOpen(false)} className="hover:text-[#3C9952]">WORK</a>
          <a href="#compute" onClick={() => setIsOpen(false)} className="hover:text-[#3C9952]">COMPUTE (RTX 5070)</a>
          <a href="#lab" onClick={() => setIsOpen(false)} className="hover:text-[#3C9952]">LAB</a>
          <a href="#stack" onClick={() => setIsOpen(false)} className="hover:text-[#3C9952]">STACK</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-[#3C9952]">ABOUT</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="text-[#3C9952] pt-4 border-t border-white/10 font-bold">CONNECT ↗</a>
        </div>
      )}
    </nav>
  );
}
