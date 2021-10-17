class SToGTestScene extends Scene {

  constructor() {
    super();

    this.cameraOBJ();
    this.createUI();
    this.createNewGame();
    this.setRoom(this.gameState.currentRoom);
  }

  createNewGame() {

    this.gameScript = new TextGameScript();
    this.gameState = new TextGameState();

    //TEST CODE: DELETE LATER AFTER JSON IMPLEMENTATION//
    let debugRoom = new Room();
    debugRoom.name = "debugRoom";

    let exampleFridge = new Subject();
    exampleFridge.name = "fridge";

    let exampleReaction = new Reaction();
    exampleReaction.verb = "inspect";

    exampleFridge.addReaction(exampleReaction);
    debugRoom.addSubject(exampleFridge);
    this.gameScript.addRoom(debugRoom);
    //

    this.gameState.setCurrentRoom(this.gameScript.startRoom);
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

    this.imgOBJ = new GameObject();

    this.imgOBJ.addComponent(new Transform());
    this.imgCOMP = new ImageComponent(debugMissingIMG);
    this.imgOBJ.addComponent(this.imgCOMP);

    this.addGameObject(this.imgOBJ);

    this.textInput = new TextFieldPrefab(new CallbackAction2 (this, this.onKeyboardEnter));

    this.textInput.textField.color = 255;
    this.textInput.addComponent(new RectColliderComponent(AABB.MakeSize(100, 25)));
    this.textInput.addComponent(new RenderDebugComponent());
    this.textInput.getTransform().local.position.x = 100;
    this.textInput.getTransform().local.position.y = 500;

    this.desktop.addChild(this.textInput);
    this.addGameObject(this.desktop);
    this.addGameObject(this.windowMag);
  }

  setRoom(room) {

    this.imgCOMP.image = room.img;

    console.log('setting room to ' + room.name);

  }

  onKeyboardEnter() {
    let txt = this.textInput.value.toLowerCase();
    let words = txt.split(" ");

    console.log(words);

    for (let i = 0; i < words.length; i++) {

      let subject = this.gameState.currentRoom.getSubjectByName(words[i]);

      if (subject != null) {
        console.log("subject = " + subject.name);

        for (let h = 0; h < words.length; h++) {

          let reaction = subject.getReaction(words[h]);

          if (reaction != null) {

            console.log("subject = " + subject.name + " verb = " + reaction.verb);
          }
        }
      }
    }

    this.textInput.setText("");


  }

}
