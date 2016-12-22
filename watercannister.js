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

//   The base of the water cannister is placed at axis (0,0,0) 

function createWaterCannister(){

var cannister = new THREE.Object3D();

var sceneParams = {
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
  spotlightColor: 0xffffff
}

//------------------------------------------------------------
// Function is used in createCanister() to add the four legs to 
// the water cannister. The legs are created out of a mesh material
//------------------------------------------------------------
function createLeg(){

  var leg = new THREE.Object3D(); //each leg contains thighMaterial, calfMaterial, and footMaterial
  var legs = new THREE.Object3D(); //each leg is added

  var thighGeometry = new THREE.SphereGeometry( sceneParams.legRadius, sceneParams.radiusSegments, sceneParams.radiusSegments );
  var thighMaterial = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
  var thighSphere = new THREE.Mesh( thighGeometry, thighMaterial );

  var calfGeometry = new THREE.SphereGeometry( sceneParams.legRadius, sceneParams.radiusSegments, sceneParams.radiusSegments );
  var calfMaterial = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
  var calfSphere = new THREE.Mesh( calfGeometry, calfMaterial );

  var footGeometry = new THREE.SphereGeometry( sceneParams.legRadius*.9, sceneParams.radiusSegments, sceneParams.radiusSegments );
  var footMaterial = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
  var footSphere = new THREE.Mesh( footGeometry, footMaterial );
  
//------------------------------------------------------------
// Difficult to modularize this part of the code in order to 
// prevent parts of the calf and foot from sticking out improperly
//------------------------------------------------------------
  thighSphere.scale.set(.3,1,.3);
  thighSphere.rotation.z = Math.PI/2.5;

  calfSphere.scale.set(.2,.6,.2);
  calfSphere.rotation.z = -Math.PI/5;
  calfSphere.position.x = sceneParams.legRadius*.55;
  calfSphere.position.y = -sceneParams.legRadius*.6;
  footSphere.position.y = -sceneParams.legRadius*.8;
  footSphere.scale.set(.15,.4,.2);
  footSphere.rotation.z = Math.PI/2.5;
  footSphere.position.x = sceneParams.legRadius*.5;
  footSphere.position.y = -sceneParams.legRadius*1.1;

  leg.add(calfSphere);
  leg.add(thighSphere);
  leg.add(footSphere);

  //three other legs are cloned to produce identical legs
  var leg2 = leg.clone();
  var leg3 = leg.clone();
  var leg4 = leg.clone();

  //legs are rotated to be equally spaced from each other
  leg.position.y = sceneParams.legRadius*1.2;
  leg.position.x = sceneParams.cylinderRadius;

  leg2.position.y = sceneParams.legRadius*1.2;
  leg2.position.x = -sceneParams.cylinderRadius;
  leg2.rotation.y = Math.PI;

  leg3.position.y = sceneParams.legRadius*1.2;
  leg3.position.z = -sceneParams.cylinderRadius;
  leg3.rotation.y = Math.PI/2;

  leg4.position.y = sceneParams.legRadius*1.2;
  leg4.position.z = sceneParams.cylinderRadius;
  leg4.rotation.y = -Math.PI/2;

  legs.add(leg);
  legs.add(leg2);
  legs.add(leg3);
  legs.add(leg4);

  cannister.add(legs);
}

createLeg();

//------------------------------------------------------------
// Creates the top handle of the water cannister which consists
// of two cylinders intersecting one another. one is larger than
// the other
//------------------------------------------------------------
function createHandle(){
  var handle = new THREE.Object3D(); //handle contains both cylinders

  var geometry = new THREE.CylinderGeometry( sceneParams.handleRadius, sceneParams.handleRadius, sceneParams.handleHeight, sceneParams.radiusSegments );
  var material = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
  var cylinder1 = new THREE.Mesh( geometry, material );

  var geometry2 = new THREE.CylinderGeometry( sceneParams.handleRadius, sceneParams.handleRadius, sceneParams.handleHeight, sceneParams.radiusSegments );
  var material2 = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
  var cylinder2 = new THREE.Mesh( geometry, material );

  cylinder1.rotation.x = (Math.PI /2);
  cylinder1.position.y = (sceneParams.handleHeight *.6)/2;

  cylinder2.scale.set(.8,.6,.8);

  handle.add(cylinder1);
  handle.add(cylinder2);

  handle.position.y = (sceneParams.cylinderHeight * 1.5 - sceneParams.handleHeight*.6) + sceneParams.legRadius;

  cannister.add(handle);
}

createHandle();

//------------------------------------------------------------
// Creates the body of the water cannister using a CatmullRomCurve3
// and a lathe object
//------------------------------------------------------------
function createBody(){

  var geometry = new THREE.CylinderGeometry( sceneParams.cylinderRadius, sceneParams.cylinderRadius, sceneParams.cylinderHeight, sceneParams.radiusSegments );
  var material = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
  var cylinder = new THREE.Mesh( geometry, material );

  cylinder.position.y = sceneParams.cylinderHeight/2 + sceneParams.legRadius;

  cannister.add(cylinder);
}

createBody();

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
function remakeCatmullObj(catmull) { 

  var catmullVertices = [ [5, 0],
               [4, 2],
               [1, 4],
               [3, 2],
               [1.5, 5],
               [.5, 5.5] ];

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
    latheObj.position.y = sceneParams.cylinderHeight + sceneParams.legRadius;

    cannister.add(latheObj);
}

remakeLatheObj();

return cannister;

}

