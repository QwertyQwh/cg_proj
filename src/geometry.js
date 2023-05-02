import { LoadModel } from "./geometries/objLoader";
import { Maze } from "./geometries/maze";
import { AddMazeBlock } from "./geometries/mazeGeometry";
import suzanne from './assets/models/suzanne.obj'
import { settings } from "./settings";
import { AddTowers,AddTower } from "./geometries/towers";
import { AddFlag } from "./geometries/flag";
import { AddCloud } from "./geometries/cloud";
import { AddCube } from "./geometries/cube";
function initMazeBuffers(gl) {
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
  const maze = new Maze(mazeP)
  const blockParam = settings.blockParams
  for(let i = 0; i<mazeP.width; i++){
    for(let j = 0; j< mazeP.height; j++){
      AddMazeBlock(maze.nodes[i][j],{...blockParam,width:mazeP.width,height:mazeP.height}, positions,normals,indices,wires,info)
    }
  }
  //Corners
  const cornerParams = {
    offsetY:8,
    offsetX: (-mazeP.width*.5 +1.)*blockParam.size, 
    offsetZ: (-mazeP.height*.5+1.)*blockParam.size, 
    scale:1.,
    smoothen: false
  }
  AddTower(positions,normals,indices,wires,info,cornerParams)
  cornerParams.offsetX += (mazeP.width-2.)*blockParam.size
  AddTower(positions,normals,indices,wires,info,cornerParams)
  cornerParams.offsetZ += (mazeP.height-2.)*blockParam.size
  AddTower(positions,normals,indices,wires,info,cornerParams)
  cornerParams.offsetX-=(mazeP.width-2.)*blockParam.size
  AddTower(positions,normals,indices,wires,info,cornerParams)
  // Random Towers
  const towerParams = {
    count:10,
    mazeDepth: (mazeP.height+1)*blockParam.size,
    mazeWidth: (mazeP.width+1)*blockParam.size,
    bound: 2*mazeP.height*blockParam.size,
    height: 3
   }
  AddTowers(positions,normals,indices,wires,info,towerParams)
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

function initFlagBuffers(gl) {
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
  offsetY:10,
  scale:.5,
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



  
function initCloudBuffers(gl) {
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
  offsetY:settings.cloud.height,
  offsetX:5,
  scale:.2,
  smoothen: false
}
AddCloud(positions,normals,indices,wires,info,cloudParams)
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
    left: -settings.cloud.bound,
    bottom:-2,
    near:-settings.cloud.bound,
    width: 2*settings.cloud.bound,
    height:2,
    depth:2*settings.cloud.bound
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

function initBuffers(gl){
  const modelFlat = initModelBuffers(gl,false) 
  const modelSmooth = initModelBuffers(gl,true)
  const maze = initMazeBuffers(gl)
  const flag = initFlagBuffers(gl)
  const cloud = initCloudBuffers(gl)
  const floor = InitFloorBuffers(gl)
  return {modelFlat:modelFlat,modelSmooth:modelSmooth,maze:maze, flag: flag,cloud: cloud,floor: floor};
}



export {initBuffers}