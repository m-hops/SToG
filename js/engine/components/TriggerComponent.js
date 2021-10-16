class TriggerComponent extends Component {

    constructor(listener=null) {
      super();

      this.onCollision = new Event();
      if(listener != null) this.onCollision.addListener(listener);
    }
}
