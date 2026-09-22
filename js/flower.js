/* ═══════════════════════════════════════════════════════════
   BIOLUMINESCENT 3D FLOWER  —  Three.js Interactive WebGL Canvas
   Glowing Cyan / Lime 3D Flower blooming in Hero section
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  function initFlower() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('flower-canvas');
    if (!canvas) return;
    const container = canvas.parentElement || document.body;

    let w = container.clientWidth || 600;
    let h = container.clientHeight || 600;

    /* ── RENDERER ─────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    /* ── SCENE & CAMERA ───────────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    /* ── PALETTE ──────────────────────────────────────────── */
    const CYAN  = new THREE.Color(0x00f3ff);
    const LIME  = new THREE.Color(0xa6ff00);
    const WHITE = new THREE.Color(0xffffff);

    /* ── ROOT GROUP ───────────────────────────────────────── */
    const ROOT = new THREE.Group();
    ROOT.position.set(0, -0.4, 0); // Centered in hero canvas
    scene.add(ROOT);

    /* ── 3D FLOWER BLOOM ──────────────────────────────────── */
    const flowerGroup = new THREE.Group();
    flowerGroup.position.set(0, 0.6, 0);
    ROOT.add(flowerGroup);

    // 1. Curved 3D Petals (Multi-layer bloom)
    const petalLayers = [
      { count: 6, scale: 1.2, rotX: 0.7, color: CYAN, opacity: 0.85 },
      { count: 5, scale: 0.95, rotX: 0.45, color: LIME, opacity: 0.9 },
      { count: 4, scale: 0.65, rotX: 0.25, color: WHITE, opacity: 0.95 }
    ];

    const petalGeom = createPetalGeometry();

    petalLayers.forEach(layer => {
      for (let i = 0; i < layer.count; i++) {
        const angle = (i / layer.count) * Math.PI * 2;
        const petalMat = new THREE.MeshPhongMaterial({
          color: layer.color,
          emissive: layer.color,
          emissiveIntensity: 0.45,
          specular: 0xffffff,
          shininess: 90,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: layer.opacity,
          blending: THREE.AdditiveBlending
        });

        const petal = new THREE.Mesh(petalGeom, petalMat);
        petal.rotation.z = angle;
        petal.rotation.x = layer.rotX;
        petal.scale.set(layer.scale, layer.scale, layer.scale);
        flowerGroup.add(petal);
      }
    });

    // 2. Glowing Core & Stamens
    const coreGeo = new THREE.SphereGeometry(0.25, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: LIME,
      transparent: true,
      opacity: 0.95
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    flowerGroup.add(coreMesh);

    // Stamens with glowing tips
    const stamenCount = 14;
    for (let i = 0; i < stamenCount; i++) {
      const angle = (i / stamenCount) * Math.PI * 2;
      const radius = 0.22 + Math.random() * 0.12;
      const height = 0.45 + Math.random() * 0.25;

      const pts = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(Math.cos(angle) * radius * 0.5, height * 0.5, Math.sin(angle) * radius * 0.5),
        new THREE.Vector3(Math.cos(angle) * radius, height, Math.sin(angle) * radius)
      ];
      const curve = new THREE.CatmullRomCurve3(pts);
      const stamenGeo = new THREE.TubeGeometry(curve, 16, 0.015, 8, false);
      const stamenMat = new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0.85 });
      flowerGroup.add(new THREE.Mesh(stamenGeo, stamenMat));

      // Glowing Tip
      const tipGeo = new THREE.SphereGeometry(0.045, 12, 12);
      const tipMat = new THREE.MeshBasicMaterial({ color: WHITE });
      const tipMesh = new THREE.Mesh(tipGeo, tipMat);
      tipMesh.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      flowerGroup.add(tipMesh);
    }

    // 3. Stem
    const stemPts = [
      new THREE.Vector3(0, 0.6, 0),
      new THREE.Vector3(-0.15, -0.6, 0.08),
      new THREE.Vector3(0.08, -1.8, -0.08),
      new THREE.Vector3(-0.08, -2.8, 0)
    ];
    const stemCurve = new THREE.CatmullRomCurve3(stemPts);
    const stemGeo = new THREE.TubeGeometry(stemCurve, 32, 0.055, 12, false);
    const stemMat = new THREE.MeshStandardMaterial({
      color: 0x0f382c,
      emissive: 0x004d40,
      roughness: 0.3,
      metalness: 0.2
    });
    ROOT.add(new THREE.Mesh(stemGeo, stemMat));

    // 4. Lights
    const pLight = new THREE.PointLight(0x00f3ff, 3.5, 10);
    pLight.position.set(0, 0.8, 1.8);
    scene.add(pLight);

    const pLight2 = new THREE.PointLight(0xa6ff00, 2.5, 8);
    pLight2.position.set(0, 0, 1.2);
    scene.add(pLight2);

    scene.add(new THREE.AmbientLight(0x223344, 1.5));

    // 5. Floating Spore Particles
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 5;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: LIME,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    ROOT.add(particles);

    /* ── MOUSE / POINTER INTERACTIVITY ───────────────────── */
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    function onPointerMove(px, py) {
      targetX = (px / window.innerWidth - 0.5) * 1.0;
      targetY = (py / window.innerHeight - 0.5) * 0.6;
    }

    window.addEventListener('mousemove', e => onPointerMove(e.clientX, e.clientY));
    window.addEventListener('pointermove', e => onPointerMove(e.clientX, e.clientY));
    window.addEventListener('touchmove', e => {
      if (e.touches && e.touches[0]) onPointerMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    /* ── RESIZE ───────────────────────────────────────────── */
    window.addEventListener('resize', function () {
      w = container.clientWidth || 600;
      h = container.clientHeight || 600;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    });

    /* ── ANIMATION LOOP ───────────────────────────────────── */
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Smooth mouse tracking
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      ROOT.rotation.y = currentX + Math.sin(time * 0.5) * 0.08;
      ROOT.rotation.x = currentY + Math.cos(time * 0.4) * 0.06;

      // Flower petal pulsing & spinning
      flowerGroup.rotation.z = time * 0.12;
      pLight.intensity = 3.0 + Math.sin(time * 2.2) * 0.8;

      // Particle floating
      const posArr = pGeo.attributes.position.array;
      for (let i = 0; i < pCount; i++) {
        posArr[i * 3 + 1] += 0.004;
        if (posArr[i * 3 + 1] > 2.5) posArr[i * 3 + 1] = -2.5;
      }
      pGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();
  }

  function createPetalGeometry() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(-0.35, 0.45, -0.5, 1.2, 0, 1.8);
    shape.bezierCurveTo(0.5, 1.2, 0.35, 0.45, 0, 0);

    const extrudeSettings = {
      steps: 1,
      depth: 0.04,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }

  function tryInit() {
    if (typeof THREE !== 'undefined') {
      initFlower();
    } else {
      let attempts = 0;
      const timer = setInterval(function () {
        attempts++;
        if (typeof THREE !== 'undefined') {
          clearInterval(timer);
          initFlower();
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
