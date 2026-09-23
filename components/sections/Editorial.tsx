'use client';

export default function EditorialSection() {
  return (
    <section id="editorial" className="py-24 px-8 md:px-16 border-t border-white/10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4 font-mono text-xs text-[#999999] uppercase tracking-widest">
          [02 // EDITORIAL INTRO]
        </div>

        <div className="md:col-span-8 space-y-8">
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight leading-snug">
            NOT JUST AI MODELS. <br />
            <span className="text-[#c8f135]">INTELLIGENT COMPUTATIONAL SYSTEMS.</span>
          </h2>

          <p className="text-lg md:text-xl text-[#999999] leading-relaxed font-light">
            I build software that perceives, reasons, and acts in real-time. My engineering focus spans autonomous agent architectures, local LLM edge acceleration, high-throughput computer vision, and spatial WebGL environments.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/10 font-mono text-xs">
            <div>
              <div className="text-white/40 uppercase mb-1">LOCATION</div>
              <div className="text-white font-bold">Delhi NCR, India</div>
            </div>
            <div>
              <div className="text-white/40 uppercase mb-1">FOCUS</div>
              <div className="text-white font-bold">AI OS & Spatial UI</div>
            </div>
            <div>
              <div className="text-white/40 uppercase mb-1">STATUS</div>
              <div className="text-[#c8f135] font-bold">Available for Core AI Roles</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
