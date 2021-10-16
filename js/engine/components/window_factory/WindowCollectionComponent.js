class WindowCollectionComponent extends Component {

  constructor() {

    super();

    this.windows = new AsyncArray();
  }

  update() {

    this.windows.update();
  }

  addWindow(window) {

    this.windows.add(window);
  }

  removeWindow(window) {

    this.windows.remove(window);
  }

  getFirstWindowByType(windowType) {

    return this.windows.getFirstElementOfType(windowType);
  }
}
