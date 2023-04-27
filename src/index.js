import './style.css'
import vert from './shaders/vert'
import frag_matcap from './shaders/frag_matcap'
import frag_wire from './shaders/frag_wire'
import {Interpolate, ResizeCanvas } from './utils'
import { initBuffers } from './geometry'
import { drawScene } from './drawscene'
import { max,min } from 'mathjs'
import {InitPrograms, GenerateProgramInfo} from './programs'
import test_matcap from './assets/textures/test_matcap.png'
import { loadTexture } from './textureLoder'
import { GeneratePalette } from './palette'
import { GenerateLights } from './lights'

const PI = 3.1415926
const accumulated = {theta:PI/4,alpha:3*PI/4,radius:20};
const cursorAnchor = {x:0,y:0};
const diff = {alpha:0,theta:0};
let isDown = false;
const renderModes = ["wire","matcap"]
const modelModes = ['maze', 'modelFlat','modelSmooth']
let curRenderMode = 1
let curModelMode = 0
let curPalette = GeneratePalette();
let curLights = GenerateLights(curPalette)
const windowSize = {x:window.innerWidth,y:window.innerHeight}
let parameters = {
  isOrtho: false,
  cameraTheta: PI/4,
  cameraAlpha:3*PI/4,
  cameraRaiuds :3,
  radius: 20,
  floor: 0,
  palette: null,
  lights: null,
  model: "maze"
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
    accumulated.theta = max(min(accumulated.theta,PI/2),0)
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
    if(accumulated.radius+delta >0){
      accumulated.radius += delta
    }
  },{passive:false});
}

function InitUI(){
  const renderBtn = document.querySelector("button#renderMode");
  const shaderBtn = document.querySelector("button#shaderMode");
  const colorBtn = document.querySelector("button#colorMode");
  const modelBtn = document.querySelector("button#modelMode");
  renderBtn.onclick = (val)=>{
    parameters.isOrtho = !parameters.isOrtho
    renderBtn.textContent = parameters.isOrtho? "Orthographic" : "Perspective"
  }
  shaderBtn.onclick = (val)=>{
    curRenderMode = (++curRenderMode)%renderModes.length
    shaderBtn.textContent = renderModes[curRenderMode];
  }
  colorBtn.onclick = (val)=>{
    curPalette = GeneratePalette()
    curLights = GenerateLights(curPalette)
  }
  modelBtn.onclick = (val) =>{
    curModelMode = (++curModelMode)%modelModes.length
    modelBtn.textContent = modelModes[curModelMode]
  }
  renderBtn.textContent = parameters.isOrtho? "Orthographic" : "Perspective"
  shaderBtn.textContent = renderModes[curRenderMode];
  modelBtn.textContent = modelModes[curModelMode]
  colorBtn.textContent = "Color";
}


function main() {
  //HTML stuff
  SubsribeToEvents()
  InitUI()




  const canvas = document.querySelector("canvas#gl");
  const gl = canvas.getContext("webgl");
  // Support check
  if (gl === null) {
    alert("WebGL not supported.");
    return;
  }
  // This is to prevent pixel size mismatch
  ResizeCanvas(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const ext = gl.getExtension("OES_element_index_uint");

  // Load textures
  const texture = loadTexture(gl, test_matcap);
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
    parameters.cameraTheta =  Interpolate(parameters.cameraTheta ,max(min(accumulated.theta+diff.theta,PI/2)),0.95)
    parameters.cameraAlpha = Interpolate(parameters.cameraAlpha, accumulated.alpha+diff.alpha,0.95);
    parameters.radius = Interpolate(parameters.radius,accumulated.radius,0.95)
    parameters.palette = curPalette
    parameters.lights = curLights
    renderMode = renderModes[curRenderMode]
    parameters.model = modelModes[curModelMode]
    drawScene(gl, programInfos[renderMode], buffers, parameters,renderMode);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


main();