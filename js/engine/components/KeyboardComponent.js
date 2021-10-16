class KeyboardComponent extends Component {

  constructor() {

    super();

    this.onKeyPressEvent = new Event();
    this.onKeyTypeEvent = new Event();
  }

  onKeyPress(keyCode) {
    //if (keyCode != undefined) {

      console.log("KeyboardComponent " + keyCode);
      this.onKeyPressEvent.raise(keyCode);

    //}
  }
  onKeyType(key) {
    //if (keyCode != undefined) {

      console.log("KeyboardComponent " + key);
      this.onKeyTypeEvent.raise(key);

    //}
  }
}
