//ADDS TEXT COMPONENTS TO GAME OBJECT//

class TextComponent extends RenderComponent{

  //TXT SHOULD LINK TO JSON FILE FOR DISPLAYING//
  constructor(txt, font = 'Georgia') {

    super();

    this.text = txt;
    this.color = 0;
    this.textSize = 30;
    this.font = font;
    this.textAlignH = LEFT;
    this.textAlignW = TOP;
  }

  render(renderer) {
    push();
    fill(this.color);
    textSize(this.textSize);
    textFont(this.font);
    textAlign(this.textAlignH, this.textAlignW);
    text(this.text, 0, 0);
    pop();
  }
}
