import React, { useRef, useLayoutEffect } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
// import { noise } from './perlin'

interface Props {
  position: [number, number, number]
  heightOffset: number
}

function Terrain(props: Props) {
  const { position, heightOffset = 0 } = props
  return (
    <mesh position={position}>
      <boxGeometry args={[1, 0.5 + heightOffset, 1]} />
      <meshStandardMaterial
        flatShading
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

export default Terrain
