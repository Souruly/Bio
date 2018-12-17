var cells = [];
var WIDTH,HEIGHT;
WIDTH  = HEIGHT = 500;
var numberOfCells = 100;
var slider;
var angle = 0;
var activeNumber = 0;
function setup()
{
   createCanvas(WIDTH,HEIGHT);
   for(var i=0; i<numberOfCells ;i++)
   {
      var cell = new Cell();
      cell.start();
      cells.push(cell);
   }
   slider = createSlider(0, PI, PI / 4, 0.01);
}

function draw()
{
   angle = slider.value();
   var a = sin(angle);
   n = numberOfCells;
   //activeNumber = round(sin(angle)*numberOfCells);
   activeNumber = round(map(a,0,1,n/30,n));
   var colour = round(a*255);
   background(colour);
   fill(255-colour);
   for(var i=0 ; i<activeNumber ; i++)
   {
      cells[i].excite();
      cells[i].show();
   }
   for(var i=activeNumber ; i<numberOfCells ; i++)
   {
      cells[i].drop();
      cells[i].show();
   }
}
