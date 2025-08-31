import { useRef, useState, Suspense, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text, useTexture, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';

// Types and interfaces
interface CakeProps {
  isHovered: boolean;
  onClick: () => void;
  isSliced: boolean;
  isSlicing: boolean;
  sliceAngle: number;
  radius: number;
  height: number;
}

interface SliceProps {
  visible: boolean;
  radius: number;
  height: number;
  angle: number;
  animationProgress: number;
}

interface KnifeProps {
  position: [number, number, number];
  visible: boolean;
  isSlicing: boolean;
  animationProgress: number;
}

// Utility functions for realistic cake geometry
const createCakeLayer = (radius: number, height: number, segments: number = 64) => {
  const geometry = new THREE.CylinderGeometry(radius, radius, height, segments);
  return geometry;
};

const createSliceGeometry = (radius: number, height: number, angle: number, segments: number = 64) => {
  const angleRad = (angle * Math.PI) / 180;
  const geometry = new THREE.CylinderGeometry(radius, radius, height, segments, 1, false, 0, angleRad);
  
  // Add cut faces for realistic cross-section
  const positions = geometry.attributes.position.array;
  const uvs = geometry.attributes.uv.array;
  
  // Calculate vertices for the cut faces
  const vertices = [];
  const faceUvs = [];
  
  // Bottom face
  vertices.push(0, -height/2, 0); // center
  faceUvs.push(0.5, 0.5);
  
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * angleRad;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    vertices.push(x, -height/2, z);
    faceUvs.push((x / radius + 1) / 2, (z / radius + 1) / 2);
  }
  
  // Top face
  vertices.push(0, height/2, 0);
  faceUvs.push(0.5, 0.5);
  
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * angleRad;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    vertices.push(x, height/2, z);
    faceUvs.push((x / radius + 1) / 2, (z / radius + 1) / 2);
  }
  
  return geometry;
};

// Professional Cake Component with PBR Materials
function Cake({ isHovered, onClick, isSliced, isSlicing, sliceAngle, radius, height }: CakeProps) {
  const meshRef = useRef<THREE.Group>(null);
  
  // Create realistic materials
  const frostingMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFB6C1',
    roughness: 0.7,
    metalness: 0.1,
    normalScale: new THREE.Vector2(0.5, 0.5),
  }), []);

  const spongeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#DEB887',
    roughness: 0.9,
    metalness: 0.0,
  }), []);

  const creamMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFFACD',
    roughness: 0.3,
    metalness: 0.0,
    transparent: true,
    opacity: 0.9,
  }), []);

  const glazeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#FFC0CB',
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.8,
  }), []);

  // Subtle bobbing animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      
      // Hover effect
      const scale = isHovered ? 1.02 : 1.0;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1));
    }
  });

  const handleClick = (event: any) => {
    event.stopPropagation();
    if (!isSliced && !isSlicing) {
      onClick();
    }
  };

  return (
    <group ref={meshRef} onClick={handleClick} position={[0, -0.5, 0]}>
      {/* Base sponge layer */}
      <mesh position={[0, 0, 0]} geometry={createCakeLayer(radius, height * 0.4)}>
        <meshStandardMaterial {...spongeMaterial} />
      </mesh>
      
      {/* Base frosting */}
      <mesh position={[0, height * 0.2, 0]} geometry={createCakeLayer(radius + 0.05, height * 0.05)}>
        <meshStandardMaterial {...frostingMaterial} />
      </mesh>
      
      {/* Cream filling */}
      <mesh position={[0, height * 0.25, 0]} geometry={createCakeLayer(radius - 0.1, height * 0.05)}>
        <meshStandardMaterial {...creamMaterial} />
      </mesh>
      
      {/* Middle sponge layer */}
      <mesh position={[0, height * 0.35, 0]} geometry={createCakeLayer(radius * 0.8, height * 0.3)}>
        <meshStandardMaterial {...spongeMaterial} />
      </mesh>
      
      {/* Middle frosting */}
      <mesh position={[0, height * 0.5, 0]} geometry={createCakeLayer(radius * 0.8 + 0.05, height * 0.05)}>
        <meshStandardMaterial {...frostingMaterial} />
      </mesh>
      
      {/* Top cream filling */}
      <mesh position={[0, height * 0.55, 0]} geometry={createCakeLayer(radius * 0.7, height * 0.05)}>
        <meshStandardMaterial {...creamMaterial} />
      </mesh>
      
      {/* Top sponge layer */}
      <mesh position={[0, height * 0.7, 0]} geometry={createCakeLayer(radius * 0.6, height * 0.25)}>
        <meshStandardMaterial {...spongeMaterial} />
      </mesh>
      
      {/* Top glaze */}
      <mesh position={[0, height * 0.825, 0]} geometry={createCakeLayer(radius * 0.6 + 0.02, height * 0.02)}>
        <meshStandardMaterial {...glazeMaterial} />
      </mesh>

      {/* Decorative roses with subsurface-like material */}
      {[...Array(12)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.cos((i / 12) * Math.PI * 2) * (radius * 0.9),
            height * 0.15,
            Math.sin((i / 12) * Math.PI * 2) * (radius * 0.9)
          ]}
        >
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial 
            color="#DC143C" 
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Piping details */}
      {[...Array(24)].map((_, i) => (
        <mesh 
          key={`piping-${i}`}
          position={[
            Math.cos((i / 24) * Math.PI * 2) * (radius * 0.98),
            height * 0.25,
            Math.sin((i / 24) * Math.PI * 2) * (radius * 0.98)
          ]}
        >
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial {...frostingMaterial} />
        </mesh>
      ))}

      {/* Candles with flickering flames */}
      {!isSliced && [...Array(7)].map((_, i) => (
        <group 
          key={i} 
          position={[
            Math.cos((i / 7) * Math.PI * 2) * (radius * 0.4),
            height * 1.1,
            Math.sin((i / 7) * Math.PI * 2) * (radius * 0.4)
          ]}
        >
          {/* Candle body */}
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 0.4, 16]} />
            <meshStandardMaterial color="#F5DEB3" roughness={0.8} />
          </mesh>
          
          {/* Wick */}
          <mesh position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.1, 8]} />
            <meshStandardMaterial color="#2C1810" />
          </mesh>
          
          {/* Flame with animation */}
          <FlameComponent />
        </group>
      ))}
    </group>
  );
}

// Animated flame component
function FlameComponent() {
  const flameRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (flameRef.current && flameRef.current.material instanceof THREE.MeshStandardMaterial) {
      const flicker = Math.sin(state.clock.elapsedTime * 10) * 0.1 + 1;
      flameRef.current.scale.setScalar(flicker);
      flameRef.current.material.emissiveIntensity = flicker * 0.8;
    }
  });

  return (
    <mesh ref={flameRef} position={[0, 0.35, 0]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial 
        color="#FF4500" 
        emissive="#FF6600" 
        emissiveIntensity={0.8}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

// Professional 3D Knife Component
function Knife({ position, visible, isSlicing, animationProgress }: KnifeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [initialPosition] = useState<[number, number, number]>(position);

  // High-quality materials
  const handleMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#8B4513',
    roughness: 0.7,
    metalness: 0.1,
  }), []);

  const bladeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#E8E8E8',
    metalness: 0.95,
    roughness: 0.05,
    envMapIntensity: 2.0,
  }), []);

  const steelMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#C0C0C0',
    metalness: 1.0,
    roughness: 0.01,
    envMapIntensity: 2.5,
  }), []);

  useFrame((state) => {
    if (meshRef.current && visible) {
      const time = state.clock.elapsedTime;
      
      if (isSlicing) {
        // Complex cutting animation with realistic motion
        const cutPhase = Math.min(animationProgress * 2, 1);
        const anticipation = Math.sin(time * 15) * 0.02;
        
        meshRef.current.position.x = initialPosition[0] + anticipation;
        meshRef.current.position.y = initialPosition[1] - cutPhase * 1.5;
        meshRef.current.rotation.z = -Math.PI / 6 - cutPhase * 0.3;
      } else {
        // Gentle floating animation
        meshRef.current.position.y = initialPosition[1] + Math.sin(time * 0.8) * 0.05;
        meshRef.current.rotation.z = -Math.PI / 6 + Math.sin(time * 0.5) * 0.05;
        meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.02;
      }
    }
  });

  if (!visible) return null;

  return (
    <group ref={meshRef} position={position}>
      {/* Handle with wood grain texture simulation */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.04, 1.0, 16]} />
        <meshStandardMaterial {...handleMaterial} />
      </mesh>
      
      {/* Handle ferrule (metal band) */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.1, 16]} />
        <meshStandardMaterial {...steelMaterial} />
      </mesh>
      
      {/* Bolster */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.03, 0.15, 16]} />
        <meshStandardMaterial {...steelMaterial} />
      </mesh>
      
      {/* Main blade spine */}
      <mesh position={[0, 0.5, -0.01]}>
        <boxGeometry args={[0.02, 1.0, 0.2]} />
        <meshStandardMaterial {...bladeMaterial} />
      </mesh>
      
      {/* Blade main body */}
      <mesh position={[0, 0.5, 0.08]}>
        <boxGeometry args={[0.015, 1.0, 0.16]} />
        <meshStandardMaterial {...bladeMaterial} />
      </mesh>
      
      {/* Sharp cutting edge */}
      <mesh position={[0, 0.5, 0.15]}>
        <boxGeometry args={[0.005, 1.0, 0.02]} />
        <meshStandardMaterial {...steelMaterial} />
      </mesh>
      
      {/* Blade tip */}
      <mesh position={[0, 1.0, 0.08]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.1, 0.15, 16]} />
        <meshStandardMaterial {...bladeMaterial} />
      </mesh>
      
      {/* Fuller (groove in blade) */}
      <mesh position={[0, 0.5, 0.05]}>
        <cylinderGeometry args={[0.003, 0.003, 0.8, 8]} />
        <meshStandardMaterial color="#B0B0B0" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

// Realistic Cake Slice Component
function CakeSlice({ visible, radius, height, angle, animationProgress }: SliceProps) {
  const sliceRef = useRef<THREE.Group>(null);
  
  // Always call hooks - move before conditional returns
  const sliceGeometry = useMemo(() => createSliceGeometry(radius, height, angle), [radius, height, angle]);
  const crumbGeometry = useMemo(() => createSliceGeometry(radius - 0.1, height * 0.05, angle), [radius, height, angle]);
  const topCrumbGeometry = useMemo(() => createSliceGeometry(radius * 0.7, height * 0.05, angle), [radius, height, angle]);
  
  useFrame(() => {
    if (sliceRef.current && visible && animationProgress > 0) {
      // Multi-stage animation: lift, tilt, move out
      const liftPhase = Math.min(animationProgress * 2, 1);
      const movePhase = Math.max((animationProgress - 0.5) * 2, 0);
      
      // Smooth easing
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
      
      sliceRef.current.position.y = easeOut(liftPhase) * 0.3;
      sliceRef.current.position.x = easeOut(movePhase) * 1.2;
      sliceRef.current.rotation.z = easeOut(liftPhase) * 0.15;
      
      // Slight overshoot for natural motion
      if (movePhase > 0.8) {
        const overshoot = Math.sin((movePhase - 0.8) * 25) * 0.05;
        sliceRef.current.position.x += overshoot;
      }
    }
  });

  // Conditional rendering after all hooks
  if (!visible) return null;

  return (
    <group ref={sliceRef} position={[0, -0.5, 0]}>
      {/* Slice layers matching the main cake */}
      <mesh geometry={sliceGeometry}>
        <meshStandardMaterial color="#DEB887" roughness={0.9} />
      </mesh>
      
      {/* Cream layers visible in cross-section */}
      <mesh position={[0, height * 0.25, 0]} geometry={crumbGeometry}>
        <meshStandardMaterial color="#FFFACD" roughness={0.3} />
      </mesh>
      
      <mesh position={[0, height * 0.55, 0]} geometry={topCrumbGeometry}>
        <meshStandardMaterial color="#FFFACD" roughness={0.3} />
      </mesh>
      
      {/* Crumbs on cut face */}
      {[...Array(20)].map((_, i) => (
        <mesh 
          key={i}
          position={[
            Math.cos(angle * Math.PI / 360) * radius * 0.8,
            (Math.random() - 0.5) * height,
            Math.sin(angle * Math.PI / 360) * radius * 0.8 + (Math.random() - 0.5) * 0.1
          ]}
        >
          <sphereGeometry args={[0.01 + Math.random() * 0.02, 8, 8]} />
          <meshStandardMaterial color="#D2B48C" />
        </mesh>
      ))}
    </group>
  );
}

// Enhanced Confetti and Particles System
function Confetti({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.Group>(null);
  const [particles] = useState(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      startPos: {
        x: (Math.random() - 0.5) * 8,
        y: 3 + Math.random() * 2,
        z: (Math.random() - 0.5) * 8
      },
      velocity: {
        x: (Math.random() - 0.5) * 0.1,
        y: -(0.02 + Math.random() * 0.03),
        z: (Math.random() - 0.5) * 0.1
      },
      rotation: {
        x: Math.random() * Math.PI * 2,
        y: Math.random() * Math.PI * 2,
        z: Math.random() * Math.PI * 2
      },
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.2,
        y: (Math.random() - 0.5) * 0.2,
        z: (Math.random() - 0.5) * 0.2
      },
      color: ['#FFB6C1', '#FFD700', '#DC143C', '#FFF', '#FF69B4', '#FFA500'][i % 6],
      size: 0.05 + Math.random() * 0.1,
      shape: ['box', 'sphere'][Math.floor(Math.random() * 2)]
    }))
  );

  useFrame((state) => {
    if (particlesRef.current && active) {
      particlesRef.current.children.forEach((child, i) => {
        const particle = particles[i];
        
        // Physics simulation
        child.position.x += particle.velocity.x;
        child.position.y += particle.velocity.y;
        child.position.z += particle.velocity.z;
        
        // Gravity and air resistance
        particle.velocity.y -= 0.001; // gravity
        particle.velocity.x *= 0.995; // air resistance
        particle.velocity.z *= 0.995;
        
        // Rotation
        child.rotation.x += particle.rotationSpeed.x;
        child.rotation.y += particle.rotationSpeed.y;
        child.rotation.z += particle.rotationSpeed.z;
        
        // Reset when out of bounds
        if (child.position.y < -3) {
          child.position.copy(new THREE.Vector3(
            particle.startPos.x,
            particle.startPos.y,
            particle.startPos.z
          ));
          particle.velocity.x = (Math.random() - 0.5) * 0.1;
          particle.velocity.y = -(0.02 + Math.random() * 0.03);
          particle.velocity.z = (Math.random() - 0.5) * 0.1;
        }
      });
    }
  });

  if (!active) return null;

  return (
    <group ref={particlesRef}>
      {particles.map((particle, i) => (
        <mesh
          key={i}
          position={[particle.startPos.x, particle.startPos.y, particle.startPos.z]}
        >
          {particle.shape === 'box' ? (
            <boxGeometry args={[particle.size, particle.size, particle.size]} />
          ) : (
            <sphereGeometry args={[particle.size, 8, 8]} />
          )}
          <meshStandardMaterial 
            color={particle.color} 
            metalness={0.1}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

// Crumb particles for realistic cutting effect
function CrumbParticles({ active, position }: { active: boolean; position: [number, number, number] }) {
  const crumbsRef = useRef<THREE.Group>(null);
  const [crumbs] = useState(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      velocity: {
        x: (Math.random() - 0.5) * 0.05,
        y: Math.random() * 0.03,
        z: (Math.random() - 0.5) * 0.05
      },
      size: 0.01 + Math.random() * 0.02,
      life: 1.0
    }))
  );

  useFrame(() => {
    if (crumbsRef.current && active) {
      crumbsRef.current.children.forEach((child, i) => {
        const crumb = crumbs[i];
        
        child.position.x += crumb.velocity.x;
        child.position.y += crumb.velocity.y;
        child.position.z += crumb.velocity.z;
        
        crumb.velocity.y -= 0.002; // gravity
        crumb.life -= 0.02;
        
        // Fade out
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          child.material.opacity = Math.max(0, crumb.life);
        }
        
        // Reset
        if (crumb.life <= 0) {
          child.position.set(position[0], position[1], position[2]);
          crumb.velocity = {
            x: (Math.random() - 0.5) * 0.05,
            y: Math.random() * 0.03,
            z: (Math.random() - 0.5) * 0.05
          };
          crumb.life = 1.0;
        }
      });
    }
  });

  if (!active) return null;

  return (
    <group ref={crumbsRef} position={position}>
      {crumbs.map((crumb, i) => (
        <mesh key={i}>
          <sphereGeometry args={[crumb.size, 6, 6]} />
          <meshStandardMaterial 
            color="#D2B48C" 
            transparent
            opacity={crumb.life}
          />
        </mesh>
      ))}
    </group>
  );
}

// Main Scene Component with Advanced Animation Timeline
const CakeScene = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSliced, setIsSliced] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSlicing, setIsSlicing] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showCrumbs, setShowCrumbs] = useState(false);
  
  // Cake configuration
  const cakeConfig = {
    radius: 1.0, // 10cm radius
    height: 0.8, // 8cm height
    sliceAngle: 30 // 30 degree slice
  };

  const handleCakeClick = () => {
    if (isSliced || isSlicing) return;
    
    setIsSlicing(true);
    setAnimationProgress(0);
    
    // Complex animation timeline
    const animationDuration = 3000; // 3 seconds
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      setAnimationProgress(progress);
      
      // Phase 1: Knife descent and initial cut (0-40%)
      if (progress > 0.4 && !showCrumbs) {
        setShowCrumbs(true);
      }
      
      // Phase 2: Slice separation (40-70%)
      if (progress > 0.7 && !isSliced) {
        setIsSliced(true);
        setShowConfetti(true);
      }
      
      // Phase 3: Celebration (70-100%)
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSlicing(false);
        setTimeout(() => {
          setShowConfetti(false);
          setShowCrumbs(false);
        }, 4000);
      }
    };
    
    animate();
  };

  const resetCake = () => {
    setIsSliced(false);
    setShowConfetti(false);
    setIsSlicing(false);
    setAnimationProgress(0);
    setShowCrumbs(false);
  };

  return (
    <div className="w-full h-screen relative bg-gradient-soft">
      <Canvas
        shadows
        camera={{ position: [0, 2, 6], fov: 50 }}
        gl={{ 
          outputColorSpace: THREE.SRGBColorSpace,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0
        }}
      >
        <OrbitControls 
          enablePan={false} 
          enableZoom={true} 
          enableRotate={true}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          autoRotate={!isSlicing && !isSliced}
          autoRotateSpeed={0.5}
        />
        
        {/* Advanced lighting setup */}
        <ambientLight intensity={0.3} color="#FFF8DC" />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.8} color="#FFB6C1" />
        <spotLight 
          position={[0, 8, 0]} 
          intensity={1.2}
          angle={Math.PI / 4}
          penumbra={0.5}
          castShadow
        />
        
        <Suspense fallback={null}>
          <Environment preset="apartment" />
          
          {/* Main cake */}
          <Cake 
            isHovered={isHovered} 
            onClick={handleCakeClick} 
            isSliced={isSliced}
            isSlicing={isSlicing}
            sliceAngle={cakeConfig.sliceAngle}
            radius={cakeConfig.radius}
            height={cakeConfig.height}
          />
          
          {/* Professional knife */}
          <Knife 
            position={[2.5, 2, 0]} 
            visible={isHovered || isSlicing || isSliced} 
            isSlicing={isSlicing}
            animationProgress={animationProgress}
          />
          
          {/* Realistic cake slice */}
          <CakeSlice
            visible={isSliced}
            radius={cakeConfig.radius}
            height={cakeConfig.height}
            angle={cakeConfig.sliceAngle}
            animationProgress={animationProgress > 0.4 ? (animationProgress - 0.4) / 0.6 : 0}
          />
          
          {/* Particle effects */}
          <Confetti active={showConfetti} />
          <CrumbParticles 
            active={showCrumbs} 
            position={[0.8, -0.2, 0]} 
          />
          
          {/* Contact shadows for realism */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4.5}
          />
          
          {/* Celebratory text */}
          {isSliced && (
            <Text
              position={[0, 3, 0]}
              fontSize={0.6}
              color="#DC143C"
              anchorX="center"
              anchorY="middle"
              font="/fonts/PlayfairDisplay-Bold.woff"
            >
              Happy Birthday, My Love! 💕
            </Text>
          )}
        </Suspense>
      </Canvas>
      
      {/* Enhanced UI Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="glass p-6 rounded-3xl text-center shadow-celebration border border-white/20">
          <h3 className="text-xl font-semibold mb-4 text-primary font-playfair">
            {isSlicing ? (
              <>Cutting the Cake... 🔪 ({Math.round(animationProgress * 100)}%)</>
            ) : isSliced ? (
              "Perfect Slice! 🎉"
            ) : (
              "Cut Your Birthday Cake Together! 🎂"
            )}
          </h3>
          
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mb-4"
          >
            <Button
              onClick={handleCakeClick}
              disabled={isSliced || isSlicing}
              className="bg-gradient-romantic text-white shadow-romantic hover:shadow-celebration transition-all duration-500 font-dancing text-lg px-8 py-3 transform hover:scale-105"
            >
              {isSlicing ? (
                <>Cutting... 🔪✨</>
              ) : isSliced ? (
                "Beautifully Cut! 💕"
              ) : (
                "Cut the Birthday Cake! 🔪"
              )}
            </Button>
          </div>
          
          {isSliced && (
            <div className="space-y-2">
              <Button
                onClick={resetCake}
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 font-dancing"
              >
                Cut Another Slice 🎂
              </Button>
              <p className="text-sm text-muted-foreground font-inter">
                Made with love, just for you ❤️
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Quality settings indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className="glass p-2 rounded-lg">
          <p className="text-xs text-muted-foreground">
            🍰 Professional 3D Cake Experience
          </p>
        </div>
      </div>
    </div>
  );
};

export default CakeScene;