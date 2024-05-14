import React, { useRef, useEffect, useLayoutEffect, useMemo } from 'react'
import {
  Billboard,
  Text,
  TrackballControls,
  Line,
  useContextBridge
} from '@react-three/drei'
import { useFrame, Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import * as CONFIG from '../CONFIG'
import {
  getGridTextOffset,
  wrapText,
  worldToScreen,
  createTextOnPosition
} from '../utils'

interface Props {
  text: string
  start: [x: number, y: number, z: number]
  end: [a: number, b: number, c: number]
}

const { FONT_SIZE, LINE_COLOR } = CONFIG

function Title(props: Props) {
  if (!CONFIG.SHOW_TITLE) return null
  const { start, end, text } = props
  const textRef = useRef(null)
  const afterOffsetPosition = getGridTextOffset(start)
  const { viewport, camera, gl } = useThree()

  useEffect(() => {
    if (textRef.current && camera) {
      const { current } = textRef

      // 获取 mesh 的 3D 坐标
      const position = new THREE.Vector3()
      const pos = current.getWorldPosition(position)
      console.log('pos', pos, 'position', position)

      // 将 3D 坐标转换为 2D 坐标
      const vector = new THREE.Vector3(position.x, position.y, position.z)
      vector.project(camera)

      const x = ((vector.x + 1) * gl.domElement.clientWidth) / 2
      const y = (-(vector.y - 1) * gl.domElement.clientHeight) / 2
      console.log(x, y)
      createTextOnPosition(text, x, y)
    }
  }, [textRef, camera, viewport])

  return (
    <>
      <Billboard position={afterOffsetPosition} ref={textRef}>
        {/* <Text
          font=""
          ref={textRef}
          fontSize={FONT_SIZE}
          color="white"
          anchorX="center"
          anchorY="middle">
          {wrapText(text)}
        </Text> */}
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
