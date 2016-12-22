//   Water Cannister by Adrianna Tan

//   Copyright (C) 2016  Adrianna Tan <atan4@wellesley.edu>
//   December 2016

//   This program is free software: you can redistribute it and/or modify
//   it under the terms of the GNU General Public License as published by
//   the Free Software Foundation, either version 3 of the License, or
//   (at your option) any later version.

//   This program is distributed in the hope that it will be useful,
//   but WITHOUT ANY WARRANTY; without even the implied warranty of
//   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//   GNU General Public License for more details.

//   You should have received a copy of the GNU General Public License
//   along with this program.  If not, see <http://www.gnu.org/licenses/>.

//   This program creates an untextured bar stool that can change the color
//   of the seat

//   The back of the counter is aligned along the x axis 

//------------------------------------------------------------
// Function is called to create a wood-colored counter
//------------------------------------------------------------
function createCounter(){

var counter = new THREE.Object3D();

var sceneParams = {
  counterRadius: 10,
  counterRadiusSegments:32,
  radiusSegments: 2,
  tubularSegments: 30,
  metalColor: 0x808080,
  metalSpecular: 0x444444,
  woodColor: 0x512B1E,
  counterTopColor: 0x3C2B13,
  metalShininess: 5,
  baseRadius: 4,
  spotlightColor: 0xffffff,
}

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

var geometry = new THREE.TubeGeometry( curve, sceneParams.tubularSegments, sceneParams.baseRadius, sceneParams.radiusSegments, false );
var material = new THREE.MeshBasicMaterial( { color: sceneParams.woodColor } );
var mesh = new THREE.Mesh( geometry, material );

counter.add(mesh);
}

createBase();

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
var material = new THREE.MeshBasicMaterial( {color: sceneParams.counterTopColor, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( geometry, material );

plane.rotation.x = Math.PI/2;
plane.rotation.z = Math.PI/1.9;
plane.position.y = sceneParams.baseRadius;

//second counter surface
var geometry2 = new THREE.PlaneGeometry( 7, 40, 32 );
var material2 = new THREE.MeshBasicMaterial( {color: sceneParams.counterTopColor, side: THREE.DoubleSide} );
var plane2 = new THREE.Mesh( geometry2, material2 );

plane2.rotation.x = Math.PI/2;
plane2.rotation.z = -Math.PI/4;
plane2.position.y = sceneParams.baseRadius;
plane2.position.x = -15;
plane2.position.z = 17;

//third counter surface
var geometry3 = new THREE.PlaneGeometry( 6.7, 42, 32 );
var material3 = new THREE.MeshBasicMaterial( {color: sceneParams.counterTopColor, side: THREE.DoubleSide} );
var plane3 = new THREE.Mesh( geometry3, material3 );

plane3.rotation.x = Math.PI/2;
plane3.rotation.z = -Math.PI/1.3;
plane3.position.y = sceneParams.baseRadius;
plane3.position.x = 14;
plane3.position.z = 17;

//first corner
var geometryCorner = new THREE.SphereGeometry( 6.1, 32, 32 );
var materialCorner = new THREE.MeshBasicMaterial( {color: sceneParams.counterTopColor} );
var sphereCorner = new THREE.Mesh( geometryCorner, materialCorner );

sphereCorner.scale.set(.75,0,1);
sphereCorner.position.y = sceneParams.baseRadius;
sphereCorner.position.x = -29

//secondcorner
var geometryCorner2 = new THREE.SphereGeometry( 3.3, 32, 32 );
var materialCorner2 = new THREE.MeshBasicMaterial( {color: sceneParams.counterTopColor} );
var sphereCorner2 = new THREE.Mesh( geometryCorner, materialCorner );

sphereCorner2.scale.set(1,0,.7);
sphereCorner2.position.y = sceneParams.baseRadius;
sphereCorner2.position.x = 25;
sphereCorner2.position.z = 3.7;
sphereCorner2.rotation.y = Math.PI/5;

//thirdcorner
var geometryCorner3 = new THREE.SphereGeometry( 4.5, 32, 32 );
var materialCorner3 = new THREE.MeshBasicMaterial( {color: sceneParams.counterTopColor} );
var sphereCorner3 = new THREE.Mesh( geometryCorner, materialCorner );

sphereCorner3.scale.set(.7,0,.75);
sphereCorner3.position.y = sceneParams.baseRadius;
sphereCorner3.position.x = .35;
sphereCorner3.position.z = 31;
sphereCorner3.rotation.y = Math.PI/2;

//topCounter object contains all surfaces on the counter top
topCounter.add(plane);
topCounter.add(plane2);
topCounter.add(plane3);
topCounter.add(sphereCorner);
topCounter.add(sphereCorner2);
topCounter.add(sphereCorner3);

counter.add(topCounter);
}

createTop();

counter.position.y = sceneParams.baseRadius;
return counter;

}


