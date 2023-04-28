import { mat4,vec4,vec3 } from "gl-matrix";
import { cos,sin } from "mathjs";
import { GetCameraMatrix } from "./camera";

function drawScene(gl, programInfo, buffers, parameters, shaderMode) {
    gl.clearColor(parameters.palette.background[0], parameters.palette.background[1], parameters.palette.background[2], 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST); // Enable depth testing
    gl.depthFunc(gl.LEQUAL); // Near things obscure far things
    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const buffer = buffers[parameters.model]
    const projectionMatrix = GetCameraMatrix(gl,parameters.isOrtho,parameters.radius/2.0/1.4);


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
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix
    );
    gl.uniformMatrix4fv(
      programInfo.uniformLocations.controlMatrix,
      false,
      controlMatrix
    );
    const type = gl.UNSIGNED_INT;
    const offset = 0;
    const background = vec4.create()
    vec4.set(background,parameters.palette.background[0], parameters.palette.background[1], parameters.palette.background[2], 1.0)
    gl.uniform4fv(
      programInfo.uniformLocations.backgroundColor,
      background
    );
    const camera = vec3.create()
    vec3.set(camera, cameraPos[0],cameraPos[1],cameraPos[2])
    vec3.normalize(camera,camera);
    gl.uniform3fv(
      programInfo.uniformLocations.uCameraPos,
      camera
    )
    // matcap only stuff
    switch(shaderMode){
      case 'matcap':
        gl.uniform1f(
          programInfo.uniformLocations.fogStart,
          parameters.fogStart,
        )
        gl.uniform1f(
          programInfo.uniformLocations.fogHeight,
          parameters.fogHeight,
        )

        gl.uniform3f(
          programInfo.uniformLocations.uLightDirTop,
          parameters.lights.top.direction[0],parameters.lights.top.direction[1],parameters.lights.top.direction[2]
        )
        gl.uniform4f(
          programInfo.uniformLocations.uLightColorTop,
          parameters.lights.top.color[0],parameters.lights.top.color[1],parameters.lights.top.color[2],1.
        )
        gl.uniform3f(
          programInfo.uniformLocations.uLightDirLeft,
          parameters.lights.left.direction[0],parameters.lights.left.direction[1],parameters.lights.left.direction[2]
        )
        gl.uniform4f(
          programInfo.uniformLocations.uLightColorLeft,
          parameters.lights.left.color[0],parameters.lights.left.color[1],parameters.lights.left.color[2],1.
        )
        gl.uniform3f(
          programInfo.uniformLocations.uLightDirRight,
          parameters.lights.right.direction[0],parameters.lights.right.direction[1],parameters.lights.right.direction[2]
        )
        gl.uniform4f(
          programInfo.uniformLocations.uLightColorRight,
          parameters.lights.right.color[0],parameters.lights.right.color[1],parameters.lights.right.color[2],1.
        )
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indices);
        gl.drawElements(gl.TRIANGLES, buffer.vertexCount, type, offset);
        break;
      case 'wire':
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.wireIndices);
        gl.drawElements(gl.LINES, buffer.wireCount, type, offset);
        break;
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

  export { drawScene };