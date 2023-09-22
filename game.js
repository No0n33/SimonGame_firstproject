let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
$(document).keypress(function (event) {
  let keyMap = {
    r: "red",
    b: "blue",
    g: "green",
    y: "yellow",
  };

  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  } else {
    let userChosenColour = keyMap[event.key];
    if (userChosenColour) {
      userClickedPattern.push(userChosenColour);
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
    }
  }
});
$(".btn").click(function () {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success.");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    const wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("body")
      .addClass("game-over")
      .dequeue()
      .delay(500)
      .queue(function () {
        $(this).removeClass("game-over");
      });
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
