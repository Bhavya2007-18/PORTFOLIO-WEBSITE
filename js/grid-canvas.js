/* ═══════════════════════════════════════════════════════════
   3D GRID OPERATIONS — Low-Poly Wireframe Plane Background
   Color: #3C9952, Opacity: 0.15
   Rotates slowly and tracks mouse X/Y coordinates
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function initGridCanvas() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('grid-canvas');
    if (!canvas) return;

    let w = window.innerWidth;
    let h = window.innerHeight;

    /* ── RENDERER ─────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    /* ── SCENE & CAMERA ───────────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
    camera.position.set(0, 6, 16);
    camera.lookAt(0, 0, 0);

    /* ── 3D LOW-POLY WIREFRAME PLANE ────────────────────── */
    // Creating low-poly wireframe plane (#3C9952, opacity 0.15)
    const geometry = new THREE.PlaneGeometry(80, 80, 40, 40);

    // Subtle random vertex height displacement for organic low-poly feel
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const z = Math.sin(i * 0.3) * 0.4 + Math.cos(i * 0.5) * 0.3;
      pos.setZ(i, z);
    }
    geometry.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({
      color: 0x3C9952,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });

    const wireframeMesh = new THREE.Mesh(geometry, material);
    wireframeMesh.rotation.x = -Math.PI / 2.6; // Tilt plane backward
    scene.add(wireframeMesh);

    /* ── MOUSE TRACKING ───────────────────────────────────── */
    let targetMouseX = 0, targetMouseY = 0;
    let currentMouseX = 0, currentMouseY = 0;

    function onMouseMove(e) {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 0.35;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 0.35;
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('pointermove', onMouseMove, { passive: true });

    /* ── RESIZE ───────────────────────────────────────────── */
    window.addEventListener('resize', function () {
      w = window.innerWidth;
      h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });

    /* ── ANIMATION LOOP (useFrame equivalent) ─────────────── */
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Slow continuous rotation
      wireframeMesh.rotation.z += delta * 0.04;

      // Smooth mouse position interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      wireframeMesh.rotation.x = -Math.PI / 2.6 + currentMouseY;
      wireframeMesh.rotation.y = currentMouseX;

      renderer.render(scene, camera);
    }

    animate();
  }

  function tryInit() {
    if (typeof THREE !== 'undefined') {
      initGridCanvas();
    } else {
      let attempts = 0;
      const timer = setInterval(function () {
        attempts++;
        if (typeof THREE !== 'undefined') {
          clearInterval(timer);
          initGridCanvas();
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
