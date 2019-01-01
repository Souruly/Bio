function GraphPoint(x, y,h)
{
  this.x = x;
  this.y = y;
  this.h = h;
  this.spike = false;

  this.show = function()
  {
    stroke(0);
    if(this.spike)
    {
      line(this.x, this.y, this.x, this.y-this.h-20);
    }
    else
    {
      line(this.x, this.y, this.x, this.y-this.h);
    }
  }
}
