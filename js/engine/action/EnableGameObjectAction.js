class EnableGameObjectAction extends EventListener {

  constructor(targetGameOBJ) {

    super();
    this.targetGameOBJ = targetGameOBJ;

  }

  begin(event){
    this.targetGameOBJ.enable();
  }

  end(event){
    this.targetGameOBJ.disable();
  }

}
