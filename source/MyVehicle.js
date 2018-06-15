/**
 * MyVehicle
 * @constructor
 */

class MyVehicle extends CGFobject
{
	constructor(scene)
    {
        super(scene);

        this.position = [0,0,0];
        this.keysdirectionPress = [0,0];
        this.angleDirection = 0;
        this.lastTime = 0;

        this.frontLeftWheel = new MyWheel(this.scene);
        this.frontRightWheel = new MyWheel(this.scene);
        this.backLeftWheel = new MyWheel(this.scene);
        this.backRightWheel = new MyWheel(this.scene);
        this.frame = new MyVehicleFrame(this.scene);
        this.lamp = new MyLamp(this.scene,100,20);
        this.cover = new MyCircle(this.scene,100);
        this.plane = new Plane(this.scene,30);
        this.cylinder = new MyCylinder(this.scene,100,20);
        this.cube = new MyUnitCubeQuad(this.scene,0,6,0,6);
        this.downDoor = new TrapezeDownDoor(this.scene);
        this.upDoor = new TrapezeUpDoor(this.scene);
        this.engine = new MyPrism(this.scene,20,20);
        this.engineCover = new MyCircle(this.scene,20);
    };

    display()
    {
		this.displayWheels();
		
		this.scene.pushMatrix();
			this.scene.scale(1,1,0.82);

			this.frame.display();

			this.displayPanels();
			this.displayFlashers();
			this.displayHeadLights();	
			this.displayDoors();
			this.displaySeats();
			this.displayEngine();
			this.displaySteeringWheel();
		this.scene.popMatrix();
    };

    displayWheels() 
    {
    	 //Front wheels
    	this.scene.pushMatrix();
    	    this.scene.translate(-0.95,0.4,1.72);
			this.scene.rotate(this.frontRightWheel.directionAngle * degToRad,0,1,0);
            this.scene.scale(0.3,0.4,0.4);
    	    this.scene.rotate(-90*degToRad,0,1,0);    	 
    		this.frontRightWheel.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(0.95,0.4,1.72);
			this.scene.rotate(this.frontLeftWheel.directionAngle * degToRad,0,1,0);
            this.scene.scale(0.3,0.4,0.4);
    	    this.scene.rotate(90*degToRad,0,1,0);    	 
    		this.frontLeftWheel.display();
		this.scene.popMatrix();	

		//Back wheels
		this.scene.pushMatrix();
			this.scene.translate(-0.85,0.4,-1.72);
            this.scene.scale(0.4,0.4,0.4);
    	    this.scene.rotate(-90*degToRad,0,1,0);    	 
    		this.backRightWheel.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
			this.scene.translate(0.85,0.4,-1.72);
            this.scene.scale(0.4,0.4,0.4);
    	    this.scene.rotate(90*degToRad,0,1,0);    	 
    		this.backLeftWheel.display();
		this.scene.popMatrix();
    };

    displayHeadLights()
    {
    	//Headlights
		this.scene.pushMatrix();
    	    this.scene.translate(0.35,0.7,2.56);
    	    this.scene.rotate(180*degToRad,0,1,0);
            this.scene.scale(0.1,0.1,0.1);
            this.scene.materialDefault.apply();	
    		this.lamp.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(-0.35,0.7,2.56);
    	    this.scene.rotate(180*degToRad,0,1,0);
            this.scene.scale(0.1,0.1,0.1);
    		this.lamp.display();
		this.scene.popMatrix();

		//Stop lights
		this.scene.pushMatrix();
    	    this.scene.translate(0.71,1.3,-2.07);
            this.scene.scale(0.1,0.1,0.1);
            this.scene.redMaterial.apply();	
    		this.lamp.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(-0.71,1.3,-2.07);
            this.scene.scale(0.1,0.1,0.1);
    		this.lamp.display();
		this.scene.popMatrix();
    };

    displayFlashers()
    {
		//Flashers
		this.scene.pushMatrix();
    	    this.scene.translate(0.58,0.7,2.51);
    	    this.scene.rotate(180*degToRad,0,1,0);
            this.scene.scale(0.1,0.05,0.05);
            this.scene.orangeMaterial.apply();	
    		this.lamp.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(-0.58,0.7,2.51);
    	    this.scene.rotate(180*degToRad,0,1,0);
            this.scene.scale(0.1,0.05,0.05);	
    		this.lamp.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(1.08,1.3,-1.71);
    	    this.scene.rotate(-40*degToRad,0,1,0);
            this.scene.scale(0.1,0.05,0.05);
    		this.lamp.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(-1.08,1.3,-1.71);
    	    this.scene.rotate(40*degToRad,0,1,0);
            this.scene.scale(0.1,0.05,0.05);
    		this.lamp.display();
		this.scene.popMatrix();
    };

    displaySteeringWheel()
    {
    	//steering wheel
		this.scene.pushMatrix();
    	    this.scene.translate(0.55,1.37,0);
    	    this.scene.rotate(40.5*degToRad,1,0,0);
            this.scene.scale(.04,0.04,1.1);
            this.scene.blackMaterial.apply();	
            this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0.55,1.37,-0.01);
    	    this.scene.rotate(8*degToRad,1,0,0);
            this.scene.scale(.04,0.04,0.5);	
            this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0.55,1.37,-0.02);
    	    this.scene.rotate(20*degToRad,1,0,0);
            this.scene.scale(.2,0.2,0.03);
            this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0.55,1.37,-0.02);
    	    this.scene.rotate(20*degToRad,1,0,0);
    	    this.scene.rotate(180*degToRad,0,1,0);    	    
            this.scene.scale(.2,0.2,1);
            this.scene.steeringwheel.apply();	
            this.cover.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0.55,1.37,-0.02);
    	    this.scene.rotate(20*degToRad,1,0,0);
    	    this.scene.translate(0,0,0.03);   	    
            this.scene.scale(.2,0.2,1);	
            this.cover.display();
		this.scene.popMatrix();
    };

    displayDoors()
    {
    	// Doors
		this.scene.pushMatrix();
			this.scene.translate(1.15,0.6,0);
			this.scene.vehicleTexture.apply();			
			this.downDoor.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.15,0.6,0);
			this.downDoor.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(1.15,1.3,0);
            this.scene.windShield.apply();
			this.upDoor.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-1.15,1.3,-0.95);
			this.scene.rotate(180*degToRad,0,1,0);
			this.upDoor.display();
		this.scene.popMatrix();
    };
	
	displayPanels()
	{
		// Panels 
		this.scene.pushMatrix();
    	    this.scene.translate(0,1.60,0.26);
    	    this.scene.rotate(-41*degToRad,1,0,0);
            this.scene.scale(2.3,0.7,1);
            this.scene.windShield.apply();	
            this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0,0.95,0.7);
    	    this.scene.rotate(-30*degToRad,1,0,0);
            this.scene.scale(2.3,0.7,1);
            this.scene.vehicleTexture.apply();	
            this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0,0.95,0.7);
    	    this.scene.rotate(-210*degToRad,1,0,0);
            this.scene.scale(2.3,0.7,1);	
            this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0,0.65,-0.046);
    	    this.scene.rotate(90*degToRad,1,0,0);
            this.scene.scale(2.3,1.838,1);	
            this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0,0.65,-0.046);
    	    this.scene.rotate(270*degToRad,1,0,0);
            this.scene.scale(2.3,1.838,1);	
            this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0,0.94,-1.16);
    	    this.scene.rotate(146*degToRad,1,0,0);
            this.scene.scale(2.3,0.7,1);	
            this.plane.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
    	    this.scene.translate(0,0.94,-1.16);
    	    this.scene.rotate(-34*degToRad,1,0,0);
            this.scene.scale(2.3,0.7,1);	
            this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0,1.88,-0.52);
    	    this.scene.rotate(-90*degToRad,1,0,0);
            this.scene.scale(2.3,0.9,1);	
            this.plane.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0,1.88,-0.52);
    	    this.scene.rotate(90*degToRad,1,0,0);
            this.scene.scale(2.3,0.9,1);	
            this.plane.display();
		this.scene.popMatrix();
	};

	displaySeats()
	{
		//seats
		this.scene.pushMatrix();
			this.scene.translate(0.55,0.8,-0.5);
			this.scene.rotate(-5*degToRad,1,0,0);
			this.scene.scale(0.7,0.2,0.6);
			this.scene.seatTexture.apply();
			this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(0.55,1.2,-0.82);
			this.scene.rotate(-10*degToRad,1,0,0);
			this.scene.scale(0.7,0.9,0.1);
			this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.55,0.8,-0.5);
			this.scene.rotate(-5*degToRad,1,0,0);
			this.scene.scale(0.7,0.2,0.6);
			this.cube.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
			this.scene.translate(-0.55,1.2,-0.82);
			this.scene.rotate(-10*degToRad,1,0,0);
			this.scene.scale(0.7,0.9,0.1);
			this.cube.display();
		this.scene.popMatrix();
	};

	displayEngine()
	{
		// Engine
		this.scene.pushMatrix();
			this.scene.translate(0,0.85,-2.1);
			this.scene.rotate(-90*degToRad,0,0,1);
			this.scene.scale(0.4,0.4,0.7);
            this.scene.engineTexture.apply();
			this.engine.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
            this.scene.engineCoverTexture.apply();
			this.scene.translate(0,0.85,-2.1);
			this.scene.rotate(180*degToRad,0,1,0);
			this.scene.rotate(-90*degToRad,0,0,1);
			this.scene.scale(0.4,0.4,1);
			this.engineCover.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
            this.scene.engineCoverTexture.apply();
			this.scene.translate(0,0.85,-2.1);
			this.scene.rotate(-90*degToRad,0,0,1);
			this.scene.scale(0.4,0.4,1);
			this.scene.translate(0,0,0.7);
			this.engineCover.display();
		this.scene.popMatrix();
	};

	// Moves the when some key (w,s,a,d) is pressed
	update(currTime, key)
	{
		if(this.lastTime == 0)
			this.lastTime = currTime;
		else {
			var time = (currTime - this.lastTime)/1000.0;
		
			this.lastTime = currTime;

			// Keeps the value of the angleDirection low
			if(this.angleDirection > (360*degToRad))
				this.angleDirection -= (360*degToRad);

			if(this.angleDirection < (360*degToRad))
				this.angleDirection += (360*degToRad);

			var desloc = this.scene.speed * time;
			
			if (key == "KeyW")
				this.Wmotion(desloc);

			if (key == "KeyS")
				this.Smotion(desloc);

			if (key == "KeyA"){
				this.keysdirectionPress[0] = 1;
				this.frontLeftWheel.update(0,5);
				this.frontRightWheel.update(0,5);
			}
			
			if (key == "KeyD"){
				this.keysdirectionPress[1] = 1;
				this.frontLeftWheel.update(0,-5);
				this.frontRightWheel.update(0,-5);
			}
		}
	};
	
	// Moves the vehicle foward
	Wmotion(desloc) 
	{
		// If the key A is pressed then moves the vehicle foward and turn left
		if (this.keysdirectionPress[0]){
			this.angleDirection += desloc/5;		// angleDirection = displacement/ radius of trajectory
			this.position[2] += desloc*Math.cos(this.angleDirection);
			this.position[0] -= desloc*Math.sin(this.angleDirection);

			// If the next position is out of limits or has altimetry other than 0 then revert the movement
			if ( ! this.checkNextPosition(this.position[0],this.position[2])){
				this.angleDirection -= desloc/5;
				this.position[2] -= desloc*Math.cos(this.angleDirection);
				this.position[0] += desloc*Math.sin(this.angleDirection);
			}
			this.frontLeftWheel.update(-desloc,5);
			this.frontRightWheel.update(desloc,5);
			this.backLeftWheel.update(-desloc,0);
			this.backRightWheel.update(desloc,0);
		} else
			// If the key D is pressed then moves the vehicle foward and turn rigth
			if (this.keysdirectionPress[1]){
				this.angleDirection -= desloc/5;
				this.position[2] += desloc*Math.cos(this.angleDirection);
				this.position[0] -= desloc*Math.sin(this.angleDirection);

				// If the next position is out of limits or has altimetry other than 0 then revert the movement
				if ( ! this.checkNextPosition(this.position[0],this.position[2])){
					this.angleDirection += desloc/5;
					this.position[2] -= desloc*Math.cos(this.angleDirection);
					this.position[0] += desloc*Math.sin(this.angleDirection);
				}
				this.frontLeftWheel.update(-desloc,-5);
				this.frontRightWheel.update(desloc,-5);
				this.backLeftWheel.update(-desloc,0);
				this.backRightWheel.update(desloc,0);
			}
		
		// If only key W is pressed then moves the vehicle foward straight
		if ( !(this.keysdirectionPress[0] || this.keysdirectionPress[1]) ) {
			this.position[2] += desloc*Math.cos(this.angleDirection);
			this.position[0] -= desloc*Math.sin(this.angleDirection);

			// If the next position is out of limits or has altimetry other than 0 then revert the movement
			if ( ! this.checkNextPosition(this.position[0],this.position[2])){
				this.position[2] -= desloc*Math.cos(this.angleDirection);
				this.position[0] += desloc*Math.sin(this.angleDirection);
			}
			this.frontLeftWheel.update(-desloc,0);
			this.frontRightWheel.update(desloc,0);
			this.backLeftWheel.update(-desloc,0);
			this.backRightWheel.update(desloc,0);
		}
	};

	// Moves the vehicle backward
	Smotion(desloc)
	{
		// If the key A is pressed then moves the vehicle backward and turn left
		if (this.keysdirectionPress[0]){
			this.angleDirection -= desloc/5;
			this.position[2] -= desloc*Math.cos(this.angleDirection);
			this.position[0] += desloc*Math.sin(this.angleDirection);

			// If the next position is out of limits or has altimetry other than 0 then revert the movement
			if ( ! this.checkNextPosition(this.position[0],this.position[2])){
				this.angleDirection += desloc/5;
				this.position[2] += desloc*Math.cos(this.angleDirection);
				this.position[0] -= desloc*Math.sin(this.angleDirection);
			}
			this.frontLeftWheel.update(desloc,5);
			this.frontRightWheel.update(-desloc,5);
			this.backLeftWheel.update(desloc,0);
			this.backRightWheel.update(-desloc,0);
		} else 
			// If the key D is pressed then moves the vehicle backward and turn rigth
			if (this.keysdirectionPress[1]){
				this.angleDirection += desloc/5;
				this.position[2] -= desloc*Math.cos(this.angleDirection);
				this.position[0] += desloc*Math.sin(this.angleDirection);

				// If the next position is out of limits or has altimetry other than 0 then revert the movement
				if ( ! this.checkNextPosition(this.position[0],this.position[2])){
					this.angleDirection -= desloc/5;
					this.position[2] += desloc*Math.cos(this.angleDirection);
					this.position[0] -= desloc*Math.sin(this.angleDirection);
				}
				this.frontLeftWheel.update(desloc,-5);
				this.frontRightWheel.update(-desloc,-5);
				this.backLeftWheel.update(desloc,0);
				this.backRightWheel.update(-desloc,0);
			}

		// If only key W is pressed then moves the vehicle backward straight
		if ( !(this.keysdirectionPress[0] || this.keysdirectionPress[1]) ){
			this.position[2] -= desloc*Math.cos(this.angleDirection);
			this.position[0] += desloc*Math.sin(this.angleDirection);

			// If the next position is out of limits or has altimetry other than 0 then revert the movement
			if ( ! this.checkNextPosition(this.position[0],this.position[2])){
				this.position[2] += desloc*Math.cos(this.angleDirection);
				this.position[0] -= desloc*Math.sin(this.angleDirection);
			}
			this.frontLeftWheel.update(desloc,0);
			this.frontRightWheel.update(-desloc,0);
			this.backLeftWheel.update(desloc,0);
			this.backRightWheel.update(-desloc,0);
		}
	};

	// When the key A or the key D is release, deactivates the corresponding flag
	keyUp(key)
	{
		this.lastTime=0;

		if(key == "KeyA")
			this.keysdirectionPress[0] = 0;

		if(key == "KeyD")
			this.keysdirectionPress[1] = 0;
	};

	// When the key A or the key D is pressed, activates the corresponding flag
	keyDown(key)
	{
		if(key == "KeyA")
			this.keysdirectionPress[0] = 1;

		if(key == "KeyD")
			this.keysdirectionPress[1] = 1;
	};

	// Steadily stabilizes the front wheels
	frontWheelStab()
	{
		if(!(this.keysdirectionPress[0] || this.keysdirectionPress[1])) {
			this.frontLeftWheel.update(0,360);
			this.frontRightWheel.update(0,360);
		}
	};

	// Check the next position is out of limits or has altimetry other than 0
	// then return false
	// else retun true
	checkNextPosition(x,z)
	{
		var ang = this.angleDirection;
		// Length of the each division of the plan
		var lengthPlan = 50 / (this.scene.planTerrain.length-1);
		var vehicleCoordI = this.scene.vehicleInitialMap[0];
		var vehicleCoordJ = this.scene.vehicleInitialMap[1];

		var i = vehicleCoordI-Math.round((x-3.8*Math.sin(ang)+1*Math.cos(ang))/lengthPlan);
		var j = vehicleCoordJ-Math.floor((z+3.8*Math.cos(ang)+1*Math.sin(ang))/lengthPlan);

		if(this.scene.planTerrain[i][j] != 0)
			return false;

		i = vehicleCoordI-Math.round((x-3.8*Math.sin(ang)-1*Math.cos(ang))/lengthPlan);
		j = vehicleCoordJ-Math.floor((z+3.8*Math.cos(ang)-1*Math.sin(ang))/lengthPlan);

		if(this.scene.planTerrain[i][j] != 0)
			return false;
		
		i = vehicleCoordI-Math.round((x+0.4*Math.sin(ang)+1*Math.cos(ang))/lengthPlan);
		j = vehicleCoordJ-Math.floor((z-0.4*Math.cos(ang)+1*Math.sin(ang))/lengthPlan);

		if(this.scene.planTerrain[i][j] != 0)
			return false;
		
		i = vehicleCoordI-Math.round((x+0.4*Math.sin(ang)-1*Math.cos(ang))/lengthPlan);
		j = vehicleCoordJ-Math.floor((z-0.4*Math.cos(ang)-1*Math.sin(ang))/lengthPlan);

		if(this.scene.planTerrain[i][j] != 0)
			return false;

		return true;
	};
};