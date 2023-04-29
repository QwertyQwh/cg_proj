import { InitShaderProgram } from "./utils"
function InitPrograms(gl,  vsSources, fsSources){
    const wire = InitShaderProgram(gl,vsSources.wire, fsSources.wire)
    const matcap = InitShaderProgram(gl,vsSources.matcap, fsSources.matcap)
    const flag = InitShaderProgram(gl,vsSources.flag, fsSources.flag)
    return {
        wire:wire,
        matcap: matcap,
        flag: flag
    }
}

function GenerateProgramInfo(gl, programs){
    const wireProgram = programs.wire
    const wireInfo = {
        program: wireProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(wireProgram, "aVertexPosition"),
            vertexNormal: gl.getAttribLocation(wireProgram, "aVertexNormal"),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(wireProgram,"uProjectionMatrix"),
          modelViewMatrix: gl.getUniformLocation(wireProgram, "uModelViewMatrix"),
          controlMatrix: gl.getUniformLocation(wireProgram, "uControlMatrix"),
          backgroundColor: gl.getUniformLocation(wireProgram,"uBackground"),
          uCameraPos: gl.getUniformLocation(wireProgram, "uCameraPos"),
        },
      };
      const matcapProgram = programs.matcap
      const matcapInfo = {
          program: matcapProgram,
          attribLocations: {
            vertexPosition: gl.getAttribLocation(matcapProgram, "aVertexPosition"),
            vertexNormal: gl.getAttribLocation(matcapProgram, "aVertexNormal"),
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
            uLightDirTop: gl.getUniformLocation(matcapProgram, "uLightDirTop"),
            uLightColorTop: gl.getUniformLocation(matcapProgram, "uLightColorTop"),
            uLightDirLeft: gl.getUniformLocation(matcapProgram, "uLightDirLeft"),
            uLightColorLeft: gl.getUniformLocation(matcapProgram, "uLightColorLeft"),
            uLightDirRight: gl.getUniformLocation(matcapProgram, "uLightDirRight"),
            uLightColorRight: gl.getUniformLocation(matcapProgram, "uLightColorRight"),
          },
        };
        const flagProgram = programs.flag
        const flagInfo = {
            program: flagProgram,
            attribLocations: {
              vertexPosition: gl.getAttribLocation(flagProgram, "aVertexPosition"),
              vertexNormal: gl.getAttribLocation(flagProgram, "aVertexNormal"),
            },
            uniformLocations: {
              projectionMatrix: gl.getUniformLocation(flagProgram,"uProjectionMatrix"),
              modelViewMatrix: gl.getUniformLocation(flagProgram, "uModelViewMatrix"),
              controlMatrix: gl.getUniformLocation(flagProgram, "uControlMatrix"),
              backgroundColor: gl.getUniformLocation(flagProgram,"uBackground"),
              fogStart: gl.getUniformLocation(flagProgram,"uFogStart"),
              fogHeight: gl.getUniformLocation(flagProgram,"uFogHeight"),
              uMatSampler: gl.getUniformLocation(flagProgram, "uMatSampler"),
              uCameraPos: gl.getUniformLocation(flagProgram, "uCameraPos"),
              uLightDirTop: gl.getUniformLocation(flagProgram, "uLightDirTop"),
              uLightColorTop: gl.getUniformLocation(flagProgram, "uLightColorTop"),
              uLightDirLeft: gl.getUniformLocation(flagProgram, "uLightDirLeft"),
              uLightColorLeft: gl.getUniformLocation(flagProgram, "uLightColorLeft"),
              uLightDirRight: gl.getUniformLocation(flagProgram, "uLightDirRight"),
              uLightColorRight: gl.getUniformLocation(flagProgram, "uLightColorRight"),
            },
          };
        return {
            wire:wireInfo,
            matcap: matcapInfo,
            flag: flagInfo
        }
}

export {InitPrograms, GenerateProgramInfo}