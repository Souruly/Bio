let createEnvironmentButton;
let startSimulationButton;
let outputSlider;
let img;
let phase = 0;
let elementCount = 0;
let maxElementCount = 400;
let environment = [];
let first = true;
let index = 0;
let mutationRate = 0.1;
let generations = 0;
let numberSurveyed = 0;
let populationSize = 20;
let outputs = [];
let outputFitnesses = [];
let frate = 60;
let bestGiraffes = [];
let bestGiraffeFitnesses = [];
let link;
function preload()
{
  img = loadImage("bg.png");
}

function setup()
{
  createCanvas(1200,600);
  ellipseMode(RADIUS);
  textAlign(CENTER,TOP);
  rectMode(CORNERS);
  createEnvironmentButton = createButton("Create Environment");
  createEnvironmentButton.position(830,170);
  createEnvironmentButton.mousePressed(createEnvironment);
  startSimulationButton = createButton("Start Simulation");
  startSimulationButton.position(830,170);
  startSimulationButton.mousePressed(startSimulation);
  startSimulationButton.hide();
  link = createA('https://github.com/Souruly/souruly.github.io/blob/master/README.md','GITHUB REPO','_blank');
  link.hide();
  link.position(1070,118);
}

function draw()
{
  background(240);
  image(img,0,0,600,600);
  fill(0);
  noStroke();

  textSize(40);
  textStyle(BOLD);
  text("GIRAFFE",900,0);
  textStyle(NORMAL);
  textSize(18);
  text("EVOLUTION, USING GENETIC ALGORITHMS",900,40);
  stroke(0);
  strokeWeight(5);
  line(600,70,1200,70);
  drawBorders();
  noStroke();
  if(phase<2 && elementCount<1)
  {
    textSize(20);
    fill(0);
    text("Click on the 'create environment' button.",900,140);
  }
  if(phase==1 && elementCount<maxElementCount)
  {
    addNewEnvironmentElement();
    elementCount++;
    text("Please wait while the environment is getting created",900,140);
    //console.log(elementCount);
  }
  if(phase==1 && elementCount==maxElementCount)
  {
    //phase = 2;
    text("Environment Created. You may start the simulation now.",900,140);
    startSimulationButton.show();
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
      first = false;
    }

    outputs[index].show();
    numberSurveyed++;

    if(outputFitnesses[index]>=728500)
    {
      noStroke();
      textSize(32);
      fill(0);
      text("Meh...**",900,400);
      textSize(12);
      fill(0);
      text("**Blah blah...",900,440);
      link.show();
      outputSlider = createSlider(0,generations,generations,1);
      outputSlider.position(832,200);
      createEnvironmentButton.hide();
      startSimulationButton.hide();
      let k = getBest(outputFitnesses);
      bestGiraffes.push(outputs[k]);
      bestGiraffeFitnesses.push(outputFitnesses[k]);
      console.log("FOUND");
      phase = 3;
      //noLoop();
      //return;
    }
    else
    {
      index++;
      if(index>=populationSize)
      {
        index = 0;
        let k = getBest(outputFitnesses);
        bestGiraffes.push(outputs[k]);
        bestGiraffeFitnesses.push(outputFitnesses[k]);
        generations++;
        createNewGeneration(outputs,outputFitnesses);
      }
    }
  }

  if(phase==3)
  {
    let i = outputSlider.value();
    let g = bestGiraffes[i];
    //let displayCircle = new Circle(900,350,circle.r,circle.color);
    g.show();
    //displayCircle.show();
    noStroke();
    fill(0);
    textSize(32);
    text("Progress results",900,160);
    textSize(20);
    text("Generation : " + i,900,230);
    text("Fitness : " + (g.neckLength-60),900,260);
    textSize(50);
    text("Generation : " + generations,900,500);
    textSize(20);
    text("Number of elements surveyed : " + numberSurveyed ,900,550);
    text("Optimum solution found",900,90);
    textSize(12);
    fill(0);
    text("Check link for details",900,120);
  }
}

function createFirstGeneration()
{
  for(let i=0 ; i<populationSize ; i++)
  {
    let neckLength = round(random(60,100));
    let g = new Giraffe(neckLength);
    outputs.push(g);
    let f = checkFitness(g);
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
    {//Get best
      let k = getBest(fitnesses);
      let parentNeckLength = lastGeneration[k].neckLength
      let childNeckLength = parentNeckLength;
      if(childNeckLength<=60)
      {
        childNeckLength = 60;
      }
      let g = new Giraffe(childNeckLength);
      outputs.push(g);
      let f = checkFitness(g);
      outputFitnesses.push(f);
    }
    else
    {
      let r = random();
      let k = getIndexFromRandom(r,fitnesses)
      let parentNeckLength = lastGeneration[k].neckLength
      let childNeckLength = parentNeckLength +round(random(-10,10));
      if(childNeckLength<=60)
      {
        childNeckLength = 60;
      }
      let g = new Giraffe(childNeckLength);
      outputs.push(g);
      let f = checkFitness(g);
      outputFitnesses.push(f);
    }
  }
}

function checkFitness(thisGiraffe)
{
  let l = thisGiraffe.neckLength-60;
  let fitness = (5400*l)-(10*l*l);
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

function addNewEnvironmentElement()
{
  if(random()<0.07)
  {
    let y = round(random(300,500));
    let yy = y-300;
    let x = round(random(550 + 0.25*yy,600));
    let r = 10;
    let c = color(0,255,0);
    let cr = c.levels[0];
    let cg = c.levels[1];
    cg = random(cg-128,cg);
    let cb = c.levels[2];
    let cc = color(cr,cg,cb,random(55,200))
    let element = new environmentElement(x,y,r,cc);
    environment.push(element);
  }
  else
  {
    let y = round(random(0,300));
    let x = round(random(150 + 1.5*y-random(50),600));
    let r = 10;
    let c = color(0,255,0);
    let cr = c.levels[0];
    let cg = c.levels[1];
    cg = random(cg-128,cg);
    let cb = c.levels[2];
    let cc = color(cr,cg,cb,random(55,200))
    let element = new environmentElement(x,y,r,cc);
    environment.push(element);
  }
}

function createEnvironment()
{
  if(phase==0)
  {
    createEnvironmentButton.hide();
    phase = 1;
  }
}

function startSimulation()
{
  if(phase == 1 && elementCount == 400)
  {
    createEnvironmentButton.hide();
    startSimulationButton.hide();
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
