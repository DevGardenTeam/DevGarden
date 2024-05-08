import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber/native'
import { TerrainModel } from '../components/3d_components/terrain_component'
import { View } from "react-native"
import Trigger from '../components/3d_components/trigger';
import Loader from '../components/3d_components/loader';
import useControls from "r3f-native-orbitcontrols"



export default function HomeScreen() {
  const [loading, setLoading] = useState<boolean>(false);
  const [OrbitControls ,events] = useControls()


  return (

    <View style={{ flex: 1 }} {...events} >
                  {loading && <Loader />}
      <Canvas frameloop="demand" camera={ {position: [5, 3, 5]}}>

        <OrbitControls enablePan={false}/>

        <directionalLight position={[1, 0, 0]} args={['white', 2]} />
        <directionalLight position={[-1, 0, 0]} args={['white', 2]}  />
        <directionalLight position={[0, 0, 1]} args={['white', 2]}  />
        <directionalLight position={[0, 1, 0]} args={['white', 2]}  />
        <directionalLight position={[0, -1, 0]} args={['white', 2]}  />


        <Suspense fallback={<Trigger setLoading={setLoading} />}>
          <TerrainModel/>
        </Suspense>
      </Canvas>
      
    </View>
  )

}