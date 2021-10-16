//ALLOWS FOR USE OF AFFINETRANSFORM WITH GAMEOBJECT; SEE AFFINETRANSFORM FOR MORE INFORMATION//

class Transform extends Component{

  constructor(x=0, y=0, z=0) {

    super();

    this.local = new AffineTransform();
    this.world = null;
    this.local.position = createVector(x, y, z);
  }

  //CHECKS EVERY FRAME FOR CURRENT TRANSFORM REQUIREMENTS//
  update() {
    if (this.gameObject != null && this.gameObject.parent != null) {
      let parentTransform = this.gameObject.parent.components.getFirstElementOfType(Transform);
      if (parentTransform != null) {
        this.world = this.local.transformed(parentTransform.world);
      }
    } else {
      this.world = this.local.copy();
        if(this.gameObject.name == 'blueCatSprite'){
          //console.log("blueCatSprite copy local " + this.world.scale.x);
        }
    }
    //CALLED EVERY FRAME WHEN OWNER GAME OBJECT IS UPDATED//
  }

  drawDebugInfo(renderer, region){

    push();
    let v0 = this.world.transformVector(createVector(0,0,0));
    //let vRight = trf.world.transformVector(createVector(100,0,0));
    //let vUp = trf.world.transformVector(createVector(0,100,0));
    stroke(255,0,0,255);
    //console.log("v0=("+v0.x+", "+v0.y+")");
    line(0,0,100,0);
    stroke(0,255,0,255);
    line(0,0,0,100);
    stroke(255,255,255,255);
    let s = renderer.currentTransform.scale.copy();
    s.x = 1/s.x;
    s.y = 1/s.y;
    s.z = 1/s.z;
    //push();
    scale(s);
    if(this.gameObject.name != null){
      renderer.renderTextLine("name: " + this.gameObject.name, region);
      //text("name: " + this.gameObject.name,0, y); region.trimTop(lineH);
    }
    renderer.renderTextLine("pos=("
        + v0.x.toFixed( 2 ) + ", "
        + v0.y.toFixed( 2 ) + ", "
        + v0.z.toFixed( 2 ) + ")" , region);
    renderer.renderTextLine("rot=" + this.world.rotation , region);
    renderer.renderTextLine("scl=("
        + this.world.scale.x.toFixed( 2 ) + ", "
        + this.world.scale.y.toFixed( 2 ) + ", "
        + this.world.scale.z.toFixed( 2 ) + ")", region);

    renderer.renderTextLine("local:", region);
    let v0Local = this.local.transformVector(createVector(0,0,0));
    renderer.renderTextLine("pos=("
        + v0Local.x.toFixed( 2 ) + ", "
        + v0Local.y.toFixed( 2 ) + ", "
        + v0Local.z.toFixed( 2 ) + ")" , region);
    renderer.renderTextLine("rot=" + this.local.rotation , region);
    renderer.renderTextLine("scl=("
        + this.local.scale.x.toFixed( 2 ) + ", "
        + this.local.scale.y.toFixed( 2 ) + ", "
        + this.local.scale.z.toFixed( 2 ) + ")", region);

    //pop();
    pop();
  }
}
