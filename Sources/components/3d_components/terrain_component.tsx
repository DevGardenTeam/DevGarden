import * as THREE from 'three'
import React, { useRef } from 'react'
import { Float, useGLTF } from '@react-three/drei/native'
import { GLTF } from 'three-stdlib'
import { StackNavigationProp } from '@react-navigation/stack';
import { GestureResponderEvent } from 'react-native';
import { ThreeEvent } from '@react-three/fiber/native';


type GLTFResult = GLTF & {
  nodes: {
    Icosphere_0: THREE.Mesh
    Icosphere005_0: THREE.Mesh
    Icosphere006_1: THREE.Mesh
    Icosphere008_0: THREE.Mesh
    Cube_1: THREE.Mesh
    Cube_2: THREE.Mesh
    Cube001: THREE.Mesh
  }
  materials: {
    grey: THREE.MeshStandardMaterial
    green: THREE.MeshStandardMaterial
    white: THREE.MeshStandardMaterial
    Dirt: THREE.MeshStandardMaterial
    Water: THREE.MeshStandardMaterial
    ['Grass.001']: THREE.MeshStandardMaterial
  }
}
type Props = {}

type TerrainModelProps = {
  onClick?: ((event: ThreeEvent<MouseEvent>) => void)
}

export const TerrainModel: React.FC<TerrainModelProps> = ({onClick },props: Props) => {

    const { nodes, materials } = useGLTF(require('../../assets/3d/terrain.glb')) as GLTFResult
    return (
        <group {...props} dispose={null} scale={0.3}>
          <group position={[-2.235, 2.811, -12.068]} rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[3.083, -3.167, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Icosphere_0.geometry}
                material={materials.grey}
                position={[0.693, -10.752, -1.645]}
                scale={0.597}
              />
            </group>
            <group rotation={[0.397, 0.191, -0.691]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Icosphere005_0.geometry}
                material={materials.green}
                position={[10.56, -10.938, 4.667]}
                scale={0.388}
              />
            </group>
            <group position={[3.083, 0, 0]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Icosphere006_1.geometry}
                material={materials.white}
                position={[-3.812, -8.378, -1.908]}
                rotation={[-0.024, 0.243, 0.069]}
              />
            </group>
            <group position={[-8.417, 0, 0]} rotation={[0.397, 0.191, -0.691]}>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.Icosphere008_0.geometry}
                material={materials.green}
                position={[14.264, 2.132, 3.361]}
                scale={0.681}
              />
            </group>
          </group>
          <group position={[0, -0.16, 0]} scale={[6, 1, 6]}>
            <mesh castShadow receiveShadow geometry={nodes.Cube_1.geometry} material={materials.Dirt} />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Cube_2.geometry}
              material={materials.Water}
            />
          </group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Cube001.geometry}
            material={materials['Grass.001']}
            position={[0, 0.837, 0]}
            scale={[6.648, 0.243, 6.648]}
            onClick={onClick}
          />
      </group>
    )
}