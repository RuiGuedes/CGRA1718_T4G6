/**
 * MyWheel
 * @constructor
 */

class MyWheel extends CGFobject
{
	constructor(scene)
    {
        super(scene);
        
        // Wheel scroll movement angle
        this.moveAngle = 0; 		// degrees
        // Angle of rotation of the wheel
        this.directionAngle = 0;	// degrees

        this.cylinder = new MyCylinder(this.scene,100,20);
        this.cover = new MyCircle(this.scene,100);
    }

    display()
    {
		this.scene.rotate(-this.moveAngle * degToRad,0,0,1);

		// tire
    	this.scene.pushMatrix();
    	    this.scene.tireTexture.apply();
    		this.cylinder.display();
		this.scene.popMatrix();	

		// rim cover
		this.scene.pushMatrix();
    		this.scene.translate(0,0,1);
    	    this.scene.wheelTexture.apply();
    	    this.cover.display();
		this.scene.popMatrix();
		
		// back cover
		this.scene.pushMatrix();   	 
    	    this.scene.rotate(180*degToRad,1,0,0);
    	    this.scene.blackMaterial.apply();    	  
    	    this.cover.display();
		this.scene.popMatrix();	
    };
	
	update(deslocMove, angleDir)
	{
		// Add the angular displacement to the scroll movement angle
		this.moveAngle += (360*deslocMove)/(2*Math.PI*0.4);
		
		// Keeps the value of the moveAngle low
		if(this.moveAngle > 360)
			this.moveAngle -= 360;
		if(this.moveAngle < -360)
			this.moveAngle += 360;
		
		// If the angleDir is 360, then the directionAngle will approach 0 (the wheel will be stabilized)
		if(angleDir == 360){
			if (Math.round(this.directionAngle) != 0){
				if (this.directionAngle < -5)
					this.directionAngle += 5;
				
				else if (this.directionAngle > 5)
					this.directionAngle -= 5;
				else
					this.directionAngle = 0;
			}
		} else { 
			// else the angleDir will be added to directionAngle until the max (35 degrees)
			if(Math.abs(this.directionAngle + angleDir) < 35)
				this.directionAngle += angleDir;
			else {
				if(angleDir < 0)		
					this.directionAngle = -35;
				else
					this.directionAngle = 35;
			}
		}
	};
};