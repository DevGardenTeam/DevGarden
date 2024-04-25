import * as THREE from 'three'
import React, { useRef } from 'react'
import { Float, useGLTF } from '@react-three/drei/native'
import { GLTF } from 'three-stdlib'


type GLTFResult = GLTF & {
  nodes: {
    Cube_1: THREE.Mesh
    Cube_2: THREE.Mesh
    Cube001_1: THREE.Mesh
    Cube001_2: THREE.Mesh
  }
  materials: {
    Dirt: THREE.MeshStandardMaterial
    Water: THREE.MeshStandardMaterial
    ['Grass.001']: THREE.MeshStandardMaterial
  }
}

type Props = {}

export const TerrainModel = (props: Props) => {

    const { nodes, materials } = useGLTF(require('../../assets/3d/terrain.glb')) as GLTFResult
    return (
        <group {...props} dispose={null} scale={0.3}>
          <group position={[0, -0.16, 0]} scale={[6, 1, 6]}>
            <mesh castShadow receiveShadow geometry={nodes.Cube_1.geometry} material={materials.Dirt} />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_2.geometry}
              material={materials.Water}
            />
          </group>
          <group position={[0, 0.837, 0]} scale={[6.648, 0.243, 6.648]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube001_1.geometry}
              material={materials.Dirt}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube001_2.geometry}
              material={materials['Grass.001']}
            />
          </group>
      </group>
    )
}