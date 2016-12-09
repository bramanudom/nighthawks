//water cannister

//------------------------------------------------------------
// Function is called to create water cannister.
//------------------------------------------------------------
function waterCannister(){

var waterCannister = new THREE.Object3D();

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
}


//------------------------------------------------------------
// Function is called to create four legs equally spaced out
// to hold the water cannister upright
//------------------------------------------------------------
function createLeg(){

  var leg = new THREE.Object3D();
  var legs = new THREE.Object3D();

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

  var leg2 = leg.clone();
  var leg3 = leg.clone();
  var leg4 = leg.clone();

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

  waterCannister.add(legs);
}

createLeg();

//------------------------------------------------------------
// Function is called to create the top handle of the cannister
//------------------------------------------------------------
function createHandle(){
  var handle = new THREE.Object3D();

  var geometry = new THREE.CylinderGeometry( sceneParams.handleRadius, sceneParams.handleRadius, sceneParams.handleHeight, sceneParams.radiusSegments );
  var material = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
  var cylinder1 = new THREE.Mesh( geometry, material );

  cylinder1.rotation.x = (Math.PI /2);
  cylinder1.position.y = (sceneParams.handleHeight *.6)/2;


  var geometry2 = new THREE.CylinderGeometry( sceneParams.handleRadius, sceneParams.handleRadius, sceneParams.handleHeight, sceneParams.radiusSegments );
  var material2 = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
  var cylinder2 = new THREE.Mesh( geometry, material );
  cylinder2.scale.set(.8,.6,.8);

  handle.add(cylinder1);
  handle.add(cylinder2);

  waterCannister.add(handle);

}

createHandle();

function createCylinder(){

  var geometry = new THREE.CylinderGeometry( sceneParams.cylinderRadius, sceneParams.cylinderRadius, sceneParams.cylinderHeight, sceneParams.radiusSegments );
  var material = new THREE.MeshPhongMaterial({color: sceneParams.metalColor,
                                             specular: sceneParams.metalSpecular,
                                             shininess: sceneParams.metalShininess});
  var cylinder = new THREE.Mesh( geometry, material );

  waterCannister.add(cylinder);
}

createCylinder();

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

  var catmullVertices = [ [3,0,0],
               [0,0,3],
               [-3,0,0]
               ];

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
function remakeLatheObj(lathe) {
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

    waterCannister.add(latheObj);
}

remakeLatheObj();

return waterCannister;
}