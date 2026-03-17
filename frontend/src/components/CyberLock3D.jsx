import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// CYBER SECURITY LOCK - Advanced 3D Security Visualization (FIXED)
// Features: Digital lock mechanism, rotating cipher rings, glowing particles,
// scanning laser beams, and pulsing security core
// ============================================================================

function CyberLock() {
  const lockRef = useRef();
  const shellRef = useRef();
  const coreRef = useRef();
  const particleRef = useRef();
  const laserMeshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  // Particle positions for security sphere
  const particlePositions = React.useMemo(() => {
    const positions = [];
    for (let i = 0; i < 200; i++) {
      const phi = Math.acos(-1 + (2 * i) / 200);
      const theta = Math.sqrt(200 * Math.PI) * phi;
      
      positions.push(
        Math.cos(theta) * Math.sin(phi),
        Math.sin(theta) * Math.sin(phi),
        Math.cos(phi)
      );
    }
    return new Float32Array(positions);
  }, []);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();

    if (lockRef.current) {
      // Main rotation
      lockRef.current.rotation.z += 0.001;
      lockRef.current.position.y = Math.sin(elapsed * 0.5) * 0.4;

      // Scale pulsing effect
      const scale = 1 + Math.sin(elapsed * 2) * 0.05;
      lockRef.current.scale.set(scale, scale, scale);
    }

    if (shellRef.current) {
      // Shell rotation - different axis
      shellRef.current.rotation.x += 0.0008;
      shellRef.current.rotation.y += 0.002;
    }

    if (coreRef.current && coreRef.current.material) {
      // Core pulsing glow
      coreRef.current.material.emissiveIntensity = 0.3 + Math.sin(elapsed * 3) * 0.4;
      coreRef.current.scale.setScalar(1 + Math.sin(elapsed * 2.5) * 0.1);
    }

    if (particleRef.current) {
      // Particle orbit animation
      particleRef.current.rotation.x += 0.0005;
      particleRef.current.rotation.y += 0.0008;

      // Update particle positions for flowing effect
      if (particleRef.current.geometry && particleRef.current.geometry.attributes.position) {
        const positions = particleRef.current.geometry.attributes.position.array;
        const originalPositions = particlePositions;
        for (let i = 0; i < positions.length; i += 3) {
          const angle = elapsed * 0.5 + i / 50;
          positions[i] = originalPositions[i] * (1 + Math.sin(angle) * 0.1);
          positions[i + 1] = originalPositions[i + 1] * (1 + Math.cos(angle) * 0.1);
          positions[i + 2] = originalPositions[i + 2] * (1 + Math.sin(angle * 0.5) * 0.1);
        }
        particleRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }

    // Laser animation - safer approach
    if (laserMeshRef.current && laserMeshRef.current.material) {
      laserMeshRef.current.rotation.z = elapsed * 2;
      laserMeshRef.current.material.opacity = 0.3 + Math.sin(elapsed * 4) * 0.3;
    }
  });

  return (
    <group 
      ref={lockRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      {/* OUTER SHELL - Rotating security cage */}
      <group ref={shellRef}>
        {/* Main protective shell - geometric bars */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={`shell-${i}`} rotation={[0, (i * Math.PI) / 2, 0]}>
            <boxGeometry args={[2.2, 0.15, 0.15]} />
            <meshStandardMaterial
              color="#06b6d4"
              metalness={0.95}
              roughness={0.05}
              emissive="#0891b2"
              emissiveIntensity={isHovered ? 0.8 : 0.3}
            />
          </mesh>
        ))}

        {/* Vertical stabilizer bars */}
        {[0, 1, 2, 3, 4].map((i) => (
          <mesh key={`vert-${i}`} rotation={[(i * Math.PI) / 2.5, 0, Math.PI / 4]}>
            <cylinderGeometry args={[0.08, 0.08, 2.2, 8]} />
            <meshStandardMaterial
              color="#06b6d4"
              metalness={0.9}
              roughness={0.1}
              emissive="#0891b2"
              emissiveIntensity={isHovered ? 0.6 : 0.2}
            />
          </mesh>
        ))}
      </group>

      {/* CIPHER RINGS - Rotating data protection rings */}
      {[0, 1, 2].map((ringIndex) => (
        <group key={`ring-${ringIndex}`} rotation={[
          ringIndex * 0.3,
          ringIndex * 0.2,
          0
        ]}>
          {/* Main ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.2 + ringIndex * 0.3, 0.12, 16, 128]} />
            <meshStandardMaterial
              color={ringIndex === 0 ? '#ec4899' : ringIndex === 1 ? '#f97316' : '#fbbf24'}
              metalness={0.85}
              roughness={0.15}
              emissive={ringIndex === 0 ? '#be123c' : ringIndex === 1 ? '#c2410c' : '#ca8a04'}
              emissiveIntensity={isHovered ? 0.7 : 0.3}
            />
          </mesh>

          {/* Cipher notches around ring */}
          {[...Array(12)].map((_, notchIdx) => (
            <mesh
              key={`notch-${ringIndex}-${notchIdx}`}
              position={[
                Math.cos((notchIdx / 12) * Math.PI * 2) * (1.2 + ringIndex * 0.3),
                0,
                Math.sin((notchIdx / 12) * Math.PI * 2) * (1.2 + ringIndex * 0.3)
              ]}
            >
              <boxGeometry args={[0.15, 0.3, 0.15]} />
              <meshStandardMaterial
                color={ringIndex === 0 ? '#ec4899' : ringIndex === 1 ? '#f97316' : '#fbbf24'}
                emissive={ringIndex === 0 ? '#be123c' : ringIndex === 1 ? '#c2410c' : '#ca8a04'}
                emissiveIntensity={0.4}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* SECURITY CORE - Central glowing sphere */}
      <mesh ref={coreRef} position={[0, 0, 0]}>
        <sphereGeometry args={[0.6, 64, 64]} />
        <meshStandardMaterial
          color="#06b6d4"
          metalness={0.9}
          roughness={0.1}
          emissive="#06b6d4"
          emissiveIntensity={0.5}
          wireframe={false}
        />
      </mesh>

      {/* CORE GLOW LAYER */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.65, 32, 32]} />
        <meshStandardMaterial
          color="#0891b2"
          transparent
          opacity={0.2}
          emissive="#06b6d4"
          emissiveIntensity={0.6}
          wireframe={false}
        />
      </mesh>

      {/* SCANNING LASER BEAM - rotating security scan */}
      <mesh ref={laserMeshRef} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 3, 32]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.8}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* PARTICLE CLOUD - Security data flow visualization */}
      <points ref={particleRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#06b6d4"
          sizeAttenuation={true}
          transparent
          opacity={0.6}
          emissive="#0891b2"
        />
      </points>

      {/* CORNER SECURITY NODES - Data validation points */}
      {[
        [1, 1, 1],
        [-1, 1, 1],
        [1, -1, 1],
        [-1, -1, 1],
        [1, 1, -1],
        [-1, 1, -1],
        [1, -1, -1],
        [-1, -1, -1]
      ].map((pos, idx) => (
        <mesh key={`node-${idx}`} position={pos}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#a78bfa"
            metalness={0.8}
            roughness={0.2}
            emissive="#a78bfa"
            emissiveIntensity={0.4}
          />
        </mesh>
      ))}

      {/* CONNECTING EDGES - Security links */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={24}
            array={new Float32Array([
              1, 1, 1, -1, 1, 1,
              1, 1, 1, 1, -1, 1,
              1, 1, 1, 1, 1, -1,
              -1, 1, 1, -1, -1, 1,
              -1, 1, 1, -1, 1, -1,
              1, -1, 1, -1, -1, 1,
              1, -1, 1, 1, -1, -1,
              1, 1, -1, -1, 1, -1,
              1, 1, -1, 1, -1, -1,
              -1, 1, -1, -1, -1, -1,
              -1, -1, 1, -1, -1, -1,
              1, -1, -1, -1, -1, -1,
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
// 3D CANVAS COMPONENT - Cyber Lock visualization
// ============================================================================

export default function CyberLockVisualization() {
  return (
    <Canvas
      camera={{ position: [3.5, 2.5, 3.5], fov: 45 }}
      className="w-full h-full"
      gl={{ antialias: true, alpha: true, pixelRatio: Math.min(window.devicePixelRatio, 2) }}
    >
      {/* Advanced Lighting Setup */}
      {/* Ambient light for overall illumination */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Main directional light - cyan */}
      <directionalLight position={[8, 6, 8]} intensity={1.2} color="#06b6d4" />

      {/* Secondary directional light - pink */}
      <directionalLight position={[-8, -6, 8]} intensity={0.8} color="#ec4899" />

      {/* Point lights for accent */}
      <pointLight position={[0, 3, 5]} intensity={1} color="#06b6d4" distance={15} />
      <pointLight position={[5, 0, 0]} intensity={0.8} color="#ec4899" distance={15} />
      <pointLight position={[-5, -3, -5]} intensity={0.6} color="#a78bfa" distance={15} />

      {/* Render the Cyber Lock */}
      <CyberLock />

      {/* Interactive Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        autoRotate={true}
        autoRotateSpeed={2}
        zoomSpeed={1.2}
        panSpeed={1}
      />

      {/* Background */}
      <color attach="background" args={['#0a0a0a']} />
    </Canvas>
  );
}