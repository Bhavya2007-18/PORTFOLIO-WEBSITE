'use client';

const FOCUS = [
  { label: 'BUILDING', val: 'BABES AI OS & Spatial Command Interfaces' },
  { label: 'EXPLORING', val: 'Multimodal Neural Operators & NeRF Graphics' },
  { label: 'OPTIMIZING', val: 'Local GPU LLM Edge Inference Pipelines' },
  { label: 'READING', val: 'State Space Models & Linear Attention Papers' },
];

export default function CurrentlySection() {
  return (
    <section className="py-16 px-8 md:px-16 border-t border-white/10 max-w-7xl mx-auto">
      <div className="font-mono text-xs text-[#999999] uppercase tracking-widest mb-8">
        [12 // CURRENT STATUS]
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FOCUS.map((item) => (
          <div key={item.label} className="p-4 bg-white/[0.02] border border-white/10">
            <div className="text-xs font-mono text-[#c8f135] font-bold mb-1">
              {item.label}
            </div>
            <div className="text-sm font-mono text-white/90">
              {item.val}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
