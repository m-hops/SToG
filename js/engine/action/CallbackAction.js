class CallbackAction extends EventListener {

  constructor(onBegin, onEnd) {

    super();
    this.onBegin = onBegin;
    this.onEnd = onEnd;
  }

  begin(event){
    if(this.onBegin != null) this.onBegin(event);
  }

  end(event){
    if(this.onEnd != null) this.onEnd(event);
  }

}
class CallbackAction2 extends EventListener {

  constructor(onBeginThis, onBegin, onEnd) {

    super();
    this.onBeginThis = onBeginThis;
    this.onBegin = onBegin;
    this.onEnd = onEnd;
  }

  begin(event, param){
    if(this.onBegin != null) this.onBegin.apply(this.onBeginThis, [event, param]);
  }

  end(event, param){
    if(this.onEnd != null) this.onEnd([event, param]);
  }

}
