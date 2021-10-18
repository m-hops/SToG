class SToGTestScene extends Scene {

  constructor() {
    super();

    this.cameraOBJ();
    this.createUI();
    this.createNewGame();
    this.setRoom(this.gameScript.startRoom);
  }

  createNewGame() {

    this.gameScript = new TextGameScript();
    this.gameState = new TextGameState();

    //TEST CODE: DELETE LATER AFTER JSON IMPLEMENTATION//
    let debugRoom = new Room();
    debugRoom.name = "debugRoom";
    debugRoom.txt = "You're in the deubg room.\nThere is a door.\nAsshole."
    this.gameScript.addRoom(debugRoom);

    let exampleFridge = new Subject();
    exampleFridge.name = "gun";
    debugRoom.addSubject(exampleFridge);

    let exampleReaction = new Reaction();
    exampleReaction.verb = "want";
    exampleReaction.textToSet = "\nNot until you finish the game."
    exampleFridge.addReaction(exampleReaction);

    let exampleDoor = new Subject();
    exampleDoor.name = "door";
    debugRoom.addSubject(exampleDoor);

    let exampleDoorReaction = new Reaction();
    exampleDoorReaction.verb = "open";
    exampleDoorReaction.roomToMoveTo = "mooseRoom";
    exampleDoor.addReaction(exampleDoorReaction);

    //

    let roomWithMoose = new Room();
    roomWithMoose.name = "mooseRoom"
    roomWithMoose.txt = "You're in a room,\nWITH A MOOSE!"
    roomWithMoose.img = testMooseIMG;
    this.gameScript.addRoom(roomWithMoose);

    let mooseSubject = new Subject();
    mooseSubject.name = "moose";
    roomWithMoose.addSubject(mooseSubject);

    let mooseReaction = new Reaction();
    mooseReaction.verb = "touch";
    mooseReaction.textToSet = "Why the fuck did you\nTOUCH THE MOOSE?!"
    mooseSubject.addReaction(mooseReaction);

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

    //CURRENT ROOM IMAGE IN VIEWPORT//
    this.roomImgOBJ = new GameObject();

    this.roomImgOBJ.addComponent(new Transform());
    this.roomImgCOMP = new ImageComponent(debugMissingIMG);
    this.roomImgOBJ.addComponent(this.roomImgCOMP);

    this.addGameObject(this.roomImgOBJ);
    //

    //CURRENT ROOM TXT IN VIEWPORT//
    this.roomTxtOBJ = new GameObject();

    this.roomTxtOBJ.addComponent(new Transform());
    this.roomTxtOBJ.getTransform().local.position.x = 256;
    this.roomTxtOBJ.getTransform().local.position.y = 385;
    this.roomTxtOBJ.getTransform().local.position.z = -2;

    this.roomTxtCOMP = new TextComponent("", dosFont);
    this.roomTxtCOMP.color = 'rgb(237,241,197)';
    this.roomTxtCOMP.textAlignH = CENTER;
    this.roomTxtCOMP.textSize = 20;

    this.roomTxtOBJ.addComponent(this.roomTxtCOMP);

    this.addGameObject(this.roomTxtOBJ);
    //

    //MAIN OVERLAY//
    this.mainOverlay = new GameObject();

    this.mainOverlay.addComponent(new Transform());
    this.mainOverlay.addComponent(new ImageComponent(mainOverlayIMG));

    this.addGameObject(this.mainOverlay);
    //

    //USER TEXT INPUT FIELD//
    this.textInput = new TextFieldPrefab(new CallbackAction2 (this, this.onKeyboardEnter));

    this.textInput.textField.color = 'rgb(237,241,197)';
    this.textInput.textField.font = dosFont;
    this.textInput.addComponent(new RectColliderComponent(AABB.MakeSize(475, 25)));
    // this.textInput.addComponent(new RenderDebugComponent());
    this.textInput.getTransform().local.position.x = 19;
    this.textInput.getTransform().local.position.y = 473;

    this.desktop.addChild(this.textInput);
    //

    this.addGameObject(this.desktop);
    this.addGameObject(this.windowMag);
  }

  setRoom(room) {
    this.gameState.setCurrentRoom(room);
    this.roomImgCOMP.image = room.img;
    this.roomTxtCOMP.text = room.txt;

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

            if (reaction.textToSet != null) {
              this.roomTxtCOMP.text = reaction.textToSet;
            }

            if (reaction.roomToMoveTo != null) {
              let room = this.gameScript.getRoom(reaction.roomToMoveTo);
              if (room != null) {
                this.setRoom(room);
              }
            }
            console.log("subject = " + subject.name + " verb = " + reaction.verb);
          }
        }
      }
    }

    this.textInput.setText("");


  }

}
