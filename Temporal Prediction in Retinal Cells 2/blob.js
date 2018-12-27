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
      fill(255,24,255);
      ellipse(this.position.x, this.position.y, this.r, this.r);
    }
    else
    {
      fill(192);
      ellipse(this.position.x, this.position.y, this.r, this.r);
    }
  }

  this.update = function(previousGrid)
  {
    // console.log(previousGrid);
    neighbors = this.getAliveNeighbors(previousGrid);
    let numberOfNeighbors = neighbors.length;
    if(this.alive)
    {
      // console.log("p1");
        if(numberOfNeighbors<=1 || numberOfNeighbors>=4)
        {
          this.alive = 0;
        }
    }
    else
    {
      if(numberOfNeighbors==3)
      {
        //console.log("p3");
        this.alive = 1;
      }
      else
      {
        //console.log("p2");
      }
    }
  }

  this.getAliveNeighbors = function(previousGrid)
  {
    let iLeft=this.i-1,iRight=this.i+1,jLeft=this.j-1,jRight=this.j+1;
    if(this.i==0)
    {
      iLeft = this.i;
    }
    if(this.j==0)
    {
      jLeft = this.j;
    }
    if(this.i==rows-1)
    {
      iRight = this.i;
    }
    if(this.j==cols-1)
    {
      jRight = this.j;
    }

    // console.log(this.i,this.j,iLeft,iRight,jLeft,jRight);
    let neighbors = [];
    for(let i=iLeft ; i<=iRight ; i++)
    {
      for(let j=jLeft ; j<=jRight ; j++)
      {
        if(i==this.i && j==this.j)
        {

        }
        else
        {
          // console.log(i,j);
          let c = previousGrid[getIndex(i,j)];
          if(c.alive)
          {
            neighbors.push(c);
          }
        }
      }
    }
    // console.log(neighbors);
    return neighbors;
  }
}
