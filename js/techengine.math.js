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
    
    // Calculate difference in x and y for a distance at a specific angle
    var getDeltaXY = function(angle, distance) 
    {
        return TechEngine.Data.vertex(
            Math.cos(angle.radians) * distance,
            Math.sin(angle.radians) * distance
        );
    }
    
    // Determine wether point lies within a polygon defined by the vertices array
    // Implementation of inPoly algorithm by Bob Stein (http://www.visibone.com/inpoly/)
    var isPointInPolygon = function (point, vertices)
    {
        var isInPolygon = false,
            vold = vertices[vertices.length - 1],
            vnew, v1, v2;
        
        if (vertices.length < 3) {
            return false;
        }
        
        for (var i = 0, max = vertices.length; i < max; i++) {
            vnew = vertices[i];
            v1 = (vnew.x > vold.x) ? vold : vnew;
            v2 = (vnew.x > vold.x) ? vnew : vold;
            
            if ((vnew.x < point.x == point.x <= vold.x) &&
                ((point.y - v1.y) * (v2.x - v1.x) < (v2.y - v1.y) * (point.x - v1.x))) {
                isInPolygon = !isInPolygon;
            }
            
            vold = vnew;
        }
        
        return isInPolygon;
    };
    
    // Determine wether an intersection is located in the quadrant we are looking at
    var isCorrectQuadrant = function(intersection, angle)
    {
        var deltaX = TechEngine.Global.player.x - intersection.x,
            deltaY = TechEngine.Global.player.y - intersection.y,
            quadrant = 0;
        
        var roundedAngle = ~~ (0.5 + angle.degrees);
        if (roundedAngle == 0 || roundedAngle == 360) {
            return deltaX < 0;
        }
        else if (roundedAngle == 90) {
            return deltaY > 0;
        }
        else if (roundedAngle == 180) {
            return deltaX > 0;
        }
        else if (roundedAngle == 270) {
            return deltaY < 0;
        }
        
        if (deltaX < 0 && deltaY >= 0) quadrant = 1;
        if (deltaX >= 0 && deltaY > 0) quadrant = 2;
        if (deltaX > 0 && deltaY <= 0) quadrant = 3;
        if (deltaX <= 0 && deltaY < 0) quadrant = 4;
        
        return quadrant == angle.getQuadrant();
    }
    
    // Calculate ray intersection point on a line
    var getIntersection = function(v1, v2, angle, dontRoundCoords) 
    {
        // Ray vector
        var line = { x1: v1.x, x2: v2.x, y1: v1.y, y2: v2.y },
            player = TechEngine.Global.player,
            px1 = player.x,
            py1 = player.y,
            px2 = px1 + Math.cos(angle.radians),
            py2 = py1 - Math.sin(angle.radians);
        
        // Magic number that we need to solve our equation
        // More info on this here: http://paulbourke.net/geometry/lineline2d/
        var f1 = ((line.x2 - line.x1) * (py1 - line.y1) - (line.y2 - line.y1) * (px1 - line.x1)) /
                 ((line.y2 - line.y1) * (px2 - px1) - (line.x2 - line.x1) * (py2 - py1));
        
        // Calculate where the ray intersects with the line
        var i = TechEngine.Data.intersection();
            i.x = px1 + f1 * (px2 - px1),
            i.y = py1 + f1 * (py2 - py1);
        
        // Check if intersection is located on the line
        var hit = true,
            intersX = i.x,
            intersY = i.y,
            linex1 = line.x1,
            linex2 = line.x2,
            liney1 = line.y1,
            liney2 = line.y2;
                
        // When looking for walls we want to round the intersection coordinates before comparing them
        // When looking for sprites we dont want those coords rounded, otherwise the result is not exact enough
        if (!dontRoundCoords) {
            // Round the numbers using bitwise rounding hack
            intersX = ~~ (0.5 + i.x);
            intersY = ~~ (0.5 + i.y);
        }
        
        hit = (linex1 >= linex2) 
            ? intersX <= linex1 && intersX >= linex2
            : intersX >= linex1 && intersX <= linex2;
        if (hit) {
            hit = (liney1 >= liney2)
                ? intersY <= liney1 && intersY >= liney2
                : intersY >= liney1 && intersY <= liney2;
        }
        
        // The formula will also return the intersections that are behind the player
        // Only return it if it's located in the correct quadrant
        if (!isCorrectQuadrant(i, angle) || !hit) {
            return false;
        }
        
        // Calculate distance to the intersection
        var deltaX = player.x - i.x,
            deltaY = player.y - i.y;
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            i.distance = Math.abs(deltaX / Math.cos(angle.radians));
        }
        else {
            i.distance = Math.abs(deltaY / Math.sin(angle.radians));
        }
        
        return i;
    };
    
    return {
        Angle: Angle,
        getDeltaXY: getDeltaXY,
        isPointInPolygon: isPointInPolygon,
        getIntersection: getIntersection
    };
}();

TechEngine.log("Success!");
TechEngine.includeNext();