TechEngine.log("Loading 'techengine.drawing.js'...", true);

TechEngine.Drawing = function (context)
{
    // Clear the screen
    var clear = function() 
    {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    };
    
    // Get rgb() color string
    var colorRgb = function(r, g, b) 
    {
        return "rgb(" + r + ", " + g + ", " + b + ")";
    };
    
    // Get rgba() color string
    var colorRgba = function(r, g, b, a) 
    {
        return "rgba(" + r + ", " + g + ", " + b + ", " + a + ")";
    };
    
    // Draws a circle
    var circle = function(x, y, radius, color) 
    {
        context.beginPath();
        context.fillStyle = color;
        context.arc(x, y, radius, 0, Math.PI*2, true);
        context.fill();
        context.closePath();
    };
    
    // Draws a square
    var square = function(x, y, width, height, color)
    {
        context.beginPath();
        context.fillStyle = color;
        context.fillRect(x, y, width, height);
        context.closePath();
    };
    
    var filledPath = function(vectorArray, color, shrinkFactor)
    {
        context.beginPath();
        
        for (var i in vectorArray) {
            var vector = vectorArray[i],
                x1 = shrinkFactor ? vector.x1 / shrinkFactor : vector.x1,
                x2 = shrinkFactor ? vector.x2 / shrinkFactor : vector.x2,
                y1 = shrinkFactor ? vector.y1 / shrinkFactor : vector.y1,
                y2 = shrinkFactor ? vector.y2 / shrinkFactor : vector.y2;
            
            if (i == 0) {
                context.moveTo(x1, y1);
            }
            context.lineTo(x2, y2);
        }
        
        context.fillStyle = color;
        context.fill();
        
        context.closePath();
    };
    
    // Draws a line
    // Note: for some reason lineTo() and stroke() result in a semi-transparent line
    // If you want to be sure the line is of solid color, use lineSquare() instead
    var line = function(x, y, x2, y2, color)
    {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x2, y2);
        context.strokeStyle = color;
        context.stroke();
        context.closePath();
    };
    
    // Draw text
    var text = function(text, x, y, color, font)
    {
        context.fillStyle = color;
        context.font = font;
        context.textBaseline = "top";
        context.fillText(text, x, y);
    };
    
    return {
        clear: clear,
        circle: circle,
        square: square,
        line: line, 
        text: text,
        filledPath: filledPath
    };
};

TechEngine.log("Success!");
TechEngine.includeNext();