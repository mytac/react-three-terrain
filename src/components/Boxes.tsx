import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { Billboard, Text, TrackballControls, Line } from '@react-three/drei'
import { useFrame, Canvas } from '@react-three/fiber'
// import { noise } from './perlin'
import Title from './Title'
import * as CONFIG from '../CONFIG'

interface Props {
  position: [x: number, y: number, z: number]
  heightOffset: [a: number, b: number, c: number, d: number]
}

const { UNIT, HEIGHT_WEIGHT } = CONFIG
const WIDTH = CONFIG.GRAM_WIDTH

function Boxes(props: Props) {
  if (!CONFIG.SHOW_GRAM) return null

  const {
    position,
    heightOffset = [Math.random(), Math.random(), Math.random()]
  } = props
  const [x, y, z] = position
  const [a, b, c, d = 0] = heightOffset

  const getY = (height: number) => height / 2 + UNIT / 4
  return (
    <group position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh position={[-WIDTH, 0, 0]}>
        <boxGeometry args={[WIDTH, a * HEIGHT_WEIGHT, WIDTH]} />
        <meshStandardMaterial
          flatShading
          color="red"
          metalness={0}
          roughness={0.5}
        />
      </mesh>
      <mesh>
        {/* <mesh position={[x, getY(b), z]}> */}
        <boxGeometry args={[WIDTH, b * HEIGHT_WEIGHT, WIDTH]} />
        <meshStandardMaterial
          flatShading
          color="yellow"
          metalness={0}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[WIDTH, 0, 0]}>
        <boxGeometry args={[WIDTH, c * HEIGHT_WEIGHT, WIDTH]} />
        <meshStandardMaterial
          flatShading
          color="green"
          metalness={0}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[2 * WIDTH, 0, 0]}>
        <boxGeometry args={[WIDTH, d * HEIGHT_WEIGHT, WIDTH]} />
        <meshStandardMaterial
          flatShading
          color="orange"
          metalness={0}
          roughness={0.5}
        />
      </mesh>
    </group>
  )
}

export default Boxes
