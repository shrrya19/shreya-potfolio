import React, { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function supportsWebGL() {
  if (
    typeof window === "undefined" ||
    typeof document === "undefined" ||
    !window.WebGLRenderingContext
  ) {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!context) return false;
    const extension = context.getExtension("WEBGL_lose_context");
    if (extension) extension.loseContext();
    return true;
  } catch (error) {
    return false;
  }
}

function ParticleField({
  count = 1400,
  color = "#c8fa54",
  spread = 12,
  reducedMotion,
  assemble = false,
}) {
  const points = useRef();
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const radius = spread * Math.cbrt(Math.random());
      const angle = Math.random() * Math.PI * 2;
      const vertical = (Math.random() - 0.5) * spread;
      positions[index * 3] = Math.cos(angle) * radius;
      positions[index * 3 + 1] = vertical;
      positions[index * 3 + 2] = Math.sin(angle) * radius;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return buffer;
  }, [count, spread]);

  useFrame((state, delta) => {
    if (points.current && !reducedMotion) {
      points.current.rotation.y += delta * 0.012;
      points.current.rotation.x = state.mouse.y * 0.025;
      if (assemble) {
        const progress = Math.min(1, state.clock.elapsedTime / 2.2);
        const eased = progress * progress * (3 - 2 * progress);
        points.current.scale.setScalar(0.025 + eased * 0.975);
      }
    }
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.74}
        depthWrite={false}
      />
    </points>
  );
}

function PortalScene({ reducedMotion, mobile }) {
  const portal = useRef();
  const outerRing = useRef();
  const innerRing = useRef();

  useFrame((state, delta) => {
    if (reducedMotion) return;
    state.camera.position.x += (state.mouse.x * 0.28 - state.camera.position.x) * delta * 0.5;
    state.camera.position.y += (state.mouse.y * 0.18 - state.camera.position.y) * delta * 0.5;
    state.camera.lookAt(0, 0, 0);
    if (!portal.current) return;
    portal.current.rotation.y += delta * 0.055;
    portal.current.rotation.x = state.mouse.y * 0.08;
    const progress = Math.min(1, state.clock.elapsedTime / 1.8);
    const eased = progress * progress * (3 - 2 * progress);
    portal.current.scale.setScalar(0.025 + eased * 0.975);
    if (outerRing.current) outerRing.current.rotation.z += delta * 0.08;
    if (innerRing.current) innerRing.current.rotation.z -= delta * 0.11;
  });

  return (
    <>
      <fog attach="fog" args={["#05070a", 9, 24]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[0, 0, 3]} color="#c8fa54" intensity={20} distance={10} />
      <pointLight position={[-5, 2, -2]} color="#43dfff" intensity={8} distance={12} />
      <ParticleField
        count={mobile ? 480 : 1800}
        spread={15}
        reducedMotion={reducedMotion}
        assemble
      />
      <group ref={portal} position={[0, 0, 0]} scale={reducedMotion ? 1 : 0.025}>
        <mesh ref={outerRing}>
          <torusGeometry args={[2.25, 0.018, 8, 160]} />
          <meshBasicMaterial color="#b4fa52" transparent opacity={0.9} />
        </mesh>
        <mesh ref={innerRing} rotation={[0.3, 0.2, 0]}>
          <torusGeometry args={[1.72, 0.012, 8, 160]} />
          <meshBasicMaterial color="#62eaff" transparent opacity={0.74} />
        </mesh>
        <mesh rotation={[0.2, 0.5, 0]}>
          <torusGeometry args={[1.92, 0.008, 6, 160]} />
          <meshBasicMaterial color="#bc8cff" transparent opacity={0.55} />
        </mesh>
        <mesh>
          <circleGeometry args={[1.5, 64]} />
          <meshBasicMaterial color="#101c20" transparent opacity={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.06]}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial
            color="#d9ff9a"
            emissive="#89c92d"
            emissiveIntensity={2.2}
            roughness={0.25}
            metalness={0.2}
          />
        </mesh>
      </group>
    </>
  );
}

function IslandScene({ reducedMotion, mobile }) {
  const island = useRef();
  const atmosphere = useRef();

  useFrame((state, delta) => {
    if (!island.current) return;
    if (reducedMotion) return;
    island.current.position.y = Math.sin(state.clock.elapsedTime * 0.38) * 0.1;
    island.current.rotation.y += delta * 0.035;
    if (atmosphere.current) atmosphere.current.rotation.y -= delta * 0.014;
  });

  return (
    <>
      <fog attach="fog" args={["#080b12", 8, 22]} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[4, 6, 5]} color="#e5ffc1" intensity={2} />
      <pointLight position={[-4, 2, 1]} color="#8f78ff" intensity={12} distance={12} />
      <pointLight position={[3, -2, -3]} color="#38d9e8" intensity={8} distance={12} />
      <ParticleField count={mobile ? 260 : 900} color="#d7efff" spread={11} reducedMotion={reducedMotion} />
      <group ref={atmosphere}>
        <mesh rotation={[Math.PI / 2.2, 0, 0]} position={[0, -0.5, -0.8]}>
          <torusGeometry args={[3.5, 0.012, 6, 100]} />
          <meshBasicMaterial color="#9d8aff" transparent opacity={0.42} />
        </mesh>
      </group>
      <group ref={island} position={[0, -0.3, 0]}>
        <mesh position={[0, -0.42, 0]} scale={[1.8, 0.5, 1.2]}>
          <sphereGeometry args={[1, 32, 24]} />
          <meshStandardMaterial color="#263237" roughness={0.86} />
        </mesh>
        <mesh position={[0, -0.05, 0]} scale={[1.42, 0.34, 0.95]}>
          <sphereGeometry args={[1, 32, 24]} />
          <meshStandardMaterial color="#53664d" roughness={0.93} />
        </mesh>
        <mesh position={[-0.48, 0.3, 0.14]} scale={[0.15, 0.72, 0.15]}>
          <coneGeometry args={[0.55, 1.2, 7]} />
          <meshStandardMaterial color="#243b3d" roughness={0.9} />
        </mesh>
        <mesh position={[-0.48, 1.08, 0.14]} scale={[0.5, 0.62, 0.5]}>
          <icosahedronGeometry args={[0.52, 1]} />
          <meshStandardMaterial color="#829c73" roughness={0.95} />
        </mesh>
        <mesh position={[0.62, 0.23, -0.2]} scale={[0.12, 0.5, 0.12]}>
          <coneGeometry args={[0.48, 1, 7]} />
          <meshStandardMaterial color="#273f42" roughness={0.9} />
        </mesh>
        <mesh position={[0.62, 0.85, -0.2]} scale={[0.42, 0.52, 0.42]}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial color="#658c82" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.34, 0.1]}>
          <octahedronGeometry args={[0.32, 1]} />
          <meshStandardMaterial
            color="#d6ff9a"
            emissive="#9ce04b"
            emissiveIntensity={0.8}
            roughness={0.24}
          />
        </mesh>
      </group>
    </>
  );
}

function GalaxyScene({ skills, selectedSkill, onSelectSkill, reducedMotion, mobile }) {
  const galaxy = useRef();
  const positions = useMemo(
    () =>
      skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 2.4 + (index % 3) * 0.54;
        return [
          Math.cos(angle) * radius,
          Math.sin(index * 2.2) * 0.62,
          Math.sin(angle) * radius,
        ];
      }),
    [skills],
  );

  useFrame((state, delta) => {
    if (galaxy.current && !reducedMotion) {
      galaxy.current.rotation.y += delta * 0.035;
      galaxy.current.rotation.x = state.mouse.y * 0.035;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} color="#c8fa54" intensity={18} distance={12} />
      <pointLight position={[4, 2, -4]} color="#5de6ff" intensity={8} distance={10} />
      <ParticleField count={mobile ? 360 : 1200} color="#b8c5ff" spread={13} reducedMotion={reducedMotion} />
      <group ref={galaxy}>
        {positions.map((position, index) => {
          const skill = skills[index];
          const selected = skill.name === selectedSkill;
          return (
            <mesh
              key={skill.name}
              position={position}
              onClick={(event) => {
                event.stopPropagation();
                onSelectSkill(skill);
              }}
              onPointerOver={() => {
                if (typeof document !== "undefined") {
                  document.body.style.cursor = "pointer";
                }
              }}
              onPointerOut={() => {
                if (typeof document !== "undefined") {
                  document.body.style.cursor = "";
                }
              }}
            >
              <icosahedronGeometry args={[selected ? 0.2 : 0.13, 1]} />
              <meshStandardMaterial
                color={selected ? "#d9ff8a" : index % 2 ? "#52d8ee" : "#b29aff"}
                emissive={selected ? "#8acb35" : "#222845"}
                emissiveIntensity={selected ? 1.7 : 0.45}
                roughness={0.22}
                metalness={0.35}
              />
            </mesh>
          );
        })}
        <mesh>
          <sphereGeometry args={[0.58, 32, 32]} />
          <meshStandardMaterial
            color="#192a22"
            emissive="#88bc3b"
            emissiveIntensity={0.7}
            roughness={0.2}
            metalness={0.36}
          />
        </mesh>
      </group>
    </>
  );
}

function CityScene({ reducedMotion, mobile }) {
  const city = useRef();
  const buildings = useMemo(
    () =>
      Array.from({ length: mobile ? 12 : 22 }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const row = Math.floor(index / 2);
        return {
          x: side * (2.1 + (row % 3) * 0.6),
          y: 0.15 + ((row * 7) % 5) * 0.22,
          z: -1 - row * 0.82,
          width: 0.42 + ((row * 3) % 3) * 0.12,
          height: 1.2 + ((row * 5) % 6) * 0.35,
          depth: 0.48 + ((row * 2) % 3) * 0.14,
          color: row % 3 === 0 ? "#16313b" : row % 3 === 1 ? "#25213d" : "#1d332b",
          light: row % 2 === 0 ? "#4be8f0" : "#c8fa54",
        };
      }),
    [mobile],
  );

  useFrame((state, delta) => {
    if (city.current && !reducedMotion) {
      city.current.rotation.y += delta * 0.012;
      city.current.rotation.x = state.mouse.y * 0.018;
    }
  });

  return (
    <>
      <fog attach="fog" args={["#050710", 8, 24]} />
      <ambientLight intensity={0.45} />
      <pointLight position={[-3, 3, 2]} color="#32d9f4" intensity={18} distance={14} />
      <pointLight position={[3, 2, -3]} color="#a567ff" intensity={15} distance={14} />
      <ParticleField count={mobile ? 180 : 600} color="#b9ddff" spread={13} reducedMotion={reducedMotion} />
      <group ref={city} position={[0, -0.5, 0]}>
        <mesh position={[0, -0.72, -7]}>
          <boxGeometry args={[1.3, 0.08, 20]} />
          <meshStandardMaterial color="#101823" emissive="#101823" />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh
            key={`lane-${side}`}
            position={[side * 0.56, -0.66, -7]}
          >
            <boxGeometry args={[0.018, 0.01, 20]} />
            <meshBasicMaterial color="#c8fa54" transparent opacity={0.6} />
          </mesh>
        ))}
        {buildings.map((building, index) => (
          <group key={index} position={[building.x, building.y, building.z]}>
            <mesh>
              <boxGeometry args={[building.width, building.height, building.depth]} />
              <meshStandardMaterial
                color={building.color}
                emissive={building.color}
                emissiveIntensity={0.24}
                roughness={0.42}
                metalness={0.55}
              />
            </mesh>
            <mesh position={[0, 0, building.depth / 2 + 0.008]}>
              <boxGeometry args={[building.width * 0.58, 0.025, 0.012]} />
              <meshBasicMaterial color={building.light} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

function StaticScene({ scene }) {
  return (
    <div className={`scene-fallback scene-fallback-${scene}`} aria-hidden="true">
      <span className="fallback-ring fallback-ring-one" />
      <span className="fallback-ring fallback-ring-two" />
      <span className="fallback-core" />
      <span className="fallback-grain" />
    </div>
  );
}

export default function SceneCanvas({
  scene,
  className = "",
  skills = [],
  selectedSkill,
  onSelectSkill,
  enabled = true,
}) {
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [inRange, setInRange] = useState(false);
  const [mobile, setMobile] = useState(false);
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!enabled) {
      setInRange(false);
      return undefined;
    }

    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") {
      setInRange(false);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInRange(entry.isIntersecting);
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [enabled]);

  useEffect(() => {
    if (!inRange || !enabled) return;
    setWebglAvailable(supportsWebGL());
  }, [enabled, inRange]);

  useEffect(() => {
    if (typeof window.matchMedia === "function") {
      setMobile(window.matchMedia("(max-width: 640px)").matches);
    }
  }, []);

  return (
    <div className={`scene-canvas ${className}`} aria-hidden="true" ref={containerRef}>
      {webglAvailable && enabled && inRange ? (
        <Canvas
          frameloop={reducedMotion ? "demand" : "always"}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 8], fov: 44 }}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          fallback={<StaticScene scene={scene} />}
        >
          {scene === "island" ? (
            <IslandScene reducedMotion={reducedMotion} mobile={mobile} />
          ) : scene === "galaxy" ? (
            <GalaxyScene
              skills={skills}
              selectedSkill={selectedSkill}
              onSelectSkill={onSelectSkill}
              reducedMotion={reducedMotion}
              mobile={mobile}
            />
          ) : scene === "city" ? (
            <CityScene reducedMotion={reducedMotion} mobile={mobile} />
          ) : (
            <PortalScene reducedMotion={reducedMotion} mobile={mobile} />
          )}
        </Canvas>
      ) : (
        <StaticScene scene={scene} />
      )}
    </div>
  );
}
