import { InitShaderProgram } from "./utils"
function InitScenePrograms(gl,  vsSources, fsSources){
    const wire = InitShaderProgram(gl,vsSources.static, fsSources.wire)
    const matcap = InitShaderProgram(gl,vsSources.static, fsSources.matcap)
    const flagWire = InitShaderProgram(gl,vsSources.flag, fsSources.wire)
    const flagMatcap = InitShaderProgram(gl,vsSources.flag, fsSources.matcap)
    const cloudWire = InitShaderProgram(gl,vsSources.cloud, fsSources.wire)
    const cloudMatcap = InitShaderProgram(gl,vsSources.cloud, fsSources.matcap)
    return {
        wire:wire,
        matcap: matcap,
        flagWire: flagWire,
        flagMatcap: flagMatcap,
        cloudWire: cloudWire,
        cloudMatcap: cloudMatcap
    }
}

function GenerateSceneProgramInfo(gl, programs){
    const wireProgram = programs.wire
    const wireInfo = {
        program: wireProgram,
        attribLocations: {
          vertexPosition: gl.getAttribLocation(wireProgram, "aVertexPosition"),
            vertexNormal: gl.getAttribLocation(wireProgram, "aVertexNormal"),
        },
        uniformLocations: {
          projectionMatrix: gl.getUniformLocation(wireProgram,"uProjectionMatrix"),
          controlMatrix: gl.getUniformLocation(wireProgram, "uControlMatrix"),
          translationMatrix: gl.getUniformLocation(wireProgram, "uTranslationMatrix"),
          rotationMatrix: gl.getUniformLocation(wireProgram, "uRotationMatrix"),
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
            controlMatrix: gl.getUniformLocation(flagWireProgram, "uControlMatrix"),
            translationMatrix: gl.getUniformLocation(flagWireProgram, "uTranslationMatrix"),
            rotationMatrix: gl.getUniformLocation(flagWireProgram, "uRotationMatrix"),
            backgroundColor: gl.getUniformLocation(flagWireProgram,"uBackground"),
            uCameraPos: gl.getUniformLocation(flagWireProgram, "uCameraPos"),
            uTime: gl.getUniformLocation(flagWireProgram,"uTime"),
          },
        };
        const cloudWireProgram = programs.cloudWire
        const cloudWireInfo = {
            program: cloudWireProgram,
            attribLocations: {
              vertexPosition: gl.getAttribLocation(cloudWireProgram, "aVertexPosition"),
                vertexNormal: gl.getAttribLocation(cloudWireProgram, "aVertexNormal"),
            },
            uniformLocations: {
              projectionMatrix: gl.getUniformLocation(cloudWireProgram,"uProjectionMatrix"),
              controlMatrix: gl.getUniformLocation(cloudWireProgram, "uControlMatrix"),
              translationMatrix: gl.getUniformLocation(cloudWireProgram, "uTranslationMatrix"),
              rotationMatrix: gl.getUniformLocation(cloudWireProgram, "uRotationMatrix"),
              backgroundColor: gl.getUniformLocation(cloudWireProgram,"uBackground"),
              uCameraPos: gl.getUniformLocation(cloudWireProgram, "uCameraPos"),
              uTime: gl.getUniformLocation(cloudWireProgram,"uTime"),
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
            controlMatrix: gl.getUniformLocation(matcapProgram, "uControlMatrix"),
            translationMatrix: gl.getUniformLocation(matcapProgram, "uTranslationMatrix"),
            rotationMatrix: gl.getUniformLocation(matcapProgram, "uRotationMatrix"),
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
              controlMatrix: gl.getUniformLocation(flagMatcapProgram, "uControlMatrix"),
              translationMatrix: gl.getUniformLocation(flagMatcapProgram, "uTranslationMatrix"),
              rotationMatrix: gl.getUniformLocation(flagMatcapProgram, "uRotationMatrix"),
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
          const cloudMatcapProgram = programs.cloudMatcap
          const cloudMatcapInfo = {
              program: cloudMatcapProgram,
              attribLocations: {
                vertexPosition: gl.getAttribLocation(cloudMatcapProgram, "aVertexPosition"),
                vertexNormal: gl.getAttribLocation(cloudMatcapProgram, "aVertexNormal"),
              },
              uniformLocations: {
                projectionMatrix: gl.getUniformLocation(cloudMatcapProgram,"uProjectionMatrix"),
                controlMatrix: gl.getUniformLocation(cloudMatcapProgram, "uControlMatrix"),
                translationMatrix: gl.getUniformLocation(cloudMatcapProgram, "uTranslationMatrix"),
                rotationMatrix: gl.getUniformLocation(cloudMatcapProgram, "uRotationMatrix"),
                backgroundColor: gl.getUniformLocation(cloudMatcapProgram,"uBackground"),
                fogStart: gl.getUniformLocation(cloudMatcapProgram,"uFogStart"),
                fogHeight: gl.getUniformLocation(cloudMatcapProgram,"uFogHeight"),
                uMatSampler: gl.getUniformLocation(cloudMatcapProgram, "uMatSampler"),
                uCameraPos: gl.getUniformLocation(cloudMatcapProgram, "uCameraPos"),
                uLightDirTop: gl.getUniformLocation(cloudMatcapProgram, "uLightDirTop"),
                uLightColorTop: gl.getUniformLocation(cloudMatcapProgram, "uLightColorTop"),
                uLightDirLeft: gl.getUniformLocation(cloudMatcapProgram, "uLightDirLeft"),
                uLightColorLeft: gl.getUniformLocation(cloudMatcapProgram, "uLightColorLeft"),
                uLightDirRight: gl.getUniformLocation(cloudMatcapProgram, "uLightDirRight"),
                uLightColorRight: gl.getUniformLocation(cloudMatcapProgram, "uLightColorRight"),
                uTime: gl.getUniformLocation(cloudMatcapProgram,"uTime"),
            },
            };
        return {
            wire: [wireInfo,flagWireInfo,cloudWireInfo],
            matcap: [matcapInfo,flagMatcapInfo,cloudMatcapInfo],
        }
}

function InitCloudPrograms(gl,  vsSources, fsSources){
  const bw = InitShaderProgram(gl,vsSources.cloud, fsSources.white)
  return bw
}
function GenerateCloudProgramInfo(gl, program){
      const bwProgram = program
      const bwInfo = {
          program: bwProgram,
          attribLocations: {
            vertexPosition: gl.getAttribLocation(bwProgram, "aVertexPosition"),
            vertexNormal: gl.getAttribLocation(bwProgram, "aVertexNormal"),
          },
          uniformLocations: {
            projectionMatrix: gl.getUniformLocation(bwProgram,"uProjectionMatrix"),
            controlMatrix: gl.getUniformLocation(bwProgram, "uControlMatrix"),
            translationMatrix: gl.getUniformLocation(bwProgram, "uTranslationMatrix"),
            rotationMatrix: gl.getUniformLocation(bwProgram, "uRotationMatrix"),
            uTime: gl.getUniformLocation(bwProgram,"uTime"),
        },
        };
      return bwInfo
}


export {InitScenePrograms, GenerateSceneProgramInfo,InitCloudPrograms,GenerateCloudProgramInfo }