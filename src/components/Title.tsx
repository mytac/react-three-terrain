import React, { useRef, useLayoutEffect, useMemo } from 'react'
import { Billboard, Text, TrackballControls, Line } from '@react-three/drei'
import { useFrame, Canvas } from '@react-three/fiber'

import * as CONFIG from '../CONFIG'
import { getGridTextOffset } from '../utils'

interface Props {
  text: string
  start: [x: number, y: number, z: number]
  end: [a: number, b: number, c: number]
}

const { FONT_SIZE, LINE_COLOR } = CONFIG

function Title(props: Props) {
  if (!CONFIG.SHOW_TITLE) return null
  const { start, end, text } = props

  const afterOffsetPosition = getGridTextOffset(start)

  return (
    <>
      <Billboard position={afterOffsetPosition}>
        <Text fontSize={FONT_SIZE} color="white">
          {text}
        </Text>
      </Billboard>
      <Line
        points={[start, afterOffsetPosition]}
        color={LINE_COLOR}
        lineWidth={1}
      />
    </>
  )
}

export default Title
