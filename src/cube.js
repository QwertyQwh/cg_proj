function InitCubeArrays(gl,parameters){
    const positionBuffer = initPosition(gl,parameters);
  
    const indexBuffer = initIndex(gl);
  
    return {
      position: positionBuffer,
      color: colorBuffer,
      indices: indexBuffer,
    };
}

function initPosition(gl) {
    const positions = [
      // Front face
      -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
    ];
  
    return positions
  }