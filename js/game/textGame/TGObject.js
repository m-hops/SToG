class TGObject {
  constructor(name="", img="", position={x:0,y:0,z:0}) {
    this.name = name;
    this.conditions = [];
    this.img = img;
    this.position = position;
    this.objs = [];
  }
  addCondition(condition){
    this.conditions.push(condition);
  }
  addChild(obj){
    this.objs.push(obj);
  }
  isEnabled(gameState){
    for(let i = 0; i != this.conditions.length; ++i){
      if(!this.conditions[i].execute(gameState)) return false;
    }
    return true;
  }

}
