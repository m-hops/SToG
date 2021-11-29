class ReactionImg extends Reaction{
  constructor(img = debugMissingIMG){
    super("img");
    this.img = img;
  }

  perform(target){
    target.setImage(this.img);
    return true;
  }
  
  print(indent){
      return indent + "ReactionImg(\""+this.type+"\", \""+this.img+"\")";
  }
}
