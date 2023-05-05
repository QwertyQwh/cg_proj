import { vec3 } from "gl-matrix";
import { settings } from "./settings";
import { Aprox, maze2world, maze2worldByNode } from "./utils/utils";
import { pi, sin } from "mathjs";

function InitCharacter(parameters,accumulated,instanceInfo){
    const mazeP = settings.mazeParams
    accumulated.node = {i:mazeP.start.i,j:mazeP.start.j}
    
    let {x,y,z} = maze2worldByNode(parameters.maze,mazeP.start.i,mazeP.start.j)
    y+= settings.character.height
    parameters.characterPos = [x,y,z]
    accumulated.characterPos = [x,y,z]
    instanceInfo.upper[0].translation = [x,y,z]
    instanceInfo.middle[0].translation = [x,y,z]
    instanceInfo.lower[0].translation = [x,y,z]
}

function MoveCharacter(parameters,accumulated,instanceInfo){
    //rotations
    instanceInfo.upper[0].rotateY = 12*sin(parameters.elapse/pi)
    instanceInfo.lower[0].rotateY = -12*sin(parameters.elapse/pi)
    instanceInfo.middle[0].rotateY = parameters.elapse
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
    vec3.copy(dir,parameters.travelVec)
    vec3.set(dest,accumulated.characterPos[0],accumulated.characterPos[1],accumulated.characterPos[2])
    const step = settings.character.curveFunc(parameters.traveledTime/parameters.totalTravelTime)
    // We will overshoot, so stop prematurely
    if(parameters.traveledTime>parameters.totalTravelTime){
        vec3.copy(cur,dest)
    }else{
        // vec3.normalize(dir,dir);
        vec3.scale(dir,dir,step-1);
        vec3.sub(cur,dest,dir);
    }
    // Move the player above the ground 
    parameters.traveledTime+= parameters.deltaTime
    parameters.characterPos.forEach((val,ind) => {
        parameters.characterPos[ind] = cur[ind]
    });
    //This is stupid, find some smarter way 
    if(!Aprox( instanceInfo.upper[0].scale[0],accumulated.scale)){
        if(accumulated.scale>=1){
            instanceInfo.upper[0].scale[0] = step* accumulated.scale 
            instanceInfo.upper[0].scale[1] = step* accumulated.scale 
            instanceInfo.upper[0].scale[2] = step* accumulated.scale 
            instanceInfo.lower[0].scale[0] = step* accumulated.scale 
            instanceInfo.lower[0].scale[1] = step* accumulated.scale 
            instanceInfo.lower[0].scale[2] = step* accumulated.scale 
        }else if(accumulated.scale <= 0){
            instanceInfo.upper[0].scale[0] = (1-step)
            instanceInfo.upper[0].scale[1] = (1-step)
            instanceInfo.upper[0].scale[2] = (1-step)
            instanceInfo.lower[0].scale[0] = (1-step)
            instanceInfo.lower[0].scale[1] = (1-step)
            instanceInfo.lower[0].scale[2] = (1-step)
        }
    }
    cur.forEach((val,ind)=>{
        instanceInfo.upper[0].translation[ind] = val
        instanceInfo.middle[0].translation[ind] = val
        instanceInfo.lower[0].translation[ind] = val
    }) 



}

export {InitCharacter,MoveCharacter}