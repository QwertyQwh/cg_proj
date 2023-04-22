import { InitCubeArrays } from "./cube";
function initBuffers(gl) {
    const positionBuffer = gl.createBuffer();
    const indexBuffer = gl.createBuffer();
    let info = {
      position: positionBuffer,
      indices: indexBuffer,
      vertexCount: 0,
    }
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
    let positions = []
    let indices = []
    AddCube(positions,indices,info,cube1Param)
    AddCube(positions,indices,info,cube2Param)
    AddCube(positions,indices,info,cube3Param)
    console.log(positions)
    console.log(indices)

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
    return info;
  }

function AddCube(positions,indices,info, params){
  const {positions: pos,indices: ind} = InitCubeArrays(params)
  const startingIndex = positions.length/3
  positions.push(...pos)
  indices.push(...ind.map((val,ind)=>val+startingIndex))
  info.vertexCount += 36
}

  export {initBuffers}