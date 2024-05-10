import React, { useRef, useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useFrame, Canvas, extend } from '@react-three/fiber'
import { useTexture, GradientTexture } from '@react-three/drei'

import * as CONFIG from '../CONFIG'
extend({ PlaneGeometry: THREE.PlaneGeometry })

const { UNIT, SEGMENT, TEXTURE_IMAGE } = CONFIG
interface Props {
  position: [number, number, number]
  heightOffset: number
}

const [a, b] = CONFIG.GRID_MATRIX_LENGTH

function Terrain(props: Props) {
  const { position, heightOffset = 0 } = props
  const texture = useTexture(`./assets/${TEXTURE_IMAGE}`)
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1, 1)

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[UNIT, UNIT, SEGMENT, SEGMENT]} />
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
    </mesh>
  )
}

export default Terrain
