import { abs } from "mathjs";
import { settings } from "../settings";

const threshold = 0.001

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

function maze2worldByNode(maze,i,j){

  return maze2world(i,j,maze.nodes[i][j].indices.h-maze.nodes[i][j].ascending*.5- (maze.nodes[i][j].pavilion?0.45:0))
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

function Aprox(a,b){
  if(abs(a-b)>threshold){
    return false
  }
  return true
}

function IsMazeIndexValid(i,j){
  return  i>=0 && i<settings.mazeParams.width && j>= 0 && j<settings.mazeParams.height &&  !settings.mazeParams.hollowCondition(i,j)
}

function IsDirMovable(node, [diri,dirj]){
  const left = diri<0
  const right = diri>0
  const forward = dirj>0
  const backward = dirj<0
  if(left && node.path["left"]){
    return true 
  }
  if(right && node.path["right"]){
    return true 
  }
  if(forward && node.path["forward"]){
    return true 
  }
  if(backward && node.path["backward"]){
    return true 
  }
  return false
}

const MobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

export  {InitShaderProgram ,ResizeCanvas,Interpolate,ProperMod,maze2world,mazeh2worldy,mazei2worldx,mazej2worldz,Aprox,maze2worldByNode,IsMazeIndexValid,IsDirMovable,MobileCheck}