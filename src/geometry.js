import { LoadModel } from "./objLoader";
import { Maze } from "./maze";
import { AddMazeBlock } from "./mazeGeometry";

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
    weights:{horizontal: 0.5, stair: 0.4 },
   hollowCondition: (i,j)=> ((i>=8&& i<=12 && j>=8 && j<=12) /*|| ((i>0 || j>0) && (i+j*2) %4 == 0) */),
   width:20,
   height:20,
   centerLocation:{i:10,j:10},
   start:{i:0,j:0},
   end:null
  }
  const maze = new Maze(mazeP)
  console.log(maze.nodes)
  // for()
  
  for(let i = 0; i<mazeP.width; i++){
    for(let j = 0; j< mazeP.height; j++){
      AddMazeBlock(maze.nodes[i][j],{width:mazeP.width,height:mazeP.height,size:1,gap:0.25,baseHeight:2,heightModifier:0.5}, positions,normals,indices,wires,info)
    }
  }
  const sandwichParams = {
    first: {x:0,z:0},
    second: {x:0,z:1},
    third: {x:1,z:0},
    low:0,
    high:5,
    flipZ:true,
    avgZ: 0.5,
  }
  // AddSandwich(positions,normals,indices,wires,info, sandwichParams)
  // AddStair_backward_forward_ascending(maze.nodes[0][0],{width:mazeP.width,height:mazeP.height,size:1,gap:0.25,baseHeight:2,heightModifier:0.7}, positions,normals,indices,wires,info)
  // AddStair_backward_forward_descending(maze.nodes[0][1],{width:mazeP.width,height:mazeP.height,size:1,gap:0.25,baseHeight:2,heightModifier:0.7}, positions,normals,indices,wires,info)
  // AddStair_backward_left_ascending(maze.nodes[10][10],{width:mazeP.width,height:mazeP.height,size:1,gap:0.25,baseHeight:2,heightModifier:0.7}, positions,normals,indices,wires,info)
  // AddStair_backward_right_ascending(maze.nodes[10][10],{width:mazeP.width,height:mazeP.height,size:1,gap:0.25,baseHeight:2,heightModifier:0.7}, positions,normals,indices,wires,info)
  // AddStair_left_upward_ascending(maze.nodes[10][10],{width:mazeP.width,height:mazeP.height,size:1,gap:0.25,baseHeight:2,heightModifier:0.7}, positions,normals,indices,wires,info)
  // AddStair_right_backward_ascending(maze.nodes[10][11],{width:mazeP.width,height:mazeP.height,size:1,gap:0.25,baseHeight:2,heightModifier:0.7}, positions,normals,indices,wires,info)
  // AddStair_left_upward_descending(maze.nodes[10][11],{width:mazeP.width,height:mazeP.height,size:1,gap:0.25,baseHeight:2,heightModifier:0.7}, positions,normals,indices,wires,info)

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





function initBuffers(gl){
  const modelFlat = initModelBuffers(gl,false) 
  const modelSmooth = initModelBuffers(gl,true)
  const maze = initMazeBuffers(gl)
  return {modelFlat,modelSmooth,maze};
}





  export {initBuffers}