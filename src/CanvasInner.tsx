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
import { filterMaxZWithoutAdjacentPoint } from './utils'

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
  position: [x: number, y: number, z: number]
  heightOffset: [a: number, b: number, c: number]
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

// const createGridPositionArray = (a, b) => {
//   // 初始化一个12x9的空数组
//   const grid = []
//   // 使用嵌套循环填充坐标值
//   for (let x = 0; x < a; x++) {
//     for (let y = 0; y < b; y++) {
//       // 这里我们将每个坐标值设置为 [x, y]
//       grid.push([x * UNIT, y * UNIT])
//     }
//   }

//   return grid
// }

// const posArr = createGridPositionArray(
//   CONFIG.GRID_MATRIX_LENGTH[0],
//   CONFIG.GRID_MATRIX_LENGTH[1]
// )
const [A, B] = GRID_MATRIX_LENGTH
const mockData = new Array(Math.floor(A * B * SHOW_TEXT_PERCENT))

function CanvasInner(props: Props) {
  const ref = useRef(null)
  const [posArr, setPos] = useState([])

  useEffect(() => {
    const plane = ref.current
    if (plane) {
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
        mockData.length
      )
      setPos(maxPos)
      pos.needsUpdate = true
      nor.needsUpdate = true
      uv.needsUpdate = true
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
          return (
            <group key={i}>
              <Boxes position={[x, y, z]} />
              {/* <Terrain position={terrainPosition} /> */}
              <Title text="hello" start={[x, y, z]} end={boxPosition} />
              {/* <Title text="hello" start={terrainPosition} end={boxPosition} /> */}
            </group>
          )
        })}
      </mesh>

      {/* <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial>
          <GradientTexture
            stops={[0, 0.8, 1]}
            colors={['#e63946', '#f1faee', '#a8dadc']}
            size={100}
          />
        </meshPhysicalMaterial>
      </mesh> */}

      {/* <GradientTexture
        stops={[0, 0.8, 1]}
        colors={['#e63946', '#f1faee', '#a8dadc']}
        size={100}
      /> */}
    </>
  )
}

export default CanvasInner
