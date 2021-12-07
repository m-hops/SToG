<?php

  if($_SERVER['REQUEST_METHOD'] == 'POST'){

      $newCaption = $_POST['txt1'];
      $captionsFile = fopen("js/_typedWordCounter/inputs.txt","a") or die("Unable to open file!");
      fwrite($captionsFile, "".$newCaption."\n");

      fclose($captionsFile);
      //echo $_POST['myCaption'];
      exit;
  }
?>


<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0>

    <title>RAINEBOW_ENGINE_V0.3</title>

    <!-- CSS -->
    <link rel="stylesheet" type="text/css" href="css/style.css" />

    <!-- LIBRARY & EXTRENAL SCRIPTS -->
    <script src="js/libraries/p5.min.js"></script>
    <script src="js/libraries/p5.sound.min.js"></script>
    <script src="js/libraries/p5.play-master/lib/p5.play.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>

    <!-- ENGINE SCRIPTS -->
      <!-- INITIALIZING SCRIPTS-->
      <script src="js/engine/event/EventListener.js"></script>
      <script src="js/engine/components/ComponentClass.js"></script>
      <script src="js/engine/components/RenderComponent.js"></script>
      <script src="js/engine/scene_and_state/GameState.js"></script>

      <!-- ACTION -->
      <script src="js/engine/action/CallbackAction.js"></script>
      <script src="js/engine/action/ChangeSceneAction.js"></script>
      <script src="js/engine/action/CloseWindowAction.js"></script>
      <script src="js/engine/action/EnableGameObjectAction.js"></script>
      <script src="js/engine/action/OpenWindowAction.js"></script>
      <script src="js/engine/action/PlaySFXAction.js"></script>
      <script src="js/engine/action/PrintAction.js"></script>

      <!-- COMPONENTS -->
        <!-- WINDOW_FACTORY -->
        <script src="js/engine/components/window_factory/RectLimiterComponent.js"></script>
        <script src="js/engine/components/window_factory/WindowCollectionComponent.js"></script>
        <script src="js/engine/components/window_factory/WindowFactoryComponent.js"></script>
        <script src="js/engine/components/window_factory/WindowFocusComponent.js"></script>
        <script src="js/engine/components/window_factory/WindowInputReceiverComponent.js"></script>

      <script src="js/engine/components/AnimationComponent.js"></script>
      <script src="js/engine/components/AttachToComponent.js"></script>
      <script src="js/engine/components/BitmapTextComponent.js"></script>
      <script src="js/engine/components/CameraComponent.js"></script>
      <script src="js/engine/components/ColliderComponent.js"></script>
      <script src="js/engine/components/DirectionalAnimationComponent.js"></script>
      <script src="js/engine/components/DraggableComponent.js"></script>
      <script src="js/engine/components/ImageComponent.js"></script>
      <script src="js/engine/components/KeyboardComponent.js"></script>
      <script src="js/engine/components/KeyboardEventComponent.js"></script>
      <script src="js/engine/components/MouseComponent.js"></script>
      <script src="js/engine/components/MusicPlayerComponent.js"></script>
      <script src="js/engine/components/ParalaxComponent.js"></script>
      <script src="js/engine/components/RectColliderComponent.js"></script>
      <script src="js/engine/components/TextComponent.js"></script>
      <script src="js/engine/components/TimelineComponent.js"></script>
      <script src="js/engine/components/TransformComponent.js"></script>
      <script src="js/engine/components/TriggerComponent.js"></script>

      <!-- EVENT -->
      <script src="js/engine/event/Event.js"></script>

      <!-- MATH -->
      <script src="js/engine/math/AABB.js"></script>
      <script src="js/engine/math/AffineTransform.js"></script>
      <script src="js/engine/math/Line2D.js"></script>
      <script src="js/engine/math/Math.js"></script>
      <script src="js/engine/math/Physics2D.js"></script>
      <script src="js/engine/math/Ray2D.js"></script>

      <!-- OTHER -->
      <script src="js/engine/other/AsyncArray.js"></script>
      <script src="js/engine/other/GameObject.js"></script>

      <!-- PHYSICS -->
      <script src="js/engine/physics/PhysicsSolver.js"></script>

      <!-- PREFABS -->
      <script src="js/engine/prefabs/ButtonCustom0Prefab.js"></script>
      <script src="js/engine/prefabs/ButtonPrefab.js"></script>
      <script src="js/engine/prefabs/LabelPrefab.js"></script>
      <script src="js/engine/prefabs/TextFieldPrefab.js"></script>
      <script src="js/engine/prefabs/WindowManagerPrefab.js"></script>

      <!-- RENDERING -->
      <script src="js/engine/rendering/Renderer.js"></script>

      <!-- SCENE_AND_STATE -->
      <script src="js/engine/scene_and_state/IState.js"></script>
      <script src="js/engine/scene_and_state/Scene.js"></script>
      <script src="js/engine/scene_and_state/SceneState.js"></script>
      <script src="js/engine/scene_and_state/StateMachine.js"></script>

      <!-- TEST_ENVIROMENT -->
      <script src="js/engine/test_enviroment/TestScene.js"></script>


      <!-- GAME_SPECIFIC_SCRIPTS -->
        <!-- DIALOG -->
        <script src="js/game/dialog/TextGame.js"></script>
        <script src="js/game/dialog/TextGameJSON.js"></script>

        <!-- SCENES -->
        <script src="js/game/scenes/SToGTest.js"></script>

        <!-- WINDOWS -->
        <script src="js/game/textGame/TGCondition.js"></script>
        <script src="js/game/textGame/Reaction.js"></script>
        <script src="js/game/textGame/Room.js"></script>
        <script src="js/game/textGame/Subject.js"></script>
        <script src="js/game/textGame/Verb.js"></script>
        <script src="js/game/textGame/TGObject.js"></script>
        <script src="js/game/textGame/TextGameScript.js"></script>
        <script src="js/game/textGame/TextGameState.js"></script>
        <script src="js/game/textGame/Reactions/ReactionGoto.js"></script>
        <script src="js/game/textGame/Reactions/ReactionTxt.js"></script>
        <script src="js/game/textGame/Reactions/ReactionImg.js"></script>
        <script src="js/game/textGame/Reactions/ReactionIf.js"></script>
        <script src="js/game/textGame/Reactions/ReactionSFX.js"></script>
        <script src="js/game/textGame/Reactions/ReactionSet.js"></script>
        <script src="js/game/textGame/Reactions/ReactionAdd.js"></script>
        <script src="js/game/textGame/Reactions/ReactionTimer.js"></script>
        <script src="js/game/textGame/Reactions/ReactionStartMusic.js"></script>
        <script src="js/game/textGame/Reactions/ReactionStopMusic.js"></script>
        <script src="js/game/textGame/Reactions/ReactionMusicVolume.js"></script>

        <!-- WINDOWS -->
        <script src="js/game/windows/WindowDefault.js"></script>
        <script src="js/game/windows/WindowDesktop.js"></script>

        <!-- MAIN_SCRIPT -->
        <script src="js/script.js"></script>

  </head>
  <body>
  </body>

</html>
