class Room {
  constructor(name = "unnamed room",
    img = debugMissingIMG,
    txt = "YOU'RE MISSING ASSETS YOU FUCKING IDIOT (hail raatman)") {

      this.name = name;
      this.img = img;
      this.txt = txt;
      this.subjects = [];
      this.objects = [];
  }

  addSubject(subject) {
    this.subjects.push(subject);
  }

  addObject(obj) {
    this.objects.push(obj);
  }
  getSubjectByName(subjectName) {
    for (let i = 0; i < this.subjects.length; i++) {
      if (this.subjects[i].hasName(subjectName)) {
        return this.subjects[i];
      }
    }
    return null;
  }
}
