TechEngine.log("Loading 'techengine.main.js'...");

Array.prototype.contains = function(v) {
    for(var i = 0; i < this.length; i++) {
        if(this[i] === v) return true;
    }
    return false;
};

Array.prototype.unique = function() {
    var arr = [];
    for(var i = 0; i < this.length; i++) {
        if(!arr.contains(this[i])) {
            arr.push(this[i]);
        }
    }
    return arr; 
}

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
        
        // Load textures
        TechEngine.Data.loadTextures();

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