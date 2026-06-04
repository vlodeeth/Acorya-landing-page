import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const EXPERTISES = [
  { label: 'Pilotage Financier', color: '#C4724A', position: [-3, 0, 0] },
  { label: 'Structuration', color: '#7A9E8E', position: [-1.5, 1, 0] },
  { label: 'IA & Auto', color: '#E8C99A', position: [0, 0, 0] },
  { label: 'Juridique', color: '#C4724A', position: [1.5, 1, 0] },
  { label: 'Achat & Pricing', color: '#7A9E8E', position: [3, 0, 0] },
];

function ExpertiseCard({ label, color, position, index }) {
  const meshRef = useRef();
  const groupRef = useRef();
  
  const [baseX, baseY, baseZ] = position;
  
  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotation douce
    meshRef.current.rotation.x = Math.sin(time * 0.5 + index) * 0.1;
    meshRef.current.rotation.y = Math.sin(time * 0.3 + index) * 0.15;
    
    // Mouvement de vague
    groupRef.current.position.y = baseY + Math.sin(time * 0.8 + index * 0.5) * 0.3;
    
    // Interaction souris
    const mouseX = state.mouse.x * 2;
    const mouseY = state.mouse.y * 2;
    
    groupRef.current.rotation.y = mouseX * 0.15;
    groupRef.current.rotation.x = -mouseY * 0.1;
  });

  return (
    <group ref={groupRef} position={[baseX, baseY, baseZ]}>
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <boxGeometry args={[2.2, 1.2, 0.15]} />
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.85}
            roughness={0.2}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
      
      {/* Texte sur la carte */}
      <Text
        position={[0, 0, 0.08]}
        fontSize={0.28}
        color="#F5F0E8"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2"
        fontWeight={500}
      >
        {label}
      </Text>
      
      {/* Bordure lumineuse */}
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[2.25, 1.25, 0.05]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} wireframe />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#C4724A" />
      <spotLight position={[0, 10, 5]} intensity={0.8} angle={0.3} penumbra={1} />
      
      <Environment preset="city" />
      
      {EXPERTISES.map((exp, i) => (
        <ExpertiseCard
          key={exp.label}
          {...exp}
          index={i}
        />
      ))}
      
      {/* Particules flottantes */}
      <Particles />
    </>
  );
}

function Particles() {
  const particlesRef = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8 - 2,
        ],
        scale: Math.random() * 0.05 + 0.02,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.getElapsedTime();
    
    particles.forEach((particle, i) => {
      particlesRef.current.children[i].position.y += particle.speed * 0.01;
      particlesRef.current.children[i].rotation.x = time * particle.speed;
      particlesRef.current.children[i].rotation.y = time * particle.speed;
      
      if (particlesRef.current.children[i].position.y > 5) {
        particlesRef.current.children[i].position.y = -5;
      }
    });
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh key={i} position={particle.position} scale={particle.scale}>
          <octahedronGeometry />
          <meshPhysicalMaterial
            color={i % 3 === 0 ? '#C4724A' : i % 3 === 1 ? '#7A9E8E' : '#E8C99A'}
            transparent
            opacity={0.6}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Hero3DVisual() {
  return (
    <div className="w-full h-[500px] md:h-[600px] relative" style={{ background: '#2a343b' }}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        style={{ position: 'absolute', inset: 0 }}
      >
        <Scene />
      </Canvas>
      
      {/* Overlay gradient pour intégration */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #2a343b 0%, transparent 20%, transparent 80%, #2a343b 100%)',
          opacity: 0.6,
        }}
      />
    </div>
  );
}