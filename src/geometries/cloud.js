import { AddModel } from "./model";
import cloud from '../assets/models/cloud.obj'

function AddCloud(positions,normals,indices,wires,info, params){
    params.file = cloud
    AddModel(positions,normals,indices,wires,info,params)
}

export {AddCloud}