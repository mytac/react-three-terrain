import { StrictMode, Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import Controls from './components/Controls'
import './styles.css'
import { AxesHelper } from './helper'
import { Terrain, EllipticalPlatform, Boxes } from './components'
import { OrbitControls, TransformControls } from 'three-stdlib'

extend({ OrbitControls, TransformControls })

// // Add types to ThreeElements elements so primitives pick up on it
// declare module '@react-three/fiber' {
//   interface ThreeElements {
//     customElement: Object3DNode<CustomElement, typeof CustomElement>
//   }
// }

const createGridPositionArray = (a, b) => {
  // 初始化一个12x9的空数组
  const grid = []
  // 使用嵌套循环填充坐标值
  for (let x = 0; x < a; x++) {
    for (let y = 0; y < b; y++) {
      // 这里我们将每个坐标值设置为 [x, y]
      grid.push([x, y])
    }
  }

  return grid
}

const posArr = createGridPositionArray(12, 9)
// const posArr = createGridPositionArray(1, 1)
console.log('posArr', posArr)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas camera={{ position: [15, 10, 15] }}>
      <AxesHelper />
      <Controls />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={100} />
      {posArr.map(([x, z], i) => (
        <Boxes position={[x, 1, z]} key={i} />
      ))}
      {posArr.map(([x, z], i) => (
        <Terrain position={[x, 0, z]} key={i} />
      ))}
    </Canvas>
  </StrictMode>
)
