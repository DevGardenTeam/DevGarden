import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber/native'

// Define a component for a rotating box
function Box(props) {
  const meshRef = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Use the useFrame hook to update the rotation of the mesh on every frame
  useFrame((state, delta) => (meshRef.current.rotation.x += delta))

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} /> {/* Define the geometry of the box */}
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} /> {/* Apply material to the box */}
    </mesh>
  )
}

// Define the main component that renders the scene
export default function HomeScreen() {
  return (
    <Canvas> {/* Canvas component provided by @react-three/fiber for rendering 3D content */}
      <ambientLight intensity={Math.PI / 2} /> {/* Ambient light */}
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} /> {/* Spot light */}
      <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} /> {/* Point light */}
      <Box position={[-1.2, 0, 0]} /> {/* Render a box at position [-1.2, 0, 0] */}
      <Box position={[1.2, 0, 0]} /> {/* Render a box at position [1.2, 0, 0] */}
    </Canvas>
  )
}
