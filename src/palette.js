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
    {
        background: [.17, .18, .26,1.0],
        left: [	.27, .07, .13, 1.],
        right: [1., .82, .73,1.],
        top: [	1.00, .98, .93,1.0]
    },
    {
        background: [1.00, .87, .82,1.0],
        top: [.93, .96, .98,1.0],
        right: [.51, .77, .75,1.0],
        left: [.0, .43, .47,1.0]
    },
    {
        background: [.94, .85,.81,1.0],
        top: [.95, .92, .98,1.0],
        right: [.92, .85, .99,1.0],
        left: [.83, .73, .99,1.0]
    },

] 

let curInd = null


function GeneratePalette(){
    if(curInd== null){
        curInd = settings.environment.startingColor
    }
    curInd = (curInd+1)% palettes.length
    return palettes[curInd];
}

export {GeneratePalette}