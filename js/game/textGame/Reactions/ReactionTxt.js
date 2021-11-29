class ReactionTxt extends Reaction{
  constructor(txt = "text not set"){
    super("txt");
    this.txt = txt;
  }

  perform(target){
    console.log("ReactionTxt");
    target.setText(this.txt);
    return true;
  }
  
  print(indent){
      return indent + "ReactionTxt(\"" + this.type + "\", \"" + this.txt + "\")";
  }
}
