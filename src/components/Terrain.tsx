import React, { useRef, useLayoutEffect } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
// import { noise } from './perlin'
import * as CONFIG from '../CONFIG'

interface Props {
  position: [number, number, number]
  heightOffset: number
}

function Terrain(props: Props) {
  const { position, heightOffset = 0 } = props
  return (
    <mesh position={position}>
      <boxGeometry
        args={[
          CONFIG.UNIT,
          0.5 * CONFIG.UNIT + heightOffset * CONFIG.UNIT,
          CONFIG.UNIT
        ]}
      />
      <meshStandardMaterial
        flatShading
        color={'#c0a261'}
        metalness={0}
        roughness={0.5}
        wireframe
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
