import { Float, Gltf } from '@react-three/drei/native'
import Tree3D from '../../assets/3d/Breed.glb'

export const TreeModel = () => {

  return (
    <Float>
      <Gltf src={Tree3D} />
    </Float>
  )
}