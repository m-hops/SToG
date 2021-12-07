class SToGTestScene extends Scene {

  constructor() {
    super();

    this.roomObjects = [];
    this.cameraOBJ();
    this.createUI();
    this.createNewGame();
    this.setRoom(this.gameScript.startRoom);
    this.displayTextQueue = [];
    this.currentDisplayTextIndex = 0;
    this.inputState = 'cmd';
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
    this.roomTxtOBJ.getTransform().local.position.z = -3;

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

    this.mainOverlay.getTransform().local.position.z = -2;

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
    this.textInput.getTransform().local.position.z = -2;

    this.desktop.addChild(this.textInput);
    //

    this.addGameObject(this.desktop);
    this.addGameObject(this.windowMag);
  }

  TrySubject(name, words){

    let subject = this.gameState.currentRoom.getSubjectByName(name);
    if (subject != null) {

      for (let h = 0; h < words.length; h++) {
        let verb = subject.getVerb(words[h]);
        if (verb != null) {

          console.log(
            "Found:\n" +
            "subject = " + subject.names + "\n" +
            "verb = " + verb.names + "\n"
          );
          verb.perform(this);
          return true;
        }
      }
    }
    return false;
  }

  TryVerb(name, words){
    let verb = this.gameState.currentRoom.getVerbByName(name);
      console.log(verb);
    if (verb != null) {

      console.log(
        "Found:\n" +
        "verb = " + verb.names + "\n"
      );
      verb.perform(this);
      return true;
    }
    return false;
  }

  checkMessageQueue(){
    if(this.displayTextQueue != null){
      this.setUIText(this.displayTextQueue[0]);
      if(this.displayTextQueue.length > 1){
        // enter display text sequence state;
        this.textInput.inputEnabled = false;
        this.inputState = 'msg';
        this.currentDisplayTextIndex = 0;
      }
    }
  }
  stepMessageQueue(){
    ++this.currentDisplayTextIndex;
    this.setUIText(this.displayTextQueue[this.currentDisplayTextIndex]);
    if(this.currentDisplayTextIndex >= this.displayTextQueue.length - 1){
      // last msg;
      this.enterCommandState();
    }
  }
  enterCommandState(){
    this.inputState = 'cmd';
    this.textInput.inputEnabled = true;
  }

  processInputCommand(txt){

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
    }else if (txt == 'item'||txt == 'inventory'||txt=='items') {
      let inventory = this.gameScript.getRoom("inventory");
      if(inventory != null){
        this.setRoom(inventory);
      }else{
        console.log("Error, inventory room not found");
      }
    }else if (txt == 'leave') {
        let entrance = this.gameScript.getRoom("entrance");
        if(entrance != null){
          this.setRoom(entrance);
        }else{
          console.log("Error, entrance room not found");
        }
      }else if (txt == 'cellphone'||txt =='phone') {
            let cellphone = this.gameScript.getRoom("cellphone");
            if(cellphone != null){
              this.setRoom(cellphone);
            }else{
              console.log("Error, cellphone room not found");
            }
          }else if (txt == 'break wall'||txt =='data') {
            window.location.href = 'js/_typedWordCounter/index.php';
          }else {
      let words = txt.split(" ");

      this.displayTextQueue = null;

      let foundSomething = false;
      // try subjects
      for (let i = 0; i < words.length; i++) {
        if(this.TrySubject(words[i], words)){
          foundSomething = true;
          break;
        }
      }
      // try standalone verbs
      if(!foundSomething){
        for (let i = 0; i < words.length; i++) {
          if(this.TryVerb(words[i], words)){
            foundSomething = true;
            break;
          }
        }
      }
      if(!foundSomething){
        this.setUIText("what?");
      } else {
        this.updateRoomObjects();
        this.checkMessageQueue();
      }

    }

    this.textInput.setText("");
  }
  onKeyboardEnter() {
    switch(this.inputState)
    {
      case 'cmd':
        // entering command
        this.processInputCommand(this.textInput.value.toLowerCase());
        break;
      case 'msg':
        // flips through a sequence of display messages
        this.stepMessageQueue();
        break;
    }
  }

  setRoom(room) {
      console.log('setting room to ' + room.name);
    this.gameState.setCurrentRoom(room);
    this.roomImgCOMP.image = room.img;
    this.roomTxtCOMP.text = room.txt;
    this.updateRoomObjects();

  }
  updateRoomObjects(){
    let room = this.gameState.currentRoom;
    for(let i =0; i != this.roomObjects.length; ++i){
        this.removeGameObject(this.roomObjects[i]);
    }
    this.roomObjects = [];
    for(let i =0; i != room.objects.length; ++i){
      let go = this.createRoomObject(room.objects[i]);
      if(go != null){
        console.log("Adding object: " + go.name);
        this.roomObjects.push(go);
        this.addGameObject(go);
      }
    }
  }

  createRoomObject(roomObject){
    if(roomObject.isEnabled(this.gameState)){
      let go = new GameObject(roomObject.name);
      let trf = new Transform();
      trf.local.setPosition(roomObject.position.x, roomObject.position.y, roomObject.position.z);
      go.addComponent(trf);
      if(roomObject.img != "" && roomObject.img != null){
        let compImg = new ImageComponent(roomObject.img);
        go.addComponent(compImg);
      }
      for(let i =0; i != roomObject.objs.length; ++i){
        let child = this.createRoomObject(roomObject.objs[i]);
        if(child != null){
          go.addChild(child);
        }
      }
      return go;
    } else {
        console.log("Desabled object: " + roomObject.name);
    }
    return null;
  }

  setUIText(txt){
    this.roomTxtCOMP.text = txt;
  }
  setText(txt){
    if(this.displayTextQueue == null){
      this.displayTextQueue = [];
    }
    if(Array.isArray(txt)){
      this.displayTextQueue = this.displayTextQueue.concat(txt);
    } else {
      this.displayTextQueue.push(txt);
    }

    //this.roomTxtCOMP.text = txt;
  }
  setImage(img){
      this.roomImgCOMP.image = img;
  }

  update() {
    super.update();
    this.gameState.stepTimers(deltaTime, this);
  }
}
