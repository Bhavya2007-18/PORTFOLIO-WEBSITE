'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── 1. UNDULATING WIREFRAME TERRAIN ────────────────────────
function WireframeTerrain() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(90, 90, 55, 55);
    return geo;
  }, []);

  useFrame((state) => {
    if (!geomRef.current) return;
    const pos = geomRef.current.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z =
        Math.sin(x * 0.15 + time * 0.4) *
        Math.cos(y * 0.15 + time * 0.3) *
        1.2 +
        Math.sin(x * 0.08 - time * 0.2) * 0.6;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2.2, 0, 0]}
      position={[0, -6, -10]}
    >
      <planeGeometry ref={geomRef} args={[90, 90, 55, 55]} />
      <meshBasicMaterial
        color="#3C9952"
        wireframe
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── 2. FLOATING DATA NODES + CONNECTIONS ───────────────────
const NODE_POSITIONS: [number, number, number][] = [
  [-3.5, 2.5, -2],
  [-1.2, 3.8, -4],
  [1.8, 2.2, -3],
  [3.5, 4.0, -5],
  [-2.5, 5.0, -6],
  [0.5, 4.5, -4.5],
  [2.8, 3.2, -2.5],
  [-0.8, 2.0, -5.5],
  [4.2, 5.2, -3.5],
  [-4.0, 3.5, -4.5],
];

const NODE_CONNECTIONS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [1, 5], [5, 6],
  [4, 5], [0, 7], [7, 8], [4, 9], [9, 0],
  [3, 8], [6, 3],
];

const EMISSIVE_COLORS = ['#a855f7', '#3b82f6', '#eab308', '#00f3ff', '#e056fd'];

function FloatingNode({ position, colorIdx }: { position: [number, number, number]; colorIdx: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const color = EMISSIVE_COLORS[colorIdx % EMISSIVE_COLORS.length];
  const initialY = position[1];
  const phase = position[0] * 1.3 + position[2] * 0.7; // unique phase per node

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = initialY + Math.sin(t * 0.8 + phase) * 0.3;
    groupRef.current.rotation.y += 0.003;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Dark metallic box */}
      <mesh>
        <boxGeometry args={[0.4, 0.25, 0.4]} />
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.95}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Glowing geometric icon on top */}
      <mesh position={[0, 0.28, 0]} rotation={[0, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      {/* Point light glow */}
      <pointLight color={color} intensity={0.6} distance={3} />
    </group>
  );
}

function NodeConnections() {
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    NODE_CONNECTIONS.forEach(([from, to]) => {
      points.push(new THREE.Vector3(...NODE_POSITIONS[from]));
      points.push(new THREE.Vector3(...NODE_POSITIONS[to]));
    });
    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <lineSegments geometry={lineGeometry}>
      <lineBasicMaterial
        color="#3C9952"
        transparent
        opacity={0.25}
        depthWrite={false}
      />
    </lineSegments>
  );
}

function FloatingDataNodes() {
  return (
    <group>
      {NODE_POSITIONS.map((pos, i) => (
        <FloatingNode key={i} position={pos} colorIdx={i} />
      ))}
      <NodeConnections />
    </group>
  );
}

// ── 3. BIOLUMINESCENT LOTUS GRAPHIC ────────────────────────
function LotusGraphic() {
  const groupRef = useRef<THREE.Group>(null);

  const petalGeom = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.35, 0.6, 0.5, 1.5, 0, 2.6);
    shape.bezierCurveTo(-0.5, 1.5, -0.35, 0.6, 0, 0);

    const extrudeSettings = {
      depth: 0.04,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.03,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  const layers = useMemo(() => [
    { count: 7, scale: 1.0, color: '#00e5cc', emissive: '#00e5cc', speed: 0.1, radius: 1.2, tilt: 0.45 },
    { count: 5, scale: 0.75, color: '#3C9952', emissive: '#3C9952', speed: -0.15, radius: 0.8, tilt: 0.35 },
    { count: 4, scale: 0.5, color: '#ffffff', emissive: '#00f3ff', speed: 0.2, radius: 0.4, tilt: 0.25 },
  ], []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.12;
    groupRef.current.position.y = 3.5 + Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
  });

  return (
    <group ref={groupRef} position={[6, 3.5, 2]}>
      {/* Core Glowing Orb */}
      <mesh>
        <sphereGeometry args={[0.3, 24, 24]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>
      <pointLight color="#00e5cc" intensity={3} distance={6} />
      <pointLight color="#3C9952" intensity={2} distance={5} />

      {/* Petal Layers */}
      {layers.map((layer, lIdx) =>
        Array.from({ length: layer.count }).map((_, pIdx) => {
          const angle = (pIdx / layer.count) * Math.PI * 2;
          return (
            <group
              key={`${lIdx}-${pIdx}`}
              rotation={[layer.tilt, angle, 0.15]}
              position={[
                Math.sin(angle) * layer.radius,
                0,
                Math.cos(angle) * layer.radius,
              ]}
              scale={layer.scale}
            >
              <mesh geometry={petalGeom}>
                <meshPhongMaterial
                  color={layer.color}
                  emissive={layer.emissive}
                  emissiveIntensity={0.5}
                  transparent
                  opacity={0.6}
                  shininess={120}
                  side={THREE.DoubleSide}
                  depthWrite={false}
                />
              </mesh>
            </group>
          );
        })
      )}
    </group>
  );
}

// ── 4. AMBIENT PARTICLES ───────────────────────────────────
function AmbientParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const count = 200;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return { positions, count };
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const pos = particlesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const ix = i * 3 + 1;
      pos.array[ix] += Math.sin(t * 0.3 + i * 0.1) * 0.002;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#3C9952"
        size={0.04}
        transparent
        opacity={0.4}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

// ── 5. TOP-LEVEL CANVAS BACKGROUND COMPONENT ──────────────
export default function CanvasBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 6, 14], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 15, 10]} intensity={0.6} />
        <pointLight position={[0, 8, 0]} intensity={1.5} color="#3C9952" />

        <WireframeTerrain />
        <FloatingDataNodes />
        <LotusGraphic />
        <AmbientParticles />
      </Canvas>
    </div>
  );
}
