const frag = /*glsl*/ `
precision highp float;
varying vec3 vPosition;
varying vec3 vNormal;
uniform vec4 uBackground;
uniform float uFogHeight;
uniform float uFogStart;
uniform sampler2D uMatSampler;
uniform vec3 uCameraPos;
uniform vec3 uLightDirTop;
uniform vec4 uLightColorTop;
uniform lowp vec3 uLightDirLeft;
uniform vec4 uLightColorLeft;
uniform vec3 uLightDirRight;
uniform vec4 uLightColorRight;



void main(void) {
  vec3 normal = normalize(vNormal);
  float leftStr = max(dot(uLightDirLeft,normal),0.);
  //For visual purposes, diminish the light a little if it receives both lights' contributions.
  leftStr *= leftStr;
  float rightStr = max(dot(-uLightDirLeft,normal),0.);
  rightStr *= rightStr;
  float backwardStr = max(dot(-uLightDirRight,normal),0.);
  backwardStr *= backwardStr;
  float forwardStr = max(dot(uLightDirRight,normal),0.);
  forwardStr *= forwardStr;
  gl_FragColor = leftStr*uLightColorLeft + rightStr*uLightColorLeft + backwardStr*uLightColorRight + forwardStr*uLightColorRight + max(dot(-uLightDirTop,normal),0.)*uLightColorTop;
  gl_FragColor = vec4(gl_FragColor.xyz,1.);
  // gl_FragColor = vec4(vNormal.xyz,1.);
  float factor = (vPosition.y-uFogStart)/uFogHeight;
  factor = clamp(factor, 0., 1.);
  // lowp vec2 texCoord = project_to_matcap(vNormal);
  // gl_FragColor = texture2D(uMatSampler, texCoord);
  gl_FragColor = mix(uBackground, gl_FragColor, factor);
}
`;
export default frag 