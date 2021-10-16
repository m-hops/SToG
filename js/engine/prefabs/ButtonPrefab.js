class ButtonPrefab extends GameObject {

  constructor(aabb,x,y,z,onClickListener) {
    super();

    this.mouse = new MouseComponent();
    this.rectCollider = new RectColliderComponent(aabb);
    this.transform = new Transform(x,y,z);

    if (onClickListener != null){
      this.mouse.onMouseClickEvent.addListener(onClickListener);
    }

    this.addComponent(this.mouse);
    this.addComponent(this.rectCollider);
    this.addComponent(this.transform);
    // this.addComponent(new RenderDebugComponent());

  }


}
