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
uniform float bound;


void main(void) {
  vec2 shadowCoord = vec2(vPosition.x/100.+0.5,vPosition.z/100.+0.5);
  float shadow = 0. ;
  for (float i = -0.002; i < 0.003; i += 0.001){
    for (float j = -0.002; j < 0.003; j += 0.001){
      shadow+= texture2D(uMatSampler, vec2(shadowCoord.x+i,shadowCoord.y+j)).x;
    }
  }
  shadow = shadow*0.04;
  float maskFactor = exp(-(uFogHeight-2.0));
    gl_FragColor = mix(uBackground,uLightColorLeft,shadow*.6*maskFactor);
  gl_FragColor = vec4(gl_FragColor.xyz,1.);
}
`;
export default frag 