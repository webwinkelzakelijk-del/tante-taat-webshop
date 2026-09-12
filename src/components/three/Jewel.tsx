"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export type Metal = "goud" | "zilver" | "rosegoud";
export type Shape = "ring" | "pendant" | "earring" | "bracelet" | "none";

const METALS: Record<Metal, { color: string; roughness: number }> = {
  goud: { color: "#e9c77a", roughness: 0.18 },
  zilver: { color: "#e6e6ea", roughness: 0.14 },
  rosegoud: { color: "#e8b49a", roughness: 0.2 },
};

export function MetalMaterial({ metal }: { metal: Metal }) {
  const m = METALS[metal];
  return <meshStandardMaterial color={m.color} metalness={1} roughness={m.roughness} envMapIntensity={1.3} />;
}

export function StoneMaterial({ color, milky }: { color: string; milky?: boolean }) {
  return milky ? (
    <meshPhysicalMaterial color={color} roughness={0.25} clearcoat={1} clearcoatRoughness={0.1} sheen={0.6} sheenColor="#fff" transmission={0.15} thickness={0.6} />
  ) : (
    <meshPhysicalMaterial color={color} roughness={0.05} metalness={0} transmission={0.85} thickness={1.2} ior={1.75} clearcoat={1} attenuationColor={color} attenuationDistance={1.5} />
  );
}

const isMilky = (hex: string) => {
  const c = new THREE.Color(hex);
  return c.r > 0.85 && c.g > 0.8 && c.b > 0.7;
};

/* ---------------- Ring ---------------- */

function Ring({ metal, stone }: { metal: Metal; stone?: string }) {
  const milky = stone ? isMilky(stone) : false;
  return (
    <group rotation={[0.35, 0, 0]}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[1, 0.11, 48, 128]} />
        <MetalMaterial metal={metal} />
      </mesh>
      {stone && (
        <group position={[0, 1.02, 0]}>
          {/* bezel */}
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.26, 0.22, 48]} />
            <MetalMaterial metal={metal} />
          </mesh>
          {/* stone */}
          <mesh position={[0, 0.14, 0]} castShadow>
            <sphereGeometry args={[0.24, 48, 32]} />
            <StoneMaterial color={stone} milky={milky} />
          </mesh>
        </group>
      )}
    </group>
  );
}

/* ---------------- Pendant (heart) ---------------- */

function heartShape() {
  const s = new THREE.Shape();
  const x = 0, y = 0;
  s.moveTo(x, y + 0.5);
  s.bezierCurveTo(x, y + 0.5, x - 0.1, y + 0.9, x - 0.5, y + 0.9);
  s.bezierCurveTo(x - 1.1, y + 0.9, x - 1.1, y + 0.2, x - 1.1, y + 0.2);
  s.bezierCurveTo(x - 1.1, y - 0.3, x - 0.6, y - 0.8, x, y - 1.2);
  s.bezierCurveTo(x + 0.6, y - 0.8, x + 1.1, y - 0.3, x + 1.1, y + 0.2);
  s.bezierCurveTo(x + 1.1, y + 0.2, x + 1.1, y + 0.9, x + 0.5, y + 0.9);
  s.bezierCurveTo(x + 0.1, y + 0.9, x, y + 0.5, x, y + 0.5);
  return s;
}

function Pendant({ metal, stone }: { metal: Metal; stone?: string }) {
  const shape = useMemo(() => heartShape(), []);
  const geo = useMemo(
    () => new THREE.ExtrudeGeometry(shape, { depth: 0.22, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.08, bevelSegments: 6, curveSegments: 48 }),
    [shape],
  );
  const inner = useMemo(
    () => new THREE.ExtrudeGeometry(shape, { depth: 0.18, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.04, bevelSegments: 4, curveSegments: 48 }),
    [shape],
  );
  const milky = stone ? isMilky(stone) : true;
  return (
    <group scale={0.8} position={[0, -0.1, 0]}>
      <mesh geometry={geo} position={[0, 0, -0.11]} castShadow>
        <MetalMaterial metal={metal} />
      </mesh>
      <mesh geometry={inner} position={[0, 0, -0.02]} scale={[0.78, 0.78, 1]}>
        <StoneMaterial color={stone ?? "#fbf6ee"} milky={milky} />
      </mesh>
      {/* bail */}
      <mesh position={[0, 1.05, 0]} rotation={[0, 0, 0]} castShadow>
        <torusGeometry args={[0.18, 0.05, 24, 48]} />
        <MetalMaterial metal={metal} />
      </mesh>
      {/* chain hint */}
      <mesh position={[0, 2.2, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 2.1, 8]} />
        <MetalMaterial metal={metal} />
      </mesh>
    </group>
  );
}

/* ---------------- Earring (drop) ---------------- */

function Earring({ metal, stone }: { metal: Metal; stone?: string }) {
  const hook = useMemo(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.9, 0), new THREE.Vector3(0, 1.4, 0), new THREE.Vector3(0.15, 1.75, 0),
      new THREE.Vector3(0.45, 1.8, 0), new THREE.Vector3(0.6, 1.55, 0), new THREE.Vector3(0.55, 1.3, 0),
    ]);
    return new THREE.TubeGeometry(c, 48, 0.035, 12, false);
  }, []);
  const milky = stone ? isMilky(stone) : false;
  const drop = (
    <group>
      <mesh geometry={hook} castShadow><MetalMaterial metal={metal} /></mesh>
      <mesh position={[0, 0.75, 0]}>
        <torusGeometry args={[0.13, 0.035, 16, 32]} />
        <MetalMaterial metal={metal} />
      </mesh>
      <mesh position={[0, 0.1, 0]} scale={[1, 1.45, 1]} castShadow>
        <sphereGeometry args={[0.42, 48, 32]} />
        <StoneMaterial color={stone ?? "#8e5fc4"} milky={milky} />
      </mesh>
      <mesh position={[0, 0.65, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.2, 0.22, 32]} />
        <MetalMaterial metal={metal} />
      </mesh>
    </group>
  );
  return (
    <group position={[0, -0.9, 0]}>
      <group position={[-0.8, 0, 0]}>{drop}</group>
      <group position={[0.8, 0, 0.1]} rotation={[0, 0.3, 0]}>{drop}</group>
    </group>
  );
}

/* ---------------- Bracelet ---------------- */

function Bracelet({ metal }: { metal: Metal }) {
  const beads = 28;
  return (
    <group rotation={[1.1, 0, 0]}>
      <mesh>
        <torusGeometry args={[1.4, 0.03, 16, 128]} />
        <MetalMaterial metal={metal} />
      </mesh>
      {Array.from({ length: beads }).map((_, i) => {
        const a = (i / beads) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.4, Math.sin(a) * 1.4, 0]} castShadow>
            <sphereGeometry args={[0.1, 24, 16]} />
            <MetalMaterial metal={metal} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ---------------- Root ---------------- */

export function Jewel({ shape, metal, stone, spin = true }: { shape: Shape; metal: Metal; stone?: string; spin?: boolean }) {
  const g = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (g.current && spin) g.current.rotation.y += dt * 0.35;
  });
  return (
    <group ref={g}>
      {shape === "ring" && <Ring metal={metal} stone={stone} />}
      {shape === "pendant" && <Pendant metal={metal} stone={stone} />}
      {shape === "earring" && <Earring metal={metal} stone={stone} />}
      {shape === "bracelet" && <Bracelet metal={metal} />}
    </group>
  );
}
