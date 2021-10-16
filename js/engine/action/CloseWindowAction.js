class CloseWindowAction extends EventListener {

  constructor(gameOBJ, window) {

    super();

    this.gameOBJ = gameOBJ;
    this.window = window;
  }

  end() {

    // console.log('hit');

    let factorio = this.gameOBJ.scene.getFirstComponentOfType(WindowFactoryComponent);

    factorio.destroyWindow(this.window);
  }
}
