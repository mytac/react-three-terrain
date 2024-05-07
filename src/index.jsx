import { StrictMode, Suspense, useRef, useEffect } from 'react'
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, extend } from '@react-three/fiber'
import Controls from './components/Controls'
import './styles.css'
import { AxesHelper } from './helper'
import { OrbitControls, TransformControls } from 'three-stdlib'

extend({ OrbitControls, TransformControls })

function Terrain() {
  const planeRef = useRef()

  useFrame(() => {
    // 如果需要基于帧的动画或更新，可以在这里添加代码
  })

  return (
    <mesh ref={planeRef}>
      {/* <planeGeomery args={[900, 1200]} /> */}
      {/* <primitive object={new THREE.BoxGeometry(1, 1, 1)} /> */}
      <sphereGeometry args={[1, 32]} />

      <meshStandardMaterial
        color={[192, 162, 97]} // 土黄色，你可以使用十六进制、RGB或其他颜色格式
        // color={rgb(192, 162, 97)} // 土黄色，你可以使用十六进制、RGB或其他颜色格式
        // color={new Color('rgb(192, 162, 97)')} // 土黄色，你可以使用十六进制、RGB或其他颜色格式
        metalness={0} // 非金属材质
        roughness={0.5} // 粗糙度，控制反光程度
      />
      {/* 如果你想让地形有高度，你可能需要自定义一个更复杂的几何体或使用ShaderMaterial */}
      {/* 但对于简单的矩形地形，通常高度是通过相机的位置和缩放来感知的 */}
    </mesh>
  )
}

// // Add types to ThreeElements elements so primitives pick up on it
// declare module '@react-three/fiber' {
//   interface ThreeElements {
//     customElement: Object3DNode<CustomElement, typeof CustomElement>
//   }
// }

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Canvas camera={{ position: [15, 10, 0] }}>
      <AxesHelper />
      <Controls />
      <ambientLight intensity={1} />
      <pointLight position={[0, 30, 0]} />
      {/* <mesh position={[0, 1, 1]}>
        <boxGeometry args={[3, 3, 9]} />
        <meshStandardMaterial color="hotpink" metalness={0.5} roughness={0.5} />
      </mesh> */}
      <mesh position={[-10, 1, 1]}>
        <boxGeometry args={[3, 3, 9]} />
        <meshStandardMaterial color={'#c0a261'} metalness={0} roughness={0.5} />
      </mesh>
    </Canvas>
  </StrictMode>
)
