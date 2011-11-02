TechEngine.log("Loading 'techengine.global.js'...", true);

/*
//  Namespace:      TechEngine.Global
//  Description:    Provides access to global constants, variables and objects
*/
TechEngine.Global = function ()
{
    var constants = {
        fieldOfView: 66,                // Player's field of view
        screenSize: { w: 480, h: 360 }, // Size of the projection plane
        moveStepSize: 9,                // How much the player moves each step
        turnStepSize: 3,                // How many degrees the player turns
        glIntervalTimeout: 20,          // Gameloop interval timeout
        canvasIdScene: "scene",         // ID of canvas element to render the scene on
        canvasIdMap: "map",             // ID of canvas element to render the map on
        contextScene: null,             // Canvas context to render the scene on
        contextMap: null,               // Canvas context to render the map on
    };
    
    // Setup canvas elements
    var cs = document.getElementById(constants.canvasIdScene),
        cm = document.getElementById(constants.canvasIdMap);
    
    cs.width = constants.screenSize.w; cs.height = constants.screenSize.h;
    cm.width = constants.screenSize.w; cm.height = constants.screenSize.h;
    
    constants.contextScene  = cs.getContext("2d");
    constants.contextMap    = cm.getContext("2d");
    
    return {
        constants: constants,
        angleBetweenRays: parseFloat(constants.fieldOfView / constants.screenSize.w),
        player: { 
            x: 100, y: 100, z: 0, 
            w: 0, h: 48,
            angle: new TechEngine.Math.Angle(280) 
        },
    }
}();

TechEngine.log("Success!");
TechEngine.includeNext();