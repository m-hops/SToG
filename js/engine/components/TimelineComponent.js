
class TimelineKey{
  constructor(){
    this.begin = 0;
    this.end = 0;
  }
  onStart(timeline, timeOffset){

  }
  onRun(timeline){

  }
  onEnd(timeline, timeOffset){

  }
  onLerp(timeline, nextEvent, t){

  }
}

class TimelineComponent extends Component{

  constructor(targetObject=null){
    super();
    this.events = [];
    this.time = 0;
    this.playing = false;
    this.lastEvent = -1;
    this.lastEventEnded = false;
    this.targetObject = targetObject;
  }
  getTargetObject(){
    if(this.targetObject != null) return this.targetObject;
    return this.gameObject;
  }

  addKey(key){
    this.events.push(key);
    return key;
  }
  resetTimeline(){
    this.time = 0;
    this.lastEvent = -1;
    this.events.sort(function(a, b){return a.begin - b.begin});
  }
  startTimeline(){

    this.events.sort(function(a, b){return a.begin - b.begin});
    //console.log(this.events);
    this.playing = true;
  }
  stopTimeline(){
    this.playing = false;
  }

  beginKey(index, timeOffset){
    this.events[index].onStart(this, timeOffset);
  }
  endKey(index, timeOffset){
    this.events[index].onEnd(this, timeOffset);
  }
  runKey(index){
    this.events[index].onRun(this);
  }
  lerpKey(index, nextEventIndex, t){
    this.events[index].onLerp(this, this.events[nextEventIndex], t);
  }
  updateTimeLine(nextTime){
    //run and check if last event has ended
    if(this.lastEvent >= 0){
      let endOffset = nextTime - this.events[this.lastEvent].end;
      if(endOffset >= 0){
        if(!this.lastEventEnded){
          //event has ended
          this.endKey(this.lastEvent, endOffset);
          this.lastEventEnded = true;
        }
      } else {
        this.runKey(this.lastEvent);
        return;
      }
    }
    //advance in the timeline
    for(let i = this.lastEvent+1; i < this.events.length; ++i){
      let beginOffset = nextTime - this.events[i].begin;
      if( beginOffset >= 0){
        //event has started
        this.beginKey(i, beginOffset);
        this.runKey(i);
        //this.events[i].onStart(this, beginOffset);
        //this.events[i].onRun(this);
      } else {
        //next event has not started yet
        if(this.lastEvent>=0){
          let diff = this.events[i].begin - this.events[this.lastEvent].end;
          let t = (this.time - this.events[this.lastEvent].end) / diff;
          this.lerpKey(this.lastEvent, i, t);
          //this.events[this.lastEvent].onLerp(this, this.events[i], t);
        }
        return;
      }
      this.lastEvent = i;
      this.lastEventEnded = false;
      let endOffset = nextTime - this.events[i].end;
      if( endOffset >= 0){
        //event has ended
        this.endKey(i, endOffset);
        //this.events[i].onEnd(this, endOffset);
        this.lastEventEnded = true;
      }
    }
  }
  update(){
    if(this.playing){
      //console.log("Run timeline " + this.time);
      let nextTime = this.time + deltaTime;
      this.updateTimeLine(nextTime);
      this.time = nextTime;
    }

  }
}
class PositionKey extends  TimelineKey{
  constructor(time,x,y,z){
    super();
    this.begin = this.end = time;
    this.value = new p5.Vector(x,y,z);
  }

  onStart(timeline){
    //console.log("PositionKey.onStart " + this.value);
  }
  onEnd(timeline){
    //console.log("PositionKey.onEnd " + this.value);
  }
  onRun(timeline){
    //console.log("PositionKey.run " + this.value);
    timeline.getTargetObject().getTransform().local.position = this.value;

  }
  onLerp(timeline, nextKey, t){
    //console.log("PositionKey.onLerp " + this.value + " to " + nextKey.value + " with t =" + t);
    let value = p5.Vector.lerp(this.value, nextKey.value, t);
    timeline.getTargetObject().getTransform().local.position = value;
  }
}
class PositionTimeline extends TimelineComponent{
  constructor(){
    super();
  }
  addKey(time, x, y, z){
    return super.addKey(new PositionKey(time, x,y,z));
  }
}

class RotationKey extends  TimelineKey{
  constructor(time,angle){
    super();
    this.begin = this.end = time;
    this.value = angle;
  }

  onStart(timeline){
    //console.log("PositionKey.onStart " + this.value);
  }
  onEnd(timeline){
    //console.log("PositionKey.onEnd " + this.value);
  }
  onRun(timeline){
    //console.log("PositionKey.run " + this.value);
    timeline.getTargetObject().getTransform().local.rotation = this.value;
  }
  onLerp(timeline, nextKey, t){
    //console.log("PositionKey.onLerp " + this.value + " to " + nextKey.value + " with t =" + t);
    let value = this.value * (1-t) + nextKey.value * t;
    timeline.getTargetObject().getTransform().local.rotation = value;
  }
}
class RotationTimeline extends TimelineComponent{

  constructor(){
    super();
  }
  addKey(time, degree){
    return super.addKey(new RotationKey(time, degree/180*PI));
  }
  addKeyDegree(time, degree){
    return super.addKey(new RotationKey(time, degree/180*PI));
  }
}

class ScaleKey extends  TimelineKey{
  constructor(time,x,y,z){
    super();
    this.begin = this.end = time;
    this.value = new p5.Vector(x,y,z);
  }

  onStart(timeline){
    //console.log("PositionKey.onStart " + this.value);
  }
  onEnd(timeline){
    //console.log("PositionKey.onEnd " + this.value);
  }
  onRun(timeline){
    //console.log("PositionKey.run " + this.value);
    timeline.getTargetObject().getTransform().local.scale = this.value;
  }
  onLerp(timeline, nextKey, t){
    //console.log("PositionKey.onLerp " + this.value + " to " + nextKey.value + " with t =" + t);
    let value = p5.Vector.lerp(this.value, nextKey.value, t);
    timeline.getTargetObject().getTransform().local.scale = value;
  }
}
class ScaleTimeline extends TimelineComponent{

  constructor(){
    super();
  }
  addKey(time, x, y, z){
    return super.addKey(new ScaleKey(time, x,y,z));
  }
}



class StartGOTimelinesAction extends EventListener {

  constructor(targetGO) {

    super();
    this.targetGO = targetGO;
  }

  begin(Key){
    let tls = this.targetGO.components.getAllElementOfType(TimelineComponent);
    for(let i = 0; i != tls.length; i++){
      tls[i].startTimeline();
    }
  }

  end(Key){
  }
}

class RestartGOTimelinesAction extends EventListener {

  constructor(targetGO) {

    super();
    this.targetGO = targetGO;
  }

  begin(Key){
    let tls = targetGO.components.getAllElementOfType(TimelineComponent);
    for(let i = 0; i != tls.length; i++){
      tls[i].resetTimeline();
    }
  }

  end(Key){
  }
}
class StopGOTimelinesAction extends EventListener {

  constructor(targetGO) {

    super();
    this.targetGO = targetGO;
  }

  begin(Key){
    let tls = targetGO.components.getAllElementOfType(TimelineComponent);
    for(let i = 0; i != tls.length; i++){
      tls[i].stopTimeline();
    }
  }

  end(Key){
  }
}
class LogAction extends EventListener {

  constructor(msg) {

    super();
    this.msg = msg;
  }

  begin(Key){
    console.log("[LogAction.begin] " + this.msg);
  }

  end(Key){
    console.log("[LogAction.end] " + this.msg);
  }

}


class TimelineEvent extends  TimelineKey{
  constructor(time,event){
    super();
    this.begin = this.end = time;
    this.event = event;
  }

  onStart(timeline){
    this.event.begin();
  }
  onEnd(timeline){
    this.event.end();
  }
  onRun(timeline){
  }
  onLerp(timeline, nextEvent, t){
  }
}


class EventTimeline extends TimelineComponent{
  constructor(){
    super();
  }

  addAction(time, action){
    return this.addEvent(time, new Event(action));
  }
  addEvent(time, event){
    return super.addKey(new TimelineEvent(time, event));
  }
}
//
// class ActionTimeline extends TimelineComponent{
//
//   constructor(){
//     super();
//   }
//   beginEvent(index, timeOffset){
//     console.log("[ActionTimeline.beginEvent]" + index);
//     this.events[index].begin(this.events[index]);
//   }
//   endEvent(index, timeOffset){
//     console.log("[ActionTimeline.endEvent]" + index);
//     this.events[index].end(this.events[index]);
//   }
//   runEvent(index){
//     console.log("[ActionTimeline.runEvent]" + index);
//   }
//   lerpEvent(index, nextEventIndex, t){
//     console.log("[ActionTimeline.lerpEvent]" + index);
//   }
//   addAction(time, action){
//     this.addEvent(new TimelineEvent(time, new Event(action)));
//   }
//   addKey(time, action){
//     this.addEvent(action);
//   }
// }

// class ActivateTimelinesOnClick  extends InteractiveComponent{
//
//   constructor(targetObject=null){
//     super();
//     this.targetObject = targetObject;
//   }
//   processMouseClick(posLocal, posWorld, event){
//     //console.log(event);
//     let target = this.owner;
//     if(this.targetObject != null) target = this.targetObject;
//     let timelines = target.getAllComponentWithFlag(TimelineComponent.ID, true, true);
//     for(let i = 0; i != timelines.length; ++i){
//       timelines[i].start();
//     }
//     return false;
//   }
// }
