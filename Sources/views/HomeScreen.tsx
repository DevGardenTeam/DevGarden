import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber/native'

function Box() {
  const meshRef = useRef();

  useFrame((state, delta) => (meshRef.current.rotation.x += delta));

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="blue" />
    </mesh>
  );
}

// Define the main component that renders the scene
export default function HomeScreen() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box />
    </Canvas>
  )
}
