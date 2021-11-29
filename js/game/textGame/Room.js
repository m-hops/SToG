class Room {
  constructor(name = "unnamed room",
    img = debugMissingIMG,
    txt = "YOU'RE MISSING ASSETS YOU FUCKING IDIOT (hail raatman)") {

      this.name = name;
      this.img = img;
      this.txt = txt;
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
