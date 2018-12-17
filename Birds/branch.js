function Branch(startpt,endpt)
{
   this.startpt = startpt;
   this.endpt = endpt;
   this.done = false;

   this.show = function()
   {
      stroke(0);
      strokeWeight(3);
      line(this.startpt.x,this.startpt.y,this.endpt.x,this.endpt.y);
   }

   this.splitLeft = function()
   {
      var dir = p5.Vector.sub(this.endpt,this.startpt);
      dir.rotate(-PI / 4);
      dir.mult(0.67);
      var newEnd = p5.Vector.add(this.endpt,dir);

      var left = new Branch(this.endpt, newEnd);
      return left;
   }

   this.splitRight = function()
   {
      var dir = p5.Vector.sub(this.endpt,this.startpt);
      dir.rotate(PI / 4);
      dir.mult(0.67);
      var newEnd = p5.Vector.add(this.endpt,dir);

      var right = new Branch(this.endpt, newEnd);
      return right;
   }
}
