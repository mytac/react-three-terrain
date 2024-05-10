import * as CONFIG from './CONFIG'

const { OFFSET_UNIT, UNIT, GRID_MATRIX_LENGTH, TEXT_HEIGHT } = CONFIG

/** 边缘检测 */
const isEdge = ([x, y, z]) => {
  if (x === 0 || z === 0) return true
  if (
    x === (GRID_MATRIX_LENGTH[1] - 1) * UNIT ||
    z === (GRID_MATRIX_LENGTH[0] - 1) * UNIT
  )
    return true
  return false
}

type Position = [number, number, number]

/** 计算格子上面的文字偏移 */
export const getGridTextOffset: (p: Position) => Position = (source) => {
  const [a, b] = GRID_MATRIX_LENGTH
  let xoffset = 0,
    zoffset = 0
  const [x, y, z] = source
  if (x - OFFSET_UNIT < 0) {
    // 左边缘
    xoffset -= OFFSET_UNIT
  } else if (x + OFFSET_UNIT > a) {
    xoffset += OFFSET_UNIT
  }

  if (z - OFFSET_UNIT < 0) {
    zoffset -= OFFSET_UNIT
  } else if (z + OFFSET_UNIT > b) {
    zoffset += OFFSET_UNIT
  }

  return [x + xoffset, TEXT_HEIGHT, z + zoffset]
}

/** 获取n个最高点坐标（除去半径为RADIUS的临近点） */
export const filterMaxZWithoutAdjacentPoint = (
  arr: [number, number, number][],
  sum: number
) => {
  const RADIUS = 1
  const result = []
  const sorted = [...arr]
  sorted.sort((a, b) => {
    const [x1, y1, z1] = a
    const [x2, y2, z2] = b
    return z1 - z2
  })

  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i]
    const [x, y, z] = p
    if (result.length > sum) return result
    if (i == 0) {
      result.push(p)
    } else {
      const notValid = result.some(([x2, y2, z2]) => {
        if ((x2 - x) ** 2 + (y2 - y) ** 2 <= RADIUS * 2) {
          return false
        }
        return true
      })
      if (!notValid) {
        result.push(p)
      }
    }
  }

  return result
}
