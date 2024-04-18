import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { TreeModel } from '../components/3d_components/principal_tree_component'
import { TerrainModel } from '../components/3d_components/terrain_component'



export default function App() {
  return (
    <Canvas camera={ {position: [5, 3, 5]}}>
      <directionalLight position={[1, 0, 0]} args={['white', 2]} />
      <directionalLight position={[-1, 0, 0]} args={['white', 2]}  />
      <directionalLight position={[0, 0, 1]} args={['white', 2]}  />
      <directionalLight position={[0, -1, 0]} args={['white', 2]}  />


      <ambientLight intensity={5} />
      <Suspense>
        <TerrainModel/>
      </Suspense>
    </Canvas>
  )
}