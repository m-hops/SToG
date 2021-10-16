//PLAYS SOUND ON ACTION//

class PlaySFXAction extends EventListener {

  constructor(sfx, volume = 1) {

    super();

    this.sfx = sfx;
    this.volume = volume;
  }

  begin() {
    this.sfx.setVolume(this.volume);
    this.sfx.play();
  }
}
