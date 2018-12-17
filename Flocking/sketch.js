var Birds = [];
var numberOfBirds = 40;
var WIDTH = 800;
var HEIGHT = 600;
function setup()
{
  createCanvas(WIDTH,HEIGHT);
  for(var i=0 ; i<numberOfBirds ; i++)
  {
      var x = random(0,WIDTH);
      var y = random(0,HEIGHT);
      var b = new Bird(x,y);
      Birds.push(b);
  }
  //console.log(Birds[1]);
}

function draw()
{
   background(255);
   for(var i=0;i<Birds.length;i++)
   {
       Birds[i].show();
       Birds[i].update(Birds);
   }
}
