TechEngine.log("Loading 'techengine.data.js'...", true);

/*
//  Namespace:      TechEngine.Data
//  Description:    Data structures and resources
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
    var vertex = function (x, y) {
        return { 
            x: x, 
            y: y  
        };
    };
    
    // Wall structure
    var wall = function (v1, v2, portal, front, back) {
        return { 
            v1: v1,         // From vertex
            v2: v2,         // To vertex
            portal: portal, // Is this wall a sector portal?
            front: front,   // Front side (visible from inside the sector)
            back: back      // Back side (visible from outside the sector)
        };
    };
    
    // Wall side structure
    var wallside = function (topTexture, middleTexture, bottomTexture) {
        return {
            topTexture: topTexture,         // index of texture to use for wall top
            middleTexture: middleTexture,   // index of texture to use for wall middle
            bottomTexture: bottomTexture,   // index of texture to use for wall bottom
        };
    };
    
    // Sector structure
    var sector = function (floorHeight, ceilingHeight, floorTexture, ceilingTexture) {
        return {
            floorHeight: floorHeight,
            ceilingHeight: ceilingHeight,
            floorTexture: floorTexture,
            ceilingTexture: ceilingTexture,
            vertices: new Array(),
            walls: new Array(),
            objects: new Array()
        };
    };
    
    // Map structure
    var map = function () {
        return {
            playerStart: { 
                x: 0, 
                y: 0, 
                z: 0, 
                angle: 0 
            },
            sectors: new Array()
        };
    };
    
    /**
     * Loading of resources
     */
    
    // ... to be implemented...
    

    return {
        vertex: vertex,
        wall: wall,
        wallside: wallside,
        sector: sector,
        map: map,
        
        maps: maps,
        textures: textures,
        sprites: sprites
    };
}();

TechEngine.log("Success!");
TechEngine.includeNext();