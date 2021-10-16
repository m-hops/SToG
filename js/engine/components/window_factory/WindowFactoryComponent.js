class WindowFactoryComponent extends Component {

  constructor() {

    super();

  }

  createWindow(windowType) {

    let collection = this.gameObject.getOrAddComponentType(WindowCollectionComponent);

    let newWindow = new windowType();

    collection.addWindow(newWindow);

    this.gameObject.scene.addGameObject(newWindow);

    return newWindow;
  }

  getOrCreateWindow(windowType) {

    let collection = this.gameObject.getOrAddComponentType(WindowCollectionComponent);
    let theWindow = collection.getFirstWindowByType(windowType);

    if (theWindow == null) {

      return this.createWindow(windowType);
    }

    return theWindow;
  }

  destroyWindow(selectedWindow) {

    let collection = this.gameObject.getOrAddComponentType(WindowCollectionComponent);

    collection.removeWindow(selectedWindow);
    this.gameObject.scene.removeGameObject(selectedWindow);

  }

}
