class WindowManagerPrefab extends GameObject {

  constructor() {

    super();

    this.collection = new WindowCollectionComponent();
    this.factory = new WindowFactoryComponent();
    this.focuser = new WindowFocusComponent();
    this.mouseComponent = new MouseComponent();
    this.keyboardComponent = new KeyboardComponent();

    this.addComponent(this.collection);
    this.addComponent(this.factory);
    this.addComponent(this.focuser);
    this.addComponent(this.mouseComponent);
    this.addComponent(this.keyboardComponent);

    this.mouseComponent.onMouseClickEvent.addListener(new CallbackAction2(this, this.onClick));
    this.mouseComponent.onMousePressedEvent.addListener(new CallbackAction2(this, this.onMousePressed));
    this.mouseComponent.onMouseReleasedEvent.addListener(new CallbackAction2(this, this.onMouseReleased));
    this.keyboardComponent.onKeyPressEvent.addListener(new CallbackAction2(this, this.onKeyPress));
    this.keyboardComponent.onKeyTypeEvent.addListener(new CallbackAction2(this, this.onKeyType));
    this.lastWindowPressed = null;
  }
  start() {
    super.start();
    let focus = this.scene.getFirstComponentOfType(WindowInputReceiverComponent);

    if (focus != null) {
      this.focusOn(focus.gameObject);
    }
  }
  focusOn(window){

    let focuser = this.scene.getFirstComponentOfType(WindowFocusComponent);
    if(focuser != null){
      focuser.setFocus(window);
    } else {
      console.log("Cannot focus on window as there are no WindowFocusComponent in the scene");
    }
  }
  onClick() {

    let windows = [];

    this.collection.windows.visit(function(w){
      windows.push(w);
      return true;
    })

    Renderer.sortGameObjectArrayLocal(windows);

    let mousePosition = new p5.Vector(mouseX, mouseY);
    for (let iRev = 0; iRev < windows.length; iRev++) {
      let i = windows.length - iRev - 1;
      let inputRec = windows[i].components.getFirstElementOfType(WindowInputReceiverComponent);
      if (inputRec != null) {
        let processed = inputRec.processMouseClick(mousePosition);
        if (processed) {
          this.focusOn(windows[i]);
          return;
        }
      }
    }
  }

  onMousePressed() {

    let windows = [];

    this.collection.windows.visit(function(w){
      windows.push(w);
      return true;
    })

    Renderer.sortGameObjectArrayLocal(windows);

    let mousePosition = new p5.Vector(mouseX, mouseY);
    for (let iRev = 0; iRev < windows.length; iRev++) {
      let i = windows.length - iRev - 1;
      let inputRec = windows[i].components.getFirstElementOfType(WindowInputReceiverComponent);
      if (inputRec != null) {
        let processed = inputRec.processMousePressed(mousePosition);
        if (processed) {
          this.lastWindowPressed = inputRec;
          this.focusOn(windows[i]);
          return;
        }
      }
    }
  }

  onMouseReleased() {


    let mousePosition = new p5.Vector(mouseX, mouseY);

    if(this.lastWindowPressed != null){
      if(this.lastWindowPressed.processMouseReleased(mousePosition)){
        return;
      }
    }

    let windows = [];

    this.collection.windows.visit(function(w){
      windows.push(w);
      return true;
    })

    Renderer.sortGameObjectArrayLocal(windows);

    for (let iRev = 0; iRev < windows.length; iRev++) {
      let i = windows.length - iRev - 1;
      let inputRec = windows[i].components.getFirstElementOfType(WindowInputReceiverComponent);
      if (inputRec != null) {
        let processed = inputRec.processMouseReleased(mousePosition);
        if (processed) {
          return;
        }
      }
    }
  }

  onKeyPress(event, keyCode) {
    // console.log('windowManager ' + keyCode);
      let focuser = this.scene.getFirstComponentOfType(WindowFocusComponent);

      if (focuser.focusedWindow != null) {
        let rec = focuser.focusedWindow.components.getFirstElementOfType(WindowInputReceiverComponent);

          // console.log('windowManager send key ' + keyCode + ' to ' + focuser.focusedWindow.name);
        rec.processKeyPress(keyCode);
      }
  }

  onKeyType(event, key) {
    // console.log('windowManager ' + key);
      let focuser = this.scene.getFirstComponentOfType(WindowFocusComponent);

      if (focuser.focusedWindow != null) {
        let rec = focuser.focusedWindow.components.getFirstElementOfType(WindowInputReceiverComponent);

          // console.log('windowManager send key ' + key + ' to ' + focuser.focusedWindow.name);
        rec.processKeyType(key);
      }
  }
}
