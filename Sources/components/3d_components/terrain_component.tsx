import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei/native'
import { GLTF } from 'three-stdlib'
import { ThreeEvent } from '@react-three/fiber/native';
import { Repository } from '../../model/Repository';
import { Text3D } from '@react-three/drei/native'
import fontPath from "../../assets/font/Poppins.json"

type GLTFResult = GLTF & {
  nodes: {
    Icosphere_0: THREE.Mesh
    Icosphere006_1: THREE.Mesh
    Icosphere008_0: THREE.Mesh
    TerrainWater: THREE.Mesh
    TerrainWater_1: THREE.Mesh
    GrassObject: THREE.Mesh
    FeuillageObject: THREE.Mesh
    TroncObject: THREE.Mesh
    PlaqueTroncObject: THREE.Mesh
    PlaqueObject: THREE.Mesh
    Cube003: THREE.Mesh
    Cube003_1: THREE.Mesh
  }
  materials: {
    grey: THREE.MeshStandardMaterial
    green: THREE.MeshStandardMaterial
    Dirt: THREE.MeshStandardMaterial
    Water: THREE.MeshStandardMaterial
    ['Grass.001']: THREE.MeshStandardMaterial
    ['brown.001']: THREE.MeshStandardMaterial
    OrangeChest: THREE.MeshStandardMaterial
    pink: THREE.MeshStandardMaterial
    grassPink: THREE.MeshStandardMaterial
    blue: THREE.MeshStandardMaterial
    yellow: THREE.MeshStandardMaterial
    ['grey.001']: THREE.MeshStandardMaterial
    Purple: THREE.MeshStandardMaterial
    red: THREE.MeshStandardMaterial
    orange: THREE.MeshStandardMaterial
    lightYellow: THREE.MeshStandardMaterial
    [' lightBlue']: THREE.MeshStandardMaterial
    turquoise: THREE.MeshStandardMaterial
    lightPurple: THREE.MeshStandardMaterial
    darkPurple: THREE.MeshStandardMaterial
    darkGreen: THREE.MeshStandardMaterial
    lightGreen: THREE.MeshStandardMaterial
    darkGray: THREE.MeshStandardMaterial
    darkRed: THREE.MeshStandardMaterial
    lightPink: THREE.MeshStandardMaterial
    lightBrown: THREE.MeshStandardMaterial
    darkYellow: THREE.MeshStandardMaterial
    gold: THREE.MeshStandardMaterial
    pastelPurple: THREE.MeshStandardMaterial
    GreyChest: THREE.MeshStandardMaterial
  }
}
type Props = {}

type TerrainModelProps = {
  onClickTree: ((event: ThreeEvent<MouseEvent>) => void)
  onClickChest: ((event: ThreeEvent<MouseEvent>) => void)
  onClickSign: ((event: ThreeEvent<MouseEvent>) => void)
  onClickBush: ((event: ThreeEvent<MouseEvent>) => void)
  repository?: Repository
}

export const TerrainModel: React.FC<TerrainModelProps> = ({onClickTree, onClickChest,onClickSign, onClickBush  },props: Props, ) => {
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
        <group position={[3.083, 0, 0]}>
          <mesh //caillou
            castShadow
            receiveShadow
            geometry={nodes.Icosphere006_1.geometry}
            material={materials.grey}
            position={[-3.812, -8.378, -1.908]}
            rotation={[-0.024, 0.243, 0.069]}
          />
        </group>
        <group position={[-8.417, 0, 0]} rotation={[0.397, 0.191, -0.691]}>
          <mesh //Arbustre
            castShadow
            receiveShadow
            geometry={nodes.Icosphere008_0.geometry}
            material={materials.green}
            position={[14.264, 2.132, 3.361]}
            scale={0.783}
            onClick={onClickBush}
          />
        </group>
      </group>
      <group position={[0, -0.16, 0]} scale={[6, 1, 6]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TerrainWater.geometry}
          material={materials.Dirt}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.TerrainWater_1.geometry}
          material={materials.Water}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.GrassObject.geometry}
        material={materials['Grass.001']}
        position={[0, 0.837, 0]}
        scale={[6.648, 0.243, 6.648]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FeuillageObject.geometry}
        material={materials.green}
        position={[0.672, 5.317, -6.388]}
        scale={[2.05, 2.068, 2.05]}
        onClick={onClickTree}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.TroncObject.geometry}
        material={materials['brown.001']}
        position={[-2.635, 2.209, 3.124]}
        scale={[0.262, 1.475, 0.292]}
        onClick={onClickTree}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlaqueTroncObject.geometry}
        material={materials.OrangeChest}
        position={[-4.042, 1.844, -5.161]}
        rotation={[0, 1.166, -Math.PI]}
        scale={[-0.168, -0.768, -0.1]}
        onClick={onClickSign}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PlaqueObject.geometry}
        material={materials.OrangeChest}
        position={[-4.042, 3.064, -5.161]}
        rotation={[0, 1.166, -Math.PI]}
        scale={[-1.053, -0.768, -0.122]}
        onClick={onClickSign}
      />
      <group position={[4.921, 3.063, 3.329]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials.OrangeChest}
          onClick={onClickChest}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials.GreyChest}
          onClick={onClickChest}
        />
      </group>
    </group>
    )
}