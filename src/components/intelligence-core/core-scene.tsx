"use client";

import { Html, Line } from "@react-three/drei";
import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Cluster = { id: string; label: string; color: string; position: [number, number, number] };
const clusters: Cluster[] = [
  { id: "renewal", label: "Renewal Risk", color: "#ed727b", position: [-2.15, 1.05, 0.15] },
  { id: "expansion", label: "Expansion", color: "#62d49b", position: [2.15, 1.05, -0.2] },
  { id: "support", label: "Support Forecast", color: "#65a9f3", position: [0, -2.1, 0.25] },
];

function seeded(index: number) {
  const value = Math.sin(index * 13.173 + 31.97) * 43758.5453;
  return value - Math.floor(value);
}

function ClusterNode({ cluster, selected, dimmed, onSelect }: { cluster: Cluster; selected: boolean; dimmed: boolean; onSelect: (id: string) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const particles = useMemo(() => {
    return Array.from({ length: 22 }, (_, index) => {
      const radius = 0.35 + seeded(index + cluster.id.length) * 0.85;
      const theta = seeded(index + 18) * Math.PI * 2;
      const phi = Math.acos(2 * seeded(index + 44) - 1);
      return [radius * Math.sin(phi) * Math.cos(theta), radius * Math.sin(phi) * Math.sin(theta), radius * Math.cos(phi)] as [number, number, number];
    });
  }, [cluster.id]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.position.y = cluster.position[1] + Math.sin(clock.elapsedTime * 0.55 + cluster.position[0]) * 0.055;
    const scale = selected ? 1.13 : hovered ? 1.05 : dimmed ? 0.82 : 1;
    groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.08);
  });

  function handleClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();
    onSelect(cluster.id);
  }

  return (
    <group ref={groupRef} position={cluster.position}>
      <mesh onClick={handleClick} onPointerEnter={(event) => { event.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }} onPointerLeave={() => { setHovered(false); document.body.style.cursor = ""; }}>
        <sphereGeometry args={[0.95, 22, 22]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.76, 2]} />
        <meshBasicMaterial color={cluster.color} wireframe transparent opacity={dimmed ? 0.055 : selected ? 0.52 : hovered ? 0.34 : 0.2} toneMapped={false} />
      </mesh>
      {particles.map((position, index) => (
        <mesh key={index} position={position} scale={selected && index < 6 ? 1.25 : 1}>
          <sphereGeometry args={[index < 4 ? 0.045 : 0.028, 8, 8]} />
          <meshBasicMaterial color={dimmed ? "#454b58" : cluster.color} transparent opacity={dimmed ? 0.2 : 0.86} toneMapped={false} />
        </mesh>
      ))}
      <pointLight color={cluster.color} intensity={dimmed ? 0 : selected ? 3.2 : 1.25} distance={4.2} />
      {!dimmed && (
        <Html center position={[0, 1.05, 0]} distanceFactor={8} style={{ pointerEvents: "none" }}>
          <span className={`core-label ${selected ? "selected" : ""}`}>{cluster.label}</span>
        </Html>
      )}
    </group>
  );
}

function CentralCore({ selected }: { selected: string | null }) {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (selected ? 0.05 : 0.11);
    group.current.rotation.x += delta * 0.035;
  });
  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[1.08, 2]} />
        <meshBasicMaterial color="#7b7cff" wireframe transparent opacity={selected ? 0.44 : 0.3} toneMapped={false} />
      </mesh>
      <mesh scale={0.58}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#54d8ed" wireframe transparent opacity={0.4} toneMapped={false} />
      </mesh>
      <mesh scale={0.12}><sphereGeometry args={[1, 20, 20]} /><meshBasicMaterial color="#ffffff" toneMapped={false} /></mesh>
      <pointLight color="#7b7cff" intensity={3.4} distance={7} />
    </group>
  );
}

function Scene({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  const root = useRef<THREE.Group>(null);
  useFrame(({ pointer }, delta) => {
    if (!root.current) return;
    const selectedCluster = clusters.find((cluster) => cluster.id === selected);
    const targetY = selectedCluster ? selectedCluster.position[0] * 0.09 : pointer.x * 0.14;
    const targetX = selectedCluster ? -selectedCluster.position[1] * 0.055 : -pointer.y * 0.09;
    root.current.rotation.y = THREE.MathUtils.lerp(root.current.rotation.y, targetY, 0.045);
    root.current.rotation.x = THREE.MathUtils.lerp(root.current.rotation.x, targetX, 0.045);
    if (!selected) root.current.rotation.y += delta * 0.012;
  });

  return (
    <group ref={root}>
      <CentralCore selected={selected} />
      {clusters.map((cluster) => (
        <ClusterNode key={cluster.id} cluster={cluster} selected={selected === cluster.id} dimmed={Boolean(selected && selected !== cluster.id)} onSelect={onSelect} />
      ))}
      {clusters.map((cluster) => (
        <Line key={cluster.id} points={[[0, 0, 0], cluster.position]} color={cluster.color} transparent opacity={selected && selected !== cluster.id ? 0.035 : selected === cluster.id ? 0.55 : 0.15} lineWidth={selected === cluster.id ? 1.2 : 0.65} />
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[3.18, 0.006, 8, 120]} /><meshBasicMaterial color="#7b7cff" transparent opacity={0.16} toneMapped={false} /></mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 5, 0]}><torusGeometry args={[3.75, 0.005, 8, 120]} /><meshBasicMaterial color="#54d8ed" transparent opacity={0.1} toneMapped={false} /></mesh>
    </group>
  );
}

export function CoreScene({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <Canvas camera={{ position: [0, 0, 8.6], fov: 44 }} dpr={[1, 1.45]} gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} onPointerMissed={() => { document.body.style.cursor = ""; }}>
      <fog attach="fog" args={["#0b0e14", 7.5, 15]} />
      <ambientLight intensity={0.4} />
      <Scene selected={selected} onSelect={onSelect} />
    </Canvas>
  );
}
