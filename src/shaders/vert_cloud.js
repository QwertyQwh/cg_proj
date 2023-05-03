const vert= /*glsl*/ `
precision highp float;
attribute vec4 aVertexPosition;
attribute vec4 aVertexNormal;
uniform mat4 uTranslationMatrix;
uniform mat4 uRotationMatrix;
uniform mat4 uControlMatrix;
uniform mat4 uProjectionMatrix;
varying vec3 vNormal;
uniform float uTime;
varying vec3 vPosition;
void main(void) {
  gl_Position = aVertexPosition;
  gl_Position = uProjectionMatrix * uControlMatrix * uTranslationMatrix* gl_Position;
  vPosition = aVertexPosition.xyz;
  vNormal = aVertexNormal.xyz;
}
`;
export default vert 