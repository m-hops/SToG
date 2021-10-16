class WindowDefault extends GameObject {

  constructor(dragWidth, dragHeight, imgsrc) {

    super();

    this.dragBarWidth = dragWidth;
    this.dragBarHeight = dragHeight;
    this.imgsrc = imgsrc;
    this.randomSpawnX = random(50,200);
    this.randomSpawnY = random(40,100);

    let rectCollider = new RectColliderComponent(AABB.MakeSize(this.imgsrc.width, this.imgsrc.height));
    this.addComponent(new Transform(this.randomSpawnX,this.randomSpawnY));
    this.addComponent(rectCollider);
    // this.addComponent(new RenderDebugComponent());
    this.addComponent(new WindowInputReceiverComponent());

    this.draggableBar = new GameObject("draggableBar");
    let drag = new DraggableComponent(this);
    drag.rectCollider = rectCollider;
    this.draggableBar.addComponent(new Transform());
    this.draggableBar.addComponent(new RectColliderComponent(AABB.MakeSize(this.dragBarWidth, this.dragBarHeight)));
    this.draggableBar.addComponent(drag);
    this.draggableBar.addComponent(new WindowInputReceiverComponent());
    this.draggableBar.addComponent(new RectLimiterComponent(AABB.MakeTopLeftSize(10, 30, width - 20, height - 40)));
    // this.draggableBar.addComponent(new RenderDebugComponent());

    this.addChild(this.draggableBar);

    this.closeButtonOBJ();

  }

  closeButtonOBJ() {

    this.closeWindowBTN = new ButtonCustom0Prefab(AABB.MakeSize(15,15),19,5,-1, new CloseWindowAction(this,this));
    this.closeWindowBTN.mouse.onMouseClickEvent.addListener(new PlaySFXAction(closeBlipSFX));
    this.closeWindowBTN.name = "CloseWindowBTN";
    this.draggableBar.addChild(this.closeWindowBTN);
  }

  getClientAABB() {

    return AABB.MakeTopLeftSize(3,this.dragBarHeight + 3, this.imgsrc.width - 3 * 2, this.imgsrc.height - this.dragBarHeight - 3 * 2);
  }
}
