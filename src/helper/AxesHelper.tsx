import { useRef, useEffect } from 'react'
import * as THREE from 'three'

function AxesHelperComponent() {
  const helperRef = useRef(null)

  useEffect(() => {
    if (helperRef.current) {
      const axesHelper = new THREE.AxesHelper(100) // 创建一个新的 AxesHelper，长度为5
      helperRef.current.add(axesHelper) // 将其添加到当前的 THREE.Object3D 上
    }
  }, [])

  return (
    <mesh ref={helperRef}>{/* 这里可以是你的其他 3D 对象或场景内容 */}</mesh>
  )
}

export default AxesHelperComponent
