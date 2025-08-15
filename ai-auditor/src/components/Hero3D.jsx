import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Animated Financial Dashboard Panel
function DashboardPanel({ position, rotation, data, color }) {
  const meshRef = useRef();
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Box
        ref={meshRef}
        args={[2, 1.5, 0.1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? color : color} 
          emissive={hovered ? color : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          transparent
          opacity={0.9}
        />
      </Box>
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {data}
      </Text>
    </group>
  );
}

// Animated Chart
function AnimatedChart({ position }) {
  const chartRef = useRef();
  
  useFrame((state) => {
    if (chartRef.current) {
      chartRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      chartRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Box ref={chartRef} args={[1, 2, 0.2]}>
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={0.2} />
      </Box>
      <Text
        position={[0, 1.3, 0.2]}
        fontSize={0.15}
        color="white"
        anchorX="center"
      >
        REVENUE
      </Text>
    </group>
  );
}

// Security Shield
function SecurityShield({ position }) {
  const shieldRef = useRef();
  
  useFrame((state) => {
    if (shieldRef.current) {
      shieldRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.1;
      shieldRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <group position={position}>
      <Sphere ref={shieldRef} args={[0.8, 16, 16]}>
        <meshStandardMaterial 
          color="#fbbf24" 
          emissive="#fbbf24" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </Sphere>
      <Text
        position={[0, 0, 0.9]}
        fontSize={0.12}
        color="#92400e"
        anchorX="center"
        anchorY="middle"
      >
        SECURE
      </Text>
    </group>
  );
}

// Neural Network Visualization
function NeuralNetwork({ position }) {
  const networkRef = useRef();
  
  useFrame((state) => {
    if (networkRef.current) {
      networkRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position} ref={networkRef}>
      {[...Array(5)].map((_, i) => (
        <Sphere key={i} args={[0.08, 8, 8]} position={[
          Math.cos(i * Math.PI * 0.4) * 1.5,
          Math.sin(i * Math.PI * 0.4) * 1.5,
          0
        ]}>
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.4} />
        </Sphere>
      ))}
    </group>
  );
}

// Floating Particles
function FloatingParticles() {
  const particlesRef = useRef();
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 50; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 15,
        ],
        scale: Math.random() * 0.5 + 0.1
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <Sphere key={index} args={[particle.scale, 6, 6]} position={particle.position}>
          <meshStandardMaterial 
            color="#e5e7eb" 
            emissive="#e5e7eb" 
            emissiveIntensity={0.1}
            transparent
            opacity={0.4}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Main 3D Scene Component
function Hero3DScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ height: '100%', width: '100%' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />
      
      <FloatingParticles />
      
      {/* Financial Elements */}
      <AnimatedChart position={[-3, 1, 0]} />
      <SecurityShield position={[3, 2, -1]} />
      <NeuralNetwork position={[0, -1, 0]} />
      
      {/* Additional Dashboards */}
      <DashboardPanel position={[-2, -2, 1]} rotation={[0, 0.3, 0]} data="AUDIT" color="#3b82f6" />
      <DashboardPanel position={[2, 0, -2]} rotation={[0, -0.3, 0]} data="ANALYTICS" color="#8b5cf6" />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />
    </Canvas>
  );
}

export default Hero3DScene;