import { AddModel } from "./model";
import character from '../assets/models/character.obj'

function AddCharacter(positions,normals,indices,wires,info, params){
    params.file = character
    AddModel(positions,normals,indices,wires,info,params)
}

export {AddCharacter}