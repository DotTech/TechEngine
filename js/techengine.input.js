TechEngine.log("Loading 'techengine.input.js'...", true);

/*
//  Namespace:      TechEngine.Input
//  Description:    Keyboard input handling
*/
TechEngine.Input = function ()
{
    // Definition of keyboard buttons
    var data = TechEngine.Data,
        keys = {
            arrowLeft: data.keyButton(37),
            arrowUp: data.keyButton(38),
            arrowRight: data.keyButton(39),
            arrowDown: data.keyButton(40),
            lessThan: data.keyButton(188),
            greaterThan: data.keyButton(190),
            esc: data.keyButton(27),
            shift: data.keyButton(16),
            charR: data.keyButton(82),
            charA: data.keyButton(65),
            charZ: data.keyButton(90),
            charQ: data.keyButton(81),
            charW: data.keyButton(87),
            charE: data.keyButton(69),
            charS: data.keyButton(83),
            charD: data.keyButton(68),
            charX: data.keyButton(88)
        };
    
    /****************** / Public methods / *****************/
    // Update game state according to key states
    var update = function()
    {
        var player = TechEngine.Global.player;
        
        // Turn left
        if (keys.arrowLeft.pressed || keys.charQ.pressed) {
            player.turn(TechEngine.Global.constants.turnStepSize);
        }
        // Turn right
        else if (keys.arrowRight.pressed || keys.charE.pressed) {
            player.turn(-TechEngine.Global.constants.turnStepSize);
        }
        
        // Walk forward
        if (keys.arrowUp.pressed || keys.charW.pressed) {
            player.walk(true);
        }
        // Walk backward
        else if (keys.arrowDown.pressed || keys.charS.pressed) {
            player.walk(false);
        }
        
        // Strafe left
        if (keys.charA.pressed) {
            player.strafe(true);
        }
        // Strafe right
        else if (keys.charD.pressed) {
            player.strafe(false);
        }
        
        // Elevation
        if (keys.charZ.pressed) {
            player.elevate(true);
        }
        else if (keys.charX.pressed) {
            player.elevate(false);
        }
        
        // Stop gameloop interval
        if (keys.esc.pressed) {
            clearInterval(TechEngine.Global.glInterval);
            TechEngine.log("Stopped gameloop...");
        }
    }
    
    // Initialize input handling
    var init = function()
    {
        TechEngine.log("Called: TechEngine.Input.init()");
        
        // Prevents default event handling
        var preventDefault = function(e) 
        {
            e.preventDefault 
                ? e.preventDefault() 
                : e.returnValue = false;
        };
        
        // Handler for keydown events
        var keyDownHandler = function (e) 
        {
            var keyCode = e.keyCode || e.which;
            
            for (var name in keys) {
                if (keys[name].code == keyCode) {
                    keys[name].pressed = true;
                    preventDefault(e);
                }
            }
        };
        
        // Handler for keyup events
        var keyUpHandler = function (e) 
        {
            var keyCode = e.keyCode || e.which;
            
            for (var name in keys) {
                if (keys[name].code == keyCode) {
                    keys[name].pressed = false;
                    preventDefault(e);
                }
            }
        };
        
        window.addEventListener("keydown", keyDownHandler, false);
        window.addEventListener("keyup", keyUpHandler, false);
        
        // Bind key icons to support mobile devices which have no keyboard
        /*var keys = document.getElementsByClassName("keys");

        for (var i = 0, n = keys.length; i < n; ++i) {
            var key = keys[i];
            var keyCode = parseInt(key.getAttribute("data-code"), 0);
            
            (function(k, kc) {
                k.addEventListener("mouseover", function() {
                    keyDownHandler({ keyCode: kc });
                    return false;
                }, false);
                k.addEventListener("mouseout", function() {
                    keyUpHandler({ keyCode: kc });
                    return false;
                }, false);
            }(key, keyCode));
        }*/
    };
    
    return {
        update: update,
        init: init
    };
}();

TechEngine.log("Success!");
TechEngine.includeNext();