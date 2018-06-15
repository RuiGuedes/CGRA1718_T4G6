/**
 * MyCylinder
 * @constructor
 */


class MyCylinder extends CGFobject
{
	constructor(scene, slices, stacks, minS = 0, maxS = 1, minT = 0, maxT = 1)
    {
        super(scene);
	
        this.slices = slices;
        this.stacks = stacks;

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

        var delta = 2*Math.PI/this.slices;
        var ang = 0;
        var deltaStack = 1.0/this.stacks;
        var deltaT = (this.maxT-this.minT)/this.stacks;
		
		var s = this.minS;
        var t = this.maxT;

        for(var i = 0; i < this.slices; i++) {
        	
            var x = Math.cos(ang);
            var y = Math.sin(ang);
			var z = 0;
			t = this.maxT;

            this.vertices.push(x,y,z);
			this.texCoords.push(s,t);

          	for(var j = 0; j < this.stacks; j++) {
				z += deltaStack; 
				t -= deltaT;
				this.vertices.push(x,y,z);
				this.texCoords.push(s,t);
          	}
			for(var j = 0; j <= (this.stacks); j++) {
				 this.normals.push(x,y,0);
			}
            
            ang += delta;
            s += (this.maxS-this.minS)/this.slices;
        }
        
        z = 0;
        t = this.maxT;

        this.vertices.push(Math.cos(ang),Math.sin(ang),z)
        this.texCoords.push(s,t);
		
		for(var j = 0; j < this.stacks; j++) {
			z += deltaStack;
			t -= deltaT;
			this.vertices.push(Math.cos(ang),Math.sin(ang),z);
			this.texCoords.push(s,t);
        }

        for(var j = 0; j <= (this.stacks); j++) {
			this.normals.push(Math.cos(ang),Math.sin(ang),0);
		}

        var x1 = 0;
        var x2 = 1;
        var x3 = this.stacks + 1; 
        var x4 = this.stacks + 2;

        for(var i = 0; i < this.slices; i++) {
       		for(var j = 0; j < this.stacks; j++) {
       			this.indices.push(x3,x2,x1);
          		this.indices.push(x2,x3,x4);
         		x1++;
          		x2++;
           		x3++;
           		x4++;
       		}
            x1++;
          	x2++;
           	x3++;
           	x4++;	
        }
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};