class ReactionGoto extends Reaction{
  constructor(room){
    super("goto");
    this.room = room;
  }

  perform(target){
    var room = target.gameScript.getRoom(this.room);
    if(room != null){
        target.setRoom(room);
    } else {
      console.log('goto failed : No room found with name \''+this.room+'\'.');
    }
    return true;
  }
  
  print(indent){
      return indent + "Reaction(\""+this.type+"\")";
  }
}
