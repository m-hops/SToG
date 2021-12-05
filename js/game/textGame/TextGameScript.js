class TextGameScript {
  constructor() {
    this.rooms = [];
    this.startRoom = null;
    this.roomRefToFix = [];
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
    for(let iRoom = 0; iRoom != data.length; ++iRoom){
      var room = new Room();
      room.name = data[iRoom].name.toLowerCase();
      room.img = this.loadImage(data[iRoom].img);
      room.txt = this.loadText(data[iRoom].txt);
      this.addRoom(room);
      console.log('loading room:"' + room.name + '"');
      for(let i = 0; i != data[iRoom].subjects.length; ++i){
        room.addSubject(this.loadJSONSubject(data[iRoom].subjects[i]));
      }
      for(let i = 0; i != data[iRoom].objects.length; ++i){
        room.addObject(loadObjectFromJSON(data[iRoom].objects[i], this));
      }

      console.log(data[iRoom]);
    }
    for(let i = 0; i != this.roomRefToFix.length; ++i){
      var r = this.getRoom(this.roomRefToFix[i].room);
      if(r == null){
        console.log("[ERROR] Room not found \"" + this.roomRefToFix[i].room + "\"");
      }
    }
    this.roomRefToFix = [];
  }

  loadJSONSubject(data){
    var subject = new Subject();
    for(let i = 0; i != data.names.length; ++i){
        subject.names.push(data.names[i].toLowerCase());
    }
    for(let i = 0; i != data.verbs.length; ++i){
      subject.addVerb(this.loadJSONVerb(data.verbs[i]));
    }
    return subject;
  }

  loadJSONVerb(data){
    var verb = new Verb();
    for(let i = 0; i != data.names.length; ++i){
        verb.names.push(data.names[i].toLowerCase());
    }
    for(let i = 0; i != data.reactions.length; ++i){
      verb.addReaction(this.loadJSONReaction(data.reactions[i]));
    }
    return verb;
  }

  loadJSONReaction(data){
    let r = loadReactionFromJSON(data, this);
    // if(r != null){
    //   let str = r.print("|");
    //   console.log("loadJSONReaction:\n" + str);
    // }
    return r;
  }

  loadImage(img){
    if(img == undefined || img == ''){
      console.log("'img' must be set to the image file");
    }
    return loadImage(img);
  }

  loadRoom(name, ref = null){
    if(ref != null){
        this.roomRefToFix.push(ref);
    }
    return name;
  }

  loadSFX(sfx){
    if(sfx == undefined || sfx == ''){
      console.log("'sfx' must be set to the sfx file");
    }
    return loadSound(sfx);
  }
  loadText(txt){
    return txt.replace("\\n", "\n");
  }
}
