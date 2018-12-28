let blobs = [];
let lastCount=0;
let counter=0;
let img;
let backG = 192;
// let randLoop;

function preload()
{
  img = loadImage('img.png');
}

function setup()
{
   createCanvas(1200,600);
   angleMode(DEGREES);
   textAlign(CENTER,CENTER);
   let c = createVector(300,300);
   for(let i=0 ; i<8 ; i++)
   {
     let r = createVector(175,0);
     r.rotate(i*45);
     let p = p5.Vector.add(r,c);
     let b = new Blob(p,48);
     blobs.push(b);
   }
   img.resize(400,0);

   // randLoop = round(random(5,15));
   // console.log(randLoop);
}

function draw()
{
   background(240);
   image(img,700,300)
   drawStructure();
   if(frameCount%5==0)
   {
     blobs[lastCount].alive = true;
     blobs[counter].alive = false;
     lastCount = counter;
     counter++;
     counter = counter%8;
   }
   for(let i=0 ; i<blobs.length ; i++)
   {
     blobs[i].show();
   }
}

function drawStructure()
{
  fill(backG);
  rect(0,0,600,600);
  stroke(0);
  strokeWeight(2);
  line(1,1,1199,1);
  line(599,1,599,599);
  line(1199,599,1,599);
  line(1,599,1,1);
  line(1199,1,1199,599);
  line(600,100,1200,100);

  noStroke();
  fill(0);
  textSize(60)
  text("+",300,300);
  fill(51);
  textSize(40);
  text("Temporal Prediction in the Retina",900,50);
  textSize(20);
  text("Concentrate on the '+' sign and the pink cicles will start to disappear.\n Eventually, you'll just see a green circle orbitting the '+' symbol.",700,100,400,100);
  noFill();
}
