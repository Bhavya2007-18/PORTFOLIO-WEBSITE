'use client';

const EXPERIMENTS = [
  { title: 'LOCAL LLM QUANTIZATION', tag: 'LLAMA 3 / OLLAMA', desc: '4-bit GGUF quantization benchmarking on RTX 5070 desktop GPU.' },
  { title: 'VOICE AI LATENCY TUNING', tag: 'WHISPER + ELEVENLABS', desc: 'Sub-300ms bidirectional streaming voice assistant loop.' },
  { title: 'REAL-TIME HAND SEGMENTATION', tag: 'MEDIAPIPE + WEBGPU', desc: 'Sub-frame 21 3D hand joint keypoint extraction for canvas control.' },
  { title: 'PHYSICS NEURAL SURROGATES', tag: 'PYTORCH + CUDA', desc: 'Accelerating Navier-Stokes fluid solvers with neural operators.' },
  { title: 'BIOLUMINESCENT SHADER ENGINE', tag: 'GLSL / THREE.JS', desc: 'GPU procedural raymarching and bioluminescent subsurface scattering.' },
  { title: 'AUTONOMOUS BROWSER AGENTS', tag: 'PLAYWRIGHT + LLM', desc: 'DOM vision tree parsing and self-correcting task execution loops.' },
];

export default function LabSection() {
  return (
    <section id="lab" className="py-24 px-8 md:px-16 border-t border-white/10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div className="font-mono text-xs text-[#999999] uppercase tracking-widest mb-2">
            [08 // EXPERIMENTAL LAB]
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight">
            THE LAB
          </h2>
        </div>
        <p className="text-sm font-mono text-[#999999] max-w-md">
          ACTIVE R&D PROTOTYPES & PROOF-OF-CONCEPT PROJECTION
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EXPERIMENTS.map((exp) => (
          <div
            key={exp.title}
            className="p-6 bg-[#0e0e0e] border border-white/10 hover:border-[#c8f135] transition-all group flex flex-col justify-between min-h-[200px]"
          >
            <div>
              <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[10px] font-mono text-[#c8f135]">
                {exp.tag}
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight mt-4 mb-2 group-hover:text-[#c8f135] transition-colors">
                {exp.title}
              </h3>
              <p className="text-xs text-[#999999] font-light leading-relaxed">
                {exp.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
