class Subject {

  constructor() {

    this.name = "";
    this.reactions = [];
  }

  addReaction(reaction) {

    this.reactions.push(reaction);
  }

  getReaction(verb) {

    for (let i = 0; i < this.reactions.length; i++) {
      if (this.reactions[i].verb == verb) {
        return this.reactions[i];
      }
    }

    return null;
  }
}
