class ReactionIf extends Reaction{
  constructor(lhs, op, rhs){
    super("if");
    this.lhs = lhs;
    this.op = op;
    this.rhs = rhs;
    this.then = [];
    this.else = [];
  }

  performCondition(condition, target) {
    console.log("if("+this.lhs+" "+this.op+" "+this.rhs+") is " + condition);
    if (condition) {
      if (this.then != null) {
        for (let i = 0; i < this.then.length; i++) {
          if (!this.then[i].perform(target)) {
            return false;
          }
        }
      }
    } else if (this.else != null) {
      for (let i = 0; i < this.else.length; i++) {
        if (!this.else[i].perform(target)) {
          return false;
        }
      }
    }
    return true;
  }

  perform(target){
    switch(this.op){
      case '==':
        return this.performCondition(target.gameState.variables[this.lhs] == this.rhs, target);
      case '!=':
        return this.performCondition(target.gameState.variables[this.lhs] != this.rhs, target);
      case '>=':
        return this.performCondition(target.gameState.variables[this.lhs] >= this.rhs, target);
      case '<=':
        return this.performCondition(target.gameState.variables[this.lhs] <= this.rhs, target);
      case '>':
        return this.performCondition(target.gameState.variables[this.lhs] > this.rhs, target);
      case '<':
        return this.performCondition(target.gameState.variables[this.lhs] < this.rhs, target);
    }
    return true;
  }

  print(indent){
      let str = indent + "ReactionIf(\""+this.type+"\", \""+this.lhs+"\", \""+this.op+"\", \""+this.rhs+"\")\n";
      if(this.then != null){
        for(let i = 0; i != this.then.length; ++i){
          str += this.then[i].print(indent + "  ") + "\n";
        }
      }
      if(this.else != null){
        str += indent + "else\n";
        for(let i = 0; i != this.else.length; ++i){
          str += this.else[i].print(indent + "  ") + "\n";
        }
      }
      str += indent + "endif";
      return str;
  }
}

function loadReactionIfFromJSON(data, loader){
  let r = new ReactionIf(data.lhs, data.op, data.rhs);
  if(data.then != null){
    r.then = [];
    for(let i = 0; i != data.then.length; ++i){
      r.then.push(loadReactionFromJSON(data.then[i], loader));
    }
  }
  if(data.else != null){
    r.else = [];
    for(let i = 0; i != data.else.length; ++i){
      r.else.push(loadReactionFromJSON(data.else[i], loader));
    }
  }
  return r;
}
