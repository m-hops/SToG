class DraggableComponent extends Component {

  constructor(target = null) {

    super();

    this.mouseComp = null;
    this.rectLimiter = null;
    this.rectCollider = null;
    this.isDragging = false;
    this.lastMouseX = 0;
    this.lastMouseY = 0;
    this.target = target;

  }

  getTarget() {

    if (this.target != null) {
      return this.target;
    }

    return this.gameObject;
  }

  update() {

    if (this.mouseComp == null) {
      this.mouseComp = this.gameObject.getOrAddComponentType(WindowInputReceiverComponent);
    }

    if (this.rectLimiter == null) {
      this.rectLimiter = this.gameObject.getComponentOfType(RectLimiterComponent);
    }
    if (this.rectCollider == null) {
      this.rectCollider = this.gameObject.getComponentOfType(RectColliderComponent);
    }

    if (this.mouseComp.isPressed) {
      if (!this.isDragging) {
        this.isDragging = true;
        this.lastMouseX = mouseX;
        this.lastMouseY = mouseY;
      }

      let deltaMouseX = mouseX - this.lastMouseX;
      let deltaMouseY = mouseY - this.lastMouseY;


      let trf = this.getTarget().getTransform();

      if (this.rectLimiter != null){

        if(this.rectCollider != null){
          let pt0 = this.rectCollider.aabb.getMin();
          let pt1 = this.rectCollider.aabb.getMax();
          trf.local.position.x = constrain(trf.local.position.x + deltaMouseX, this.rectLimiter.aabb.getMin().x - pt0.x, this.rectLimiter.aabb.getMax().x - pt0.x);
          trf.local.position.y = constrain(trf.local.position.y + deltaMouseY, this.rectLimiter.aabb.getMin().y - pt0.y, this.rectLimiter.aabb.getMax().y - pt0.y);
          trf.local.position.x = constrain(trf.local.position.x, this.rectLimiter.aabb.getMin().x - pt1.x, this.rectLimiter.aabb.getMax().x - pt1.x);
          trf.local.position.y = constrain(trf.local.position.y, this.rectLimiter.aabb.getMin().y - pt1.y, this.rectLimiter.aabb.getMax().y - pt1.y);
        } else{
          trf.local.position.x = constrain(trf.local.position.x + deltaMouseX, this.rectLimiter.aabb.getMin().x, this.rectLimiter.aabb.getMax().x);
          trf.local.position.y = constrain(trf.local.position.y + deltaMouseY, this.rectLimiter.aabb.getMin().y, this.rectLimiter.aabb.getMax().y);
        }
      } else {
        trf.local.position.x += deltaMouseX;
        trf.local.position.y += deltaMouseY;
      }

      this.lastMouseX = mouseX;
      this.lastMouseY = mouseY;
    } else {
      this.isDragging = false;
    }

  }

}
