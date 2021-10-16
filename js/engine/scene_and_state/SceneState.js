class SceneState extends IState {

  constructor(renderer,scene) {

    super();

    this.sceneToRun = scene;
    this.renderer = renderer;

  }

  //LOADS AND RUNS COMPONENTS FOR SCENE THAT HAS BEEN ENTERED INTO//
  onEnter(sm) {
    if (this.sceneToRun != null) {
      this.sceneToRun.start();
    }
  }

  //REMOVES COMPONENTS FOR SCENE THAT HAS BEEN LEFT//
  onLeave(sm) {
    if (this.sceneToRun != null) {
      this.sceneToRun.end();
    }

  }

  //SCENE FUNCTIONS THAT NEED TO BE UPDATED EVERY FRAME//
  update(sm) {
    if (this.sceneToRun != null) {
      this.sceneToRun.update();
    }
  }

  //SCENE VISUALS THAT NEED TO BE UPDATED EVERY FRAME//
  draw(sm) {
    if (this.sceneToRun != null) {
      this.renderer.render(this.sceneToRun);
    }
  }

  onMouseClick(sm) {
    let mouseComponents = this.sceneToRun.getAllComponentType(MouseComponent);

    for (let i = 0; i < mouseComponents.length; i++) {
      mouseComponents[i].onMouseClick();
    }
  }

  onMousePressed(sm) {
    let mouseComponents = this.sceneToRun.getAllComponentType(MouseComponent);

    for (let i = 0; i < mouseComponents.length; i++) {
      mouseComponents[i].onMousePressed();
    }
  }

  onMouseReleased(sm) {
    let mouseComponents = this.sceneToRun.getAllComponentType(MouseComponent);

    for (let i = 0; i < mouseComponents.length; i++) {
      mouseComponents[i].onMouseReleased();
    }
  }

  onKeyPress(sm, keyCode) {

      let keyboardComponents = this.sceneToRun.getAllComponentType(KeyboardComponent);

      for (let i = 0; i < keyboardComponents.length; i++) {
        keyboardComponents[i].onKeyPress(keyCode);
      }
  }

  onKeyType(sm, key) {

      let keyboardComponents = this.sceneToRun.getAllComponentType(KeyboardComponent);

      for (let i = 0; i < keyboardComponents.length; i++) {
        keyboardComponents[i].onKeyType(key);
      }
  }
}
