import dome from '../assets/models/dome.obj'
import { PoissonSample } from '../utils/poisson'
import { AddModel } from './model'
import { random } from 'mathjs'


function AddDomes({count,mazeWidth,mazeDepth,bound,height},instanceInfo){
    const sampleParams = {
        bound:bound,
        min: bound*0.08,
        max: bound*0.2,
        attempts: 20,
        count: count
    }
    const points = PoissonSample(sampleParams)
    
    points.forEach((val)=>{
        if(val[0]>-mazeWidth*.5&&val[0]<mazeWidth*.5&&val[1]>-mazeDepth*.5&& val[1]<mazeDepth*.5){
            return;
        }
        const offsetY = height* random(-1,0)
        // AddDome(positions,normals,indices,wires,info,{offsetX: val[0],offsetZ: val[1],offsetY:offsetY})
        instanceInfo.push({translation:[val[0],offsetY,val[1]],scale :[0.5,0.5,0.5]})
    })
}

function AddDome(positions,normals,indices,wires,info,modelParams){
    modelParams.file = dome
    AddModel(positions,normals,indices,wires,info,modelParams)
}


export {AddDomes,AddDome}