class Component {

  constructor() {
    this.gameObject = null;
  }
  getScene() {
    return this.gameObject.getScene();
  }
  onEnable() {
    //CALLED WHEN THE OWNER GAME OBJECT ENABLE//
  }

  onDisable() {
    //CALLED WHEN THE OWNER GAME OBJECT DISABLE//
  }

  start() {
    //CALLED WHEN THE OWNER GAME OBJECT STARTS//
  }

  update() {
    //CALLED EVERY FRAME WHEN OWNER GAME OBJECT IS UPDATED//
  }

  end() {
    //CALLED WHEN THE OWNER GAME OBJECT ENDS//
  }


  drawDebugInfo(renderer, region){

  }
}
