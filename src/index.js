import './style.css'
import vert from './shaders/vert'
import frag from './shaders/frag'
import { initShaderProgram,ResizeCanvas } from './utils'
import { initBuffers } from './cube_s'
import { drawScene } from './drawscene'
import { max,min } from 'mathjs'

const PI = 3.1415926
let deltaTime = 0
const accumulated = {theta:0,alpha:0};
const cursorAnchor = {x:0,y:0};
const diff = {alpha:0,theta:0};
let isDown = false;
const windowSize = {x:window.innerWidth,y:window.innerHeight}
let parameters = {
  isOrtho: false,
  cameraTheta: 0,
  cameraAlpha:0,
  cameraRaiuds :3,
  radius: 3
}

function SubsribeToEvents(){
  // Mouse Events
  window.addEventListener('resize', function(event){
    windowSize.x = window.innerWidth
    windowSize.y = window.innerHeight
  });
  window.addEventListener("mouseup",(event)=>{
    isDown = false
    accumulated.alpha += diff.alpha
    accumulated.theta += diff.theta
    accumulated.theta = max(min(accumulated.theta,PI/2),-PI/2)
    diff.alpha = 0
    diff.theta = 0
  })
  window.addEventListener('mousedown',(event)=>{
    event.preventDefault();
    cursorAnchor.x = event.clientX/windowSize.x
    cursorAnchor.y = event.clientY/windowSize.y
    isDown = true;
  })
  window.addEventListener('mousemove',(event)=>{
    event.preventDefault();
    if(isDown){
      diff.alpha = (event.clientX/windowSize.x-cursorAnchor.x)*2
      diff.theta = (event.clientY/windowSize.y-cursorAnchor.y)*2
    }
  })
  window.addEventListener("wheel", event => {
    event.preventDefault()
    const delta = Math.sign(event.deltaY);
    if(parameters.radius+delta >0){
      parameters.radius += delta
    }
  },{passive:false});
}



function main() {
  SubsribeToEvents()
  const canvas = document.querySelector("canvas#gl");
  const button = document.querySelector("button#renderMode");
  button.onclick = (val)=>{
    parameters.isOrtho = !parameters.isOrtho
    button.textContent = parameters.isOrtho? "Orthographic" : "Perspective"
  }
  button.textContent = parameters.isOrtho? "Orthographic" : "Perspective"

  const gl = canvas.getContext("webgl");
  // This is to prevent pixel size mismatch
  ResizeCanvas(gl.canvas);
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  // Support check
  if (gl === null) {
    alert(
      "WebGL not supported."
    );
    return;
  }
  //Background Color
  gl.clearColor(1.0, 0.0, 1.0, 1.0);
  //Clear with the color above.
  gl.clear(gl.COLOR_BUFFER_BIT);
  // Call some utility function to initialize the program
  const shaderProgram = initShaderProgram(gl, vert, frag);
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
      vertexColor: gl.getAttribLocation(shaderProgram, "aVertexColor"),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
      controlMatrix: gl.getUniformLocation(shaderProgram, "uControlMatrix"),
    },
  };


  const buffers = initBuffers(gl);
  let then = 0;
  function render(now) {
    now *= 0.001; 
    deltaTime = now - then;
    then = now;
    parameters.cameraTheta = max(min(accumulated.theta+diff.theta,PI/2),-PI/2)
    parameters.cameraAlpha = accumulated.alpha+diff.alpha
    drawScene(gl, programInfo, buffers, parameters);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


main();