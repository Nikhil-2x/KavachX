import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Icosahedron, Box, Sphere, useGLTF, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// ANIMATED SHIELD 3D MODEL - Interactive security-themed 3D object
// ============================================================================

function AnimatedShield() {
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Rotating animation
      groupRef.current.rotation.y += 0.003;
      
      // Floating animation
      groupRef.current.position.y = Math.sin(clock.getElapsedTime()) * 0.3;
      
      // Scale effect on hover
      groupRef.current.scale.lerp(
        new THREE.Vector3(isHovered ? 1.15 : 1, isHovered ? 1.15 : 1, isHovered ? 1.15 : 1),
        0.1
      );
    }
  });

  return (
    <group 
      ref={groupRef} 
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Shield Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 0.3]} />
        <meshStandardMaterial
          color="#9333ea"
          metalness={0.8}
          roughness={0.2}
          emissive="#7c3aed"
          emissiveIntensity={isHovered ? 0.5 : 0.2}
        />
      </mesh>

      {/* Shield Glow Edges */}
      <mesh position={[0, 0, 0.2]}>
        <boxGeometry args={[1.65, 2.1, 0.1]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={isHovered ? 1 : 0.3}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Center Sphere - Security Core */}
      <mesh position={[0, 0, 0.3]}>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.9}
          roughness={0.1}
          emissive="#06b6d4"
          emissiveIntensity={isHovered ? 1 : 0.4}
        />
      </mesh>

      {/* Rotating Ring - Data protection indicator */}
      <mesh position={[0, 0, 0.35]} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[0.6, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#fbbf24"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Corner Accent Spheres */}
      {[
        [-0.7, 0.9, 0.3],
        [0.7, 0.9, 0.3],
        [-0.7, -0.9, 0.3],
        [0.7, -0.9, 0.3]
      ].map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#a78bfa"
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// ANIMATED CUBE - Alternative: rotating security cube
// ============================================================================

function AnimatedSecurityCube() {
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.002;
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.2;
      
      groupRef.current.scale.lerp(
        new THREE.Vector3(isHovered ? 1.2 : 1, isHovered ? 1.2 : 1, isHovered ? 1.2 : 1),
        0.1
      );
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <mesh>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color="#9333ea"
          metalness={0.7}
          roughness={0.3}
          emissive="#7c3aed"
          emissiveIntensity={isHovered ? 0.6 : 0.2}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <boxGeometry args={[1.45, 1.45, 1.45]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={isHovered ? 0.8 : 0.2}
          wireframe
          linewidth={2}
        />
      </mesh>

      {/* Inner rotating cube */}
      <mesh rotation={[0.5, 0.5, 0.5]}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.8}
          roughness={0.2}
          emissive="#06b6d4"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

// ============================================================================
// ANIMATED SPHERE NETWORK - Data protection network visualization
// ============================================================================

function AnimatedNetworkSphere() {
  const groupRef = useRef();
  const spheresRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.2) * 0.25;
      
      // Animate inner spheres
      spheresRef.current.forEach((sphere, idx) => {
        if (sphere) {
          const time = clock.getElapsedTime();
          const angle = (time * 0.5) + (idx * Math.PI * 2 / 6);
          sphere.position.x = Math.cos(angle) * 1.2;
          sphere.position.z = Math.sin(angle) * 1.2;
        }
      });
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* Central sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.9}
          roughness={0.1}
          emissive="#06b6d4"
          emissiveIntensity={isHovered ? 1 : 0.5}
        />
      </mesh>

      {/* Orbiting spheres */}
      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <mesh
          key={idx}
          ref={(el) => (spheresRef.current[idx] = el)}
          position={[1.2, 0, 0]}
        >
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial
            color="#ec4899"
            metalness={0.8}
            roughness={0.2}
            emissive="#ec4899"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* Connecting lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={12}
            array={new Float32Array([
              0, 0, 0, 1.2, 0, 0,
              0, 0, 0, -1.2, 0, 0,
              0, 0, 0, 0, 1.2, 0,
              0, 0, 0, 0, -1.2, 0,
              0, 0, 0, 0, 0, 1.2,
              0, 0, 0, 0, 0, -1.2,
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#a78bfa" linewidth={2} />
      </lineSegments>
    </group>
  );
}

// ============================================================================
// 3D CANVAS COMPONENT - Main Three.js canvas with controls
// ============================================================================

function ThreeDModel({ variant = 'shield' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      className="w-full h-full"
      gl={{ antialias: true, alpha: true, pixelRatio: Math.min(window.devicePixelRatio, 2) }}
    >
      {/* Lighting Setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1.5} />
      <directionalLight position={[-10, -10, 10]} intensity={0.5} />
      <pointLight position={[0, 0, 5]} intensity={1} color="#9333ea" />

      {/* Render appropriate model based on variant */}
      {variant === 'shield' && <AnimatedShield />}
      {variant === 'cube' && <AnimatedSecurityCube />}
      {variant === 'network' && <AnimatedNetworkSphere />}

      {/* Interactive Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={false}
        autoRotateSpeed={2}
      />

      {/* Background */}
      <color attach="background" args={['#00000000']} />
    </Canvas>
  );
}

export default ThreeDModel;