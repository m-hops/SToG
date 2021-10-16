class OpenWindowAction extends EventListener {

  constructor(gameOBJ, windowType) {

    super();

    this.gameOBJ = gameOBJ;
    this.windowType = windowType;
  }

  end() {

    let factorio = this.gameOBJ.scene.getFirstComponentOfType(WindowFactoryComponent);

    let window = factorio.getOrCreateWindow(this.windowType);
    let focuser = this.gameOBJ.scene.getFirstComponentOfType(WindowFocusComponent);

    focuser.setFocusNextFrame(window);
  }
}
