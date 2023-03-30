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
    enableCheckUserInputListener(); //player cannot play the game unless he starts the game
    disablePressKeyToStartGameListener(); //player cannnot restart the game unless the game is over
    showFirstRandomColor();
}

function enableCheckUserInputListener() {
    $(".btn").on("click", checkUserInput);
}
function disableCheckUserInputListener() {
    $(".btn").off("click");
}

function showFirstRandomColor(){
    showNextRandomColor();
}

function showNextRandomColor() {
    $("h1").text("Level " + (userClickCount + 1));
    var randomColor = getRandomValueFromArray(buttonColors);
    animateButton(randomColor);

    //Keep track of random buttons
    gamePattern.push(randomColor);
}


function checkUserInput(evt) {
    var input = evt.target;
    var inputColor = getInputColor(input);
    animateAndPlayAudioOnPressedButton(inputColor);

    if (inputColor === gamePattern[userClickCount]) { // player is on the right path
        userClickCount++;
        if (userClickCount === gamePattern.length) { // player has pressed the right sequence of buttons
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
    disableCheckUserInputListener(); //player should not be able to play anymore
    enablePressKeyToStartGameListener();//player should have the ability to restart the game
    gamePattern = [];
    $("h1").text("Game Over, press a key to restart");
}

function getRandomValueFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function animateButton(color) {
    $("#" + color).fadeOut();
    setTimeout(function () {
        $("#" + color).fadeIn()
    }, 10);
}

function animateAndPlayAudioOnPressedButton(color) {
    new Audio("sounds/" + color + ".mp3").play();

    $("."+color).addClass("pressed");
    setTimeout(function () {
        $("."+color).removeClass("pressed")
    }, 100);;
}

function getInputColor(input) {
    switch (input.className) {
        case "btn red":
            return "red";
            break;
        case "btn blue":
            return "blue";
            break;
        case "btn green":
            return "green";
            break;
        case "btn yellow":
            return "yellow";
            break;
        default:
            break;
    }
}