const frag = /*glsl*/ `
// fragment shader
varying lowp vec4 vColor;
void main(void) {
  gl_FragColor = vColor;
}
`;
export default frag 