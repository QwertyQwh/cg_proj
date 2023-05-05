import { LoadModel } from "./geometries/objLoader";
import { AddMazeBlock } from "./geometries/mazeGeometry";
import suzanne from './assets/models/suzanne.obj'
import { settings } from "./settings";
import { AddFlag } from "./geometries/flag";
import { AddCloud } from "./geometries/cloud";
import { AddCube } from "./geometries/cube";
import { PoissonSample } from "./utils/poisson";
import { max, pi, random } from "mathjs";
import { AddDome, AddDomes } from "./geometries/domes";
import { AddTower } from "./geometries/tower";
import { AddPavilion } from "./geometries/pavilion";
import { maze2world } from "./utils/utils";
import { AddUpper,AddLower,AddMiddle } from "./geometries/character";
import { InitCharacter } from "./player";
function initMazeBuffers(gl,flagInstance,pavilionInstance,maze) {
  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  const indexWireBuffer = gl.createBuffer();
  let info = {
    position: positionBuffer,
    normals: normalBuffer,
    indices: indexBuffer,
    wireIndices: indexWireBuffer,
    vertexCount: 0,
    wireCount: 0,
  }

  let positions = []
  let normals = []
  let indices = []
  let wires = []
  const mazeP = settings.mazeParams
  const blockParam = settings.blockParams
  for(let i = 0; i<mazeP.width; i++){
    for(let j = 0; j< mazeP.height; j++){
      AddMazeBlock(maze.nodes[i][j],{...blockParam,width:mazeP.width,height:mazeP.height}, positions,normals,indices,wires,info)
      if(maze.nodes[i][j].pavilion){
        const {x,y,z} = maze2world(i,j,maze.nodes[i][j].indices.h)
        pavilionInstance.push({translation:[x,y,z],scale:[1,1,1], rotateY:0})
      }
    }
  }
  //Corners
  const cornerParams = {
    offsetY:8,
    offsetX: (-mazeP.width*.5 +1.)*blockParam.size, 
    offsetZ: (-mazeP.height*.5+1.)*blockParam.size, 
    scale:1.* settings.blockParams.size,
    smoothen: false
  }
  AddTower(positions,normals,indices,wires,info,cornerParams)
  flagInstance.push({translation:[cornerParams.offsetX,8,cornerParams.offsetZ],scale :[0.5,0.5,0.5],rotateY: pi*1.25})
  cornerParams.offsetX += (mazeP.width-2.)*blockParam.size
  AddTower(positions,normals,indices,wires,info,cornerParams)
  flagInstance.push({translation:[cornerParams.offsetX,8,cornerParams.offsetZ],scale :[0.5,0.5,0.5],rotateY: pi*1.25})
  cornerParams.offsetZ += (mazeP.height-2.)*blockParam.size
  AddTower(positions,normals,indices,wires,info,cornerParams)
  flagInstance.push({translation:[cornerParams.offsetX,8,cornerParams.offsetZ],scale :[0.5,0.5,0.5],rotateY: pi*1.25})
  cornerParams.offsetX-=(mazeP.width-2.)*blockParam.size
  AddTower(positions,normals,indices,wires,info,cornerParams)
  flagInstance.push({translation:[cornerParams.offsetX,8,cornerParams.offsetZ],scale :[0.5,0.5,0.5],rotateY: pi*1.25})
  // Random Towers

  //Bind buffers to arrays
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
  return info;
}

function initModelBuffers(gl,smoothen) {
    const positionBuffer = gl.createBuffer();
    const normalBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
  const indexWireBuffer = gl.createBuffer();
  let info = {
      position: positionBuffer,
      normals: normalBuffer,
      indices: indexBuffer,
    wireIndices: indexWireBuffer,
    vertexCount: 0,
    }
    const params = LoadModel({file:suzanne,smoothen:smoothen,offsetY:5});
    let positions = params.vertices;
    let normals = params.elementsNormal
    let indices = params.elements
    let wires = params.elementsWire
    info.vertexCount = indices.length
    info.wireCount = wires.length
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
    return info;
  }

function initFlagBuffers(gl,instanceInfo) {
  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
const indexWireBuffer = gl.createBuffer();

let positions = [];
let normals = []
let indices = []
let wires = []
let info = {
  position: positionBuffer,
  normals: normalBuffer,
  indices: indexBuffer,
wireIndices: indexWireBuffer,
vertexCount: 0,
}  
const flagParams = {
  offsetY:3.0,
  scale:.2,
  smoothen: false
}
AddFlag(positions,normals,indices,wires,info,flagParams)
  info.vertexCount = indices.length
  info.wireCount = wires.length
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
  return info;
}

function initCloudBuffers(gl,instanceInfo) {
  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
const indexWireBuffer = gl.createBuffer();
let info = {
  position: positionBuffer,
  normals: normalBuffer,
  indices: indexBuffer,
  wireIndices: indexWireBuffer,
  vertexCount: 0,
  wireCount: 0,
}

let positions = []
let normals = []
let indices = []
let wires = []
const cloudParams = {
  scale:.2,
  smoothen: false
}
AddCloud(positions,normals,indices,wires,info,cloudParams)
const sampleParams = {
  bound: settings.cloud.bound*1.4,
  min: settings.cloud.bound*0.4,
  max: settings.cloud.bound*1.6,
  attempts: 15,
  count: 9,
  first: [-settings.cloud.bound*0.1, settings.cloud.bound*0.05]
}
const clusters = PoissonSample(sampleParams)
const clusterParams = {
  bound: settings.cloud.bound*1.,
  min: settings.cloud.bound*0.1,
  max: settings.cloud.bound*0.3,
  attempts: 15,
  count: 7,
  first: [0,0]
}
clusters.forEach((clusterVal)=>{
  const jitters = PoissonSample(clusterParams)
  jitters.forEach((val)=>{
    const offsetY = settings.cloud.height+ random(0,10)
    const scale = random(0.5,4)
    instanceInfo.push({translation: [val[0]+clusterVal[0],offsetY,val[1]+clusterVal[1]],scale:[scale,scale,scale],rotateY:0})
  })
})

//Bind buffers to arrays
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
return info;
}

function InitFloorBuffers(gl){
  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  const indexWireBuffer = gl.createBuffer();
  let info = {
    position: positionBuffer,
    normals: normalBuffer,
    indices: indexBuffer,
    wireIndices: indexWireBuffer,
    vertexCount: 0,
    wireCount: 0,
  }

  let positions = []
  let normals = []
  let indices = []
  let wires = []
  const cubeParams = {
    left: -1.6*settings.cloud.bound,
    bottom:-.1,
    near:-1.6*settings.cloud.bound,
    width: 3.2*settings.cloud.bound,
    height:.1,
    depth:3.2*settings.cloud.bound
  }
  AddCube(positions,normals,indices,wires,info,cubeParams)
  //Bind buffers to arrays
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
  return info;
}

function initDomeBuffers(gl,instanceInfo) {
  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  const indexWireBuffer = gl.createBuffer();
  let positions = [];
  let normals = []
  let indices = []
  let wires = []
  let info = {
    position: positionBuffer,
    normals: normalBuffer,
    indices: indexBuffer,
    wireIndices: indexWireBuffer,
    vertexCount: 0,
  }  
  const mazeP = settings.mazeParams
  const blockParam = settings.blockParams
  const domeParams = {
    count:1500,
    mazeDepth: (mazeP.height+1)*blockParam.size,
    mazeWidth: (mazeP.width+1)*blockParam.size,
    bound: 3*20*blockParam.size,
    height: 3
  }
  const modelParams = {smoothen:false,scale:settings.blockParams.size};
  AddDome(positions,normals,indices,wires,info,modelParams)
  AddDomes(domeParams,instanceInfo)
  info.vertexCount = indices.length
  info.wireCount = wires.length
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
  return info;
}

function initPavilionBuffers(gl,instanceInfo) {
  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  const indexWireBuffer = gl.createBuffer();
  let positions = [];
  let normals = []
  let indices = []
  let wires = []
  let info = {
    position: positionBuffer,
    normals: normalBuffer,
    indices: indexBuffer,
    wireIndices: indexWireBuffer,
    vertexCount: 0,
  }  
  const modelParams = {smoothen:false,scale:0.25*settings.blockParams.size};
  AddPavilion(positions,normals,indices,wires,info,modelParams)
  info.vertexCount = indices.length
  info.wireCount = wires.length
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
  return info;
}

function initUpperBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  const indexWireBuffer = gl.createBuffer();
  let positions = [];
  let normals = []
  let indices = []
  let wires = []
  let info = {
    position: positionBuffer,
    normals: normalBuffer,
    indices: indexBuffer,
    wireIndices: indexWireBuffer,
    vertexCount: 0,
  }  
  const modelParams = {smoothen:false,scale:0.12};
  AddUpper(positions,normals,indices,wires,info,modelParams)
  info.vertexCount = indices.length
  info.wireCount = wires.length
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
  return info;
}

function initMiddleBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  const indexWireBuffer = gl.createBuffer();
  let positions = [];
  let normals = []
  let indices = []
  let wires = []
  let info = {
    position: positionBuffer,
    normals: normalBuffer,
    indices: indexBuffer,
    wireIndices: indexWireBuffer,
    vertexCount: 0,
  }  
  const modelParams = {smoothen:false,scale:0.12};
  AddMiddle(positions,normals,indices,wires,info,modelParams)
  info.vertexCount = indices.length
  info.wireCount = wires.length
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
  return info;
}

function initLowerBuffers(gl) {
  const positionBuffer = gl.createBuffer();
  const normalBuffer = gl.createBuffer();
  const indexBuffer = gl.createBuffer();
  const indexWireBuffer = gl.createBuffer();
  let positions = [];
  let normals = []
  let indices = []
  let wires = []
  let info = {
    position: positionBuffer,
    normals: normalBuffer,
    indices: indexBuffer,
    wireIndices: indexWireBuffer,
    vertexCount: 0,
  }  
  const modelParams = {smoothen:false,scale:0.12};
  AddLower(positions,normals,indices,wires,info,modelParams)
  info.vertexCount = indices.length
  info.wireCount = wires.length
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(indices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint32Array(wires),gl.STATIC_DRAW);
  return info;
}


function initBuffers(gl,instanceInfo,maze){
  const modelFlat = initModelBuffers(gl,false) 
  const modelSmooth = initModelBuffers(gl,true)
  const mazeG = initMazeBuffers(gl,instanceInfo.Maze.instance.flag, instanceInfo.Maze.instance.pavilion,maze)
  const flag = initFlagBuffers(gl,instanceInfo.Maze.instance.flag)
  const cloud = initCloudBuffers(gl,instanceInfo.Maze.instance.cloud)
  const floor = InitFloorBuffers(gl)
  const domes = initDomeBuffers(gl,instanceInfo.Maze.instance.dome)
  const middle = initMiddleBuffers(gl)
  const upper = initUpperBuffers(gl)
  const lower = initLowerBuffers(gl)
  const pavilion = initPavilionBuffers(gl)
  return {Suzanne:modelFlat,SmoothSuzanne:modelSmooth,maze:mazeG, flag: flag,cloud: cloud,floor: floor,dome:domes,upper,middle, lower,pavilion: pavilion};
}



export {initBuffers}