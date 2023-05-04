import { cos, floor, pi, random, sin } from "mathjs"

const width = 20
const height = 20

const settings = {
    mazeParams:{
        weights:{horizontal: 0.5, stair: 0.4, pavilion: 0.5 },
        hollowCondition: (i,j)=> ((i>=width/2-2&& i<=width/2+2 && j>=height/2-2 && j<=height/2+2) || ((i<2)&& (j<2))|| ((i<2)&& (j>width-3)) ||((i>width-3)&& (j>width-3)) ||((i>width-3)&& (j<2))   ),/*|| ((i>0 || j>0) && (i+j*2) %4 == 0) */
        width:width,
        height:height,
        centerLocation:{i:10,j:10},
        start:{i:0,j:2},
        end:null
    },
    blockParams:{
        size:1,
        gap:0.25,
        baseHeight:2,
        heightModifier:0.5
    },
    controls:{
        maxTheta: pi*.5,
        minTheta: 0,
        minRadius: 0,
        maxRadius : 100,
    },
    cloud:{
        bound:50,
        height:25., 
        speed: -0.3,
    },
    character:{
        followDist: 10,
        speed: 3,
        curveFunc: (t)=> (-cos(pi*t)+1)*.5,
        curveGrad: (t)=>  .5*pi*sin(pi*t),
    },
    environment:{
        startingColor: 0,
    }
}


function Randomize(){
    settings.mazeParams.width = floor(random(10,31))
    settings.mazeParams.height = floor(random(10,31))
    settings.mazeParams.hollowCondition = (i,j)=> ((i>=settings.mazeParams.width /2-2&& i<=settings.mazeParams.width /2+2 && j>=settings.mazeParams.height/2-2 && j<=settings.mazeParams.height/2+2) || ((i<2)&& (j<2))|| ((i<2)&& (j>settings.mazeParams.height -3)) ||((i>settings.mazeParams.width -3)&& (j>settings.mazeParams.height -3)) ||((i>settings.mazeParams.width -3)&& (j<2)))
    settings.blockParams.heightModifier = random(0.3,1.0)
    settings.mazeParams.weights.horizontal = random(0.1,0.9)
    settings.mazeParams.weights.stair = random(0.2,0.8)
    settings.environment.startingColor = floor(random(0,4))
}
export {settings,Randomize}