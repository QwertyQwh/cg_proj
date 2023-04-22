const frag = /*glsl*/ `
// fragment shader
varying lowp vec4 vColor;
varying lowp vec3 vPosition;
uniform lowp vec4 uBackground;
uniform lowp float uFogHeight;
uniform lowp float uFogStart;
uniform sampler2D uMatSampler;
uniform lowp vec3 uCameraPos;
void main(void) {
  gl_FragColor = vec4(0.52, 0.65, 0.62, 1.0);
  lowp float factor = (vPosition.y-uFogStart)/uFogHeight;
  lowp vec2 texCoord = vPosition.xy;
  // gl_FragColor = texture2D(uMatSampler, texCoord);
  gl_FragColor = vec4(uCameraPos,1.);
  // factor = clamp(factor, 0., 1.);
  // gl_FragColor = mix(uBackground, gl_FragColor, factor);
}
`;
export default frag 