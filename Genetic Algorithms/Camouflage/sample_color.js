function sampleColor(x,y,w,c)
{
  this.x = x;
  this.y = y;
  this.width = w;
  this.color = c
  this.highlight = false;

  this.show = function()
  {
    if(this.highlight)
    {
        stroke(0);
        strokeWeight(3);
        fill(this.color);
        rect(this.x,this.y,this.width,this.width);
        let w = this.width/2;
        line(this.x-w,this.y+w+4,this.x+w,this.y+w+4);
        line(this.x-w,this.y+w+8,this.x+w,this.y+w+8);
    }
    else
    {
      stroke(0);
      strokeWeight(1);
      fill(this.color);
      rect(this.x,this.y,this.width,this.width);
    }
  }

  this.update = function(x,y)
  {
    let w = this.width/2;
    if(x<this.x+w && x>this.x-w && y<this.y+w && y>this.y-w)
    {
      this.highlight = true;
      return true;
    }
    else
    {
      this.highlight = false;
      return false;
    }
  }
}
