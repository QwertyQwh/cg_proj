import { mat4 } from "gl-matrix";

const fieldOfView = 0.25* Math.PI; // in radians
// Some tricks to make the orthographic one look close enough without cutting off the geometries
const zNearP = .5;
const zNearO = -20.;
const zFar = 300.0;
const projectionMatrix = mat4.create();

function GetCameraMatrix(gl,isOrtho,bound,aspect){
    if(!aspect){
      aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    }
    if(!isOrtho){
      mat4.perspective(projectionMatrix, fieldOfView, aspect, zNearP, zFar);
    }else{
      mat4.ortho(projectionMatrix, -bound*aspect , bound*aspect,-bound,bound,zNearO,zFar)
    }
    return projectionMatrix
}

export {GetCameraMatrix}