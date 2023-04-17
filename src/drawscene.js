import { mat4 } from "gl-matrix";
import { cos,max,sin,min } from "mathjs";
const PI = 3.1415926
// const MAX_THETA = PI/2
// const MAX_THETA = -PI/2
const accumulated = {theta:0,alpha:0};
const cursorAnchor = {x:0,y:0};
const diff = {alpha:0,theta:0};
let isDown = false;
let radius = 1
const windowSize = {x:window.innerWidth,y:window.innerHeight}
window.addEventListener("wheel", event => {
  const delta = Math.sign(event.deltaY);
  if(radius+delta >0){
    radius += delta
  }
  
});
window.addEventListener('resize', function(event){
  windowSize.x = window.innerWidth
  windowSize.y = window.innerHeight
});
window.addEventListener("mouseup",(event)=>{
  isDown = false
  accumulated.alpha += diff.alpha
  accumulated.theta += diff.theta
  accumulated.theta = max(min(accumulated.theta,PI/2),-PI/2)
  diff.alpha = 0
  diff.theta = 0
})
window.addEventListener('mousedown',(event)=>{
  event.preventDefault();
  cursorAnchor.x = event.clientX/windowSize.x
  cursorAnchor.y = event.clientY/windowSize.y
  isDown = true;
})
window.addEventListener('mousemove',(event)=>{
  event.preventDefault();
  if(isDown){
    diff.alpha = (event.clientX/windowSize.x-cursorAnchor.x)*2
    diff.theta = (event.clientY/windowSize.y-cursorAnchor.y)*2
  }
})

function drawScene(gl, programInfo, buffers, cubeRotation) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black, fully opaque
    gl.clearDepth(1.0); // Clear everything
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
  
    // Clear the canvas before we start drawing on it.
  
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
    // Create a perspective matrix, a special matrix that is
    // used to simulate the distortion of perspective in a camera.
    // Our field of view is 45 degrees, with a width/height
    // ratio that matches the display size of the canvas
    // and we only want to see objects between 0.1 units
    // and 100 units away from the camera.
  
    const fieldOfView = (45 * Math.PI) / 180; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
  
    // note: glmatrix.js always has the first argument
    // as the destination to receive the result.
    mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
  
    // Set the drawing position to the "identity" point, which is
    // the center of the scene.
    const modelViewMatrix = mat4.create();
  
    // Now move the drawing position a bit to where we want to
    // start drawing the square.
    // mat4.translate(
    //   modelViewMatrix, // destination matrix
    //   modelViewMatrix, // matrix to translate
    //   [0.0, 0.0, -6.0]
    // ); // amount to translate
  
    // mat4.rotate(
    //   modelViewMatrix, // destination matrix
    //   modelViewMatrix, // matrix to rotate
    //   cubeRotation, // amount to rotate in radians
    //   [0, 0, 1]
    // ); // axis to rotate around (Z)
    // mat4.rotate(
    //   modelViewMatrix, // destination matrix
    //   modelViewMatrix, // matrix to rotate
    //   cubeRotation * 0.7, // amount to rotate in radians
    //   [0, 1, 0]
    // ); // axis to rotate around (Y)
    // mat4.rotate(
    //   modelViewMatrix, // destination matrix
    //   modelViewMatrix, // matrix to rotate
    //   cubeRotation * 0.3, // amount to rotate in radians
    //   [1, 0, 0]
    // ); // axis to rotate around (X)
    

    const controlMatrix = mat4.create();
    const cameraTheta = max(min(accumulated.theta+diff.theta,PI/2),-PI/2)
    const cameraAlpha = accumulated.alpha+diff.alpha
    mat4.lookAt(
      controlMatrix,
      [radius*cos(cameraTheta)*sin(cameraAlpha),radius*sin(cameraTheta),-radius*cos(cameraTheta)*cos(cameraAlpha)],
      [0,0,0],
      [0,1,0]
      )

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    setPositionAttribute(gl, buffers, programInfo);
  
    setColorAttribute(gl, buffers, programInfo);
  
    // Tell WebGL which indices to use to index the vertices
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  
    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);
  
    // Set the shader uniforms
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.controlMatrix,
      false,
      controlMatrix
    );
    {
      const vertexCount = 36;
      const type = gl.UNSIGNED_SHORT;
      const offset = 0;
      gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }
  }
  
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 3;
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
    // 0 = use type and numComponents above
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }
  
  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  function setColorAttribute(gl, buffers, programInfo) {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexColor,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
  }
  
  export { drawScene };