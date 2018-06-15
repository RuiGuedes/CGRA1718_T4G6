/**
 * MyCrane
 * @constructor
 */

 class MyCrane extends CGFobject
{
	constructor(scene)
    {
        super(scene);

        this.arm = new MyUnitCubeQuad(this.scene,0,4,0,1);
        this.cylinder = new MyCylinder(this.scene,100,10);
        this.cylinderCover = new MyCircle(this.scene,100);

        this.rotateAngle = 210 * degToRad;
        this.downArmAngle = -80 * degToRad;
        this.topArmAngle = -20 * degToRad;

        this.lastTime = 0;
        this.position = 'D';

        this.vehicle = null;
        this.vehicleStuck = false;
        this.heightCar = -12*Math.sin(this.downArmAngle)-10*Math.sin(this.topArmAngle);
    }

    display()
    {
        this.displayBase();
                
        this.scene.rotate(this.rotateAngle,0,1,0);
        
        this.displayArms();
        
        this.displayArticulation();

       	this.displayIman();

        if (this.vehicle != null && this.vehicleStuck) {
        	this.scene.pushMatrix();
        		this.scene.translate(0,this.heightCar,12*Math.cos(this.downArmAngle)+10*Math.cos(this.topArmAngle));
				this.scene.rotate(this.vehicle.angleDirection, 0, 1, 0);
				this.vehicle.display();
            this.scene.popMatrix();
        }

        if (this.vehicle != null && !this.vehicleStuck) {
        	this.scene.pushMatrix();
				this.scene.translate(-this.vehicle.position[0],this.vehicle.position[1],this.vehicle.position[2]);
				this.scene.rotate(this.vehicle.angleDirection, 0, 1, 0);
				this.vehicle.display();
            this.scene.popMatrix();
        }
    };

    displayBase()
    {
    	// Base
        this.scene.pushMatrix();
            this.scene.rotate(-90*degToRad,1,0,0);
            this.scene.scale(1.1,1.1,1);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0,1,0)
            this.scene.rotate(-90*degToRad,1,0,0);
            this.scene.scale(1.1,1.1,1);
            this.cylinderCover.display();
        this.scene.popMatrix();
    };

    displayArms()
    {
    	// Down arm
        this.scene.pushMatrix();
            this.scene.rotate(this.downArmAngle,1,0,0);
            this.scene.scale(0.7,1,12);
            this.scene.translate(0,0.5,0.5);
            this.arm.display();           
        this.scene.popMatrix();
        
        // Top arm
        this.scene.pushMatrix();
            this.scene.translate(0,-12*Math.sin(this.downArmAngle),12*Math.cos(this.downArmAngle));
            this.scene.rotate(this.topArmAngle,1,0,0);
            this.scene.scale(0.7,1,10);
            this.scene.translate(0,0.5,0.5);
            this.arm.display();
        this.scene.popMatrix();
    };
    
    displayArticulation()
    {
    	// Articulation
        this.scene.pushMatrix();
            this.scene.translate(0,-12*Math.sin(this.downArmAngle),12*Math.cos(this.downArmAngle));
            this.scene.rotate(90*degToRad,0,1,0);
            this.scene.scale(1,1,0.7);
            this.scene.translate(0,0,-0.5);
            this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(-0.7,-12*Math.sin(this.downArmAngle),12*Math.cos(this.downArmAngle));
            this.scene.rotate(-90*degToRad,0,1,0);
            this.scene.scale(1,1,0.7);
            this.scene.translate(0,0,-0.5);
            this.cylinderCover.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
            this.scene.translate(0.7,-12*Math.sin(this.downArmAngle),12*Math.cos(this.downArmAngle));
            this.scene.rotate(90*degToRad,0,1,0);
            this.scene.scale(1,1,0.7);
            this.scene.translate(0,0,-0.5);
            this.cylinderCover.display();
        this.scene.popMatrix();
    };
	
	displayIman()
	{
		 // Iman and cable
        this.scene.pushMatrix();
            this.scene.translate(0,-12*Math.sin(this.downArmAngle)-10*Math.sin(this.topArmAngle),
                                    12*Math.cos(this.downArmAngle)+10*Math.cos(this.topArmAngle));
            this.scene.translate(0,-2.4,-0.2);
            this.scene.rotate(90*degToRad,1,0,0);
            
            // Cable
            this.scene.pushMatrix();
                this.scene.rotate(180*degToRad,1,0,0);
                this.scene.translate(0,0,0.5);
                this.scene.scale(0.1,0.1,2);
                this.cylinder.display();
            this.scene.popMatrix();

            this.scene.scale(2,2,0.5);
            
            // Iman
            this.scene.pushMatrix();
                this.scene.translate(0,0,-1);
                this.cylinder.display();
                this.scene.rotate(180*degToRad,0,1,0);
                this.cylinderCover.display();
            this.scene.popMatrix();
            this.scene.pushMatrix();
                this.cylinderCover.display();
            this.scene.popMatrix();
        this.scene.popMatrix();
	};

	// Moves the crane the deposit position to collect area , 'D' to 'R'
    DtoR(currTime)
    {
        if(this.lastTime == 0) {
            this.lastTime = currTime;
        } else {
            var time = (currTime - this.lastTime)/1000.0;
		
			this.lastTime = currTime;
            
            // Rotate the crane until the rotateAngle is 6 degrees (collect position)
            if(this.rotateAngle > (6 * degToRad))
                this.rotateAngle -= 2 * degToRad;
            else {
            	// Move the arms 
                if(this.topArmAngle <= 32*degToRad){
                    this.topArmAngle += 2*degToRad;
                    this.downArmAngle += 0.9 *degToRad;
                } else {
                	// Catch the vehicle
                	this.vehicle = this.scene.vehicle;
                	this.scene.vehicle = null;
                	this.vehicle.angleDirection -= this.rotateAngle;
                	this.vehicleStuck = true;
                	this.lastTime = 0;
                	this.position = 'R';
                }
            }
        }
    };
	
	// Moves the crane to the deposit position, 'R' to 'D'
	RtoD(currTime)
	{
        if(this.lastTime == 0) {
            this.lastTime = currTime;
        } else {
            var time = (currTime - this.lastTime)/1000.0;
		
			this.lastTime = currTime;
			
			// Moves the arms until the right position
			if(this.topArmAngle > -20 * degToRad) {
            	this.topArmAngle -= 2*degToRad;
            	this.downArmAngle -= 0.9 *degToRad;
            } else {
            	// Rotate the crane until the rotateAngle is 210 degrees (deposit position)
           		if(this.rotateAngle < (210 * degToRad))
                	this.rotateAngle += 2 * degToRad;
            }
        }
        
        // If catch the vehicle, drop it
        if(this.vehicleStuck)
			this.dropVehicle();
    };
	

	// Create a drop movement of the vehicle when it is dropped
	dropVehicle()
	{
		// While the crane is not in position, update the car height
		if(this.rotateAngle < (210 * degToRad))
			this.heightCar = -12*Math.sin(this.downArmAngle)-10*Math.sin(this.topArmAngle)-4.35;
		else {
			// When the crane is in position, decrease the car height until it touches the ground
			if (this.heightCar > 0)
				this.heightCar -= 0.5;
			else {
				// Release the car
				this.vehicleStuck = false;
				this.vehicle.position[1] = 0;
				this.vehicle.position[2] = 12*Math.cos(this.downArmAngle)+10*Math.cos(this.topArmAngle);
				this.vehicle.position[0] = Math.sin(this.rotateAngle);
                this.lastTime = 0;
                this.position = 'D';
            }
		}
	};


}