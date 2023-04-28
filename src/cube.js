

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

function InitCubeArrays(params){
    const positionArr = initPosition(params);
    const normalArr = initNormal(params)
    const indexArr = initIndex(params);
    const wireArr =InitWire(params);
    return {
      positions: positionArr,
      normals: normalArr,
      indices: indexArr,
      wires:wireArr,
    };
}

function initPosition(params) {
    let left = params.left
    let right = params.left+params.width
    let bottom = params.bottom
    let top = params.bottom+params.height
    let near = params.near
    let far = params.near+params.depth
    if(params.flipX){
      // console.log('flipping')
      left = 2*params.avgX-left
      right = 2*params.avgX-right
    }if(params.flipZ){
      near = 2*params.avgZ - near
      far = 2*params.avgZ - far
    }
    const positions = [
      //Front
      left,bottom,near,
      left,top,near,
      right,bottom,near,
      right,top,near,
      //Top
      left,top,near,
      left,top,far,
      right,top,far,
      right,top,near,
      //Back
      left,bottom,far,
      right,bottom,far,
      left,top,far,
      right,top,far,
      //Right
      right,bottom,far,
      right,bottom,near,
      right,top,far,
      right,top,near,
      //Bottom
      left,bottom,near,
      left,bottom,far,
      right,bottom,far,
      right,bottom,near,
      //Left
      left,bottom,near,
      left,bottom,far,
      left,top,near,
      left,top,far,
    ];
    return positions
  }

  function initNormal(params) {
    const normals = [
      //Front
      0,0,-1,
      0,0,-1, 
      0,0,-1, 
      0,0,-1, 
      //Top
      0,1,0,
      0,1,0,  
      0,1,0,  
      0,1,0,  
      //Back
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1, 
      //Right
      1,0,0,
      1,0,0,     
      1,0,0,     
      1,0,0,     
      //Bottom
      0,-1,0,
      0,-1,0,
      0,-1,0,
      0,-1,0,
      //Left
      -1,0,0,
      -1,0,0,
      -1,0,0,
      -1,0,0,
    ];
    return normals;
  }

  function initIndex(params) {
    const indices = [
      //Front
      0,2,3,
      0,1,3, 
      //Top
      7,6,5,
      7,4,5,  
      //Back
      10,8,9,
      10,11,9, 
      //Right
      14,15,13,
      14,12,13,     
      //Bottom
      19,16,17,
      19,16,17,
      //Left
      21,20,22,
      21,23,22,
    ];
    return indices;
  }

  function InitWire(params){
    const wireIndices = [
      0,1,
      0,2,
      0,3,
      1,3,
      2,3,
      8,9,
      8,10,
      8,11,
      10,11,
      9,11,
      0,8,
      1,10,
      2,9,
      3,11,
      0,10,
      2,11,
      1,11,
      0,9,
    ]
    return wireIndices
  }

  export {AddCube}