import React, { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useFrame, Canvas, extend } from '@react-three/fiber'
import { useTexture, GradientTexture } from '@react-three/drei'
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js'

// import { noise } from './perlin'
import * as CONFIG from '../CONFIG'
extend({ PlaneGeometry: THREE.PlaneGeometry })

const { UNIT, SEGMENT, TEXTURE_IMAGE } = CONFIG
interface Props {
  position: [number, number, number]
  heightOffset: number
}

const [a, b] = CONFIG.GRID_MATRIX_LENGTH

// const disMap = new THREE.TextureLoader().setPath('./assets').load('/image3.png')
// disMap.wrapS = disMap.wrapT = THREE.RepeatWrapping // 重复
// disMap.repeat.set(0, 1)

function Terrain(props: Props) {
  const { position, heightOffset = 0 } = props
  const texture = useTexture(`./assets/${TEXTURE_IMAGE}`)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 1)

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[UNIT, UNIT, SEGMENT, SEGMENT]} />
      {/* <meshPhongMaterial></meshPhongMaterial> */}
      {/* <shaderMaterial
        vertexShader={CONFIG.XSHADER_VERTEXT}
        fragmentShader={CONFIG.XSHADER_FRAGMENT}
      /> */}

      <meshPhysicalMaterial
        // <meshStandardMaterial
        flatShading
        // color={0xffffff}
        // color={'#c0a261'}
        metalness={0}
        roughness={1}
        wireframe={CONFIG.WIREFRAME}
        side={THREE.DoubleSide}
        // map={texture}
        displacementMap={texture}
        // 这个是高度
        displacementScale={Math.random() * 2}>
        <GradientTexture
          stops={[0, 0.8, 1]}
          colors={['#e63946', '#f1faee', '#a8dadc']}
          size={100}
        />
      </meshPhysicalMaterial>
      {/* <meshPhysicalMaterial
        // <meshStandardMaterial
        flatShading
        // color={0xffffff}
        color={'#c0a261'}
        metalness={0}
        roughness={1}
        wireframe={CONFIG.WIREFRAME}
        side={THREE.DoubleSide}
        // map={texture}
        displacementMap={texture}
        // 这个是高度
        displacementScale={Math.random() * 2}
      >
      </meshPhysicalMaterial> */}
    </mesh>
  )
}

// const Terrain = (props: Props) => {
//   const { position } = props
//   return (
//     <mesh position={position}>
//       <boxGeometry args={[3, 3, 9]} />
//       <meshStandardMaterial color={'#c0a261'} metalness={0} roughness={0.5} />
//     </mesh>
//   )
// }

export default Terrain
