import { mat4 } from "gl-matrix";

const fieldOfView = 0.25* Math.PI; // in radians
const zNear = 0.1;
const zFar = 100.0;
const projectionMatrix = mat4.create();

function GetCameraMatrix(gl,isOrtho,bound){
    const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    if(!isOrtho){
      mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
    }else{
      mat4.ortho(projectionMatrix, -bound*aspect , bound*aspect,-bound,bound,zNear,zFar)
    }
    return projectionMatrix
}

export {GetCameraMatrix}