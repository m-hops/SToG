class WindowInputReceiverComponent extends Component {

  constructor() {

    super();

    this.onMouseClickEvent = new Event();
    this.onMousePressedEvent = new Event();
    this.onMouseReleasedEvent = new Event();
    this.onKeyPressEvent = new Event();
    this.onKeyTypeEvent = new Event();
    this.isPressed = false;
    this.lastChildPressed = null;
  }
  //
  // onMouseClick(positionRelative) {
  //
  //   // let focuser = this.gameObject.scene.getFirstComponentOfType(WindowFocusComponent);
  //   //
  //   // focuser.setFocus(this.gameObject);
  // }

  processKeyPress(keyCode) {
    let notProcessed = this.gameObject.visitAllChildComponentOfType(WindowInputReceiverComponent, function(inputRec) {
       // console.log("processKeyPress Asking child '" + inputRec.gameObject.name + "'");
      if (inputRec.processKeyPress(keyCode)) {
        // console.log('processKeyPress ' + inputRec.gameObject.name + " ate the key :(");
        return false;
      }
      return true;
    });

    if (notProcessed) {

      if (this.onKeyPressEvent != null) {
        this.onKeyPressEvent.raise(keyCode);
      }

    }
  }
    processKeyType(key) {
      let notProcessed = this.gameObject.visitAllChildComponentOfType(WindowInputReceiverComponent, function(inputRec) {
         // console.log("processKeyType Asking child '" + inputRec.gameObject.name + "'");
        if (inputRec.processKeyType(key)) {
          // console.log('processKeyType ' + inputRec.gameObject.name + " ate the key :(");
          return false;
        }
        return true;
      });

      if (notProcessed) {

        if (this.onKeyTypeEvent != null) {
          this.onKeyTypeEvent.raise(key);
        }

      }
    }

  processMouseClick(positionRelative) {

    let colliders = [];
    this.gameObject.components.visitElementsOfType(ColliderComponent, function(collider) {
      colliders.push(collider);
      return true;
    });

    let trf = this.gameObject.getTransform();
    let localPos = new p5.Vector(positionRelative.x - trf.local.position.x, positionRelative.y - trf.local.position.y);
    //Renderer.sortGameObjectArrayLocal(windows);

    // console.log('processMouseClick ' + this.gameObject.name + " colider count=" + colliders.length + " localPos=" + localPos);
    for (let i = 0; i < colliders.length; i++) {
      if (colliders[i].isPointInLocal(localPos)) {
        //console.log('processMouseClick ' + this.gameObject.name + "  click in collider " + i);
        let notProcessed = this.gameObject.visitAllChildComponentOfType(WindowInputReceiverComponent, function(inputRec) {
          // console.log("processMouseClick Asking child '" + inputRec.gameObject.name + "'");
          if (inputRec.processMouseClick(localPos)) {
            // console.log('processMouseClick ' + inputRec.gameObject.name + " ate the click :(");
            return false;
          }
          return true;
        });
        if (notProcessed) {
          // console.log('processMouseClick Raised on object ' + this.gameObject.name);
          if (this.onMouseClickEvent != null) {
            this.onMouseClickEvent.raise();
          }
        }
        return true;
      }
    }
    return false;
  }

  processMousePressed(positionRelative) {

    let colliders = [];
    this.gameObject.components.visitElementsOfType(ColliderComponent, function(collider) {
      colliders.push(collider);
      return true;
    });

    let trf = this.gameObject.getTransform();
    let localPos = new p5.Vector(positionRelative.x - trf.local.position.x, positionRelative.y - trf.local.position.y);
    //Renderer.sortGameObjectArrayLocal(windows);


    for (let i = 0; i < colliders.length; i++) {
      if (colliders[i].isPointInLocal(localPos)) {
        let childProcessed = null;
        let notProcessed = this.gameObject.visitAllChildComponentOfType(WindowInputReceiverComponent, function(inputRec) {
          if (inputRec.processMousePressed(localPos)) {
            childProcessed = inputRec;
            return false;
          }
          return true;
        });
        if(childProcessed != null){
          this.lastChildPressed = childProcessed;
        }
        if (notProcessed) {
          this.isPressed = true;
          if (this.onMousePressedEvent != null) {
            this.onMousePressedEvent.raise();
          }
        }
        return true;
      }
    }
    return false;
  }

  processMouseReleased(positionRelative) {

    let colliders = [];
    this.gameObject.components.visitElementsOfType(ColliderComponent, function(collider) {
      colliders.push(collider);
      return true;
    });

    let trf = this.gameObject.getTransform();
    let localPos = new p5.Vector(positionRelative.x - trf.local.position.x, positionRelative.y - trf.local.position.y);
    //Renderer.sortGameObjectArrayLocal(windows);

    this.isPressed = false;

    if(this.lastChildPressed != null){
      let last = this.lastChildPressed;
      this.lastChildPressed = null;
      if(last.processMouseReleased(localPos)){
        // event proceesed
        return true;
      }
    }

    for (let i = 0; i < colliders.length; i++) {
      if (colliders[i].isPointInLocal(localPos)) {

        let notProcessed = this.gameObject.visitAllChildComponentOfType(WindowInputReceiverComponent, function(inputRec) {
          if (inputRec.processMouseReleased(localPos)) {
            return false;
          }
          return true;
        });
        if (notProcessed) {
          if (this.onMouseReleasedEvent != null) {
            this.onMouseReleasedEvent.raise();
          }
        }
        return true;
      }
    }
    return false;
  }
}
