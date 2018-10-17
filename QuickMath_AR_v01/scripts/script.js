var Scene = require('Scene');
var Time = require('Time');
var Diagnostics = require('Diagnostics');
var Patches = require('Patches');
var arr = [];

var equation;
var x;
var y;
var options;
var choice;
var right;
var wrong;

var timeLeft = 10;
var timeStr;
var timerID;
var timeStop;
var score = 0;
var addScore = false;

function randomNumber(min, max)
{
	return Math.floor((Math.random() * (max - min) + min));
}

function randomDecimal(min, max)
{
	return (Math.random() * (max - min) + min);
}

function ft_equation()
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
if (out == x)
	out++;
return out;
}

function countdown() {
	if (timeStop == true) {
		// Diagnostics.log("Got remaining time");
		// Diagnostics.log(timeLeft);
		if (addScore == true) {
			Patches.getBooleanValue("check").monitor().subscribe(function(b) {
				if (b.newValue === true) {
					score += timeLeft * 10;
					Scene.root.find("score").text = score.toString();
				}
			});
			
		}
		Scene.root.find("timer").text = "";
		Time.clearTimeout(timerID);
		timeLeft = 10;
		addScore = false;
	}
	else if (timeLeft == 0) {
		Time.clearTimeout(timerID);
		Scene.root.find("timer").text = "TIME'S UP!";
	}
	else {
		addScore = true;
		Diagnostics.log(timeLeft);
		timeStr = timeLeft.toString()
		Scene.root.find("timer").text = timeStr;
		timeLeft--;
	}
}

Diagnostics.log(timeLeft);

Patches.getBooleanValue("startTime").monitor().subscribe(function(e) {
	Diagnostics.log(e.newValue);
	round();
	});

function round() {
	// Patches.setPulseValue("runPulse", Reactive.once());
	// Patches.find("runPulse").trunOn = true;
	// Patches.find("runSwitch").trunOff = false;
	equation = ft_equation();
	Diagnostics.log(equation);
	x = setX(equation);
	y = setY(x);
	options = [x, y];
	choice = randomNumber(0, 2);
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
	
	if (score == 0)
	{
		Scene.root.find("score").text = score.toString();
		Patches.getBooleanValue("stopTime").monitor().subscribe(function(a) {
			if (a.newValue === true)
				timeStop = true;
			else
				timeStop = false;
			});
		timerID = Time.setInterval(countdown, 1000);
	}
	// Patches.find("runSwitch").trunOn = false;
	// Patches.find("runSwitch").trunOff = true;

}
