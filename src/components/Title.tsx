import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { Billboard, Text, TrackballControls, Line } from '@react-three/drei'
import { useFrame, Canvas } from '@react-three/fiber'
// import { noise } from './perlin'
import * as CONFIG from '../CONFIG'
import { getGridTextOffset } from '../utils'

interface Props {
  text: string
  start: [x: number, y: number, z: number]
  end: [a: number, b: number, c: number]
}

const { FONT_SIZE, LINE_COLOR } = CONFIG
const WIDTH = CONFIG.GRAM_WIDTH

function Title(props: Props) {
  if (!CONFIG.SHOW_TITLE) return null
  const { start, end, text } = props
  const [x, y, z] = start
  const [a, b, c] = end

  const afterOffsetPosition = getGridTextOffset(start)

  return (
    <group>
      <mesh position={[0, 1, 0]}>
        <Billboard position={afterOffsetPosition}>
          <Text fontSize={FONT_SIZE}>{text}</Text>
        </Billboard>
        <Line
          points={[start, afterOffsetPosition]}
          color={LINE_COLOR}
          lineWidth={1}
        />
      </mesh>
    </group>
  )
}

export default Title
