import { mat4,vec4 } from "gl-matrix";
import { cos,sin } from "mathjs";
import {palette} from "./palette";

function drawScene(gl, programInfo, buffers, parameters, shaderMode) {
    gl.clearColor(palette.background[0], palette.background[1], palette.background[2], 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const fieldOfView = 0.25* Math.PI; // in radians
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const zNear = 0.1;
    const zFar = 100.0;
    const projectionMatrix = mat4.create();
    const bound = 8
    if(!parameters.isOrtho){
      mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    }else{
      mat4.ortho(projectionMatrix, -bound*aspect , bound*aspect,-bound,bound,zNear,zFar)
    }

    const modelViewMatrix = mat4.create();
    const controlMatrix = mat4.create();
    const cameraPos = [parameters.radius*cos(parameters.cameraTheta)*sin(parameters.cameraAlpha),parameters.radius*sin(parameters.cameraTheta),-parameters.radius*cos(parameters.cameraTheta)*cos(parameters.cameraAlpha)]
    mat4.lookAt(
      controlMatrix,
      cameraPos,
      [0,0,0],
      [0,1,0]
      )

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    setPositionAttribute(gl, buffers, programInfo);

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
    const vertexCount = buffers.vertexCount;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    // matcap only stuff
    switch(shaderMode){
      case 'matcap':
        const background = vec4.create()
        vec4.set(background,palette.background[0], palette.background[1], palette.background[2], 1.0)
        gl.uniform4fv(
          programInfo.uniformLocations.backgroundColor,
          background
        );
        gl.uniform1f(
          programInfo.uniformLocations.fogStart,
          0,
        )
        gl.uniform1f(
          programInfo.uniformLocations.fogHeight,
          5,
        )
        gl.uniform3f(
          programInfo.uniformLocations.uCameraPos,
          cameraPos[0],cameraPos[1],cameraPos[2]
        )
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        break;
      case 'wire':
        gl.drawElements(gl.LINE_STRIP, vertexCount, type, offset);
        break;
    }

    //TODO: need to way to compute thiss

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

  function setTextureAttribute(gl, buffers, programInfo) {
    const num = 2; // every coordinate composed of 2 values
    const type = gl.FLOAT; // the data in the buffer is 32-bit float
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set to the next
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      num,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
  }

  export { drawScene };