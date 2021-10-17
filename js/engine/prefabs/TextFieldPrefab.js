class TextFieldPrefab extends GameObject {

  constructor(onEnterListener = null) {

    super();

    this.value = "";

    this.addComponent(new Transform());
    this.inputRec = new WindowInputReceiverComponent();
    this.addComponent(this.inputRec);
    this.textField = new TextComponent("");
    this.addComponent(this.textField);

    this.inputRec.onKeyTypeEvent.addListener(new CallbackAction2(this,this.onKeyType));
    this.inputRec.onKeyPressEvent.addListener(new CallbackAction2(this,this.onKeyPress));

    this.maxChar = 50;

    this.onEnterEvent = new Event();

    if (onEnterListener != null){
      this.onEnterEvent.addListener(onEnterListener);
    }
  }

  setText(txt) {

      this.value = txt;
      this.textField.text = txt;
  }

  onKeyPress(event, key) {
//console.log("textField " + key);
    if (key == 8) {
      if (this.value.length > 0) {
        this.value = this.value.substring(0, this.value.length - 1);
            this.textField.text = this.value;
      }
    } else if (key == 13) {
      this.onEnterEvent.raise();
    }
  }

  onKeyType(event, key) {

    if (key == "Enter") {
      return;
    }

    if (this.value.length >= this.maxChar) {
      return;
    }
    this.value = this.value + key;

    this.textField.text = this.value;

    // console.log("text field " + keyCode);
  }
}
