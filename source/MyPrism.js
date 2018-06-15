/**
 * MyPrism
 * @constructor
 */

class MyPrism extends CGFobject
{
	constructor(scene, slices, stacks)
    {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    };

	initBuffers() 
	{      
	    this.vertices = [];
	    this.normals = [];
	    this.indices = [];
	    this.texCoords = [];

        var delta = 2*Math.PI/this.slices;
        var ang = 0;
        var deltaStack = 1/this.stacks; 

        var s = 0;
        var t = 1;

        for(var i = 0; i < this.slices; i++) {

            var x = Math.cos(ang);
            var y = Math.sin(ang);
			var z = 0;
			t = 1;

            this.vertices.push(x,y,z);
			this.texCoords.push(s,t);

          	for(var j = 0; j < this.stacks; j++) {
				z += deltaStack;
				t -= deltaStack;
				this.vertices.push(x,y,z);
				this.texCoords.push(s,t);
          	}
           
            ang += delta/2;

            x = Math.cos(ang);
            y = Math.sin(ang);

			for(var j = 0; j < (this.stacks*2 + 2); j++) {
				 this.normals.push(x,y,z);
			}

            ang += delta/2;
			
            x = Math.cos(ang);
            y = Math.sin(ang);
            z = 0;
            s += 1/this.slices;
            t = 1;
           
            this.vertices.push(x,y,z);
            this.texCoords.push(s,t);

            for(var j = 0; j < this.stacks; j++) {
				z += deltaStack;
				t -= deltaStack;
				this.vertices.push(x,y,z);
				this.texCoords.push(s,t);
          	}
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

            x1 += (this.stacks*2 + 2) - this.stacks;
          	x2 += (this.stacks*2 + 2) - this.stacks;
           	x3 += (this.stacks*2 + 2) - this.stacks;
           	x4 += (this.stacks*2 + 2) - this.stacks;
        }
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};