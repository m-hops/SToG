class ReactionSFX extends Reaction{
  constructor(sfx){
    super("sfx");
    this.sfx = sfx;
  }

  perform(target){
    console.log("ReactionSFX: " + this.sfx.url);
    try{
      this.sfx.play();
    } catch(e){
      console.log("[ERROR] failed to play sfx " + e + "\nsfx="+JSON.stringify(this.sfx));
    }
    return true;
  }
  
  print(indent){
      return indent + "ReactionSFX(\""+this.type+"\", \""+this.sfx.url+"\")";
  }
}
