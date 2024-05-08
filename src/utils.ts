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
