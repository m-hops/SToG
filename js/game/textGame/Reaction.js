class Reaction {

  constructor() {

    this.type = "";
    this.param0 = null;
    this.param1 = null;

  }
  loadJSON(data, loader){
    this.type = data.type;
    switch(data.type){
      case 'txt':
        this.param0 = data.txt;
        break;
      case 'img':
        this.param0 = loader.loadImage(data.img);
        break;
      case 'goto':
        this.param0 = loader.loadRoom(data.room);
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
        break;

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
        return target.gameState.variables[this.param0] == this.param1;
      case '!=':
        return target.gameState.variables[this.param0] != this.param1;
      case '>=':
        return target.gameState.variables[this.param0] >= this.param1;
      case '<=':
        return target.gameState.variables[this.param0] <= this.param1;
      case '>':
        return target.gameState.variables[this.param0] > this.param1;
      case '<':
        return target.gameState.variables[this.param0] < this.param1;

    }
    return true;
  }
}
