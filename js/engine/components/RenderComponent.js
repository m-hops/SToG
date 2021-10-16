class RenderComponent extends Component {

  constructor() {
    super();
  }

  render(renderer) {

  }
}


//RENDER DEBUG FOR TESTING PURPOSES (REMOVE BEFORE FINALIZING PROJECT)//
class RenderDebugComponent extends RenderComponent {

  constructor() {
    super();
    this.debugInfo = false;
  }

  render(renderer) {
    // console.log("renderer debug");

    for (let j = 0; j < this.gameObject.components.active.length; j++) {
      let comp = this.gameObject.components.active[j];
      if (comp instanceof ColliderComponent) {
        comp.debugDraw();
      }
    }
    if(this.debugInfo){
      let drawRegion=AABB.MakeTopLeftSize(0,0,600,600);
      for(let i = 0; i != this.gameObject.components.active.length; i++){
        let comp = this.gameObject.components.active[i];
        comp.drawDebugInfo(renderer, drawRegion);
      }
    }
  }
}
