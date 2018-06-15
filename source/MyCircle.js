/**
 * MyCircle
 * @constructor
 */

class MyCircle extends CGFobject
{
	constructor(scene, slices, minS = 0, maxS = 1, minT = 0, maxT = 1)
    {
        super(scene);

        this.slices = slices;

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

        this.initBuffers();
    }

	initBuffers() 
	{      
	    this.vertices = [];
	    this.normals = [];
	    this.indices = [];
	    this.texCoords = [];

        var avgS = (this.maxS-this.minS)/2;
        var avgT = (this.maxT-this.minT)/2;
        
        var delta = 2*Math.PI/this.slices;
        var ang = 0;
        var s = this.maxS;
        var t = this.minT + avgT; 

		this.vertices.push(0,0,0); 
		this.texCoords.push(this.minS + avgS,this.minT + avgT);
		this.normals.push(0,0,1);

		for(var i = 0; i < this.slices; i++) {
	
            var x = Math.cos(ang);
            var y = Math.sin(ang);

            this.vertices.push(x,y,0);
            this.texCoords.push(s,t);
           	this.normals.push(0,0,1);

            ang += delta;
            s = this.minS + avgS + avgS*Math.cos(ang);
            t = this.minT + avgT - avgT*Math.sin(ang);
		}
	    
 		var x1 = 1;
 		var x2 = 2;

		for(var i = 0; i < (this.slices-1); i++) {
			this.indices.push(0,x1,x2);

			x1 = x2; 
          	x2++;
		}

		this.indices.push(0,x1,1);
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};