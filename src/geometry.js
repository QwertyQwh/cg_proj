import { LoadModel } from "./objLoader";
import { Maze } from "./maze";
import { AddMazeBlock } from "./mazeGeometry";
import { AddModel } from "./model";
import cone from './assets/models/cone.obj'
import suzanne from './assets/models/suzanne.obj'
import { settings } from "./settings";
import { AddTowers } from "./towers";
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
  const towerParams = {
    count:20,
    mazeDepth: mazeP.height*blockParam.size,
    mazeWidth: mazeP.width*blockParam.size,
    bound: 2*mazeP.height*blockParam.size,
    height: 7
   }
  AddTowers(positions,normals,indices,wires,info,towerParams)
  // AddModel(positions,normals,indices,wires,info,{file:cone,smoothen:false,offsetY: 5})
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





function initBuffers(gl){
  const modelFlat = initModelBuffers(gl,false) 
  const modelSmooth = initModelBuffers(gl,true)
  const maze = initMazeBuffers(gl)
  return {modelFlat,modelSmooth,maze};
}





  export {initBuffers}