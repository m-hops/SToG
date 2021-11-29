class Subject {
  constructor(name = "") {
    this.name = name;
    this.verbs = [];
  }

  addVerb(verb) {
    this.verbs.push(verb);
  }

  getVerb(name) {
    for (let i = 0; i < this.verbs.length; i++) {
      if (this.verbs[i].name == name) {
        return this.verbs[i];
      }
    }
    return null;
  }
}
