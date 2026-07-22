"use client";

import { Float, Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function seeded(index: number) {
  const value = Math.sin(index * 12.9898 + 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function DataField() {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(165 * 3);
    for (let index = 0; index < 165; index += 1) {
      const radius = 2.2 + seeded(index + 1) * 3;
      const theta = seeded(index + 19) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(index + 47) - 1);
      array[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      array[index * 3 + 2] = radius * Math.cos(phi);
    }
    return array;
  }, []);

  const rings = useMemo(() => {
    return Array.from({ length: 3 }, (_, ringIndex) => {
      const points: [number, number, number][] = [];
      const radius = 2.1 + ringIndex * 0.65;
      for (let index = 0; index <= 80; index += 1) {
        const angle = (index / 80) * Math.PI * 2;
        points.push([Math.cos(angle) * radius, Math.sin(angle) * radius * 0.38, Math.sin(angle) * 0.22]);
      }
      return points;
    });
  }, []);

  useFrame(({ pointer, clock }, delta) => {
    if (!groupRef.current || !pointsRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.18, 0.035);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -pointer.y * 0.1, 0.035);
    groupRef.current.rotation.y += delta * 0.015;
    pointsRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.18) * 0.06;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#8f91ff" size={0.062} transparent opacity={0.88} sizeAttenuation depthWrite={false} />
      </points>
      {rings.map((ring, index) => (
        <Line key={index} points={ring} color={index === 1 ? "#54d8ed" : "#7b7cff"} transparent opacity={0.13 - index * 0.02} lineWidth={0.55} rotation={[index * 0.62, index * 0.3, index * 0.52]} />
      ))}
    </group>
  );
}

function IntelligenceCore() {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame(({ clock }, delta) => {
    if (outer.current) {
      outer.current.rotation.x += delta * 0.085;
      outer.current.rotation.y += delta * 0.12;
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.17;
      inner.current.scale.setScalar(0.63 + Math.sin(clock.elapsedTime * 1.15) * 0.035);
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.18}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.34, 3]} />
        <meshBasicMaterial color="#62d9e7" wireframe transparent opacity={0.34} toneMapped={false} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[1.03, 1]} />
        <meshBasicMaterial color="#7b7cff" wireframe transparent opacity={0.42} toneMapped={false} />
      </mesh>
      <mesh scale={0.13}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial color="#f5f7fb" toneMapped={false} />
      </mesh>
      <pointLight color="#7b7cff" intensity={4.2} distance={7} />
    </Float>
  );
}

function SignalLines() {
  const lines = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => {
      const start: [number, number, number] = [(seeded(index + 5) - 0.5) * 8, (seeded(index + 21) - 0.5) * 6, (seeded(index + 42) - 0.5) * 3];
      const end: [number, number, number] = [start[0] * 0.24, start[1] * 0.24, start[2] * 0.24];
      return [start, end] as [[number, number, number], [number, number, number]];
    });
  }, []);

  return <>{lines.map((line, index) => <Line key={index} points={line} color={index % 2 ? "#7b7cff" : "#54d8ed"} transparent opacity={0.11} lineWidth={0.5} />)}</>;
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8.5], fov: 43 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}>
      <fog attach="fog" args={["#0b0e14", 7, 15]} />
      <ambientLight intensity={0.4} />
      <DataField />
      <SignalLines />
      <IntelligenceCore />
    </Canvas>
  );
}
