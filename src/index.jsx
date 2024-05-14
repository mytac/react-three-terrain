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

const { UNIT, POINT_LIGHT_INTENSITY, PONIT_LIGHT_HEIGHT } = CONFIG

function create3DGraph(data, elementId, width = 1000, height = 800) {
  createRoot(document.getElementById(elementId)).render(
    <StrictMode>
      <div style={{ width, height }}>
        <Canvas camera={{ position: CONFIG.CAMERA_POSITION }}>
          {CONFIG.SHOW_AXIS_HELPER && <AxesHelper />}
          {/* <Controls /> */}
          {/* <ambientLight intensity={0.5} /> */}
          <directionalLight
            color="#fff"
            position={[0, PONIT_LIGHT_HEIGHT, 0]}
            intensity={POINT_LIGHT_INTENSITY}
          />
          <CanvasInner data={data} rootElement={elementId} />
        </Canvas>
      </div>
    </StrictMode>
  )
}

window.create3DGraph = create3DGraph
