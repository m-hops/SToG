//PLAYS MUSIC//

class MusicPlayerComponent extends Component {

  constructor(music = null, volume = 0.3) {

    super();

    this.music = music;
    this.volume = volume;
  }

  //STARTS MUSIC UPON ADDITION TO SCENE//
  start() {
    super.start();

    this.startMusic();
  }

  //ENDS MUSIC IN SCENE//
  end() {
    super.end();
  }


  startMusic() {

    if (gameState.currentMusic == this.music){
      return;
    }

    if (gameState.currentMusic != null) {
      gameState.currentMusic.stop();
      gameState.currentMusic = null;
    }

    if (this.music != null) {
      this.music.setVolume(this.volume);
      this.music.loop();

      gameState.currentMusic = this.music;
    }
  }

  stopMusic() {

    if (gameState.currentMusic != null) {
      gameState.currentMusic.stop();
      gameState.currentMusic = null;
    }

  }

  playMusic(music) {
    this.stopMusic();

    this.music = music;

    this.startMusic();
  }
}
