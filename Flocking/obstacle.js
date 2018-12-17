function Obstacle(x,y)
{
  this.position = createVector(x,y);
  this.r = 10;

  this.show = function()
  {
    var c = map(repelSlider.value(),0,10,51,232);
    fill(c,51,51);
    stroke(255);
    strokeWeight(0.1);
    ellipse(this.position.x,this.position.y,this.r,this.r);
    noStroke();
  }
};
