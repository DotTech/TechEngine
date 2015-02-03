TechEngine.log("Loading 'techengine.player.js'...", true);

/*
//  Class:          TechEngine.Player
//  Description:    Player properties and methods
*/
TechEngine.Global.player = new function ()
{
    var constants = TechEngine.Global.constants,
        math = TechEngine.Math;
    
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.width = 0;
    this.height = constants.eyeHeight;
    this.angle = new math.Angle(0);
    
    // Checks for collision in a given direction
    var collision = function(angle, threshold)
    {
        var objects = TechEngine.Rendering.Core.findObjects(angle, 0);
        
        if (objects.length > 0) {
            return objects[0].distance < threshold;
        }
        
        return false;
    }

    // Make the player turn by increasing its viewing angle
    this.turn = function(angle)
    {
        this.angle.turn(angle);
    };
    
    // Make the player walk forward or backwards
    this.walk = function(forward)
    {
        var step = forward ? constants.moveStepSize : -constants.moveStepSize,
            delta = math.getDeltaXY(this.angle, step);
            
        // Collision detection
        var movementAngle = forward 
            ? this.angle 
            : new math.Angle(this.angle.degrees + 180);

        if (!collision(movementAngle, 50)) {
            this.x = Math.round(this.x + delta.x);
            this.y = Math.round(this.y - delta.y);
        }
    };
    
    // Elevate player up or down
    this.elevate = function(up)
    {
        var step = up ? constants.moveStepSize : -constants.moveStepSize;
        this.z += step;
        
        // Prevent player from going under ground
        if (this.z < 0) {
            this.z = 0;
        }
    };
    
    // Make player strafe left or right
    this.strafe = function(left)
    {
        var angle = left 
                ? new math.Angle(this.angle.degrees + 90)
                : new math.Angle(this.angle.degrees - 90),
            delta = math.getDeltaXY(angle, constants.moveStepSize);
        
        // Collision detection
        if (!collision(angle, 20)) {
            this.x = Math.round(this.x + delta.x);
            this.y = Math.round(this.y - delta.y);
        }
    };

}();

TechEngine.log("Success!");
TechEngine.includeNext();