import { floor, pi } from "mathjs"
import { ProperMod } from "./utils/utils"

const movementVectors = [[0,0,-1],[-1,0,0],[0,0,1],[1,0,0]]

const arrowHandler = (key,parameters)=>{
    const vec = GetMovementVector(parameters.cameraAlpha,key)
    parameters.characterPos[0]+= vec[0]
    parameters.characterPos[1]+= vec[1]
    parameters.characterPos[2]+= vec[2]
}

function GetMovementVector(alpha,dir){
    let dirOffset = 0
    switch(dir){
        case "ArrowDown":
            dirOffset = 0
            break;
        case "ArrowRight":
            dirOffset = 1
            break;
        case "ArrowUp":
            dirOffset = 2
            break;
        case "ArrowLeft":
            dirOffset = 3
            break;
        default:
            return [0,0,0];
    }
    const cameraOffset = floor((-alpha+pi*0.25)/pi*2);
    const index = ProperMod(dirOffset+cameraOffset,4);
    return movementVectors[index]
}

export {arrowHandler}