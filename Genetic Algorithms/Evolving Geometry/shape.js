function Shape()
{
  this.center = createVector(300,300);
  this.numberOfSegments = 20;
  this.segmentLengths = [];
  this.maxLength = 100;
  this.fitness = 0;

  this.generateRandom = function()
  {
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      let len = round(random(0,this.maxLength));
      this.segmentLengths.push(len);
    }
  }

  this.generateFromParent = function(parent)
  {
    this.segmentLengths = [];
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      let len = parent.segmentLengths[i];
      if(random()<0.5)
      {
        let leftOff = 5,rightOff = 5;
        if(len<leftOff)
        {
          leftOff = len;
        }
        if(len>this.maxLength-rightOff)
        {
          rightOff = this.maxLength-len;
        }
        len += round(random(-leftOff,rightOff));
      }
      this.segmentLengths.push(len);
    }
  }

  this.getFitness = function()
  {
    let totalDifference = 0;
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      let dif = floor(abs(this.maxLength - this.segmentLengths[i]));
      totalDifference = totalDifference + dif;
    }
    let max = this.maxLength * this.numberOfSegments;
    this.fitness = round(map(totalDifference,0,max,100,0));
    return this.fitness;
  }

  this.generateCircle = function()
  {
    let angle = floor(360/this.numberOfSegments);
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      let len = this.maxLength;
      this.segmentLengths.push(len);
    }
  }

  this.show = function(cx,cy)
  {
    let endPoints = [];
    let center = createVector(cx,cy);
    stroke(198);
    strokeWeight(2);
    let angle = floor(360/this.numberOfSegments);
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      let reference = createVector(0,-this.maxLength);
      let rotation = angle*i;
      reference.rotate(rotation);
      let endpoint = reference.copy();
      endpoint.setMag(this.segmentLengths[i]);
      reference.add(center);
      endpoint.add(center);
      line(cx,cy,reference.x,reference.y);
      endPoints.push(endpoint);
    }
    noFill();
    stroke(0);
    strokeWeight(2);
    point(cx,cy);
    beginShape();
    for(let i=0 ; i<this.numberOfSegments ; i++)
    {
      stroke(0);
      strokeWeight(2);
      vertex(endPoints[i].x,endPoints[i].y);
    }
    endShape(CLOSE);
  }

}
