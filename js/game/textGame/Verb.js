class Verb {
  constructor() {
    this.names = [];
    this.reactions = [];
  }
  addName(name){
    this.names.push(name);
  }
  hasName(name){
    return this.names.includes(name);
  }


  addReaction(reaction) {
    this.reactions.push(reaction);
  }

  perform(target){
    performReactions(this.reactions, target);
  }
}
