class GameState {

  constructor() {

    this.previousScene = null;
    this.currentScene = null;
    this.currentMusic = null;
    this.gameVariable = [];
  }

  setGameVariable(varName, value) {

    this.gameVariable[varName] = value;

    console.log("set game variable " + varName + " = " + this.gameVariable[varName]);
  }

  getGameVariable(varName, defaultValue = null) {

    if (this.gameVariable.hasOwnProperty(varName)) {

      return this.gameVariable[varName];
    }

    return defaultValue;
  }

  getBoolGameVariable(varName) {

    if (this.gameVariable.hasOwnProperty(varName)) {

      return this.gameVariable[varName];
    }

    return false;
  }

}
