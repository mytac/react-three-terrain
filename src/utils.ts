import * as THREE from 'three'
import * as CONFIG from './CONFIG'

const {
  OFFSET_UNIT,
  UNIT,
  GRID_MATRIX_LENGTH,
  TEXT_HEIGHT,
  ADJACENT_RADIUS,
  SHOW_TEXT_PERCENT
} = CONFIG

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

  console.log('result', result)

  return result
}

/**  处理输入 */
export const handleData = (data) => {
  const newData = data.map(({ ipc, ipcTitle, groups }) => {
    const total = groups.reduce((prev, cur, i) => {
      return prev + cur.value
    }, 0)
    return {
      title: ipcTitle,
      total,
      groups: groups.map((a) => a.value)
    }
  })

  newData.sort((a, b) => a.total - b.total)
  // const result = newData.slice(
  //   0,
  //   Math.floor(newData.length * SHOW_TEXT_PERCENT)
  // )
  return newData
}

export const wrapText = (text, maxCharsPerLine = 10) => {
  if (text.length <= maxCharsPerLine) {
    // 如果字符串长度小于或等于每行的最大字数，则无需折行
    return text
  }

  let wrappedText = ''
  let startIndex = 0

  // 循环遍历字符串，每次处理最大字数长度的子串
  while (startIndex < text.length) {
    // 计算当前行的结束位置，确保不超过原字符串长度
    let endIndex = startIndex + maxCharsPerLine
    if (endIndex > text.length) {
      endIndex = text.length
    }

    // 截取子串并添加到折行文本中
    wrappedText += text.substring(startIndex, endIndex) + '\n'

    // 更新下一行的起始位置
    startIndex = endIndex
  }

  // 移除末尾的换行符（如果有的话）
  if (wrappedText.endsWith('\n')) {
    wrappedText = wrappedText.slice(0, -1)
  }

  return wrappedText
}

export const fetchData = async (config) => {
  const { url, params, token } = config
  const response = await fetch(url, {
    method: 'post',
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
      body: JSON.stringify(params),
      mode: 'no-cors'
    }
  })
  return response.json()
}

/** 将3D位置转换为2D屏幕坐标的函数   */
export const worldToScreen = (position, camera, size) => {
  // position 是你想要转换的3D物体位置（世界空间）
  // 将世界空间位置转换为相机空间位置
  const positionCameraSpace = position
    .clone()
    .applyMatrix4(camera.matrixWorldInverse)

  positionCameraSpace.project(camera)

  // 将NDC转换为屏幕坐标（像素）
  positionCameraSpace.x = ((positionCameraSpace.x + 1) * size.width) / 2
  positionCameraSpace.y = (-(positionCameraSpace.y - 1) * size.height) / 2

  return positionCameraSpace
}

/** 在某个坐标位置创建div */
export const createTextOnPosition = (
  text: string,
  x: number,
  y: number,
  rootElement = 'root'
) => {
  // 创建一个新的div元素
  const div = document.createElement('div')
  div.className = 'titleWrapper'
  div.title = text
  // 设置div的文本内容
  div.textContent = text

  // 设置div的样式为绝对定位
  div.style.position = 'absolute'

  // 通过形参设置div的top和left样式
  div.style.top = y - 20 + 'px' // 假设传入的top是数值，如果不是，则需要相应的处理
  div.style.left = x - 50 + 'px' // 同样，假设传入的left是数值

  // 将div添加到body的末尾（或者你可以根据需要添加到其他元素中）
  const outWrapper = document.getElementById(rootElement)
  if (outWrapper) {
    outWrapper?.appendChild(div)
  }
}
