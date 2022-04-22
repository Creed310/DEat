{
    // determine bounding rectangle
    let left   = Math.min(point1.x - r1, point2.x - r2, point3.x - r3);
    let right  = Math.max(point1.x + r1, point2.x + r2, point3.x + r3);
    let top    = Math.min(point1.y - r1, point2.y - r2, point3.y - r3);
    let bottom = Math.max(point1.y + r1, point2.y + r2, point3.y + r3);
  
    // area of bounding rectangle
    let rectArea = (right - left) * (bottom - top);
  
    let iterations = 10000;
    let pts = 0;
    for (var i = 0; i<iterations; i++) 

    {
      // random point coordinates
      let x = left + Math.rand() * (right - left);
      let y = top  + Math.rand() * (bottom - top);
  
          // check if it is inside all the three circles (the intersecting area)
      if (Math.sqrt(Math.pow(x - point1.x, 2) + Math.pow(y - point1.y, 2)) <= r1 &&
          Math.sqrt(Math.pow(x - point2.x, 2) + Math.pow(y - point2.y, 2)) <= r2 &&
          Math.sqrt(Math.pow(x - point3.x, 2) + Math.pow(y - point3.y, 2)) <= r3)
        pts++;
    }
  
    // the ratio of points inside the intersecting area will converge to the ratio
    // of the area of the bounding rectangle and the intersection
    let area = pts / iterations * rectArea;
    
    if(area>0)
    {
        return true
    }
    
    else
    {
        return false
    }
    
  }

  export default returnIntersectionArea;