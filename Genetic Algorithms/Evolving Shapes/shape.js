function Shape()
{
  this.numberOfSegments = 20;
  this.angles = [];
  this.fitness;

  this.generateRandom = function()
  {
    let lastAngle = 0;
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      let angle = random(lastAngle,360);
      this.angles.push(angle);
      lastAngle = angle;
    }
  }

  this.generateFromParent = function(parent)
  {
    let lastAngle = 0;
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      let angle = parent.angles[i];

      let leftOff = 10,rightOff = 10;
      if(angle-lastAngle<leftOff)
      {
        leftOff = angle-lastAngle;
      }
      if(360-angle<rightOff)
      {
        rightOff = 360-angle;
      }
      angle += round(random(-leftOff,rightOff));

      this.angles.push(angle);
      lastAngle = angle;
    }
  }

  this.getFitness = function()
  {
    let totalDifference = 0;
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      let targetAngle = ((TWO_PI)/this.numberOfSegments)*i;
      let thisAngle = this.angles[i];
      let diff = abs(thisAngle - targetAngle);
      totalDifference = totalDifference + diff;
    }
    this.fitness = totalDifference;
    return this.fitnes;
  }

  this.generateCircle = function()
  {
    let lastAngle = 0;
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      let angle = ((360)/this.numberOfSegments)*i;
      this.angles.push(angle);
      lastAngle = angle;
    }
    //console.log(this.angles);
  }

  this.show = function(x,y,l)
  {
    noFill();
    let center = createVector(x,y);
    beginShape();
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      stroke(0);
      strokeWeight(2);
      let ref = createVector(0,-l);
      ref.rotate(this.angles[i]);
      let endPoints = p5.Vector.add(center,ref);
      // strokeWeight(0.5);
      // stroke(51);
      // line(center.x,center.y,endPoints.x,endPoints.y);
      // stroke(0);
      // strokeWeight(2);
      vertex(endPoints.x,endPoints.y);
    }
    endShape(CLOSE);
  }
}
