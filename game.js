/**************Main Start*******************************/

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickCount = 0;

enablePressKeyToStartGameListener();

/*****************Main End*********************************/

function enablePressKeyToStartGameListener() {
    $(document).on("keydown", startGame);
}
function disablePressKeyToStartGameListener() {
    $(document).off("keydown");

}
function startGame() {
    enableCheckUserInputListener();
    disablePressKeyToStartGameListener();
    showNextRandomColor();
}

function enableCheckUserInputListener() {
    $(".btn").on("click", checkUserInput);
}
function disableCheckUserInputListener() {
    $(".btn").off("click");
}



function checkUserInput(evt) {
    var input = evt.target;
    //highlightUserInput(input);
    var inputColor = getInputColor(input);

    if (inputColor === gamePattern[userClickCount]) {
        userClickCount++;
        if (userClickCount === gamePattern.length) {
            showNextRandomColor();
            userClickCount = 0;
        }
    }
    else {
        gameOver();
    }
}

function gameOver() {
    new Audio("sounds/wrong.mp3").play();
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 100);
    userClickCount = 0;
    disableCheckUserInputListener();
    enablePressKeyToStartGameListener();
    gamePattern = [];
    $("h1").text("Game Over, press a key to restart");
}

function nextSequence() {
    return Math.floor(Math.random() * 4);
}

function animateButton(color) {
    $("#" + color).fadeOut();
    setTimeout(function () {
        $("#" + color).fadeIn()
    }, 10);
}

function showNextRandomColor() {
    $("h1").text("Level " + (userClickCount + 1));
    var randomColor = buttonColors[nextSequence()];
    animateButton(randomColor);

    //Keep track of random buttons
    gamePattern.push(randomColor);
}

function animateAndAudioPress(color) {
    new Audio("sounds/" + color + ".mp3").play();

    $("."+color).addClass("pressed");
    setTimeout(function () {
        $("."+color).removeClass("pressed")
    }, 100);;
}

function getInputColor(input) {
    switch (input.className) {
        case "btn red":
            animateAndAudioPress("red");
            return "red";
            break;
        case "btn blue":
            animateAndAudioPress("blue");
            return "blue";
            break;
        case "btn green":
            animateAndAudioPress("green");
            return "green";
            break;
        case "btn yellow":
            animateAndAudioPress("yellow");
            return "yellow";
            break;
        default:
            break;
    }
}