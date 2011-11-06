/*
    TechEngine
    A 3D game engine in Javascript
    
    Author:     Ruud van Falier (ruud@dottech.nl)
    Version:    1.0.0
    Released:   -
    
    Demo:       http://www.dottech.nl/techengine/
    Git:        https://github.com/Stribe/TechEngine
    
    ...description here
    
    See readme.txt for revision log!
*/

var TechEngine = 
{
    // Include files in loading order
    includes: [ "js/techengine.math.js", "js/techengine.global.js", "js/techengine.data.js", 
                "js/techengine.data.map1.js", "js/techengine.canvas.js", "js/techengine.rendering.js",
                "js/techengine.rendering.core.js",  "js/techengine.player.js", "js/techengine.input.js", 
                "js/techengine.main.js" ],
    
    // Namespaces used in this application
    Global:     {},
    Data:       {},
    Math:       {},
    Rendering:  {},
    Input:      {},
    Main:       {},
    
    // Write to debug log, needs to be defined before other files are included
    log: function (msg, nobreak) 
    {
        var e = document.getElementById("messages");
        if (typeof e != "undefined" && e != null) {
            e.innerHTML += msg + (nobreak ? "" : "<br />");
        }
    },
    
    // All files that need to be included for this application are listed in the TechEngine.includes[] array.
    // This function includes the first file in the array and then removes the element from the array.
    // The function is called by each include file to ensure all files are loaded one after another.
    includeNext: function () 
    {
        if (TechEngine.includes.length > 0) {
            var e = document.createElement("script");
            
            e.setAttribute("type", "text/javascript");
            e.setAttribute("src", TechEngine.includes.splice(0, 1));
            
            document.body.appendChild(e);
        }
    }
};

// Load the first include file when DOM has loaded
document.addEventListener("DOMContentLoaded", function () 
{
    TechEngine.log("Starting application...");
    TechEngine.includeNext();
}, true);