
const weights = {
  horizontal:0.5,
  vertical: 0.5,
}





class Node {
    constructor(indices,children) {
      this.indices = indices
      this.children = children
      this.visited = false
      this.path = {
        left:null, //-x
        right:null,//+x
        forward: null,//-z
        bakward : null,//+z
        //TODO: implement this
        upward: null, // This is not a boolean value since we can move into arbitrary tiles 
        downward: null, // This is not a boolean value since we can move into arbitrary tiles 
      }
    }
    get area() {
      return this.calcArea();
    }
    #ChooseAvailableChild(){
        //Return null if all children are visited
        return null
    }
    Visit(){
        this.visited = true
        //If all children are visited, we are in a dead end and there was nothing to do
        if(!this.#ChooseAvailableChild){
          return;
        }
    }

  }


class Maze{
  constructor({weights,hollowCondition, start, end}){
    this.weights = weights;
    this.hollowCondition = hollowCondition;
    this.start;
    this.end;
  }
}