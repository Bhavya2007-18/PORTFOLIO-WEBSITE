/* ═══════════════════════════════════════════════════════════
   BIOLUMINESCENT FLOWER  —  Three.js procedural
   Rising from bottom-right of hero, glowing lime/green
   Matches: dribbble.com/shots/25995758
   ═══════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  window.addEventListener('load', function () {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('flower-canvas');
    if (!canvas) return;

    /* ── SIZE (matches hero section) ─────────────────────── */
    let W = window.innerWidth;
    let H = canvas.closest('section')
              ? canvas.closest('section').offsetHeight
              : window.innerHeight;

    canvas.width  = W;
    canvas.height = H;

    /* ── RENDERER ─────────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    /* ── SCENE / CAMERA ───────────────────────────────────── */
    const scene  = new THREE.Scene();
    // Orthographic-ish camera to make the flower feel 2.5D like the reference
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 200);
    camera.position.set(0, 0, 14);

    /* ── COLOURS ──────────────────────────────────────────── */
    const LIME     = new THREE.Color(0xb8e830);
    const LIME_DIM = new THREE.Color(0x4a6010);
    const WHITE    = new THREE.Color(0xeeffcc);
    const DARK     = new THREE.Color(0x0a120a);

    /* ═══════════════════════════════════════════════════════
       ROOT OFFSET — bottom-right, flower grows upward
    ═══════════════════════════════════════════════════════ */
    // In NDC the canvas covers full hero; we offset the whole
    // flower group so it sits bottom-right like the reference.
    const ROOT = new THREE.Group();
    // x: right side  y: below bottom (so petals peek upward)
    ROOT.position.set(3.8, -6.5, 0);
    scene.add(ROOT);

    /* ═══════════════════════════════════════════════════════
       HELPERS
    ═══════════════════════════════════════════════════════ */
    function lineMesh(points, color, opacity, width) {
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color, transparent: true, opacity,
        blending: THREE.AdditiveBlending, depthWrite: false,
        linewidth: width || 1,
      });
      return new THREE.Line(geo, mat);
    }

    // Tube along a CatmullRom curve
    function tubeCurve(pts, radius, col, opa, radSegs, tubSegs) {
      const curve = new THREE.CatmullRomCurve3(pts);
      const geo   = new THREE.TubeGeometry(curve, tubSegs || 32, radius, radSegs || 5, false);
      const mat   = new THREE.MeshBasicMaterial({
        color: col, transparent: true, opacity: opa,
        blending: THREE.AdditiveBlending, depthWrite: false,
        side: THREE.DoubleSide,
      });
      return new THREE.Mesh(geo, mat);
    }

    /* ═══════════════════════════════════════════════════════
       MAIN STEM
    ═══════════════════════════════════════════════════════ */
    const stemPts = [
      new THREE.Vector3(0,    0,    0),
      new THREE.Vector3(0.15, 1.2,  0.05),
      new THREE.Vector3(0.05, 2.6,  0.02),
      new THREE.Vector3(0.20, 4.0,  0.08),
      new THREE.Vector3(0.10, 5.5,  0.03),
      new THREE.Vector3(0.05, 7.0,  0),
    ];
    ROOT.add(tubeCurve(stemPts, 0.045, LIME, 0.75));
    // Bright inner highlight on stem
    ROOT.add(tubeCurve(stemPts, 0.018, WHITE, 0.35));

    /* ═══════════════════════════════════════════════════════
       BRANCH STEMS
    ═══════════════════════════════════════════════════════ */
    function addBranch(startPt, ctrlPt, endPt, radius, opacity) {
      const pts = [startPt, ctrlPt, endPt];
      ROOT.add(tubeCurve(pts, radius, LIME, opacity));
      ROOT.add(tubeCurve(pts, radius * 0.4, WHITE, opacity * 0.4));
    }

    // Left branches
    addBranch(
      new THREE.Vector3(0.10, 2.4, 0),
      new THREE.Vector3(-0.8, 3.0, 0.1),
      new THREE.Vector3(-1.6, 3.8, 0.05),
      0.030, 0.65
    );
    addBranch(
      new THREE.Vector3(0.12, 4.2, 0),
      new THREE.Vector3(-1.0, 4.6, 0.05),
      new THREE.Vector3(-1.9, 5.5, 0),
      0.025, 0.55
    );

    // Right branches
    addBranch(
      new THREE.Vector3(0.18, 1.8, 0),
      new THREE.Vector3(1.0,  2.4, 0.1),
      new THREE.Vector3(1.8,  3.0, 0),
      0.028, 0.60
    );
    addBranch(
      new THREE.Vector3(0.15, 3.5, 0),
      new THREE.Vector3(0.9,  4.2, 0.05),
      new THREE.Vector3(1.5,  5.0, 0),
      0.022, 0.50
    );

    /* ═══════════════════════════════════════════════════════
       LEAF  (flat teardrop-like shape on a branch)
    ═══════════════════════════════════════════════════════ */
    function addLeaf(cx, cy, angle, scale, opa) {
      const shape = new THREE.Shape();
      shape.moveTo(0, 0);
      shape.bezierCurveTo(-0.18, 0.30,  -0.15, 0.70,  0, 1.0);
      shape.bezierCurveTo( 0.15, 0.70,   0.18, 0.30,  0, 0);

      const geo = new THREE.ShapeGeometry(shape, 12);
      const mat = new THREE.MeshBasicMaterial({
        color: LIME, transparent: true, opacity: opa,
        blending: THREE.AdditiveBlending, depthWrite: false,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(cx, cy, 0);
      mesh.rotation.z = angle;
      mesh.scale.setScalar(scale);
      ROOT.add(mesh);

      // Vein line
      const vein = lineMesh([
        new THREE.Vector3(0, 0, 0.01),
        new THREE.Vector3(0, 1.0 * scale, 0.01),
      ], WHITE, 0.25);
      vein.position.set(cx, cy, 0);
      vein.rotation.z = angle;
      ROOT.add(vein);
    }

    addLeaf(-0.8,  3.6,  0.45, 0.85, 0.45);
    addLeaf(-1.6,  4.5, -0.3,  0.70, 0.35);
    addLeaf( 1.0,  2.8, -0.6,  0.80, 0.45);
    addLeaf( 1.4,  4.7,  0.5,  0.65, 0.35);
    addLeaf( 0.05, 1.2, -1.2,  0.55, 0.30);

    /* ═══════════════════════════════════════════════════════
       FLOWER HEAD  — main bloom at stem top
    ═══════════════════════════════════════════════════════ */
    function buildFlower(parent, cx, cy, cz, pScale, pCount, opa) {
      const group = new THREE.Group();
      group.position.set(cx, cy, cz);

      // Petals — each is a tapered tube arranged radially
      for (let i = 0; i < pCount; i++) {
        const angle = (i / pCount) * Math.PI * 2;
        const petalShape = new THREE.Shape();
        petalShape.moveTo(0, 0);
        petalShape.bezierCurveTo(-0.22, 0.35, -0.18, 0.80, 0, 1.10);
        petalShape.bezierCurveTo( 0.18, 0.80,  0.22, 0.35, 0, 0);

        const geo = new THREE.ShapeGeometry(petalShape, 16);
        const mat = new THREE.MeshBasicMaterial({
          color: LIME, transparent: true, opacity: opa * 0.8,
          blending: THREE.AdditiveBlending, depthWrite: false,
          side: THREE.DoubleSide,
        });
        const petal = new THREE.Mesh(geo, mat);
        petal.rotation.z = angle + Math.PI / 2;
        petal.scale.setScalar(pScale);
        group.add(petal);

        // Bright petal edge
        const edgeMat = new THREE.MeshBasicMaterial({
          color: WHITE, transparent: true, opacity: opa * 0.3,
          blending: THREE.AdditiveBlending, depthWrite: false,
          side: THREE.DoubleSide,
        });
        const edge = new THREE.Mesh(geo, edgeMat);
        edge.rotation.z = angle + Math.PI / 2;
        edge.scale.setScalar(pScale * 0.92);
        group.add(edge);
      }

      // Centre — bright glowing disc
      const centreGeo = new THREE.CircleGeometry(0.22 * pScale, 32);
      const centreMat = new THREE.MeshBasicMaterial({
        color: WHITE, transparent: true, opacity: opa,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      group.add(new THREE.Mesh(centreGeo, centreMat));

      // Inner halo
      const haloGeo = new THREE.CircleGeometry(0.38 * pScale, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: LIME, transparent: true, opacity: opa * 0.35,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      group.add(new THREE.Mesh(haloGeo, haloMat));

      parent.add(group);
      return group;
    }

    // Main bloom — at stem top
    const mainFlower = buildFlower(ROOT, 0.05, 7.2, 0,  1.0, 8, 0.70);

    // Smaller side blooms at branch ends
    const bloom1 = buildFlower(ROOT, -1.55, 3.95, 0, 0.60, 6, 0.55);
    const bloom2 = buildFlower(ROOT, -1.85, 5.60, 0, 0.50, 6, 0.50);
    const bloom3 = buildFlower(ROOT,  1.75, 3.05, 0, 0.55, 6, 0.50);
    const bloom4 = buildFlower(ROOT,  1.45, 5.10, 0, 0.45, 6, 0.45);

    // Tiny bud blooms (unopened — just a small circle + 3 petals)
    buildFlower(ROOT,  0.30, 5.80, 0, 0.30, 4, 0.55);
    buildFlower(ROOT, -0.20, 6.40, 0, 0.22, 4, 0.45);

    /* ═══════════════════════════════════════════════════════
       FLOATING PARTICLES  (spores / sparkles)
    ═══════════════════════════════════════════════════════ */
    const PCNT = 180;
    const pPos  = new Float32Array(PCNT * 3);
    const pData = [];

    for (let i = 0; i < PCNT; i++) {
      const x = (Math.random() - 0.3) * 8;
      const y = Math.random() * 9;
      const z = (Math.random() - 0.5) * 2;
      pPos[i*3]   = x;
      pPos[i*3+1] = y;
      pPos[i*3+2] = z;
      pData.push({
        bx: x, by: y, bz: z,
        vx: (Math.random() - 0.5) * 0.005,
        vy: 0.002 + Math.random() * 0.008,   // drift upward
        phase: Math.random() * Math.PI * 2,
        speed: 0.4 + Math.random() * 0.8,
      });
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      color: LIME, size: 0.06, transparent: true, opacity: 0.70,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false,
    });
    ROOT.add(new THREE.Points(pGeo, pMat));

    /* ═══════════════════════════════════════════════════════
       AMBIENT GLOW LIGHT
    ═══════════════════════════════════════════════════════ */
    const glow = new THREE.PointLight(LIME, 2.5, 12);
    glow.position.set(0.05, 5.5, 1.5);
    ROOT.add(glow);
    const glow2 = new THREE.PointLight(WHITE, 1.0, 6);
    glow2.position.set(0.05, 7.2, 1.0);
    ROOT.add(glow2);
    scene.add(new THREE.AmbientLight(0xffffff, 0.05));

    /* ═══════════════════════════════════════════════════════
       MOUSE PARALLAX
    ═══════════════════════════════════════════════════════ */
    let mx = 0, my = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', function (e) {
      tx = (e.clientX / window.innerWidth  - 0.5) *  0.25;
      ty = (e.clientY / window.innerHeight - 0.5) * -0.12;
    });

    /* ═══════════════════════════════════════════════════════
       RESIZE
    ═══════════════════════════════════════════════════════ */
    window.addEventListener('resize', function () {
      W = window.innerWidth;
      const sec = canvas.closest('section');
      H = sec ? sec.offsetHeight : window.innerHeight;
      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();

      // Re-anchor to bottom-right
      const hw = W / H;
      ROOT.position.x = hw * 4.2;
    });

    // Initial right-anchor calibration
    ROOT.position.x = (W / H) * 3.8;

    /* ═══════════════════════════════════════════════════════
       ANIMATE
    ═══════════════════════════════════════════════════════ */
    let t = 0;

    function tick() {
      requestAnimationFrame(tick);
      t += 0.010;

      // Smooth mouse parallax
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      ROOT.rotation.y = mx * 0.5;
      ROOT.rotation.x = my * 0.3;

      // Gentle whole-plant sway
      ROOT.rotation.z = Math.sin(t * 0.55) * 0.022;

      // Flower heads gently nod
      mainFlower.rotation.z = Math.sin(t * 0.7)  *  0.06;
      bloom1.rotation.z     = Math.sin(t * 0.8  + 0.5) * 0.08;
      bloom2.rotation.z     = Math.sin(t * 0.65 + 1.0) * 0.07;
      bloom3.rotation.z     = Math.sin(t * 0.75 + 1.5) * 0.07;
      bloom4.rotation.z     = Math.sin(t * 0.90 + 2.0) * 0.08;

      // Flowers slowly spin on own axis
      mainFlower.rotation.y = t * 0.10;
      bloom1.rotation.y     = t * 0.14;
      bloom2.rotation.y     = -t * 0.12;
      bloom3.rotation.y     = t * 0.13;
      bloom4.rotation.y     = -t * 0.11;

      // Particle drift
      const pa = pGeo.attributes.position.array;
      for (let i = 0; i < PCNT; i++) {
        const d = pData[i];
        pa[i*3]   += d.vx + Math.sin(t * d.speed + d.phase) * 0.003;
        pa[i*3+1] += d.vy;
        pa[i*3+2] += 0;
        // Wrap — reset particles that drift too high
        if (pa[i*3+1] > 10) {
          pa[i*3+1] = -0.5;
          pa[i*3]   = d.bx;
        }
      }
      pGeo.attributes.position.needsUpdate = true;
      pMat.opacity = 0.55 + Math.sin(t * 1.2) * 0.15;

      // Glow pulse
      glow.intensity  = 2.0 + Math.sin(t * 1.8) * 0.7;
      glow2.intensity = 0.8 + Math.sin(t * 2.4 + 1) * 0.4;

      renderer.render(scene, camera);
    }

    tick();
  });
})();
