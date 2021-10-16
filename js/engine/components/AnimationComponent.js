//DISPLAYS Animation OF GAME OBJECT//

class AnimationComponent extends RenderComponent {

  //ALLOWS FOR INPUT OF ANIMATION AND SPEED OF PLAYBACK; PLAYBACK HAS DEFAULT VALUE IF NOT SPECIFICED BY USER//
  constructor(anim, speed = 5) {

    super();

    this.anim = anim;
    this.speed = speed;

  }

  //RENDERS ANIMATION WITH ABILITY TO ADJUST SPEED//
  render(renderer) {

    push();
    this.anim.frameDelay = this.speed;
    animation(this.anim, 0, 0);
    pop();
  }
}
