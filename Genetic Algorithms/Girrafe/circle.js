function Circle(x,y,r,color)
{
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = color;

  this.show = function()
  {
    stroke(0);
    strokeWeight(5);
    fill(this.color);
    ellipse(this.x,this.y,this.r);
  }
}
