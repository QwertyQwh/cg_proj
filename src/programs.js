import { InitShaderProgram } from "./utils"
function InitPrograms(gl,  vsSources, fsSources){
    const wire = InitShaderProgram(gl,vsSources.wire, fsSources.wire)
    const matcap = InitShaderProgram(gl,vsSources.matcap, fsSources.matcap)
    return {
        wire:wire,
        matcap: matcap,
    }
}

function GenerateProgramInfo(gl, programs){
    const wireProgram = programs.wire
    const wireInfo = {
        program: wireProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(wireProgram, "aVertexPosition"),
          vertexColor: gl.getAttribLocation(wireProgram, "aVertexColor"),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(wireProgram,"uProjectionMatrix"),
          modelViewMatrix: gl.getUniformLocation(wireProgram, "uModelViewMatrix"),
          controlMatrix: gl.getUniformLocation(wireProgram, "uControlMatrix"),
        },
      };
      const matcapProgram = programs.matcap
      const matcapInfo = {
          program: matcapProgram,
          attribLocations: {
            vertexPosition: gl.getAttribLocation(matcapProgram, "aVertexPosition"),
            vertexColor: gl.getAttribLocation(matcapProgram, "aVertexColor"),
          },
          uniformLocations: {
            projectionMatrix: gl.getUniformLocation(matcapProgram,"uProjectionMatrix"),
            modelViewMatrix: gl.getUniformLocation(matcapProgram, "uModelViewMatrix"),
            controlMatrix: gl.getUniformLocation(matcapProgram, "uControlMatrix"),
            backgroundColor: gl.getUniformLocation(matcapProgram,"uBackground"),
            fogStart: gl.getUniformLocation(matcapProgram,"uFogStart"),
            fogHeight: gl.getUniformLocation(matcapProgram,"uFogHeight"),
            uMatSampler: gl.getUniformLocation(matcapProgram, "uMatSampler"),
            uCameraPos: gl.getUniformLocation(matcapProgram, "uCameraPos"),
          },
        };
        return {
            wire:wireInfo,
            matcap: matcapInfo,
        }
}

export {InitPrograms, GenerateProgramInfo}