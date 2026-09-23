'use client';

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-32 px-8 md:px-16 border-t border-white/10 max-w-7xl mx-auto">
      <div className="font-mono text-xs text-[#999999] uppercase tracking-widest mb-6">
        [07 // CORE ENGINEERING PHILOSOPHY]
      </div>

      <div className="space-y-6">
        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tighter leading-none text-white">
          I DON&apos;T WANT AI <br />
          TO JUST ANSWER.
        </h2>
        <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-tighter leading-none text-stroke-hero">
          SEE. UNDERSTAND. REMEMBER. ACT.
        </div>
      </div>

      <div className="mt-12 max-w-2xl text-base md:text-xl text-[#999999] font-light leading-relaxed">
        Intelligence isn&apos;t a text box prompt. True AI systems maintain persistent state, perceive spatial structure, run on local consumer hardware, and execute decisions deterministically.
      </div>
    </section>
  );
}
