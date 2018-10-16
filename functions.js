var Patches = require('Patches');
var Diagnostics = require('Diagnostics');
var Scene = require('Scene');
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
  if (out == x)
    out ++;
  return out;
}

var equation = equation();
var x = setX(equation);
var y = setY(x);
var options = [x, y];
var choice = randomNumber(0, 2);

Patches.setStringValue("equation", equation);
Patches.setStringValue("x", x);
Patches.setStringValue("y", y);
Scene.root.find("equation").text = equation;
if (choice == 0)
{
  Scene.root.find("option1").text = "" + options[0] + "";
  Scene.root.find("option2").text = "" + options[1] + "";
}
else
{
  Scene.root.find("option1").text = "" + options[1] + "";
  Scene.root.find("option2").text = "" + options[0] + "";
}
Diagnostics.log(equation);
Diagnostics.log(x);
Diagnostics.log(y);


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
