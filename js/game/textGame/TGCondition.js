class TGCondition {
  constructor(lhs, op, rhs) {
    this.lhs = lhs;
    this.op = op;
    this.rhs = rhs;
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
