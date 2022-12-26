const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let isStarted = false;
let level = 0;

//Creates the next sequence of the game and adds to the game pattern array
function nextSequence() {
	userClickPattern = [];
	level++;
	$("#level-title").text("Level " + level);
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColors[randomNumber];
	gamePattern.push(randomChosenColour);

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColour);
}

//Plays the sound of the next color
function playSound(color) {
	let audio = new Audio("sounds/" + color + ".mp3");
	audio.play();
}

//Event handler for button click
$(".btn").click(function () {
	let userChosenColour = $(this).attr("id");
	userClickPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickPattern.length - 1);
});

//Adds class when button is pressed
function animatePress(color) {
	$("#" + color).addClass("pressed");
	setTimeout(function () {
		$("#" + color).removeClass("pressed");
	}, 100);
}

//Start game when any key is pressed
$(document).keypress(function (event) {
	if (!isStarted) {
		$("#level-title").text("Level " + level);
		nextSequence();
		isStarted = true;
	}
});

//Validate answer when user clicks
function checkAnswer(currentLevel) {
	//User chooses the right button
    if (gamePattern[currentLevel] === userClickPattern[currentLevel]) {
		if (userClickPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over. Press any key to restart" );

        setTimeout(function () {
            $("body").removeClass("game-over");            
        }, 200);

	}
}
