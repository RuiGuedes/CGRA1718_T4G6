/**
 * MyTerrain
 * @constructor
 */

 class MyTerrain extends Plane
{
	constructor(scene, nrDivs, altimetry, minS = 0, maxS = 1, minT = 0, maxT = 1)
    {
    	super(scene,nrDivs,altimetry);
    	
	    this.plan = [];
		
		// Create one plane with altimetry for each division of the terrain and save in the plane array
	    for(var i = 0 ; i< this.nrDivs ;i++){
			var plans = [];

			for(var j = 0; j< this.nrDivs ;j++) {
				var alt = [ [ altimetry[i  ][j] ,altimetry[i  ][j+1] ],
							[ altimetry[i+1][j] ,altimetry[i+1][j+1] ] ];

				plans.push(new Plane(this.scene,1,alt));
			}
			this.plan.push(plans);
		}
    };

    display()
    {
    	var y = 0.5 - (1/this.nrDivs)/2;

    	// Display every plan    	
		for(var i = 0 ; i< this.nrDivs ;i++){
			var x = -0.5 + (1/this.nrDivs)/2;

			for(var j = 0; j< this.nrDivs ;j++) {
				var alt  = this.plan[i][j].altimetry;

				this.scene.pushMatrix();
					this.scene.translate(x,y,0);
					this.scene.scale(1/this.nrDivs,1/this.nrDivs,1);
					
					// If the plan has altimetry different from 0 then apply the reliefTexture else apply the terrainTexture
					if (alt[0][0] > 0 || alt[0][1] > 0 || alt[1][0] > 0 || alt[1][1] > 0)
						this.scene.reliefTexture.apply();
					else 
						this.scene.terrainTexture.apply();

					this.plan[i][j].display();
				this.scene.popMatrix();
				
				x += 1/this.nrDivs;
			}
			y -= 1/this.nrDivs;
		}
    };
}