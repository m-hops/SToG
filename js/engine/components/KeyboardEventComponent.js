//ALLOWS FOR THE ASSIGNMENT OF A KEY VALUE TO EVENT//

class KeyboardEventComponent extends Component {

  constructor(key, listener = null, focus = "") {

    super();

    this.key = key;
    this.focus = focus;
    this.onPress = new Event();

    if (listener != null) {
      this.onPress.addListener(listener);
    }
    this.isPressed = false;
    this.needRelease = false;
  }
  onFocusIn(){
    console.log("Got Focus " + this.gameObject.name);
      if (keyIsDown(this.key)) {
        // wait for the key to be release
        this.needRelease = true;
      }
  }
  onFocusOut(){

  }
  update() {
    if(this.needRelease){
      if (!keyIsDown(this.key)) {
        this.needRelease = false;
      }
    } else if(this.focus == null || this.getScene().getKeyboardFocus() == this.focus){
      if (keyIsDown(this.key)) {
        if (!this.isPressed) {
          this.isPressed = true;
          this.onPress.raise();
        }
      } else {
        this.isPressed = false;
      }
    }
  }

}
