//UNIVERSAL STATE MACHINE FOR MENU, SCENE, OR OTHER//

class StateMachine {

  constructor() {
    this.currentState = null;
  }

  //PARAMETERS OF THE CURRENT STATE MACHINE CALLED EVERY FRAME//
  update() {
    if (this.currentState != null) {
      this.currentState.update(this);
    }
  }

  //DISPLAYS THE CURRENT SCENE'S VISUALS//
  draw() {
    if (this.currentState != null) {
      this.currentState.draw(this);
    }
  }

  //LIMBO STATE TO SWITCH FROM ONE SCENE TO THE NEXT//
  transit(state) {
    if (this.currentState != null) {
      this.currentState.onLeave(this);
    }

    this.currentState = state;

    if (this.currentState != null) {
      this.currentState.onEnter(this);
    }
  }


}
