//DISPLAYS IMAGE OF GAME OBJECT//

class ImageComponent extends RenderComponent{

  //IMG IS IMAGE; REPEATX IS HOW MANY TIMES OBJECT IS REPEATED ALONG X AXIS; REPEATY IS HOW MANY TIMES OBJECT IS REPEATED ALONG Y AXIS//
  constructor(img, repeatX = 1, repeatY = 1) {

    super();

    if(img != null && !(img instanceof p5.Image)){
      throw "img must be a p5.Image";
    }
    this.image = img;
    this.repeatX = repeatX;
    this.repeatY = repeatY;
    this.centered = false;
  }

  //ALLOWS ASSETS TO BE LOOPED IF NEEDED//
  render(renderer) {
    let offsetX = 0;
    let offsetY = 0;
    if(this.centered){
      offsetX = -this.image.width * this.repeatX * 0.5;
      offsetY = -this.image.height * this.repeatY * 0.5;
    }
    if(this.image != null){
      for (let y = 0; y < this.repeatY; y++) {
        for (let x = 0; x < this.repeatX; x++) {
          image(this.image, this.image.width * x + offsetX, this.image.height * y + offsetY);
        }
      }
    }
  }
}
