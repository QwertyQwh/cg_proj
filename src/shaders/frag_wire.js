const frag = /*glsl*/ `
// fragment shader
varying lowp vec3 vNormal;
uniform lowp vec3 uCameraPos;
uniform lowp vec4 uBackground;

void main(void) {
  if(dot(uCameraPos,vNormal)>0.){
    gl_FragColor = 1.-uBackground;
  }else{
    gl_FragColor = (1.-uBackground/2.);
  }
  gl_FragColor.w = 1.;

}
`;
export default frag 