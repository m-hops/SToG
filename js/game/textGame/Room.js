class Room {

  constructor() {

      this.name = "unnamed room"
      this.img = debugMissingIMG;
      this.txt = "YOU'RE MISSING ASSETS YOU FUCKING IDIOT (hail raatman)"
      this.subjects = [];
  }

  addSubject(subject) {

    this.subjects.push(subject);
  }

  getSubjectByName(subjectName) {

    for (let i = 0; i < this.subjects.length; i++) {
      if (this.subjects[i].name == subjectName) {
        return this.subjects[i];
      }
    }

    return null;
  }

}
