function Signal(x,y,t,s)
{
  this.position = createVector(x,y);
  this.type = t;
  this.state = s;

  this.show = function()
  {
    stroke(0);
    if(this.state)
    {
      fill(255,255,0);
    }
    else
    {
      fill(0);
    }
    ellipse(this.position.x,this.position.y,15,15);
  }

  this.update = function()
  {
    if(this.type==1)
    {
      this.position.y += 2;
    }
    if(this.type==2)
    {
      let lastY = this.position.y;
      this.position.y += 2;
      if(lastY<=300 && this.position.y>300)
      {
        this.state = !this.state;
      }
    }
    if(this.position.y>=400)
    {
      this.position.y = 400;
    }
  }
}
