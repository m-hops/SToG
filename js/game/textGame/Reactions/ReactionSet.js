class ReactionSet extends Reaction{
  constructor(varName = "unknown_var", value = ""){
    super("set");
    this.var = varName;
    this.value = value;
  }

  perform(target){
    console.log("Setting variable '"+this.var+"' = "+this.value);
    target.gameState.variables[this.var] = this.value;
    return true;
  }
  
  print(indent){
      return indent + "ReactionSet(\""+this.type+"\",\""+this.var+"\",\""+this.value+"\")";
  }
}
