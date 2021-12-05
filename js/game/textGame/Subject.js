class Subject {
  constructor() {
    this.names = [];
    this.verbs = [];
  }
  addName(name){
    this.names.push(name);
  }
  hasName(name){
    return this.names.includes(name);
  }

  addVerb(verb) {
    this.verbs.push(verb);
  }

  getVerb(name) {
    for (let i = 0; i < this.verbs.length; i++) {
      if (this.verbs[i].hasName(name)) {
        return this.verbs[i];
      }
    }
    return null;
  }
}
