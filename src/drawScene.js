import { mat4,vec4,vec3 } from "gl-matrix";
import { cos,pi,sin } from "mathjs";
import { GetCameraMatrix } from "./camera";
import { settings } from "./settings";
import { ProperMod } from "./utils/utils";

function drawScene(gl, programInfos, buffers, parameters, shaderMode) {
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clearColor(parameters.palette.background[0], parameters.palette.background[1], parameters.palette.background[2], 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST); 
    gl.depthFunc(gl.LESS); 
    // Clear the canvas before we start drawing on it.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    const projectionMatrix = GetCameraMatrix(gl,parameters.isOrtho,parameters.radius/2.0/1.4);
    const type = gl.UNSIGNED_INT;
    const offset = 0;
    const background = vec4.create()
      vec4.set(background,parameters.palette.background[0], parameters.palette.background[1], parameters.palette.background[2], 1.0)
    const controlMatrix = mat4.create();
    const cameraPos = [parameters.radius*cos(parameters.cameraTheta)*sin(parameters.cameraAlpha),parameters.radius*sin(parameters.cameraTheta),-parameters.radius*cos(parameters.cameraTheta)*cos(parameters.cameraAlpha)]
    cameraPos[0]+= parameters.characterPos[0] 
    cameraPos[1]+= parameters.characterPos[1] 
    cameraPos[2]+= parameters.characterPos[2] 
    mat4.lookAt(
      controlMatrix,
      cameraPos,
      parameters.characterPos,
      // [0,0,0],
      [0,1,0]
      )
      const camera = vec3.create()
    vec3.set(camera, cameraPos[0],cameraPos[1],cameraPos[2])
    vec3.normalize(camera,camera);
    const rotationMatrix = mat4.create()

      const translationMatrix = mat4.create()
      const scaleMatrix = mat4.create()

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    for(let i = 0; i<parameters.curGeometries.geometries.length; i++){
      if(i == 2){// I've decided not to render the clouds, only their shadows
        continue
      }
      const programInfo = programInfos[parameters.curGeometries.programs[i]]
      const buffer = buffers[parameters.curGeometries.geometries[i]]

      const instances = parameters.curGeometries.instance[parameters.curGeometries.geometries[i]]

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

      gl.uniform4fv(
        programInfo.uniformLocations.backgroundColor,
        background
      );
  
      gl.uniform3fv(
        programInfo.uniformLocations.uCameraPos,
        camera
      )
      gl.uniform1f(
        programInfo.uniformLocations.uTime,
        parameters.elapse
      )
      // matcap only stuff
      switch(shaderMode){
        case 'Solid':
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
              mat4.identity(translationMatrix)
              mat4.identity(scaleMatrix)
              mat4.identity(rotationMatrix)
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
              if(instances){
            instances.forEach((val) => {
              mat4.identity(translationMatrix)
              mat4.identity(rotationMatrix)
              mat4.identity(scaleMatrix)
              if(i == 2){
                  mat4.translate(
                    translationMatrix,
                    translationMatrix,
                    [ProperMod(val.translation[0] + parameters.elapse*settings.cloud.speed+settings.cloud.bound*1.3,settings.cloud.bound*2) -settings.cloud.bound,val.translation[1],val.translation[2]]
                  )
                }else{
                  mat4.translate(
                    translationMatrix,
                    translationMatrix,
                    val.translation
                    )
                }
                mat4.rotate(
                rotationMatrix,
                rotationMatrix,
                val.rotateY??0,
                [0,1,0])
                mat4.scale(scaleMatrix,scaleMatrix,val.scale)
                
              gl.uniformMatrix4fv(
                programInfo.uniformLocations.translationMatrix,
                false,
                translationMatrix
              );
              gl.uniformMatrix4fv(
                programInfo.uniformLocations.rotationMatrix,
                false,
                rotationMatrix
              );
              gl.uniformMatrix4fv(
                programInfo.uniformLocations.scaleMatrix,
                false,
                scaleMatrix
              );
              gl.drawElements(gl.TRIANGLES, buffer.vertexCount, type, offset);
            });
          }else{
    
            gl.drawElements(gl.TRIANGLES, buffer.vertexCount, type, offset);
          }
          break;
        case 'Wire':
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.wireIndices);
          mat4.identity(translationMatrix)
          mat4.identity(rotationMatrix)
          mat4.identity(scaleMatrix)
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
          if(instances){
            instances.forEach((val) => {
              mat4.identity(translationMatrix)
              mat4.identity(rotationMatrix)
              mat4.identity(scaleMatrix)
              if(i == 2){
                  mat4.translate(
                    translationMatrix,
                    translationMatrix,
                    [ProperMod(val.translation[0] + parameters.elapse*settings.cloud.speed+settings.cloud.bound*1.3,settings.cloud.bound*2) -settings.cloud.bound,val.translation[1],val.translation[2]]
                  )
                }else{
                  mat4.translate(
                    translationMatrix,
                    translationMatrix,
                    val.translation
                    )
                }
                mat4.rotate(
                rotationMatrix,
                rotationMatrix,
                val.rotateY??0,
                [0,1,0])
                mat4.scale(scaleMatrix,scaleMatrix,val.scale)
              gl.uniformMatrix4fv(
                programInfo.uniformLocations.translationMatrix,
                false,
                translationMatrix
              );
              gl.uniformMatrix4fv(
                programInfo.uniformLocations.rotationMatrix,
                false,
                rotationMatrix
              );
              gl.uniformMatrix4fv(
                programInfo.uniformLocations.scaleMatrix,
                false,
                scaleMatrix
              );
              gl.drawElements(gl.LINES, buffer.wireCount, type, offset);
            });
          }else{
            gl.drawElements(gl.LINES, buffer.wireCount, type, offset);
          }
          break;
      }

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