import React, { useRef, useLayoutEffect } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
// import { noise } from './perlin'

interface Props {
  position: [x: number, y: number, z: number]
  heightOffset: [a: number, b: number, c: number]
}

const WIDTH = 0.25

function Boxes(props: Props) {
  const {
    position,
    heightOffset = [Math.random(), Math.random(), Math.random()]
  } = props
  const [x, y, z] = position
  const [a, b, c] = heightOffset
  return (
    <group>
      <mesh position={[x, y, z]}>
        <boxGeometry args={[WIDTH, a, WIDTH]} />
        <meshStandardMaterial
          flatShading
          color="red"
          metalness={0}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[x + WIDTH, y, z]}>
        <boxGeometry args={[WIDTH, b, WIDTH]} />
        <meshStandardMaterial
          flatShading
          color="yellow"
          metalness={0}
          roughness={0.5}
        />
      </mesh>
      <mesh position={[x + WIDTH * 2, y, z]}>
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
