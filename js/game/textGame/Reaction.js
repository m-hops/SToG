class Reaction {
  constructor(cmd="") {
    this.type = cmd;
  }

  loadReactions(data, loader) {
    if (data === undefined) {
      return null;
    }
    let reactions = [];
    for(let i = 0; i != data.length; ++i){
        var reaction = new Reaction();
        reaction.loadJSON(data[i], loader);
        reactions.push(reaction);
    }
    return reactions;
  }

  perform(target){
    return true;
  }

  print(indent){
      return indent + "Reaction(\""+this.type+"\")";
  }
}

class ReactionError extends Reaction{
  constructor(txt){
    super("err");
    this.txt = txt;
  }

  perform(target){
    console.log("[ERROR] " + this.txt);
    return true;
  }

  print(indent){
      return indent + "ReactionError(\""+this.type+"\", \""+this.txt+"\")";
  }
}

function loadReactionFromJSON(data, loader){
  switch(data.type.toLowerCase()){
    case 'txt':
      return new ReactionTxt(loader.loadText(data.txt));
    case 'img':
      return new ReactionImg(loader.loadImage(data.img));
    case 'goto':
      let g = new ReactionGoto();
      g.room = loader.loadRoom(data.room.toLowerCase(), g);
      return g;
    case 'set':
      return new ReactionSet(data.var, data.value);
    case 'add':
      return new ReactionAdd(data.var, data.value);
    case 'if':
      return loadReactionIfFromJSON(data, loader);
    case 'timer':
      return loadReactionTimerFromJSON(data, loader);
    case 'sfx':
      return new ReactionSFX(loader.loadSFX(data.sfx));
    case 'startmusic':
      return new ReactionStartMusic(data.name, loader.loadSFX(data.name));
    case 'musicvolume':
      return new ReactionMusicVolume(data.level);
    case 'stopmusic':
      return new ReactionStopMusic();
  }
  return new ReactionError("unknown command type '" + data.type + "'");
}

function performReactions(reactions, target){
  for(let i = 0; i != reactions.length; ++i){
    if(!reactions[i].perform(target)) return;
  }
}
