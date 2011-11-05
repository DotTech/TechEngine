TechEngine.log("Loading 'techengine.math.js'...", true);

/*
//  Namespace:      TechEngine.Math
//  Description:    Provides mathematical functions
*/
TechEngine.Math = function ()
{
    // Class:       TechEngine.Math.Angle
    // Description: Defines an angle and provides methods for conversion between degrees and radians
    var Angle = function (degrees) 
    {
        var self = this;
        this.degrees = degrees;
        this.radians = 0;
        
        // Set the value of this angle
        // Corrects negative values or values greater than 360 degrees
        this.setValue = function(v) {
            self.degrees = parseFloat(v);
            
            if (self.degrees >= 360) {
                self.degrees -= 360;
            }
            if (self.degrees < 0) {
                self.degrees += 360;
            }
            
            self.radians = self.toRadians();
        };
        
        // Converts the angle from degrees to radians
        this.toRadians = function() {
            if (self.degrees == 90) {
                return Math.PI / 2;
            }
            else if (self.degrees == 270) {
                return 3 * Math.PI / 2;
            }
            return self.degrees * (Math.PI / 180);
        };
        
        // Turn the angle with n degrees
        this.turn = function(degrees) {
            self.setValue(self.degrees + degrees);
        };

        // Determine to which quadrant of a circle the angle is facing
        this.getQuadrant = function() {
            var rounded = ~~ (0.5 + self.degrees);
            
            if ((rounded >= 0 || rounded == 360) && rounded < 90) {
                return 1;
            }
            if (rounded >= 90 && rounded < 180) {
                return 2;
            }
            if (rounded >= 180 && rounded < 270) {
                return 3;
            }
            if (rounded >= 270 && rounded < 360) {
                return 4;
            }
        };
        
        this.setValue(degrees);
    };
    
    var colorRgb = function (r, g, b)
    {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    }
    
    // Calculate difference in x and y for a distance at a specific angle
    var getDeltaXY = function(angle, distance) 
    {
        return TechEngine.Data.vertex(
            Math.cos(angle.radians) * distance,
            Math.sin(angle.radians) * distance
        );
    }
    
    return {
        Angle: Angle,
        colorRgb: colorRgb,
        getDeltaXY: getDeltaXY
    };
}();

TechEngine.log("Success!");
TechEngine.includeNext();