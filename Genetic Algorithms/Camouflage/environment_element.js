function environmentElement(x,y,r,c)
{
  this.x = x;
  this.y = y;
  this.r = r;
  this.color = c;

  this.show = function()
  {
    noStroke();
    fill(this.color);
    ellipse(this.x,this.y,this.r);
  }
}
