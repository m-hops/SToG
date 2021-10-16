//RENDERING FOR ALL GAME OBJECTS AND THEIR CHILDREN//

class Renderer {

  constructor(){
    this.currentTransform = AffineTransform.identity();
  }
  render(scene) {

    let cameraGo = scene.getFirstGameObjectWithComponentType(CameraComponent);

    //ERROR CHECK TO MAKE SURE CAMERA IS SETUP WITH SCENE//
    if (cameraGo == null) {
      console.log('No Camera found. Dumbass');

      return;
    }

    //GATHERS ALL THE RENDER COMPONENETS THAT EXIST IN THE SCENE//
    let compToRender = [];

    for (let i = 0; i < scene.gameObjects.active.length; i++) {

      let go = scene.gameObjects.active[i];
      this.addRenderComponenets(compToRender, go);
    }

    //ORDER RENDER COMPONENETS BY THE Z VALUE OF THEIR POSITION; IDEA IS TO RENDER FURTHEST OBJECTS FIRST//
    //HIGHER NUMBER IS FURTHER AWAY FROM CAMERA//
    compToRender.sort(function(a, b){
      let trfA = a.gameObject.getTransform();
      let trfB = b.gameObject.getTransform();
      if(trfA == null && trfB == null) return 0;
      if(trfA == null ) return 100;
      if(trfB == null ) return -100;
      return trfB.world.position.z - trfA.world.position.z
    });

    push();
    cameraGo.getTransform().world.applyInverse();

    //RENDER ALL COMPONENTS IN ORDER//
    for (let h = 0; h < compToRender.length; h++) {
      let prevTrf = this.currentTransform;
      push();
      let trf = compToRender[h].gameObject.getTransform();
      if(trf != null){
        this.currentTransform = trf.world;
        trf.world.apply();
      } else {
        this.currentTransform = AffineTransform.identity();
        resetMatrix();
      }
      compToRender[h].render(this);
      pop();
      this.currentTransform = prevTrf;
    }
    pop();
  }

  static sortGameObjectArray(objs) {
    objs.sort(function(a, b){
      let trfA = a.getTransform();
      let trfB = b.getTransform();
      if(trfA == null && trfB == null) return 0;
      if(trfA == null ) return 100;
      if(trfB == null ) return -100;
      return trfB.world.position.z - trfA.world.position.z
    });

  }
    static sortGameObjectArrayLocal(objs) {
      objs.sort(function(a, b){
        let trfA = a.getTransform();
        let trfB = b.getTransform();
        if(trfA == null && trfB == null) return 0;
        if(trfA == null ) return 100;
        if(trfB == null ) return -100;
        return trfB.local.position.z - trfA.local.position.z
      });

    }

  //PUSHES RENDERED CHILDREN COMPONENTS INTO ARRAY//
  addRenderComponenets(array, go) {
    go.visitEnabledGameObjects(function (x) {
      //console.log("rendering go " + x.Name + "comp=");
      for (let j = 0; j < x.components.active.length; j++) {
        let comp = x.components.active[j];
            //console.log(comp);
        if (comp instanceof RenderComponent) {
          array.push(comp);
        }
      }

      return true;
    });
  }


  renderTextLine(txt, region){
    let pos = region.getMin();
    text(txt, pos.x, pos.y);
    region.trimTop(12);
  }
}
