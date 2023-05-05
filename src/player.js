import { vec3 } from "gl-matrix";
import { settings } from "./settings";
import { Aprox, maze2world } from "./utils/utils";
import { pi, sin } from "mathjs";

function InitCharacter(parameters,accumulated,instanceInfo){
    const mazeP = settings.mazeParams
    accumulated.node = {i:mazeP.start.i,j:mazeP.start.j}
    
    const {x,y,z} = maze2world(mazeP.start.i, settings.blockParams.baseHeight,mazeP.start.j)
    parameters.characterPos = [x,y+settings.character.height,z]
    accumulated.characterPos = [x,y+settings.character.height,z]
    instanceInfo.upper[0].translation = [x,y,z]
    instanceInfo.middle[0].translation = [x,y,z]
    instanceInfo.lower[0].translation = [x,y,z]
}

function MoveCharacter(parameters,accumulated,instanceInfo){
    //rotations
    instanceInfo.upper[0].rotateY = 8*sin(parameters.elapse/pi)
    instanceInfo.lower[0].rotateY = -8*sin(parameters.elapse/pi)

    // translations
    let eq = true
    parameters.characterPos.forEach((val,ind) => {
        if(!Aprox(val,accumulated.characterPos[ind])){
            eq = false
        }
    });
    if(eq){
        parameters.isMoving = false
        parameters.traveledTime = 0;
        return;
    }
    parameters.isMoving = true
    const cur = vec3.create()
    const dest = vec3.create()
    const dir = vec3.create()
    vec3.set(cur,parameters.characterPos[0],parameters.characterPos[1],parameters.characterPos[2])
    vec3.set(dest,accumulated.characterPos[0],accumulated.characterPos[1],accumulated.characterPos[2])
    vec3.sub(dir,dest,cur)
    const step = settings.character.curveFunc(parameters.traveledTime/parameters.totalTravelTime)
    // We will overshoot, so stop prematurely
    if(parameters.traveledTime>parameters.totalTravelTime){
        vec3.copy(cur,dest)
    }else{
        // vec3.normalize(dir,dir);
        vec3.scale(dir,dir,1-step);
        vec3.sub(cur,dest,dir);
    }
    // Move the player above the ground 
    parameters.traveledTime+= parameters.deltaTime
    parameters.characterPos.forEach((val,ind) => {
        parameters.characterPos[ind] = cur[ind]
    });

    cur.forEach((val,ind)=>{
        instanceInfo.upper[0].translation[ind] = val
        instanceInfo.middle[0].translation[ind] = val
        instanceInfo.lower[0].translation[ind] = val
    }) 



}

export {InitCharacter,MoveCharacter}