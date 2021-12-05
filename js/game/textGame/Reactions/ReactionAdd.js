class ReactionAdd extends Reaction{
  constructor(varName = "unknown_var", value = ""){
    super("add");
    this.var = varName;
    this.value = parseFloat(value);
  }

  perform(target){
    let v = target.gameState.variables[this.var];
    if( v !== undefined ){
      v = parseFloat(v);
    } else {
      v = 0;
    }
    v += this.value;
    target.gameState.variables[this.var] = v;
    console.log("Adding variable: "+this.var+" += "+this.value + " now is " + v);
    return true;
  }

  print(indent){
      return indent + "ReactionAdd(\""+this.type+"\",\""+this.var+"\",\""+this.value+"\")";
  }
}
