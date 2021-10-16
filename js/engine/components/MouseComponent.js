class MouseComponent extends Component {

  constructor() {

    super();

    this.onMouseClickEvent = new Event();
    this.onMousePressedEvent = new Event();
    this.onMouseReleasedEvent = new Event();
    this.isPressed = false;
  }

  hitCollider(mousePosition) {
    let allColliders = this.gameObject.components.getAllElementOfType(ColliderComponent);
    if (allColliders == 0) {
      return true;
    }
    for (let i = 0; i < allColliders.length; i++) {
      if (allColliders[i].isPointIn(mousePosition)) {
        return true;
      }
    }
    return false;
  }

  onMouseClick() {

    if (this.gameObject == null) {
      return;
    }


    let mousePosition = new p5.Vector(mouseX, mouseY);
    if (this.hitCollider(mousePosition)) {
      this.onMouseClickEvent.raise();
      return;
    }
  }

  onMousePressed() {

    if (this.gameObject == null) {
      return;
    }

    let mousePosition = new p5.Vector(mouseX, mouseY);

    if (this.hitCollider(mousePosition)) {

      this.isPressed = true;

      this.onMousePressedEvent.raise();
      return;
    }
  }

  onMouseReleased() {

    if (this.gameObject == null) {
      return;
    }

    if (this.isPressed) {
      this.isPressed = false;
      this.onMouseReleasedEvent.raise();
    }
  }

}
