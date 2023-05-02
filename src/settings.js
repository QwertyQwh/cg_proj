import { pi } from "mathjs"

const settings = {
    mazeParams:{
        weights:{horizontal: 0.5, stair: 0.4 },
        hollowCondition: (i,j)=> ((i>=8&& i<=12 && j>=8 && j<=12) || ((i<2)&& (j<2))|| ((i<2)&& (j>17)) ||((i>17)&& (j>17)) ||((i>17)&& (j<2))   ),/*|| ((i>0 || j>0) && (i+j*2) %4 == 0) */
        width:20,
        height:20,
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
    }
}
export {settings}