function Leg(pos,w,h,c)
{
  this.position = pos;
  this.w = w;
  this.h = h;
  this.c = c;
  this.dir = 1;
  this.vel = legVel;

  this.show = function(c)
  {
    noStroke();
    fill(c);
    rect(this.position.x,this.position.y,this.w,this.h);
  }

  this.update = function()
  {
    this.position.x += this.vel*this.dir;
    if(this.position.x>(600-this.w))
    {
      this.position.x = (600-this.w);
      this.dir *= -1;
    }
    if(this.position.x<0)
    {
      this.position.x = 0;
      this.dir *= -1;
    }

  }
}
