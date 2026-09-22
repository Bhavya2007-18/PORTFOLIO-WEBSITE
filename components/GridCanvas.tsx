'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * LowPolyWireframePlane
 * 3D low-poly wireframe plane (#3C9952, opacity 0.15)
 * Slowly rotates and reacts to mouse X/Y coordinates via useFrame.
 */
function LowPolyWireframePlane() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 0.35;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    // Slow continuous Z-axis rotation
    meshRef.current.rotation.z += delta * 0.04;
    // Mouse interaction interpolation
    meshRef.current.rotation.x = -1.1 + (mouseRef.current.y - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y = (mouseRef.current.x - meshRef.current.rotation.y) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, -2, -4]} rotation={[-1.1, 0, 0]}>
      <planeGeometry args={[80, 80, 40, 40]} />
      <meshBasicMaterial
        color="#3C9952"
        wireframe={true}
        transparent={true}
        opacity={0.15}
      />
    </mesh>
  );
}

/**
 * GridCanvas (Next.js / React Three Fiber Background Component)
 * Sit behind all content at z-index: 0, pointer-events-none fixed background.
 */
export default function GridCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 6, 16], fov: 55 }}
        gl={{ alpha: true, antialias: true }}
      >
        <LowPolyWireframePlane />
      </Canvas>
    </div>
  );
}
