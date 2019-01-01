let states = [true,false];
let signals = [];
let graphPoints = [];
let link;

function setup()
{
   createCanvas(1200,600);
   angleMode(DEGREES);
   textAlign(CENTER,CENTER);

   for(let i=0 ; i<31 ; i++)
   {
     let gp = new GraphPoint(150+i*10,500,10);
     graphPoints.push(gp);
   }

   link = createA('https://youtu.be/obAHnwp9tOM?t=246', 'Explaination');
   link.position(1090,550);

   generateNewSignals();
}

function generateNewSignals()
{
  signals = [];
  sig1 = new Signal(200,100,2,random(states));
  signals.push(sig1);
  sig2 = new Signal(300,100,1,random(states));
  signals.push(sig2);
  sig3 = new Signal(400,100,2,random(states));
  signals.push(sig3);
}

function draw()
{
   background(240);
   drawStructure();

   for(let i=0 ; i<signals.length ; i++)
   {
     signals[i].show();
     signals[i].update();
   }

   if(signals[0].position.y>=400)
   {
     graphState = getGraphState();
     shiftGraphPoints();
     graphPoints[graphPoints.length-1].spike = graphState;
     generateNewSignals();
   }

   for(let i=0 ; i<graphPoints.length ; i++)
   {
     graphPoints[i].show();
   }
}

function getGraphState()
{
  let s1 = signals[0].state;
  let s2 = signals[1].state;
  let s3 = signals[2].state;

  let A = !s1 || s2 || !s3;
  let B = s1 || !s2 || s3;
  let Output = A && B;
  return Output;
}

function shiftGraphPoints()
{
  for(let i=1 ; i<graphPoints.length ; i++)
  {
    graphPoints[i-1].spike = graphPoints[i].spike;
  }
}

function drawStructure()
{
  fill(240);
  rect(0,0,600,600);
  stroke(0);
  strokeWeight(2);
  line(1,1,1199,1);
  line(599,1,599,599);
  line(1199,599,1,599);
  line(1,599,1,1);
  line(1199,1,1199,599);
  line(600,100,1200,100);

  // Three vertical lines for pathways
  line(200,100,200,400);
  line(300,100,300,400);
  line(400,100,400,400);
  line(150,400,450,400);


  // Line for spike Graph
  line(150,510,450,510);

  noStroke();
  fill(51);
  textSize(28);
  text("SPATIAL PREDICTION IN THE RETINA",900,50);
  textSize(14);
  text("CIRCUIT DIAGRAM",900,80);
  text("GANGLION CELL",300,420);
  text("SPIKE GRAPH",250,520);
  text("Bipolar Cell",140,200);
  text("+  -\n\n\n+  -",300,200);
  text("+  -\n\n\n+  -",400,200);
  text("+  -\n\n\n+  -",200,200);
  text("Amacrine Cell",140,300);
  text("+  -\n\n\n-  +",200,300);
  text("+  -\n\n\n-  +",400,300);
  text("t = now",450,519);

  fill(0,204,0);
  stroke(0);
  //Bipolar 1
  triangle(180, 180, 200, 220, 220, 180);
  // Bipolar 2
  triangle(280, 180, 300, 220, 320, 180);
  // Bipolar 3
  triangle(380, 180, 400, 220, 420, 180);

  fill(255,128,0);
  //Amacrine 1
  triangle(180, 280, 200, 320, 220, 280);
  //Amacrine 3
  triangle(380, 280, 400, 320, 420, 280);

  noFill();
}
