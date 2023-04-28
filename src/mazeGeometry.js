import { AddCube } from "./cube";
import { AddSandwich } from "./sandwich";

  function AddMazeBlock(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    if(node.hollow){
      return;
    }
    if(!node.from){
      AddFlatGround(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
      return;
    }
    let ascending = true
    if(node.indices.h<node.children[node.from].indices.h){
      ascending = false
    }
    switch (node.from) {
      case 'left':
        switch (node.to) {
          case 'right':
            if(ascending){
              AddStair_left_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }else{
              AddStair_left_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }
            break;
          case 'forward':
            if(ascending){
              AddStair_left_upward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }else{
              AddStair_left_upward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }
            break;
          case 'backward':
            if(ascending){
              AddStair_left_backward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }else{
              AddStair_left_backward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }
            break;
          default:
            break;
        }
        break;

      case 'right':
        switch (node.to) {
          case 'left':
            if(ascending){
              AddStair_right_left_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }else{
              AddStair_right_left_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }
            break;
          case 'forward':
            if(ascending){
              AddStair_right_upward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }else{
              AddStair_right_upward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }
            break;
          case 'backward':
            if(ascending){
              AddStair_right_backward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }else{
              AddStair_right_backward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }
            break;
          default:
            break;
        }
        break;
      case 'forward':
      switch (node.to) {
        case 'left':
          if(ascending){
            AddStair_upward_left_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
          }else{
            AddStair_upward_left_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
          }
          break;
        case 'right':
          if(ascending){
            AddStair_upward_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
          }else{
            AddStair_upward_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
          }
          break;
        case 'backward':
          if(ascending){
            AddStair_upward_backward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
          }else{
            AddStair_upward_backward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
          }
          break;
        default:
          break;
      }
      break;
      case 'backward':
        switch (node.to) {
          case 'left':
            if(ascending){
              AddStair_backward_left_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }else{
              AddStair_backward_left_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }
            break;
          case 'right':
            if(ascending){
              AddStair_backward_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }else{
              AddStair_backward_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }
            break;
          case 'forward':
            if(ascending){
              AddStair_backward_upward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }else{
              AddStair_backward_upward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
            }
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  
  function AddFlatGround(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    const centerParam = {
        left: (node.indices.i-width/2+gap)*size,
        bottom:  0,
        near:(node.indices.j-height/2+gap)*size,
        width: (1-gap*2)*size,
        height:  (baseHeight+heightModifier* node.indices.h)*size,
        depth: (1-gap*2)*size
      }
      AddCube(positions,normals,indices,wires,info,centerParam)
      if(node.path.left){
        centerParam.left = (node.indices.i-width/2)*size
        centerParam.near = (node.indices.j-height/2+gap)*size
        centerParam.width = gap*size
        centerParam.depth = (1-gap*2)*size
        AddCube(positions,normals,indices,wires,info,centerParam)
      }
      if(node.path.right){
        centerParam.left = (node.indices.i+1-width/2-gap)*size
        centerParam.near = (node.indices.j-height/2+gap)*size
        centerParam.width = gap*size
        centerParam.depth = (1-gap*2)*size
        AddCube(positions,normals,indices,wires,info,centerParam)
      }
      if(node.path.forward){
        centerParam.left = (node.indices.i-width/2+gap)*size
        centerParam.near = (node.indices.j-height/2+1-gap)*size
        centerParam.width = (1-gap*2)*size
        centerParam.depth = gap*size
        AddCube(positions,normals,indices,wires,info,centerParam)
      }
      if(node.path.backward){
        centerParam.left = (node.indices.i-width/2+gap)*size
        centerParam.near = (node.indices.j-height/2)*size
        centerParam.width = (1-gap*2)*size
        centerParam.depth = gap*size
        AddCube(positions,normals,indices,wires,info,centerParam)
      }
  }

  function AddStair_backward_upward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    const bottomParam = {
      left: (node.indices.i-width/2+gap)*size,
      bottom:  0,
      near:(node.indices.j-height/2)*size,
      width: (1-gap*2)*size,
      height: (baseHeight+heightModifier* (node.indices.h-1))*size,
      depth: (1/8)*size
    }
    for(let i = 0; i<8; i++){
        AddCube(positions,normals,indices,wires,info,bottomParam)
        bottomParam.near+= size/8
        bottomParam.height+= heightModifier*size/8
    }
  }
  function AddStair_backward_upward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    const topParam = {
      left: (node.indices.i-width/2+gap)*size,
      bottom:  0,
      near:(node.indices.j-height/2)*size,
      width: (1-gap*2)*size,
      height: (baseHeight+heightModifier* (node.indices.h+1))*size,
      depth: (1/8)*size
    }
    for(let i = 0; i<8; i++){
        AddCube(positions,normals,indices,wires,info,topParam)
        topParam.near+= size/8
        topParam.height-= heightModifier*size/8
    }
  }
  function AddStair_upward_backward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    node.indices.h--
    AddStair_backward_upward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
    node.indices.h++
  }
  function AddStair_upward_backward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    node.indices.h++
    AddStair_backward_upward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
    node.indices.h--
  }
  function AddStair_left_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,flipX){
    const topParam = {
      left: (node.indices.i-width/2)*size,
      bottom:  0,
      near:(node.indices.j-height/2+gap)*size,
      width: (1/8)*size,
      height: (baseHeight+heightModifier* (node.indices.h-1))*size,
      depth: (1-gap*2)*size,
      flipX: flipX,
      avgX: (node.indices.i-width/2+0.5)*size
    }
    for(let i = 0; i<8; i++){
        AddCube(positions,normals,indices,wires,info,topParam)
        topParam.left+= size/8
        topParam.height+= heightModifier*size/8
    }
  }
  function AddStair_left_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    node.indices.h++
    AddStair_left_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,true)
    node.indices.h--
  }
  function AddStair_right_left_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    node.indices.h++
    AddStair_left_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
    node.indices.h--
  }
  function AddStair_right_left_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    node.indices.h--
    AddStair_left_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
    node.indices.h++
  }

  //Original
  function AddStair_backward_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,flipX = false, flipZ = false){
    let curHeight = (baseHeight+heightModifier* (node.indices.h-1))*size;
    const leftBound = node.indices.i-width/2;
    const nearBound = node.indices.j-height/2;
    const  cubeParam = {
      left: (leftBound+gap)*size,
      bottom:  0,
      near:(nearBound)*size,
      width: (1-gap*2)*size,
      height: curHeight,
      depth: (1/8)*size,
      flipX: flipX,
      flipZ: flipZ,
      avgX : (leftBound+0.5)*size,
      avgZ : (nearBound+0.5)*size
    }
    for(let i = 0; i<2; i++){
        AddCube(positions,normals,indices,wires,info,cubeParam)
        cubeParam.near+= size/8
        curHeight+= heightModifier*size/8
        cubeParam.height = curHeight
    }
    const sandwichParam = {
        first:{x: (leftBound+1-gap)*size,z:(nearBound+gap)*size},
        second:{x:(leftBound+gap)*size, z:(nearBound+gap)*size },
        third: {x: (leftBound+gap)*size,  z:(nearBound+1-gap)*size },
        low: 0,
        high: curHeight,
        flipX: flipX, 
        flipZ: flipZ,
        avgX : (leftBound+0.5)*size,
        avgZ : (nearBound+0.5)*size
    } 
    AddSandwich(positions,normals,indices,wires,info,sandwichParam)
    curHeight+= heightModifier*size/8
    sandwichParam.second.z = (nearBound+0.5)*size
    sandwichParam.high = curHeight
    AddSandwich(positions,normals,indices,wires,info,sandwichParam)
    curHeight+= heightModifier*size/8
    sandwichParam.second.x = sandwichParam.third.x
    sandwichParam.second.z = sandwichParam.third.z
    sandwichParam.third.x = (leftBound+1-gap)*size
    sandwichParam.high = curHeight
    AddSandwich(positions,normals,indices,wires,info,sandwichParam)
    curHeight+= heightModifier*size/8
    sandwichParam.second.x =  (leftBound+0.5)*size
    sandwichParam.high = curHeight
    AddSandwich(positions,normals,indices,wires,info,sandwichParam)
    curHeight+= heightModifier*size/8
    cubeParam.left = (leftBound+1-gap)*size
    cubeParam.near = (nearBound+gap)*size
    cubeParam.depth = (1-gap*2)*size
    cubeParam.width = size/8
    cubeParam.height = curHeight
    for(let i = 0; i<2; i++){
        AddCube(positions,normals,indices,wires,info,cubeParam)
        cubeParam.left+= size/8
        curHeight+= heightModifier*size/8
        cubeParam.height = curHeight
    }
  }

  function AddStair_backward_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,flipX = false, flipZ = false){
    let curHeight = (baseHeight+heightModifier* (node.indices.h+1))*size;
    const leftBound = node.indices.i-width/2;
    const nearBound = node.indices.j-height/2;
    const xAvg = (leftBound+.5)*size
    const zAvg = (nearBound+.5)*size
    const  cubeParam = {
      left: (leftBound+gap)*size,
      bottom:  0,
      near:(nearBound)*size,
      width: (1-gap*2)*size,
      height: curHeight,
      depth: (1/8)*size,
      flipX: flipX,
      flipZ: flipZ,
      avgX : (leftBound+0.5)*size,
      avgZ : (nearBound+0.5)*size
    }
    for(let i = 0; i<2; i++){
        AddCube(positions,normals,indices,wires,info,cubeParam)
        cubeParam.near+= size/8
        curHeight-= heightModifier*size/8
        cubeParam.height = curHeight
    }
    const sandwichParam = {
        first:{x: (leftBound+1-gap)*size,z:(nearBound+gap)*size},
        second:{x:(leftBound+gap)*size, z:(nearBound+gap)*size },
        third: {x: (leftBound+gap)*size,  z:(nearBound+0.5)*size },
        low: 0,
        high: curHeight,
        flipX: flipX,
        flipZ: flipZ,
        avgX : (leftBound+0.5)*size,
        avgZ : (nearBound+0.5)*size
    } 
    AddSandwich(positions,normals,indices,wires,info,sandwichParam)
    curHeight-= heightModifier*size/8
    sandwichParam.third.z = (nearBound+1-gap)*size
    sandwichParam.high = curHeight
    AddSandwich(positions,normals,indices,wires,info,sandwichParam)
    curHeight-= heightModifier*size/8
    sandwichParam.second.x = sandwichParam.third.x
    sandwichParam.second.z = sandwichParam.third.z
    sandwichParam.third.x = (leftBound+0.5)*size
    sandwichParam.high = curHeight
    AddSandwich(positions,normals,indices,wires,info,sandwichParam)
    curHeight-= heightModifier*size/8
    sandwichParam.third.x =  (leftBound+1-gap)*size
    sandwichParam.high = curHeight
    AddSandwich(positions,normals,indices,wires,info,sandwichParam)
    curHeight-= heightModifier*size/8
    cubeParam.left = (leftBound+1-gap)*size
    cubeParam.near = (nearBound+gap)*size
    cubeParam.depth = (1-gap*2)*size
    cubeParam.width = size/8
    cubeParam.height = curHeight
    for(let i = 0; i<2; i++){
        AddCube(positions,normals,indices,wires,info,cubeParam)
        cubeParam.left+= size/8
        curHeight-= heightModifier*size/8
        cubeParam.height = curHeight
    }
  }
  // Modifying existing ones
  function AddStair_backward_left_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_backward_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,true)
  }
  function AddStair_backward_left_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_backward_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,true)
  }
  function AddStair_left_backward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    node.indices.h ++;
    AddStair_backward_left_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
    node.indices.h --;
  }
  function AddStair_left_backward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    node.indices.h--
    AddStair_backward_left_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info)
    node.indices.h++
  }
  function AddStair_right_backward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,flipX = false,flipZ = false){
    node.indices.h ++;
    AddStair_backward_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,flipX,flipZ)
    node.indices.h --;
  }
  function AddStair_right_backward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,flipX = false,flipZ = false){
    node.indices.h--
    AddStair_backward_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,flipX,flipZ)
    node.indices.h++
  }
  function AddStair_upward_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_backward_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,false,true)
  }
  function AddStair_upward_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_backward_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,false,true)
  }
  function AddStair_right_upward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_right_backward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,false,true)
  }
  function AddStair_right_upward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_right_backward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,false,true)
  }
  function AddStair_upward_left_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_backward_right_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,true,true)
  }
  function AddStair_upward_left_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_backward_right_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,true,true)
  }
  function AddStair_left_upward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_right_backward_ascending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,true,true)
  }
  function AddStair_left_upward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info){
    AddStair_right_backward_descending(node,{width,height,size,gap,heightModifier,baseHeight},positions,normals,indices,wires,info,true,true)
  }
  export {
    AddMazeBlock,
}