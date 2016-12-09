function indoor(){
var sceneParams = {
  counterRadius: 10,
  counterRadiusSegments:32,
  radiusSegments: 2,
  tubularSegments: 30,
  metalColor: 0x808080,
  metalSpecular: 0x444444,
  woodColor: 0x512B1E,
  metalShininess: 5,
  baseRadius: 4,
  spotlightColor: 0xffffff,
  spotlightExponentt: 100,

}


var sceneParams1 = {
  legRadius:2,
  handleRadius: .3,
  handleHeight: 3,
  cylinderRadius: 4.5,
  cylinderHeight: 15,
  radiusSegments: 32,
  metalColor: 0x808080,
  metalSpecular: 0x444444,
  seatColor: 0xFF0000,
  seatShininess: 30,
  metalShininess: 5,
  sphereRadius: 15,
  spotlightColor: 0xffffff,
  spotlightExponentt: 100,

}


var indoorScene = new THREE.Object3D();



function createBase(){

var curve = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( 30, 0, 0),
  new THREE.Vector3( -30, 0, 0 ),
  new THREE.Vector3( 0, 0, 30 ),
  new THREE.Vector3( 30, 0, 0)
] );

var geometry = new THREE.TubeGeometry( curve, sceneParams.tubularSegments, sceneParams.baseRadius, sceneParams.radiusSegments, false );
var material = new THREE.MeshBasicMaterial( { color: sceneParams.woodColor } );
var mesh = new THREE.Mesh( geometry, material );

return mesh;

}

function createTop(){

var topCounter = new THREE.Object3D();

var geometry = new THREE.PlaneGeometry( 7, 55, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );

plane.rotation.x = Math.PI/2;
plane.rotation.z = Math.PI/1.9;
plane.position.y = sceneParams.baseRadius;


var geometry2 = new THREE.PlaneGeometry( 7, 40, 32 );
var material2 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane2 = new THREE.Mesh( geometry2, material2 );

plane2.rotation.x = Math.PI/2;
plane2.rotation.z = -Math.PI/4;
plane2.position.y = sceneParams.baseRadius;
plane2.position.x = -15;
plane2.position.z = 17;

var geometry3 = new THREE.PlaneGeometry( 6.7, 42, 32 );
var material3 = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane3 = new THREE.Mesh( geometry3, material3 );

plane3.rotation.x = Math.PI/2;
plane3.rotation.z = -Math.PI/1.3;
plane3.position.y = sceneParams.baseRadius;
plane3.position.x = 14;
plane3.position.z = 17;


var geometryCorner = new THREE.SphereGeometry( 6.1, 32, 32 );
var materialCorner = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphereCorner = new THREE.Mesh( geometryCorner, materialCorner );

sphereCorner.scale.set(.75,0,1);
sphereCorner.position.y = sceneParams.baseRadius;
sphereCorner.position.x = -29

var geometryCorner2 = new THREE.SphereGeometry( 3.3, 32, 32 );
var materialCorner2 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphereCorner2 = new THREE.Mesh( geometryCorner, materialCorner );

sphereCorner2.scale.set(1,0,.7);
sphereCorner2.position.y = sceneParams.baseRadius;
sphereCorner2.position.x = 25;
sphereCorner2.position.z = 3.7;
sphereCorner2.rotation.y = Math.PI/5;

var geometryCorner3 = new THREE.SphereGeometry( 4.5, 32, 32 );
var materialCorner3 = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sphereCorner3 = new THREE.Mesh( geometryCorner, materialCorner );

sphereCorner3.scale.set(.7,0,.75);
sphereCorner3.position.y = sceneParams.baseRadius;
sphereCorner3.position.x = .35;
sphereCorner3.position.z = 31;
sphereCorner3.rotation.y = Math.PI/2;

topCounter.add(plane);
topCounter.add(plane2);
topCounter.add(plane3);
topCounter.add(sphereCorner);
topCounter.add(sphereCorner2);
topCounter.add(sphereCorner3);


return topCounter;

}


function createLeg(){

  var leg = new THREE.Object3D();
  var legs = new THREE.Object3D();

  var thighGeometry = new THREE.SphereGeometry( sceneParams1.legRadius, sceneParams1.radiusSegments, sceneParams1.radiusSegments );
  var thighMaterial = new THREE.MeshPhongMaterial({color: sceneParams1.metalColor,
                                             specular: sceneParams1.metalSpecular,
                                             shininess: sceneParams1.metalShininess});
  var thighSphere = new THREE.Mesh( thighGeometry, thighMaterial );

  var calfGeometry = new THREE.SphereGeometry( sceneParams1.legRadius, sceneParams1.radiusSegments, sceneParams1.radiusSegments );
  var calfMaterial = new THREE.MeshPhongMaterial({color: sceneParams1.metalColor,
                                             specular: sceneParams1.metalSpecular,
                                             shininess: sceneParams1.metalShininess});
  var calfSphere = new THREE.Mesh( calfGeometry, calfMaterial );

  var footGeometry = new THREE.SphereGeometry( sceneParams1.legRadius*.9, sceneParams1.radiusSegments, sceneParams1.radiusSegments );
  var footMaterial = new THREE.MeshPhongMaterial({color: sceneParams1.metalColor,
                                             specular: sceneParams1.metalSpecular,
                                             shininess: sceneParams1.metalShininess});
  var footSphere = new THREE.Mesh( footGeometry, footMaterial );
  
  thighSphere.scale.set(.3,1,.3);
  thighSphere.rotation.z = Math.PI/2.5;

  calfSphere.scale.set(.2,.6,.2);
  calfSphere.rotation.z = -Math.PI/5;
  calfSphere.position.x = sceneParams1.legRadius*.55;
  calfSphere.position.y = -sceneParams1.legRadius*.6;
  footSphere.position.y = -sceneParams1.legRadius*.8;
  footSphere.scale.set(.15,.4,.2);
  footSphere.rotation.z = Math.PI/2.5;
  footSphere.position.x = sceneParams1.legRadius*.5;
  footSphere.position.y = -sceneParams1.legRadius*1.1;

  leg.add(calfSphere);
  leg.add(thighSphere);
  leg.add(footSphere);

  var leg2 = leg.clone();
  var leg3 = leg.clone();
  var leg4 = leg.clone();

  leg.position.y = sceneParams1.legRadius*1.2;
  leg.position.x = sceneParams1.cylinderRadius;

  leg2.position.y = sceneParams1.legRadius*1.2;
  leg2.position.x = -sceneParams1.cylinderRadius;
  leg2.rotation.y = Math.PI;

  leg3.position.y = sceneParams1.legRadius*1.2;
  leg3.position.z = -sceneParams1.cylinderRadius;
  leg3.rotation.y = Math.PI/2;

  leg4.position.y = sceneParams1.legRadius*1.2;
  leg4.position.z = sceneParams1.cylinderRadius;
  leg4.rotation.y = -Math.PI/2;

  legs.add(leg);
  legs.add(leg2);
  legs.add(leg3);
  legs.add(leg4);

  return legs;

}

function createHandle(){
  var handle = new THREE.Object3D();

  var geometry = new THREE.CylinderGeometry( sceneParams1.handleRadius, sceneParams1.handleRadius, sceneParams1.handleHeight, sceneParams1.radiusSegments );
  var material = new THREE.MeshPhongMaterial({color: sceneParams1.metalColor,
                                             specular: sceneParams1.metalSpecular,
                                             shininess: sceneParams1.metalShininess});
  var cylinder1 = new THREE.Mesh( geometry, material );

  cylinder1.rotation.x = (Math.PI /2);
  cylinder1.position.y = (sceneParams1.handleHeight *.6)/2;


  var geometry2 = new THREE.CylinderGeometry( sceneParams1.handleRadius, sceneParams1.handleRadius, sceneParams1.handleHeight, sceneParams1.radiusSegments );
  var material2 = new THREE.MeshPhongMaterial({color: sceneParams1.metalColor,
                                             specular: sceneParams1.metalSpecular,
                                             shininess: sceneParams1.metalShininess});
  var cylinder2 = new THREE.Mesh( geometry, material );
  cylinder2.scale.set(.8,.6,.8);

  handle.add(cylinder1);
  handle.add(cylinder2);

  return handle;

}

function createCylinder(){

  var geometry = new THREE.CylinderGeometry( sceneParams1.cylinderRadius, sceneParams1.cylinderRadius, sceneParams1.cylinderHeight, sceneParams1.radiusSegments );
  var material = new THREE.MeshPhongMaterial({color: sceneParams1.metalColor,
                                             specular: sceneParams1.metalSpecular,
                                             shininess: sceneParams1.metalShininess});
  var cylinder = new THREE.Mesh( geometry, material );
  return cylinder;
}

function printPoints(points) {
    var i;
    console.log("[");
    for( i=0; i < points.length; i++) {
        p = points[i];
        console.log("["+p.x+","+p.y+"],");
    }
    console.log("]");
}

function makeVertices(points) {
    var i;
    var pts = [];
    for( i = 0; i < points.length; i++) {
        var p = points[i]; 
        pts.push(new THREE.Vector3( p[0], p[1], 0));
    }

    return pts;
}
    
function remakeSplineObj(spline) { //catmulrom etc

  var splineVertices = [ [5, 0],
               [4, 2],
               [1, 4],
               [3, 2],
               [1.5, 5],
               [.5, 5.5] ];

    scene.remove(spline);
    var mat = new THREE.MeshPhongMaterial({color: sceneParams1.metalColor,
                                             specular: sceneParams1.metalSpecular,
                                             shininess: sceneParams1.metalShininess});
    curve = new THREE.CatmullRomCurve3 ( makeVertices(splineVertices) );
    var geom = new THREE.Geometry();
    geom.vertices = curve.getPoints(5);
    splineObj = new THREE.Line( geom, new THREE.LineBasicMaterial( { linewidth: 3, color: 0x00ff00 }) );
    splineObj.name = "spline";

    return splineObj;
}

function remakeLatheObj(lathe) {
    scene.remove(lathe);
    var geom = new THREE.LatheGeometry( splineObj.geometry.vertices );
    var mat1 = new THREE.MeshPhongMaterial({color: sceneParams1.metalColor,
                                             opacity: 0.6, 
                                             specular: sceneParams1.metalSpecular,
                                             shininess: sceneParams1.metalShininess,
                                             side: THREE.DoubleSide, 
                                             wireframe: false,
                                           });
    latheObj = new THREE.Mesh (geom, mat1);
    latheObj.name = "lathe";

    return latheObj;
}

function createCannister(){

can = new THREE.Object3D();

var splineObj;
var latheObj;
var splineStand = remakeSplineObj(splineObj);
var latheStand = remakeLatheObj(latheObj);
var body = createCylinder();
var cannisterHandle = createHandle();
var leg = createLeg();

latheStand.position.y = sceneParams1.cylinderHeight + sceneParams1.legRadius;
body.position.y = sceneParams1.cylinderHeight/2 + sceneParams1.legRadius;
cannisterHandle.position.y = (sceneParams1.cylinderHeight * 1.5 - sceneParams1.handleHeight*.6) + sceneParams1.legRadius;

can.add(latheStand);
can.add(body);
can.add(cannisterHandle);
can.add(leg);

return can;
}

function createCounter(){

count = new THREE.Object3D();

var base = createBase();
var top = createTop();

base.position.y = sceneParams.baseRadius;
top.position.y = sceneParams.baseRadius;

count.add(base);
count.add(top);

return count;
}

cannister = createCannister();
cannister2 = cannister.clone();
counter = createCounter();

counter.scale.set(2,2,2);

cannister.position.x = -15
cannister.position.y = sceneParams.counterRadius*1.6;
cannister2.position.y = sceneParams.counterRadius*1.6;
cannister2.position.x = -30;

stool = barStool(sceneParams.woodColor);
stool.scale.set(.5,.5, .5);
stool.position.x = -40;
stool.position.z = 40;

stool2 = stool.clone();
stool2.position.x = -55;
stool2.position.z = 20;

indoorScene.add(cannister);
indoorScene.add(cannister2);
indoorScene.add(counter);
indoorScene.add(stool);
indoorScene.add(stool2);

return indoorScene;




}