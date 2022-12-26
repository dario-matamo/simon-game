const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let isStarted = false;
let level = 0;

//Creates the next sequence of the game and adds to the game pattern array
function nextSequence() {
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
$(".btn").click(function (e) {
	let userChosenColour = this.id;
	userClickPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
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
		isStarted = true;
        $("#level-title").text("Level " + level);
		nextSequence();
        
	}
});

