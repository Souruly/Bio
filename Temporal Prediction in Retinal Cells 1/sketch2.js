let sigStates = [true, true, true, false, true, true, true, true];
let counter = 0;
let lastCount=0;
let sigCounter=0;
let sig1;
let sig2 = [];
let graphPoints = [];
let blobs = [];
let readMeLink;

function setup()
{
   createCanvas(1200,600);
   angleMode(DEGREES);
   textAlign(CENTER,CENTER);
   let state = sigStates[counter];

   let c = createVector(200,50);
   for(let i=0 ; i<8 ; i++)
   {
     let r = createVector(0,40);
     r.rotate(i*-45);
     let p = p5.Vector.add(r,c);
     let aliveState = sigStates[i];
     let b = new Blob(p,12,aliveState);
     blobs.push(b);
   }

   sig1 = new Signal(200,100,1,state)
   sig1.initialize();
   sig21 = new Signal(200,100,2,state)
   sig21.initialize();
   sig2.push(sig21)
   sig22 = new Signal(200,100,2,state)
   sig22.initialize();
   sig2.push(sig22)

   for(let i=0 ; i<31 ; i++)
   {
     let gp = new GraphPoint(100+i*10,500,10);
     graphPoints.push(gp);
   }

   readMeLink = createA('https://youtu.be/obAHnwp9tOM?t=652', 'How it works');
   readMeLink.position(900,250);
}

function draw()
{
   background(240);
   drawStructure();
   sig1.show();
   sig2[0].show();
   sig2[1].show();
   sig1.update();
   sig2[0].update();
   sig2[1].update();
   let reached = false;
   let graphState = true;

   for(let i=0 ; i<blobs.length ; i++)
   {
     blobs[i].show();
   }

   if(sig1.currentLoc>2)
   {
     reached = true;
     let a = sigStates[counter];
     let b = sigStates[lastCount];
     graphState = ((a&&!b)||(!a&&b));
     lastCount = counter;
     counter++;
     counter = counter%8;
     shiftRotateBlobs();

     let state = sigStates[counter];
     sig1 = new Signal(200,100,1,state)
     sig1.initialize();
     sig2[sigCounter] = new Signal(200,100,2,state);
     sig2[sigCounter].initialize();
     sigCounter++;
     sigCounter = sigCounter%2;
   }

   if(reached==true)
   {
     shiftGraphPoints();
     // console.log(graphState);
     graphPoints[graphPoints.length-1].spike=graphState;
   }

   for(let i=0 ; i<graphPoints.length ; i++)
   {
     graphPoints[i].show();
   }
}

function shiftGraphPoints()
{
  for(let i=1 ; i<graphPoints.length ; i++)
  {
    graphPoints[i-1].spike = graphPoints[i].spike;
  }
}

function shiftRotateBlobs()
{
  let firstBlobState = blobs[0].alive;
  for(let i=1 ; i<blobs.length ; i++)
  {
    blobs[i-1].alive = blobs[i].alive;
  }
  blobs[blobs.length-1].alive = firstBlobState;
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

  line(200,100,200,400);
  line(200,200,300,200);
  line(300,200,300,400);
  line(100,400,400,400);
  line(100,510,400,510);

  noStroke();
  fill(51);
  textSize(28);
  text("TEMPORAL PREDICTION IN THE RETINA",900,50);
  textSize(14);
  text("HOW IT WORKS",900,80);
  text("GANGLION CELLS",250,420);
  text("SPIKE GRAPH",250,520);
  text("Bipolar Cell",140,300);
  text("+  -\n\n\n+  -",200,300);
  text("Amacrine Cell",360,300);
  text("+  -\n\n\n-  +",300,300);
  text("t = now",400,519);
  text((sigStates[counter].toString()).toUpperCase(),175,110);

  fill(0,204,0);
  stroke(0);
  triangle(180, 280, 200, 320, 220, 280);
  fill(255,128,0);
  triangle(280, 280, 300, 320, 320, 280);

  noFill();
}
