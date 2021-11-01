class TextGameScript {

  constructor() {

    this.rooms = [];
    this.startRoom = null;
  }

  addRoom(room) {

    this.rooms.push(room);

    if (this.startRoom == null) {
      this.startRoom = room;
    }
  }

  getRoom(roomName) {

    for (let i = 0; i < this.rooms.length; i++) {

      if (this.rooms[i].name == roomName) {
        return this.rooms[i];
      }
    }

    return null;
  }

  loadJSON(path){
    var data = loadJSON(path, this.onJSONLoaded.bind(this));
  }
  onJSONLoaded(data){
    var room = new Room();
    room.name = data.roomName.toLowerCase();
    room.img = loadImage(data.img);
    room.txt = data.txt;
    this.addRoom(room);
    console.log('loading room:');
    console.log(data);
    for(let i = 0; i != data.subjects.length; ++i){
      room.addSubject(this.loadJSONSubject(data.subjects[i]));
    }
    //room.name = data.subjects;
  }

  loadJSONSubject(data){
    var subject = new Subject();
    subject.name = data.name.toLowerCase();

    for(let i = 0; i != data.verbs.length; ++i){
      subject.addVerb(this.loadJSONVerb(data.verbs[i]));
    }
    return subject;
  }

  loadJSONVerb(data){
    var verb = new Verb();
    verb.name = data.name.toLowerCase();
    for(let i = 0; i != data.actions.length; ++i){
      verb.addReaction(this.loadJSONReaction(data.actions[i]));
    }
    return verb;
  }
  loadJSONReaction(data){
    var reaction = new Reaction();
    reaction.loadJSON(data, this);
    return reaction;
  }
  loadImage(img){
    if(img == undefined || img == ''){
      console.log("'img' must be set to the image file");
    }
    return loadImage(img);
  }
  loadRoom(name){
    if(this.getRoom(name) == null){
     this.loadJSON('assets/JSON/' + name + '.json');
    }
    return name;
  }
}
