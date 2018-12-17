let createEnvironmentButton;
let startSimulationButton;
let phase = 0;
let elementCount = 0;
let sampleColors = [];
let environment = [];
let selectedColor;
let first = true;
let index = 0;
let mutationRate = 0.1;
let generations = 0;
let populationSize = 8;
let outputs = [];
let outputFitnesses = [];
let frate = 15;
let numberSurveyed = 0;
function setup()
{
  createCanvas(1200,600);
  ellipseMode(RADIUS);
  textAlign(CENTER,TOP);
  rectMode(CENTER);

  createEnvironmentButton = createButton("Create Environment");
  createEnvironmentButton.position(830,200);
  createEnvironmentButton.mousePressed(createEnvironment);
  startSimulationButton = createButton("Start Simulation");
  startSimulationButton.position(840,300)
  startSimulationButton.mousePressed(startSimulation);

  let scolor = new sampleColor(800,120,40,color(0,200,0));
  scolor.highlight = true;
  sampleColors.push(scolor);
  scolor = new sampleColor(850,120,40,color(255,0,0));
  sampleColors.push(scolor);
  scolor = new sampleColor(900,120,40,color(0,0,255));
  sampleColors.push(scolor);
  scolor = new sampleColor(950,120,40,color(255,255,0));
  sampleColors.push(scolor);
  scolor = new sampleColor(1000,120,40,color(0,255,255));
  sampleColors.push(scolor);
  selectedColor = sampleColors[0].color;
}

function draw()
{
  background(240);
  fill(0);
  noStroke();
  textSize(40);
  textStyle(BOLD);
  text("CAMOUGLAGE SIMULATION",900,0);
  textStyle(NORMAL);
  textSize(18);
  text("EVOLUTION, USING GENETIC ALGORITHMS",900,40);
  stroke(0);
  strokeWeight(5);
  line(600,70,1200,70);
  drawBorders();
  //Show the sample color boxes
  for(let i=0 ; i<sampleColors.length ; i++)
  {
    sampleColors[i].show();
  }
  textSize(20);
  noStroke();
  fill(0);
  text("Select a color and click on the 'create environment' button.",900,160);
  //Create the environment
  if(phase==1 && elementCount<400)
  {
    addNewEnvironmentElement();
    elementCount++;
    text("Please wait while the environment is getting created",900,270);
    //console.log(elementCount);
  }
  if(elementCount==400)
  {
    //phase = 2;
    text("Environment Created. You may start the simulation now.",900,270);
    frameRate(frate);
  }

  //Display the environment
  for(let i=0 ; i<environment.length ; i++)
  {
    environment[i].show();
  }

  if(phase==2)
  {
    fill(0);
    noStroke();
    textSize(50);
    text("Generation : " + generations,900,500);
    textSize(20);
    text("Number of elements surveyed : " + numberSurveyed ,900,550);
    textSize(32);

    if(first)
    {
      createFirstGeneration();
      first = false;;
    }

    outputs[index].show();
    numberSurveyed++;

    if(outputFitnesses[index]>90)
    {
      noStroke();
      textSize(32);
      fill(0);
      text("MATCH FOUND**",900,400);
      textSize(12);
      fill(0);
      text("**Match>=90%",900,440);
      console.log("FOUND");
      noLoop();
      return;
    }
    index++;
    if(index>=populationSize)
    {
      index = 0;
      generations++;
      createNewGeneration(outputs,outputFitnesses);
    }
  }
}

function createFirstGeneration()
{
  for(let i=0 ; i<populationSize ; i++)
  {
    let r = round(random(0,255));
    let g = round(random(0,255));
    let b = round(random(0,255));
    let a = 255;
    let x = round(random(50,550));
    let y = round(random(50,550));
    let fillColor = color(r,g,b,a);
    let c = new Circle(x,y,50,fillColor);
    outputs.push(c);
    let f = checkFitness(c);
    outputFitnesses.push(f);
  }
}

function createNewGeneration(lastGeneration,lastGenerationFitnesses)
{
  console.log("Generation : ",generations);
  outputs = [];
  fitnesses = [];
  outputFitnesses = [];
  let total = 0;
  //Get total
  for(let i=0 ; i<populationSize ; i++)
  {
    total += lastGenerationFitnesses[i];
  }
  //Normalize values and store in fitnesses
  for(let i=0 ; i<populationSize ; i++)
  {
    fitnesses[i] = lastGenerationFitnesses[i]/total;
  }
  //Make new generation with populationSize elements
  for(let i=0 ; i<populationSize ; i++)
  {
    let r0 = random();
    if(r0<mutationRate)
    {
      let k = getBest(fitnesses);
      let parentColor = lastGeneration[k].color
      let cr = parentColor.levels[0];
      let cg = parentColor.levels[1];
      let cb = parentColor.levels[2];
      let a = 255;
      let x = round(random(50,550));
      let y = round(random(50,550));
      let fillColor = color(cr,cg,cb,a);
      let c = new Circle(x,y,50,fillColor);
      outputs.push(c);
      let f = checkFitness(c);
      outputFitnesses.push(f);
    }
    else
    {
      let r = random();
      let k = getIndexFromRandom(r,fitnesses)
      let parentColor = lastGeneration[k].color
      let cr = parentColor.levels[0];
      cr +=round(random(-15,15));
      let cg = parentColor.levels[1];
      cg +=round(random(-15,15));
      let cb = parentColor.levels[2];
      cb +=round(random(-15,15));
      let a = 255;
      let x = round(random(50,550));
      let y = round(random(50,550));
      let fillColor = color(cr,cg,cb,a);
      let c = new Circle(x,y,50,fillColor);
      outputs.push(c);
      let f = checkFitness(c);
      outputFitnesses.push(f);
    }
  }
}

function checkFitness(thisCircle)
{
  let thisColor = thisCircle.color;
  let targetColor = selectedColor;
  let totalDifference = 0;
  for(let i=0 ; i<3 ; i++)
  {
    totalDifference += round(abs(targetColor.levels[i]-thisColor.levels[i]));
  }
  let fitness = round(map(totalDifference,0,700,100,0));
  console.log(fitness);
  return fitness;
}

function getIndexFromRandom(r,fitnesses)
{
  for(let i=0 ; i<fitnesses.length-1 ; i++)
  {
    if(r<fitnesses[i])
    {
      return i;
    }
  }
  return fitnesses.length-1;
}

function mousePressed()
{
  if(phase == 0)
  {
    for(let i=0 ; i<sampleColors.length ; i++)
    {
      let b = sampleColors[i].update(pmouseX,pmouseY);
      if(b==true)
      {
        selectedColor = sampleColors[i].color;
        break;
      }
    }
  }
}

function addNewEnvironmentElement()
{
  let x = round(random(0,600));
  let y = round(random(0,600));
  let r = 30;
  let c = selectedColor;
  let cr = c.levels[0];
  cr = random(cr-20,cr+20);
  let cg = c.levels[1];
  cg = random(cg-20,cg+20);
  let cb = c.levels[2];
  cb = random(cb-20,cb+20);
  let cc = color(cr,cg,cb,random(55,200))
  let element = new environmentElement(x,y,r,cc);
  environment.push(element);
}

function createEnvironment()
{
  if(phase==0)
  {
    phase = 1;
  }
}

function startSimulation()
{
  if(phase == 1 && elementCount == 400)
  {
    phase = 2;
  }
}

function getBest(fitnesses)
{
  let best = 0;
  for(let i=0 ; i<fitnesses.length ; i++)
  {
    if(fitnesses[best]<fitnesses[i])
    {
      best = i;
    }
  }
  return best;
}

function drawBorders()
{
  stroke(0);
  strokeWeight(5);
  line(1,1,599,1);
  line(599,1,599,599);
  line(599,599,1,599);
  line(1,599,1,1);
}
