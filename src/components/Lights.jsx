import React, { useState } from 'react'
import { useFrame, useResource, Canvas } from '@react-three/fiber'

export default () => {
  const [pLight1, setLight1] = useState()
  const [pLight2, setLight2] = useState()

  const FakeSphere = () => (
    <mesh>
      {/* <sphereBufferGeometry attach="geometry" args={[0.7, 30, 30]} /> */}
      <meshBasicMaterial attach="material" color={0xfff1ef} />
    </mesh>
  )

  // const [ref, pLight1] = useResource()
  // const [ref2, pLight2] = useResource()

  return (
    <group>
      {/* <FakeSphere /> */}
      <ambientLight ref={pLight2} position={[0, 4, 0]} intensity={0.3} />

      <directionalLight intensity={0.5} position={[0, 0, 0]} color={0xffffff} />

      <pointLight
        ref={setLight1}
        intensity={1}
        position={[-6, 3, -6]}
        color={0xffcc77}>
        {pLight1 && <pointLightHelper args={[pLight1]} />}
      </pointLight>

      <pointLight
        ref={pLight2}
        intensity={1}
        position={[6, 3, 6]}
        color={0xffcc77}>
        {pLight2 && <pointLightHelper args={[pLight2]} />}
      </pointLight>
    </group>
  )
}
