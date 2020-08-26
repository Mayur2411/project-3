
var canvas, ctx;
var arrflights = new Array();
var nbSteps = 100;
var interval = 75;
var currentTime = 0;
//Initially the function Plane has parameters with empty strings but we have already parsed the string values in to an integer beforte passing it as an arguement to a constructor.
function Plane(posX, posY, destinationX, destinationY ,departureTime){
this.src = "img/plane.jpg";
this.imgWidth = 40;
this.imgHeight = 40;
this.posX = posX;
this.posY = posY;
this.destX = destinationX;
this.destY = destinationY;
this.currentStep = 0;
    this.departureTime = parseInt(departureTime);
this.draw = function(){
var plane = document.createElement("img");
plane.setAttribute("src", this.src);
ctx.drawImage(plane, this.posX, this.posY, this.imgWidth, this.imgHeight);
}
this.updateLocation = function(){
var distX = this.destX - this.posX;
var stepsLeft = nbSteps - this.currentStep;
var distY = this.destY - this.posY;

this.posX += distX / stepsLeft;
this.posY += distY / stepsLeft;
this.currentStep++;
}
}

function generateRand(max = 250){
return Math.random() * max;
}

function drawMap(){
var map = document.createElement("img");
//The "Canada-1280-1107.png" file is located in the "img folder"in the current folder
map.setAttribute("src", "img/Canada-1280-1107.png");
map.setAttribute("width", canvas.width);
map.setAttribute("height", canvas.height);
ctx.drawImage(map, 0, 0, canvas.width, canvas.height);
}

function drawMovement(){
console.log();
drawMap();
for(i = 0; i < arrflights.length; i++){
//Initially the given code has '<' which is a Relational Operators. So,here the IF STATEMENT will become true when currentTime is more than one milli second than that of detarture time
        //but as per our requirement, the flight should start when detarture time meets current time. So, we have changed it to '<='
        if(arrflights[i].departureTime <= currentTime){
            arrflights[i].updateLocation();
   arrflights[i].draw();
        }
if(arrflights[i].currentStep > nbSteps){
arrflights.splice(i, 1);
}

    }
}


$(document).ready(function(){
canvas = document.getElementById('myCanvas');
ctx = canvas.getContext('2d');
drawMap();
    // In JSON object, the value of a integer key should not be enclosed in double-quotes(""). Since, it will turn the value in to a string.
var flightJson = '{"flights":[{"departure":"Quebec","departureX":734,"departureY":427,"departureTime":11,"arrival":"Fredericton","arrivalX":800,"arrivalY":422,"duration":6},{"departure":"Quebec","departureX":734,"departureY":427,"departureTime":109,"arrival":"Yellowknife","arrivalX":285,"arrivalY":271,"duration":6},{"departure":"Quebec","departureX":734,"departureY":427,"departureTime":62,"arrival":"Regina","arrivalX":336,"arrivalY":417,"duration":6}]}';
    var JSONObject = JSON.parse(flightJson);
    //Initially JSONObject is accessing 'flight' but in reality we dont have flight as the key. We have changed it to the exixting key, which is'flights'.
var flights = JSONObject.flights;
    console.log(flights);
$("#myCanvas").click(function(){
var myPlane;
    for (flight in flights)
    {
        //we have to use 'flight' as the index value because in our JSON object we have value as an array and 'flight' variable is used in for loop.
        myPlane = new Plane(flights[flight].departureX, flights[flight].departureY, flights[flight].arrivalX, flights[flight].arrivalY,flights[flight].departureTime);
        arrflights.push(myPlane);
    }
     setInterval(drawMovement, interval);
});
});