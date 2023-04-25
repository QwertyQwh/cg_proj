import { InitCubeArrays } from "./cube";
import { LoadModel } from "./objLoader";
// function initMazeBuffers(gl) {
//   const positionBuffer = gl.createBuffer();
//   const normalBuffer = gl.createBuffer();
//   const indexBuffer = gl.createBuffer();
//   const indexWireBuffer = gl.createBuffer();
//   let info = {
//     position: positionBuffer,
//     normals: normalBuffer,
//     indices: indexBuffer,
//     wireIndices: indexWireBuffer,
//     vertexCount: 0,
//     wireCount: 0,
//   }
  
//   let positions = []
//   let normals = []
//   let indices = []
//   let wires = []
//   const cube1Param = {
//       left:-1,
//       bottom:-1,
//       near:-1,
//       width:2,
//       height:8,
//       depth:2
//   }
//   const cube2Param = {
//     left:-4,
//     bottom:-1,
//     near:-1,
//     width:2,
//     height:8,
//     depth:2
//   }
//   const cube3Param = {
//     left:-1,
//     bottom:-1,
//     near:-4,
//     width:2,
//     height:8,
//     depth:2
//   }
//   AddCube(positions,normals,indices,wires,info,cube1Param)
//   AddCube(positions,normals,indices,wires,info,cube2Param)
//   AddCube(positions,normals,indices,wires,info,cube3Param)
//   gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
//   gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
//   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
//   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
//   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
//   gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
//   gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(wires),gl.STATIC_DRAW);
//   return info;
// }
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
  const cube1Param = {
      left:-1,
      bottom:-1,
      near:-1,
      width:2,
      height:8,
      depth:2
  }
  const cube2Param = {
    left:-4,
    bottom:-1,
    near:-1,
    width:2,
    height:8,
    depth:2
  }
  const cube3Param = {
    left:-1,
    bottom:-1,
    near:-4,
    width:2,
    height:8,
    depth:2
  }
  AddCube(positions,normals,indices,wires,info,cube1Param)
  AddCube(positions,normals,indices,wires,info,cube2Param)
  AddCube(positions,normals,indices,wires,info,cube3Param)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(wires),gl.STATIC_DRAW);
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
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexWireBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(wires),gl.STATIC_DRAW);
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

function initBuffers(gl){
  const modelFlat = initModelBuffers(gl,false) 
  const modelSmooth = initModelBuffers(gl,true)
  const maze = initMazeBuffers(gl)
  return {modelFlat,modelSmooth,maze};
}





  export {initBuffers}