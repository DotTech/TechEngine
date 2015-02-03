TechEngine.log("Loading 'techengine.main.js'...");

/*
//  Namespace:      TechEngine.Main
//  Description:    Main entry point of the application
*/
TechEngine.Main = function ()
{
    // Initialize and start TechEngine 
    var init = function ()
    {
        // Init input handling
        TechEngine.Input.init();
        
        // Load active map
        TechEngine.Data.loadMap(0);
        
        // Start the gameloop
        TechEngine.log("Starting gameloop...");
        TechEngine.Global.glInterval = setInterval(gameLoop, TechEngine.Global.constants.glIntervalTimeout);
    };
    
    var gameLoop = function ()
    {
        TechEngine.Input.update();
        TechEngine.Rendering.Map.update();
        TechEngine.Rendering.Scene.update();
        TechEngine.Rendering.WatchWindow.update();
    };
    
    // Initialize and start the gameloop
    init();
    
}();

TechEngine.log("Success!");