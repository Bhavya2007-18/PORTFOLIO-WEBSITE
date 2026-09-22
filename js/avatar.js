/* ════════════════════════════════════════════════════════
   BHAVYA PORTFOLIO — Hero 3D Avatar
   Glowing AI orb · Three.js · Mouse-reactive
   ════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* Wait for full paint so CSS dimensions are resolved */
  window.addEventListener('load', init);

  function init() {
    if (typeof THREE === 'undefined') {
      console.warn('Avatar: Three.js not loaded');
      return;
    }

    const wrapper = document.getElementById('hero-avatar');
    const canvas  = document.getElementById('avatar-canvas');
    if (!wrapper || !canvas) return;

    /* ── DIMENSIONS ──────────────────────────────────── */
    let W = wrapper.getBoundingClientRect().width;
    let H = wrapper.getBoundingClientRect().height;

    /* Fallback if still zero (e.g. display:none at load) */
    if (W === 0) W = 460;
    if (H === 0) H = 460;

    /* ── RENDERER ────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha:     true,
      antialias: true,
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    /* ── SCENE / CAMERA ──────────────────────────────── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    /* ── PALETTE ─────────────────────────────────────── */
    const LIME  = new THREE.Color(0xc8f135);
    const WHITE = new THREE.Color(0xf0ede8);
    const BLUE  = new THREE.Color(0x5090ff);

    /* ═══════════════════════════════════════════════════
       ORB LAYERS
    ═══════════════════════════════════════════════════ */

    /* 1. Outer glass shell */
    const orbGeo = new THREE.SphereGeometry(1, 64, 64);
    const orbMat = new THREE.MeshPhongMaterial({
      color:              new THREE.Color(0x0c0c0c),
      emissive:           LIME,
      emissiveIntensity:  0.10,
      transparent:        true,
      opacity:            0.82,
      shininess:          160,
      specular:           LIME,
    });
    const orb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(orb);

    /* 2. Inner glow volume */
    const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color:       LIME,
      transparent: true,
      opacity:     0.22,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    /* 3. Nucleus — bright centre dot */
    const nucGeo = new THREE.SphereGeometry(0.20, 24, 24);
    const nucMat = new THREE.MeshBasicMaterial({
      color:       WHITE,
      transparent: true,
      opacity:     0.95,
    });
    const nucleus = new THREE.Mesh(nucGeo, nucMat);
    scene.add(nucleus);

    /* 4. Neural wireframe (inner) */
    const icoGeo = new THREE.IcosahedronGeometry(1.06, 2);
    const icoMat = new THREE.MeshBasicMaterial({
      color:       LIME,
      wireframe:   true,
      transparent: true,
      opacity:     0.07,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    /* 5. Outer wireframe cage */
    const outerIcoGeo = new THREE.IcosahedronGeometry(1.28, 1);
    const outerIcoMat = new THREE.MeshBasicMaterial({
      color:       LIME,
      wireframe:   true,
      transparent: true,
      opacity:     0.04,
    });
    const outerIco = new THREE.Mesh(outerIcoGeo, outerIcoMat);
    scene.add(outerIco);

    /* ═══════════════════════════════════════════════════
       ORBITAL RINGS
    ═══════════════════════════════════════════════════ */
    function addRing(radius, tube, color, opacity, rx, ry, rz) {
      const geo  = new THREE.TorusGeometry(radius, tube, 4, 120);
      const mat  = new THREE.MeshBasicMaterial({ color, transparent: true, opacity });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(rx, ry, rz);
      scene.add(mesh);
      return mesh;
    }

    const ring1 = addRing(1.36, 0.010, LIME, 0.45,  Math.PI / 2.1,  0.3,  0);
    const ring2 = addRing(1.62, 0.007, LIME, 0.18,  Math.PI / 3.2, -0.7,  0.4);
    const ring3 = addRing(1.88, 0.005, BLUE, 0.10,  0.5,            1.1, -0.3);

    /* ═══════════════════════════════════════════════════
       PARTICLE CLOUD
    ═══════════════════════════════════════════════════ */
    const N = 320;
    const pos   = new Float32Array(N * 3);
    const pMeta = [];

    for (let i = 0; i < N; i++) {
      const r     = 1.55 + Math.random() * 1.50;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const x     = r * Math.sin(phi) * Math.cos(theta);
      const y     = r * Math.sin(phi) * Math.sin(theta);
      const z     = r * Math.cos(phi);
      pos[i * 3]     = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      pMeta.push({ bx: x, by: y, bz: z, spd: 0.3 + Math.random() * 0.8, off: Math.random() * Math.PI * 2 });
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

    const pMat = new THREE.PointsMaterial({
      color:           LIME,
      size:            0.038,
      transparent:     true,
      opacity:         0.65,
      sizeAttenuation: true,
      blending:        THREE.AdditiveBlending,
      depthWrite:      false,
    });

    const pts = new THREE.Points(pGeo, pMat);
    scene.add(pts);

    /* ═══════════════════════════════════════════════════
       DATA ARCS
    ═══════════════════════════════════════════════════ */
    function addArc(r, tilt, opacity, color) {
      const verts = [];
      for (let i = 0; i <= 100; i++) {
        const a = (i / 100) * Math.PI * 2;
        verts.push(new THREE.Vector3(Math.cos(a) * r, Math.sin(a) * r * 0.25, Math.sin(a) * r));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(verts);
      const mat = new THREE.LineBasicMaterial({
        color, transparent: true, opacity,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geo, mat);
      line.rotation.x = tilt;
      scene.add(line);
      return line;
    }

    const arc1 = addArc(1.50,  1.10, 0.18, LIME);
    const arc2 = addArc(1.72, -0.35, 0.08, BLUE);

    /* ═══════════════════════════════════════════════════
       LIGHTS
    ═══════════════════════════════════════════════════ */
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));

    const keyLight = new THREE.PointLight(LIME, 4.0, 9);
    keyLight.position.set(0, 0, 2.8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(BLUE, 1.5, 7);
    fillLight.position.set(-2.5, 1.5, 1);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.6);
    rimLight.position.set(3, 2, -1);
    scene.add(rimLight);

    /* ═══════════════════════════════════════════════════
       MOUSE TRACKING
    ═══════════════════════════════════════════════════ */
    let tRX = 0, tRY = 0, cRX = 0, cRY = 0;

    window.addEventListener('mousemove', (e) => {
      tRY =  (e.clientX / window.innerWidth  - 0.5) * 0.80;
      tRX = -(e.clientY / window.innerHeight - 0.5) * 0.55;
    });

    /* ═══════════════════════════════════════════════════
       RESIZE
    ═══════════════════════════════════════════════════ */
    window.addEventListener('resize', () => {
      W = wrapper.getBoundingClientRect().width  || 460;
      H = wrapper.getBoundingClientRect().height || 460;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
    });

    /* ═══════════════════════════════════════════════════
       ANIMATION LOOP
    ═══════════════════════════════════════════════════ */
    let t = 0;

    function tick() {
      requestAnimationFrame(tick);
      t += 0.008;

      /* Smooth mouse follow */
      cRX += (tRX - cRX) * 0.055;
      cRY += (tRY - cRY) * 0.055;

      /* Float offset */
      const fy = Math.sin(t * 0.9)  * 0.07;
      const fx = Math.cos(t * 0.55) * 0.03;

      /* Orb — glass shell */
      orb.rotation.y         = t * 0.15 + cRY;
      orb.rotation.x         = cRX + fx;
      orb.position.y         = fy;
      orbMat.emissiveIntensity = 0.06 + Math.sin(t * 2.0) * 0.05;

      /* Core glow */
      core.rotation.y        = -t * 0.25;
      core.position.y        = fy;
      coreMat.opacity        = 0.16 + Math.sin(t * 2.4) * 0.08;

      /* Nucleus pulse */
      const ns = 0.82 + Math.sin(t * 3.5) * 0.20;
      nucleus.scale.setScalar(ns);
      nucleus.position.y = fy;

      /* Wireframes */
      ico.rotation.y     =  t * 0.13 + cRY * 0.6;
      ico.rotation.x     = -t * 0.08 + cRX * 0.6;
      ico.position.y     = fy;
      outerIco.rotation.y = -t * 0.09 + cRY * 0.3;
      outerIco.rotation.z =  t * 0.04;
      outerIco.position.y = fy;

      /* Rings */
      ring1.rotation.z   =  t * 0.24;
      ring1.position.y   = fy * 0.8;
      ring2.rotation.z   = -t * 0.16;
      ring2.rotation.x   = Math.PI / 3.2 + Math.sin(t * 0.55) * 0.07;
      ring2.position.y   = fy * 0.6;
      ring3.rotation.y   =  t * 0.11;
      ring3.position.y   = fy * 0.4;

      /* Arcs */
      arc1.rotation.y    =  t * 0.28 + cRY;
      arc1.position.y    = fy;
      arc2.rotation.z    =  t * 0.19;
      arc2.position.y    = fy;

      /* Particles breathe */
      const pa = pGeo.attributes.position.array;
      for (let i = 0; i < N; i++) {
        const m  = pMeta[i];
        const b  = 1 + Math.sin(t * m.spd + m.off) * 0.065;
        pa[i*3]   = m.bx * b;
        pa[i*3+1] = m.by * b + fy * 0.5;
        pa[i*3+2] = m.bz * b;
      }
      pGeo.attributes.position.needsUpdate = true;
      pMat.opacity   = 0.50 + Math.sin(t * 1.3) * 0.12;
      pts.rotation.y = t * 0.035 + cRY * 0.18;

      /* Key light pulse */
      keyLight.intensity = 3.5 + Math.sin(t * 2.0) * 0.9;

      renderer.render(scene, camera);
    }

    tick();

    /* ── ENTRANCE ANIMATION ──────────────────────────── */
    wrapper.style.opacity   = '0';
    wrapper.style.transform = 'translateY(-50%) scale(0.82)';
    wrapper.style.transition = 'opacity 1.4s ease 0.4s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.4s';
    requestAnimationFrame(() => {
      wrapper.style.opacity   = '1';
      wrapper.style.transform = 'translateY(-50%) scale(1)';
    });
  }

})();
