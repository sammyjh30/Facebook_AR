var Scene = require('Scene');
var Time = require('Time');
var Diagnostics = require('Diagnostics');
var Patches = require('Patches');
var arr = [];

function randomNumber(min, max)
{
	return Math.floor((Math.random() * (max - min) + min));
}

function randomDecimal(min, max)
{
	return (Math.random() * (max - min) + min);
}

function equation()
{
var oper = ['+', '-', 'x', '÷'];
arr[0] = randomNumber(0, 21);
arr[1] = oper[randomNumber(0, 4)];
arr[2] = randomNumber(1, 21);
return (arr.join(" "));
}

function setX(equation)
{
var l = Number(arr[0]);
var oper = arr[1];
var r = Number(arr[2]);
var out;
switch (oper) {
	case ('+'):
		out = (l + r).toFixed(0);
		break;
	case ('x'):
		out = (l * r).toFixed(0);
		break;
	case ('÷'):
		out = (l / r).toFixed(2);
		break;
	case ('-'):
		out = (l - r).toFixed(0);
		break;
	}
return out;
}

function setY(x)
{
var out;
if (arr[1] == '÷')
	out = randomDecimal(parseInt(x) - 5, parseInt(x) + 5).toFixed(2);
else
	out = randomNumber(parseInt(x) - 5, parseInt(x) + 5).toFixed(0);
//if (out == x)
	//out++;
return out;
}

var equation = equation();
var x = setX(equation);
var y = setY(x);
var options = [x, y];
var choice = randomNumber(0, 2);
var right;
var wrong;

// Patches.setStringValue("equation", equation);
// Patches.setStringValue("x", x);
// Patches.setStringValue("y", y);
right = options[0];
wrong = options[1];
Scene.root.find("equation").text = equation;
if (choice == 0){
	
	Scene.root.find("num1").text = right.toString();
	Scene.root.find("num2").text = wrong.toString();
	Patches.setScalarValue("num1", parseInt(right, 10));
	Patches.setScalarValue("num2", parseInt(wrong, 10));
}
else{
	Scene.root.find("num1").text = wrong.toString();
	Scene.root.find("num2").text = right.toString();
	Patches.setScalarValue("num1", parseInt(wrong, 10));
	Patches.setScalarValue("num2", parseInt(right, 10));
}

Patches.setScalarValue("right", parseInt(right, 10));
Patches.setScalarValue("wrong", parseInt(wrong, 10));
Diagnostics.log(equation);
Diagnostics.log(x);
Diagnostics.log(y);

var timeLeft = 10;
var timeStr;
var timerID;
var timeStop;
var score = 0;

var Mouth = false;
if (score == 0)
	Scene.root.find("score").text = score.toString();
	Mouth = Patches.getBooleanValue('check').monitor().subscribe(function(e) {
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

// Available modules include (this is not a complete list):
// var Scene = require('Scene');
// var Textures = require('Textures');
// var Materials = require('Materials');
// var FaceTracking = require('FaceTracking');
// var Animation = require('Animation');
// var Reactive = require('Reactive');
//
// Example script
//
// Loading required modules
// var Scene = require('Scene');
// var FaceTracking = require('FaceTracking');
//
// Binding an object's property to a value provided by the face tracker
// Scene.root.child('object0').transform.rotationY = FaceTracking.face(0).transform.rotationX;
//
// If you want to log objects, use the Diagnostics module.
// var Diagnostics = require('Diagnostics');
// Diagnostics.log(Scene.root);

