import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';

// Cake Component
function Cake({ isHovered, onClick, isSliced }: { isHovered: boolean; onClick: () => void; isSliced: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  const handleClick = (event: any) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <group ref={meshRef} onClick={handleClick} position={[0, -1, 0]}>
      {/* Base layer */}
      <mesh position={[0, 0, 0]} scale={isHovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}>
        <cylinderGeometry args={[2, 2, 1, 32]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
      
      {/* Middle layer */}
      <mesh position={[0, 1, 0]} scale={isHovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}>
        <cylinderGeometry args={[1.5, 1.5, 0.8, 32]} />
        <meshStandardMaterial color="#FFC0CB" />
      </mesh>
      
      {/* Top layer */}
      <mesh position={[0, 1.8, 0]} scale={isHovered ? [1.05, 1.05, 1.05] : [1, 1, 1]}>
        <cylinderGeometry args={[1, 1, 0.6, 32]} />
        <meshStandardMaterial color="#FFE4E1" />
      </mesh>

      {/* Decorative roses */}
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[
          Math.cos((i / 8) * Math.PI * 2) * 1.8,
          0.5,
          Math.sin((i / 8) * Math.PI * 2) * 1.8
        ]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#DC143C" />
        </mesh>
      ))}

      {/* Candles */}
      {!isSliced && [...Array(5)].map((_, i) => (
        <group key={i} position={[
          Math.cos((i / 5) * Math.PI * 2) * 0.7,
          2.5,
          Math.sin((i / 5) * Math.PI * 2) * 0.7
        ]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
            <meshStandardMaterial color="#F5DEB3" />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#FFD700" emissive="#FFA500" emissiveIntensity={0.5} />
          </mesh>
        </group>
      ))}

      {/* Slice cut */}
      {isSliced && (
        <mesh position={[1, 0.5, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.1, 2, 2]} />
          <meshStandardMaterial color="#8B4513" />
        </mesh>
      )}
    </group>
  );
}

// Knife Component
function Knife({ position, visible }: { position: [number, number, number]; visible: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current && visible) {
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <group ref={meshRef} position={position} rotation={[0, 0, -Math.PI / 4]}>
      {/* Handle */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 1, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Blade */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.02, 2, 0.3]} />
        <meshStandardMaterial color="#C0C0C0" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// Confetti Component
function Confetti({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (particlesRef.current && active) {
      particlesRef.current.children.forEach((child, i) => {
        child.position.y -= 0.05;
        child.rotation.x += 0.1;
        child.rotation.z += 0.1;
        if (child.position.y < -5) {
          child.position.y = 5;
          child.position.x = (Math.random() - 0.5) * 10;
          child.position.z = (Math.random() - 0.5) * 10;
        }
      });
    }
  });

  if (!active) return null;

  return (
    <group ref={particlesRef}>
      {[...Array(50)].map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 10,
            (Math.random() - 0.5) * 10
          ]}
        >
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color={['#FFB6C1', '#FFD700', '#DC143C', '#FFF'][i % 4]} />
        </mesh>
      ))}
    </group>
  );
}

const CakeScene = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSliced, setIsSliced] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [mousePosition, setMousePosition] = useState<[number, number, number]>([0, 0, 0]);

  const handleCakeClick = () => {
    setIsSliced(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const resetCake = () => {
    setIsSliced(false);
    setShowConfetti(false);
  };

  return (
    <div className="w-full h-screen relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 2, 8]} />
        <OrbitControls enablePan={false} enableZoom={true} enableRotate={true} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFB6C1" />
        
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <Cake isHovered={isHovered} onClick={handleCakeClick} isSliced={isSliced} />
          <Knife position={[3, 1, 0]} visible={isHovered} />
          <Confetti active={showConfetti} />
          
          {isSliced && (
            <Text
              position={[0, 4, 0]}
              fontSize={1}
              color="#DC143C"
              anchorX="center"
              anchorY="middle"
            >
              Happy Birthday, My Love! 💕
            </Text>
          )}
        </Suspense>
      </Canvas>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="glass p-6 rounded-2xl text-center">
          <h3 className="text-xl font-semibold mb-4 text-primary">
            {isSliced ? "Cake Cut! 🎉" : "Hover and Click to Cut the Cake! 🎂"}
          </h3>
          <div 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="mb-4"
          >
            <Button
              onClick={handleCakeClick}
              disabled={isSliced}
              className="bg-gradient-romantic text-white shadow-romantic hover:shadow-celebration transition-all duration-300"
            >
              {isSliced ? "Cake Cut! 💕" : "Cut the Birthday Cake! 🔪"}
            </Button>
          </div>
          {isSliced && (
            <Button
              onClick={resetCake}
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Reset Cake 🎂
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CakeScene;