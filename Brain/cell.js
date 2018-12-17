function Cell()
{
   this.setTarget = function()
   {
      this.count = 0;
      this.targetx = random(0,WIDTH);
      this.targety = random(0,HEIGHT);
   }

   this.setReached = function()
   {
      if(abs(this.x - this.targetx) <= 50  && abs(this.y - this.targety) <= 50)
      {
         this.reached = true;
      }
      else
      {
         this.reached = false;
      }
   }

   this.start = function()
   {
      this.x = round(random(0,WIDTH));
      this.y = round(random(0,HEIGHT));
      this.reached = false;
      this.count = 0;
      this.setTarget();
   }

   this.excite = function()
   {
      this.xvelocity = map((this.targetx-this.x),-WIDTH,WIDTH,-5,5);
      this.yvelocity = map((this.targety-this.y),-HEIGHT,HEIGHT,-5,5);
      this.x += this.xvelocity;
      this.y += this.yvelocity;
      this.count++;
      this.setReached();
      if(this.count>=100 || this.reached == true)
      {
         this.setTarget();
      }

      if(this.x>WIDTH)
      {
         this.x = 0;
      }

      if(this.y > HEIGHT)
      {
         this.y = 0;
      }
   }

   this.drop = function()
   {
      if(this.y<=HEIGHT-8)
      {
         this.y+=5;
      }
   }

   this.show = function()
   {
      ellipseMode(CENTER)
      smooth();
      ellipse(this.x,this.y,5,5);
   }
}
