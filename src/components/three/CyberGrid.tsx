import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Detect low-end device
function useIsLowEnd() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  useEffect(() => {
    const cores = navigator.hardwareConcurrency || 2;
    const memory = (navigator as any).deviceMemory || 4;
    const isMobile = window.innerWidth < 768;
    setIsLowEnd(isMobile || cores < 4 || memory < 4);
  }, []);
  return isLowEnd;
}

function NetworkNodes({ mouse, isLowEnd }: { mouse: { x: number; y: number }; isLowEnd: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const progressRef = useRef(0);

  const { nodes, connections } = useMemo(() => {
    const count = isLowEnd ? 6 : window.innerWidth < 768 ? 12 : 20;
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
        if (nodeArr[i].distanceTo(nodeArr[j]) < 350) conn.push([i, j]);
      }
    }
    return { nodes: nodeArr, connections: conn };
  }, [isLowEnd]);

  const positions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => { arr[i*3] = n.x; arr[i*3+1] = n.y; arr[i*3+2] = 0; });
    return arr;
  }, [nodes]);

  const linePositions = useMemo(() => {
    const arr = new Float32Array(connections.length * 6);
    connections.forEach(([a, b], i) => {
      arr[i*6] = nodes[a].x; arr[i*6+1] = nodes[a].y; arr[i*6+2] = 0;
      arr[i*6+3] = nodes[b].x; arr[i*6+4] = nodes[b].y; arr[i*6+5] = 0;
    });
    return arr;
  }, [nodes, connections]);

  useFrame(() => {
    if (!groupRef.current) return;
    const mx = (mouse.x / window.innerWidth - 0.5) * 0.02;
    const my = (mouse.y / window.innerHeight - 0.5) * 0.02;
    groupRef.current.rotation.x += (my - groupRef.current.rotation.x) * 0.02;
    groupRef.current.rotation.y += (mx - groupRef.current.rotation.y) * 0.02;

    progressRef.current = (progressRef.current + 0.003) % 1;
    if (ringRef.current) {
      const s = 50 + progressRef.current * 200;
      ringRef.current.scale.set(s / 50, s / 50, 1);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.03 * (1 - progressRef.current);
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={isLowEnd ? 1.5 : 2} color="#DC143C" transparent opacity={0.2} sizeAttenuation />
      </points>
      {!isLowEnd && (
        <lineSegments>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#DC143C" transparent opacity={0.05} />
        </lineSegments>
      )}
      <mesh ref={ringRef}>
        <ringGeometry args={[48, 50, isLowEnd ? 32 : 64]} />
        <meshBasicMaterial color="#DC143C" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function CyberGrid() {
  const mouse = useMousePosition();
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
        <NetworkNodes mouse={mouse} isLowEnd={isLowEnd} />
      </Canvas>
    </div>
  );
}
