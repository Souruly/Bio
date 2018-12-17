let populationSize = 10;
let population = [];
let generationNumber = 0;
let acceptabilityThreshold = 2;
let mutationRate = 0.2;
let bests = [];
let bestShapesSlider;
let getBestButton;
let nextGenerationButton;
let automateButton;
let phase = 0;
let hx=-1,hy=-1;

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

  getBestButton = createButton("Get Best");
  getBestButton.position(1015,250);
  getBestButton.mousePressed(highlightBest);
  nextGenerationButton = createButton("Get Next Generation");
  nextGenerationButton.position(980,300);
  nextGenerationButton.mousePressed(generateNextGeneration);
  // automateButton = createButton("Automate Evolution");
  // automateButton.position()

  for(let i=0 ; i<populationSize ; i++)
  {
    let shape = new Shape();
    shape.generateRandom();
    // shape.generateCircle();
    let f = shape.getFitness();
    population.push(shape);
  }

  let best = getBest();
  bests.push(best);
}

function draw()
{
  background(240);
  drawStructure();
  textSize(16);
  //text("Generation : " + generationNumber,900,200);
  highlightCell();
  if(phase == 0)
  {
    showGeneration();
    /*
    //if(frameCount%1==0)
    //{
      //console.log("Circle : " + numberSurveyed);
      //console.log(population[index].fitness);
      //index++;
      numberSurveyed++;
      index = index%10;
      if(index==0 && numberSurveyed>9)
      {
        generateNextGeneration();
        numberOfGenerations++;
      }
    //}
    if(population[index].fitness<acceptabilityThreshold)
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
    bests[index].show();
    noFill();
    stroke(0);
    textSize(24);
    text("Generation : " + index,900,450);
    text("Accuracy Ranking : " + round(bests[index].fitness),900,550);
    */
  }
}

function generateNextGeneration()
{
  if(hx<0 || hx>4 || hy<0 || hy>1)
  {
    highlightBest();
  }
  let newGeneration = [];
  let index = hx + hy*5;
  let parent = population[index];
  for(let i=0 ; i<populationSize ; i++)
  {
    let childShape = new Shape();
    let r = random();
    if(r<mutationRate)
    {
      childShape.generateRandom();
    }
    else
    {
      childShape.generateFromParent(parent);
    }
    newGeneration.push(childShape);
    let f = childShape.getFitness();
  }

  population = [];
  for(let i=0 ; i<populationSize ; i++)
  {
    population[i] = newGeneration[i];
  }

  hx = -1;
  hy = -1;
  let best = getBest();
  bests.push(best);
}

function highlightBest()
{
  let bestIndex = getBest();
  hy = floor(bestIndex/5);
  hx = bestIndex%5;
  console.log(hx,hy);
}

function getBest()
{
  let bestIndex = 0;
  bestFitness = population[0].fitness;
  for(let i=0 ; i<population.length ; i++)
  {
    if(population[i].fitness<bestFitness)
    {
      //console.log(i);
      bestIndex = i;
      bestFitness = population[i].fitness;
    }
  }
  //console.log("Best Index : " + (bestIndex+1));
  return bestIndex;
}

function mouseClicked()
{
  if(pmouseX<900 && pmouseY<600)
  {
    let x = floor(map(pmouseX,0,900,0,5));
    let y = floor(map(pmouseY,0,600,0,2));
    hx = x;
    hy = y;
  }
  console.log(hx,hy);
}

function keyPressed()
{
  if(keyCode === ENTER)
  {
    generateNextGeneration();
  }
}

function highlightCell()
{
  fill(0,255,0,128);
  let x1 = hx*180 + 2,
      y1 = hy*300 + 2;
  rect(x1,y1,x1+176,y1+296);
  noFill();
}

function showGeneration()
{
  for(let i=0 ; i<5 ; i++)
  {
    let x=i*180 + 90;
    let y=150;
    population[i].show(x,y,80);
  }

  for(let i=5 ; i<10 ; i++)
  {
    let x=(i-5)*180 + 90;
    let y=450;
    population[i].show(x,y,80);
  }
}

function drawStructure()
{
  stroke(0);
  strokeWeight(5);
  line(1,1,899,1);
  line(899,1,1199,1);
  line(899,1,899,599);
  line(1199,1,1199,899);
  line(899,599,1,599);
  line(1199,599,899,599);
  line(1,599,1,1);

  line(900,100,1200,100);

  for(let i=0 ; i<5 ; i++)
  {
    line(i*180,0,i*180,600);
  }

  line(0,300,900,300);

  noStroke();
  fill(0);
  textSize(26);
  text("EVOLVING GEOMETRY",1050,32);
}
