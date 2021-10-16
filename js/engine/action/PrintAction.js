//TROUBLESHOOTING ACTION; NOT NECESSARY FOR GAME//

class PrintAction extends EventListener {

  constructor(msg) {

    super();

    this.msg = msg;

  }

  begin() {
    console.log("PrintAction.begin " + this.msg);
  }

  end() {
    console.log("PrintAction.end " + this.msg);
  }
}
