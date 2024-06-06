import * as THREE from 'three'
import React from 'react'
import { useGLTF } from '@react-three/drei/native'
import { GLTF } from 'three-stdlib'
import { ThreeEvent } from '@react-three/fiber/native';
import { Repository } from '../../model/Repository';

type GLTFResult = GLTF & {
  nodes: {
    Icosphere006_1: THREE.Mesh
    TerrainObject: THREE.Mesh
    GrassObject: THREE.Mesh
    TroncObject: THREE.Mesh
    TroncBruleObject: THREE.Mesh
    PlaqueTroncObject: THREE.Mesh
    PlaqueObject: THREE.Mesh
    SpeechArbre: THREE.Mesh
    CommitsText: THREE.Mesh
    SpeechPlaque: THREE.Mesh
    DashboardText: THREE.Mesh
    SpeechChest: THREE.Mesh
    FilesText: THREE.Mesh
    SpeechArbustre: THREE.Mesh
    IssuesText: THREE.Mesh
    SpeechRock: THREE.Mesh
    ManagementText: THREE.Mesh
    Cube003: THREE.Mesh
    Cube003_1: THREE.Mesh
  }
  materials: {
    grey: THREE.MeshStandardMaterial
    Dirt: THREE.MeshStandardMaterial
    Grass: THREE.MeshStandardMaterial
    brown: THREE.MeshStandardMaterial
    BrownBrule: THREE.MeshStandardMaterial
    Black: THREE.MeshStandardMaterial
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
  onClickRock: ((event: ThreeEvent<MouseEvent>) => void)
  repository?: Repository
}

export const TerrainModel3: React.FC<TerrainModelProps> = ({onClickTree, onClickChest,onClickSign, onClickBush, onClickRock  },props: Props, ) => {
    const { nodes, materials } = useGLTF(require('../../assets/3d/terrain3.glb')) as GLTFResult

  return (
    <group {...props} dispose={null} scale={0.3}>
      <group position={[-2.235, 2.811, -12.068]} rotation={[-Math.PI / 2, 0, 0]}>
        <group position={[3.083, 0, 0]}>
          <mesh //CAILLIOU
            castShadow
            receiveShadow
            geometry={nodes.Icosphere006_1.geometry}
            material={materials.grey}
            position={[-0.796, -11.511, -3.051]}
            rotation={[-0.024, 0.243, 0.069]}
            scale={1.22}
            onClick={onClickRock}
          />
        </group>
      </group>
      <mesh //TERRAIN
        castShadow
        receiveShadow
        geometry={nodes.TerrainObject.geometry}
        material={materials.Dirt}
        position={[0, -0.16, 0]}
        scale={[6, 1, 6]}
      />
      <mesh //GRASS
        castShadow
        receiveShadow
        geometry={nodes.GrassObject.geometry}
        material={materials.Grass}
        position={[0, 0.837, 0]}
        scale={[6.648, 0.243, 6.5]}
      />
      <mesh //ARBRE TRONC
        castShadow
        receiveShadow
        geometry={nodes.TroncObject.geometry}
        material={materials.brown}
        position={[-2.635, 2.209, 3.124]}
        scale={[0.262, 1.475, 0.292]}
        onClick={onClickTree}
      />
      <mesh //ARBUSTRE
        castShadow
        receiveShadow
        geometry={nodes.TroncBruleObject.geometry}
        material={materials.BrownBrule}
        position={[4.793, 1.581, -4.098]}
        rotation={[-1.368, 0.619, -0.123]}
        scale={[0.262, 1.475, 0.292]}
        onClick={onClickBush}
      />
      <mesh //PLAQUE TRONC
        castShadow
        receiveShadow
        geometry={nodes.PlaqueTroncObject.geometry}
        material={materials.BrownBrule}
        position={[-4.042, 1.844, -5.161]}
        rotation={[0, 1.166, -Math.PI]}
        scale={[-0.168, -0.768, -0.1]}
        onClick={onClickSign}
      />
      <mesh //PLAQUE
        castShadow
        receiveShadow
        geometry={nodes.PlaqueObject.geometry}
        material={materials.BrownBrule}
        position={[-4.042, 3.064, -5.161]}
        rotation={[0, 1.166, -Math.PI]}
        scale={[-1.053, -0.768, -0.122]}
        onClick={onClickSign}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SpeechArbre.geometry}
        material={nodes.SpeechArbre.material}
        position={[-4.934, 7.352, 0.654]}
        rotation={[0, 0.632, 0]}
        scale={[0.084, 0.74, 1.421]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.CommitsText.geometry}
        material={materials.Black}
        position={[-1.956, 6.76, 3.716]}
        rotation={[1.552, -0.027, -2.188]}
        scale={0.518}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SpeechPlaque.geometry}
        material={nodes.SpeechPlaque.material}
        position={[-3.143, 6.036, -9.122]}
        rotation={[0, -0.418, 0]}
        scale={[0.084, 0.74, 1.421]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DashboardText.geometry}
        material={materials.Black}
        position={[-4.318, 5.444, -4.974]}
        rotation={[1.585, -0.03, -1.137]}
        scale={0.445}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SpeechChest.geometry}
        material={nodes.SpeechChest.material}
        position={[4.378, 5.66, 6.75]}
        rotation={[Math.PI, -0.601, Math.PI]}
        scale={[0.077, 0.68, 1.306]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.FilesText.geometry}
        material={materials.Black}
        position={[2.607, 4.982, 4.893]}
        rotation={[1.552, -0.027, -2.182]}
        scale={0.554}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SpeechArbustre.geometry}
        material={nodes.SpeechArbustre.material}
        position={[6.192, 4.096, -8.33]}
        rotation={[0, -0.591, 0]}
        scale={[0.084, 0.74, 1.421]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.IssuesText.geometry}
        material={materials.Black}
        position={[4.634, 3.444, -4.855]}
        rotation={[1.589, -0.027, -0.964]}
        scale={0.445}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.SpeechRock.geometry}
        material={nodes.SpeechRock.material}
        position={[-0.508, 3.06, -3.531]}
        rotation={[0, 0.023, 0]}
        scale={[0.084, 0.74, 1.421]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ManagementText.geometry}
        material={materials.Black}
        position={[0.201, 2.468, 0.721]}
        rotation={[1.571, -0.033, -1.579]}
        scale={0.396}
      />
      <group position={[4.921, 3.063, 3.329]}>
        <mesh //CHEST
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials.BrownBrule}
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

useGLTF.preload('/terrain3.glb')