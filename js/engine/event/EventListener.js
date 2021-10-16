//WORKS ALONGSIDE EVENT TO TRIGGER EVENTS//

class EventListener {

  begin(event, param) {

  }

  end(event, param) {

  }

  raise(event, param) {
    this.begin(event, param);
    this.end(event, param);
  }
}
