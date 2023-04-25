

class Node {
    constructor(indices,children,maze) {
      this.indices = indices
      if(children){
        this.children = children
      }else{
        this.children = {
          left:null, //-x
          right:null,//+x
          forward: null,//-z
          backward : null,//+z
        }
      }
      this.visited = false
      this.maze = maze
      this.path = {
        left:null, //-x
        right:null,//+x
        forward: null,//-z
        backward : null,//+z
        //TODO: implement this
        upward: null, // This is not a boolean value since we can move into arbitrary tiles 
        downward: null, // This is not a boolean value since we can move into arbitrary tiles 
      } 
    }
    #ChooseAvailableChild(){
      const weights = this.maze.weights
      const leftAvail = this.children.left && !this.children.left.visited 
      const rightAvail = this.children.right && !this.children.right.visited 
      const forwardAvail = this.children.forward && !this.children.forward.visited
      const backwardAvail = this.children.backward && !this.children.backward.visited
      // console.log(leftAvail,rightAvail,forwardAvail,backwardAvail)
      if(!leftAvail && !rightAvail && !forwardAvail && !backwardAvail){
               //Return null if all children are visited
               return null
      }
      const dice = Math.random()
        if((!forwardAvail && !backwardAvail) || dice<weights.horizontal){
          if(leftAvail && rightAvail){
            if(Math.random()<0.5){
              this.path.left = true
              this.children.left.path.right = true
              return this.children.left
            }else{
              this.path.right = true
              this.children.right.path.left = true
              return this.children.right
            }
          }else if(leftAvail){
            this.path.left = true
              this.children.left.path.right = true
              return this.children.left
          }else if(rightAvail){
            this.path.right = true
              this.children.right.path.left = true
              return this.children.right
          }
          //If both are not available, fall through to the next branch
        }
        
        if(forwardAvail && backwardAvail){
          if(Math.random()<0.5){
            this.path.forward = true
              this.children.forward.path.backward = true
              return this.children.forward
            }else{
              this.path.backward = true
              this.children.backward.path.forward = true
              return this.children.backward
            }
          }else if(forwardAvail){
          this.path.forward = true
          this.children.forward.path.backward = true
              return this.children.forward
        }else {
          this.path.backward = true
              this.children.backward.path.forward = true
              return this.children.backward
        }
    }
    Visit(){
        this.visited = true
        let next;
        while(true){
          //If all children are visited, we are in a dead end and there was nothing to do
          next = this.#ChooseAvailableChild()
          // console.log("finished choosing child")
          if(!next){
            break;
          }
          console.log(next.indices)
          next.Visit()
        }
    }
  }


class Maze{
  constructor({weights,hollowCondition, width, height, start, end}){
    this.weights = weights;
    this.hollowCondition = hollowCondition;
    this.start;
    this.end;
    this.nodes = Array(width)

    for(let i = 0; i<width; i++){
      this.nodes[i] = []
      for(let j = 0; j<height; j++){
        const node = new Node({x:i,z:j},null,this)
        this.nodes[i].push(node)
    }
    }
      for(let i = 0; i<width; i++){
      for(let j = 0; j<height; j++){
        this.nodes[i][j].children.left = i-1>=0? this.nodes[i-1][j]:null
        this.nodes[i][j].children.right = i+1<width? this.nodes[i+1][j]:null
        this.nodes[i][j].children.backward = j-1>=0? this.nodes[i][j-1]:null
        this.nodes[i][j].children.forward = j+1<height? this.nodes[i][j+1]:null
      }
    }
    this.nodes[start.i][start.j].Visit()
  }
}

export {Maze}