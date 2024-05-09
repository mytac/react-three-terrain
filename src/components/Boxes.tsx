import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { Billboard, Text, TrackballControls, Line } from '@react-three/drei'
import { useFrame, Canvas } from '@react-three/fiber'
// import { noise } from './perlin'
import Title from './Title'
import * as CONFIG from '../CONFIG'

interface Props {
  position: [x: number, y: number, z: number]
  heightOffset: [a: number, b: number, c: number]
}

const { UNIT } = CONFIG
const WIDTH = CONFIG.GRAM_WIDTH

function Boxes(props: Props) {
  if (!CONFIG.SHOW_GRAM) return null

  const {
    position,
    heightOffset = [Math.random(), Math.random(), Math.random()]
  } = props
  const [x, y, z] = position
  const [a, b, c] = heightOffset

  const getY = (height: number) => height / 2 + UNIT / 4
  return (
    <group>
      <mesh position={[x - WIDTH, getY(a), z]}>
        <boxGeometry args={[WIDTH, a, WIDTH]} />
        <meshStandardMaterial
          flatShading
          color="red"
          metalness={0}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[x, getY(b), z]}>
        <boxGeometry args={[WIDTH, b, WIDTH]} />
        <meshStandardMaterial
          flatShading
          color="yellow"
          metalness={0}
          roughness={0.5}
        />
      </mesh>

      <mesh position={[x + WIDTH, getY(c), z]}>
        <boxGeometry args={[WIDTH, c, WIDTH]} />
        <meshStandardMaterial
          flatShading
          color="green"
          metalness={0}
          roughness={0.5}
        />
      </mesh>
    </group>
  )
}

export default Boxes
