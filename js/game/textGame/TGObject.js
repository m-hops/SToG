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

function loadObjectFromJSON(data, loader){
  let obj = new TGObject(data.name);
  obj.img = loader.loadImage(data.img);
  obj.position = data.position;
  for(let i = 0; i != data.conditions.length; ++i){
    let c = loadConditionFromJSON(data.conditions[i], loader);
    obj.addCondition(c);
  }
  for(let i = 0; i != data.objs.length; ++i){
    let child = loadObjectFromJSON(data.objs[i], loader);
    obj.addChild(child);
  }
  return obj;
}
