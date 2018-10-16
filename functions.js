
function randomNumber(min, max)
{
    return Math.floor((Math.random() * (max - min) + min));
}

function equation()
{
  var oper = ['+', '-', '*', '/'];
  var arr = [];
  arr[0] = randomNumber(0, 20);
  arr[1] = oper[randomNumber(0, 3)];
  arr[2] = randomNumber(1, 20);
  return (arr.join(" "));
}

function setX(equation)
{
  var out = eval(equation);
  return out;
}

function setY(x)
{
  var out = randomNumber(x - 5, x + 5)
  return out;
}

var equation = equation();
var x = setX(equation);
var y = setY(x);
console.log(equation);
console.log(x);
console.log(y);
