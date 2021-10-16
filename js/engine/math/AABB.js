//DEVELOPED BY STEPHANIE RANCOURT//

class AABB{

  constructor(cx,cy,ex,ey){
    this.center = new p5.Vector(cx,cy,0);
    this.extent = new p5.Vector(ex,ey,0);
  }

  isIntersecting(other) {

    let diff = p5.Vector.sub(other.center, this.center);
    let extent = p5.Vector.add(other.extent, this.extent);

    return Math.abs(diff.x) <= extent.x && Math.abs(diff.y) <= extent.y;
  }

  isPointIn(point){
    let relative = p5.Vector.sub(point, this.center);
    return abs(relative.x) < this.extent.x && abs(relative.y) < this.extent.y;
  }
  getMin(){
    return new p5.Vector(this.center.x-this.extent.x, this.center.y-this.extent.y,0);
  }
  getMax(){
    return new p5.Vector(this.center.x+this.extent.x, this.center.y+this.extent.y,0);
  }
  getSize(){
    return new p5.Vector(this.extent.x*2, this.extent.y*2,0);
  }

  mult(value){
    this.center.mult(value);
    this.extent.mult(value);
  }
  add(value){
    this.center.add(value);
  }
  sub(value){
    this.center.sub(value);
  }

  multed(value){
    return AABB.MakeCenterExtent(p5.Vector.mult(this.center, value),
      p5.Vector.mult(this.extent, value));
  }
  multedXY(x,y){
    return this.multed(createVector(x,y));
  }
  multedUniform(value){
    return this.multed(createVector(value,value));
  }
  added(value){
    return AABB.MakeCenterExtent(p5.Vector.add(this.center, value), this.extent);
  }
  subed(value){
    return AABB.MakeCenterExtent(p5.Vector.sub(this.center, value), this.extent);
  }
  transformedTranslateScale(affineMatrix){
    let c = p5.Vector.mult(this.center, affineMatrix.scale);
    let e = p5.Vector.mult(this.extent, affineMatrix.scale);
    c = p5.Vector.add(c, affineMatrix.position);
    return AABB.MakeCenterExtent(c, e);
  }

  getArea(){
    return this.extent.x * this.extent.y;
  }
  trimTop(y){
    this.center.y += y / 2;
    this.extent.y -= y / 2;
  }
  static MakeTopLeftSize(x,y,w,h){
    return new AABB(x+w/2, y+h/2,w/2,h/2);
  }

  static MakeCenterExtent(vecCenter, vecExtent){
    let aabb = new AABB();
    aabb.center = vecCenter.copy();
    aabb.extent = vecExtent.copy();
    return aabb;
  }

    static MakeSize(width, height){
      let aabb = new AABB(width/2, height/2, width/2, height/2);
      return aabb;
    }

}
