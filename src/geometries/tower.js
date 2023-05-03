import tower from '../assets/models/tower.obj'
import { AddModel } from './model'




function AddTower(positions,normals,indices,wires,info,modelParams){
    modelParams.file = tower
    AddModel(positions,normals,indices,wires,info,modelParams)
}


export {AddTower}