class ReactionStartMusic extends Reaction{
  constructor(name, sfx){
    super("startmusic");
    this.name = name;
    this.sfx = sfx;
  }

  perform(target){
    target.gameState.startMusic(this.name, this.sfx);
    return true;
  }
  
  print(indent){
      return indent + "ReactionStartMusic(\""+this.type+"\",\""+this.name+"\")";
  }
}
