function backBuilding(){
  
	var sceneParams = {
	  	backRoomH: 15, 
	 	backRoomD: 10,
	 	backRoomW: 50,
	  	backRoomColor: 0x433E35, //warm-toned grey
	  	glassColor: 0x82B4AB, //frostygreyteal
	  	edgeColor: 0x145851,//darkgreyteal
	  	edgeW: 5,
	  	edgeH: 3,
	  	glassW: 20,
	  	glassH: 12,
	}

var building = new THREE.Object3D();

function backRoom(){

  var roomGeometry = new THREE.BoxGeometry(	sceneParams.backRoomW,
										  	sceneParams.backRoomH,
										  	sceneParams.backRoomD);
  var materialArray = [];
  materialParams = {
  	color: sceneParams.backRoomColor,
	side: THREE.DoubleSide,
	depthTest: true,
  }

	for(var i = 0; i < 6; i++) {
	   	switch(i){
	   		case 4: 
	   			materialParams.side = THREE.BackSide;
	   			materialArray.push(new THREE.MeshPhongMaterial(
	          							materialParams));
	   			break;
	   		case 3:
	   			materialParams.color = sceneParams.edgeColor;
	   			materialArray.push(new THREE.MeshPhongMaterial(materialParams));
	   			break;

	   		default:
	          materialArray.push(new THREE.MeshPhongMaterial(materialParams));
	    }
   	}


  var roomMaterial = new THREE.MeshFaceMaterial(materialArray);
  var room = new THREE.Mesh(roomGeometry, roomMaterial);

  return room;

}


function sidePane(){
	// BOX HOLDER 
	var sidePane = new THREE.Object3D();
	// top and bottom intricate edge 

	//------------  GLASS EDGES  ---------------
	var tbEdge = new THREE.Object3D();
	var edge; 
	oneEdgeGeom = new THREE.PlaneGeometry(sceneParams.edgeW,
											sceneParams.edgeH,
											1);
                                         

	for(var i = 0; i < 5; i++){
		oneEdgeMat = new THREE.MeshPhongMaterial({color: sceneParams.edgeColor + (i*16),
	                                           shininess: 100,
	                                           side: THREE.DoubleSide, //render both sides of the material
	                                          });	
		edgeMesh = new THREE.Mesh(oneEdgeGeom,oneEdgeMat);
		edgeMesh.position.set((-((sceneParams.backRoomW/2 - sceneParams.edgeW/2))*(i+1))/5,
								((sceneParams.backRoomH/2) - (sceneParams.edgeH/2)),
			 				 .2);
		tbEdge.add(edgeMesh);
	}
	


	//------------  	GLASS 	 ---------------
	
	glassGeom = new THREE.PlaneGeometry(sceneParams.glassW,
											sceneParams.glassH,
											1);
	glassMat = new THREE.MeshPhongMaterial({color: sceneParams.glassColor,
	                                           transparent: true,
	                                           opacity: .35,
	                                           shininess: 100,
	                                           side: THREE.DoubleSide, //render both sides of the material
	                                           
	                                           });
	glassMesh = new THREE.Mesh(glassGeom,glassMat);
	glassMesh.position.set(-(sceneParams.backRoomH +sceneParams.glassH)/2,
						  0,
						  0);



	// adding it to the container 
	sidePane.add(glassMesh);
	sidePane.add(tbEdge);;
	var tbEdge2 = tbEdge.clone();
	tbEdge2.position.setY(-((sceneParams.backRoomH/2) + sceneParams.edgeW));
	tbEdge2.position.setZ(.1);
	sidePane.add(tbEdge2);


	return sidePane;

}


//------------------------------------------
// oneFront makes use of two side panels
// includes the piping for the door way 
//------------------------------------------
function oneFront(){
	wholefront = new THREE.Object3D();
	sp = sidePane();
	sp.position.set(0,0,sceneParams.backRoomD/2 + .1)
	sp.scale.set(.5,1,1);
	sp2 = sp.clone();
	sp2.position.set(sceneParams.edgeW*4,0,sceneParams.backRoomD/2 + .1);
	wholefront.add(sp);
	wholefront.add(sp2);

	//topPipingLine = new THREE.Line3(new THREE.Vector3(0,0,0), new THREE.Vector3(sceneParams.edgeW,0,0));
	//topPiping = new THREE.TubeGeometry(topPipingLine);
	//wholefront.add(topPipingLine);
	return wholefront;
}

building.add(backRoom());

front = oneFront();
front.scale.set(.75,1,1);
front.position.set(-sceneParams.edgeH*5.2,0,0);
secondFront = front.clone();
secondFront.position.set(sceneParams.edgeH*3.5,0,0);
building.add(front);
building.add(secondFront);
return building;



}
