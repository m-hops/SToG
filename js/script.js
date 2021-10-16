"use strict";

//ENGINE SCENE SWITCHER//
let rootStateMachine;
let globalRenderer = new Renderer();
let gameState = new GameState();

//SET CANVAS PROPERTY//
let canvas = {
  dimensionW:960,
  dimensionH:540,
  color: {
    r: 9,
    g: 3,
    b: 15
  }
}

//IMAGE VARIABLES//
let mainOverlayIMG;

//TEMP VARIABLES//
let testBedroomIMG;

function preload() {

  //IMAGE PRELOADS//
  mainOverlayIMG = loadImage('assets/images/mainOverlay.png');

  //TEST PRELOADS//
  testBedroomIMG = loadImage('assets/images/testAssets/bedroom.jpg');
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
