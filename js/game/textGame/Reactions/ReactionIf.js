class ReactionIf extends Reaction{
  constructor(condition){
    super("if");
    this.condition = condition;
    this.then = [];
    this.else = [];
  }


  perform(target){
    let result = this.condition.execute(target.gameState);
    console.log("if " + this.condition.print() + " is " + result);
    if(result){
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

  print(indent){
      let str = indent + "ReactionIf(\""+this.type+"\", \""+this.condition.print()+"\")\n";
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
  let r = new ReactionIf(loadConditionFromJSON(data.condition, loader));
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
