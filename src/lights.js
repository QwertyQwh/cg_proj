const lights = {
    top:{
        direction: [0,-1,0],
        color: null,
    },
    left:{
        direction: [1,0,0 ],
        color: null,
    },
    right:{
        direction: [0,0,1],
        color: null
    }
}

const GenerateLights = (palette)=>{
    lights.top.color = palette.top;
    lights.left.color = palette.left;
    lights.right.color = palette.right;
    return lights;
}

export {GenerateLights}