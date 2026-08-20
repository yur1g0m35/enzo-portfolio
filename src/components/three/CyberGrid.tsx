import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePositionRef } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function useIsLowEnd() {
  const [v, setV] = useState(false);
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;
    const mem = (navigator as any).deviceMemory || 4;
    setV(window.innerWidth < 768 || cores < 4 || mem < 4);
  }, []);
  return v;
}

function NetworkNodes({ isLowEnd }: { isLowEnd: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const progressRef = useRef(0);
  const mouseRef = useMousePositionRef();

  const { nodes, connections } = useMemo(() => {
    const count = isLowEnd ? 6 : window.innerWidth < 768 ? 12 : 20;
    const arr: THREE.Vector3[] = [];
    const w = window.innerWidth, h = window.innerHeight;
    for (let i = 0; i < count; i++) {
      const s = i * 7 + 42;
      arr.push(new THREE.Vector3(
        (Math.sin(s * 0.1) * 0.5 + 0.5) * w - w / 2,
        (Math.cos(s * 0.13) * 0.5 + 0.5) * h - h / 2, 0
      ));
    }
    const conn: [number, number][] = [];
    for (let i = 0; i < arr.length; i++)
      for (let j = i + 1; j < arr.length; j++)
        if (arr[i].distanceTo(arr[j]) < 350) conn.push([i, j]);
    return { nodes: arr, connections: conn };
  }, [isLowEnd]);

  const positions = useMemo(() => {
    const a = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => { a[i*3]=n.x; a[i*3+1]=n.y; a[i*3+2]=0; });
    return a;
  }, [nodes]);

  const linePositions = useMemo(() => {
    const a = new Float32Array(connections.length * 6);
    connections.forEach(([x,y], i) => {
      a[i*6]=nodes[x].x; a[i*6+1]=nodes[x].y; a[i*6+2]=0;
      a[i*6+3]=nodes[y].x; a[i*6+4]=nodes[y].y; a[i*6+5]=0;
    });
    return a;
  }, [nodes, connections]);

  useFrame(() => {
    if (!groupRef.current) return;
    const mx = (mouseRef.current.x / window.innerWidth - 0.5) * 0.02;
    const my = (mouseRef.current.y / window.innerHeight - 0.5) * 0.02;
    groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.02;
    progressRef.current = (progressRef.current + 0.003) % 1;
    if (ringRef.current) {
      const s = 50 + progressRef.current * 200;
      ringRef.current.scale.set(s/50, s/50, 1);
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.03 * (1 - progressRef.current);
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
        <pointsMaterial size={isLowEnd?1.5:2} color="#DC143C" transparent opacity={0.2} sizeAttenuation />
      </points>
      {!isLowEnd && (
        <lineSegments>
          <bufferGeometry><bufferAttribute attach="attributes-position" args={[linePositions, 3]} /></bufferGeometry>
          <lineBasicMaterial color="#DC143C" transparent opacity={0.05} />
        </lineSegments>
      )}
      <mesh ref={ringRef}>
        <ringGeometry args={[48, 50, isLowEnd?32:64]} />
        <meshBasicMaterial color="#DC143C" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function CyberGrid() {
  const reduced = useReducedMotion();
  const isLowEnd = useIsLowEnd();
  if (reduced) return null;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: isLowEnd ? 0.3 : 0.5 }}>
      <Canvas
        camera={{ position: [0, 0, 500], fov: 60 }}
        dpr={isLowEnd ? 1 : [1, 1.5]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        style={{ background: 'transparent' }}
      >
        <NetworkNodes isLowEnd={isLowEnd} />
      </Canvas>
    </div>
  );
}
