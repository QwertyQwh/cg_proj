import { cos, floor, pi, random, sin } from "mathjs"

const width = 20
const height = 20

const settings = {
    mazeParams:{
        weights:{horizontal: 0.5, stair: 0.4, pavilion: 0.5 },
        hollowCondition: (i,j)=> ((i>=floor(width/2)-2&& i<floor(width/2)+2 && j>=floor(height/2)-2 && j<floor(height/2)+2) || ((i<2)&& (j<2))|| ((i<2)&& (j>width-3)) ||((i>width-3)&& (j>width-3)) ||((i>width-3)&& (j<2))   ),
        width:width,
        height:height,
        start:{i:0,j:2},
        end:null,
        risingCetner: true
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
        height:0.5,
    },
    environment:{
        startingColor: 0,
    }
}


function Randomize(){
    settings.mazeParams.width = floor(random(10,31))
    settings.mazeParams.height = floor(random(10,31))
    let holes = false
    if(random(0,1)<0.5){
        holes = true
    }
    settings.mazeParams.hollowCondition = (i,j)=> ((i>=floor(settings.mazeParams.width /2)-2&& i< floor(settings.mazeParams.width /2)+2 && j>= floor(settings.mazeParams.height/2)-2 && j<floor(settings.mazeParams.height/2)+2) || ((i<2)&& (j<2))|| ((i<2)&& (j>settings.mazeParams.height -3)) ||((i>settings.mazeParams.width -3)&& (j>settings.mazeParams.height -3)) ||((i>settings.mazeParams.width -3)&& (j<2))|| (holes&& ((i>0 || j>0) && (i+j*2) %4 == 0)) )
    settings.blockParams.heightModifier = random(0.3,1.0)
    settings.mazeParams.weights.horizontal = random(0.1,0.9)
    settings.mazeParams.weights.stair = random(0.2,0.8)
    settings.environment.startingColor = floor(random(0,4))
    settings.mazeParams.start.i = floor(random(0,settings.mazeParams.width))
    settings.mazeParams.start.j = floor(random(0,settings.mazeParams.height))
    while(settings.mazeParams.hollowCondition(settings.mazeParams.start.i,settings.mazeParams.start.j)){
        settings.mazeParams.start.i = floor(random(0,settings.mazeParams.width))
        settings.mazeParams.start.j = floor(random(0,settings.mazeParams.height))
    }
    if(random(0,1)>0.5){
        settings.mazeParams.risingCetner = false
    }
}
function SetAllHorizontal(){
    settings.mazeParams.weights.horizontal = 1.         
}

export {settings,Randomize,SetAllHorizontal}