import { AddModel } from "./model";
import castle from '../assets/models/castle.obj'

function AddCastle(positions,normals,indices,wires,info, params){
    params.file = castle
    AddModel(positions,normals,indices,wires,info,params)
}

export {AddCastle}