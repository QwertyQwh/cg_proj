import { InitShaderProgram } from "./utils"
function InitPrograms(gl,  vsSources, fsSources){
    const wire = InitShaderProgram(gl,vsSources.static, fsSources.wire)
    const matcap = InitShaderProgram(gl,vsSources.static, fsSources.matcap)
    const flagWire = InitShaderProgram(gl,vsSources.flag, fsSources.wire)
    const flagMatcap = InitShaderProgram(gl,vsSources.flag, fsSources.matcap)
    return {
        wire:wire,
        matcap: matcap,
        flagWire: flagWire,
        flagMatcap: flagMatcap
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
          transformMatrix: gl.getUniformLocation(wireProgram, "uTransformMatrix"),
          backgroundColor: gl.getUniformLocation(wireProgram,"uBackground"),
          uCameraPos: gl.getUniformLocation(wireProgram, "uCameraPos"),
          uTime: gl.getUniformLocation(wireProgram,"uTime"),
        },
      };
      const flagWireProgram = programs.flagWire
      const flagWireInfo = {
          program: flagWireProgram,
          attribLocations: {
            vertexPosition: gl.getAttribLocation(flagWireProgram, "aVertexPosition"),
              vertexNormal: gl.getAttribLocation(flagWireProgram, "aVertexNormal"),
          },
          uniformLocations: {
            projectionMatrix: gl.getUniformLocation(flagWireProgram,"uProjectionMatrix"),
            modelViewMatrix: gl.getUniformLocation(flagWireProgram, "uModelViewMatrix"),
            controlMatrix: gl.getUniformLocation(flagWireProgram, "uControlMatrix"),
            transformMatrix: gl.getUniformLocation(flagWireProgram, "uTransformMatrix"),
            backgroundColor: gl.getUniformLocation(flagWireProgram,"uBackground"),
            uCameraPos: gl.getUniformLocation(flagWireProgram, "uCameraPos"),
            uTime: gl.getUniformLocation(flagWireProgram,"uTime"),
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
            transformMatrix: gl.getUniformLocation(matcapProgram, "uTransformMatrix"),
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
            uTime: gl.getUniformLocation(matcapProgram,"uTime"),
        },
        };
        const flagMatcapProgram = programs.flagMatcap
        const flagMatcapInfo = {
            program: flagMatcapProgram,
            attribLocations: {
              vertexPosition: gl.getAttribLocation(flagMatcapProgram, "aVertexPosition"),
              vertexNormal: gl.getAttribLocation(flagMatcapProgram, "aVertexNormal"),
            },
            uniformLocations: {
              projectionMatrix: gl.getUniformLocation(flagMatcapProgram,"uProjectionMatrix"),
              modelViewMatrix: gl.getUniformLocation(flagMatcapProgram, "uModelViewMatrix"),
              controlMatrix: gl.getUniformLocation(flagMatcapProgram, "uControlMatrix"),
              transformMatrix: gl.getUniformLocation(flagMatcapProgram, "uTransformMatrix"),
              backgroundColor: gl.getUniformLocation(flagMatcapProgram,"uBackground"),
              fogStart: gl.getUniformLocation(flagMatcapProgram,"uFogStart"),
              fogHeight: gl.getUniformLocation(flagMatcapProgram,"uFogHeight"),
              uMatSampler: gl.getUniformLocation(flagMatcapProgram, "uMatSampler"),
              uCameraPos: gl.getUniformLocation(flagMatcapProgram, "uCameraPos"),
              uLightDirTop: gl.getUniformLocation(flagMatcapProgram, "uLightDirTop"),
              uLightColorTop: gl.getUniformLocation(flagMatcapProgram, "uLightColorTop"),
              uLightDirLeft: gl.getUniformLocation(flagMatcapProgram, "uLightDirLeft"),
              uLightColorLeft: gl.getUniformLocation(flagMatcapProgram, "uLightColorLeft"),
              uLightDirRight: gl.getUniformLocation(flagMatcapProgram, "uLightDirRight"),
              uLightColorRight: gl.getUniformLocation(flagMatcapProgram, "uLightColorRight"),
              uTime: gl.getUniformLocation(flagMatcapProgram,"uTime"),
          },
          };
        return {
            wire: [wireInfo,flagWireInfo],
            matcap: [matcapInfo,flagMatcapInfo],
        }
}

export {InitPrograms, GenerateProgramInfo}