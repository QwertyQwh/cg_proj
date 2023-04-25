    import suzanne from './assets/models/suzanne.obj'


    // A very minimal parser for a single object model
    const Parse = (src,smoothen)=>{
        const vertices_orig = [];
        const vertices = []
        const normals = []
        const elements = []
        const elementsNormal = []
        const elementsWire = []
        const lines = src.split("\n")
        let element_count = 0 
        lines.forEach(line => {
            if(line[0] == 'v'){
                if(line[1] == 'n'){
                    const nums = line.split(" ")
                    normals.push([nums[1],nums[2],nums[3]])
                }else{
                    const nums = line.split(" ")
                    vertices_orig.push([parseFloat(nums[1]),parseFloat(nums[2])+2,parseFloat(nums[3])])
                }
            }else if(line[0] == 'f'){
                const nums = line.split(" ")
                for(let i = 1; i<4; i++){
                    const v = nums[i].split("/")
                    const norm = normals[parseInt(v[2])-1];
                    const vert = vertices_orig[parseInt(v[0])-1]
                    vertices.push(vert[0])
                    elementsNormal.push(parseFloat(norm[0]))
                    vertices.push(vert[1])
                    elementsNormal.push(parseFloat(norm[1]))
                    vertices.push(vert[2])
                    elementsNormal.push(parseFloat(norm[2]))
                    elementsWire.push(element_count)
                    if(i == 3){
                        elementsWire.push(element_count-2)
                    }else{
                        elementsWire.push(element_count+1);
                    }
                    elements.push(element_count++);
                }
            }
        });
        if(smoothen){
            const checked = []
            for(let i = 0; i<elements.length; i++){
                if(checked.includes(i)){
                    return;
                }
                let newly_checked = [i]
                const sum = [elementsNormal[3*i],elementsNormal[3*i+1],elementsNormal[3*i+2]]
                for(let j = 0;j!= i&& j<elements.length; j++){
                    if(vertices[3*i] == vertices[3*j]&& vertices[3*i+1] == vertices[3*j+1]&&vertices[3*i+2] == vertices[3*j+2]){
                        newly_checked.push(j)
                        checked.push(j)
                        sum[0] += elementsNormal[3*j]
                        sum[1] += elementsNormal[3*j+1]
                        sum[2] += elementsNormal[3*j+2]
                    } 
                }

                sum[0] /= newly_checked.length
                sum[1] /= newly_checked.length
                sum[2] /= newly_checked.length


                newly_checked.forEach((val)=>{
                    elementsNormal[3*val] = sum[0]
                    elementsNormal[3*val+1] = sum[1]
                    elementsNormal[3*val+2] = sum[2]
                })
                newly_checked = []
            }
        }
        //Unfortunately We need to generate new vertices because two vertices with the SAME location but different NORMALS are treated as two vertices in webgl.
        return {vertices, elements,elementsNormal,elementsWire}
    }

    const LoadModel  =  (smoothen) =>Parse(suzanne,smoothen)
    export {LoadModel}