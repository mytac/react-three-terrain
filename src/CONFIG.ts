/*----------------地块----------------- */
/** 单位大小*/
export const UNIT = 2
/** 地块矩阵维度*/
export const GRID_MATRIX_LENGTH = [3, 3] // x,y
/** 打开wireframe */
// export const WIREFRAME = true
export const WIREFRAME = false

export const SEGMENT = 128
// export const TEXTURE_IMAGE = 'round1.png'
export const TEXTURE_IMAGE = 'image5.jpg'

export const GRADIENT_STOP = [0.1, 0.33, 0.345, 0.35, 0.351, 0.7, 0.8, 0.9]
// export const GRADIENT_STOP = [0.2, 0.25, 0.3, 0.649, 0.65, 0.655, 0.67, 0.8]
// export const GRADIENT_COLOR = [
//   'white',
//   'darkseagreen',
//   'seagreen',
//   'forestgreen',
//   'yellow',
//   'royalblue',
//   'blue',
//   'black'
// ]
export const GRADIENT_COLOR = [
  'black',
  'blue',
  'royalblue',
  'yellow',
  'forestgreen',
  'seagreen',
  'darkseagreen',
  'white'
]

/* --------------直方图--------------------- */
/** 直方图宽度*/
export const GRAM_WIDTH = 0.15
export const SHOW_GRAM = true

/* --------------文字--------------------- */
/** 是否显示文字 */
export const SHOW_TITLE = true
/** 文字高度  */
export const TEXT_HEIGHT = 2
/** 文字大小  */
export const FONT_SIZE = 0.4

/* --------------连线--------------------- */
/** 连线颜色 */
export const LINE_COLOR = 'grey'
/** 偏移单位 */
export const OFFSET_UNIT = 1

/*---------------镜头---------------------*/
/** 镜头定位 */
export const CAMERA_POSITION = [8, 15, 8]

/* --------------灯光--------------------- */
export const POINT_LIGHT_INTENSITY = 250
export const PONIT_LIGHT_HEIGHT = 10

/** shader */
export const XSHADER_VERTEXT = `
uniform sampler2D heightMap;
			uniform float heightRatio;
			varying vec2 vUv;
			varying float hValue;
			varying vec3 cl;
			void main() {
			    vUv = uv;
			    vec3 pos = position;
		        cl = texture2D(heightMap, vUv).rgb;
		        hValue = texture2D(heightMap, vUv).r;
		        pos.y = hValue * heightRatio;
		        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
		    }`

export const XSHADER_FRAGMENT = `
varying float hValue;
			varying vec3 cl;
			void main() {
		 		float v = abs(hValue - 1.);
		 		gl_FragColor = vec4(cl, .8 - v * v) ; 
		    }
`
