let populationSize = 10;
let population = [];
let index = 0;
let numberSurveyed = 1;
let numberOfGenerations = 0;
let mutationRate = 0.2;
let thisGenerationsBest;
let acceptabilityThreshold = 97;
let bests = [];
let bestShapesSlider;
let phase = 0;
let stopSimulationButton;

function setup()
{
  createCanvas(1200, 600);
  background(240);
  textAlign(CENTER,TOP);
  rectMode(CORNERS);
  angleMode(DEGREES);

  bestShapesSlider = createSlider(0,200,0,1);
  bestShapesSlider.position(835,500);
  bestShapesSlider.hide();

  stopSimulationButton = createButton("STOP");
  stopSimulationButton.position(880,300);
  stopSimulationButton.mousePressed(stopSimulation);

  for(let i=0 ; i<populationSize ; i++)
  {
    let shape = new Shape();
    shape.generateRandom();
    let f = shape.getFitness();
    //console.log(f);
    population.push(shape);
  }

  let best = getBest();
  bests.push(population[best]);
  thisGenerationsBest = round(population[best].fitness);
}

function draw()
{
  background(240);
  drawStructure();
  textSize(24);
  text("Number of elements surveyed : " + numberSurveyed,900,150);
  text("Number of Generations : " + numberOfGenerations,900,200);
  text("Best so far : " + thisGenerationsBest,900,250);

  if(phase == 0)
  {
    population[index].show(300,300);
    index++;
    numberSurveyed++;
    index = index%10;
    if(index==0 && numberSurveyed>9)
    {
      generateNextGeneration();
      numberOfGenerations++;
    }

    if(population[index].fitness>acceptabilityThreshold)
    {
      phase = 1;
      console.log(bests);
      bestShapesSlider.show();
    }
  }
  else
  {
    let val = bestShapesSlider.value();
    let index = map(val,0,200,0,bests.length-1);
    index = round(index);
    bests[index].show(300,300);
    noFill();
    stroke(0);
    textSize(24);
    text("Generation : " + index,900,450);
    text("Accuracy Ranking : " + round(bests[index].fitness),900,550);
  }
}

function generateNextGeneration()
{
  //console.log("New generation");
  let newGeneration = [];
  let newFitness = [];
  for(let i=0 ; i<populationSize ; i++)
  {
    let best = getBest()
    let childShape = new Shape();
    let parent = population[best]
    let r = random();
    if(r<mutationRate)
    {
      childShape.generateRandom();
    }
    else
    {
      childShape.generateFromParent(parent);
    }
    //console.log(childShape);
    newGeneration.push(childShape);
    let f = childShape.getFitness();
    newFitness.push(f);
  }

  //console.log(population[best]);
  population = [];
  //console.log(newGeneration);
  for(let i=0 ; i<populationSize ; i++)
  {
    population[i] = newGeneration[i];
    //populationFitness[i] = newFitness[i];
  }

  let best = getBest();
  bests.push(population[best]);
  thisGenerationsBest = round(population[best].fitness);
  //console.log(population[best]);
  //console.log(population[best].fitness);
}

function getBest()
{
  let bestIndex = 0;
  bestFitness = population[0].fitness;
  for(let i=0 ; i<population.length ; i++)
  {
    if(population[i].fitness>bestFitness)
    {
      //console.log(i);
      bestIndex = i;
      bestFitness = population[i].fitness;
    }
  }
  //console.log("Best Index : " + (bestIndex+1));
  return bestIndex;
}

function stopSimulation()
{
  phase = 1;
  bestShapesSlider.show();
}

function drawStructure()
{
  stroke(0);
  strokeWeight(5);
  line(1,1,599,1);
  line(599,1,1199,1);
  line(599,1,599,599);
  line(1199,1,1199,599);
  line(599,599,1,599);
  line(1199,599,599,599);
  line(1,599,1,1);

  line(600,100,1200,100);

  noStroke();
  fill(0);
  textSize(40);
  text("EVOLVING GEOMETRY",900,25);
}
