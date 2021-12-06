let roachEndTxt ="I told you I'd take you where you need to go. And since I am a bug of the cloth, I knew you needed the truth."

"Behold my child. Behold the futility of your attempt at free choice. Realize every effort to reach your selfish goal is done so in vain. For I am not just some type of god, I am the one who will keep you in limbo forever."

"And I see all of you";

function displayWallText() {
  fetch("inputs.txt")
	.then((response) => {
  		return response.text();
	})
	.then((text) => {
  		//console.log(text);
      document.getElementById("wallText").innerHTML = text;
	});
  readText();
}
