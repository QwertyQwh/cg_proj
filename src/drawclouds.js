import { mat4,vec4,vec3 } from "gl-matrix";
import { cos,pi,sin } from "mathjs";
import { GetCameraMatrix } from "./camera";
import { settings } from "./settings";

function drawClouds(gl, programInfo, buffer, parameters) {
    gl.clearColor(0., 0., 0., 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT );
    const projectionMatrix = GetCameraMatrix(gl,true,settings.shadow.bound,1.);
    const type = gl.UNSIGNED_INT;
    const offset = 0;
    const controlMatrix = mat4.create();
    mat4.rotateX(
      controlMatrix,
      controlMatrix,
      -pi*.5
    )
    // const cameraPos = [50,50,-]
    // mat4.lookAt(
    //   controlMatrix,
    //   cameraPos,
    //   [0,0,0],
    //   [0,1,0]
    //   )
    const rotationMatrix = mat4.create()
    const translationMatrix = mat4.create()
    
    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
      setPositionAttribute(gl, buffer, programInfo);
      setNormalAttribute(gl,buffer,programInfo);
      // Tell WebGL to use our program when drawing
      gl.useProgram(programInfo.program);
      // Set the shader uniforms
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.projectionMatrix,
        false,
        projectionMatrix
      );
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.controlMatrix,
        false,
        controlMatrix
      );
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.rotationMatrix,
        false,
        rotationMatrix
      );
      gl.uniformMatrix4fv(
        programInfo.uniformLocations.translationMatrix,
        false,
        translationMatrix
      );
      gl.uniform1f(
        programInfo.uniformLocations.uTime,
        parameters.elapse
      )
      // matcap only stuff
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indices);
      gl.drawElements(gl.TRIANGLES, buffer.vertexCount, type, offset);
  }

  function setPositionAttribute(gl, buffers, programInfo) {
    const numComponents = 3;
    const type = gl.FLOAT; // the data in the buffer is 32bit floats
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set of values to the next
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

  function setNormalAttribute(gl, buffers, programInfo) {
    const numComponents = 3;
    const type = gl.FLOAT; 
    const normalize = false; 
    const stride = 0; 
    const offset = 0; 
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normals);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexNormal,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexNormal);
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

  export { drawClouds };