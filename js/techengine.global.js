TechEngine.log("Loading 'techengine.global.js'...", true);

/*
//  Namespace:      TechEngine.Global
//  Description:    Provides access to global constants, variables and objects.
//                  Also contains the map data
*/
TechEngine.Global = function ()
{
    // Constant values
    var constants = {
        fieldOfView: 66,                // Player's field of view
        eyeHeight: 48,                  // Player's eye height
        screenSize: { w: 480, h: 360 }, // Size of the projection plane
        moveStepSize: 9,                // How much the player moves each step
        turnStepSize: 3,                // How many degrees the player turns
        startFadingAt: 400,             // At what distance to start fading visibility
        glIntervalTimeout: 20,          // Gameloop interval timeout
        canvasIdScene: "scene",         // ID of canvas element to render the scene on
        canvasIdMap: "map",             // ID of canvas element to render the map on
        mapScale: 0.2
    };
    
    // Global variables
    var contextScene,   // Canvas context for the scene
        contextMap,     // Canvas context for the map
        maps = [],      // All the available maps
        activeMap,      // Active map
        keys,           // Key definitions
        glInterval,     // Gameloop interval
        player,         // Player object
        angleBetweenRays = parseFloat(constants.fieldOfView / constants.screenSize.w),
        distanceToViewport = Math.round(constants.screenSize.w / 2 / Math.tan(constants.fieldOfView / 2 * (Math.PI / 180)));
        watchWindow = document.getElementById("watch");
    
    // Initialize canvas contexts
    cs = document.getElementById(constants.canvasIdScene),
    cm = document.getElementById(constants.canvasIdMap);    
    cs.width = constants.screenSize.w; cs.height = constants.screenSize.h;
    cm.width = constants.screenSize.w; cm.height = constants.screenSize.h;
    
    contextScene = cs.getContext("2d");
    contextMap   = cm.getContext("2d");
    
    // Reveal public members
    return {
        constants: constants,
        contextScene: contextScene,
        contextMap: contextMap,
        maps: maps,
        activeMap: activeMap,
        keys: keys,
        glInterval: glInterval,
        angleBetweenRays: angleBetweenRays,
        distanceToViewport: distanceToViewport,
        watchWindow: watchWindow,
        player: player,
    }
}();

TechEngine.log("Success!");
TechEngine.includeNext();