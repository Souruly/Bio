function Blob(pos, r, state)
{
  this.position = pos;
  this.alive = state;
  this.r = r;

  this.show = function()
  {
    noStroke();
    if(this.alive)
    {
      fill(255,24,255);
      ellipse(this.position.x, this.position.y, this.r, this.r);
    }
    else
    {
      fill(240);
      ellipse(this.position.x, this.position.y, this.r, this.r);
    }
  }
}
