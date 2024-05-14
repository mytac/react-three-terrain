import React, {
  useRef,
  useLayoutEffect,
  useMemo,
  useEffect,
  useState
} from 'react'
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { GradientType } from '@react-three/drei'
import Controls from './components/Controls'
import { OrbitControls, TransformControls } from 'three-stdlib'
import { AxesHelper } from './helper'
import { SimplexNoise } from 'three/addons/math/SimplexNoise.js'
import { filterMaxZWithoutAdjacentPoint, handleData, fetchData } from './utils'

import {
  useTexture,
  GradientTexture,
  MeshDistortMaterial
} from '@react-three/drei'
import { Terrain, Boxes, Title } from './components'
import * as CONFIG from './CONFIG'
import './styles.css'

extend({ OrbitControls, TransformControls })

interface Props {
  data: Array<any>
}

const WIDTH = CONFIG.GRAM_WIDTH

const {
  UNIT,
  POINT_LIGHT_INTENSITY,
  PONIT_LIGHT_HEIGHT,
  GRID_MATRIX_LENGTH,
  SEGMENT,
  SHOW_TEXT_PERCENT
} = CONFIG

const [A, B] = GRID_MATRIX_LENGTH
// const mockData = new Array(Math.floor(A * B * SHOW_TEXT_PERCENT))

function CanvasInner(props: Props) {
  const ref = useRef(null)
  const [posArr, setPos] = useState([])
  const [info, setInfo] = useState([])

  useEffect(() => {
    const plane = ref.current
    if (plane && props.data) {
      const pos = plane.attributes.position
      const nor = plane.attributes.normal
      const uv = plane.attributes.uv

      var simplex = new SimplexNoise()

      // updat all vertices - Z coordinate and texture coordinate
      for (var i = 0; i < pos.count; i++) {
        // for (var i = 0; i < pos.count; i++) {
        // vertex coordinates
        const x = pos.getX(i)
        const y = pos.getY(i)
        const oldZ = pos.getZ(i)

        // calculate elevation
        let z =
          0.4 * simplex.noise(0.2 * x, 0.2 * y) +
          0.2 * simplex.noise(0.5 * x, 0.5 * y) +
          0.1 * simplex.noise(1.5 * x, 1.5 * y)

        // make mountains more spiky, undwewater more smooth
        if (z > 0) z = 4 * z ** 1 // 值越小越高
        else z = -(Math.abs(z) ** 1)

        // add tiny shallow water effect
        // z = z + 0.003 * simplex.noise(50 * x, 50 * y)

        // shape vertical borders
        // if (Math.abs(x) == 3 || Math.abs(y) == 2) z = -0.5
        // else if (
        //   Math.abs(x) >= 3 * (1 - 2 / SEGMENT) ||
        //   Math.abs(y) >= 2 * (1 - 2 / SEGMENT)
        // )
        //   z = 0

        pos.setZ(i, z)
        uv.setXY(i, 0, THREE.MathUtils.mapLinear(z, -0.5, 1, 1, 0))
      } // for i

      // make sides black
      // plane.computeVertexNormals()
      // for (var i = 0; i < nor.count; i++) {
      //   var x = pos.getX(i),
      //     y = pos.getY(i)
      //   if (
      //     Math.abs(x) >= 3 * (1 - 2 / SEGMENT) ||
      //     Math.abs(y) >= 2 * (1 - 2 / SEGMENT)
      //   )
      //     nor.setXYZ(i, 0, 0, 0)
      // }

      // register all updates

      const maxPos = filterMaxZWithoutAdjacentPoint(
        plane.attributes.position,
        props.data.length
      )
      console.log('maxPos', maxPos)
      setPos(maxPos)
      setInfo(handleData(props.data))

      // pos.needsUpdate = true
      // nor.needsUpdate = true
      // uv.needsUpdate = true
    }
  }, [])

  useEffect(() => {
    document.addEventListener('touchstart', preventBehavior, { passive: false })
    document.addEventListener('touchmove', preventBehavior, { passive: false })
    document.addEventListener('wheel', preventBehavior, { passive: false })

    function preventBehavior(e) {
      e.preventDefault()
    }
  }, [])

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry
          ref={ref}
          args={[
            GRID_MATRIX_LENGTH[0] * UNIT,
            GRID_MATRIX_LENGTH[1] * UNIT,
            SEGMENT,
            SEGMENT
          ]}
        />
        <meshPhysicalMaterial
          roughness={1}
          metalness={0}
          wireframe={CONFIG.WIREFRAME}
          side={THREE.DoubleSide}>
          <GradientTexture
            stops={CONFIG.GRADIENT_STOP}
            colors={CONFIG.GRADIENT_COLOR}
            // size={100}
          />
        </meshPhysicalMaterial>

        {posArr.map(([x, y, z], i) => {
          const boxPosition = [x, 1, z]
          const terrainPosition = [x, 0, z]
          const showText = i < Math.floor(posArr.length * SHOW_TEXT_PERCENT)
          return (
            <group key={i}>
              <Boxes position={[x, y, z]} heightOffset={info[i].group} />
              {/* <Terrain position={terrainPosition} /> */}
              {showText && (
                <Title
                  start={[x, y, z]}
                  end={boxPosition}
                  text={info[i].title}
                />
              )}
              {/* <Title text="hello" start={terrainPosition} end={boxPosition} /> */}
            </group>
          )
        })}
      </mesh>
    </>
  )
}

export default CanvasInner
