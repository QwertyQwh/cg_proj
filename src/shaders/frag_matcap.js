const frag = /*glsl*/ `
varying lowp vec3 vPosition;
varying lowp vec3 vNormal;
uniform lowp vec4 uBackground;
uniform lowp float uFogHeight;
uniform lowp float uFogStart;
uniform sampler2D uMatSampler;
uniform lowp vec3 uCameraPos;
uniform lowp vec3 uLightDirTop;
uniform lowp vec4 uLightColorTop;
uniform lowp vec3 uLightDirLeft;
uniform lowp vec4 uLightColorLeft;
uniform lowp vec3 uLightDirRight;
uniform lowp vec4 uLightColorRight;

lowp vec2 project_to_matcap(lowp vec3 coord){
  lowp vec3 camera_z = uCameraPos;
  lowp float ac = sqrt(camera_z.x*camera_z.x+camera_z.z*camera_z.z);
  lowp vec3 camera_y =  vec3(-abs(camera_z.y)*camera_z.x/ac,ac,-abs(camera_z.y)*camera_z.z/ac);
  lowp vec3 camera_x = vec3(-(camera_z.z)*(camera_z.x/abs(camera_z.x)),camera_z.y,-(camera_z.x)*(camera_z.z/abs(camera_z.z)));
  return vec2(dot(camera_x,coord),dot(camera_y,coord));
}

void main(void) {
  gl_FragColor = (max(dot(-uLightDirLeft,vNormal),0.)*uLightColorLeft+max(dot(-uLightDirRight,vNormal),0.)*uLightColorRight)*1.4 + max(dot(-uLightDirTop,vNormal),0.)*uLightColorTop;
  gl_FragColor = vec4(gl_FragColor.xyz,1.);
  // gl_FragColor = vec4(vNormal.xyz,1.);
  lowp float factor = (vPosition.y-uFogStart)/uFogHeight;
  factor = clamp(factor, 0., 1.);
  // lowp vec2 texCoord = project_to_matcap(vNormal);
  // gl_FragColor = texture2D(uMatSampler, texCoord);
  gl_FragColor = mix(uBackground, gl_FragColor, factor);
}
`;
export default frag 