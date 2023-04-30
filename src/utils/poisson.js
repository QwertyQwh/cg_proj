import { distance, pi, random,cos, sin } from "mathjs"
const obtained = [[0,0]]

// assume we start from 0,0 and generate sampling points in the sphere of radius bound around the origin.
function PoissonSample(params){
    const queue = [[0,0]]
    while(obtained.length<params.count && queue.length > 0 ){
        const newP = SampleFromPoint(queue[0],params,obtained);
        if(newP){
            obtained.push(newP)
            queue.push(newP)
        }else{
            queue.shift();
        }
    }
    return obtained
}

function GetCurrentSample(){
    return obtained;
}

function SampleFromPoint(point, params,obtained ){
    for(let i = 0;i<params.attempts; i++){
        let rad = random(params.min, params.max)
        let alpha = random(0,pi*2)
        const newP = [point[0]+cos(alpha)*rad, point[1]+sin(alpha)*rad]
        if(distance(newP,[0,0])>params.bound ){
            continue;
        }
        let valid = true;
        for(let k = 0; k< obtained.length; k++){
            if(distance(obtained[k],newP)<params.min){
                valid = false;
                break;
            }
        }
        if(valid){
            return newP;
        }
    }
    return null;
}

export {PoissonSample, GetCurrentSample}