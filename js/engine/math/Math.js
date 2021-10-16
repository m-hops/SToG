//MATH FORMULAS FOR COLLISION DETECTION AND RAYCASTING//
//DEVELOPED BY STEPHANIE RANCOURT//

function raycastToAABox2DAxis(b, sinTheta, rExtend, rayFromRectCenterX, rayFromRectCenterY, rayDirX, rayDirY) {

  let h = -b / sinTheta;
  let ratioToEdge = 1 - Math.abs(rExtend / b);
  let t = h * ratioToEdge;
  let pX = rayFromRectCenterX + rayDirX * t;
  let pY = rayFromRectCenterY + rayDirY * t;
  let vDot = pX * pX + pY * pY;
  let s2 = Math.abs(vDot - rExtend * rExtend);

  return {
    t: t,
    s2: s2
  };
}

function raycastToAABox2D(box, ray, maxRayDistSquare) {

  let rayFromRectCenter = p5.Vector.sub(ray.origin, box.center);
  let castUp = raycastToAABox2DAxis(rayFromRectCenter.x, ray.dir.x, box.extent.x, rayFromRectCenter.x, rayFromRectCenter.y, ray.dir.x, ray.dir.y);
  let hitInfo = {
    hit: false,
    t: 0
  };

  if (castUp.s2 < box.extent.y * box.extent.y) {

    hitInfo.t = castUp.t;
    hitInfo.hit = true;
  } else {

    let castRight = raycastToAABox2DAxis(rayFromRectCenter.y, ray.dir.y, box.extent.y, rayFromRectCenter.x, rayFromRectCenter.y, ray.dir.x, ray.dir.y);

    if (castRight.s2 < box.extent.x * box.extent.x) {

      hitInfo.t = castRight.t;
      hitInfo.hit = true;
    }
  }

  if (hitInfo.t < 0 || hitInfo.t * hitInfo.t > maxRayDistSquare) {

    hitInfo.t = 0;
    hitInfo.hit = false;
  } else {

    hitInfo.position = p5.Vector.add(p5.Vector.mult(ray.dir, hitInfo.t), ray.origin);
  }

  return hitInfo;
}

function distancePointToAABB(point, box) {

  let boxMin = p5.Vector.sub(box.center, box.extent);
  let boxMax = p5.Vector.add(box.center, box.extent);

  if (point.x <= box.center.x - box.extent.x) {
    //POINT IS WEST//

    if (point.y < boxMin.y) {
      //POINT IS NORTHWEST//
      return {
        distance: dist(boxMin.x, boxMin.y, point.x, point.y),
        pos: createVector(boxMin.x, boxMin.y)
      };

    } else if (point.y > box.center.y + box.extent.y) {
      //POINT IS SOUTHWEST//
      return {
        distance: dist(boxMin.x, boxMax.y, point.x, point.y),
        pos: createVector(boxMin.x, boxMax.y)
      };

    } else {
      //POINT IS TRUE WEST//
      return {
        distance: box.center.x - (point.x + box.extent.x),
        pos: createVector(boxMin.x, point.y)
      };
    }
  } else if (point.x >= box.center.x + box.extent.x) {
    //POINT IS EAST//
    if (point.y < boxMin.y) {
      //POINT IT NORTHEAST//
      return {
        distance: dist(boxMax.x, boxMin.y, point.x, point.y),
        pos: createVector(boxMax.x, boxMin.y)
      };

    } else if (point.y > box.center.y + box.extent.y) {
      //POINT IS SOUTHEAST//
      return {
        distance: dist(boxMax.x, boxMax.y, point.x, point.y),
        pos: createVector(boxMax.x, boxMax.y)
      };
    } else {
      //POINT IS TRUE EAST//
      return {
        distance: point.x - box.center.x - box.extent.x,
        pos: createVector(boxMax.x, point.y)
      };
    }
  } else {
    if (point.y > box.center.y) {
      //POINT IT TRUE NORTH//
      return {
        distance: point.y - (box.center.y + box.extent.y),
        pos: createVector(point.x, boxMin.y)
      };

    } else if (point.y < box.center.y) {
      //POINT IS TRUE SOUTH//
      return {
        distance: box.center.y - box.extent.y - point.y,
        pos: createVector(point.x, boxMax.y)
      };
    }
  }
}

function distancePointToRotatedAABB(point, box, angle) {

  let pointFromBoxCenter = p5.Vector.sub(point, box.center);

  pointFromBoxCenter.rotate(-angle);
  pointFromBoxCenter.add(box.center);

  return distancePointToAABB(pointFromBoxCenter, box);
}

function raycastToRotatedAABox2D(box, boxAngle, ray, maxRayDistSquare) {

  let rayFromRectCenter = p5.Vector.sub(ray.origin, box.center);

  rayFromRectCenter.rotate(-boxAngle);
  rayFromRectCenter.add(box.center);

  let rDir = ray.dir.copy();

  rDir.rotate(-boxAngle);

  let rotatedRay = {
    origin: rayFromRectCenter,
    dir: rDir
  };

  var hitInfo = raycastToAABox2D(box, rotatedRay, maxRayDistSquare);

  // rotate result back. just recompute the position with the unrotated ray
  hitInfo.position = p5.Vector.add(p5.Vector.mult(ray.dir, hitInfo.t), ray.origin);

  return hitInfo;
}


function lineRectRaycast(line, box, angle) {

  let rayVec = p5.Vector.sub(line.p1, line.p0);
  let lsq = rayVec.magSq();

  rayVec.normalize();

  let ray = {
    origin: line.p0,
    dir: rayVec
  };

  return raycastToRotatedAABox2D(box, angle, ray, lsq);
}
