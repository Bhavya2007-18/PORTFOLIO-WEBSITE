export interface NodeData {
  id: string;
  name: string;
  category: string;
  status: 'ACTIVE' | 'DEPLOYED' | 'MONITORING' | 'RESEARCH' | 'EXPERIMENTAL';
  position: [number, number, number];
  color: string;
  desc: string;
  latency: string;
  fps: number;
  gpuLoad: string;
  vram: string;
  tech: string[];
  connections: string[]; // Connected Node IDs
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
}

export const NODES_DATA: NodeData[] = [
  {
    id: 'babes-os',
    name: 'BABES AI OS',
    category: 'PERSONAL AI OPERATING SYSTEM',
    status: 'ACTIVE',
    position: [-4.5, 0, 2.5],
    color: '#c8f135',
    desc: 'Autonomous ambient intelligence agent built for continuous multi-modal observation, context memory graphs, and predictive action loops.',
    latency: '14ms',
    fps: 120,
    gpuLoad: '42%',
    vram: '4.8 / 12 GB',
    tech: ['Python', 'PyTorch', 'LangChain', 'FAISS', 'FastAPI'],
    connections: ['realis-engine', 'local-llm-lab'],
    demoUrl: '#',
    githubUrl: 'https://github.com',
  },
  {
    id: 'realis-engine',
    name: 'REALIS WORKSPACE',
    category: 'PHYSICS & ENGINEERING SIMULATOR',
    status: 'DEPLOYED',
    position: [0, 0, -3.5],
    color: '#00f3ff',
    desc: 'High-performance interactive CAD/physics simulation workspace powered by real-time neural surrogates and WebGL spatial rendering.',
    latency: '8ms',
    fps: 144,
    gpuLoad: '78%',
    vram: '8.2 / 12 GB',
    tech: ['Three.js', 'WebGL', 'C++', 'CUDA', 'React'],
    connections: ['babes-os', 'mediapipe-cv', 'vfx-3d-env'],
    demoUrl: '#',
    githubUrl: 'https://github.com',
  },
  {
    id: 'iris-hud',
    name: 'IRIS HUD',
    category: 'SPATIAL VISION INTELLIGENCE',
    status: 'MONITORING',
    position: [4.5, 0, 2.5],
    color: '#3C9952',
    desc: 'Real-time environmental spatial visual telemetry overlay integrating live camera segmentation, object bounding, and depth estimation.',
    latency: '18ms',
    fps: 90,
    gpuLoad: '55%',
    vram: '3.4 / 12 GB',
    tech: ['OpenCV', 'YOLOv8', 'MediaPipe', 'WebRTC', 'Tailwind'],
    connections: ['mediapipe-cv'],
    demoUrl: '#',
    githubUrl: 'https://github.com',
  },
  {
    id: 'mediapipe-cv',
    name: 'MEDIAPIPE CV ENGINE',
    category: 'COMPUTER VISION PIPELINE',
    status: 'ACTIVE',
    position: [2.5, 0, -1],
    color: '#ff4d00',
    desc: 'Sub-millisecond landmark extraction and hand gesture tracking engine powering gesture-driven spatial WebGL canvas controls.',
    latency: '4ms',
    fps: 240,
    gpuLoad: '28%',
    vram: '1.9 / 12 GB',
    tech: ['MediaPipe', 'TensorFlow.js', 'WebGPU', 'TypeScript'],
    connections: ['iris-hud', 'realis-engine'],
    demoUrl: '#',
    githubUrl: 'https://github.com',
  },
  {
    id: 'local-llm-lab',
    name: 'LOCAL LLM LAB',
    category: 'EDGE INFERENCE BENCHMARK',
    status: 'RESEARCH',
    position: [-2.5, 0, -1],
    color: '#a6ff00',
    desc: 'Quantized LLM edge inference cluster benchmarked on consumer RTX GPU architecture with vLLM and Ollama parallel orchestrators.',
    latency: '22ms',
    fps: 60,
    gpuLoad: '94%',
    vram: '11.1 / 12 GB',
    tech: ['vLLM', 'Ollama', 'Llama 3', 'DeepSeek', 'Docker'],
    connections: ['babes-os'],
    demoUrl: '#',
    githubUrl: 'https://github.com',
  },
  {
    id: 'vfx-3d-env',
    name: 'VFX & 3D ENVIRONMENTS',
    category: 'GENERATIVE SPATIAL GRAPHICS',
    status: 'EXPERIMENTAL',
    position: [0, 0, 4],
    color: '#e056fd',
    desc: 'Bioluminescent procedural shader experiments, GPU particle fluid dynamics, and neural radiance field (NeRF) reconstructions.',
    latency: '12ms',
    fps: 120,
    gpuLoad: '64%',
    vram: '6.1 / 12 GB',
    tech: ['GLSL Shaders', 'Three.js', 'Blender', 'NeRF Studio'],
    connections: ['realis-engine'],
    demoUrl: '#',
    githubUrl: 'https://github.com',
  },
];
