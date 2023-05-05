import { AddModel } from "./model";
import upper from '../assets/models/upper.obj'
import middle from '../assets/models/middle.obj'
import lower from '../assets/models/lower.obj'

function AddUpper(positions,normals,indices,wires,info, params){
    params.file = upper
    AddModel(positions,normals,indices,wires,info,params)
}
function AddMiddle(positions,normals,indices,wires,info, params){
    params.file = middle
    AddModel(positions,normals,indices,wires,info,params)
}
function AddLower(positions,normals,indices,wires,info, params){
    params.file = lower 
    AddModel(positions,normals,indices,wires,info,params)
}

export {AddUpper,AddMiddle,AddLower}