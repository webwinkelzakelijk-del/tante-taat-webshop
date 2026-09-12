"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Lightformer, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Jewel, type Metal, type Shape } from "./Jewel";

type Props = {
  shape: Shape;
  metal: Metal;
  stone?: string;
  interactive?: boolean;
  className?: string;
  float?: boolean;
};

/**
 * Studio-lit 3D viewer. The environment is built from Lightformers (no external HDR),
 * so it works offline and on Replit without extra assets.
 */
export function JewelViewer({ shape, metal, stone, interactive = true, className = "", float = true }: Props) {
  if (shape === "none") return null;
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 0.7, 5.4], fov: 30 }}
        gl={{ antialias: true, alpha: true, toneMappingExposure: 1.05 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.25} />
          <spotLight position={[4, 6, 4]} intensity={2.2} angle={0.4} penumbra={1} castShadow />
          <Environment resolution={256}>
            {/* warm studio backdrop so metal never reflects pure black */}
            <mesh scale={60}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshBasicMaterial color="#d9cfc4" side={THREE.BackSide} />
            </mesh>
            <group rotation={[-Math.PI / 3, 0, 1]}>
              <Lightformer form="rect" intensity={6} position={[0, 5, -9]} scale={[12, 8, 1]} color="#fffaf2" />
              <Lightformer form="rect" intensity={3} position={[0, 8, 4]} scale={[10, 3, 1]} color="#ffffff" />
              <Lightformer form="ring" intensity={3} position={[-5, 2, 1]} scale={4} color="#ffe9d6" />
              <Lightformer form="rect" intensity={2} position={[6, -2, 2]} scale={[6, 4, 1]} color="#e6f2ff" />
              <Lightformer form="circle" intensity={1.5} position={[0, -6, 0]} scale={8} color="#f3dcd6" />
            </group>
          </Environment>

          {float ? (
            <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.6}>
              <Jewel shape={shape} metal={metal} stone={stone} spin={!interactive} />
            </Float>
          ) : (
            <Jewel shape={shape} metal={metal} stone={stone} spin={!interactive} />
          )}

          <ContactShadows position={[0, -1.7, 0]} opacity={0.35} scale={8} blur={2.6} far={3} color="#5d554e" />
          {interactive && (
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} minPolarAngle={Math.PI / 4} maxPolarAngle={(3 * Math.PI) / 4} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
