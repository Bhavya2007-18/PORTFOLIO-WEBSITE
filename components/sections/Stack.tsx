'use client';

const STACK = [
  { category: 'LANGUAGES', items: ['Python', 'TypeScript', 'C++', 'SQL', 'GLSL', 'HTML/CSS'] },
  { category: 'AI & ML CORE', items: ['PyTorch', 'TensorFlow', 'OpenCV', 'MediaPipe', 'Scikit-Learn', 'Hugging Face'] },
  { category: 'AI SYSTEMS', items: ['LangChain', 'LlamaIndex', 'vLLM', 'Ollama', 'FAISS', 'ChromaDB'] },
  { category: 'ENGINEERING', items: ['FastAPI', 'Docker', 'Git', 'Linux', 'Node.js', 'PostgreSQL'] },
  { category: '3D & FRONTEND', items: ['Three.js', 'React Three Fiber', 'Next.js', 'Tailwind CSS', 'Framer Motion'] },
];

export default function StackSection() {
  return (
    <section id="stack" className="py-24 px-8 md:px-16 border-t border-white/10 max-w-7xl mx-auto">
      <div className="font-mono text-xs text-[#999999] uppercase tracking-widest mb-4">
        [09 // TECHNICAL STACK]
      </div>
      <h2 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-16">
        THE STACK
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
        {STACK.map((col) => (
          <div key={col.category} className="space-y-4">
            <h3 className="text-xs font-mono font-bold text-[#c8f135] uppercase tracking-wider border-b border-white/10 pb-2">
              {col.category}
            </h3>
            <ul className="space-y-2">
              {col.items.map((item) => (
                <li
                  key={item}
                  className="text-sm font-mono text-[#999999] hover:text-white hover:translate-x-1 transition-all cursor-default"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
