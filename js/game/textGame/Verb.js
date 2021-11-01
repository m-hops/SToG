class Verb {

  constructor() {

    this.name = "";
    this.reactions = [];
  }

  addReaction(reaction) {

    this.reactions.push(reaction);
  }
  perform(target){
    for(let i = 0; i != this.reactions.length; ++i){
      if(!this.reactions[i].perform(target)) return;
    }
  }
}
