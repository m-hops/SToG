class ReactionMusicVolume extends Reaction{
  constructor(level = 1){
    super("musicvolume");
    this.level = level;
  }

  perform(target){
    target.gameState.setMusicVolume(this.level);
    return true;
  }
  
  print(indent){
      return indent + "ReactionMusicVolume(\""+this.type+"\", \""+this.level+"\")";
  }
}
