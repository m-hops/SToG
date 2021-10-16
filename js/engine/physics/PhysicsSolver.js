
//DEVELOPED BY STEPHANIE RANCOURT//
//RENDER DEBUG FOR TESTING PURPOSES (REMOVE BEFORE FINALIZING PROJECT)//

class DebugDrawComponent extends RenderComponent {

  constructor() {
    super();
    this.aabb = [];
    this.lines = [];
  }

  addAABB(aabb, color){
    this.aabb.push({
      aabb:aabb,
      color:color,
      time:60
    });
  }
  addLine(v0, v1, color){
    this.lines.push({
      v0:v0,
      v1:v1,
      color:color,
      time:60
    });
  }
  update(){

    for (let j = 0; j < this.aabb.length;) {
      this.aabb[j].time--;
      if(this.aabb[j].time <= 0){
        this.aabb.splice(j,1);
      } else {
        j++;
      }
    }
    for (let j = 0; j < this.lines.length;) {
      this.lines[j].time--;
      if(this.lines[j].time <= 0){
        this.lines.splice(j,1);
      } else {
        j++;
      }
    }
  }
  render(renderer) {
    push();
    noFill();
    for (let j = 0; j < this.aabb.length; j++) {
      let vMin = this.aabb[j].aabb.getMin();
      let vSize = this.aabb[j].aabb.getSize();
      stroke(this.aabb[j].color);
      rect(vMin.x, vMin.y, vSize.x, vSize.y);

    }
    for (let j = 0; j < this.lines.length; j++) {
      stroke(this.lines[j].color);
      line(this.lines[j].v0.x, this.lines[j].v0.y, this.lines[j].v1.x, this.lines[j].v1.y);
    }
    pop();
  }
}


class PhysicsSolver {
  constructor(){
    this.collisions = [];
    this.nextCollisions = [];
    this.debugDraw = null;
  }
  solve(scene) {
    this.debugDraw = null;
    let debugOBJ = scene.getFirstGameObjectWithComponentType(DebugDrawComponent);
    if(debugOBJ == null){
      debugOBJ = new GameObject();
      this.debugDraw = new DebugDrawComponent();
      debugOBJ.addComponent(this.debugDraw);
      scene.addGameObject(debugOBJ);
    } else {
      this.debugDraw = debugOBJ.components.getFirstElementOfType(DebugDrawComponent);
    }
    let physicComp = [];
    let colliders = [];


    for (let i = 0; i < scene.gameObjects.active.length; i++) {
      let go = scene.gameObjects.active[i];
      go.visitEnabledGameObjects(function (x) {
        for (let j = 0; j < x.components.active.length; j++) {
          let comp = x.components.active[j];
          if (comp instanceof ColliderComponent) {
            colliders.push(comp);
          }
          if (comp instanceof Physics2D) {
            comp.stepPhysics();
            physicComp.push(comp);
          }
        }

        return true;
      });
    }

    for (let j = 0; j < colliders.length; j++) {
      this.solveCollider(colliders, j);
    }

    // find collision that are no more colliding and notify their triggers
    for(let k = 0; k != this.collisions.length; k++){

      let colIndex = this.nextCollisions.findIndex(x => x.a === this.collisions[k].a && x.b === this.collisions[k].b);
      if (colIndex < 0) {
        let triggers = this.collisions[k].a.gameObject.components.getAllElementOfType(TriggerComponent);
        for (let i = 0; i < triggers.length; i++) {
          triggers[i].onCollision.end();
        }
        triggers = this.collisions[k].b.gameObject.components.getAllElementOfType(TriggerComponent);
        for (let j = 0; j < triggers.length; j++) {
          triggers[j].onCollision.end();
        }
      }
    }

    // move frame forward
    this.collisions = this.nextCollisions;
    this.nextCollisions = [];

    for (let j = 0; j < physicComp.length; j++) {
      let trf = physicComp[j].gameObject.getTransform();
      trf.local = physicComp[j].nextFrameLocal;
    }



  }

  addColliders(physicComp, colliders, go) {

    for (let j = 0; j < go.components.active.length; j++) {

      let comp = go.components.active[j];

      if (comp instanceof ColliderComponent) {
        colliders.push(comp);
      }
      if (comp instanceof Physics2D) {
        physicComp.push(comp);
      }
    }

    for (let i = 0; i < go.children.active.length; i++) {
      this.addColliders(physicComp, colliders, go.children.active[i]);
    }
  }

  solveCollider(colliders, index) {
    let trfA = colliders[index].gameObject.getTransform();
    let physicsA = colliders[index].gameObject.components.getFirstElementOfType(Physics2D);
    for (let i = 0; i < colliders.length; i++) {
      // do not test colliders on the same gameObject
      if(colliders[i].gameObject != colliders[index].gameObject){
        let trfB = colliders[i].gameObject.getTransform();
        let physicsB = colliders[i].gameObject.components.getFirstElementOfType(Physics2D);
        this.solveColliderCollider(trfA, physicsA, colliders[index], trfB, physicsB, colliders[i]);
      }
    }
  }


  getGONextFrameLocalTransform(go){
    let physics = go.components.getFirstElementOfType(Physics2D);
    if(physics != null) return physics.nextFrameLocal;
    let trf = go.getTransform();
    if(trf != null) return trf.local;
    return AffineTransform.identity();
  }
  getGONextFrameWorldTransform(go){
    let trfLocal = this.getGONextFrameLocalTransform(go);
    go = go.parent;
    while(go != null){
      let parentTrfLocal = this.getGONextFrameLocalTransform(go);
      trfLocal = trfLocal.transformed(parentTrfLocal);
      go = go.parent;
    }
    return trfLocal;
  }
  willCollide(colliderFixed, trfFixed, colliderMoving, trfMoving, velocity) {
    let boxFix = colliderFixed.aabb.transformedTranslateScale(trfFixed);
    let boxMoving0 = colliderMoving.aabb.transformedTranslateScale(trfMoving);
    let boxMoving1 = boxMoving0.added(velocity);
    return boxFix.isIntersecting(boxMoving1);
  }
  solveFixedAndMoving(transformFixed, physicsFixed, colliderFixed, transformMoving, physicsMoving, colliderMoving){
    let velX = createVector(physicsMoving.velocity.x, 0, 0);
    let velY = createVector(0, physicsMoving.velocity.y, 0);
    if(!this.willCollide(colliderFixed, transformFixed.world, colliderMoving, transformMoving.world, velX)){
      physicsMoving.setVelocity(velX);
      physicsMoving.computeNextFrameLocal();
    } else if(!this.willCollide(colliderFixed, transformFixed.world, colliderMoving, transformMoving.world, velY)){
      physicsMoving.setVelocity(velY);
      physicsMoving.computeNextFrameLocal();
    } else {
      physicsMoving.setVelocity(createVector(0,0,0));
      physicsMoving.computeNextFrameLocal();
    }

  }
  solveColliderCollider(transformA, physicsA, colliderA, transformB, physicsB, colliderB) {

    if((physicsA == null || physicsA.isFixed) && (physicsB == null || physicsB.isFixed)) return;
    //console.log("Solve Collider");
    let trfWorldA = this.getGONextFrameWorldTransform(colliderA.gameObject);//transformA.local;
    let trfWorldB = this.getGONextFrameWorldTransform(colliderB.gameObject);//transformB.local;


    let boxA = colliderA.aabb.transformedTranslateScale(trfWorldA);
    let boxB = colliderB.aabb.transformedTranslateScale(trfWorldB);

    if (boxA.isIntersecting(boxB)) {
      // let collision2 = 0;
      // if(physicsA != null && !physicsA.isFixed && (physicsB == null || physicsB.isFixed)){
      //   collision2 = this.computeCollisionAABB(colliderB.aabb, transformB.world, trfWorldB, colliderA.aabb, transformA.world, trfWorldA);
      // } else if(physicsB != null && !physicsB.isFixed && (physicsA == null || physicsA.isFixed)){
      //    collision2 = this.computeCollisionAABB(colliderA.aabb, transformA.world, trfWorldA, colliderB.aabb, transformB.world, trfWorldB);
      // } else { //if(physicsA != null && !physicsA.isFixed && physicsB != null && !physicsB.isFixed){
      //    collision2 = this.computeCollisionAABB(colliderA.aabb, transformA.world, trfWorldA, colliderB.aabb, transformB.world, trfWorldB);
      // }
      //   //let collision2 = this.computeCollisionAABB(colliderA.aabb, transformA.world, trfWorldA, colliderB.aabb, transformB.world, trfWorldB);
      let collision = {a:colliderA,b:colliderB};

      let colIndex = this.collisions.findIndex(x => x.a === collision.a && x.b === collision.b);
      if (colIndex < 0) {
        let triggers = colliderA.gameObject.components.getAllElementOfType(TriggerComponent);
        for (let i = 0; i < triggers.length; i++) {
          triggers[i].onCollision.begin();
        }
        triggers = colliderB.gameObject.components.getAllElementOfType(TriggerComponent);
        for (let j = 0; j < triggers.length; j++) {
          triggers[j].onCollision.begin();
        }

      }

      // if(physicsA != null && !physicsA.isFixed && (physicsB == null || physicsB.isFixed)){
      //   this.solveFixedAndMoving(transformB, physicsB, colliderB, transformA, physicsA, colliderA);
      // } else if(physicsB != null && !physicsB.isFixed && (physicsA == null || physicsA.isFixed)){
      //   this.solveFixedAndMoving(transformA, physicsA, colliderA, transformB, physicsB, colliderB);
      // } else { //if(physicsA != null && !physicsA.isFixed && physicsB != null && !physicsB.isFixed){
      //   this.solveFixedAndMoving(transformB, physicsB, colliderB, transformA, physicsA, colliderA);
      // }

      if(physicsA != null && !physicsA.isFixed && physicsB != null && physicsB.isFixed){
        this.solveFixedAndMoving(transformB, physicsB, colliderB, transformA, physicsA, colliderA);
      } else if(physicsB != null && !physicsB.isFixed && physicsA != null && physicsA.isFixed){
        this.solveFixedAndMoving(transformA, physicsA, colliderA, transformB, physicsB, colliderB);
      } else if(physicsA != null && !physicsA.isFixed && physicsB != null && !physicsB.isFixed){
        //TODO 2 moving objects with physics
      } else {
        // one or 2 object do not have physics, ignore
      }


      // if(physicsA != null && physicsB == null){
      //   this.solveCollision1(transformA, physicsA, colliderA, transformB, colliderB);
      // } else if(physicsA == null && physicsB != null){
      //   this.solveCollision1(transformB, physicsB, colliderB, transformA, colliderA);
      // } else if(physicsA != null && physicsB != null){
      //   this.solveCollision2(transformA, physicsA, colliderA, transformB, physicsB, colliderB);
      // }
      this.nextCollisions.push(collision);
    }
  }

  solveCollision1(transformA, physicsA, colliderA, transformB, colliderB){
    //let nameA = "unknown";
    //let nameB = "unknown";
    //if(colliderA.gameObject.name != null) nameA = colliderA.gameObject.name;
    //if(colliderB.gameObject.name != null) nameB = colliderB.gameObject.name;
    console.log("["+frameCount+"] solveCollision1 {"+colliderA.gameObject.name+"} -- {"+colliderB.gameObject.name+"}");
    //physicsA.speed = 0;
    //physicsA.direction = createVector(0,0,0);
    //physicsA.nextFrameLocal = transformA.local;
  }

  // solve using 2 gameobject with a physics component
  solveCollision2(transformA, physicsA, colliderA, transformB, physicsB, colliderB){
    // let nameA = "unknown";
    // let nameB = "unknown";
    // if(colliderA.gameObject.name != null) nameA = colliderA.gameObject.name;
    // if(colliderB.gameObject.name != null) nameB = colliderB.gameObject.name;
    console.log("["+frameCount+"] solveCollision2 {"+colliderA.gameObject.name+"} -- {"+colliderB.gameObject.name+"}");
    physicsA.speed = 0;
    physicsA.direction = createVector(0,0,0);
    physicsA.nextFrameLocal = transformA.local;
    physicsB.speed = 0;
    physicsB.direction = createVector(0,0,0);
    physicsB.nextFrameLocal = transformB.local;
  }

  computeCollisionAABB(aabbA, trfA0, trfA1, aabbB, trfB0, trfB1){
    let trfA0I = trfA0.inversed();
    let trfB0I = trfB0.inversed();
    let trfA1I = trfA1.inversed();
    let offsetA = trfA1.transformed(trfA0I);
    let offsetB = trfB1.transformed(trfB0I);
    let trfBRelative0 = trfB0.transformed(trfA0I);
    let trfBRelative1 = trfB1.transformed(trfA1I);
    //let offsetBRelative0 = trfBRelative0.transformed(offsetB);
    //offsetBRelative = offsetBRelative.transformed(offsetA.inversed());

    //let boxBRelative0 = aabbB.transformedTranslateScale(offsetBRelative0);

    // let center = createVector(width * 0.5, height * 0.5);
    // this.debugDraw.addAABB(aabbA.added(center), color(255,255,255));
    // this.debugDraw.addAABB(boxBRelative.added(center), color(255,255,0));

    // console.log("============");
    // console.log("trfABefore"); console.log(trfABefore);
    // console.log("trfABeforeI"); console.log(trfABeforeI);
    // console.log("trfBBefore"); console.log(trfBBefore);
    // console.log("trfBBeforeI"); console.log(trfBBeforeI);
    // console.log("offsetA"); console.log(offsetA);
    // console.log("offsetB"); console.log(offsetB);
    // console.log("trfBRelative"); console.log(trfBRelative);
    // console.log("offsetBRelative"); console.log(offsetBRelative);
    // console.log("boxBRelative"); console.log(boxBRelative);
    // console.log("aabbA"); console.log(aabbA);
    // console.log("aabbB"); console.log(aabbB);
    // let ox = width / 2;
    // let oy = height / 2;
    // push();
    // noFill();
    // stroke(255,255,0);
    // let vMin = aabbA.getMin();
    // let vSize = aabbA.getSize();
    // rect(vMin.x + ox, vMin.y + oy, vSize.x, vSize.y);
    // pop();
    return this.computeCollisionAABBRelative(aabbA, aabbB, trfBRelative0, trfBRelative1);
  }
  computeCollisionAABBRelative(aabbFixed, aabbMoving, trf0, trf1){
    let sA = aabbFixed.getSize();
    let sB = aabbMoving.getSize();
    let sizeMaxA = sA.x>sA.y?sA.x:sA.y;
    let sizeMaxB = sB.x>sB.y?sB.x:sB.y;
    let sizeMax = sizeMaxA>sizeMaxB?sizeMaxA:sizeMaxB;
    let scaleW = 1;
    let scaleH = 1;
    if(sizeMax > width){
      scaleW = width / sizeMax;
    }
    if(sizeMax > height){
      scaleH = height / sizeMax;
    }
    let scale = scaleW<scaleH?scaleW:scaleH;
    //let aabbMovingS = aabbMoving.multedUniform(scale);
    let aabbMoving0 = aabbMoving.transformedTranslateScale(trf0);
    let aabbMoving1 = aabbMoving.transformedTranslateScale(trf1);
    aabbMoving0 = aabbMoving0.multedUniform(scale);
     aabbMoving1 = aabbMoving1.multedUniform(scale);
    let aabbFixedS = aabbFixed.multedUniform(scale);
    let center = createVector(width * 0.5, height * 0.5);
    this.debugDraw.addAABB(aabbFixedS.added(center), color(255,255,255));
    this.debugDraw.addAABB(aabbMoving0.added(center), color(128,128,128));
    this.debugDraw.addAABB(aabbMoving1.added(center), color(255,255,0));


    let trf1I = trf1.inversed();
    let offset = trf0.transformed(trf1I);
    this.debugDraw.addLine(aabbMoving0.added(center).center, aabbMoving1.added(center).center, color(255,255,128));
    return 0;
  }
}
























//
