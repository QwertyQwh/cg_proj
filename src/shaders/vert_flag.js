const vert= /*glsl*/ `
precision highp float;
attribute vec4 aVertexPosition;
attribute vec4 aVertexNormal;
uniform mat4 uTranslationMatrix;
uniform mat4 uRotationMatrix;
uniform mat4 uScaleMatrix;
uniform mat4 uControlMatrix;
uniform mat4 uProjectionMatrix;
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;
void main(void) {
  gl_Position = aVertexPosition;
  float offset = uTime*2.;
  float freq = 1.8;
  float amplify = .2;
  float normAmplify = 2.;
  gl_Position.z = (sin((gl_Position.x+offset)*freq)-sin(offset*freq))*amplify;
  vNormal = vec3(-cos((gl_Position.x+offset)*freq)*amplify * normAmplify,0.,1.);
  vNormal = (uRotationMatrix* vec4(vNormal,1.)).xyz;
  gl_Position = uTranslationMatrix* uRotationMatrix*gl_Position; 
  vPosition = gl_Position.xyz;
  gl_Position = uProjectionMatrix * uControlMatrix * gl_Position;
}
`;
export default vert 