/**
 * MyVehicleFrame
 * @constructor
 */

class MyVehicleFrame extends CGFobject
{
	constructor(scene)
    {
        super(scene);
        
        this.cylinder = new MyCylinder(this.scene,100,20);    
        this.window = new MyQuad(this.scene);
        this.join = new MyUnitCubeQuad(this.scene,0,0.3,0,0.3);
        this.cover = new MyCircle(this.scene,100,0,0.3,0,0.3);
    }

    display()
    {
		this.scene.pushMatrix();
    	   this.scene.translate(1.05,0.4,2.1);
    	   this.scene.rotate(-90*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,2.1);
    	   this.scene.vehicleFrameTexture.apply();
    	   this.cylinder.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
    	   this.scene.translate(0.85,0.4,-2.1);
    	   this.scene.rotate(-90*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,1.7);
    	   this.cylinder.display();
		this.scene.popMatrix();	
        
        this.scene.pushMatrix();
    	   this.scene.translate(0,0.4,-2.1);
           this.scene.scale(0.08,0.08,4.2);
    	   this.cylinder.display();
		this.scene.popMatrix();	

		 this.scene.pushMatrix();
    	   this.scene.translate(0.5,0.4,2.1);
    	   this.scene.rotate(-45*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.4);    	   
    	   this.cylinder.display();
		this.scene.popMatrix();	

		 this.scene.pushMatrix();
    	   this.scene.translate(-0.5,0.4,2.1);
    	   this.scene.rotate(-45*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.4);
    	   this.cylinder.display();
		this.scene.popMatrix();	

		 this.scene.pushMatrix();
    	   this.scene.translate(0.58,0.68,2.38);
    	   this.scene.rotate(-90*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,1.16);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0.58,0.68,2.38);
    	    this.scene.rotate(90*degToRad,0,1,0);
    		this.scene.scale(0.08,0.08,1);
    		this.cover.display();
    	this.scene.popMatrix();

    	this.scene.pushMatrix();
    	    this.scene.translate(0.58,0.68,2.38);
    	    this.scene.translate(-1.16,0,0);
    	    this.scene.rotate(-90*degToRad,0,1,0);
    		this.scene.scale(0.08,0.08,1);
    	   	this.cover.display();
    	this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(0.5,1,2.1);
    	   this.scene.rotate(49*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.44);    	
    	   this.cylinder.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
    	   this.scene.translate(-0.5,1,2.1);
    	   this.scene.rotate(49*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.44);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(0.58,1,2.1);
    	   this.scene.rotate(-90*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,1.16);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	    this.scene.translate(0.58,1,2.1);
    	    this.scene.rotate(90*degToRad,0,1,0);
    		this.scene.scale(0.08,0.08,1);
    		this.cover.display();
    	this.scene.popMatrix();

    	this.scene.pushMatrix();
    	    this.scene.translate(0.58,1,2.1);
    	    this.scene.translate(-1.16,0,0);
    	    this.scene.rotate(-90*degToRad,0,1,0);
    		this.scene.scale(0.08,0.08,1);
    	   	this.cover.display();
    	this.scene.popMatrix();

		 this.scene.pushMatrix();
    	   this.scene.translate(0.59,1,1.6);
    	   this.scene.rotate(-12*degToRad, 0,1,0);   	 
           this.scene.scale(0.08,0.08,0.5);
    	   this.cylinder.display();
		this.scene.popMatrix();

		 this.scene.pushMatrix();
    	   this.scene.translate(-0.59,1,1.6);
    	   this.scene.rotate(12*degToRad, 0,1,0);
           this.scene.scale(0.08,0.08,0.5);
    	   this.cylinder.display();
		this.scene.popMatrix();

		 this.scene.pushMatrix();
    	   this.scene.translate(1.15,1.30,0.5);
    	   this.scene.rotate(15.1*degToRad,1,0,0);  	 
    	   this.scene.rotate(-26*degToRad,0,1,0);  	 
           this.scene.scale(0.08,0.08,1.298);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,1.30,0.5);
    	   this.scene.rotate(15.1*degToRad,1,0,0);  	 
    	   this.scene.rotate(26*degToRad,0,1,0);  	 
           this.scene.scale(0.08,0.08,1.298);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.15,1.85,0);
    	   this.scene.rotate(48*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.76);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,1.85,0);
    	   this.scene.rotate(48*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.76);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.23,1.85,0);
    	   this.scene.rotate(-90*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,2.46);
    	   this.cylinder.display();
		this.scene.popMatrix();	
		
		this.scene.pushMatrix();
    	   this.scene.translate(1.23,1.85,0);
    	    this.scene.rotate(90*degToRad,0,1,0);
    		this.scene.scale(0.08,0.08,1);
    		this.cover.display();
    	this.scene.popMatrix();

    	this.scene.pushMatrix();
    	   this.scene.translate(1.23,1.85,0);
    	    this.scene.translate(-2.46,0,0);
    	    this.scene.rotate(-90*degToRad,0,1,0);
    		this.scene.scale(0.08,0.08,1);
    	   	this.cover.display();
    	this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.23,1.85,-1);
    	   this.scene.rotate(-90*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,2.46);
    	   this.cylinder.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
    	   this.scene.translate(1.23,1.85,-1);
    	    this.scene.rotate(90*degToRad,0,1,0);
    		this.scene.scale(0.08,0.08,1);
    		this.cover.display();
    	this.scene.popMatrix();

    	this.scene.pushMatrix();
    	   this.scene.translate(1.23,1.85,-1);
    	    this.scene.translate(-2.46,0,0);
    	    this.scene.rotate(-90*degToRad,0,1,0);
    		this.scene.scale(0.08,0.08,1);
    	   	this.cover.display();
    	this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.15,1.85,-1);
           this.scene.scale(0.08,0.08,1);
    	   this.cylinder.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,1.85,-1);
           this.scene.scale(0.08,0.08,1);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.15,1.3,-1.414);
    	   this.scene.rotate(-53*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.69);
    	   this.cylinder.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,1.3,-1.414);
    	   this.scene.rotate(-53*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.69);
    	   this.cylinder.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
    	   this.scene.translate(0.73,1.3,-1.92);
    	   this.scene.rotate(40*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,0.68);
    	   this.cylinder.display();
		this.scene.popMatrix();	

		this.scene.pushMatrix();
    	   this.scene.translate(-0.73,1.3,-1.92);
    	   this.scene.rotate(-40*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,0.68);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-0.4,0.4,-2.1);
    	   this.scene.rotate(20*degToRad,0,0,1);
    	   this.scene.rotate(-78*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,1);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(0.4,0.4,-2.1);
    	   this.scene.rotate(-20*degToRad,0,0,1);
    	   this.scene.rotate(-78*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,1);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(0.71,1.3,-1.9);
           this.scene.scale(0.16,0.16,0.16);
    	   this.join.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-0.71,1.3,-1.9);
           this.scene.scale(0.16,0.16,0.16);
    	   this.join.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(0.78,1.3,-1.9);    	   
    	   this.scene.rotate(-90*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,1.5);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.15,1.3,-1.414); 	   
    	   this.scene.rotate(56.6*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.78);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,1.3,-1.414);  	   
    	   this.scene.rotate(56.6*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.78);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.157,0.65,0.85);         	  	   	   
    	   this.scene.rotate(-24.6*degToRad,0,1,0);         	  	   	   
    	   this.scene.rotate(-1*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,1.65);
    	   this.cylinder.display();
		this.scene.popMatrix();
				
		this.scene.pushMatrix();
    	   this.scene.translate(-1.157,0.65,0.85);      	   	   
    	   this.scene.rotate(24.6*degToRad,0,1,0);  
    	   this.scene.rotate(-1*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,1.65);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.15,0.65,-1.02);  
           this.scene.scale(0.08,0.08,1.904);
    	   this.scene.vehicleFrameTexture.apply();
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,0.65,-1.02);  
           this.scene.scale(0.08,0.08,1.904);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,0.65,0.85); 
    	   this.scene.rotate(90*degToRad,0,1,0); 
           this.scene.scale(0.08,0.08,2.3);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,0.65,-1); 
    	   this.scene.rotate(90*degToRad,0,1,0); 
           this.scene.scale(0.08,0.08,2.3);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,1.3,0.5);  
           this.scene.rotate(90*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,2.3);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.15,1.3,0.5);  
           this.scene.rotate(60*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.75);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,1.3,0.5);  
           this.scene.rotate(60*degToRad,1,0,0);
           this.scene.scale(0.08,0.08,0.75);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(1.15,1.3,-1.45);             
           this.scene.scale(0.08,0.08,1.95);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.15,1.3,-1.45);  
           this.scene.scale(0.08,0.08,1.95);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(0,0.4,-2.09);  
		   this.scene.rotate(-13*degToRad,1,0,0);
    	   this.scene.rotate(45.5*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,1.64);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(0,0.4,-2.09);  
		   this.scene.rotate(-13*degToRad,1,0,0);
    	   this.scene.rotate(-45.5*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,1.64);
    	   this.cylinder.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
    	   this.scene.translate(-1.1,1.3,-1.4);  
           this.scene.rotate(90*degToRad,0,1,0);
           this.scene.scale(0.08,0.08,2.25);
    	   this.cylinder.display();
		this.scene.popMatrix();
    };	
};