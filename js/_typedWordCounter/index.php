<?php

  if($_SERVER['REQUEST_METHOD'] == 'GET'){


    if(isset($_GET['my_Caption'])){
      $newCaption = $_GET['my_Caption'];

      $captionsFile = fopen("inputs.txt","a") or die("Unable to open file!");
      fwrite($captionsFile, "".$newCaption."\n");

      fclose($captionsFile);
      //echo $_POST['myCaption'];
      exit;
    }
  }
?>


<!DOCTYPE html>
<html>
<head>
<title>stog hidden room</title>
<!-- get JQUERY -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="script.js"></script>
<link rel="stylesheet" type="text/css" href="hiddenRoom.css">
<script src ="writeInputsTotxt.js"></script>
<script src ="dataDisplayer.js"></script>
</head>

<body onload="displayWallText()">

  <h1>USER INPUTS DATA:</h1>
  <p>user input field (placeholder for testing):</p>
  <form id= 'insertCaption' action="" method="GET">
      <p><input type="text" size="24" maxlength = "50" id="customCaption" name="my_Caption" required></p>
      <input type = "submit" name = "submit" value = "ENTER" id =buttonS />
  </form>
  <div id="wordFreq"></div>
  <br>

  <p>all the words that has been typed:</p>
  <input type="button" id="readTxt" value="read txt" />
  <div id="wordFreq"></div>
  <textarea id="wordsTxtAra" cols="60" rows="8"></textarea><br />

  <p>count each word:</p>
  <input type="button" id="countWordsBtn" value="SEE WORD COUNT" />
  <div id="wordFreq"></div>
  <div id ="countDisplay"></div>

  <div id ="wallText">
    <p>test</p>
  </div>

  <div class = "scrollbox">
      <marquee scrollamount="20"><h1>I told you I'd take you where you need to go. And since I am a bug of the cloth, I knew you needed the truth."

      "Behold my child. Behold the futility of your attempt at free choice. Realize every effort to reach your selfish goal is done so in vain. For I am not just some type of god, I am the one who will keep you in limbo forever."

      "And I see all of you</h1></marquee>
  </div>


</body>

</html>
