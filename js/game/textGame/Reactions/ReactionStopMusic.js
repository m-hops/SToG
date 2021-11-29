class ReactionStopMusic extends Reaction{
  constructor(){
    super("stopmusic");
  }

  perform(target){
    target.gameState.stopMusic();
    return true;
  }
  
  print(indent){
      return indent + "ReactionStopMusic(\"" + this.type + "\")";
  }
}
