import * as CONFIG from './CONFIG'

const { OFFSET_UNIT, UNIT, GRID_MATRIX_LENGTH, TEXT_HEIGHT, ADJACENT_RADIUS } =
  CONFIG

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
    yoffset = 0
  const [x, y, z] = source
  if (x - OFFSET_UNIT < 0) {
    // 左边缘
    xoffset -= OFFSET_UNIT
  } else if (x + OFFSET_UNIT > a) {
    xoffset += OFFSET_UNIT
  }

  if (y - OFFSET_UNIT < 0) {
    yoffset -= OFFSET_UNIT
  } else if (y + OFFSET_UNIT > b) {
    yoffset += OFFSET_UNIT
  }

  return [x + xoffset, y + yoffset, TEXT_HEIGHT]
}

/** 获取n个最高点坐标（除去半径为RADIUS的临近点） */
export const filterMaxZWithoutAdjacentPoint = (position, sum: number) => {
  const result = []
  const count = position.count
  const posArray = []
  for (let i = 0; i < count; i++) {
    posArray.push([position.getX(i), position.getY(i), position.getZ(i)])
  }
  const sorted = [...posArray]
  sorted.sort((a, b) => {
    const [x1, y1, z1] = a
    const [x2, y2, z2] = b
    return z2 - z1
  })
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i]
    const [x, y, z] = p
    if (result.length >= sum) return result
    if (i == 0) {
      result.push(p)
    } else {
      const notValid = result.some(([x2, y2, z2]) => {
        if ((x2 - x) ** 2 + (y2 - y) ** 2 <= ADJACENT_RADIUS) {
          return true
        }
        return false
      })
      if (!notValid) {
        result.push(p)
      }
    }
  }

  return result
}
