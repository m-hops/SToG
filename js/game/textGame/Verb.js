class Verb {
  constructor(name = "") {
    this.name = name;
    this.reactions = [];
  }

  addReaction(reaction) {
    this.reactions.push(reaction);
  }

  perform(target){
    performReactions(this.reactions, target);
  }
}
