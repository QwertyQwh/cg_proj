import { vec3 } from "gl-matrix";
import { settings } from "./settings";
import { Aprox, maze2world } from "./utils/utils";

function InitCharacter(parameters,dest,instanceInfo){
    const mazeP = settings.mazeParams
    const {x,y,z} = maze2world(mazeP.start.i, settings.blockParams.baseHeight,mazeP.start.j)
    parameters.characterPos = [x,y,z]
    dest.characterPos = [x,y,z]
    instanceInfo[0].translation = [x,y,z]
}

function MoveCharacter(parameters,accumulated,instanceInfo){
    let eq = true
    parameters.characterPos.forEach((val,ind) => {
        if(!Aprox(val,accumulated.characterPos[ind])){
            eq = false
        }
    });
    if(eq){
        parameters.isMoving = false
        return;
    }
    parameters.isMoving = true
    const cur = vec3.create()
    const dest = vec3.create()
    const dir = vec3.create()
    vec3.set(cur,parameters.characterPos[0],parameters.characterPos[1],parameters.characterPos[2])
    vec3.set(dest,accumulated.characterPos[0],accumulated.characterPos[1],accumulated.characterPos[2])
    vec3.sub(dir,dest,cur)
    const step = parameters.deltaTime*settings.character.speed
    // We will overshoot, so stop prematurely
    if(vec3.len(dir)<step){
        vec3.copy(cur,dest)
    }else{
        vec3.normalize(dir,dir);
        vec3.scale(dir,dir,step);
        vec3.add(cur,cur,dir);

    }
    parameters.characterPos.forEach((val,ind) => {
        parameters.characterPos[ind] = cur[ind]
    });
    instanceInfo[0].translation[0] = cur[0]
    instanceInfo[0].translation[1] = cur[1]
    instanceInfo[0].translation[2] = cur[2]

}

export {InitCharacter,MoveCharacter}