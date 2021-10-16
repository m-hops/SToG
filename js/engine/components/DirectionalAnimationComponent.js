//RUNS ANIMATIONS DEPENDING ON DIRECTIONAL DESTINATION OF PLAYER GAMEOBJECT//

class DirectionalAnimationComponenet extends RenderComponent {

  constructor(leftWalk, rightWalk, leftStationary, rightStationary) {

    super();

    this.leftWalk = leftWalk;
    this.rightWalk = rightWalk;
    this.leftStationary = leftStationary;
    this.rightStationary = rightStationary;
    this.wasLeft = false;
  }

  render(renderer) {

    let physic = this.gameObject.components.getFirstElementOfType(Physics2D);

    //CHECKS TO SEE IF PHYSICS2D IS IN PLAY AND ACTIVATED//
    if (physic != null) {
      if (physic.speed < 0.0001) {

        //SETS PLAYER SPRITE TO RIGHT STATIONARY IF RIGHT WAS THE PREVIOUS PLAYER MOVEMENT//
        if (!this.wasLeft || physic.direction.x > 0) {
          push();
          imageMode(CENTER);
          image(this.rightStationary,0,0);
          pop();

        //SETS PLAYER SPRITE TO lEFT STATIONARY IF lEFT WAS THE PREVIOUS PLAYER MOVEMENT//
        } else {
          push();
          imageMode(CENTER);
          image(this.leftStationary,0,0);
          pop();
        }

      //RUNS RIGHT MOVEMENT ANIMATION WHEN PLAYER IS MOVING TO THE RIGHT//
      }else if (physic.direction.x > 0) {
        this.rightWalk.frameDelay = 10;
        animation(this.rightWalk,0,0);
        this.wasLeft = false;

      //RUNS lEFT MOVEMENT ANIMATION WHEN PLAYER IS MOVING TO THE lEFT//
      } else {
        this.leftWalk.frameDelay = 10;
        animation(this.leftWalk,0,0);
        this.wasLeft = true;
      }

    }

  }

}
