var Scene = require('Scene');
var Time = require('Time');
var Diagnostics = require('Diagnostics');
var Patches = require('Patches');

var timeLeft = 10;
var timeStr;
var timerID;
var timeStop;
var score = 0;

var Mouth = false;
if (score == 0)
    Scene.root.find("score").text = score.toString();
Mouth = Patches.getBooleanValue('editorToScriptVar').monitor().subscribe(function(e) {
        Diagnostics.log(e.newValue);
        timeStop = e.newValue;
        if (e.newValue) {
            timerID = Time.setInterval(countdown, 1000);
        }
});
function countdown() {
    if (timeStop === false) {
        Scene.root.find("timer").text = "";
        Diagnostics.log("Got remaining time");
        Diagnostics.log(timeLeft);
        score += timeLeft * 10;
        Scene.root.find("score").text = score.toString();
        Time.clearTimeout(timerID);
        timeLeft = 10;
    }
    else if (timeLeft == 0) {
        Time.clearTimeout(timerID);
        Scene.root.find("timer").text = "TIME'S UP!";
    }
    else {
        Diagnostics.log(timeLeft);
        timeStr = timeLeft.toString()
        Scene.root.find("timer").text = timeStr;
        timeLeft--;
    }
}