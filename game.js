let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keydown(function() {
  if(!started){
  $("h1").text("Level 0"); 
  nextSequence();
  started = true;
  } 
});

$(".btn").click(function(value) {
  let userChoosenColor = this.id;
  userClickedPattern.push(userChoosenColor);

  playSound(userChoosenColor);
  animatePress(userChoosenColor);

  checkAnswer(userClickedPattern.length - 1);
});



function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();  
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100)
}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length){
    setTimeout(function() {
    nextSequence();
    }, 1000);
  }
  } else {
    let gameOverSound = new Audio("./sounds/wrong.mp3");
    gameOverSound.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over, Press Any Key to  RESTART");
    startOver();
  }

 
}


function nextSequence() {

  userClickedPattern = [];

  level++;
  $("h1").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);

  $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColor);

}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

 



//  newSequence();
