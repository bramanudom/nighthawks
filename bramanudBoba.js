/*
  Copyright (C) 2016 Budnampet Ramanudom (bramanud@wellesley.edu)

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


  This program creates a model of a boba drink (otherwise known as bubble tea on the east coast).
  To create the Boba object, call on the function. The function takes in optional paramters (color, cupheight),
  where color is a color hexCode and cupHeight is an integer. Without these paramters, the Boba object
  has a default height of 10 and the drink is the color of Thai Tea. The program makes use of sphere geometries, 
  cylinder geometries, and a Tube Geometry that makes use of a bezier curve. 
  This program creates an untextured fish with a series of sphere geometries
  and bezier surfaces.
  Colors/Textures: none
  Default Size: height 10, cup top radius 5, bottom radius 3


*/


//------------------------------------------------------------
// MAIN FUNCTION: Creates the enture boba object
//------------------------------------------------------------

function Boba(color,cupHeight){

  var boba = new THREE.Object3D(); //container for the entire boba object
  
  var sceneParams = {
  topRadius: 5,
  botRadius: 3,
  cupHeight: 10,
  rSegs: 23,
  numBoba: 100,
  bobaRadius: .3,
  drinkColor: 0xEE9E49, //thai tea color
  drinkScale: .75,
  strawThickness: .5,
  strawColor: 0xff0000
}

//------------------------------------------------------------
// HELPER METHOD: makeCup
// Makes the cup that contains the drink as well as the lid
// The cup and the lid are slightly transparent
//------------------------------------------------------------
  function makeCup(params, cupHeight){
    lid = new THREE.CylinderGeometry(((cupHeight/params.cupHeight)*params.topRadius)||params.topRadius,
                                      ((cupHeight/params.cupHeight)*6)||6,
                                      params.drinkScale,
                                      23); 

    cup = new THREE.CylinderGeometry(((cupHeight/params.cupHeight)*params.topRadius) ||params.topRadius, 
                                     ((cupHeight/params.cupHeight)*params.botRadius) ||params.botRadius, 
                                     cupHeight|| params.cupHeight, 
                                     params.rSegs);
    cupMat  = new THREE.MeshPhongMaterial({color: 0xF1EDEE,
                                           transparent: true,
                                           opacity: .35,
                                           shininess: 100,
                                           side: THREE.DoubleSide, //render both sides of the material
                                           depthTest: true//prevents the inside contents of the cup from 
                                                            // disappearing in certain camera angles

                                         });
    cupMesh = new THREE.Mesh(cup,cupMat);
    lidMesh = new THREE.Mesh(lid,cupMat);
    boba.add(cupMesh);
    boba.add(lidMesh);
    cupMesh.position.set(0,0,0);
    lidMesh.position.set(0,(cupHeight/2||params.cupHeight/2)+(.75/2),0);
  }

  makeCup(sceneParams,cupHeight);




//------------------------------------------------------------
// HELPER METHOD: makeBoba
// The bobas are little spheres inside the drink. The balls themselves are not transparent and all have the same radii
// 100 of them are created and they all have a randomized x, y, and z value for position 
//------------------------------------------------------------
  function makeBoba(params,cupHeight){
    // boba balls are shiny
    bobaMaterial = new THREE.MeshPhongMaterial({color: 0x40111E,
                                                side: THREE.DoubleSide
                                              });

    miny = (-(cupHeight|| params.cupHeight)/2)+(params.bobaRadius*2); // account for the bobaball and drink displacement
    maxy = -.25 // boba should only be in the bottom fourth of the cup
    minx =  ( (-((cupHeight/params.cupHeight)*params.botRadius||params.botRadius)* params.drinkScale) + (params.bobaRadius*2));
   // console.log('the minx is: ' + minx);
    maxx =  (((cupHeight/params.cupHeight)*params.botRadius||params.botRadius)* params.drinkScale) - (params.bobaRadius*2);
    //console.log('the maxx is: ' + maxx);


    for (i = 0; i <= params.numBoba; i++){
      // generate random x, y, and z values for the boba ball that is constrained inside the drink
      randy = (Math.random()*(maxy-miny))+miny;
      randx = (Math.random()*(maxx-minx))+minx;
      randz = (Math.random()*(maxx-minx))+minx;

      //create a new boba ball
      bobaBall = new THREE.Mesh(new THREE.SphereGeometry((cupHeight/params.cupHeight)*params.bobaRadius || params.bobaRadius),
                                                          bobaMaterial);
      boba.add(bobaBall);
      bobaBall.position.set(randx,randy,randz);
      
    }
  }

  makeBoba(sceneParams,cupHeight)


//------------------------------------------------------------
// HELPER METHOD: makeDrink
//The drink is a scaled cylinder that fills the inside of the cup
// note that it is also transparaent. It takes in optional parameters color and cupHeight
//------------------------------------------------------------

  function makeDrink(params,color,cupHeight){
    drink = new THREE.CylinderGeometry( ((cupHeight/params.cupHeight)*params.topRadius)*params.drinkScale 
                                              ||params.topRadius* params.drinkScale, 
                                        ((cupHeight/params.cupHeight)*params.botRadius)*params.drinkScale 
                                              ||params.botRadius* params.drinkScale, 
                                        (cupHeight*params.drinkScale)
                                              || params.cupHeight* params.drinkScale, 
                                         params.rSegs);

    drinkMat  = new THREE.MeshPhongMaterial({color: color || params.drinkColor,
                                            transparent: true,
                                            opacity: .5,
                                            side: THREE.DoubleSide,
                                            depthTest: true
                                            });

    drinkMesh = new THREE.Mesh(drink,drinkMat);
    boba.add(drinkMesh);
    drinkMesh.position.set(0,(-(cupHeight || params.cupHeight)/8),0); // the drink 

  }

  makeDrink(sceneParams,color,cupHeight);


//------------------------------------------------------------
// HELPER METHOD: makeStraw
// The straw is a tubeGeometry, where the curve is a bezier
//------------------------------------------------------------

  function makeStraw(params, cupHeight){
    //only certain parts of the curve are affected by the scaling of the height of the cup (basically just the length)

  curve = new THREE.CubicBezierCurve3(
    new THREE.Vector3( 0, -((cupHeight/params.cupHeight)*params.cupHeight|| params.cupHeight)/2, 0 ),
    new THREE.Vector3( -1, 6, 0 ),
    new THREE.Vector3( -2, -2, 0 ),
    new THREE.Vector3( 0, ((cupHeight/params.cupHeight)*params.cupHeight|| params.cupHeight), 0)
  );

    geometry = new THREE.Geometry();
    geometry.vertices = curve.getPoints( 50 );
    tube  = new THREE.TubeGeometry(curve, 60, (cupHeight/params.cupHeight)*params.strawThickness || params.strawThickness);
    material = new THREE.MeshPhongMaterial( { color : params.strawColor,
                                              shininess: 25,
                                              side: THREE.DoubleSide
                                            });

    curveMesh = new THREE.Mesh(tube,material) ;

    boba.add(curveMesh);
  }

  makeStraw(sceneParams,cupHeight);

  return boba;

}



