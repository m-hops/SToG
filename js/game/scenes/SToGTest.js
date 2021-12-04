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
    if(txt == '' || txt == "return"){
      this.setText(this.gameState.currentRoom.txt);
      this.setImage(this.gameState.currentRoom.img);
    } else if (txt == 'help') {
      this.setImage(helpOverlayIMG);
      this.setText("Verbs.\nUse them!");
    } else if (txt == 'map') {
      let roomMap = this.gameScript.getRoom("map");
      if(roomMap != null){
        this.setRoom(roomMap);
      }
      else {
        console.log("Error, map room not found");
      }
    }else {
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

  update() {
    super.update();
    this.gameState.stepTimers(deltaTime, this);
  }
}
