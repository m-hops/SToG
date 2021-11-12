"use strict";

//ENGINE SCENE SWITCHER//
let rootStateMachine;
let globalRenderer = new Renderer();
let gameState = new TextGameState();
let gameScript = new TextGameScript();

//SET CANVAS PROPERTY//
let canvas = {
  dimensionW:512,
  dimensionH:512,
  color: {
    r: 0,
    g: 0,
    b: 0
  }
}

//FONT VARIABLES//
let dosFont;

//IMAGE VARIABLES//
let mainOverlayIMG;
let helpOverlayIMG;

//TEMP VARIABLES//
let testBedroomIMG;
let debugMissingIMG;
let testMooseIMG;

function preload() {

  //FONT PRELOADS//
  dosFont = loadFont('assets/font/Perfect DOS VGA 437 Win.ttf');

  //JSON PRELOADS//
  //JSON PRELOADS ARE HANDLED THROUGH GAMESCRIPT; NO NEED TO ADD HERE EXCEPT INITIAL LOCATION//
  gameScript.loadJSON('assets/JSON/bedroomMain.json');

  //IMAGE PRELOADS//
  mainOverlayIMG = loadImage('assets/images/mainOverlay.png');
  helpOverlayIMG = loadImage('assets/images/help/help.png');

  //TEST PRELOADS//
  testBedroomIMG = loadImage('assets/images/testAssets/bedroom.jpg');
  debugMissingIMG = loadImage('assets/images/testAssets/error.PNG');
  testMooseIMG = loadImage('assets/images/testAssets/testMoose.png');
}

//ACTIVATES MOUSE CLICK THROUGH ENGINE AND ISTATE//
function mouseClicked() {

  if (rootStateMachine.currentState != null) {

      rootStateMachine.currentState.onMouseClick(rootStateMachine);

  }
}

//ACTIVATES MOUSE PRESSED THROUGH ENGINE AND ISTATE//
function mousePressed() {

  if (rootStateMachine.currentState != null) {

      rootStateMachine.currentState.onMousePressed(rootStateMachine);

  }
}

//ACTIVATES MOUSE RELEASE THROUGH ENGINE AND ISTATE//
function mouseReleased() {

  if (rootStateMachine.currentState != null) {

      rootStateMachine.currentState.onMouseReleased(rootStateMachine);

  }
}

//ACTIVATES KEYPRESSED THROUGH ENGINE AND ISTATE//
function keyPressed() {

    if (rootStateMachine.currentState != null) {

        rootStateMachine.currentState.onKeyPress(rootStateMachine, keyCode);

    }
}

//ACTIVATES KEYTYPED THROUGH ENGINE AND ISTATE//
function keyTyped() {

    if (rootStateMachine.currentState != null) {

        rootStateMachine.currentState.onKeyType(rootStateMachine, key);

    }
}

function setup() {

  createCanvas(canvas.dimensionW,canvas.dimensionH);

  //SET SCENE TO PROPER DESIGNATION WITH TRANSIT BELOW//
  rootStateMachine = new StateMachine();
  gameState.currentScene = "SToGTestScene";
  rootStateMachine.transit(new SceneState(globalRenderer, new SToGTestScene()));

}

function draw() {

  rootStateMachine.update();

  background(canvas.color.r, canvas.color.g, canvas.color.b);

  rootStateMachine.draw();

}
