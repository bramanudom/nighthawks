function Window(){

//-------------------------
// CREATES SCENE PARAMETERS
//-------------------------
	var sceneParams = {
	  planeWidth: 5,
	  planeHeight: 10,
	  planeSegments: 32,
	  sideColor: 0x0B4422,
	  topColor: THREE.ColorKeywords.blue,
	  botColor: THREE.ColorKeywords.purple,
	  sillHeight: 1,
	  buildingColor: 0x9B2C00,
	  sillColor: 0x734B18,

	  lightColor: 0xffffff,

	};

	var theWindow = new THREE.Object3D();



	//-------------------------
	// CREATE WINDOW PANE
	//-------------------------
	function createWindowPane(){

	var geometryPlane = new THREE.PlaneGeometry( sceneParams.planeWidth, sceneParams.planeHeight, sceneParams.planeSegments );
	var materialPlane = new THREE.MeshBasicMaterial( {color: 0x3E421A, side: THREE.DoubleSide} );
	var windowPlane = new THREE.Mesh( geometryPlane, materialPlane );

	return windowPlane;
	}

	//-------------------------
	// CREATE LEFT OUTSIDE WALL OF THE ROOM
	//-------------------------
	function createLeftOutside(){
	//creates outside building wall
	var geometryLeftWall = new THREE.PlaneGeometry( sceneParams.planeHeight*.75, sceneParams.planeHeight*2, sceneParams.planeSegments);
	var materialLeftWall = new THREE.MeshBasicMaterial( {color: sceneParams.buildingColor, side: THREE.DoubleSide} );
	var windowLeftWall = new THREE.Mesh( geometryLeftWall, materialLeftWall );
	windowLeftWall.position.x = -sceneParams.planeHeight*.375 - sceneParams.planeWidth*.5;

	return windowLeftWall;
	}


	//-------------------------
	// CREATE RIGHT OUTSIDE WALL OF THE ROOM
	//-------------------------
	function createRightOutside(){
	//creates outside building wall
	var geometryRightWall = new THREE.PlaneGeometry( sceneParams.planeHeight*.75, sceneParams.planeHeight*2, sceneParams.planeSegments);
	var materialRightWall = new THREE.MeshBasicMaterial( {color: sceneParams.buildingColor, side: THREE.DoubleSide} );
	var windowRightWall = new THREE.Mesh( geometryRightWall, materialRightWall );

	windowRightWall.position.x = (sceneParams.planeHeight*.75)*.5 + sceneParams.planeWidth*.5;

	return windowRightWall;
	}

	//-------------------------
	// CREATE TOP OUTSIDE WALL OF THE ROOM
	//-------------------------
	function createTopOutside(){
	//creates outside building wall
	var geometryTopWall = new THREE.PlaneGeometry( sceneParams.planeWidth + sceneParams.planeHeight*1.5, sceneParams.planeHeight*.75, sceneParams.planeSegments);
	var materialTopWall = new THREE.MeshBasicMaterial( {color: sceneParams.buildingColor, side: THREE.DoubleSide} );
	var windowTopWall = new THREE.Mesh( geometryTopWall, materialTopWall );

	windowTopWall.position.y = sceneParams.planeHeight - (sceneParams.planeHeight - sceneParams.planeHeight*.75)/2;

	return windowTopWall;
	}

	//-------------------------
	// CREATE BOTTOM OUTSIDE WALL OF THE ROOM
	//-------------------------
	function createBottomOutside(){
	//creates outside building wall
	var geometryBottomWall = new THREE.PlaneGeometry( sceneParams.planeWidth + sceneParams.planeHeight*1.5, sceneParams.planeHeight*.75, sceneParams.planeSegments);
	var materialBottomWall = new THREE.MeshBasicMaterial( {color: sceneParams.buildingColor, side: THREE.DoubleSide} );
	var windowBottomWall = new THREE.Mesh( geometryBottomWall, materialBottomWall );

	windowBottomWall.position.y = -sceneParams.planeHeight + (sceneParams.planeHeight - sceneParams.planeHeight*.75)/2;

	return windowBottomWall;
	}

	//-------------------------
	// CREATE WINDOWSILL #
	//-------------------------
	function createSill(){

		var sillGeometry = new THREE.BoxGeometry( sceneParams.planeWidth, sceneParams.sillHeight, sceneParams.sillHeight*.5);
		var sillMaterial = new THREE.MeshBasicMaterial( {color: sceneParams.sillColor} );
		var sill = new THREE.Mesh( sillGeometry, sillMaterial );

		sill.position.y = -sceneParams.planeHeight*.5 - sceneParams.sillHeight*.5;
		sill.position.z = sceneParams.sillHeight*.5;

		return sill;
	}

	//-------------------------
	// CREATE THE INSIDE ROOM  
	//-------------------------
	function createRoom(){
	//Creating the environment --> the room
	var roomGeometry = new THREE.BoxGeometry(sceneParams.planeHeight,sceneParams.planeHeight,sceneParams.planeHeight);
	var materialArray = [];

	// [+X, -X, +Y, -Y, -Z, +Z]
	// [right, left, ceiling, floor, back, front]
	var faceColors = [sceneParams.sideColor, sceneParams.sideColor, sceneParams.topColor, sceneParams.botColor, sceneParams.sideColor,sceneParams.sideColor ];

	for(var i = 0; i < 6; i++) {
	    materialArray.push(new THREE.MeshPhongMaterial({
	        color: faceColors[i],
	        side: THREE.BackSide}));
	        }

	var roomMaterial = new THREE.MeshFaceMaterial(materialArray);
	var room = new THREE.Mesh(roomGeometry, roomMaterial);

	return room;
	}

	function createWholeRoom(){
		var wholeRoom = new THREE.Object3D();

		left = createLeftOutside();
		right = createRightOutside();
		topp = createTopOutside();
		bottom = createBottomOutside();
		windowSill = createSill(); 
		windowPane = createWindowPane();
		roomInside = createRoom();

		roomInside.position.z = -sceneParams.planeHeight*.5;
		roomInside.position.x = -(sceneParams.planeHeight - sceneParams.planeWidth) * .5
		windowPane.position.y = Math.floor(Math.random() * 6) + 1  ;
		windowPane.position.z = -.07

		wholeRoom.add(left);
		wholeRoom.add(right);
		wholeRoom.add(topp);
		wholeRoom.add(bottom);
		wholeRoom.add(windowSill);
		wholeRoom.add(windowPane);
		wholeRoom.add(roomInside);

		return wholeRoom;
	}

	// createWholeRoom();

	function createBuilding(rows,columns){
	//creates array matrix containing information about the rows and columns of rooms in the building
	var rooms = [];
	//adds rooms to the scene
	for(var j = 0; j < rows; j++) {
		rooms.push([]);
		for(var k = 0; k < columns; k++) {
	    	rooms[j].push(createWholeRoom());
	    	// rooms[j][k].position.x = k*2*(sceneParams.planeWidth*.5 + sceneParams.planeHeight*.75);
	    	// rooms[j][k].position.y = -j*2*(sceneParams.planeHeight*.5 + sceneParams.planeHeight*.75);
	    	// scene.add(rooms[j]);
	    	console.log("adding room to scene");
	    }
	}
	return rooms[0][0];

	}

	var building = createBuilding(3,2);
	theWindow.add(building);
	return theWindow;
}