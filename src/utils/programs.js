import { InitShaderProgram } from "./utils"
function InitScenePrograms(gl,  vsSources, fsSources){
    const wire = InitShaderProgram(gl,vsSources.static, fsSources.wire)
    const matcap = InitShaderProgram(gl,vsSources.static, fsSources.matcap)
    const flagWire = InitShaderProgram(gl,vsSources.flag, fsSources.wire)
    const flagMatcap = InitShaderProgram(gl,vsSources.flag, fsSources.matcap)
    const cloudWire = InitShaderProgram(gl,vsSources.cloud, fsSources.wire)
    const cloudMatcap = InitShaderProgram(gl,vsSources.cloud, fsSources.matcap)
    const floorWire = InitShaderProgram(gl,vsSources.static,fsSources.wire)
    const floorMatcap = InitShaderProgram(gl,vsSources.static,fsSources.floor)
    return {
        wire:wire,
        matcap: matcap,
        flagWire: flagWire,
        flagMatcap: flagMatcap,
        cloudWire: cloudWire,
        cloudMatcap: cloudMatcap,
        floorWire: floorWire,
        floorMatcap: floorMatcap
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
          scaleMatrix: gl.getUniformLocation(wireProgram, "uScaleMatrix"),
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
          scaleMatrix: gl.getUniformLocation(flagWireProgram, "uScaleMatrix"),
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
          scaleMatrix: gl.getUniformLocation(cloudWireProgram, "uScaleMatrix"),
          rotationMatrix: gl.getUniformLocation(cloudWireProgram, "uRotationMatrix"),
              backgroundColor: gl.getUniformLocation(cloudWireProgram,"uBackground"),
              uCameraPos: gl.getUniformLocation(cloudWireProgram, "uCameraPos"),
              uTime: gl.getUniformLocation(cloudWireProgram,"uTime"),
            },
          };
          const floorWireProgram = programs.floorWire
          const floorWireInfo = {
              program: floorWireProgram,
              attribLocations: {
                vertexPosition: gl.getAttribLocation(floorWireProgram, "aVertexPosition"),
                  vertexNormal: gl.getAttribLocation(floorWireProgram, "aVertexNormal"),
              },
              uniformLocations: {
                projectionMatrix: gl.getUniformLocation(floorWireProgram,"uProjectionMatrix"),
                controlMatrix: gl.getUniformLocation(floorWireProgram, "uControlMatrix"),
                translationMatrix: gl.getUniformLocation(floorWireProgram, "uTranslationMatrix"),
          scaleMatrix: gl.getUniformLocation(floorWireProgram, "uScaleMatrix"),
          rotationMatrix: gl.getUniformLocation(floorWireProgram, "uRotationMatrix"),
                backgroundColor: gl.getUniformLocation(floorWireProgram,"uBackground"),
                uCameraPos: gl.getUniformLocation(floorWireProgram, "uCameraPos"),
                uTime: gl.getUniformLocation(floorWireProgram,"uTime"),
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
          scaleMatrix: gl.getUniformLocation(matcapProgram, "uScaleMatrix"),
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
          scaleMatrix: gl.getUniformLocation(flagMatcapProgram, "uScaleMatrix"),
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
          scaleMatrix: gl.getUniformLocation(cloudMatcapProgram, "uScaleMatrix"),
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
            const floorMatcapProgram = programs.floorMatcap
            const floorMatcapInfo = {
                program: floorMatcapProgram,
                attribLocations: {
                  vertexPosition: gl.getAttribLocation(floorMatcapProgram, "aVertexPosition"),
                  vertexNormal: gl.getAttribLocation(floorMatcapProgram, "aVertexNormal"),
                },
                uniformLocations: {
                  projectionMatrix: gl.getUniformLocation(floorMatcapProgram,"uProjectionMatrix"),
                  controlMatrix: gl.getUniformLocation(floorMatcapProgram, "uControlMatrix"),
                  translationMatrix: gl.getUniformLocation(floorMatcapProgram, "uTranslationMatrix"),
                  rotationMatrix: gl.getUniformLocation(floorMatcapProgram, "uRotationMatrix"),
          scaleMatrix: gl.getUniformLocation(floorMatcapProgram, "uScaleMatrix"),
          backgroundColor: gl.getUniformLocation(floorMatcapProgram,"uBackground"),
                  fogStart: gl.getUniformLocation(floorMatcapProgram,"uFogStart"),
                  fogHeight: gl.getUniformLocation(floorMatcapProgram,"uFogHeight"),
                  uMatSampler: gl.getUniformLocation(floorMatcapProgram, "uMatSampler"),
                  uCameraPos: gl.getUniformLocation(floorMatcapProgram, "uCameraPos"),
                  uLightDirTop: gl.getUniformLocation(floorMatcapProgram, "uLightDirTop"),
                  uLightColorTop: gl.getUniformLocation(floorMatcapProgram, "uLightColorTop"),
                  uLightDirLeft: gl.getUniformLocation(floorMatcapProgram, "uLightDirLeft"),
                  uLightColorLeft: gl.getUniformLocation(floorMatcapProgram, "uLightColorLeft"),
                  uLightDirRight: gl.getUniformLocation(floorMatcapProgram, "uLightDirRight"),
                  uLightColorRight: gl.getUniformLocation(floorMatcapProgram, "uLightColorRight"),
                  uTime: gl.getUniformLocation(floorMatcapProgram,"uTime"),
              },
              };
        return {
            wire: [wireInfo,flagWireInfo,cloudWireInfo,floorWireInfo],
            matcap: [matcapInfo,flagMatcapInfo,cloudMatcapInfo,floorMatcapInfo],
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
          scaleMatrix: gl.getUniformLocation(bwProgram, "uScaleMatrix"),
          rotationMatrix: gl.getUniformLocation(bwProgram, "uRotationMatrix"),
            uTime: gl.getUniformLocation(bwProgram,"uTime"),
        },
        };
      return bwInfo
}


export {InitScenePrograms, GenerateSceneProgramInfo,InitCloudPrograms,GenerateCloudProgramInfo }