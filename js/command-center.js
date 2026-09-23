/* ═══════════════════════════════════════════════════════════
   3D SPATIAL COMMAND CENTER  —  3D Node Circuit Board
   Interactive nodes, glowing wires, data flow particles,
   cinematic camera zoom, and glassmorphic telemetry side panel.
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const NODES = [
    {
      id: 'node-1',
      name: 'BABES AI OS',
      category: 'AUTONOMOUS AGENTS',
      pos: [-5, 0.4, 2.5],
      color: 0x3C9952,
      hex: '#3C9952',
      status: 'OPTIMAL',
      latency: '8ms',
      fps: 60,
      gpuLoad: '28%',
      vram: '2.8GB / 8GB',
      stack: ['Python', 'Ollama', 'RAG', 'MCP', 'Voice STT', 'FastAPI'],
      desc: 'A voice-first personal AI operating system designed around a continuous loop: Observe → Understand → Remember → Predict → Alert → Act.'
    },
    {
      id: 'node-2',
      name: 'REALIS WORKSPACE',
      category: 'AI PHYSICS & SIMULATION',
      pos: [5, 0.4, 2.5],
      color: 0x00f3ff,
      hex: '#00f3ff',
      status: 'OPTIMAL',
      latency: '14ms',
      fps: 60,
      gpuLoad: '42%',
      vram: '4.1GB / 8GB',
      stack: ['C++', 'Three.js', 'WebGL', 'WASM', 'Physics Engine'],
      desc: 'An interactive 3D simulation environment for designing, analyzing and testing physical systems with real-time AI feedback loops.'
    },
    {
      id: 'node-3',
      name: 'IRIS HUD',
      category: 'ENVIRONMENTAL INTELLIGENCE',
      pos: [0, 0.4, -4],
      color: 0x3C9952,
      hex: '#3C9952',
      status: 'OPTIMAL',
      latency: '11ms',
      fps: 60,
      gpuLoad: '35%',
      vram: '3.2GB / 8GB',
      stack: ['Computer Vision', 'Multimodal AI', 'PyTorch', 'OpenCV'],
      desc: 'Real-time environmental spatial vision system that sees, tracks, and responds to physical objects in real-time via camera feed.'
    },
    {
      id: 'node-4',
      name: 'MEDIAPIPE CV ENGINE',
      category: 'REAL-TIME TRACKING',
      pos: [-6, 0.4, -3.5],
      color: 0xff9900,
      hex: '#ff9900',
      status: 'PROCESSING',
      latency: '6ms',
      fps: 120,
      gpuLoad: '18%',
      vram: '1.4GB / 8GB',
      stack: ['MediaPipe', 'OpenCV', 'PyOpenGL', 'Hand Landmark', 'Pose AI'],
      desc: 'High-frequency 3D hand, gesture, and facial landmark tracking pipeline for low-latency human-computer interaction.'
    },
    {
      id: 'node-5',
      name: 'LOCAL LLM LAB',
      category: 'MODEL INFERENCE ENGINE',
      pos: [6, 0.4, -3.5],
      color: 0x00f3ff,
      hex: '#00f3ff',
      status: 'OPTIMAL',
      latency: '18ms',
      fps: 45,
      gpuLoad: '68%',
      vram: '7.2GB / 8GB',
      stack: ['RTX 5070', 'Ollama', 'Qwen 2.5', 'PEFT', 'CUDA', 'Linux'],
      desc: 'Local GPU acceleration pipeline running quantized LLMs, agent tool calling, and RAG pipelines on an RTX 5070 Linux setup.'
    },
    {
      id: 'node-6',
      name: 'VFX & 3D ENVIRONMENTS',
      category: 'SPATIAL GRAPHICS',
      pos: [0, 0.4, 4.5],
      color: 0x3C9952,
      hex: '#3C9952',
      status: 'OPTIMAL',
      latency: '9ms',
      fps: 60,
      gpuLoad: '31%',
      vram: '2.5GB / 8GB',
      stack: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'Blender'],
      desc: 'Interactive GLSL shader art, procedural 3D visualizers, and spatial canvas interfaces built for dark brutalist web applications.'
    }
  ];

  const CONNECTIONS = [
    [0, 2], [1, 2], [3, 0], [4, 1], [5, 0], [5, 1]
  ];

  function initCommandCenter() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('command-center-canvas');
    if (!canvas) return;
    const container = canvas.parentElement;

    let w = container.clientWidth || 800;
    let h = container.clientHeight || 550;

    /* ── RENDERER ─────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    /* ── SCENE & CAMERA ───────────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 14, 18);
    camera.lookAt(0, 0, 0);

    let activeNode = null;
    const targetCamPos = new THREE.Vector3(0, 14, 18);
    const targetCamLook = new THREE.Vector3(0, 0, 0);
    const currentCamLook = new THREE.Vector3(0, 0, 0);

    /* ── LIGHTS & GRID ────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dLight.position.set(10, 20, 15);
    scene.add(dLight);
    const pLight = new THREE.PointLight(0x3C9952, 2, 20);
    pLight.position.set(0, 5, 0);
    scene.add(pLight);

    const gridHelper = new THREE.GridHelper(32, 32, 0x3C9952, 0x22222a);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    /* ── NODES GROUP ──────────────────────────────────────── */
    const nodeMeshes = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    NODES.forEach((nodeData, idx) => {
      const g = new THREE.Group();
      g.position.set(nodeData.pos[0], nodeData.pos[1], nodeData.pos[2]);

      // Base Chip Block
      const baseGeo = new THREE.BoxGeometry(2.6, 0.45, 2.6);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x121215,
        metalness: 0.9,
        roughness: 0.15
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      g.add(baseMesh);

      // Raised Die Chip
      const dieGeo = new THREE.BoxGeometry(1.8, 0.2, 1.8);
      const dieMat = new THREE.MeshStandardMaterial({
        color: 0x1c1c22,
        metalness: 0.95,
        roughness: 0.1
      });
      const dieMesh = new THREE.Mesh(dieGeo, dieMat);
      dieMesh.position.y = 0.3;
      g.add(dieMesh);

      // Glowing Neon Strip
      const neonGeo = new THREE.BoxGeometry(2.0, 0.05, 2.0);
      const neonMat = new THREE.MeshStandardMaterial({
        color: nodeData.color,
        emissive: nodeData.color,
        emissiveIntensity: 1.0,
        transparent: true
      });
      const neonMesh = new THREE.Mesh(neonGeo, neonMat);
      neonMesh.position.y = 0.42;
      g.add(neonMesh);

      g.userData = { nodeData, idx, neonMat, baseMat };
      nodeGroup.add(g);
      nodeMeshes.push(g);
    });

    /* ── CONNECTIONS & DATA PARTICLES ────────────────────── */
    const particlePoints = [];
    CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const start = NODES[startIdx];
      const end = NODES[endIdx];

      const pts = [
        new THREE.Vector3(...start.pos),
        new THREE.Vector3((start.pos[0] + end.pos[0]) / 2, 0.1, (start.pos[2] + end.pos[2]) / 2),
        new THREE.Vector3(...end.pos)
      ];

      const curve = new THREE.CatmullRomCurve3(pts);
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.04, 8, false);
      const tubeMat = new THREE.MeshBasicMaterial({
        color: start.color,
        transparent: true,
        opacity: 0.55
      });
      scene.add(new THREE.Mesh(tubeGeo, tubeMat));

      // Particles along curve
      particlePoints.push({ curve, color: start.color });
    });

    /* ── RAYCASTING / INTERACTION ─────────────────────────── */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function getIntersections(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      return raycaster.intersectObjects(nodeGroup.children, true);
    }

    canvas.addEventListener('mousemove', function (e) {
      const hits = getIntersections(e);
      canvas.style.cursor = hits.length > 0 ? 'pointer' : 'auto';
    });

    canvas.addEventListener('click', function (e) {
      const hits = getIntersections(e);
      if (hits.length > 0) {
        let p = hits[0].object;
        while (p.parent && !p.userData.nodeData) {
          p = p.parent;
        }
        if (p.userData && p.userData.nodeData) {
          selectNode(p.userData.nodeData);
        }
      }
    });

    /* ── TELEMETRY PANEL UI CONTROLS ──────────────────────── */
    const panel = document.getElementById('telemetry-side-panel');
    const resetBtn = document.getElementById('reset-cam-btn');
    const closeBtn = document.getElementById('close-telemetry-btn');

    function selectNode(node) {
      activeNode = node;
      targetCamPos.set(node.pos[0], node.pos[1] + 4.5, node.pos[2] + 6.5);
      targetCamLook.set(node.pos[0], node.pos[1], node.pos[2]);

      // Highlight active node, dim others
      nodeMeshes.forEach(mesh => {
        const isSelf = mesh.userData.nodeData.id === node.id;
        mesh.userData.neonMat.emissiveIntensity = isSelf ? 2.5 : 0.25;
        mesh.userData.neonMat.opacity = isSelf ? 1.0 : 0.4;
      });

      // Show panel & reset button
      if (panel) {
        document.getElementById('t-category').textContent = 'SECTOR: ' + node.category;
        document.getElementById('t-name').textContent = node.name;
        document.getElementById('t-status').textContent = 'STATUS: ' + node.status;
        document.getElementById('t-desc').textContent = node.desc;
        document.getElementById('t-latency').textContent = node.latency;
        document.getElementById('t-fps').textContent = node.fps + ' FPS';
        document.getElementById('t-gpuload').textContent = node.gpuLoad;
        document.getElementById('t-vram').textContent = node.vram;

        const stackContainer = document.getElementById('t-stack');
        if (stackContainer) {
          stackContainer.innerHTML = node.stack.map(s => `<span class="t-pill">${s}</span>`).join('');
        }
        panel.classList.add('open');
      }

      if (resetBtn) resetBtn.style.display = 'inline-flex';
    }

    function resetView() {
      activeNode = null;
      targetCamPos.set(0, 14, 18);
      targetCamLook.set(0, 0, 0);

      nodeMeshes.forEach(mesh => {
        mesh.userData.neonMat.emissiveIntensity = 1.0;
        mesh.userData.neonMat.opacity = 1.0;
      });

      if (panel) panel.classList.remove('open');
      if (resetBtn) resetBtn.style.display = 'none';
    }

    if (resetBtn) resetBtn.addEventListener('click', resetView);
    if (closeBtn) closeBtn.addEventListener('click', resetView);

    /* ── RESIZE ───────────────────────────────────────────── */
    window.addEventListener('resize', function () {
      w = container.clientWidth || 800;
      h = container.clientHeight || 550;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });

    /* ── ANIMATE LOOP ─────────────────────────────────────── */
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth camera lerp
      camera.position.lerp(targetCamPos, 0.05);
      currentCamLook.lerp(targetCamLook, 0.05);
      camera.lookAt(currentCamLook);

      // Node subtle floating pulse
      nodeMeshes.forEach((mesh, i) => {
        if (activeNode && activeNode.id === mesh.userData.nodeData.id) {
          mesh.position.y = mesh.userData.nodeData.pos[1] + Math.sin(time * 3) * 0.08;
        } else {
          mesh.position.y = mesh.userData.nodeData.pos[1];
        }
      });

      renderer.render(scene, camera);
    }

    animate();
  }

  function tryInit() {
    if (typeof THREE !== 'undefined') {
      initCommandCenter();
    } else {
      let attempts = 0;
      const timer = setInterval(function () {
        attempts++;
        if (typeof THREE !== 'undefined') {
          clearInterval(timer);
          initCommandCenter();
        } else if (attempts > 50) {
          clearInterval(timer);
        }
      }, 50);
    }
  }

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    tryInit();
  } else {
    document.addEventListener('DOMContentLoaded', tryInit);
    window.addEventListener('load', tryInit);
  }
})();
