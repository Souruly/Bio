function Signal(x,y,t,act)
{
  this.position = createVector(x,y);
  this.path1 = [];
  this.path2 = [];
  this.type = t;
  this.currentLoc = 0;
  this.active = act

  this.initialize = function()
  {
    //First path
    let p11 = createVector(0,5);
    this.path1.push(p11);
    let p12 = createVector(0,5);
    this.path1.push(p12);
    let p13 = createVector(0,5);
    this.path1.push(p13);

    //Second path
    let p21 = createVector(0,5);
    this.path2.push(p21);
    let p22 = createVector(3,0);
    this.path2.push(p22);
    let p23 = createVector(0,3);
    this.path2.push(p23);
    let p24 = createVector(0,3);
    this.path2.push(p24);
  }

  this.show = function()
  {
    stroke(0);
    if(this.type==1)
    {
      if(this.currentLoc==0 || this.currentLoc==1 || this.currentLoc==2)
      {
        if(this.active)
        {
          fill(255,255,0);
        }
        else
        {
          fill(0);
        }
      }
      ellipse(this.position.x,this.position.y,15,15);
    }
    if(this.type==2)
    {
      if(this.currentLoc==0 || this.currentLoc==1 || this.currentLoc==2)
      {
        if(this.active)
        {
          fill(255,255,0);
        }
        else
        {
          fill(0);
        }
      }
      if(this.currentLoc>=3)
      {
        if(this.active)
        {
          fill(0);
        }
        else
        {
          fill(255,255,0);
        }
      }
      ellipse(this.position.x,this.position.y,15,15);
    }
  }

  this.update = function()
  {
    if(this.type==1)
    {
      if(this.currentLoc<=2)
      {
        let vel = this.path1[this.currentLoc];
        this.position.add(vel);
        // console.log(this.position.x,this.position.y)
        if(this.position.x%100==0 && this.position.y%100==0)
        {
          this.currentLoc++;
          // console.log(this.currentLoc);
        }
      }
    }
    if(this.type==2)
    {
      if(this.currentLoc==0)
      {
        let vel = this.path2[this.currentLoc];
        this.position.add(vel);
        // console.log(this.position.x,this.position.y)
        if(this.position.x%100==0 && this.position.y%100==0)
        {
          this.currentLoc++;
          // console.log(this.currentLoc);
        }
      }
      if(this.currentLoc==1)
      {
        let vel = this.path2[this.currentLoc];
        this.position.add(vel);
        // console.log(this.position.x,this.position.y)
        if(this.position.x>=300)
        {
          this.position.x = 300;
          this.currentLoc++;
          // console.log(this.currentLoc);
        }
      }
      if(this.currentLoc==2)
      {
        let vel = this.path2[this.currentLoc];
        this.position.add(vel);
        // console.log(this.position.x,this.position.y)
        if(this.position.y>=300)
        {
          this.currentLoc++;
          // console.log(this.currentLoc);
        }
      }
      if(this.currentLoc==3)
      {
        let vel = this.path2[this.currentLoc];
        this.position.add(vel);
        // console.log(this.position.x,this.position.y)
        if(this.position.y>=400)
        {
          this.currentLoc++;
          // console.log(this.currentLoc);
        }
      }
    }
  }
}
