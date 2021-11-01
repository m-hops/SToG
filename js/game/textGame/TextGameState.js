class TextGameState extends GameState{

  constructor() {
    super();
    this.currentRoomName = "";
    this.currentRoom = null;
    this.variables = [];
  }

  setCurrentRoom(room) {

    this.currentRoom = room;
    this.currentRoomName = room.name;
  }
}
