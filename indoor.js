

//------------------------------------------------------------
// Combines code from counter.js, barstool.js, and watercannister.js
//------------------------------------------------------------
function indoor(){

// scene parameters for the counter
var sceneParamsCounter = {
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

// scene paramters for the cannister
var sceneParamsCann = {
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

// object will contain every other object created in indoor scene
var indoorScene = new THREE.Object3D();

//------------------------------------------------------------
// Creates the base of the counter using a CatmullRomCurve
// from 4 3D Vectors
//------------------------------------------------------------
function createBase(){

var curve = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( 30, 0, 0),
  new THREE.Vector3( -30, 0, 0 ),
  new THREE.Vector3( 0, 0, 30 ),
  new THREE.Vector3( 30, 0, 0)
] );

var geometry = new THREE.TubeGeometry( curve, sceneParamsCounter.tubularSegments, sceneParamsCounter.baseRadius, sceneParamsCounter.radiusSegments, false );
var material = new THREE.MeshBasicMaterial( { color: sceneParamsCounter.woodColor } );
var mesh = new THREE.Mesh( geometry, material );

return mesh;

}

//------------------------------------------------------------
// Creates the top of the surface using three planes and three
// circleGeometry objects to fil in the gaps that were made
// at the corners. This code isn't modular at all because
// it was difficult to get the planes to fit the paths of the 3D
// vectors. Had to use magic constants to get the counter to fit
// well.
//------------------------------------------------------------
function createTop(){

var topCounter = new THREE.Object3D();

//first counter surface
var geometry = new THREE.PlaneGeometry( 7, 55, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0x3C2B13, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );

plane.rotation.x = Math.PI/2;
plane.rotation.z = Math.PI/1.9;
plane.position.y = sceneParamsCounter.baseRadius;

//second counter surface
var geometry2 = new THREE.PlaneGeometry( 7, 40, 32 );
var material2 = new THREE.MeshBasicMaterial( {color: 0x3C2B13, side: THREE.DoubleSide} );
var plane2 = new THREE.Mesh( geometry2, material2 );

plane2.rotation.x = Math.PI/2;
plane2.rotation.z = -Math.PI/4;
plane2.position.y = sceneParamsCounter.baseRadius;
plane2.position.x = -15;
plane2.position.z = 17;

//third counter surface
var geometry3 = new THREE.PlaneGeometry( 6.7, 42, 32 );
var material3 = new THREE.MeshBasicMaterial( {color: 0x3C2B13, side: THREE.DoubleSide} );
var plane3 = new THREE.Mesh( geometry3, material3 );

plane3.rotation.x = Math.PI/2;
plane3.rotation.z = -Math.PI/1.3;
plane3.position.y = sceneParamsCounter.baseRadius;
plane3.position.x = 14;
plane3.position.z = 17;

//first corner
var geometryCorner = new THREE.SphereGeometry( 6.1, 32, 32 );
var materialCorner = new THREE.MeshBasicMaterial( {color: 0x3C2B13} );
var sphereCorner = new THREE.Mesh( geometryCorner, materialCorner );

sphereCorner.scale.set(.75,0,1);
sphereCorner.position.y = sceneParamsCounter.baseRadius;
sphereCorner.position.x = -29

//second corner
var geometryCorner2 = new THREE.SphereGeometry( 3.3, 32, 32 );
var materialCorner2 = new THREE.MeshBasicMaterial( {color: 0x3C2B13} );
var sphereCorner2 = new THREE.Mesh( geometryCorner, materialCorner );

sphereCorner2.scale.set(1,0,.7);
sphereCorner2.position.y = sceneParamsCounter.baseRadius;
sphereCorner2.position.x = 25;
sphereCorner2.position.z = 3.7;
sphereCorner2.rotation.y = Math.PI/5;

//third corner
var geometryCorner3 = new THREE.SphereGeometry( 4.5, 32, 32 );
var materialCorner3 = new THREE.MeshBasicMaterial( {color: 0x3C2B13} );
var sphereCorner3 = new THREE.Mesh( geometryCorner, materialCorner );

sphereCorner3.scale.set(.7,0,.75);
sphereCorner3.position.y = sceneParamsCounter.baseRadius;
sphereCorner3.position.x = .35;
sphereCorner3.position.z = 31;
sphereCorner3.rotation.y = Math.PI/2;

//topCountero bject contains all surfaces along the counter top
topCounter.add(plane);
topCounter.add(plane2);
topCounter.add(plane3);
topCounter.add(sphereCorner);
topCounter.add(sphereCorner2);
topCounter.add(sphereCorner3);


return topCounter;
}

//------------------------------------------------------------
// Function is used in createCanister() to add the four legs to 
// the water cannister. The legs are created out of a mesh material
//------------------------------------------------------------
function createLeg(){

  var leg = new THREE.Object3D();
  var legs = new THREE.Object3D();

  var thighGeometry = new THREE.SphereGeometry( sceneParamsCann.legRadius, sceneParamsCann.radiusSegments, sceneParamsCann.radiusSegments );
  var thighMaterial = new THREE.MeshPhongMaterial({color: sceneParamsCann.metalColor,
                                             specular: sceneParamsCann.metalSpecular,
                                             shininess: sceneParamsCann.metalShininess});
  var thighSphere = new THREE.Mesh( thighGeometry, thighMaterial );

  var calfGeometry = new THREE.SphereGeometry( sceneParamsCann.legRadius, sceneParamsCann.radiusSegments, sceneParamsCann.radiusSegments );
  var calfMaterial = new THREE.MeshPhongMaterial({color: sceneParamsCann.metalColor,
                                             specular: sceneParamsCann.metalSpecular,
                                             shininess: sceneParamsCann.metalShininess});
  var calfSphere = new THREE.Mesh( calfGeometry, calfMaterial );

  var footGeometry = new THREE.SphereGeometry( sceneParamsCann.legRadius*.9, sceneParamsCann.radiusSegments, sceneParamsCann.radiusSegments );
  var footMaterial = new THREE.MeshPhongMaterial({color: sceneParamsCann.metalColor,
                                             specular: sceneParamsCann.metalSpecular,
                                             shininess: sceneParamsCann.metalShininess});
  var footSphere = new THREE.Mesh( footGeometry, footMaterial );
  
  //------------------------------------------------------------
  // Difficult to modularize this part of the code in order to 
  // prevent parts of the calf and foot from sticking out improperly
  //------------------------------------------------------------
  thighSphere.scale.set(.3,1,.3);
  thighSphere.rotation.z = Math.PI/2.5;

  calfSphere.scale.set(.2,.6,.2);
  calfSphere.rotation.z = -Math.PI/5;
  calfSphere.position.x = sceneParamsCann.legRadius*.55;
  calfSphere.position.y = -sceneParamsCann.legRadius*.6;
  footSphere.position.y = -sceneParamsCann.legRadius*.8;
  footSphere.scale.set(.15,.4,.2);
  footSphere.rotation.z = Math.PI/2.5;
  footSphere.position.x = sceneParamsCann.legRadius*.5;
  footSphere.position.y = -sceneParamsCann.legRadius*1.1;


  leg.add(calfSphere);
  leg.add(thighSphere);
  leg.add(footSphere);

  //three other legs are cloned to produce identical legs
  var leg2 = leg.clone();
  var leg3 = leg.clone();
  var leg4 = leg.clone();

  //legs are rotated to be equally spaced from each other
  leg.position.y = sceneParamsCann.legRadius*1.2;
  leg.position.x = sceneParamsCann.cylinderRadius;

  leg2.position.y = sceneParamsCann.legRadius*1.2;
  leg2.position.x = -sceneParamsCann.cylinderRadius;
  leg2.rotation.y = Math.PI;

  leg3.position.y = sceneParamsCann.legRadius*1.2;
  leg3.position.z = -sceneParamsCann.cylinderRadius;
  leg3.rotation.y = Math.PI/2;

  leg4.position.y = sceneParamsCann.legRadius*1.2;
  leg4.position.z = sceneParamsCann.cylinderRadius;
  leg4.rotation.y = -Math.PI/2;

  legs.add(leg);
  legs.add(leg2);
  legs.add(leg3);
  legs.add(leg4);

  return legs;

}

//------------------------------------------------------------
// Creates the top handle of the water cannister which consists
// of two cylinders intersecting one another. one is larger than
// the other
//------------------------------------------------------------
function createHandle(){
  var handle = new THREE.Object3D(); //handle contains both cylinders

  var geometry = new THREE.CylinderGeometry( sceneParamsCann.handleRadius, sceneParamsCann.handleRadius, sceneParamsCann.handleHeight, sceneParamsCann.radiusSegments );
  var material = new THREE.MeshPhongMaterial({color: sceneParamsCann.metalColor,
                                             specular: sceneParamsCann.metalSpecular,
                                             shininess: sceneParamsCann.metalShininess});
  var cylinder1 = new THREE.Mesh( geometry, material );

  cylinder1.rotation.x = (Math.PI /2);
  cylinder1.position.y = (sceneParamsCann.handleHeight *.6)/2;


  var geometry2 = new THREE.CylinderGeometry( sceneParamsCann.handleRadius, sceneParamsCann.handleRadius, sceneParamsCann.handleHeight, sceneParamsCann.radiusSegments );
  var material2 = new THREE.MeshPhongMaterial({color: sceneParamsCann.metalColor,
                                             specular: sceneParamsCann.metalSpecular,
                                             shininess: sceneParamsCann.metalShininess});
  var cylinder2 = new THREE.Mesh( geometry, material );
  cylinder2.scale.set(.8,.6,.8);

  handle.add(cylinder1);
  handle.add(cylinder2);

  return handle;

}

//------------------------------------------------------------
// Creates the body of the water cannister using a CatmullRomCurve3
// and a lathe object
//------------------------------------------------------------
function createCylinder(){

  var geometry = new THREE.CylinderGeometry( sceneParamsCann.cylinderRadius, sceneParamsCann.cylinderRadius, sceneParamsCann.cylinderHeight, sceneParamsCann.radiusSegments );
  var material = new THREE.MeshPhongMaterial({color: sceneParamsCann.metalColor,
                                             specular: sceneParamsCann.metalSpecular,
                                             shininess: sceneParamsCann.metalShininess});
  var cylinder = new THREE.Mesh( geometry, material );
  return cylinder;
}

//------------------------------------------------------------
// Creates vertices for the Catmull object
//------------------------------------------------------------
function makeVertices(points) {
    var i;
    var pts = [];
    for( i = 0; i < points.length; i++) {
        var p = points[i]; 
        pts.push(new THREE.Vector3( p[0], p[1], 0));
    }

    return pts;
}
  
//------------------------------------------------------------
// Actually uses THREE.CatmullRomCurve3 instead of catmullObj as a substitute
//------------------------------------------------------------  
function remakeCatmullObj(catmull) { //catmulrom etc

  var catmullVertices = [ [5, 0],
               [4, 2],
               [1, 4],
               [3, 2],
               [1.5, 5],
               [.5, 5.5] ];

    var mat = new THREE.MeshPhongMaterial({color: sceneParamsCann.metalColor,
                                             specular: sceneParamsCann.metalSpecular,
                                             shininess: sceneParamsCann.metalShininess});
    curve = new THREE.CatmullRomCurve3 ( makeVertices(catmullVertices) );
    var geom = new THREE.Geometry();
    geom.vertices = curve.getPoints(5);
    catmullObj = new THREE.Line( geom, new THREE.LineBasicMaterial( { linewidth: 3, color: 0x00ff00 }) );
    catmullObj.name = "catmull";

    return catmullObj;
}

//------------------------------------------------------------
// Makes Lathe object using vertices from catmullObj.
//------------------------------------------------------------
function remakeLatheObj(lathe) {
    scene.remove(lathe);
    var geom = new THREE.LatheGeometry( catmullObj.geometry.vertices );
    var mat1 = new THREE.MeshPhongMaterial({color: sceneParamsCann.metalColor,
                                             opacity: 0.6, 
                                             specular: sceneParamsCann.metalSpecular,
                                             shininess: sceneParamsCann.metalShininess,
                                             side: THREE.DoubleSide, 
                                             wireframe: false,
                                           });
    latheObj = new THREE.Mesh (geom, mat1);
    latheObj.name = "lathe";

    return latheObj;
}

function createCannister(){

can = new THREE.Object3D();

var catmullObj;
var latheObj;
var catmullStand = remakeCatmullObj(catmullObj);
var latheStand = remakeLatheObj(latheObj);
var body = createCylinder();
var cannisterHandle = createHandle();
var leg = createLeg();

latheStand.position.y = sceneParamsCann.cylinderHeight + sceneParamsCann.legRadius;
body.position.y = sceneParamsCann.cylinderHeight/2 + sceneParamsCann.legRadius;
cannisterHandle.position.y = (sceneParamsCann.cylinderHeight * 1.5 - sceneParamsCann.handleHeight*.6) + sceneParamsCann.legRadius;

can.add(latheStand);
can.add(body);
can.add(cannisterHandle);
can.add(leg);

return can;
}

//------------------------------------------------------------
// creates and repositions the counter
//------------------------------------------------------------
function createCounter(){

count = new THREE.Object3D();

var base = createBase();
var top = createTop();

base.position.y = sceneParamsCounter.baseRadius;
top.position.y = sceneParamsCounter.baseRadius;

count.add(base);
count.add(top);

return count;

}

//------------------------------------------------------------
// adds all objects in the scene. Thsi includes the cannister, counter, and stools
//------------------------------------------------------------
cannister = createCannister();
cannister2 = cannister.clone();
counter = createCounter();

counter.scale.set(2,2,2);

cannister.position.x = -15
cannister.position.y = sceneParamsCounter.counterRadius*1.6;
cannister2.position.y = sceneParamsCounter.counterRadius*1.6;
cannister2.position.x = -30;

stools = new THREE.Object3D();
stool = barStool(sceneParamsCounter.woodColor);
stool.scale.set(.5,.5, .5);
stool.position.x = -30;
stool.position.z = 32;

stool2 = stool.clone();
stool2.position.x = -47;
stool2.position.z = 12;

stool3= stool.clone();
stool3.position.x = -10;
stool3.position.z = 52;

stools.add(stool,stool2,stool3);
stools.scale.set(1.2,1.2,1.2);

indoorScene.add(cannister);
indoorScene.add(cannister2);
indoorScene.add(counter);
indoorScene.add(stools);
// indoorScene.add(stool);
// indoorScene.add(stool2);
// indoorScene.add(stool3);

return indoorScene;

}