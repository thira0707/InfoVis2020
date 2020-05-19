/* 
// Constructor
Vec3 = function( x, y, z )
{
  this.x = x;
  this.y = y;
  this.z = z;
}

// Add method
Vec3.prototype.add = function( v )
{
  this.x += v.x;
  this.y += v.y;
  this.z += v.z;
  return this;
}
// Sum method
Vec3.prototype.sum = function()
{
  return this.x + this.y + this.z;
}
 */

class Vec3
{
  // Constructor
  constructor( x, y, z )
  {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add( v )
  {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  sum( v )
  {
    return this.x + this.y + this.z;
  }

  min( v )
  {
    if( this.x >= this.y )
    {
      if (this.y >= this.z )
      {
        return this.z;
      }
      else
      {
        return this.y;
      }
    }
    else
    {
      if( this.x >= this.z)
      {
        return this.z;
      }
      else
      {
        return this.x;
      }
    }
  }

  mid( v )
  {
    if( this.x >= this.y )
    {
      if( this.x <= this.z )
      {
        return this.x;
      }
      else if( this.y >= this.z )
      {
        return this.y;
      }
      else
      {
        return this.z;
      }
    }
    else
    {
      if( this.x >= this.z )
      {
        return this.x;
      }
      else if( this.y >= this.z )
      {
        return this.z;
      }
      else
      {
        return this.y;
      }
    }
  }

  max( v )
  {
    if( this.x <= this.y )
    {
      if (this.y <= this.z )
      {
        return this.z;
      }
      else
      {
        return this.y;
      }
    }
    else
    {
      if( this.x <= this.z)
      {
        return this.z;
      }
      else
      {
        return this.x;
      }
    }
  }

}