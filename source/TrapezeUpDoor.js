/**
 * TrapezeUpDoor
 * @constructor
 */
 
class TrapezeUpDoor extends CGFobject
{
	constructor(scene, minS = 0, maxS = 1, minT = 0, maxT = 1) 
	{
		super(scene);

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.initBuffers();
	};
	

	initBuffers() 
	{
		// Vertices of the trapeze
		this.vertices = [
		  0, 0.5, 0,
		  0, 0.5, -1,
		  0, 0, -1.4,
		  0, 0, 0.5
		];

		this.indices = [
		  2, 1, 0, 
		  0, 3, 2
		];
		
		this.normals = [
		0, 0, 1,
		0, 0, 1,
		0, 0, 1,
		0, 0, 1
		];
		
		// The texture coordinates is calculated so as do not stretch the image, keeping the orientation
		this.texCoords = [
			this.minS+(this.maxS*0.25),this.minT,
			this.maxS,this.minT,
			this.maxS-(this.maxS*0.2),this.maxT,
			this.minS,this.maxT
		];
		
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};
