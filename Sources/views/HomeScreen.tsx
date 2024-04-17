import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { TreeModel } from '../components/3d_components/principal_tree_component'



export default function App() {
  return (
    <Canvas camera={ {position: [0, 3, 5]}}>
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={2} />
      <Suspense>
        <TreeModel/>
      </Suspense>

    </Canvas>
  )
}