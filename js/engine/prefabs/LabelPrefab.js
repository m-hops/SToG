class LabelPrefab extends GameObject {

  constructor(aabb,x,y,z,fontName) {

    super();

    this.fontName = fontName;

    this.rectCollider = new RectColliderComponent(aabb);
    this.transform = new Transform(x,y,z);
    this.text = new BitmapTextComponent("CHANGE MY VALUE, DICK", this.fontName);

    this.addComponent(this.rectCollider);
    this.addComponent(this.transform);
    this.addComponent(this.text);
    // this.addComponent(new RenderDebugComponent());
    this.name = "LabelPrefab";
  }
}
