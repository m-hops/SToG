class ButtonCustom0Prefab extends GameObject {

  constructor(aabb,x,y,z,onClickListener) {
    super();

    //this.mouse = new MouseComponent();
    this.rectCollider = new RectColliderComponent(aabb);
    this.transform = new Transform(x,y,z);
    this.windowInputReceiverComponent = new WindowInputReceiverComponent();
    this.mouse = this.windowInputReceiverComponent;

    if (onClickListener != null){
      this.windowInputReceiverComponent.onMouseClickEvent.addListener(onClickListener);
    }

    this.addComponent(this.windowInputReceiverComponent);
    this.addComponent(this.rectCollider);
    this.addComponent(this.transform);
    this.addComponent(new RenderDebugComponent());
    this.name = "ButtonCustom0Prefab";
  }


}
