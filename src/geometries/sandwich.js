import { sqrt } from "mathjs";


function AddSandwich(positions,normals,indices,wires,info, params){
  const {positions: pos,normals: norm, indices: ind,wires:wir} = InitSandwichArrays(params)
  const startingIndex = positions.length/3
  positions.push(...pos)
  normals.push(...norm)
  indices.push(...ind.map((val,ind)=>val+startingIndex))
  wires.push(...wir.map((val,ind)=>val+startingIndex))
  info.vertexCount += 24
  info.wireCount += 24
}


function InitSandwichArrays(params){
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
//params: first point: x y  second point: x y   third point: x y  low high 
// !Important: pass points in clockwise order!

function initPosition(params) {
  const first = {...params.first}
  const second = {...params.second}
  const third = {...params.third}
  const low = params.low
  const high = params.high
  if(params.flipX){
    first.x = 2*params.avgX-first.x
    second.x = 2*params.avgX-second.x
    third.x = 2*params.avgX-third.x
  }if(params.flipZ){
    first.z = 2*params.avgZ-first.z
    second.z = 2*params.avgZ-second.z
    third.z = 2*params.avgZ-third.z
  }
    const positions = [
      //bottom
      first.x, low, first.z,
      second.x, low, second.z, 
      third.x, low, third.z, 
      //top
      first.x, high, first.z, 
      second.x, high,second.z, 
      third.x, high, third.z, 
      //first-second face
      first.x, low, first.z, 
      second.x, low, second.z, 
      first.x, high, first.z, 
      second.x, high, second.z, 
      //third-second face
      third.x, low, third.z, 
      second.x, low, second.z, 
      third.x, high, third.z,
      second.x, high, second.z, 
      //first-third face
      first.x, low, first.z, 
      third.x, low, third.z, 
      first.x, high, first.z,
      third.x, high, third.z, 
    ];
    return positions
  }

  function initNormal(params) {
    const first_second = {x: params.second.x-params.first.x, z: params.second.z-params.first.z }
    const second_third = {x: params.third.x-params.second.x, z: params.third.z-params.second.z }
    const third_first = {x: params.first.x-params.third.x, z: params.first.z-params.third.z }
    const first_second_norm = sqrt(first_second.x*first_second.x+first_second.z*first_second.z)
    const second_third_norm = sqrt(second_third.x*second_third.x+second_third.z*second_third.z)
    const third_first_norm = sqrt(third_first.x*third_first.x+third_first.z*third_first.z)
    const first_second_normal = {x: -first_second.z/first_second_norm, z:first_second.x/first_second_norm}
    const second_third_normal = {x: -second_third.z/second_third_norm, z:second_third.x/second_third_norm}
    const third_first_normal = {x: -third_first.z/third_first_norm, z:third_first.x/third_first_norm}
    const normals = [
      //bottom
      0,-1,0,
      0,-1,0,
      0,-1,0,
      //top
      0,1,0,
      0,1,0,
      0,1,0,
      //first-second face
      first_second_normal.x,0,first_second_normal.z,
      first_second_normal.x,0,first_second_normal.z,
      first_second_normal.x,0,first_second_normal.z,
      first_second_normal.x,0,first_second_normal.z,
      //second-third face
      second_third_normal.x,0, second_third_normal.z,
      second_third_normal.x,0, second_third_normal.z,
      second_third_normal.x,0, second_third_normal.z,
      second_third_normal.x,0, second_third_normal.z,
      //third-first face
      third_first_normal.x,0, third_first_normal.z,
      third_first_normal.x,0, third_first_normal.z,
      third_first_normal.x,0, third_first_normal.z,
      third_first_normal.x,0, third_first_normal.z,

    ];
    return normals;
  }

  function initIndex(params) {
    const indices = [
      //bottom
      0,1,2,
      //top
      3,4,5,
      //first-second face
      6,7,8,
      8,9,7,
      //third-second face
      10,11,12,
      12,13,11,
      //first-third face
      14,15,16,
      16,17,15
    ];
    return indices;
  }

  function InitWire(params){
    const wireIndices = [
      0,1,
      1,2,
      2,0,
      3,4,
      4,5,
      5,3,
      0,3,
      1,4,
      2,5,
      0,4,
      1,5,
      2,3,
    ]
    return wireIndices
  }

  export {AddSandwich}