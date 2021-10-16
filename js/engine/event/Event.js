//USED TO CREATE ONE OFF EVENTS//

class Event {

  constructor(listener=null) {

    this.listeners = [];
    if(listener != null){
      this.listeners.push(listener);
    }
  }

  //IF LISTENER FOUND, START//
  begin(param) {

    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i].begin(this, param);
    }
  }
  //IF LISTENER FOUND, END//
  end(param) {

    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i].end(this, param);
    }
  }

  //ADD LISTENER TO GAME OBJECT//
  addListener(listener) {
    this.listeners.push(listener);
  }

  //REMOVE LISTENER TO GAME OBJECT//
  removeListener(listener) {
    let index = this.listeners.findIndex(x => x === listener);
    if (index >= 0) {
      this.listeners.splice(index,1);
      return;
    }
  }

  raise(param) {
    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i].raise(this,param);
    }
  }

}
