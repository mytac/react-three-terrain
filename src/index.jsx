import { StrictMode, Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import Controls from './components/Controls'
import { OrbitControls, TransformControls } from 'three-stdlib'
import { AxesHelper } from './helper'
import { Terrain, EllipticalPlatform, Boxes, Title } from './components'
import CanvasInner from './CanvasInner'
import * as CONFIG from './CONFIG'
import './styles.css'

extend({ OrbitControls, TransformControls })

// // Add types to ThreeElements elements so primitives pick up on it
// declare module '@react-three/fiber' {
//   interface ThreeElements {
//     customElement: Object3DNode<CustomElement, typeof CustomElement>
//   }
// }

const { UNIT, POINT_LIGHT_INTENSITY, PONIT_LIGHT_HEIGHT } = CONFIG

const createGridPositionArray = (a, b) => {
  // 初始化一个12x9的空数组
  const grid = []
  // 使用嵌套循环填充坐标值
  for (let x = 0; x < a; x++) {
    for (let y = 0; y < b; y++) {
      // 这里我们将每个坐标值设置为 [x, y]
      grid.push([x * UNIT, y * UNIT])
    }
  }

  return grid
}

const posArr = createGridPositionArray(
  CONFIG.GRID_MATRIX_LENGTH[0],
  CONFIG.GRID_MATRIX_LENGTH[1]
)
// const posArr = createGridPositionArray(1, 1)

function create3DGraph(data, elementId) {
  createRoot(document.getElementById(elementId)).render(
    <StrictMode>
      <Canvas camera={{ position: CONFIG.CAMERA_POSITION }}>
        <AxesHelper />
        <Controls />
        {/* <ambientLight intensity={0.5} /> */}
        <directionalLight
          color="#fff"
          position={[0, PONIT_LIGHT_HEIGHT, 0]}
          intensity={POINT_LIGHT_INTENSITY}
        />
        <CanvasInner data={data} />
      </Canvas>
      {/* <div id="outWrapper">hello</div> */}
    </StrictMode>
  )
}

window.create3DGraph = create3DGraph
