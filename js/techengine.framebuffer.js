TechEngine.log("Loading 'techengine.framebuffer.js'...", true);

/*
//  Namespace:      TechEngine.FrameBuffer
//  Description:    Contains the frame buffer with pixel data and functions to manipulate it
*/
TechEngine.FrameBuffer = function ()
{
    var global = TechEngine.Global,
        constants = global.constants,
        width = constants.screenSize.w,
        height = constants.screenSize.h;;

    // Create canvas context to get an empty buffer
    var imageData = document.createElement("canvas").getContext("2d").createImageData(width, height),
        frameBuffer = imageData.data;

    var clear = function()
    {
        for (var i = 0, maxi = width * height * 4; i < maxi; i++) {
            frameBuffer[i] = 0;
        }
    }

    var drawPixel = function(x, y, r, g, b)
    {
        var index = x * 4 + (y * width * 4);

        frameBuffer[index] = r;
        frameBuffer[index + 1] = g;
        frameBuffer[index + 2] = b;
        frameBuffer[index + 3] = 255;
    }

    // Draw a line from point x0,y0 to x1,y1 in the framebuffer
    // http://en.wikipedia.org/wiki/Bresenham's_line_algorithm
    var drawLine = function(x0, y0, x1, y1, r, g, b)
    {
        // Line is only one pixel
        if (x0 == x1 && y0 == y1) {
            drawPixel(x0, y0, r, g, b);
            return;
        }

        // Vertical line
        if (x0 == x1) {
            for (var y = y0; y < y1; y++) {
                drawPixel(x0, y, r, g, b);
            }
            return;
        }

        // Horizontal line
        if (y0 == y1) {
            for (var x = x0; x < x1; x++) {
                drawPixel(x, y0, r, g, b);
            }
            return;
        }

        // Diagonal line
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;
        var err = dx - dy;
        var err2 = 0;

        while (!(x0 == x1 && y0 == y1)) {
            drawPixel(x0, y0, r, g, b);

            err2 = 2 * err;

            if (err2 > -dy) {
                err -= dy;
                x0 += sx;
            }

            if (err2 < dx) {
                err += dx;
                y0 += sy;
            }
        }

        drawPixel(x0, y0, r, g, b);
    }

    var getImageData = function()
    {
        return imageData;
    }

    clear();

    return {
        clear: clear,
        drawPixel: drawPixel,
        drawLine: drawLine,
        getImageData: getImageData
    }
}();

TechEngine.log("Success!");
TechEngine.includeNext();