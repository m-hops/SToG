//MANAGES ACTIONS OF DIALOG SYSTEM//

class TextGameJSON extends TextGame{
  constructor(json){
    super();
    this.json = json;
  }

  getRoomName(){
    return this.json.roomName;
  }

  getRoomIMG(){
    return this.json.img;
  }

  getRoomTXT(){
    return this.json.description;
  }


}
