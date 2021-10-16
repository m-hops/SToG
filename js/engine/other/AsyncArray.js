class AsyncArray {

    constructor() {

      this.active = [];
      this.toAdd = [];
      this.toRemove = [];

    }
    visit(func){
      for (let h = 0; h < this.active.length; h++) {
        if (!func(this.active[h])) return false;
      }
      for (let h = 0; h < this.toAdd.length; h++) {
        if (!func(this.toAdd[h])) return false;
      }
      return true;
    }
    visitActive(func){
      for (let h = 0; h < this.active.length; h++) {
        if (!func(this.active[h])) return false;
      }
      return true;
    }

    visitElementsOfType(type, func){
      for (let h = 0; h < this.active.length; h++) {
        if(this.active[h] instanceof type) {
          if(!func(this.active[h])) return false;
        }
      }
      for (let h = 0; h < this.toAdd.length; h++) {
        if(this.toAdd[h] instanceof type) {
          if(!func(this.toAdd[h])) return false;
        }
      }
      return true;
    }

    //CHECKS FOR THE FIRST ACTIVE ELEMENT IN AN ARRAY//
    getFirstActiveElementOfType(type){

      for (let h = 0; h < this.active.length; h++) {
        if(this.active[h] instanceof type) return this.active[h];
      }

      return null;
    }

    //CHECKS FOR FIRST ELEMENT IN ARRAY BY TYPE//
    getFirstElementOfType(type){

      for (let h = 0; h < this.active.length; h++) {
        if(this.active[h] instanceof type) return this.active[h];
      }

      for (let i = 0; i < this.toAdd.length; i++) {
        if(this.toAdd[i] instanceof type) return this.toAdd[i];
      }

      return null;
    }

    getFirstOrAddElementOfType(type){

      let e = this.getFirstElementOfType(type);
      if(e==null){
        e = new type();
        this.add(e);
      }
      return e;
    }

    //RETURNS ALL ELEMENTS OF A TYPE IN ARRAY//
    getAllElementOfType(type){
      let elements = [];

      for (let h = 0; h < this.active.length; h++) {
        if(this.active[h] instanceof type) elements.push(this.active[h]);
      }

      for (let i = 0; i < this.toAdd.length; i++) {
        if(this.toAdd[i] instanceof type) elements.push(this.toAdd[i]);
      }

      return elements;

    }

    add(obj) {

      //CHECKS TO SEE IF GAME OBJECT IS QUEUED FOR REMOVAL//
      let index = this.toRemove.findIndex(x => x === obj);
      if (index >= 0) {
        this.toRemove.splice(index,1);
        return;
      }

      //PREVENTS ADDING DUPLICATION OF GAME OBJECT//
      if (this.active.findIndex(x => x === obj) >= 0) return;
      if (this.toAdd.findIndex(x => x === obj) >= 0) return;

      //PUSHES NEW GAME OBJECT INTO ARRAY//
      this.toAdd.push(obj);
    }

    remove(obj) {

      //CHECKS TO SEE IF GAME OBJECT IS QUEUED FOR ADDING//
      let index = this.toAdd.findIndex(x => x === obj);
      if (index >= 0) {
        this.toAdd.splice(index,1);
        return;
      }

      if (this.toRemove.findIndex(x => x === obj) >= 0) return;

      //LOCATES SPECIFIC OBJECT INSIDE ARRARY//
      index = this.active.findIndex(x => x === obj);
      //QUEUES UP OBJECTS TO BE REMOVED//
      if (index >= 0) {

        this.active[index].end();
        this.toRemove.push(obj);
      }
    }

    start() {

      //START ALL ACTIVE GAME OBJECTS//
      for (let i = 0; i < this.active.length; i++) {
        this.active[i].start();
      }
    }

    update() {

      //PUSHES REQUIRED OBJECTS INTO TO ADD ARRAY//
      for (let i = 0; i < this.toAdd.length; i++) {
        this.active.push(this.toAdd[i]);

        this.toAdd[i].start();
      }

      this.toAdd = [];

      //PUSHES REQUIRED OBJECTS INTO TO REMOVE ARRAY//
      for (let j = 0; j < this.toRemove.length; j++) {
        let index = this.active.findIndex(x => x === this.toRemove[j]);

        if (index >= 0) {

          this.toRemove[j].end();
          this.active.splice(index, 1);
        }
      }

      this.toRemove= [];

      for (let h = 0; h < this.active.length; h++) {
        this.active[h].update();
      }
    }

    end() {

      //ENDS THE SCENE AND CALLS END ON ALL GAME OBJECTS RUNNING//
      for (let i = 0; i < this.active.length; i++) {
        this.active[i].end();
      }
    }
}
