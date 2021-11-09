class Reaction {

  constructor() {

    this.type = "";
    this.param0 = null;
    this.param1 = null;
    this.then = [];
    this.else = [];
  }

  loadReactions(data, loader) {
    if (data === undefined) {
      return null;
    }
    let reactions = [];

    for(let i = 0; i != data.length; ++i){
        var reaction = new Reaction();
        reaction.loadJSON(data[i], loader);
        reactions.push(reaction);
    }
    return reactions;
  }

  loadJSON(data, loader){
    this.type = data.type.toLowerCase();
    switch(this.type){
      case 'txt':
        this.param0 = data.txt;
        break;
      case 'img':
        this.param0 = loader.loadImage(data.img);
        break;
      case 'goto':
        this.param0 = loader.loadRoom(data.room.toLowerCase());
        break;
      case 'set':
        this.param0 = data.var;
        this.param1 = data.value;
        break;
      case '==':
      case '!=':
      case '>=':
      case '<=':
      case '>':
      case '<':
        this.param0 = data.var;
        this.param1 = data.value;
        this.then = this.loadReactions(data.then, loader);
        this.else = this.loadReactions(data.else, loader);
        break;
      case 'sfx':
        this.param0 = loader.loadSFX(data.sfx);
        break;
      case 'startmusic':
        this.param0 = data.music;
        this.param1 = loader.loadSFX(data.music);
        console.log("load startMusic " + this.param0);
        console.log(this.param1);

        break;
      case 'musicvolume':
        this.param0 = data.level;
        break;
      case 'stopmusic':
        break;
    }
  }

  performCondition(condition, target) {

    if (condition) {
      if (this.then != null) {
        for (let i = 0; i < this.then.length; i++) {
          if (!this.then[i].perform(target)) {
            return false;
          }
        }
      }
    } else {
      if (this.else != null) {
        for (let i = 0; i < this.else.length; i++) {
          if (!this.else[i].perform(target)) {
            return false;
          }
        }
      }

    }
  }

  perform(target){
    switch(this.type){
      case 'txt':
        target.setText(this.param0);
        break;
      case 'img':
        target.setImage(this.param0);
      case 'goto':
        var room = target.gameScript.getRoom(this.param0);
        if(room != null){
            target.setRoom(room);
        } else {
          console.log('goto failed : No room found with name \''+this.param0+'\'.');
        }
        break;
      case 'set':
        target.gameState.variables[this.param0] = this.param1;
        break;
      case '==':
        this.performCondition(target.gameState.variables[this.param0] == this.param1, target);
        break;
      case '!=':
          this.performCondition(target.gameState.variables[this.param0] != this.param1, target);
          break;
      case '>=':
          this.performCondition(target.gameState.variables[this.param0] >= this.param1, target);
          break;
      case '<=':
          this.performCondition(target.gameState.variables[this.param0] <= this.param1, target);
          break;
      case '>':
          this.performCondition(target.gameState.variables[this.param0] > this.param1, target);
          break;
      case '<':
          this.performCondition(target.gameState.variables[this.param0] < this.param1, target);
          break;
      case 'sfx':
          this.param0.play();
          break;
      case 'startmusic':
        target.gameState.startMusic(this.param0, this.param1);
        break;
      case 'musicvolume':
        target.gameState.setMusicVolume(this.param0);
        break;
      case 'stopmusic':
        target.gameState.stopMusic();
        break;
    }
    return true;
  }
}
