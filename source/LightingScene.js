var degToRad = Math.PI / 180.0;
var radToDeg = 180.0 / Math.PI;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super(); 
	};

	init(application) 
	{
		super.init(application);

		this.initCameras();
		
		this.initLights();

		this.enableTextures(true);

		this.gl.clearColor(0.83, 0.93, 0.97, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);
		
		this.enableAxis = true;

		this.light_0 = true;
		this.light_1 = true;
		this.light_2 = true;
		this.light_3 = true;
		this.light_4 = true;

		this.speed = 5;
		
		this.initTextures();
	
		this.vehicleAppearanceList = {
			'jungle camouflage':0,'snow camouflage':1, 'desert camouflage':2,'gold':3};
		
		this.vehicleFrameAppearanceList = {
			'jungle camouflage':0,'snow camouflage':1, 'desert camouflage':2,'carbon':3, 'black':4};

		this.craneAppearanceList = {
			'rust':0, 'yellow rust':1, 'scratch':2 };
		
		this.terrainAppearanceList = {
			'jungle':0, 'snow':1, 'desert':2 };

		this.currVehicleAppearance = 0;
		this.currVehicleFrameAppearance = 0;
		this.currCraneAppearance = 1;
		this.currTerrainAppearance = 0;
		

		this.altimetry= [
			[ 3.0 , 4.0 , 3.0, 2.0, 1.5, 1.4, 1.3, 0.3, 0.0, 0.0, 0.0 ],
			[ 2.0 , 3.0 , 2.0, 4.0, 5.5, 2.0, 2.7, 1.3, 0.0, 0.0, 0.0 ],
			[ 4.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 3.0, 4.0, 7.5, 4.5 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 2.0, 6.0, 8.5, 5.4 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 3.0, 6.0, 4.0 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
			[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
			[ 3.0 , 2.0 , 2.0, 2.0, 3.3, 4.1, 2.1, 0.0, 0.0, 3.5, 5.0 ],
			[ 4.0 , 3.0 , 3.0, 2.0, 2.5, 2.4, 2.4, 3.5, 6.0, 7.5, 9.0 ]
		];


		// Altimetry mapping
		// If the plan[i][j] has altimetry other than 0 then it will have a value of 1 else it will have a value of 0 		
		this.planTerrain = [];
		
		for(var i = 0; i< (this.altimetry.length-1); i++){
			var plan = [];

			for(var j = 0; j< (this.altimetry.length-1); j++) {
				var alt = [ [ this.altimetry[i  ][j] ,this.altimetry[i  ][j+1] ],
							[ this.altimetry[i+1][j] ,this.altimetry[i+1][j+1] ] ];

				if (alt[0][0] > 0 || alt[0][1] > 0 || alt[1][0] > 0 || alt[1][1] > 0)
					plan.push(1);
				else 
					plan.push(0);
			}
			this.planTerrain.push(plan);
		}
		this.planTerrain.push([]);
		for(var j = 0; j<= this.altimetry.length; j++) {
			this.planTerrain[(this.planTerrain.length-1)].push(1);
		}
	
		// Coordinates of the vehicle on the planTerrain [i,j]
		this.vehicleInitialMap = [5,4];

		// Scene elements
		this.vehicle = new MyVehicle(this);
		this.terrain = new MyTerrain(this,10,this.altimetry);
        this.crane = new MyCrane(this);
        this.collectZone = new Plane(this,6);

		// Materials
		this.materialDefault = new CGFappearance(this);

		this.tireTexture = new CGFappearance(this);
		this.tireTexture.loadTexture("../resources/images/tire.jpg");

		this.wheelTexture = new CGFappearance(this);
		this.wheelTexture.loadTexture("../resources/images/wheel.png");

		this.windShield = new CGFappearance(this);
		this.windShield.setDiffuse(0.05,0.05,0.05,1);
		this.windShield.setSpecular(0.5,0.52,0.5,1);

		this.steeringwheel = new CGFappearance(this);
		this.steeringwheel.loadTexture("../resources/images/volante.jpg");

		this.seatTexture = new CGFappearance(this);
		this.seatTexture.loadTexture("../resources/images/seatFabric.png");

		this.engineTexture = new CGFappearance(this);
		this.engineTexture.loadTexture("../resources/images/engine.png");

		this.engineCoverTexture = new CGFappearance(this);
		this.engineCoverTexture.loadTexture("../resources/images/engineCover.png");

		this.vehicleTexture = new CGFappearance(this);

		this.vehicleFrameTexture = new CGFappearance(this);

		this.terrainTexture = new CGFappearance(this);
		
		this.reliefTexture = new CGFappearance(this);
		
		this.craneTexture = new CGFappearance(this);

		this.collectBase = new CGFappearance(this);

		this.blackMaterial = new CGFappearance(this);
		this.blackMaterial.setDiffuse(0,0,0,1);

		this.orangeMaterial = new CGFappearance(this);
		this.orangeMaterial.setDiffuse(0.9,0.3,0,1);

		this.redMaterial = new CGFappearance(this);
		this.redMaterial.setDiffuse(0.4,0,0,1);

		this.setUpdatePeriod(50);
	};
	
	initTextures() 
	{	
		// Vehicle textures
		var jungleCamo = new CGFappearance(this);
		jungleCamo.loadTexture("../resources/images/jungleCamo.jpg");
	
		var snowCamo = new CGFappearance(this);
		snowCamo.loadTexture("../resources/images/snowCamo.jpg");

		var desertCamo = new CGFappearance(this);
		desertCamo.loadTexture("../resources/images/desertCamo.jpg");

		var gold = new CGFappearance(this);
		gold.loadTexture("../resources/images/gold.jpg");

		this.vehicleAppearances = [
			jungleCamo,
			snowCamo,
			desertCamo,
			gold
		];
		
		// Vehicle Frame textures
		jungleCamo.setDiffuse(0.1,0.1,0.1,1);
		snowCamo.setDiffuse(0.1,0.1,0.1,1);
		desertCamo.setDiffuse(0.1,0.1,0.1,1);

		var carbon = new CGFappearance(this);
		carbon.setDiffuse(0.1,0.1,0.1,1);
		carbon.loadTexture("../resources/images/carbon.jpg");
		
		var blackMaterial = new CGFappearance(this);
		blackMaterial.setDiffuse(0,0,0,1);

		this.vehicleFrameAppearances = [
			jungleCamo,
			snowCamo,
			desertCamo,
			carbon,
			blackMaterial
		];

		// Crane textures
		var rust = new CGFappearance(this);
		rust.loadTexture("../resources/images/rust.jpg");

		var yellowRust = new CGFappearance(this);
		yellowRust.loadTexture("../resources/images/yellowRust.jpg");

		var scratch = new CGFappearance(this);
		scratch.loadTexture("../resources/images/scratch.png");

		this.craneAppearances = [
			rust,
			yellowRust,
			scratch
		];

		// Terrain textures
		var jungleTerrainTexture = new CGFappearance(this);
		jungleTerrainTexture.setDiffuse(0.8,0.8,0.8,1);
		jungleTerrainTexture.loadTexture("../resources/images/jungleTerrain.jpg");
		var snowTerrainTexture = new CGFappearance(this);
		snowTerrainTexture.setDiffuse(0.8,0.8,0.8,1);
		snowTerrainTexture.loadTexture("../resources/images/snow.jpg");
		var desertTerrainTexture = new CGFappearance(this);
		desertTerrainTexture.setDiffuse(0.8,0.8,0.8,1);
		desertTerrainTexture.loadTexture("../resources/images/terrain.jpg");

		var jungleReliefTexture = new CGFappearance(this);
		jungleReliefTexture.loadTexture("../resources/images/vegetation.jpg");
		var snowReliefTexture = new CGFappearance(this);
		snowReliefTexture.loadTexture("../resources/images/snowMountain.jpg");
		var desertReliefTexture = new CGFappearance(this);
		desertReliefTexture.loadTexture("../resources/images/sand.jpg");

		var jungleCollectBase = new CGFappearance(this);
		jungleCollectBase.loadTexture("../resources/images/junglebase.png");
		var snowCollectBase = new CGFappearance(this);
		snowCollectBase.loadTexture("../resources/images/snowBase.jpg");
		var desertCollectBase = new CGFappearance(this);
		desertCollectBase.loadTexture("../resources/images/sandBase.jpg");

		this.terrainAppearances = [
			jungleTerrainTexture,
			snowTerrainTexture,
			desertTerrainTexture
		];
		this.reliefAppearances = [
			jungleReliefTexture,
			snowReliefTexture,
			desertReliefTexture
		];
		this.collectBaseAppearance = [
			jungleCollectBase,
			snowCollectBase,
			desertCollectBase
		];
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0.1,0.1,0.1,1.0);
		
		// Positions for five lights
		this.lights[0].setPosition(0, 10, 0, 1);
		this.lights[0].setVisible(true);
		this.lights[0].setConstantAttenuation(0);
		this.lights[0].setLinearAttenuation(0.05);
		this.lights[0].setQuadraticAttenuation(0);
		this.lights[0].setAmbient(0, 0, 0, 1);
		this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[0].enable();	
			
		this.lights[1].setPosition(-15, 8, 15, 1.0);
		this.lights[1].setVisible(true);
		this.lights[1].setConstantAttenuation(0);
		this.lights[1].setLinearAttenuation(0.05);
		this.lights[1].setQuadraticAttenuation(0);
		this.lights[1].setAmbient(0, 0, 0, 1);
		this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[1].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[1].enable();
		
		this.lights[2].setPosition(-15, 12, -15, 1.0);
		this.lights[2].setVisible(true);
		this.lights[2].setConstantAttenuation(0);
		this.lights[2].setLinearAttenuation(0.05);
		this.lights[2].setQuadraticAttenuation(0);
		this.lights[2].setAmbient(0, 0, 0, 1);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].enable();

		this.lights[3].setPosition(15, 12, -15, 1.0);
		this.lights[3].setVisible(true);
		this.lights[3].setConstantAttenuation(0);
		this.lights[3].setLinearAttenuation(0.05);
		this.lights[3].setQuadraticAttenuation(0);
		this.lights[3].setAmbient(0, 0, 0, 1);
		this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[3].enable();

		this.lights[4].setPosition(15, 12, 15, 1.0);
		this.lights[4].setVisible(true);
		this.lights[4].setConstantAttenuation(0);
		this.lights[4].setLinearAttenuation(0.05);
		this.lights[4].setQuadraticAttenuation(0);
		this.lights[4].setAmbient(0, 0, 0, 1);
		this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
		this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[4].enable();
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
		
		if(this.light_0 == true)
			this.lights[0].enable();
		else
			this.lights[0].disable();

		if(this.light_1 == true)
			this.lights[1].enable();
		else
			this.lights[1].disable();
		
		if(this.light_2 == true)
			this.lights[2].enable();
		else
			this.lights[2].disable();
		
		if(this.light_3 == true)
			this.lights[3].enable();
		else
			this.lights[3].disable();

		if(this.light_4 == true)
			this.lights[4].enable();
		else
			this.lights[4].disable();
	};


	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
		if(this.enableAxis == true)
			this.axis.display();

		this.materialDefault.apply();

		// ---- END Background, camera and axis setup
		
		// ---- Set selected textures
		this.vehicleTexture = this.vehicleAppearances[this.currVehicleAppearance];

		this.vehicleFrameTexture = this.vehicleFrameAppearances[this.currVehicleFrameAppearance];

		this.craneTexture = this.craneAppearances[this.currCraneAppearance];

		this.terrainTexture = this.terrainAppearances[this.currTerrainAppearance];
		this.reliefTexture = this.reliefAppearances[this.currTerrainAppearance];
		this.collectBase = this.collectBaseAppearance[this.currTerrainAppearance];

		// ---- BEGIN Scene drawing section

		this.pushMatrix();
			this.rotate(90 * degToRad, 0, 1, 0);
			this.rotate(-90 * degToRad, 1, 0, 0);
			this.scale(50, 50, 1);
			this.terrainTexture.apply();
			this.terrain.display();
		this.popMatrix();

		if (this.vehicle != null) {
			this.pushMatrix();
				this.translate(2,0,0.5);
				this.translate(-this.vehicle.position[0],this.vehicle.position[1],this.vehicle.position[2]);
				this.rotate(this.vehicle.angleDirection, 0, 1, 0);
				this.translate(0,0,1.7); 			// sets the axis of rotation to the rear axle

				this.vehicle.display();
			this.popMatrix();
		}
	
		this.pushMatrix();
			this.translate(-14,0,-7);
			this.craneTexture.apply();
			this.crane.display();
		this.popMatrix();

		this.pushMatrix();
			this.translate(-12.5,0.01,8);
			this.rotate(-90*degToRad,1,0,0);
			this.scale(5,3.5,1);
			this.collectBase.apply();
			this.collectZone.display();
		this.popMatrix();

		// ---- END Scene drawing section
	};

	update(currTime)
	{
		if (this.vehicle != null){
			//If the crane is in the deposit position, 'D', and the vehicle is in the collection area, 'R',
			//then moves the crane the 'D' to 'R', else moves the crane the 'R' to 'D'
			if((this.crane.position == 'D') && 
				((this.vehicle.position[0] < 16.5) && (this.vehicle.position[0] > 11)) &&
				((this.vehicle.position[2] <  9) && (this.vehicle.position[2] > 6.5)) )
				this.crane.DtoR(currTime);
			else
				this.crane.RtoD(currTime);

			// Verify the keys pressed
			this.checkKeys(currTime);
		}

		// If the crane pick the vehicle then moves to deposit position 
		if (this.crane.position == 'R')
			this.crane.RtoD(currTime);
	};

	// This method is invoked by the MyInterface to enable or disable the axis display
	displayAxis()
	{
		// Change the axis activation variable (enableAxis) to the complement
		this.enableAxis = !(this.enableAxis);
	};

	// Check and print the keys pressed and updates the vehicle based on this
	checkKeys(currTime)
	{
		var text="Keys pressed: ";
		var keysPressed=false;
        
        if( this.vehicle != null)
		  this.vehicle.frontWheelStab();
		
		// Call the vehicle update with each key pressed to moves the vehicle
		if (this.gui.isKeyPressed("KeyW")) {
			text+=" W ";
			keysPressed=true;
			this.vehicle.update(currTime,"KeyW");
		}

		if (this.gui.isKeyPressed("KeyS")) {
			text+=" S ";
			keysPressed=true;
			this.vehicle.update(currTime,"KeyS")
		}

		if (this.gui.isKeyPressed("KeyA")) {
			text+=" A ";
			keysPressed=true;
			this.vehicle.update(currTime,"KeyA")
		}

		if (this.gui.isKeyPressed("KeyD")) {
			text+=" D ";
			keysPressed=true;
			this.vehicle.update(currTime,"KeyD")
		}

		if (keysPressed)
			console.log(text);
	};
};
