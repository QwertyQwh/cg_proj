import { InitCubeArrays } from "./cube";
import { LoadModel } from "./objLoader";
import { Maze } from "./maze";

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
  const mazeP = {
    weights:{horizontal: 0.5, stair: 1. },
   hollowCondition: null,
   width:20,
   height:20,
   centerLocation:{i:10,j:10},
   start:{i:0,j:0},
   end:null
}
  const maze = new Maze(mazeP)
  // for()
  
  for(let i = 0; i<mazeP.width; i++){
    for(let j = 0; j< mazeP.height; j++){
      AddMazeBlock(maze.nodes[i][j],mazeP.width,mazeP.height,1,0.3, positions,normals,indices,wires,info)
    }
  }
  console.log(indices.length/36)
  console.log(positions.length/72)
  //gl.BUFFER_SIZE
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
    const params = LoadModel(smoothen);
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

function AddCube(positions,normals,indices,wires,info, params){
  const {positions: pos,normals: norm, indices: ind,wires:wir} = InitCubeArrays(params)
  const startingIndex = positions.length/3
  positions.push(...pos)
  normals.push(...norm)
  indices.push(...ind.map((val,ind)=>val+startingIndex))
  wires.push(...wir.map((val,ind)=>val+startingIndex))
  info.vertexCount += 36
  info.wireCount += 36
}

function AddMazeBlock(node,width,height,size,gap,positions,normals,indices,wires,info){
  const centerParam = {
    left: (node.indices.i-width/2+gap)*size,
    bottom:  0,
    near:(node.indices.j-height/2+gap)*size,
    width: (1-gap*2)*size,
    height:  2*(1+0.2*node.indices.h),
    depth: (1-gap*2)*size
  }
  AddCube(positions,normals,indices,wires,info,centerParam)
  if(node.path.left){
    centerParam.left = (node.indices.i-width/2)*size
    centerParam.near = (node.indices.j-height/2+gap)*size
    centerParam.width = gap*size
    centerParam.depth = (1-gap*2)*size
    AddCube(positions,normals,indices,wires,info,centerParam)
  }
  if(node.path.right){
    centerParam.left = (node.indices.i+1-width/2-gap)*size
    centerParam.near = (node.indices.j-height/2+gap)*size
    centerParam.width = gap*size
    centerParam.depth = (1-gap*2)*size
    AddCube(positions,normals,indices,wires,info,centerParam)
  }
  if(node.path.forward){
    centerParam.left = (node.indices.i-width/2+gap)*size
    centerParam.near = (node.indices.j-height/2+1-gap)*size
    centerParam.width = (1-gap*2)*size
    centerParam.depth = gap*size
    AddCube(positions,normals,indices,wires,info,centerParam)
  }
  if(node.path.backward){
    centerParam.left = (node.indices.i-width/2+gap)*size
    centerParam.near = (node.indices.j-height/2)*size
    centerParam.width = (1-gap*2)*size
    centerParam.depth = gap*size
    AddCube(positions,normals,indices,wires,info,centerParam)
  }
}





function initBuffers(gl){
  const modelFlat = initModelBuffers(gl,false) 
  const modelSmooth = initModelBuffers(gl,true)
  const maze = initMazeBuffers(gl)
  return {modelFlat,modelSmooth,maze};
}





  export {initBuffers}