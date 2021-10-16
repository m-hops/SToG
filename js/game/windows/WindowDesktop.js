class WindowDesktop extends GameObject {

  constructor() {

    super();
    this.name = "WindowDesktop";

    let rectCollider = new RectColliderComponent(AABB.MakeSize(width, height));
    this.addComponent(new Transform(0,0,99999999999));
    this.addComponent(rectCollider);
    // this.addComponent(new RenderDebugComponent());
    this.addComponent(new WindowInputReceiverComponent());

  }
}
