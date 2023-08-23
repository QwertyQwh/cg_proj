import './style.css'
import vert_static from './shaders/vert_static'
import vert_flag from './shaders/vert_flag'
import frag_matcap from './shaders/frag_matcap'
import frag_wire from './shaders/frag_wire'
import frag_white from './shaders/frag_white'
import vert_cloud from './shaders/vert_cloud'
import frag_floor from './shaders/frag_floor'
import {Maze} from './geometries/maze'
import {Interpolate, MobileCheck, ResizeCanvas } from './utils/utils'
import { initBuffers } from './geometry'
import { drawScene } from './drawScene.js'
import { max,min, pi } from 'mathjs'
import {InitScenePrograms, GenerateSceneProgramInfo, InitCloudPrograms, GenerateCloudProgramInfo} from './utils/programs'
import { GeneratePalette } from './palette'
import { GenerateLights } from './lights'
import { settings,Randomize, SetAllHorizontal } from './settings'
import { GetCloudTexture, UpdateCloudTexture } from './cloudTexture'
import { InitCharacter, MoveCharacter} from './player'
import {arrowHandler } from './movement'
import { vec3 } from 'gl-matrix'


let userIdling = 0
const PI = 3.1415926
const accumulated = {theta:PI/4,alpha:-1*PI/4,radius:50*settings.blockParams.size,fogHeight:3*settings.blockParams.size,fogStart:0,characterPos:[0,0,0],node:{i: 0,j:0},scale:1};
const cursorAnchor = {x:0,y:0};
const diff = {alpha:0,theta:0};
let isDown = false;
const renderModes = ["Wire","Solid"]
const sceneModes = ['Maze', 'Suzanne','SmoothSuzanne']
let curRenderMode = 1
let curSceneMode = 0
let curPalette 
let curLights 
const windowSize = {x:window.innerWidth,y:window.innerHeight}
let promptTxt = "Use Arrow Keys to navigate. \r\n Drag and Zoom to move around. \r\n Press Space to refocus. "
let parameters = {
  maze: null,
  isOrtho: true,
  cameraTheta: PI/4,
  cameraAlpha:4*PI/4,
  radius: 300*settings.blockParams.size,
  floor: 0,
  palette: null,
  lights: null,
  model: "Maze",
  fogStart: 40*settings.blockParams.size,
  fogHeight: 80*settings.blockParams.size,
  elapse:0,
  deltaTime:0,
  curGeometries: null,
  translation: null,
  rotation: null,
  characterPos: [0,0,0],
  isMoving: false,
  totalTravelTime: 0.6,
  travelVec: vec3.create(),
  traveledTime: 0.
}

const sceneGeometries = {
  Maze:{
    geometries: ["maze",'flag','cloud','floor','dome','pavilion','upper','middle','lower'],
    instance : {
      flag:[],
      cloud:[],
      dome: [],
      upper: [{translation: [0,0,0], scale:[1,1,1], rotateY: pi*0.25}],
      middle: [{translation: [0,0,0], scale:[1,1,1], rotateY: pi*0.25}],
      lower: [{translation: [0,0,0], scale:[1,1,1], rotateY: pi*0.25}],
      pavilion:[],
    }, 
    programs: [0,1,2,3,0,0,0,0,0],
  },
  Suzanne:{
    geometries: ['Suzanne'],
    instance : {
    }, 
    programs: [0],
  },
  SmoothSuzanne:{
    geometries: ['SmoothSuzanne'],
    instance : {
    }, 
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

function SubsribeToEvents(gl){
  // Mouse Events
  window.addEventListener('resize', function(event){
    windowSize.x = window.innerWidth
    windowSize.y = window.innerHeight
    ResizeCanvas(gl.canvas);
  });
  window.addEventListener("mouseup",(event)=>{
    isDown = false
    accumulated.alpha += diff.alpha
    accumulated.theta += diff.theta
    accumulated.theta = max(min(accumulated.theta,settings.controls.maxTheta),settings.controls.minTheta)
    diff.alpha = 0
    diff.theta = 0
    userIdling = 0
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
    userIdling = 0
  })
  window.addEventListener("wheel", event => {
    event.preventDefault()
    const delta = Math.sign(event.deltaY);
    if(accumulated.radius+delta > settings.controls.minRadius && accumulated.radius+delta<settings.controls.maxRadius){
      accumulated.radius += delta
    }
    userIdling = 0

  },{passive:false});
  
  window.addEventListener('keydown', eve=>{
    if(!parameters.isMoving){
      arrowHandler?.(eve.key,parameters,accumulated)
    }
    userIdling = 0
  })
}

function InitUI(){
  if(MobileCheck()){
    promptTxt = 'Hey Mobile Users! Mobile Support is coming. Use a laptop for now.'
  }

  const renderBtn = document.querySelector("button#renderMode");
  const shaderBtn = document.querySelector("button#shaderMode");
  const colorBtn = document.querySelector("button#colorMode");
  const modelBtn = document.querySelector("button#modelMode");
  const regenerateBtn = document.querySelector("button#regenerate");
  const titleButton = document.querySelector("button#title")
  titleButton.onclick= ()=>{window.location.href='https://www.qwertyqwh.com/#/home';}
  titleButton.onmouseenter= (eve)=>{ titleButton.textContent = "Visit" }
  titleButton.onmouseout = (eve)=>{titleButton.textContent = "GLMaze by QWH"}
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
  colorBtn.textContent = "Change Color";
}


function main() {
  Randomize()
  // SetAllHorizontal()
  curPalette = GeneratePalette();
  curLights = GenerateLights(curPalette)
  parameters.maze = new Maze(settings.mazeParams)
  //HTML stuff
  const promptBox = document.querySelector("#prompt");
  InitUI()
  promptBox.textContent = promptTxt
  const canvas = document.querySelector("canvas#gl");
  const gl = canvas.getContext("webgl");
  // Support check
  if (gl === null) {
    alert("WebGL not supported.");
    return;
  }
  SubsribeToEvents(gl)
  // This is to prevent pixel size mismatch
  ResizeCanvas(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  const ext = gl.getExtension("OES_element_index_uint");
  // Call some utility function to initialize the program
  const programs = InitScenePrograms(gl,vsSource,fsSource)
  const programInfos = GenerateSceneProgramInfo(gl,programs)
  const cloudProgram = InitCloudPrograms(gl,vsSource,fsSource)
  const cloudProgramInfo = GenerateCloudProgramInfo(gl,cloudProgram)
  parameters.curGeometries = sceneGeometries[parameters.model]
  const buffers = initBuffers(gl,sceneGeometries,parameters.maze);
  
  // Load textures
  // const texture = loadTexture(gl, clouds,gl.RGBA);
  const texture = GetCloudTexture(gl,cloudProgramInfo,buffers.cloud,parameters);
  // Flip image pixels into the bottom-to-top order that WebGL expects.
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  // Bind the texture to texture unit 0
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  programInfos.Solid.forEach((val)=>{
    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(val.uniformLocations.uMatSampler, 0);
  })
  programInfos.Wire.forEach((val)=>{
    gl.uniform1i(val.uniformLocations.uMatSampler, 0);
  })
  InitCharacter(parameters,accumulated,sceneGeometries.Maze.instance);
  let then = 0;
  let elapse = 0;
  let start;
  let renderMode;
  function render(now) {
    now *= 0.001; 
    if(!start){
      start = now
    }
    elapse = now-start;
    parameters.deltaTime = now-then;
    then = now;
    parameters.cameraTheta =  Interpolate(parameters.cameraTheta ,max(min(accumulated.theta+diff.theta,settings.controls.maxTheta)),0.96)
    parameters.cameraAlpha = Interpolate(parameters.cameraAlpha, accumulated.alpha+diff.alpha,0.96);
    parameters.radius = Interpolate(parameters.radius,accumulated.radius,0.96)
    parameters.fogHeight = Interpolate(parameters.fogHeight,accumulated.fogHeight,0.98)
    parameters.fogStart = Interpolate(parameters.fogStart,accumulated.fogStart,0.98)
    MoveCharacter(parameters,accumulated,sceneGeometries.Maze.instance)
    parameters.lights = curLights
    parameters.palette = curPalette
    parameters.elapse = elapse
    renderMode = renderModes[curRenderMode]
    parameters.model = sceneModes[curSceneMode]
    parameters.curGeometries = sceneGeometries[parameters.model]
    
    if(parameters.model == 'Maze'){
      UpdateCloudTexture(gl,cloudProgramInfo,buffers,parameters,texture)
    }
    // Tell WebGL we want to affect texture unit 0

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      drawScene(gl, programInfos[renderMode], buffers, parameters,renderMode,elapse);
    // gl.viewport(0, 0, 4096, 4096);
    // drawClouds(gl,cloudProgramInfo,buffers.cloud,parameters)
    // drawPavilions(gl,cloudProgramInfo,buffers.pavilion,parameters,true)
    if(userIdling == 0){
      promptBox.style.opacity = 0
      promptBox.style.bottom = '10vh'
    }
    userIdling+= parameters.deltaTime
    if(userIdling >= 4){
      promptBox.style.opacity = 1
      promptBox.style.bottom = '15vh'
    }
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


main();