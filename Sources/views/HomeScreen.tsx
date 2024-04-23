import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { TerrainModel } from '../components/3d_components/terrain_component'
import useControls from 'r3f-native-orbitcontrols'
import { View } from "react-native"



export default function App() {
  const [OrbitControls, events] = useControls()
  return (

    <View style={{ flex: 1 }} {...events}>
      <Canvas camera={ {position: [5, 3, 5]}}>
        {/* <OrbitControls enablePan={false}/> Cela fait plainter le 3D à voir */}
        <directionalLight position={[1, 0, 0]} args={['white', 2]} />
        <directionalLight position={[-1, 0, 0]} args={['white', 2]}  />
        <directionalLight position={[0, 0, 1]} args={['white', 2]}  />
        <directionalLight position={[0, -1, 0]} args={['white', 2]}  />


        <Suspense fallback={null}>
          <TerrainModel/>
        </Suspense>
      </Canvas>
    </View>
  )

}