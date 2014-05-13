TechEngine.log("Loading 'techengine.data.js'...", true);

/*
//  Namespace:      TechEngine.Data
//  Description:    Data structure definitions and resource buffers
*/
TechEngine.Data = function ()
{
    var maps = new Array(),
        textures = new Array(),
        sprites = new Array();
    
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
            portalSectorId: portalSectorId, // Id of the sector this wall is a portal to
            front: front,   // Front side (visible from inside the sector)
            back: back      // Back side (visible from outside the sector)
        };
    };
    
    // Wall side structure
    var wallside = function (topTexture, middleTexture, bottomTexture) 
    {
        return {
            topTexture: topTexture,         // index of texture to use for wall top
            middleTexture: middleTexture,   // index of texture to use for wall middle
            bottomTexture: bottomTexture,   // index of texture to use for wall bottom
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
            vertices: new Array(),
            walls: new Array(),
            objects: new Array(),
            childsectors: new Array()
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
            background: new Image(),
            sectors: new Array()
        };
    };
    
    // Keyboard key structur
    var keyButton = function (code) 
    {
        return {
            code: code,
            pressed: false
        };
    };
    
    // Drawing parameters for a vertical slice (scanline) of an object
    var VSliceDrawParams = function () 
    {
        return {
            dy1: 0,         // Destination start Y coord
            dy2: 0,         // Destination end Y coord
            sy1: 0,         // Source image start Y coord
            sy2: 0,         // Source image end Y coord
            texture: null   // Image object containing the texture or sprite to draw
        };
    };
    
    // Definition of an intersection with a wall or object in the game world
    var intersection = function () 
    {
        return {
            x: 0,               // X coordinate of this intersection
            y: 0,               // Y coordinate of this intersection
            distance: 0,        // Distance from source (player) to the intersection
            resourceId: 0,      // index of texture or sprite image in Objects namespace
            levelObjectId: 0,   // index of texture or sprite in Objects.Level namespace
            textureX: 0,        // X coordinate of the texture scanline to draw
            isSprite: false,    // true if intersection is for a sprite, otherwise its for a wall
            drawParams: null    // VSliceDrawParams object for this intersection
        };
    };
    
    
    /**
     * Loading of game resources
     */
    
    // Load map with index id as active map
    var loadMap = function (id)
    {
        TechEngine.log("Called: TechEngine.Data.loadMap()");
        
        var map = TechEngine.Data.maps[0],
            global = TechEngine.Global;
        
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
        keyButton: keyButton,
        VSliceDrawParams: VSliceDrawParams,
        intersection: intersection,
        
        // Resource arrays
        maps: maps,
        textures: textures,
        sprites: sprites,
        
        // Methods
        loadMap: loadMap
    };
}();

TechEngine.log("Success!");
TechEngine.includeNext();