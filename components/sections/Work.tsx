'use client';

const PROJECTS = [
  {
    num: '04',
    title: 'BABES AI OS',
    subtitle: 'PERSONAL AI OPERATING SYSTEM',
    desc: 'Autonomous background intelligence system continuously processing context, managing knowledge graphs, and taking proactive actions across applications.',
    loop: ['OBSERVE', 'UNDERSTAND', 'REMEMBER', 'PREDICT', 'ALERT', 'ACT'],
    status: 'ACTIVE PIPELINE',
    tech: ['Python', 'PyTorch', 'FAISS', 'LangChain', 'FastAPI'],
    color: '#c8f135',
  },
  {
    num: '05',
    title: 'REALIS WORKSPACE',
    subtitle: 'AI PHYSICS & ENGINEERING SIMULATOR',
    desc: 'High-throughput 3D WebGL physics design workspace using neural surrogate models to accelerate real-time fluid and mechanical simulation.',
    loop: ['DESIGN', 'SIMULATE', 'ANALYZE', 'TEST'],
    status: 'DEPLOYED SYSTEM',
    tech: ['Three.js', 'WebGL', 'C++', 'CUDA', 'React'],
    color: '#00f3ff',
  },
  {
    num: '06',
    title: 'IRIS HUD',
    subtitle: 'SPATIAL VISION TELEMETRY',
    desc: 'Real-time spatial video segmentation overlay powered by sub-millisecond edge vision models and custom WebGL shaders.',
    loop: ['SEE', 'UNDERSTAND', 'RESPOND'],
    status: 'MONITORING NODE',
    tech: ['OpenCV', 'YOLOv8', 'MediaPipe', 'TypeScript'],
    color: '#3C9952',
  },
];

export default function WorkSection() {
  return (
    <section id="work" className="py-24 px-8 md:px-16 border-t border-white/10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="font-mono text-xs text-[#999999] uppercase tracking-widest mb-2">
            [04–06 // FEATURED SYSTEMS]
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            SELECTED WORK
          </h2>
        </div>
      </div>

      <div className="space-y-16">
        {PROJECTS.map((p) => (
          <div
            key={p.title}
            className="p-8 md:p-12 bg-[#0e0e0e] border border-white/10 rounded-none relative overflow-hidden group hover:border-white/30 transition-all duration-300"
          >
            <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm text-[#c8f135] font-bold">
                  {p.num} //
                </span>
                <span className="text-xs font-mono text-[#999999] tracking-wider uppercase">
                  {p.subtitle}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1 border border-white/10 text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: p.color }} />
                <span>{p.status}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <h3 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight mb-4">
                  {p.title}
                </h3>
                <p className="text-base text-[#999999] font-light leading-relaxed mb-8">
                  {p.desc}
                </p>

                {/* Pipeline Loop Bar */}
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-white/70 py-3 px-4 bg-black/60 border border-white/10">
                  {p.loop.map((step, idx) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="text-[#c8f135] font-bold">{step}</span>
                      {idx < p.loop.length - 1 && <span className="text-white/30">→</span>}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div className="space-y-3">
                  <div className="text-xs font-mono text-white/40 uppercase">STACK ARCHITECTURE</div>
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-white/5 border border-white/10 text-xs font-mono text-white">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className="mt-8 py-3 px-6 bg-white/5 hover:bg-[#c8f135] hover:text-[#080808] border border-white/20 text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-between group/btn"
                >
                  <span>REQUEST SYSTEM DEMO</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">↗</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
