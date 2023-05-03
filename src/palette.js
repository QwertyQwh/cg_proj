import { settings } from "./settings";

const palettes = [
    {
        background: [.753, .898, .769, 1.0],
        top: [.824, .812, .616, 1.0],
        right: [.604, .459, .412,1.0],
        left: [.486, .675, .635,1.0]
    },
    {
        background: [0.133, 0.235, 0.467,1.0],
        top: [0.902, .976, 1., 1.0],
        right: [.565, .894, 1.,1.0],
        left: [.451, .518, .812,1.0]
    },
    {
        background: [.988, .929, .788,1.0],
        top: [.982, .971, .831,1.0],
        right: [.678, .518, .353,1.0],
        left: [	.878, .749, .49,1.0]
    },
    {
        background: [.792, .914, .996,1.0],
        top: [.996, .996, .996,1.0],
        right: [.851, .722, .843,1.0],
        left: [.412, .584, .82,1.0]
    },

] 

let curInd = null


function GeneratePalette(){
    if(!curInd){
        curInd = settings.environment.startingColor
    }
    curInd = (curInd+1)% palettes.length
    return palettes[curInd];
}

export {GeneratePalette}