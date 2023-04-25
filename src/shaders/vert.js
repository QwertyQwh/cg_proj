const vert= /*glsl*/ `
attribute vec4 aVertexPosition;
attribute vec4 aVertexNormal;
uniform mat4 uModelViewMatrix;
uniform mat4 uControlMatrix;
uniform mat4 uProjectionMatrix;
varying lowp vec3 vNormal;
varying lowp vec3 vPosition;
void main(void) {
  gl_Position = uProjectionMatrix * uControlMatrix *uModelViewMatrix*  aVertexPosition;
  vPosition = aVertexPosition.xyz;
  vNormal = aVertexNormal.xyz;
}
`;
export default vert 