class TextGameState {

  constructor() {

    this.currentRoomName = "";
    this.currentRoom = null;
  }

  setCurrentRoom(room) {

    this.currentRoom = room;
    this.currentRoomName = room.name;
  }
}
