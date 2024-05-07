import React, { useRef, useLayoutEffect } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
// import { noise } from './perlin'

interface Props {
  position: [number, number, number]
  heightOffset: number
}

function EllipticalPlatform() {
  // function EllipticalPlatform({ centerX, centerY, centerZ, width, depth, height }) {
  // 使用ref来存储geometry（如果需要的话）
  // 但在这个例子中，我们直接在props中传递geometry参数

  const width = 4 // 椭圆的宽度
  const depth = 2 // 椭圆的深度（较窄的部分）
  const height = 1 // 平台的高度
  const centerX = 0 // 平台的x坐标
  const centerY = 0 // 平台的y坐标（高度调节）
  const centerZ = 0 // 平台的z坐标

  return (
    <mesh position={[centerX, centerY, centerZ]}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        // flatShading
        // flatShading
        color={'#c0a261'}
        metalness={0}
        roughness={0.5}
      />
    </mesh>
  )
}

// const Terrain = (props: Props) => {
//   const { position } = props
//   return (
//     <mesh position={position}>
//       <boxGeometry args={[3, 3, 9]} />
//       <meshStandardMaterial color={'#c0a261'} metalness={0} roughness={0.5} />
//     </mesh>
//   )
// }

export default EllipticalPlatform
