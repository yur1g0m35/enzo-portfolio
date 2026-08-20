import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function NetworkNodes({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null!);

  const { nodes, connections } = useMemo(() => {
    const count = window.innerWidth < 768 ? 12 : 24;
    const nodeArr: THREE.Vector3[] = [];
    const w = window.innerWidth;
    const h = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const seed = i * 7 + 42;
      const x = (Math.sin(seed * 0.1) * 0.5 + 0.5) * w - w / 2;
      const y = (Math.cos(seed * 0.13) * 0.5 + 0.5) * h - h / 2;
      nodeArr.push(new THREE.Vector3(x, y, 0));
    }

    const conn: [number, number][] = [];
    for (let i = 0; i < nodeArr.length; i++) {
      for (let j = i + 1; j < nodeArr.length; j++) {
        if (nodeArr[i].distanceTo(nodeArr[j]) < 350) {
          conn.push([i, j]);
        }
      }
    }

    return { nodes: nodeArr, connections: conn };
  }, []);

  const positions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      arr[i * 3] = n.x;
      arr[i * 3 + 1] = n.y;
      arr[i * 3 + 2] = n.z;
    });
    return arr;
  }, [nodes]);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(connections.length * 6);
    connections.forEach(([a, b], i) => {
      arr[i * 6] = nodes[a].x;
      arr[i * 6 + 1] = nodes[a].y;
      arr[i * 6 + 2] = 0;
      arr[i * 6 + 3] = nodes[b].x;
      arr[i * 6 + 4] = nodes[b].y;
      arr[i * 6 + 5] = 0;
    });
    return arr;
  }, [nodes, connections]);

  useFrame(() => {
    if (!groupRef.current) return;
    const mx = (mouse.x / window.innerWidth - 0.5) * 0.02;
    const my = (mouse.y / window.innerHeight - 0.5) * 0.02;
    groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.02;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={2} color="#8B0000" transparent opacity={0.25} sizeAttenuation />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#8B0000" transparent opacity={0.06} />
      </lineSegments>
    </group>
  );
}

function PulseRing() {
  const ref = useRef<THREE.Mesh>(null!);
  const [progress, setProgress] = useState(0);

  useFrame(() => {
    setProgress((p) => (p + 0.003) % 1);
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[50 + progress * 200, 52 + progress * 200, 64]} />
      <meshBasicMaterial color="#8B0000" transparent opacity={0.03 * (1 - progress)} />
    </mesh>
  );
}

export function CyberGrid() {
  const mouse = useMousePosition();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 0.6 }}>
      <Canvas
        camera={{ position: [0, 0, 500], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <NetworkNodes mouse={mouse} />
        <PulseRing />
      </Canvas>
    </div>
  );
}
