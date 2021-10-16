//HANDLES SCENE CHANGE THROUGH INTERACTION//
class ChangeSceneAction extends EventListener {

  constructor(toScene) {

    super();

    this.toScene = toScene;
  }

  //LINK SCENE OBJECT WITH A STRING NAME TO CALL FOR SCENE CHANGE//
  end() {

    gameState.previousScene = gameState.currentScene;

    gameState.currentScene = this.toScene;

    if (this.toScene == "desktop") {
        rootStateMachine.transit(new SceneState(globalRenderer, new DesktopScene()));
    }

    if (this.toScene == "loading") {
        rootStateMachine.transit(new SceneState(globalRenderer, new LoadingScene()));
    }
  }

}
