// crates the bottom floor of extraneous buildings in the nighthawk's scene
function backBuilding(){
	// some parameters
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
	//------------------------------------------
	// Creates the actual room, leaves the front empty 
	//------------------------------------------
	function backRoom(){
		var roomGeometry = new THREE.BoxGeometry(	sceneParams.backRoomW,
											  	sceneParams.backRoomH,
											  	sceneParams.backRoomD);

		// different walls of the room are of different material 
		var materialArray = [];

		// this is the starting, default paramters for the materials
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
			   	case 2:
			   		materialParams.color = sceneParams.edgeColor;
			   		materialArray.push(new THREE.MeshPhongMaterial(materialParams));
			   		break;

			   	default:
			   		materialParams.color = sceneParams.backRoomColor;
			   		materialParams.side = THREE.DoubleSide;
			      	materialArray.push(new THREE.MeshPhongMaterial(materialParams));
			}
		}


		var roomMaterial = new THREE.MeshFaceMaterial(materialArray);
		var room = new THREE.Mesh(roomGeometry, roomMaterial);

		return room;
	}

	//------------------------------------------
	// sidePane creates the window pain that spans the the front of the bottom floor
	// the paints consist of two intricate edges that frame a glass window 
	//------------------------------------------

	function sidePane(){
		
		var sidePane = new THREE.Object3D();
		
		//------------  GLASS EDGES  ---------------
		var tbEdge = new THREE.Object3D();
		var edge; 
		oneEdgeGeom = new THREE.PlaneGeometry(	sceneParams.edgeW,
												sceneParams.edgeH,
												1);
	                                         

		for(var i = 0; i < 5; i++){
			// to make the edge a little more interesting, create a color gradient
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
		glassMesh.position.set(-(sceneParams.backRoomH +sceneParams.glassH)/2, 0, 0);

		// adding all components to the container 
		sidePane.add(glassMesh);
		sidePane.add(tbEdge);;
		var tbEdge2 = tbEdge.clone();
		tbEdge2.position.setY(-((sceneParams.backRoomH/2) + sceneParams.edgeW));
		tbEdge2.position.setZ(.1);
		sidePane.add(tbEdge2);

		return sidePane;

	}


	//------------------------------------------
	// oneFront makes use of the two side panes
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

		return wholefront;
	}

	building.add(backRoom());

	// the back building contains to fronts 
	front = oneFront();
	front.scale.set(.75,1,1);
	front.position.set(-sceneParams.edgeH*5.2,0,0);
	secondFront = front.clone();
	secondFront.position.set(sceneParams.edgeH*3.5,0,0);
	building.add(front);
	building.add(secondFront);

	return building;

}
