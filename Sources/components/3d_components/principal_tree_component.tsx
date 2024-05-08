import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei/native'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    TreeBark_03_Clean_MergedBake_Bake1001_0: THREE.Mesh
    Tree_03_Ground_Baked_Tree_03_Ground_Bake1_baked_0: THREE.Mesh
  }
  materials: {
    ['MergedBake_Bake1.001']: THREE.MeshStandardMaterial
    Tree_03_Ground_Bake1_baked: THREE.MeshStandardMaterial
  }
}

type Props = {}

export const TreeModel = (props: Props) => {

  const { nodes, materials } = useGLTF(require('../../assets/3d/Tree.glb')) as GLTFResult
  return (
    <group {...props} dispose={null} scale={0.2}>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TreeBark_03_Clean_MergedBake_Bake1001_0.geometry}
          material={materials['MergedBake_Bake1.001']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Tree_03_Ground_Baked_Tree_03_Ground_Bake1_baked_0.geometry}
          material={materials.Tree_03_Ground_Bake1_baked}
          position={[0.197, -0.155, -0.224]}
        />
      </group>
    </group>
  )

}