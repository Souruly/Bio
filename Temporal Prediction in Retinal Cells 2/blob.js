function Blob(pos, r)
{
  this.position = pos;
  this.alive = true;
  this.r = r;

  this.show = function()
  {
    noStroke();
    if(this.alive)
    {
      fill(255,51,255,16);
      ellipse(this.position.x, this.position.y, this.r*1.6, this.r*1.6);
      fill(255,51,255,32);
      ellipse(this.position.x, this.position.y, this.r*1.4, this.r*1.4);
      fill(255,51,255,64);
      ellipse(this.position.x, this.position.y, this.r*1.2, this.r*1.2);
      fill(255,51,255,128);
      ellipse(this.position.x, this.position.y, this.r, this.r);
      // fill(255,51,255,192);
      // ellipse(this.position.x, this.position.y, this.r*0.8, this.r*0.8);
    }
    else
    {
      fill(backG);
      ellipse(this.position.x, this.position.y, this.r, this.r);
    }
  }
}
