import { LoadModel } from "./objLoader";

function AddModel(positions,normals,indices,wires,info,params){
    const arrays = LoadModel(params);
    const startingIndex = positions.length/3
    positions.push(...arrays.vertices)
    normals.push(...arrays.elementsNormal)
    indices.push(...arrays.elements.map((val,ind)=>val+startingIndex))
    wires.push(...arrays.elementsWire.map((val,ind)=>val+startingIndex))
    info.vertexCount += arrays.elements.length
    info.wireCount += arrays.elementsWire.length
  }
  
  export {AddModel}