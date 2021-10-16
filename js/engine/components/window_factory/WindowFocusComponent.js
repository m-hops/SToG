class WindowFocusComponent extends Component {

  constructor() {

    super();

    this.focusedWindow = null;
    this.windowToFocusNextFrame = null;
    this.desktop = null;
  }

  update() {
    if (this.windowToFocusNextFrame != null) {
      this.setFocus(this.windowToFocusNextFrame);
      this.windowToFocusNextFrame = null;
    }
  }

  setFocus(window) {

    let trf = window.getTransform();

    if (window != this.desktop) {

      this.liftStack(trf.local.position.z);
      trf.local.position.z = 0;
      this.focusedWindow = window;
    }
  }

  setFocusNextFrame(window) {
    this.windowToFocusNextFrame = window;
  }

  liftStack(stackTop) {

    let collection = this.gameObject.getOrAddComponentType(WindowCollectionComponent);

    collection.windows.visit((w) => {
      let trf = w.getTransform();

      if (this.desktop != w) {

        if (trf.local.position.z <= stackTop) {

          trf.local.position.z += 1;
        }
      }

      return true;
    });
  }
}
