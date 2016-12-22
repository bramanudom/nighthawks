//creates the outside of the store
function createStoreFront(){

var storeFront = new THREE.Object3D();

var sceneParams = {
  counterRadius: 10,
  counterRadiusSegments:32,
  radiusSegments: 2,
  tubularSegments: 30,
  woodColor: 0x00B777,
  windowColor: 0xffffff,
  wallColor: 0xEEEEB9,
  metalShininess: 5,
  baseRadius: 4,
  spotlightColor: 0xffffff,
  spotlightExponentt: 100,
  sideWallHeight: 48,
  sideWallWidth: 25,
  sideWallDepth: 4,
  backWallWidth: 60,
  sideShortWallWidth: 20,
  ceilingRectangleHeight: 60,
  ceilingRectangleWidth: 20,
  ceilingSpotRadius: 20,
}

//------------------------------------------------------------
// Creates the outside view of the store. Windows are created and colored 
// as a transparent object.
//------------------------------------------------------------
function createStore(){

front = new THREE.Object3D();

var curve = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( 15, 0, -25),
  new THREE.Vector3( -30, 0, 10 ),
  new THREE.Vector3( 35, 0, 30 )
] );

var geometry = new THREE.TubeGeometry( curve, sceneParams.tubularSegments, sceneParams.baseRadius, sceneParams.radiusSegments, false );
var material = new THREE.MeshBasicMaterial( { color: sceneParams.woodColor } );
var mesh = new THREE.Mesh( geometry, material );

var curveWindow = new THREE.CatmullRomCurve3( [
  new THREE.Vector3( 15, 0, -25),
  new THREE.Vector3( -30, 0, 10 ),
  new THREE.Vector3( 35, 0, 30 )
] );

var geometryWindow = new THREE.TubeGeometry( curveWindow, sceneParams.tubularSegments, sceneParams.baseRadius, sceneParams.radiusSegments, false );
var materialWindow = new THREE.MeshBasicMaterial( { color: sceneParams.windowColor , transparent: true, opacity: 0.3 } );
var meshWindow = new THREE.Mesh( geometryWindow, materialWindow );

meshWindow.scale.set(1,4,1);
meshWindow.position.y = sceneParams.baseRadius*5;

var geometryWall = new THREE.BoxGeometry( sceneParams.sideWallWidth, sceneParams.sideWallHeight, sceneParams.sideWallDepth*1.5 );
var materialWall = new THREE.MeshBasicMaterial( {color: sceneParams.wallColor} );
var sideWall = new THREE.Mesh( geometryWall, materialWall );

sideWall.rotation.y = Math.PI/8;
sideWall.position.x = 20;
sideWall.position.z = -25;
sideWall.position.y = 20;

var geometryBackWall = new THREE.BoxGeometry( sceneParams.backWallWidth*1.01, sceneParams.sideWallHeight*1.01, sceneParams.sideWallDepth );
var materialBackWall = new THREE.MeshBasicMaterial( {color: sceneParams.wallColor} );
var backWall = new THREE.Mesh( geometryBackWall, materialBackWall );

backWall.rotation.y = Math.PI/1.6;
backWall.position.y = 20;
backWall.position.x = 42;
backWall.position.z = -3.7;

var geometryShortWall = new THREE.BoxGeometry( sceneParams.sideShortWallWidth, sceneParams.sideWallHeight, sceneParams.sideWallDepth );
var materialShortWall = new THREE.MeshBasicMaterial( {color: sceneParams.wallColor} );
var sideShortWall = new THREE.Mesh( geometryShortWall, materialShortWall );

sideShortWall.rotation.y = Math.PI/8;
sideShortWall.position.x = 45;
sideShortWall.position.z = 27;
sideShortWall.position.y = 20;

var geometryRoof = new THREE.TubeGeometry( curve, sceneParams.tubularSegments, sceneParams.baseRadius, sceneParams.radiusSegments, false );
var materialRoof = new THREE.MeshBasicMaterial( { color: sceneParams.woodColor } );
var meshRoof = new THREE.Mesh( geometryRoof, materialRoof );

meshRoof.position.y = 40;

front.add(meshRoof);
front.add(sideShortWall);
front.add(sideWall);
front.add(backWall);
front.add(mesh);
front.add(meshWindow);

front.position.y = sceneParams.baseRadius;

storeFront.add(front);
}

createStore();

//------------------------------------------------------------
// Creates the ceiling of the store. Uses a combination of planes
// and circleGeometry objects. Will also be used for the
// floor of the store. This code isn't modular at all because
// it was difficult to get the planes to fit the paths of the 3D
// vectors. Had to use arbitrary constants to get the counter to fit
// well. 
// 
// Takes in color as a parameter
//------------------------------------------------------------
function createCeiling(c){

  ceiling = new THREE.Object3D();

  var geometry = new THREE.PlaneGeometry( sceneParams.ceilingRectangleHeight, sceneParams.ceilingRectangleWidth );
  var material = new THREE.MeshBasicMaterial( {color: c || sceneParams.wallColor, side: THREE.DoubleSide} );
  var rectangle = new THREE.Mesh( geometry, material );

  var geometry2 = new THREE.PlaneGeometry( sceneParams.ceilingRectangleHeight*.85, sceneParams.ceilingRectangleWidth*.95 );
  var material2 = new THREE.MeshBasicMaterial( {color: c || sceneParams.wallColor, side: THREE.DoubleSide} );
  var rectangle2 = new THREE.Mesh( geometry2, material2 );

  var geometry3 = new THREE.PlaneGeometry( sceneParams.ceilingRectangleHeight, sceneParams.ceilingRectangleWidth*.9);
  var material3 = new THREE.MeshBasicMaterial( {color: c || sceneParams.wallColor, side: THREE.DoubleSide} );
  var rectangle3 = new THREE.Mesh( geometry3, material3 );

  var geometrySpot = new THREE.PlaneGeometry( sceneParams.ceilingSpotRadius*1.2, sceneParams.ceilingSpotRadius*1.2 );
  var materialSpot = new THREE.MeshBasicMaterial( { color: c || sceneParams.wallColor, side: THREE.DoubleSide} );
  var spot = new THREE.Mesh( geometrySpot, materialSpot );

  var geometryCorner = new THREE.CircleGeometry( sceneParams.ceilingSpotRadius*.5, sceneParams.counterRadiusSegments);
  var materialCorner = new THREE.MeshBasicMaterial( { color: c || sceneParams.wallColor, side: THREE.DoubleSide} );
  var spotCorner = new THREE.Mesh( geometryCorner, materialCorner );

  ceiling.add(rectangle);
  ceiling.add(rectangle2);
  ceiling.add(rectangle3);
  ceiling.add(spot);
  spot2 = spot.clone();
  ceiling.add(spot2);
  ceiling.add(spotCorner);

  ceiling.rotation.x = Math.PI/2;

  rectangle.rotation.z = Math.PI/2.6;
  rectangle.position.y= -2;
  rectangle.position.x = 34.5;

  rectangle2.rotation.z = Math.PI/.356;
  rectangle2.position.y = -4;
  rectangle2.position.x = 0;

  rectangle3.position.x = 7;
  rectangle3.position.y = 14.5;
  rectangle3.rotation.z = Math.PI/.2454;

  spot.position.y= 0;
  spot2.position.y= 0;
  spot.position.x= 17;
  spot2.position.x= 17;
  spot.rotation.x= -Math.PI;

  spotCorner.position.x = -20;
  spotCorner.position.y= 9;
  spotCorner.rotation.x = -Math.PI;
  spotCorner.scale.set(1,.8,1);

  ceiling.position.y = sceneParams.sideWallHeight;

  storeFront.add(ceiling);
  }

  createCeiling();

return storeFront;
}