import { AddModel } from "./model";
import flag from './assets/models/flag.obj'

function AddFlag(positions,normals,indices,wires,info, params){
    params.file = flag
    AddModel(positions,normals,indices,wires,info,params)
}