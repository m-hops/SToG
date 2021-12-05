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
<title>word counter test</title>
<!-- get JQUERY -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="script.js"></script>
<script src ="writeInputsTotxt.js"></script>
</head>

<body>

  <h1>WORD COUNTER FOR PLAYTEST ANALYSIS OR WHATEVER PURPOSE</h1>
  <p>this is loaded from a text file from the folder</p>
  <p>imagine this txt file is updated with every text input collected from the STOG gameplay</p>

  <form id= 'insertCaption' action="" method="GET">
      <p><input type="text" size="24" maxlength = "50" id="customCaption" name="my_Caption" required></p>
      <input type = "submit" name = "submit" value = "ENTER" id =buttonS />
  </form>
  <div id="wordFreq"></div>
  <br>

  <input type="button" id="readTxt" value="read txt" />
  <div id="wordFreq"></div>
  <input type="button" id="countWordsBtn" value="count words" />
  <div id="wordFreq"></div>

  <textarea id="wordsTxtAra" cols="60" rows="8"></textarea><br />
  <div id ="countDisplay"></div>


</body>

</html>
