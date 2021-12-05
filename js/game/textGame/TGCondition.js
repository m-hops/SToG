class TGCondition {
  constructor(lhs, op, rhs) {
    this.lhs = lhs;
    this.op = op;
    if(isNaN(this.rhs)){
      this.rhs = rhs;
    } else {
      this.rhs = parseFloat(rhs);
    }
  }

  execute(gameState){
    switch(this.op){
      case '==':
        return gameState.variables[this.lhs] == this.rhs;
      case '!=':
        return gameState.variables[this.lhs] != this.rhs;
      case '>=':
        return gameState.variables[this.lhs] >= this.rhs;
      case '<=':
        return gameState.variables[this.lhs] <= this.rhs;
      case '>':
        return gameState.variables[this.lhs] > this.rhs;
      case '<':
        return gameState.variables[this.lhs] < this.rhs;
    }
    return true;
  }
  print(indent){
      return indent + "("+this.lhs+" "+this.op+" "+this.rhs+")";
  }
}
function loadConditionFromJSON(data, loader){
  return new TGCondition(data.lhs, data.op, data.rhs);
}
