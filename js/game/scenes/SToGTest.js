class SToGTestScene extends Scene {

  constructor() {
    super();

    this.cameraOBJ();
    // this.staticOverlayOBJ();
    // this.testSceneVisualOBJ();
    this.createUI();

  }

  cameraOBJ() {
    //CAMERA SETUP//
    this.camera = new GameObject();

    this.camera.addComponent(new CameraComponent());
    this.camera.addComponent(new Transform());

    this.addGameObject(this.camera);
  }

  createUI() {

    this.windowMag = new WindowManagerPrefab();

    this.desktop = new WindowDesktop();
    this.desktop.getTransform().local.position.z = -1;

    this.textInput = new TextFieldPrefab();

    this.textInput.textField.color = 255;
    this.textInput.addComponent(new RectColliderComponent(AABB.MakeSize(100, 25)));
    this.textInput.addComponent(new RenderDebugComponent());
    this.textInput.getTransform().local.position.x = 100;
    this.textInput.getTransform().local.position.y = 500;

    this.desktop.addChild(this.textInput);
    this.addGameObject(this.desktop);
    this.addGameObject(this.windowMag);
  }

  staticOverlayOBJ() {
    //FLAT DESKTOP OVERLAY//

    this.staticOverlay = new GameObject();
    this.staticOverlay.addComponent(new Transform(0,0));
    this.staticOverlay.addComponent(new ImageComponent(mainOverlayIMG));

    this.staticOverlay.getTransform().local.position.z = 0;

    this.staticOverlay.getTransform().local.setScale(0.5,0.5);

    this.addGameObject(this.staticOverlay);
  }

  testSceneVisualOBJ() {
    //TEST IMAGE FOR SCENE//

    this.testSceneOverlay = new GameObject();
    this.testSceneOverlay.addComponent(new Transform(0,0));
    this.testSceneOverlay.addComponent(new ImageComponent(testBedroomIMG));

    this.testSceneOverlay.getTransform().local.position.x = 50;
    this.testSceneOverlay.getTransform().local.position.y = -100;
    this.testSceneOverlay.getTransform().local.position.z = 30;

    this.testSceneOverlay.getTransform().local.setScale(0.9,0.9);

    this.addGameObject(this.testSceneOverlay);
  }

}
