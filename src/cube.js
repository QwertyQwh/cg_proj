function InitCubeArrays(params){
    const positionArr = initPosition(params);
  
    const indexArr = initIndex(params);
  
    return {
      positions: positionArr,
      indices: indexArr,
    };
}

function initPosition(params) {
    const left = params.left
    const right = params.left+params.width
    const bottom = params.bottom
    const top = params.bottom+params.height
    const near = params.near
    const far = params.near+params.depth
    const positions = [
      // eight vertices 
      left,bottom,near,
      left,bottom,far,
      right,bottom,far,
      right,bottom,near,
      left,top,near,
      left,top,far,
      right,top,far,
      right,top,near
    ];
    return positions
  }

  function initIndex(params) {
    const indices = [
      //Front
      0,3,7,
      0,4,7, 
      //Top
      7,6,5,
      7,4,5,  
      //Back
      5,1,2,
      5,6,2, 
      //Right
      6,7,3,
      6,2,3,     
      //Bottom
      3,0,1,
      3,2,1,
      //Left
      0,1,4,
      5,4,1,
    ];
    return indices;
  }

  export {InitCubeArrays}