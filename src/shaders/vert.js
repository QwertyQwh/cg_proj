const vert= /*glsl*/ `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;
uniform mat4 uModelViewMatrix;
uniform mat4 uControlMatrix;
uniform mat4 uProjectionMatrix;
varying lowp vec4 vColor;
varying lowp vec3 vPosition;
void main(void) {
  gl_Position = uProjectionMatrix * uControlMatrix *uModelViewMatrix*  aVertexPosition;
  vColor = aVertexColor;
  vPosition = aVertexPosition.xyz;
}
`;
export default vert 