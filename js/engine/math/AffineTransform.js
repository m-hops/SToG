//CONTAINS INSTRUCTIONS FOR TRANSFORM CONTROLS OF GAME OBJECT//

class AffineTransform{
  constructor(){
    this.position = new p5.Vector(0,0,0);
    this.scale = new p5.Vector(1,1,1);
    this.rotation = 0;
  }
  static identity(){
    return new AffineTransform();
  }
  //DUPLICATE AN OBJECT//
  copy(){
    let result = new AffineTransform();

    result.position = this.position.copy();
    result.scale = this.scale.copy();
    result.rotation = this.rotation;

    return result;
  }

  //OUTPUT OF TRANSFORM PARAMETERS//
  transformed(transform){
    let result = new AffineTransform();

    result.position = this.position.copy();
    result.position.mult(transform.scale);

    let rotated = new p5.Vector(result.position.x, result.position.y).rotate(transform.rotation);

    result.position.x = rotated.x;
    result.position.y = rotated.y;
    result.position.add(transform.position);

    result.scale = this.scale.copy();
    result.scale.mult(transform.scale);

    result.rotation = this.rotation + transform.rotation;

    return result;
  }

  inverseTransformed(transform){
    return this.transformed(trf0Before.inversed());
  }

  //
  transformVector(vec){
    let result = p5.Vector.mult(vec, this.scale);

    result.rotate(this.rotation);
    result.add(this.position);

    return result;
  }

  //CALCULATES INVERSE OF VECTOR OUTPUT OF TRANSFORM//
  inverseTransformVector(vec){
    let result = p5.Vector.sub(vec, this.position);

    result.rotate(-this.rotation);
    vec.div(this.scale);

    return result;
  }

  //PARENT FUNCTION TO SETPOSITION, SETSCALE, SETROTATION//
  set(otherTransform){
    this.position = otherTransform.position.copy();
    this.scale = otherTransform.scale.copy();
    this.rotation = otherTransform.rotation;
  }

  //POSITION SET FOR GAME OBJECT//
  setPosition(x,y,z=this.position.z){
    this.position.x = x;
    this.position.y = y;
    this.position.z = z;
  }

  //SIZING CONTROLS FOR GAME OBJECT (SCALE BASED ON NEUTRAL POSITION OF 1 (LOWER NUMBER, SMALLER. BIGGER NUMBER, LARGER))//
  setScale(x,y,z=this.scale.z){
    this.scale.x = x;
    this.scale.y = y;
  }

  //ROTATION CONTROL OF GAME OBJECT//
  setRotation(angle){
    this.rotation = angle;
  }

  //MOVEMENT DIRECTION OF GAME OBJECT//
  move(x,y){
    this.position.x += x;
    this.position.y += y;
  }

  moveByVector(v){
    this.position.add(v);
  }
  inversed(){
    let result = new AffineTransform();
    result.scale = p5.Vector.div(createVector(1,1,1), this.scale);
    result.rotation = -this.rotation;
    let pos2 = createVector(this.position.x, this.position.y);
    pos2.rotate(result.rotation);
    result.position = p5.Vector.mult(createVector(-pos2.x, -pos2.y, -this.position.z), result.scale);
    return result;
  }
  //APPLIES DIRECTED TRANSFORMATIONS//
  apply(){
    angleMode(RADIANS);
    translate(this.position);
    rotate(this.rotation);
    scale(this.scale);
  }

  //APPLIES INVERSE DIRECTED TRANSFORMATIONS//
  applyInverse(){
    scale(p5.Vector.div(new p5.Vector(1,1,1), this.scale));
    angleMode(RADIANS);
    rotate(-this.rotation);
    translate(p5.Vector.sub(new p5.Vector(0,0,0), this.position));
  }
}
