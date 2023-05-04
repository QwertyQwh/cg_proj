const vert= /*glsl*/ `
precision highp float;
attribute vec4 aVertexPosition;
attribute vec4 aVertexNormal;
uniform mat4 uTranslationMatrix;
uniform mat4 uRotationMatrix;
uniform mat4 uControlMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uScaleMatrix;
varying vec3 vNormal;
uniform float uTime;
varying vec3 vPosition;
void main(void) {
  gl_Position = uTranslationMatrix * uScaleMatrix* aVertexPosition;
  vPosition = gl_Position.xyz;
  gl_Position = uProjectionMatrix * uControlMatrix * gl_Position;
  vNormal = aVertexNormal.xyz;
}
`;
export default vert 