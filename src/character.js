import { settings } from "./settings";
import { maze2world } from "./utils/utils";

function InitCharacter(parameters,dest){
    const mazeP = settings.mazeParams
    const {x,y,z} = maze2world(mazeP.start.i, settings.blockParams.baseHeight,mazeP.start.j)
    parameters.characterPos = [x,y,z]
    dest.characterPos = [x,y,z]
}

export {InitCharacter}