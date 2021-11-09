class TextGameState extends GameState{

  constructor() {
    super();
    this.currentRoomName = "";
    this.currentRoom = null;
    this.variables = [];
    this.currentMusicName = null;
    this.currentMusic = null;
  }

  startMusic(name, sound) {

    this.stopMusic();

    this.currentMusicName = name;
    this.currentMusic = sound;

    this.currentMusic.loop();
    console.log("startMusic " + this.currentMusicName);
    console.log(this.currentMusic);
  }

  stopMusic() {

    if (this.currentMusic != null) {

      this.currentMusic.stop();
      this.currentMusic = null;
      this.currentMusicName = null;
    }
  }

  setMusicVolume(level) {

    if (this.currentMusic != null) {

      this.currentMusic.setVoume(level);
    }

  }

  setCurrentRoom(room) {

    this.currentRoom = room;
    this.currentRoomName = room.name;
  }
}
