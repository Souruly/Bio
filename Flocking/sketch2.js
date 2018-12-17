var Birds = [];
var Obstacles = [];
var numberOfBirds = 40;
var numberOfObstacles = 10;
var WIDTH = 800;
var HEIGHT = 600;
var r = 3;
var attractSlider;
var alignSlider;
var seperateSlider;
var seperateRadiusSlider;
var repelSlider;
var repelRadiusSlider;
var neighborSlider;

function setup()
{
  createCanvas(1200,HEIGHT);
  for(var i=0 ; i<numberOfBirds ; i++)
  {
      var x = random(0,WIDTH);
      var y = random(0,HEIGHT);
      var b = new Bird(x,y);
      Birds.push(b);
  }
  angleMode(DEGREES);
  setPoints();
  angleMode(RADIANS);
  neighborSlider = createSlider(0,WIDTH,30.0,10);
  neighborSlider.position(930,55);
  attractSlider = createSlider(0,20,1.0,0.5);
  attractSlider.position(930,120);
  seperateSlider = createSlider(0,20,1.5,0.5);
  seperateSlider.position(850,185);
  seperateRadiusSlider = createSlider(0,100,8,1);
  seperateRadiusSlider.position(1000,185);
  alignSlider = createSlider(0,20,1.0,0.5);
  alignSlider.position(930,250);
  repelSlider = createSlider(0,20,20.0,0.5);
  repelSlider.position(850,320);
  repelRadiusSlider = createSlider(0,100,100,1);
  repelRadiusSlider.position(1000,320);
}

function draw()
{
   background(51);
   stroke(255);
   strokeWeight(2);
   line(0,0,WIDTH,0);
   line(0,0,0,HEIGHT);
   line(0,HEIGHT,WIDTH,HEIGHT);
   line(WIDTH,HEIGHT,WIDTH,0);
   noStroke();
   fill(240);
   textSize(16);
   text("Visible Neighbor Radius",900,50);
   text("Long Range Attraction",900,115);
   text("Short Range Repulsion",820,180);
   text("Repulsion Radius",1000,180);
   text("Alignment",950,245);
   text("Obstacle Detection",850,310);
   text("Detection Radius",1000,310);
   var s = "Click anywhere to add new";
   textSize(20);
   text(s, 830, 450);
   textSize(22);
   fill(255,0,0);
   text("obstacles", 1075, 450);

   for(var i=0;i<Birds.length;i++)
   {
       Birds[i].show();
       Birds[i].update(Birds,Obstacles);
   }
   for(var i=0;i<Obstacles.length;i++)
   {
       Obstacles[i].show();
   }
}

function mousePressed()
{
  var x = pmouseX;
  var y = pmouseY;
  if(x>0 && x<800 && y>0 && y<600)
  {
    var o = new Obstacle(pmouseX,pmouseY);
    Obstacles.push(o);
  }
}

function setPoints()
{
  var centre = createVector(400,300);
  var radius = 200;
  var c = new Obstacle(centre.x,centre.y);
  Obstacles.push(c);
  for(var i=0;i<360;i+=5)
  {
    var theta = i;
    var x = radius*cos(theta);
    var y = radius*sin(theta);
    var p = new Obstacle(centre.x+x,centre.y+y);
    Obstacles.push(p);
  }
}
