import tower from './assets/models/tower.obj'
import { PoissonSample } from './poisson'
import { AddModel } from './model'
import { random } from 'mathjs'



function AddTowers(positions,normals,indices,wires,info,{count,mazeWidth,mazeDepth,bound,height}){
    const sampleParams = {
        bound:bound,
        min: bound*0.5,
        max: bound*0.8,
        attempts: 20,
        count: count
    }
    console.log(sampleParams)
    const points = PoissonSample(sampleParams)
    
    points.forEach((val)=>{
        if(val[0]>-mazeWidth*.5&&val[0]<mazeWidth*.5&&val[1]>-mazeDepth*.5&& val[1]<mazeDepth*.5){
            return;
        }
        const offsetY = height* random(0.3,1)
        AddTower(positions,normals,indices,wires,info,{offsetX: val[0],offsetZ: val[1],offsetY:offsetY})
    })
}

function AddTower(positions,normals,indices,wires,info,modelParams){
    modelParams.file = tower
    AddModel(positions,normals,indices,wires,info,modelParams)
}


export {AddTowers}