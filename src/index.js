import './style.css'
import vert from './shaders/vert'
import frag_matcap from './shaders/frag_matcap'
import frag_wire from './shaders/frag_wire'
import {ResizeCanvas } from './utils'
import { initBuffers } from './geometry'
import { drawScene } from './drawscene'
import { max,min } from 'mathjs'
import {InitPrograms, GenerateProgramInfo} from './programs'
import metal_matcap from './assets/textures/metal_matcap.jpg'
import { loadTexture } from './textureLoder'

const PI = 3.1415926
const accumulated = {theta:0,alpha:PI};
const cursorAnchor = {x:0,y:0};
const diff = {alpha:0,theta:0};
let isDown = false;
const renderModes = ["wire","matcap"]
let curRenderMode = 0
const windowSize = {x:window.innerWidth,y:window.innerHeight}
let parameters = {
  isOrtho: false,
  cameraTheta: 0,
  cameraAlpha:PI,
  cameraRaiuds :3,
  radius: 3,
  floor: 0,
}
const vsSource = {
  wire: vert,
  matcap: vert,
}

const fsSource = {
  wire: frag_wire,
  matcap: frag_matcap
}

function SubsribeToEvents(){
  // Mouse Events
  window.addEventListener('resize', function(event){
    windowSize.x = window.innerWidth
    windowSize.y = window.innerHeight
  });
  window.addEventListener("mouseup",(event)=>{
    isDown = false
    accumulated.alpha += diff.alpha
    accumulated.theta += diff.theta
    accumulated.theta = max(min(accumulated.theta,PI/2),-PI/2)
    diff.alpha = 0
    diff.theta = 0
  })
  window.addEventListener('mousedown',(event)=>{
    event.preventDefault();
    cursorAnchor.x = event.clientX/windowSize.x
    cursorAnchor.y = event.clientY/windowSize.y
    isDown = true;
  })
  window.addEventListener('mousemove',(event)=>{
    event.preventDefault();
    if(isDown){
      diff.alpha = (event.clientX/windowSize.x-cursorAnchor.x)*2
      diff.theta = (event.clientY/windowSize.y-cursorAnchor.y)*2
    }
  })
  window.addEventListener("wheel", event => {
    event.preventDefault()
    const delta = Math.sign(event.deltaY);
    if(parameters.radius+delta >0){
      parameters.radius += delta
    }
  },{passive:false});
}



function main() {
  //HTML stuff
  SubsribeToEvents()
  const canvas = document.querySelector("canvas#gl");
  const renderBtn = document.querySelector("button#renderMode");
  const shaderBtn = document.querySelector("button#shaderMode");
  renderBtn.onclick = (val)=>{
    parameters.isOrtho = !parameters.isOrtho
    renderBtn.textContent = parameters.isOrtho? "Orthographic" : "Perspective"
  }
  shaderBtn.onclick = (val)=>{
    curRenderMode = (++curRenderMode)%renderModes.length
    shaderBtn.textContent = renderModes[curRenderMode];
  }
  renderBtn.textContent = parameters.isOrtho? "Orthographic" : "Perspective"
  shaderBtn.textContent = renderModes[curRenderMode];

  const gl = canvas.getContext("webgl");
  // Support check
  if (gl === null) {
    alert(
      "WebGL not supported."
    );
    return;
  }
  // This is to prevent pixel size mismatch
  ResizeCanvas(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Load textures
  const texture = loadTexture(gl, metal_matcap);
  // Flip image pixels into the bottom-to-top order that WebGL expects.
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

  // Call some utility function to initialize the program
  const programs = InitPrograms(gl,vsSource,fsSource)
  const programInfos = GenerateProgramInfo(gl,programs)
  const buffers = initBuffers(gl);


  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfos.matcap.uniformLocations.uMatSampler, 0);

  let then = 0;
  let deltaTime = 0
  let renderMode;
  function render(now) {
    now *= 0.001; 
    deltaTime = now - then;
    then = now;
    parameters.cameraTheta = max(min(accumulated.theta+diff.theta,PI/2),-PI/2)
    parameters.cameraAlpha = accumulated.alpha+diff.alpha
    renderMode = renderModes[curRenderMode]
    drawScene(gl, programInfos[renderMode], buffers, parameters,renderMode);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


main();