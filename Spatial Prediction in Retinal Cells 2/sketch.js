let leg1, leg2;
let stripes = 20;
let legW = 60,legH = 20;
let legVel = 1.3;
let backG = 240;
let box1ColSlider,box2ColSlider;
let hcCheck,helperCheck;
let helper = false, highContrast = true;
let link1,link2;

function setup()
{
   createCanvas(1200,600);
   angleMode(DEGREES);
   textAlign(CENTER,CENTER);
   let c1 = color(255,255,51);
   let p1 = createVector(0,250);
   leg1 = new Leg(p1,legW,legH,c1);
   let c2 = color(0,0,102);
   let p2 = createVector(0,350);
   leg2 = new Leg(p2,legW,legH,c2);

   box1ColSlider = createSlider(0,255,51,1);
   box1ColSlider.position(700,210);
   box1ColSlider.style('width', '100px');
   box2ColSlider = createSlider(0,255,51,1);
   box2ColSlider.position(1000,210);
   box2ColSlider.style('width', '100px');

   hcCheck = createCheckbox('High Contrast', true);
   hcCheck.changed(toggleHighContrast);
   hcCheck.position(850,500);
   helperCheck = createCheckbox('Guide', false);
   helperCheck.changed(toggleGuide);
   helperCheck.position(850,540);

   link1 = createA('https://michaelbach.de/ot/mot-feetLin/index.html', 'Inspired From');
   link1.position(1090,420);
   link2 = createA('https://souruly.github.io/Bio/Spatial%20Prediction%20in%20Retinal%20Cells%201/index.html', 'Circuit Diagram');
   link2.position(1090,440);
}

function toggleHighContrast()
{
  if (this.checked()) {
    highContrast = true;
    backG = 240;
  } else {
    highContrast = false;
    backG = 102;
  }
}

function toggleGuide()
{
  if (this.checked()) {
    helper = true;
  } else {
    helper = false;
  }
}

function draw()
{
   background(192);
   drawStructure();
   let c1 = color(255,255,box1ColSlider.value());
   let c2 = color(0,0,box2ColSlider.value());
   stroke(0);
   fill(c1);
   rect(790,150,50,50);
   fill(c2);
   rect(1090,150,50,50);
   leg1.show(c1);
   leg2.show(c2);

   if(helper)
   {
     stroke(255,0,0);
     strokeWeight(2);
     line(leg1.position.x+legW/2,leg1.position.y+legH/2,leg2.position.x+legW/2,leg2.position.y+legH/2);
     noStroke();
   }

   leg1.update();
   leg2.update();
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
  // line(900,0,900,600);
  line(1,599,1,1);
  line(1199,1,1199,599);
  line(600,100,1200,100);
  line(600,275,1200,275);
  line(600,470,1200,470);

  noStroke();
  let n = stripes*2;
  let sW = 600/n;
  for(let i=0 ; i<n ; i++)
  {
    let c;
    if(highContrast)
    {
      c = 0;
    }
    else
    {
      c = 51;
    }
    if(i%2==0)
    {
      fill(backG-c);
    }
    else
    {
      fill(0+c);
      rect(i*sW,0,sW,600);
    }
  }

  fill(backG);
  rect(0,0,598,200);
  fill(backG);
  rect(0,400,598,200);

  noStroke();
  fill(0);
  textSize(40);
  text("Spatial Prediction in the Retina",900,50);

  textSize(20);
  text("Box 1 Color : ",720,175);
  text("Box 2 Color : ",1020,175);
  text("Concentrate on the movement of either one of the boxes, "+
  "the other box will look like it's moving in steps",700,300,400,100);

  noFill();
}
