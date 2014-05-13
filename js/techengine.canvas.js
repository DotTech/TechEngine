TechEngine.log("Loading 'techengine.canvas.js'...", true);

/*
//  Namespace:      TechEngine.Canvas
//  Description:    Extends the canvas 2D context with some basic drawing functions
*/

// Clear the screen
CanvasRenderingContext2D.prototype.clear = function() 
{
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasRenderingContext2D.prototype.rgb = function (r, g, b)
{
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

CanvasRenderingContext2D.prototype.rgba = function (r, g, b, a)
{
    return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
}

// Draws a circle
CanvasRenderingContext2D.prototype.circle = function(x, y, radius, color) 
{
    this.beginPath();
    this.fillStyle = color;
    this.arc(x, y, radius, 0, Math.PI*2, true);
    this.fill();
    this.closePath();
};

// Draws a square
CanvasRenderingContext2D.prototype.square = function(x, y, width, height, color)
{
    this.beginPath();
    this.fillStyle = color;
    this.fillRect(x, y, width, height);
    this.closePath();
};

CanvasRenderingContext2D.prototype.filledPath = function(vectorArray, color, shrinkFactor)
{
    this.beginPath();
    
    for (var i in vectorArray) {
        var vector = vectorArray[i],
            x1 = shrinkFactor ? vector.x1 / shrinkFactor : vector.x1,
            x2 = shrinkFactor ? vector.x2 / shrinkFactor : vector.x2,
            y1 = shrinkFactor ? vector.y1 / shrinkFactor : vector.y1,
            y2 = shrinkFactor ? vector.y2 / shrinkFactor : vector.y2;
        
        if (i == 0) {
            this.moveTo(x1, y1);
        }
        this.lineTo(x2, y2);
    }
    
    this.fillStyle = color;
    this.fill();
    
    this.closePath();
};

// Draws a line
// Note: for some reason lineTo() and stroke() result in a semi-transparent line
// If you want to be sure the line is of solid color, use lineSquare() instead
CanvasRenderingContext2D.prototype.line = function(x, y, x2, y2, color)
{
    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(x2, y2);
    this.strokeStyle = color;
    this.stroke();
    this.closePath();
};

CanvasRenderingContext2D.prototype.lineSquare = function (x, y, x2, y2, color)
{
    this.square(x, y, x2, y2 - y, color);
};

// Draw text
CanvasRenderingContext2D.prototype.text = function(text, x, y, color, font)
{
    this.fillStyle = color;
    this.font = font;
    this.textBaseline = "top";
    this.fillText(text, x, y);
};

TechEngine.log("Success!");
TechEngine.includeNext();