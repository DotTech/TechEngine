TechEngine.log("Loading 'techengine.player.js'...", true);

/*
//  Class:          TechEngine.Player
//  Description:    Player properties and methods
*/
TechEngine.Global.player = new function ()
{
    var constants = TechEngine.Global.constants;
    
    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.width = 0;
    this.height = 0;
    this.angle = new TechEngine.Math.Angle(0);
    
    // Make the player turn by increasing its viewing angle
    this.turn = function(angle)
    {
        this.angle.turn(angle);
    };
    
    // Make the player walk forward or backwards
    this.walk = function(forward)
    {
        var step = forward ? constants.moveStepSize : -constants.moveStepSize,
            delta = TechEngine.Math.getDeltaXY(this.angle, step);
            
        this.x = Math.round(this.x + delta.x);
        this.y = Math.round(this.y - delta.y);
        
        /*angle = forward  ? player.angle  : new Raycaster.Classes.Angle(player.angle.degrees + 180);
        var intersection = findIntersection(angle);        
        if (!intersection || intersection.distance > 50) {
        }*/
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
        var math = TechEngine.Math,
            angle = left 
                ? new math.Angle(this.angle.degrees + 90)
                : new math.Angle(this.angle.degrees - 90),
            delta = math.getDeltaXY(angle, constants.moveStepSize);
        
        this.x = Math.round(this.x + delta.x);
        this.y = Math.round(this.y - delta.y);
        
        /*var intersection = findIntersection(angle);
        if (!intersection || intersection.distance > 20) {
        }*/
    };

}();

TechEngine.log("Success!");
TechEngine.includeNext();