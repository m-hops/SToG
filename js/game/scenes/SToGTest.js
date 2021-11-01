class SToGTestScene extends Scene {

  constructor() {
    super();

    this.cameraOBJ();
    this.createUI();
    this.createNewGame();
    this.setRoom(this.gameScript.startRoom);

  }

  createNewGame() {

    this.gameScript = gameScript;//new TextGameScript();
    this.gameState = new TextGameState();
    //
    // //TEST CODE: DELETE LATER AFTER JSON IMPLEMENTATION//
    // let debugRoom = new Room();
    // debugRoom.name = "debugRoom";
    // debugRoom.txt = "You're in the deubg room.\nThere is a door.\nAsshole."
    // this.gameScript.addRoom(debugRoom);
    //
    // let exampleFridge = new Subject();
    // exampleFridge.name = "gun";
    // debugRoom.addSubject(exampleFridge);
    //
    // let exampleFridgeVerb = new Verb();
    // exampleFridgeVerb.name = "want";
    // exampleFridge.addVerb(exampleFridgeVerb);
    //
    // let exampleReaction = new Reaction();
    // exampleReaction.type = "txt";
    // exampleReaction.textToSet = "\nNot until you finish the game."
    // exampleFridgeVerb.addReaction(exampleReaction);
    //
    //
    //
    // let exampleDoor = new Subject();
    // exampleDoor.name = "door";
    // debugRoom.addSubject(exampleDoor);
    //
    // let exampleDoorVerb = new Verb();
    // exampleDoorVerb.name = "open";
    // exampleDoor.addVerb(exampleDoorVerb);
    //
    // let exampleDoorReaction = new Reaction();
    // exampleDoorReaction.type = "goto";
    // exampleDoorReaction.roomToMoveTo = "mooseRoom";
    // exampleDoorVerb.addReaction(exampleDoorReaction);
    //
    // //
    //
    // let roomWithMoose = new Room();
    // roomWithMoose.name = "mooseRoom"
    // roomWithMoose.txt = "You're in a room,\nWITH A MOOSE!"
    // roomWithMoose.img = testMooseIMG;
    // this.gameScript.addRoom(roomWithMoose);
    //
    // let mooseSubject = new Subject();
    // mooseSubject.name = "moose";
    // roomWithMoose.addSubject(mooseSubject);
    //
    // let mooseVerb = new Verb();
    // mooseVerb.name = "touch";
    // mooseSubject.addVerb(mooseVerb);
    //
    // let mooseReaction = new Reaction();
    // mooseReaction.type = "txt";
    // mooseReaction.textToSet = "Why the fuck did you\nTOUCH THE MOOSE?!"
    // mooseVerb.addReaction(mooseReaction);

    //

    //this.gameState.setCurrentRoom(this.gameScript.startRoom);
    //this.setRoom(this.gameScript.startRoom);
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

  TrySubject(name, words){

    let subject = this.gameState.currentRoom.getSubjectByName(name);
    if (subject != null) {
      console.log("subject = " + subject.name);

      for (let h = 0; h < words.length; h++) {
        let verb = subject.getVerb(words[h]);
        if (verb != null) {
          console.log("verb = " + verb.name);
          verb.perform(this);
          return true;
        }
      }
    }
    return false;
  }

  onKeyboardEnter() {
    let txt = this.textInput.value.toLowerCase();
    if(txt == ''){
      this.setText(this.gameState.currentRoom.txt);
    } else {
      let words = txt.split(" ");

      console.log(words);

      let foundSomething = false;
      for (let i = 0; i < words.length; i++) {
        if(this.TrySubject(words[i], words)){
          foundSomething = true;
          break;
        }
      }
      if(!foundSomething){
        this.setText("what?");
      }

    }

    this.textInput.setText("");


  }

  setRoom(room) {
      console.log('setting room to ' + room.name);
    this.gameState.setCurrentRoom(room);
    this.roomImgCOMP.image = room.img;
    this.roomTxtCOMP.text = room.txt;


  }
  setText(txt){
      this.roomTxtCOMP.text = txt;
  }
  setImage(img){
      this.roomImgCOMP.image = img;
  }

}
