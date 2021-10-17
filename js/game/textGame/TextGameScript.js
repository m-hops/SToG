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
}
