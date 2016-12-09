
// HWK6: Creative Scene
// Library Contribution by Adrianna Tan

/*
  Copyright (C) 2016  Adrianna Tan <atan4@wellesley.edu>
  11/17/2016

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.

  This program creates an untextured bar stool that can change the color
  of the seat

  The base of the stool is placed at axis (0,0,0)
*/

//------------------------------------------------------------
// Function is called to create stool. Takes in the optional 
// parameter of color.
//------------------------------------------------------------
function barStool(color){

var stool = new THREE.Object3D();

var sceneParams = {
  topCylinder: 6,
  botCylinder: 6,
  cylinderHeight: 3,
  radiusSegments: 32,
  metalColor: 0x808080,
  metalSpecular: 0x444444,
  seatColor: 0xFF0000,
  seatShininess: 30,
  metalShininess: 5,
  sphereRadius: 15,
  phiStart: Math.PI/2,
  phiLength: 6.3,
  thetaStart: 0 ,
  thetaLength: 0.4,
  torusRadius: 5,
  torusTube: .5,
  torusArc: 100,
  standHeight: 25,
  topPole: .5,
  bottomPole:.5,
  poleHeight: 10
}


//------------------------------------------------------------
// Creates the seat part of the bar stool. The height is positioned
// based on the height of the stand.
//------------------------------------------------------------
function createCylinder(){
var geometry = new THREE.CylinderGeometry( sceneParams.topCylinder, sceneParams.botCylinder, sceneParams.cylinderHeight, sceneParams.radiusSegments );
var material = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
var cylinder = new THREE.Mesh( geometry, material );

cylinder.position.y = sceneParams.standHeight + sceneParams.cylinderHeight/2
stool.add(cylinder);
}

createCylinder();

//------------------------------------------------------------
// Creates the foot rest part of the stool, which is supported
// by a pole made of a horizontal cylinder.
//------------------------------------------------------------
function createFootRest(){
var geometry = new THREE.TorusGeometry( sceneParams.torusRadius, sceneParams.torusTube, sceneParams.radiusSegments, sceneParams.torusArc );
var material = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
var torus = new THREE.Mesh( geometry, material );

torus.rotation.x = (Math.PI/2);
torus.position.y = sceneParams.standHeight*.5; //we want to position the footrest around half the height of the stand.

torus.rotate;

stool.add(torus);
}

createFootRest();

//------------------------------------------------------------
// Creates the connection pole to support the foot rest
//------------------------------------------------------------
function createFootRestConnections(){
var geometry = new THREE.CylinderGeometry( sceneParams.topPole, sceneParams.bottomPole, sceneParams.poleHeight, sceneParams.radiusSegments );
var material = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
var pole = new THREE.Mesh( geometry, material );

pole.position.y = sceneParams.standHeight*.5;
pole.rotation.x = (Math.PI/2);

stool.add(pole);
}

createFootRestConnections();


//------------------------------------------------------------
// Creates the seat cover using a sphere. phiStart, phiLength,
// and thetaStart are altered to display only parts of the sphere
//------------------------------------------------------------
function createSeatCover(){

var geometry = new THREE.SphereGeometry( sceneParams.sphereRadius, sceneParams.radiusSegments, sceneParams.radiusSegments, sceneParams.phiStart, sceneParams.phiLength, sceneParams.thetaStart, sceneParams.thetaLength );
var material = new THREE.MeshPhongMaterial({color: color || sceneParams.seatColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.seatShininess});
var sphere = new THREE.Mesh( geometry, material );

sphere.position.y = 14.15; 

stool.add(sphere);
}

createSeatCover();

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
// Uses THREE.CatmullRomCurve3 instead of catmullObj as a substitute
//------------------------------------------------------------
function remakeCatmullObj() { 

  var catmullVertices = [ [7, 0],
               [1.5, 2],
               [.75, 4],
               [.75, 6],
               [.75, sceneParams.standHeight] ];

    var mat = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
    curve = new THREE.CatmullRomCurve3 ( makeVertices(catmullVertices) );
    var geom = new THREE.Geometry();
    geom.vertices = curve.getPoints(5);
    catmullObj = new THREE.Line( geom, new THREE.LineBasicMaterial( { linewidth: 3, color: 0x00ff00 }) );
    catmullObj.name = "catmull";

    return catmullObj;
}

remakeCatmullObj();

//------------------------------------------------------------
// Makes Lathe object using vertices from catmullObj.
//------------------------------------------------------------
function remakeLatheObj() {
    var geom = new THREE.LatheGeometry( catmullObj.geometry.vertices );
    var mat1 = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             opacity: 0.6, 
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess,
                                             side: THREE.DoubleSide, 
                                             wireframe: false,
                                           });
    latheObj = new THREE.Mesh (geom, mat1);
    latheObj.name = "lathe";

    stool.add(latheObj);
}

remakeLatheObj();

return stool;
}