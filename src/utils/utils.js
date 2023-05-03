import { settings } from "../settings";

function ProperMod(x,y){
  if(x>=0){
      return x%y
  }else{
      return x%y+y;
  }
}

function loadShader(gl, type, source) {
  const shader = gl.createShader(type);  
  gl.shaderSource(shader, source);
  // Compile the shader
  gl.compileShader(shader);
  // Check status
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    var compilationLog = gl.getShaderInfoLog(shader);
    console.error('Shader compiler log: ' + compilationLog);
    gl.deleteShader(shader);
    return null;
  }
  return shader
}

function InitShaderProgram(gl, vsSource, fsSource) {
    // Create a vertex shader
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    // Create a fragment shader
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    // Create the program
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    return shaderProgram;
}



function ResizeCanvas(canvas) {
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    const needResize = canvas.width  !== displayWidth ||
                       canvas.height !== displayHeight;
    if (needResize) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
    return needResize;
}

function Interpolate(x,y,ratio){
  if(Math.abs(x-y)<0.01){
    return x;
  }
  return x*ratio+y*(1-ratio)
}

function maze2world(i,j,h){
  const x=  mazei2worldx(i)
  const z = mazej2worldz(j)
  const y = mazeh2worldy(h)
  return {x,y,z}
}

function mazei2worldx(i){
  const x = (i-settings.mazeParams.width*.5+.5)*settings.blockParams.size
  return x;
}

function mazej2worldz(j){
  const z = (j-settings.mazeParams.height*.5+.5)*settings.blockParams.size
  return z;
}

function mazeh2worldy(h){
  const y = (settings.blockParams.baseHeight+settings.blockParams.heightModifier*h)*settings.blockParams.size
  return y
}

export  {InitShaderProgram ,ResizeCanvas,Interpolate,ProperMod,maze2world,mazeh2worldy,mazei2worldx,mazej2worldz}