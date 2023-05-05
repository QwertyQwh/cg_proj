import { floor, pi } from "mathjs"
import { IsMazeIndexValid, ProperMod, maze2worldByNode } from "./utils/utils"
import { settings } from "./settings"

const movementVectors = [[0,-1],[-1,0],[0,1],[1,0]]

const arrowHandler = (key,parameters,accumulated)=>{
    const vec = GetMovementVector(parameters.cameraAlpha,key)
    if(vec && IsMazeIndexValid(accumulated.node.i +vec[0],accumulated.node.j+vec[1])){
        accumulated.radius = settings.character.followDist
        accumulated.node.i += vec[0]
        accumulated.node.j += vec[1]
        const worldPos = maze2worldByNode(parameters.maze, accumulated.node.i,accumulated.node.j)
        accumulated.characterPos[0] = worldPos.x
        accumulated.characterPos[1] = worldPos.y+settings.character.height
        accumulated.characterPos[2] = worldPos.z
    }

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
            return null;
    }
    const cameraOffset = floor((-alpha+pi*0.25)/pi*2);
    const index = ProperMod(dirOffset+cameraOffset,4);
    return movementVectors[index]
}

export {arrowHandler}