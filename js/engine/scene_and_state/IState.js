class IState {

  onEnter(sm) {
    //CALLED WHEN THE STATE IS ACTIVATED//
    //CALLED ONLY ONCE BEFORE ONLEAVE IS CALLED//
    //ALWAYS CALLED BEFORE UPDATE, DRAW, AND ONLEAVE//

  }

  onKeyPress(sm, keyCode) {

  }
  onKeyType(sm, key) {

  }
  onMouseClick(sm) {

  }

  onMouseDoubleClick(sm) {

  }

  onMousePressed(sm) {

  }

  onMouseReleased(sm) {

  }

  onLeave(sm) {
    //CALLED WHEN THE STATE IS DEACTIVATED//
    //CALLED ONLY ONCE AFTER ONENTER IS CALLED//
    //ALWAYS CALLED AFTER UPDATE, DRAW, AND ONLEAVE//

  }

  update(sm) {
    //CALLED ONLY ONCE A FRAME//
    //ALWAYS CALLED WITHIN ONENTER ONLEAVE BLOCK//

  }

  draw(sm) {
    //CALLED AT LEAST ONCE A FRAME//
    //ALWAYS CALLED WITHIN ONENTER ONLEAVE BLOCK//

  }

}
