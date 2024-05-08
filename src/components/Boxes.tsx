import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { Billboard, Text, TrackballControls } from '@react-three/drei'
import { useFrame, Canvas } from '@react-three/fiber'
// import { noise } from './perlin'
import * as CONFIG from '../CONFIG'

interface Props {
  position: [x: number, y: number, z: number]
  heightOffset: [a: number, b: number, c: number]
}

const { UNIT } = CONFIG
const WIDTH = CONFIG.GRAM_WIDTH

function Boxes(props: Props) {
  const {
    position,
    heightOffset = [Math.random(), Math.random(), Math.random()]
  } = props
  const [x, y, z] = position
  const [a, b, c] = heightOffset

  const isEdge = useMemo(() => {
    if (x === 0 || z === 0) return true
    if (
      x === CONFIG.GRID_MATRIX_LENGTH[1] - 1 ||
      z === CONFIG.GRID_MATRIX_LENGTH[0] - 1
    )
      return true
    return false
  }, [x, z])

  const calculateTextPosition = () => {
    //
  }

  const showText = isEdge
  const getY = (height: number) => height / 2 + UNIT / 4

  return (
    <group>
      {showText && (
        <mesh position={[0, 1, 0]}>
          <Billboard position={[x, 1, z]}>
            <Text fontSize={0.2}>hello</Text>
          </Billboard>
        </mesh>
      )}
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
