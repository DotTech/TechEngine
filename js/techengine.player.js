TechEngine.log("Loading 'techengine.player.js'...", true);

/*
//  Class:          TechEngine.Player
//  Description:    Player properties and methods
*/
TechEngine.Global.player = new function ()
{
    var global = TechEngine.Global,
        constants = global.constants,
        math = TechEngine.Math;
    
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.width = 0;
    this.height = constants.eyeHeight;
    this.angle = new math.Angle(0);
    
    var self = this;

    // Checks for collision in a given direction
    var collision = function(angle, threshold)
    {
        // TODO: Store all intersections per rendering cycle so we don't need to find them again
        var intersections = TechEngine.Rendering.Core.findObjects(angle, 0, false);
        
        if (intersections.length > 0) {
            // Find nearest intersection
            var intersection = intersections[intersections.length - 1];

            // Ignore collision on portals
            if (intersection.mapObjectType == constants.mapObjectTypes.wall
                && intersection.mapObject.isPortal) {
                return false;
            }

            return intersection.distance < threshold;
        }
        
        return false;
    }

    // Makes the player stick to the floor
    var applyGravity = function()
    {
        var i = self.getCurrentSectorId();

        self.z = global.activeMap.sectors[i].floorHeight;
    }

    // Returns the sector the player is currently located in
    this.getCurrentSectorId = function ()
    {
        var map = global.activeMap;
        
        for (var i = 0, max = map.sectors.length; i < max; i++) {
            if (math.isPointInPolygon(this, map.sectors[i].vertices)) {
                return i;
            }
        }
        
        return false;
    };

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
        
        var movementAngle = forward 
            ? this.angle 
            : new math.Angle(this.angle.degrees + 180);

        // Collision detection
        if (collision(movementAngle, 50)) {
            return false;
        }

        // Move player
        this.x = Math.round(this.x + delta.x);
        this.y = Math.round(this.y - delta.y);

        applyGravity();
    };
    
    // Elevate player up or down
    this.elevate = function(up)
    {
        /*var step = up ? constants.moveStepSize : -constants.moveStepSize;
        this.z += step;
        
        // Prevent player from going under ground
        if (this.z < 0) {
            this.z = 0;
        }*/
    };
    
    // Make player strafe left or right
    this.strafe = function(left)
    {
        var angle = left 
                ? new math.Angle(this.angle.degrees + 90)
                : new math.Angle(this.angle.degrees - 90),
            delta = math.getDeltaXY(angle, constants.moveStepSize);
        
        // Collision detection
        if (collision(angle, 30)) {
            return false;
        }

        // Move player
        this.x = Math.round(this.x + delta.x);
        this.y = Math.round(this.y - delta.y);

        applyGravity();
    };

}();

TechEngine.log("Success!");
TechEngine.includeNext();