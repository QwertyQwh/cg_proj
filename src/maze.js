

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
      this.from = null // This is used for stair generation
      this.visited = false
      this.maze = maze
      this.path = {
        left:null, //-x
        right:null,//+x
        forward: null,//-z
        backward : null,//+z
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
          // console.log(next.indices)
          next.Visit()
        }
    }
    PostVisit(prev,prevDir,isStart){
      let count = 0
      const leftAvail = this.path.left && prevDir != "left"
      const rightAvail = this.path.right &&  prevDir != "right"
      const forwardAvail = this.path.forward &&  prevDir != "forward"
      const backwardAvail = this.path.backward &&  prevDir != "backward"
      Object.values(this.path).forEach(element => {
        if(element){
          count ++
        }
      });
      if(isStart){
        this.indices.h = 0
      }else if(count!=2){
        this.indices.h = prev.indices.h
      }else{
        let elevate = 0
        if(Math.random()<this.maze.weights.stair){
          this.from = prevDir
          let outPath = null
          Object.entries(this.path).forEach((val)=>{
            if(val[0]!=prevDir && val[1]){
              outPath = val[0]
            }
          })
          switch (outPath) {
            case "left":
              elevate = this.#TowardsCenter(-1,0)
              break;
            case "right":
              elevate = this.#TowardsCenter(1,0)
              break;    
            case "forward":
              elevate = this.#TowardsCenter(0,1)
              break;    
            case "backward":
              elevate = this.#TowardsCenter(0,-1)
              break;        
            default:
              break;
            }
            if(elevate == 0){
              elevate = Math.random()>.5? 1:-1
            }
          }
            this.indices.h = Math.max(prev.indices.h+elevate,0)
          }
          if(leftAvail){
            this.children.left.PostVisit(this,"right")
          }
          if(rightAvail){
            this.children.right.PostVisit(this,"left")
          }
          if(forwardAvail){
            this.children.forward.PostVisit(this,"backward")
          }
          if(backwardAvail){
            this.children.backward.PostVisit(this,"forward")
          }
        }
        #TowardsCenter(iDir, jDir){
          const iTowardsCenter = (this.maze.centerLocation.i-this.indices.i)*iDir
          const jTowardsCenter = (this.maze.centerLocation.j-this.indices.j)*jDir
          if(iTowardsCenter>0 || jTowardsCenter>0){
            return 1;
          }
          if(iTowardsCenter<0 || jTowardsCenter<0){
            return -1;
          }
          return 0;
        }
      }
              
              
  class Maze{
   constructor({weights,hollowCondition, width, height, start, end, centerLocation}){
    this.weights = weights;
    this.hollowCondition = hollowCondition;
    this.start;
    this.end;
    this.centerLocation = centerLocation
    this.nodes = Array(width)
    for(let i = 0; i<width; i++){
      this.nodes[i] = []
      for(let j = 0; j<height; j++){
        const node = new Node({i:i,j:j,h:0},null,this)
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
    this.nodes[start.i][start.j].PostVisit(null,null,true)
  }


}

export {Maze}