/**
 * MyLamp
 * @constructor
 */

class MyLamp extends CGFobject
{
	constructor(scene, slices, stacks)
    {
        super(scene);

        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

	initBuffers() 
	{      
	    this.vertices = [];
	    this.normals = [];
	    this.indices = [];
    
        var teta = 0;
        var deltaTeta = 2*Math.PI/this.slices;

        var fi = 0;
        var deltaFi = 0.5*Math.PI/this.stacks;

        for(var i = 0; i < this.slices; i++) {
            var x = Math.sin(fi) * Math.cos(teta);
            var y = Math.sin(fi) * Math.sin(teta);
			var z = Math.cos(fi);

            this.vertices.push(x,y,z);
            this.normals.push(x,y,z);

          	for(var j = 0; j < this.stacks; j++) {
          	    fi += deltaFi;
				x = Math.sin(fi) * Math.cos(teta);
                y = Math.sin(fi) * Math.sin(teta);
			    z = Math.cos(fi); 

				this.vertices.push(x,y,z);
				this.normals.push(x,y,z);
          	}
          	
            teta += deltaTeta;
            fi = 0;
        }
        
        var x1 = 0;
        var x2 = 1;
        var x3 = this.stacks + 1; 
        var x4 = this.stacks + 2;

        for(var i = 0; i < this.slices; i++) {
       		for(var j = 0; j < this.stacks; j++) {
       			this.indices.push(x3,x2,x1);
       			this.indices.push(x1,x2,x3);
          		this.indices.push(x2,x3,x4);
          		this.indices.push(x4,x3,x2);
          		x1++;
          		x2++;
           		x3++;
           		x4++;
       		} 
            x1++;
          	x2++;
           	x3++;
           	x4++;
           	
           	x1 = x1 % (this.slices*(this.stacks + 1));
           	x2 = x2 % (this.slices*(this.stacks + 1));
           	x3 = x3 % (this.slices*(this.stacks + 1));
           	x4 = x4 % (this.slices*(this.stacks + 1));
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
	
};