class ReactionTimer extends Reaction{
  constructor(timeMS, repeat){
    super("timer");
    this.time = timeMS;
    this.repeat = repeat;
    this.reactions = [];
  }

  perform(target){
    console.log("Add Timer");
    let t = new ReactionTimerInstance(this);
    target.gameState.addTimer(t);
    return true;
  }

  print(indent){
      return indent + "ReactionTimer(\""+this.time+"\",\""+this.repeat+"\")";
  }
}

function loadReactionTimerFromJSON(data, loader){
  let r = new ReactionTimer(data.time, data.repeat);
  if(data.reactions != null){
    r.reactions = [];
    for(let i = 0; i != data.reactions.length; ++i){
      r.reactions.push(loadReactionFromJSON(data.reactions[i], loader));
    }
  }
  return r;
}

class ReactionTimerInstance{
  constructor(sourceReaction){
    this.sourceReaction = sourceReaction;
    this.time = sourceReaction.time;
    this.repeat = sourceReaction.repeat;
  }

  step(deltaTime, target){
    if(this.time >= 0){
      this.time -= deltaTime;
      if(this.time <= 0){
          console.log("Run Timer: " + this.sourceReaction.print(0) + " repeat: " + this.repeat);
          performReactions(this.sourceReaction.reactions, target);
          if(this.repeat > 1){
            --this.repeat;
            this.time += Math.max(this.sourceReaction.time, 0);
            console.log("Repeat timer: time: " + this.time + " repeat: " + this.repeat);
            return true;
          }
      } else {
        return true;
      }
    }
    return false;
  }
}
