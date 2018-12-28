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
      let lim = 10;
      for(let i=0 ; i<lim ; i++)
      {
        let alpha = map(i,0,lim,8,80)
        fill(255,51,255,alpha);
        let rMultpiplier = map(i,0,4,1.5,0.9);
        ellipse(this.position.x, this.position.y, this.r*rMultpiplier, this.r*rMultpiplier);
      }
    }
    else
    {
      fill(backG);
      ellipse(this.position.x, this.position.y, this.r, this.r);
    }
  }
}
