TechEngine.log("Loading 'techengine.global.js'...", true);

/*
//  Namespace:      TechEngine.Global
//  Description:    Provides access to global constants, variables and objects
*/
TechEngine.Global = function ()
{
    // Constant values
    var constants = {
        fieldOfView: 66,                // Player's field of view
        screenSize: { w: 480, h: 360 }, // Size of the projection plane
        moveStepSize: 9,                // How much the player moves each step
        turnStepSize: 3,                // How many degrees the player turns
        startFadingAt: 100,             // At what distance to start fading visibility
        glIntervalTimeout: 20,          // Gameloop interval timeout
        canvasIdScene: "scene",         // ID of canvas element to render the scene on
        canvasIdMap: "map",             // ID of canvas element to render the map on
        mapScale: 0.2
    };
    
    // Global variables
    var contextScene,
        contextMap,
        activeMap,
        keys,
        glInterval,
        player,
        angleBetweenRays = parseFloat(constants.fieldOfView / constants.screenSize.w),
        distanceToViewport = Math.round(constants.screenSize.w / 2 / Math.tan(constants.fieldOfView / 2 * (Math.PI / 180)));
        watchWindow = document.getElementById("watch");
    
    // Initialize canvas contexts
    cs = document.getElementById(constants.canvasIdScene),
    cm = document.getElementById(constants.canvasIdMap);    
    cs.width = constants.screenSize.w; cs.height = constants.screenSize.h;
    cm.width = constants.screenSize.w; cm.height = constants.screenSize.h;
    
    contextScene  = cs.getContext("2d");
    contextMap    = cm.getContext("2d");
    
    // Reveal public members
    return {
        constants: constants,
        contextScene: contextScene,
        contextMap: contextMap,
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