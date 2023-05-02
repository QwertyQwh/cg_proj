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
// lowp vec2 project_to_matcap(lowp vec3 coord){
//   lowp vec3 camera_z = uCameraPos;
//   lowp float ac = sqrt(camera_z.x*camera_z.x+camera_z.z*camera_z.z);
//   lowp vec3 camera_y =  vec3(-abs(camera_z.y)*camera_z.x/ac,ac,-abs(camera_z.y)*camera_z.z/ac);
//   lowp vec3 camera_x = vec3(-(camera_z.z)*(camera_z.x/abs(camera_z.x)),camera_z.y,-(camera_z.x)*(camera_z.z/abs(camera_z.z)));
//   return vec2(dot(camera_x,coord),dot(camera_y,coord));
// }

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
    float factor = (vPosition.y-uFogStart)/uFogHeight;
  factor = clamp(factor, 0., 1.);
  gl_FragColor = mix(uBackground, gl_FragColor, factor);
  vec2 shadowCoord = vec2(vPosition.x/100.+0.5,vPosition.z/100.+0.5);
  float shadow = 0. ;
  for (float i = -0.002; i < 0.003; i += 0.001){
    for (float j = -0.002; j < 0.003; j += 0.001){
      shadow+= texture2D(uMatSampler, vec2(shadowCoord.x+i,shadowCoord.y+j)).x;
    }
  }
  shadow = shadow*0.04;
  if(vPosition.y<20.){
    gl_FragColor = mix(gl_FragColor,uLightColorLeft*.7,shadow*.6);
  }
  gl_FragColor = vec4(gl_FragColor.xyz,1.);

}
`;
export default frag 