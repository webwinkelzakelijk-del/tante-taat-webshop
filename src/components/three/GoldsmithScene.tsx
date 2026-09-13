"use client";

import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

type Point = [number, number, number];
const skin = "#dda886";
const hair = "#593a2b";
const cloth = "#253338";
const gold = "#dbb766";

function Ellipsoid({ position, scale, color, rotation = [0, 0, 0], metal = false }: {
  position: Point; scale: Point; color: string; rotation?: Point; metal?: boolean;
}) {
  return <mesh position={position} scale={scale} rotation={rotation}>
    <sphereGeometry args={[1, 24, 16]} />
    <meshStandardMaterial color={color} roughness={metal ? .28 : .7} metalness={metal ? .65 : 0} />
  </mesh>;
}

function Stroke({ points, radius, color, metal = false }: { points: Point[]; radius: number; color: string; metal?: boolean }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), [points]);
  return <mesh>
    <tubeGeometry args={[curve, 24, radius, 8, false]} />
    <meshStandardMaterial color={color} metalness={metal ? .65 : 0} roughness={metal ? .3 : .65} />
  </mesh>;
}

function Box({ position, size, color, radius = .04 }: { position: Point; size: Point; color: string; radius?: number }) {
  return <RoundedBox position={position} args={size} radius={radius} smoothness={3}>
    <meshStandardMaterial color={color} roughness={.65} />
  </RoundedBox>;
}

function Ring({ position, scale = 1 }: { position: Point; scale?: number }) {
  return <group position={position} scale={scale}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[.105, .023, 10, 32]} />
      <meshStandardMaterial color={gold} metalness={.75} roughness={.23} />
    </mesh>
    <Ellipsoid position={[0, .035, -.105]} scale={[.052, .032, .047]} color="#fff0dd" />
    {[-1, 1].map(i => <Ellipsoid key={i} position={[i * .046, .036, -.105]} scale={[.013, .026, .013]} color={gold} metal />)}
  </group>;
}

function Goldsmith({ animate }: { animate: boolean }) {
  const model = useRef<THREE.Group>(null);
  const workingHand = useRef<THREE.Group>(null);
  const sparks = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = animate ? clock.getElapsedTime() : 0;
    if (model.current) model.current.position.y = Math.sin(t * .65) * .025;
    if (workingHand.current) workingHand.current.rotation.z = Math.sin(t * 2.4) * .025;
    sparks.current?.children.forEach((spark, i) => {
      const phase = (t * .35 + i / 9) % 1;
      spark.position.set(-.13 + Math.sin(i * 2.4) * phase * .3, 1.48 + phase * .55, .83 + Math.cos(i * 2.4) * phase * .26);
      spark.scale.setScalar(animate ? Math.sin(phase * Math.PI) * .012 : .008);
    });
  });
  return <group ref={model}>
    {/* A complete, freely viewable miniature, not a photograph on a plane. */}
    <mesh position={[0, -.09, 0]}>
      <cylinderGeometry args={[1.63, 1.7, .13, 64]} />
      <meshStandardMaterial color="#403a32" roughness={.8} />
    </mesh>
    <mesh position={[0, -.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.54, 1.555, 64]} />
      <meshStandardMaterial color={gold} metalness={.5} roughness={.4} />
    </mesh>
    {/* Stool and seated legs. */}
    {[[-.43, -.57], [.43, -.57], [-.43, -.05], [.43, -.05]].map(([x,z], i) => <Box key={i} position={[x, .33, z]} size={[.055, .68, .055]} color="#4d4941" radius={.015} />)}
    <Box position={[0, .71, -.38]} size={[.97, .13, .75]} color="#855d43" />
    <Stroke points={[[-.24, .8, -.32], [-.34, .63, .13], [-.38, .17, .23]]} radius={.145} color="#343b3d" />
    <Stroke points={[[.24, .8, -.32], [.4, .63, .1], [.46, .17, .21]]} radius={.145} color="#343b3d" />
    <Ellipsoid position={[-.38, .12, .33]} scale={[.16, .1, .28]} color="#b8a491" />
    <Ellipsoid position={[.46, .12, .31]} scale={[.16, .1, .28]} color="#b8a491" />
    {/* Leaning blouse, sleeves, and individually modelled embroidery. */}
    <Ellipsoid position={[0, 1.25, -.28]} scale={[.47, .65, .31]} rotation={[.24, 0, 0]} color={cloth} />
    <Stroke points={[[-.39, 1.62, -.13], [-.61, 1.33, .08], [-.45, 1.26, .47]]} radius={.16} color={cloth} />
    <Stroke points={[[.39, 1.62, -.13], [.61, 1.34, .05], [.4, 1.32, .51]]} radius={.16} color={cloth} />
    {[-1, 1].map(side => <group key={side}>
      {Array.from({ length: 8 }, (_, i) => <mesh key={i} position={[side * (.45 + Math.sin(i * .45) * .1), 1.64 - i * .048, .035 + i * .057]} rotation={[.3, side * .55, .25]}>
        <torusGeometry args={[.036, .007, 4, 10]} /><meshStandardMaterial color="#e2d5ba" />
      </mesh>)}
      {Array.from({ length: 9 }, (_, i) => <Ellipsoid key={`stitch-${i}`} position={[side * (.14 + i % 3 * .08), .92 + Math.floor(i / 3) * .18, .025]} scale={[.025, .04, .008]} color="#cabb9f" />)}
    </group>)}
    <Ellipsoid position={[0, 1.86, -.02]} scale={[.13, .2, .14]} color={skin} />
    {/* Bowed head, ponytail, magnifying visor and gold earrings. */}
    <group position={[0, 2.12, .05]} rotation={[.39, -.12, -.08]}>
      <Ellipsoid position={[0, 0, 0]} scale={[.285, .365, .27]} color={skin} />
      <Ellipsoid position={[0, .105, -.105]} scale={[.302, .315, .235]} color={hair} />
      <Ellipsoid position={[0, -.04, .261]} scale={[.055, .087, .065]} color={skin} />
      <Stroke points={[[-.055, -.16, .224], [0, -.167, .234], [.055, -.16, .224]]} radius={.008} color="#a46f59" />
      {[-1, 1].map(side => <group key={side}>
        <Ellipsoid position={[side * .272, -.055, -.01]} scale={[.045, .081, .046]} color={skin} />
        <Stroke points={[[side * .063, .019, .253], [side * .104, .007, .247], [side * .147, .016, .231]]} radius={.009} color="#5c4238" />
        <mesh position={[side * .294, -.175, -.015]} rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[.061, .009, 8, 20]} /><meshStandardMaterial color={gold} metalness={.7} roughness={.25} />
        </mesh>
      </group>)}
      <Stroke points={[[-.283, 0, -.09], [-.28, .15, .04], [0, .26, .15], [.28, .15, .04], [.283, 0, -.09]]} radius={.037} color="#414d4c" />
      <Box position={[0, .102, .294]} size={[.54, .09, .11]} color="#414d4c" radius={.015} />
      <mesh position={[0, .015, .345]} rotation={[-.14, 0, 0]}>
        <boxGeometry args={[.49, .15, .025]} />
        <meshPhysicalMaterial color="#b5d0cc" transparent opacity={.36} metalness={.15} roughness={.2} />
      </mesh>
      <Ellipsoid position={[.04, .05, -.335]} scale={[.16, .14, .15]} color={hair} />
      <Stroke points={[[.06, .07, -.34], [.18, -.13, -.44], [.24, -.44, -.42], [.31, -.68, -.27]]} radius={.13} color={hair} />
      {Array.from({ length: 5 }, (_, i) => <Stroke key={i} points={[[i * .024 - .04, .28, -.2], [i * .026 - .04, .18, -.326], [.14 + i * .02, -.2, -.55], [.25 + i * .02, -.55, -.37]]} radius={.008} color="#836049" />)}
    </group>
    {/* Bench: timber slab, dark drawers, legs, jeweller's bench pin. */}
    {[-.94, .94].map(x => <group key={x}>
      <Box position={[x, .64, .62]} size={[.11, 1.3, .11]} color="#936747" />
      <Box position={[x, .64, 1.17]} size={[.11, 1.3, .11]} color="#936747" />
    </group>)}
    <Box position={[0, 1.24, .91]} size={[2.16, .21, .8]} color="#be9063" />
    <Box position={[0, 1.1, 1.19]} size={[1.75, .18, .14]} color="#906543" />
    {[-.5, .5].map(x => <Box key={x} position={[x, 1.1, 1.273]} size={[.16, .025, .025]} color={gold} radius={.008} />)}
    <Box position={[-.12, 1.39, .67]} size={[.35, .07, .5]} color="#e0ba84" radius={.015} />
    <Box position={[-.12, 1.43, .8]} size={[.22, .025, .18]} color="#5c5346" radius={.015} />
    <Ring position={[-.12, 1.47, .81]} />
    {/* Both hands reach the same ring. Tool follows the right hand. */}
    <Stroke points={[[-.45, 1.27, .46], [-.34, 1.38, .62], [-.27, 1.47, .79]]} radius={.068} color={skin} />
    <Ellipsoid position={[-.26, 1.47, .79]} scale={[.085, .043, .095]} rotation={[0, -.4, 0]} color={skin} />
    {[0, 1, 2].map(i => <Stroke key={i} points={[[-.28 + i * .027, 1.47, .82], [-.24 + i * .027, 1.49, .87], [-.2 + i * .027, 1.47, .85]]} radius={.013} color={skin} />)}
    <group ref={workingHand}>
      <Stroke points={[[.4, 1.32, .51], [.29, 1.41, .63], [.12, 1.5, .82]]} radius={.065} color={skin} />
      <Ellipsoid position={[.12, 1.5, .82]} scale={[.077, .043, .07]} color={skin} />
      <Stroke points={[[.24, 1.52, .91], [.08, 1.51, .84], [-.055, 1.485, .81]]} radius={.028} color="#76817f" metal />
      <Stroke points={[[-.055, 1.485, .81], [-.11, 1.48, .8]]} radius={.009} color="#ddd8ca" metal />
    </group>
    <Stroke points={[[.24, 1.52, .91], [.53, 1.44, 1.12], [.85, 1.17, 1.35], [1.05, .5, .95]]} radius={.015} color="#313b3b" />
    {/* Recognisable bench tools and a warm articulated task lamp. */}
    <Box position={[.7, 1.37, .93]} size={[.38, .05, .25]} color="#596960" />
    <Stroke points={[[.58, 1.41, .85], [.71, 1.42, 1.0], [.82, 1.41, 1.04]]} radius={.016} color="#c6c7bb" metal />
    <Stroke points={[[-.78, 1.37, 1.01], [-.56, 1.38, 1.12]]} radius={.028} color="#604634" />
    <Box position={[-.76, 1.39, 1.02]} size={[.07, .06, .18]} color="#afb3ac" radius={.01} />
    <mesh position={[-.88, 1.38, .58]}><cylinderGeometry args={[.13, .15, .065, 24]} /><meshStandardMaterial color="#53615b" /></mesh>
    <Stroke points={[[-.88, 1.4, .58], [-1.03, 1.96, .54], [-.6, 2.25, .56]]} radius={.027} color="#65746a" metal />
    <mesh position={[-.57, 2.22, .57]} rotation={[0, 0, -.25]}><coneGeometry args={[.18, .19, 24, 1, true]} /><meshStandardMaterial color="#7f9080" side={THREE.DoubleSide} /></mesh>
    <Ellipsoid position={[-.55, 2.14, .57]} scale={[.105, .018, .105]} color="#ffe7b7" />
    <pointLight position={[-.54, 2.1, .57]} color="#ffdea3" intensity={.7} distance={2} />
    <group ref={sparks}>{Array.from({ length: 9 }, (_, i) => <mesh key={i}><octahedronGeometry args={[1]} /><meshBasicMaterial color="#ffe0a4" /></mesh>)}</group>
  </group>;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p className="p-8 text-center text-sm text-cream/70" role="status">Het interactieve atelier heeft WebGL nodig. Probeer een browser met hardwareversnelling.</p> : this.props.children; }
}

function ViewControls({ turned, reducedMotion }: { turned: boolean; reducedMotion: boolean }) {
  const { camera, invalidate, size } = useThree();
  useEffect(() => {
    camera.position.set(turned ? -3.5 : 3.5, 2.8, 5.1);
    camera.lookAt(0, 1.13, .3);
    camera.zoom = Math.min(1, size.width / size.height / 1.1);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, invalidate, turned, size.width, size.height]);
  return <OrbitControls target={[0, 1.13, .3]} enableZoom={false} enablePan={false} enableDamping={!reducedMotion} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2.1} minAzimuthAngle={-1.2} maxAzimuthAngle={1.2} />;
}

export default function GoldsmithScene() {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [turned, setTurned] = useState(false);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (container.current) observer.observe(container.current);
    const onVisibility = () => setVisible(!document.hidden && !!container.current && container.current.getBoundingClientRect().bottom > 0 && container.current.getBoundingClientRect().top < window.innerHeight);
    document.addEventListener("visibilitychange", onVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", onVisibility); };
  }, []);
  return <div ref={container} className="atelier-model" role="group" aria-label="Interactief 3D-miniatuur van Nikita die een ring bewerkt aan haar werkbank">
    <SceneBoundary>
      <Canvas dpr={[1, 1.5]} frameloop={visible && !reducedMotion ? "always" : "demand"} camera={{ position: [3.5, 2.8, 5.1], fov: 36 }} gl={{ alpha: true, antialias: true }} fallback={<p>Je browser ondersteunt dit 3D-atelier niet.</p>}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[3, 6, 4]} intensity={3.4} color="#ffe3be" />
        <directionalLight position={[-4, 3, -2]} intensity={2.4} color="#a9cace" />
        <directionalLight position={[0, 4, -3]} intensity={2} color="#f2c894" />
        <Goldsmith animate={visible && !reducedMotion} />
        <ViewControls turned={turned} reducedMotion={!!reducedMotion} />
      </Canvas>
    </SceneBoundary>
    <div className="atelier-model-controls">
      <span>Sleep om rond te kijken</span>
      <button type="button" onClick={() => setTurned(v => !v)} aria-label="Bekijk het 3D-atelier vanaf de andere kant">Andere kijkhoek ↗</button>
    </div>
  </div>;
}
