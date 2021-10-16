//ATTACHES X, Y, AND Z LIMITATIONS FOR GAMEOBJECT//

class AttachToComponent extends Component {

  constructor(targetGameOBJ, attachPositionX=true, attachPositionY=true, attachPositionZ=true,
    offset=createVector(0,0,0),
    min=createVector(-99999999,-99999999,-99999999),
    max=createVector(99999999,99999999,99999999)) {
    super();

    this.attachPositionX = attachPositionX;
    this.attachPositionY = attachPositionY;
    this.attachPositionZ = attachPositionZ;
    this.targetGameOBJ = targetGameOBJ;
    this.offset = offset;
    this.min = min;
    this.max = max;
  }

  
  //CALLED EVERY FRAME//
  update() {

    let targetTransform = this.targetGameOBJ.getTransform();
    let myTransform = this.gameObject.getTransform();

    //CONSTRAINS X POSITION//
    if (this.attachPositionX) {
      myTransform.local.position.x = constrain(targetTransform.local.position.x + this.offset.x, this.min.x, this.max.x);

    }

    //CONSTRAINS Y POSITION//
    if (this.attachPositionY) {
      myTransform.local.position.y = constrain(targetTransform.local.position.y + this.offset.y, this.min.y, this.max.y);
    }

    //CONSTRAINS Z POSITION//
    if (this.attachPositionZ) {
      myTransform.local.position.z = constrain(targetTransform.local.position.z + this.offset.z, this.min.z, this.max.z);
    }
  }
}
