import pavilion from '../assets/models/pavilion.obj'
import { AddModel } from './model'




function AddPavilion(positions,normals,indices,wires,info,modelParams){
    modelParams.file = pavilion
    AddModel(positions,normals,indices,wires,info,modelParams)
}


export {AddPavilion}