// Declare Variables
const onOff = document.querySelector("#switch");
const start = document.querySelector("#start");
const strictBtn = document.querySelector("#strict");
const strictLight = document.querySelector("#strictLight");
const counter = document.querySelector("#count");
const pads = document.querySelectorAll(".pad");
const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
let playerTurn = false;
let cpuTurn = true;
let strictMode = false;
let playbackFunction = false;
let count = 0;
let playerClickNumber = 0;
let playbackArr;
var playback;

// Declare Audio Variables
const audioGreen = new Audio("sounds/simonSound1.mp3");
const audioRed = new Audio("sounds/simonSound2.mp3");
const audioYellow = new Audio("sounds/simonSound3.mp3");
const audioBlue = new Audio("sounds/simonSound4.mp3");

// Event Listeners
onOff.addEventListener("click", gameOnOff);
start.addEventListener("click", startIsClicked);
strictBtn.addEventListener("click", strict);
pads.forEach(pad => pad.addEventListener("click", padIsClicked));
pads.forEach(pad => pad.addEventListener("click", playerLogic));

// Functions ==================

// When on/off switch is clicked
function gameOnOff() {

    if (count == 0) {
        counter.style.color = "#F73955";
        count = 1;
    }
    else {
        counter.style.color = "#922334";
        playback = clearInterval(playback);
        counter.innerHTML = "--";
        count = 0;
        cpuTurn = false;
        playerTurn = false;
        cpuArr = [];
        playbackArr = [];
        playerClickNumber = 0;
        playbackFunction = false;
        strictMode = false;
        strictLight.style.backgroundColor = "#3D0810";
    }
}

// When Start is Clicked 
function startIsClicked() {
    if (count >= 1) {
        playback = clearInterval(playback);
        counter.innerHTML = 1;
        count = 1;
        cpuTurn = true;
        playerTurn = false;
        cpuArr = [];
        playbackArr = [];
        playerClickNumber = 0;
        playbackFunction = false;
        setTimeout(cpuLogic, 800);
    }
}

function strict() {
    if (count >= 1) {
        if (!strictMode) { 
            strictMode = true;
            strictLight.style.backgroundColor = "#F73955";
         }
         else {
            strictMode = false;
            strictLight.style.backgroundColor = "#3D0810";
        }
    }
}

// When Pad is Clicked
function padIsClicked(selected) {

    if (playerTurn) {
        selected = this.dataset.value;
    }
    else {
        selected = selected.toString();
    }

    switch (selected) {
        case "1":
            audioGreen.play();
            green.style.background = "#5AE2C9";
            setTimeout(`green.style.background =  "#45B09C"`,500);
            break;
        case "2":
            audioRed.play();
            red.style.background = "#F73955";
            setTimeout(`red.style.background =  "#D42F2F"` ,500);
            break;
        case "3":
            audioBlue.play();
            blue.style.background = "#39C3F5";
            setTimeout(`blue.style.background =  "#2A96BD" `,500);
            break;
        case "4":
            audioYellow.play();
            yellow.style.background = "#FFFD51";
            setTimeout(`yellow.style.background =  "#EFC94C"` ,500);
            break;
    }
}

// Cpu Create array and Playback Sequence
function cpuLogic() {

    // create a new array to hold sequence
    let cpuArr = []; 
    if (playbackFunction == true) {
        cpuArr = playbackArr;
    }
    // Create random Array based on count number
    let num;
    if (playbackFunction == false) {
        if (count < 20) {
            for (let i  = 0; i < count; i++) {
                num = Math.ceil(Math.random() * 3);
                cpuArr.push(num);
            }
        }
    }    
    let length = cpuArr.length;

    // Change Speed Based on Level
    let speed;
    if (count < 6) {speed = 1000;}
    else if (count < 10) {speed = 750;}
    else {speed = 500;}

    let n = 0;
    playback = setInterval(cpuInterval, speed); 
    function cpuInterval() {
        let value = cpuArr[n];
        padIsClicked(value);
        n++;
        // Clear the Interval
        if (n >= length) {
            playback = clearInterval(playback);
            cpuTurn = false;
            playerTurn = true;
            playbackArr = cpuArr;
            cpuArr = [];
            // console.log(playbackArr);
        }
    }
}

function playerLogic() {
    let clickedOn = this.dataset.value;
    let isError = false;

    if (playerTurn) {
        let length = playbackArr.length;
        
        // Check current click is correct
        if (playbackArr[playerClickNumber] != clickedOn) {
            cpuTurn = true;
            playerTurn = false;
            isError = true;
            playerClickNumber = 0;
            if (strictMode == false) {
                playbackFunction = true;
                flash();
                setTimeout(cpuLogic, 3000);
            }
            else {
                flash();
                setTimeout(startIsClicked, 3000);
            }
            return false;
        }
        // Increase click if previous click is good
        playerClickNumber++;

        // If a Win
        if (playerClickNumber == 20 && isError == false) {
            counter.innerHTML = "$$";
            flash();
            setTimeout(startIsClicked, 3000);
            return false;
        }

        // If everything is Correct
        if (playerClickNumber == length && isError == false) {
            count++;
            counter.innerHTML = count;
            playerClickNumber = 0;
            playerTurn = false;
            cpuTurn = true;
            playBackArr = [];
            playbackFunction = false;
            setTimeout(cpuLogic, 800);
        }
    }
}

// When player get a step incorrect
function flash() {
    let countIntervals = 0;
    var wrongInterval = setInterval(circleTheBoard, 500);
    function circleTheBoard() {
        let i = 1;
        var flash = setInterval(flashBoard, 125);
        function flashBoard() {
            if (i == 1) {
                audioGreen.play();
                green.style.background = "#5AE2C9";
                setTimeout(`green.style.background =  "#45B09C"`,125);
                counter.style.color = "#3D0810";
            }
            else if (i == 2) {
                audioRed.play();
                red.style.background = "#F73955";
                setTimeout(`red.style.background =  "#D42F2F"` ,125);
            }
            else if (i == 3) {
                audioBlue.play();
                blue.style.background = "#39C3F5";
                setTimeout(`blue.style.background =  "#2A96BD" `,125);
            }
            else if (i == 4) {
                audioYellow.play();
                yellow.style.background = "#FFFD51";
                setTimeout(`yellow.style.background =  "#EFC94C"` ,125);
                counter.style.color = "#F73955";
            }
            else {
                flash = clearInterval(flash)
            };
            i++;
        }

        countIntervals++;
        if (countIntervals >= 4) {
            wrongInterval = clearInterval(wrongInterval);
        }
    }
}
