class MyInterface extends CGFinterface {

	/**
	 * MyInterface
	 * @constructor
	 */
 	constructor () 
 	{
 		super();
 	}
	
	/**
	 * init
	 * @param {CGFapplication} application
	 */
	init(application) 
	{
		// call CGFinterface init
		super.init(application);

		this.gui = new dat.GUI();

		var lights = this.gui.addFolder("Lights");
		lights.open();
		lights.add(this.scene, 'light_0');
		lights.add(this.scene, 'light_1');
		lights.add(this.scene, 'light_2');
		lights.add(this.scene, 'light_3');
		lights.add(this.scene, 'light_4');

		this.gui.add(this.scene,'displayAxis');

		this.gui.add(this.scene, 'speed', -10, 20);

		var textures = this.gui.addFolder("Textures");
		textures.open();
		textures.add(this.scene, 'currVehicleAppearance', this.scene.vehicleAppearanceList);
		textures.add(this.scene, 'currVehicleFrameAppearance', this.scene.vehicleFrameAppearanceList);
		textures.add(this.scene, 'currTerrainAppearance', this.scene.terrainAppearanceList);
		textures.add(this.scene, 'currCraneAppearance',	this.scene.craneAppearanceList);

		this.initKeys();

		return true;
	};

	initKeys()
	{
		this.scene.gui = this;
		this.processKeyboard = function(){};
		this.activeKeys = {};
	};

	processKeyDown(event)
	{
		this.activeKeys[event.code] = true;
		if(this.scene.vehicle != null)
			this.scene.vehicle.keyDown(event.code);
	};
	
	processKeyUp(event)
	{
		this.activeKeys[event.code] = false;
		if(this.scene.vehicle != null)
			this.scene.vehicle.keyUp(event.code);
	};
	
	isKeyPressed(keyCode)
	{
		return this.activeKeys[keyCode] || false;
	};
	
};