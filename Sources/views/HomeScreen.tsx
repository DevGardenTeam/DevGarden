import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { TreeModel } from '../components/3d_components/principal_tree_component'


export default function App() {
  return (
    <Canvas camera={{position : [-2, 3, 5], fov : 10}}>
      <Suspense>
        <TreeModel/>
      </Suspense>
    </Canvas>
  )
}