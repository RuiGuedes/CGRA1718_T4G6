
/** Represents a plane with nrDivs divisions along both axis, with center at (0,0) */
class Plane extends CGFobject{

	constructor(scene, nrDivs, altimetry = 0, minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene);

		// nrDivs = 1 if not provided
		nrDivs = typeof nrDivs !== 'undefined' ? nrDivs : 1;

		this.nrDivs = nrDivs;
		this.patchLength = 1.0 / nrDivs;
		this.patchLengthS = (maxS - minS) / nrDivs;
		this.patchLengthT = (maxT - minT) / nrDivs;

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;
		
		this.altimetry = altimetry;
		
		this.initBuffers();
	};

	initBuffers()
	{
		// Generate vertices and normals 
		this.vertices = [];
		this.normals = [];
		
		// Uncomment below to init texCoords
		this.texCoords = [];

		var yCoord = 0.5;

		var s = this.minS;
		var t = this.minT;

		var vec1 = [];
		var vec2 = [];
		var pos = 0;
		var x, y, z;
		
		for (var j = 0; j <= this.nrDivs; j++) 
		{
			var xCoord = -0.5;
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				if (this.altimetry != 0)
					this.vertices.push(xCoord, yCoord, this.altimetry[j][i]);
				else 
					this.vertices.push(xCoord, yCoord, 0);

				this.texCoords.push(s,t);
				
				s += this.patchLengthS;
				xCoord += this.patchLength;
			}
		
			s = this.minS;
			t += this.patchLengthT;

			yCoord -= this.patchLength;
		}

		if((this.altimetry.length == 2) && (this.altimetry != 0)) {
			x = this.vertices[pos+3]-this.vertices[pos]; 
			pos++;
			y = this.vertices[pos+3]-this.vertices[pos]; 
			pos++;
			z = this.vertices[pos+3]-this.vertices[pos]; 
			pos -= 2;
			vec1.push(x,y,z);

			x = this.vertices[pos+6]-this.vertices[pos]; 
			pos++;
			y = this.vertices[pos+6]-this.vertices[pos]; 
			pos++;
			z = this.vertices[pos+6]-this.vertices[pos];
			vec2.push(x,y,z);

			x = vec1[1]*vec2[2] - vec1[2]*vec2[1];
			y = vec1[2]*vec2[0] - vec1[0]*vec2[2];
			z = vec1[0]*vec2[1] - vec1[1]*vec2[0];

			for(var i = 0; i < 4 ; i++) {
				this.normals.push(-x,-y,-z);
			}
		} else {
			for(var i = 0; i <= this.nrDivs ; i++) {
				for(var j = 0; j <= this.nrDivs ; j++) {
					this.normals.push(0,0,1);
				}
			}
		}
		
		this.indices = [];
		var ind=0;

		for (var j = 0; j < this.nrDivs; j++) 
		{
			for (var i = 0; i <= this.nrDivs; i++) 
			{
				this.indices.push(ind);
				this.indices.push(ind+this.nrDivs+1);

				ind++;
			}
			if (j+1 < this.nrDivs)
			{
				// Extra vertices to create degenerate triangles so that the strip can wrap on the next row
				// degenerate triangles will not generate fragments
				this.indices.push(ind+this.nrDivs);
				this.indices.push(ind);
			}
		}

		this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
		this.initGLBuffers();
	};
};