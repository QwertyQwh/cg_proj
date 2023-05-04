import { mat4,vec4,vec3 } from "gl-matrix";
import { cos,pi,sin } from "mathjs";
import { GetCameraMatrix } from "./camera";
import { settings } from "./settings";
import { ProperMod } from "./utils/utils";

function drawClouds(gl, programInfo, buffer, parameters) {
    gl.clearColor(0., 0., 0., 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT );
    const projectionMatrix = GetCameraMatrix(gl,true,settings.cloud.bound*1.6,1.);
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
    const scaleMatrix = mat4.create()
    mat4.translate(
      translationMatrix,
      translationMatrix,
      [parameters.elapse*settings.cloud.speed,0,0]
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
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.indices);

          const instances = parameters.curGeometries.instance['cloud']
          instances.forEach((val) => {
            mat4.identity(translationMatrix)
            mat4.translate(
              translationMatrix,
              translationMatrix,
              [ProperMod(val.translation[0] + parameters.elapse*settings.cloud.speed+settings.cloud.bound*1.6,settings.cloud.bound*3.2) -settings.cloud.bound*1.6,val.translation[1],val.translation[2]]
              )
              mat4.identity(scaleMatrix)
              mat4.scale(scaleMatrix,scaleMatrix,val.scale)
              gl.uniformMatrix4fv(
                programInfo.uniformLocations.scaleMatrix,
                false,
                scaleMatrix
              );
          gl.uniformMatrix4fv(
            programInfo.uniformLocations.translationMatrix,
            false,
            translationMatrix
          );
          gl.drawElements(gl.TRIANGLES, buffer.vertexCount, type, offset);
        });
      // matcap only stuff
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