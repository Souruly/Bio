var tree = [];
var maxSize = 63;
var currentSize = 0;
var birds = [];
var mouse;
var canvas;

function setup()
{
   canvas = createCanvas(windowWidth, windowHeight);
   canvas.position(0,0);
   canvas.style('z-index', '-1')
   var a = createVector(width/2,height);
   var b = createVector(width/2,height-150);
   var root = new Branch(a,b);
   tree.push(root);
   currentSize = 1;
   while(currentSize<=maxSize)
   {
      addBranches(currentSize);
   }

   for(var i = tree.length-1 ; i>tree.length-maxSize-2 ; i--)
   {
      var bird = new Bird(tree[i].endpt.x-random(-5,5),tree[i].endpt.y-random(-5,5));
      birds.push(bird);
   }
}

function addBranches(n)
{
   for(var i=0 ; i<n ; i++)
   {
      if(!tree[i].done)
      {
         tree.push(tree[i].splitLeft());
         tree.push(tree[i].splitRight());
         currentSize+=2;
      }
      tree[i].done = true;

   }
}


function draw()
{
   background(25,51,0);
   for(var i=0;i<tree.length;i++)
   {
      tree[i].show();
   }
   ellipseMode(CENTER);
   noStroke();
   fill(204,0,0);
   for(var i = tree.length-1 ; i>tree.length-maxSize-2 ; i--)
   {
      ellipse(tree[i].endpt.x,tree[i].endpt.y,8,8);
   }
   noFill();
   mouse = createVector(mouseX,mouseY);
   for(var i=0;i<birds.length ; i++)
   {
      birds[i].behaviors();
      birds[i].update();
      birds[i].show();
   }

}
