TechEngine.log("Loading 'techengine.data.js'...", true);

/*
//  Namespace:      TechEngine.Data
//  Description:    Data structure definitions
*/
TechEngine.Data = function ()
{
    var maps = [],
        textures = [],
        sprites = [];
    
    /**
     * Data structure definitions
     */
    
    // Vertex structure
    var vertex = function (x, y) 
    {
        return { 
            x: x, 
            y: y  
        };
    };
    
    // Wall structure
    var wall = function (v1, v2, isPortal, portalSectorId, front, back) 
    {
        return { 
            v1: v1,         // From vertex
            v2: v2,         // To vertex
            isPortal: isPortal,             // true if this wall is a portal to another sector
            portalSectorId: portalSectorId, // Index of the sector this wall is a portal to
            front: front,   // Front side (visible from inside the sector)
            back: back      // Back side (visible from outside the sector)
        };
    };
    
    // Wall side structure
    var wallside = function (topTexture, middleTexture, bottomTexture) 
    {
        return {
            topTexture: topTexture,         // Reference to the texture object used for wall top
            middleTexture: middleTexture,   // Reference to the texture object used for wall middle
            bottomTexture: bottomTexture,   // Reference to the texture object used for wall bottom
        };
    };
    
    // Sector structure
    var sector = function (floorHeight, ceilingHeight, floorTexture, ceilingTexture) 
    {
        return {
            floorHeight: floorHeight,
            ceilingHeight: ceilingHeight,
            floorTexture: floorTexture,
            ceilingTexture: ceilingTexture,
            vertices: [],
            walls: [],
            objects: [],
            childsectors: []
        };
    };
    
    // Map structure
    var map = function () 
    {
        return {
            playerStart: { 
                x: 0, 
                y: 0, 
                z: 0, 
                angle: 0 
            },
            background: new Image(), // Sky background
            textures: [], // Array of Image objects
            sectors: []   // Array of sector objects
        };
    };
    
    // Keyboard key structure
    var keyButton = function (code) 
    {
        return {
            code: code,
            pressed: false
        };
    };
    
    // Drawing parameters for a vertical scanline of an object
    var VScanDrawParams = function () 
    {
        return {
            sy1: 0, // Scanline start Y coord (potentially off-screen)
            sy2: 0, // Scanline end Y coord (potentially off-screen)
            dy1: 0, // Destination start Y coord (on screen)
            dy2: 0, // Destination end Y coord (on screen)
            ty1: 0, // Texture image start Y coord
            ty2: 0, // Texture image end Y coord
            tx: 0   // Texture image X coord
        };
    };
    
    // Definition of an intersection with a wall or object in the game world
    var intersection = function () 
    {
        return {
            v1: null,           // Vertex 1
            v2: null,           // Vertex 2
            x: 0,               // X coordinate of this intersection
            y: 0,               // Y coordinate of this intersection
            distance: 0,        // Distance from source (player) to the intersection
            resourceId: 0,      // index of texture or sprite image in Objects namespace
            levelObjectId: 0,   // index of texture or sprite in Objects.Level namespace
            isSprite: false,    // true if intersection is for a sprite, otherwise its for a wall
            drawParams: null    // VSliceDrawParams object for this intersection
        };
    };
    
    // Returns an Image object containing a texture
    var texture = function (src)
    {
        var img = new Image();
        img.src = src;

        return img;
    };

    
    /**
     * Loading of game resources
     */
    
    // Load the textures.
    // TODO: Refactor
    var loadTextures = function ()
    {
        TechEngine.log("Called: TechEngine.Data.loadTextures()");

        textures[0] = new Image();
        textures[0].src = "img/bricks-brown.png";
    };

    // Load map with index id as active map
    var loadMap = function (id)
    {
        TechEngine.log("Called: TechEngine.Data.loadMap()");
        
        var global = TechEngine.Global,
            map = global.maps[id];
        
        global.activeMap = map;
        
        global.player.x = map.playerStart.x;
        global.player.y = map.playerStart.y;
        global.player.z = map.playerStart.z;
        global.player.angle.setValue(map.playerStart.angle);
    };
    
	
    // Reveal public members
    return {
        // Structures
        vertex: vertex,
        wall: wall,
        wallside: wallside,
        sector: sector,
        map: map,
        texture: texture,
        keyButton: keyButton,
        VScanDrawParams: VScanDrawParams,
        intersection: intersection,
        
        // Resource arrays
        maps: maps,
        textures: textures,
        sprites: sprites,
        
        // Methods
        loadTextures: loadTextures,
        loadMap: loadMap
    };
}();

TechEngine.log("Success!");
TechEngine.includeNext();