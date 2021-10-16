//ADDS BITMAP TEXT COMPONENTS TO GAME OBJECT//
//NOTE, THIS COMPONENT IS RELIANT ON 3RD PARTY PLUGIN P5.BITMAPFONT-MASTER//

class BitmapTextComponent extends RenderComponent{

  constructor(txt, font) {

    super();

    this.text = txt;
    this.font = font;
  }

  render(renderer) {
    push();
    bitmapTextFont(this.font);
    bitmapText(this.text, 0, 0);
    pop();
  }
}
