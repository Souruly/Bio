function Giraffe(n)
{
  this.neckLength = n;
  this.x = 500;
  this.y = 600;
  this.height = map(n,60,300,50,75);
  this.width = map(n,60,300,100,150);
  this.xoff = map(n,60,300,20,30);
  this.yoff = map(n,60,300,10,15);

  this.show = function()
  {
    fill(255,255,0);
    stroke(0);
    strokeWeight(5);
    let w = this.width;
    let h = this.height;
    let bodyx = this.x;
    let bodyy = this.y-this.height;
    //Body
    rect(bodyx,bodyy,bodyx-w,bodyy-h);
    //Left leg
    rect(bodyx-w,bodyy,bodyx-w+this.xoff/2,this.y);
    //Right Leg
    rect(bodyx-this.xoff/2,bodyy,bodyx,this.y);
    //Neck
    let neckx = bodyx;
    let necky = bodyy-h;
    rect(neckx,necky,neckx-this.xoff/2,necky-this.neckLength);
    //Nose
    rect(neckx,necky-this.neckLength,neckx+this.xoff,necky-this.neckLength +this.yoff)
    line(neckx-this.xoff/2,necky-this.neckLength,neckx+this.xoff/2,necky-this.neckLength-this.yoff)
    //Tail
    line(bodyx-w,bodyy-h,bodyx-w-this.yoff*1.5,bodyy-h+this.yoff*4)
  }
}
