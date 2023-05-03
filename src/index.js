import './style.css'
import vert_static from './shaders/vert_static'
import vert_flag from './shaders/vert_flag'
import frag_matcap from './shaders/frag_matcap'
import frag_wire from './shaders/frag_wire'
import frag_white from './shaders/frag_white'
import vert_cloud from './shaders/vert_cloud'
import frag_floor from './shaders/frag_floor'
import {Interpolate, ResizeCanvas } from './utils/utils'
import { initBuffers } from './geometry'
import { drawScene } from './drawscene'
import { max,min } from 'mathjs'
import {InitScenePrograms, GenerateSceneProgramInfo, InitCloudPrograms, GenerateCloudProgramInfo} from './utils/programs'
import { loadTexture } from './utils/textureLoder'
import { GeneratePalette } from './palette'
import { GenerateLights } from './lights'
import { settings,Randomize } from './settings'
import { GetCloudTexture, UpdateCloudTexture } from './cloudTexture'

const PI = 3.1415926
const accumulated = {theta:PI/4,alpha:-1*PI/4,radius:50,fogHeight:3,fogStart:0};
const cursorAnchor = {x:0,y:0};
const diff = {alpha:0,theta:0};
let isDown = false;
const renderModes = ["wire","matcap"]
const sceneModes = ['maze', 'modelFlat','modelSmooth']
let curRenderMode = 1
let curSceneMode = 0
let curPalette = GeneratePalette();
let curLights = GenerateLights(curPalette)
const windowSize = {x:window.innerWidth,y:window.innerHeight}
let parameters = {
  isOrtho: true,
  cameraTheta: PI/4,
  cameraAlpha:4*PI/4,
  cameraRaiuds :3,
  radius: 300,
  floor: 0,
  palette: null,
  lights: null,
  model: "maze",
  fogStart: 50,
  fogHeight: 150,
  elapse:0,
  curGeometries: null,
  translation: null,
  rotation: null,
  characterPos: [0,0]
}

const sceneGeometries = {
  maze:{
    geometries: ["maze",'flag','cloud','floor'],
    instance : {
      flag:[],
      cloud:[],
    }, 
    programs: [0,1,2,3],
  },
  modelFlat:{
    geometries: ['modelFlat'],
    programs: [0],
  },
  modelSmooth:{
    geometries: ['modelSmooth'],
    programs: [0],
  }
}

const vsSource = {
  static: vert_static,
  flag: vert_flag,
  cloud: vert_cloud,
}

const fsSource = {
  wire: frag_wire,
  matcap: frag_matcap,
  white: frag_white,
  floor: frag_floor
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
    accumulated.theta = max(min(accumulated.theta,settings.controls.maxTheta),settings.controls.minTheta)
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
    if(accumulated.radius+delta > settings.controls.minRadius && accumulated.radius+delta<settings.controls.maxRadius){
      accumulated.radius += delta
    }
  },{passive:false});
}

function InitUI(){
  const renderBtn = document.querySelector("button#renderMode");
  const shaderBtn = document.querySelector("button#shaderMode");
  const colorBtn = document.querySelector("button#colorMode");
  const modelBtn = document.querySelector("button#modelMode");
  const regenerateBtn = document.querySelector("button#regenerate");
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
    curSceneMode = (++curSceneMode)%sceneModes.length
    modelBtn.textContent = sceneModes[curSceneMode]
  }
  regenerateBtn.onclick = (val)=>{
    location.reload()
  }
  renderBtn.textContent = parameters.isOrtho? "Orthographic" : "Perspective"
  shaderBtn.textContent = renderModes[curRenderMode];
  modelBtn.textContent = sceneModes[curSceneMode]
  colorBtn.textContent = "Color";
}


function main() {
  Randomize()
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
  // Call some utility function to initialize the program
  const programs = InitScenePrograms(gl,vsSource,fsSource)
  const programInfos = GenerateSceneProgramInfo(gl,programs)
  const cloudProgram = InitCloudPrograms(gl,vsSource,fsSource)
  const cloudProgramInfo = GenerateCloudProgramInfo(gl,cloudProgram)
  console.log(cloudProgramInfo)
    parameters.curGeometries = sceneGeometries[parameters.model]
    const buffers = initBuffers(gl,sceneGeometries);

  // Load textures
  // const texture = loadTexture(gl, clouds,gl.RGBA);
  const texture = GetCloudTexture(gl,cloudProgramInfo,buffers.cloud,parameters);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.activeTexture(gl.TEXTURE0);
  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // Tell the shader we bound the texture to texture unit 0
  programInfos.matcap.forEach((val)=>{
    gl.uniform1i(val.uniformLocations.uMatSampler, 0);
  })
  programInfos.wire.forEach((val)=>{
    gl.uniform1i(val.uniformLocations.uMatSampler, 0);
  })
  // Flip image pixels into the bottom-to-top order that WebGL expects.
  let then = 0;
  let elapse = 0;
  let start;
  let deltaTime = 0
  let renderMode;
  function render(now) {
    now *= 0.001; 
    if(!start){
      start = now
    }
    elapse = now-start;
    then = now;
    parameters.cameraTheta =  Interpolate(parameters.cameraTheta ,max(min(accumulated.theta+diff.theta,settings.controls.maxTheta)),0.96)
    parameters.cameraAlpha = Interpolate(parameters.cameraAlpha, accumulated.alpha+diff.alpha,0.96);
    parameters.radius = Interpolate(parameters.radius,accumulated.radius,0.96)
    parameters.fogHeight = Interpolate(parameters.fogHeight,accumulated.fogHeight,0.98)
    parameters.fogStart = Interpolate(parameters.fogStart,accumulated.fogStart,0.98)
    parameters.lights = curLights
    parameters.palette = curPalette
    parameters.elapse = elapse
    renderMode = renderModes[curRenderMode]
    parameters.model = sceneModes[curSceneMode]
    parameters.curGeometries = sceneGeometries[parameters.model]
    UpdateCloudTexture(gl,cloudProgramInfo,buffers.cloud,parameters,texture)
    // Tell WebGL we want to affect texture unit 0

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      drawScene(gl, programInfos[renderMode], buffers, parameters,renderMode,elapse);
    // drawClouds(gl,cloudProgramInfo,buffers.cloud,parameters)
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


main();