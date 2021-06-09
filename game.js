var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;


// after keyboard click calls random button after 1000ms to flash
$(document).keypress(function () {
  if (!started) {
    $('#level-title').html(`Level ${level}`);
    setTimeout(function () { nextSequence() }, 1000);
    started = true;
  }
});

// every time the user clicks on the button
$('.btn').click(function (e) {
  e.preventDefault();
  userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)

  // sends the last button pressed index and checks with the gamePattern array
  checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
  // compares game pattern with the last index and user clicked button
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

  // compares the length and if it ok then initiates the next sequence
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }
  
  else {
    playSound("wrong");
    $('body').addClass('game-over');
    setTimeout(function () { $('body').removeClass('game-over'); }, 200);
    $('#level-title').html("Game Over, Press Any Key to Restart");
    startOver()
  }
}


function nextSequence() {
  userClickedPattern = [];
  // increment the game level
  level++
  // change game title to the current level
  $('#level-title').html(`Level ${level}`)
  // generate random int between 0-2
  randomNumber = getRandomInt(3)
  // choose random color  in the colors array
  randomChosenColour = buttonColours[randomNumber]
  // flash the button with the same color
  $("#" + randomChosenColour).select(flash(randomChosenColour));
  playSound(randomChosenColour)
  // add the color to the game pattern array
  gamePattern.push(randomChosenColour)
}

// function that generates random number
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// function that takes element as arg and flash it
function flash(btn) {
  $('#' + btn).fadeOut(10).fadeIn(10).fadeOut(100).fadeIn(100);
}




// arg--->elem name ---> plays sound 
function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// adds class "pressed" to the element and removes it after 100 ms
function animatePress(currentColour) {
  $('.' + currentColour).addClass('pressed');
  setTimeout(function () { $('.' + currentColour).removeClass('pressed'); }, 100);

}

// restart the game and setting game vars to 0
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

