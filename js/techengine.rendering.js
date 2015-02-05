TechEngine.log("Loading 'techengine.rendering.js'...", true);

/*
//  Namespace:      TechEngine.Rendering
//  Description:    Functions for rendering the map and 3D scene
//
//  Public methods: Map.render()
//                  Scene.render()
//                  updateWatchWindow()
*/
TechEngine.Rendering = function ()
{
    var global = TechEngine.Global,
        frameBuffer = TechEngine.FrameBuffer,
        constants = global.constants,
        map = global.activeMap,
        sceneScreen = global.contextScene,
        lastFpsUpdate = new Date().getTime();

    // Updates the values in the watch window
    var WatchWindow = function ()
    {
        var scannedSectors = [];

        var update = function ()
        {
            var win = global.watchWindow;
            
            if (typeof win != "undefined" && win != null) {
                var elapsed = new Date().getTime() - lastFpsUpdate,
                    fpsinfo = "<strong>" + Math.round(1000 / elapsed) + " </strong>fps<br />",
                    player = global.player,
                    pinfo = "Player { x: " + player.x + ", y: " + player.y + ", z: " + player.z + ", height: " + player.height + ", width: " + player.width + ", angle: " + player.angle.degrees + "}<br />",
                    csectors = "Scanned sectors: " + TechEngine.Rendering.WatchWindow.scannedSectors.unique() + "<br />",
                    watch = fpsinfo + pinfo;
                
                // Display which sectors the player is located in
                var map = global.activeMap,
                    sectorinfo = "Located in sector(s): ";
                
                var getSectorInfo = function (sectors)
                {
                    for (var i = 0, max = sectors.length; i < max; i++) {
                        if (TechEngine.Math.isPointInPolygon(player, sectors[i].vertices)) {
                            sectorinfo += i + ", ";
                            
                            if (sectors[i].childsectors.length > 0) {
                                getSectorInfo(sectors[i].childsectors);
                            }
                        }
                    }
                }(map.sectors);

                win.innerHTML = watch + sectorinfo + "<br />" + csectors;
                lastFpsUpdate = new Date().getTime();
            }
        }

        return {
            update: update,
            scannedSectors: scannedSectors
        };
    }();
    
    // Namespace: TechEngine.Rendering.Map
    // Handles rendering of the map view
    var Map = function ()
    {
        // Draw all the wall lines from a specific sector
        var drawWalls = function (context, sector, scale)
        {
            for (var w = 0; w < sector.walls.length; w++) {
                var wall = sector.walls[w],
                    v1 = sector.vertices[wall.v1],
                    v2 = sector.vertices[wall.v2];
                
                context.line(v1.x * scale, v1.y * scale,
                             v2.x * scale, v2.y * scale,
                             wall.isPortal ? "#00ff00" : "#000");
            }
        };
        
        // Draw all the vertices from a specific sector
        var drawVertices = function (context, sector, scale)
        {
            for (var v = 0; v < sector.vertices.length; v++) {
                var vertex = sector.vertices[v];
                context.circle(vertex.x * scale, vertex.y * scale, 2, "#ff0000");
            }
        };
        
        // Recursively draw all vectrices and walls from a specific sector and its subsectors
        var drawSector = function (context, sector, scale)
        {
            drawWalls(context, sector, scale);
            drawVertices(context, sector, scale);
            
            for (var s = 0, max = sector.childsectors.length; s < max; s++) {
                drawSector(context, sector.childsectors[s], scale);
            }
        };
        
        // Draw the player
        var drawPlayer = function (context, player, scale)
        {
            context.circle(Math.floor(player.x * scale), Math.floor(player.y * scale), 3, "#ff0000");
            
            // Visualize the viewing range on the map
            var angle = new TechEngine.Math.Angle(player.angle.degrees + constants.fieldOfView / 2),
                rayStep = 10;
            
            for (var i = 0, max = constants.screenSize.w; i < max; i += rayStep) 
            {
                var distance = 100;
                    deltax = Math.floor(Math.cos(angle.radians) * Math.abs(distance)),
                    deltay = Math.floor(Math.sin(angle.radians) * Math.abs(distance));
                
                context.line(player.x * scale, player.y * scale, 
                            (player.x + deltax) * scale, (player.y - deltay) * scale, context.rgb(200, 200, 0));
                
                angle.turn(-global.angleBetweenRays * rayStep);
            }
        };
        
        // Render the top-down view of the map
        var update = function ()
        {
            var context = global.contextMap,
                map = global.activeMap;
                
            context.clear();
            context.square(0, 0, constants.screenSize.w, constants.screenSize.h, "#fff");
            
            for (var s = 0; s < map.sectors.length; s++) {
                drawSector(context, map.sectors[s], constants.mapScale);
            }
            
            drawPlayer(context, global.player, constants.mapScale);
        };
        
        // Reveal public module members
        return {
            update: update
        };
    }();
    
    // Namespace: TechEngine.Rendering.Scene
    // Handles rendering of the 3D scene
    var Scene = function ()
    {
        // Render the sky background
        var renderSky = function (image)
        {
            var skyX = (image.width - parseInt(global.player.angle.degrees * (image.width / 360))),
                screenSize = constants.screenSize,
                skyWidth = screenSize.w,
                leftOverWidth = 0;
                
            if (skyX + skyWidth > image.width) {
                leftOverWidth = skyX + skyWidth - image.width;
                skyWidth -= leftOverWidth;
            }
            
            if (skyWidth > 0) {
                context.drawImage(image,
                                  skyX, 0, skyWidth, screenSize.h / 2,
                                  0, 0, skyWidth, screenSize.h / 2);
            }

            if (leftOverWidth > 0) {
                context.drawImage(image,
                                  0, 0, leftOverWidth, screenSize.h / 2,
                                  skyWidth, 0, leftOverWidth, screenSize.h / 2);
            }
        };
        
        // Draw the vertical scanline for a wall
        var renderWall = function (vscan, intersection)
        {
            var drawParams = intersection.drawParams;
                
            if (drawParams == null) {
                return;
            }

            if (intersection.mapObject.isPortal) {
                return;

                /*
                if (intersection.connectedPortalIntersection && intersection.sectorId == global.player.getCurrentSectorId()) {
                    // Draw the top/bottom part of the wall of there is a difference in height with the adjencting sector
                    var topDelta = drawParams.dy1 - intersection.connectedPortalIntersection.drawParams.dy1,
                        bottomDelta = drawParams.dy2 - intersection.connectedPortalIntersection.drawParams.dy2;

                    if (bottomDelta < 0 && topDelta > 0) {
                        return;
                    }

                    // TODO: Fix texture scaling
                    if (bottomDelta > 0) {
                        drawParams.dy1 = drawParams.dy2 - bottomDelta;
                    }

                    if (topDelta < 0) {

                    }
                }
                else {
                    // Portal wall from other sector, don't draw.
                    return;
                }*/
            }

            frameBuffer.drawLine(vscan, drawParams.dy1, vscan, drawParams.dy2, 200, 200, 200);

            // Draw vertical wall scanline with texture
            /*context.drawImage(drawParams.texture, 
                              drawParams.tx, drawParams.ty1, 1, drawParams.ty2 - drawParams.ty1,
                              vscan, drawParams.dy1, 1, drawParams.dy2 - drawParams.dy1);*/

            // Make walls in the distance appear darker
            return;

            /*
            var opacity = TechEngine.Rendering.Core.getDistanceOpacity(intersection.distance);

            if (intersection.distance > constants.startFadingAt) {
                context.lineSquare(vscan, drawParams.dy1, 1, drawParams.dy2, context.rgba(0, 0, 0, opacity));
            }
            */
        }
        
        // Draw the vertical scanline for a sprite
        var renderSprite = function (vscan, intersection)
        {
            /*if (objects.settings.renderSprites()) {
                var drawParams = intersection.drawParams;
                    
                context.drawImage(drawParams.texture, 
                                  intersection.textureX, drawParams.sy1, 1, drawParams.sy2 - drawParams.sy1,
                                  vscan, drawParams.dy1, 1, drawParams.dy2 - drawParams.dy1);

                // Make sprites in the distance appear darker
                if (objects.settings.renderLighting() && intersection.distance > constants.startFadingAt) {
                    var opacity = calcDistanceOpacity(intersection.distance);
                    
                    // There is a black image mask of every sprite located in the sprites array, one index after the original sprite.
                    // Draw the mask over the sprite using the calculated opacity
                    if (opacity > 0) {
                        context.globalAlpha = opacity;
                        context.drawImage(objects.sprites[intersection.resourceIndex + 1], 
                                          intersection.textureX, drawParams.sy1, 1, drawParams.sy2 - drawParams.sy1,
                                          vscan, drawParams.dy1, 1, drawParams.dy2 - drawParams.dy1);
                        context.globalAlpha = 1;
                    }
                }
            }*/
        }
        
        var floorTexture = new Image();
        floorTexture.src = "img/tiles-bluegreen.png";
        floorTexture.crossOrigin = "Anonymous";

        floorTextureContext = document.createElement("canvas").getContext("2d");
        floorTextureContext.drawImage(floorTexture, 0, 0);

        var floorTextureImageData = floorTextureContext.getImageData(0, 0, floorTexture.width, floorTexture.height);

        // Draw the vertical scanline for the floor
        var renderFloor = function(vscan, intersection)
        {
            // Formula from: http://lodev.org/cgtutor/raycasting2.html
            // Performance is horrible because of per-pixel drawing
            var texture = floorTextureImageData,
                textureData = texture.data,
                screenWidth = constants.screenSize.w,
                screenHeight = constants.screenSize.h,
                startY = intersection.drawParams.dy2,
                endY = screenHeight; // TODO: Find bottom of section
            
            for (var y = startY; y < endY; y += 1) {
                var distance = screenHeight / (2 * y - screenHeight);
                
                var weight = distance / intersection.distance,
                    floorX = weight * intersection.x + (1 - weight) * global.player.x,
                    floorY = weight * intersection.y + (1 - weight) * global.player.y,
                    textureX = parseInt(floorX * texture.width) % texture.width,
                    textureY = parseInt(floorY * texture.height) % texture.height;
                
                var index = textureX * 4 + (textureY * screenWidth * 4),
                    r = textureData[index],
                    g = textureData[index + 1],
                    b = textureData[index + 2];

                //frameBuffer.drawPixel(vscan, y, r, g, b);

                //context.drawImage(texture, 
                //                  textureX, textureY, 1, 1,
                //                  vscan, y, 1, 1);
                
                //if (distance > constants.startFadingAt) {
                //    var opacity = TechEngine.Rendering.Core.getDistanceOpacity(intersection.distance)
                //    context.lineSquare(vscan, y, vscan + 1, y + 1, context.rgba(0, 0, 0, opacity))
                //}
            }
        };

        // Draw the vertical scanline for the floor
        /*var renderFloor = function(vscan, intersection)
        {
            var startY = intersection.drawParams.dy2,
                endY = constants.screenSize.h; // TODO: Find bottom of section
            
            var gradient = context.createLinearGradient(0, constants.screenSize.h / 2, 0, constants.screenSize.h);
        
            gradient.addColorStop(0, context.rgb(20, 20, 20));
            gradient.addColorStop(0.25, context.rgb(40, 40, 40));
            gradient.addColorStop(0.6, context.rgb(100, 100, 100));
            gradient.addColorStop(1, context.rgb(130, 130, 130));

            context.fillStyle = gradient;
            context.fillRect(vscan, startY, 1, endY - startY);
        }*/

        // Draws a gradient that we use as floor
        var renderFloorGradient = function()
        {
            var gradient = context.createLinearGradient(0, constants.screenSize.h / 2, 0, constants.screenSize.h);
        
            gradient.addColorStop(0, context.rgb(20, 20, 20));
            gradient.addColorStop(0.25, context.rgb(40, 40, 40));
            gradient.addColorStop(0.6, context.rgb(100, 100, 100));
            gradient.addColorStop(1, context.rgb(130, 130, 130));
            
            context.fillStyle = gradient;
            context.fillRect(0, constants.screenSize.h / 2, constants.screenSize.w, constants.screenSize.h / 2);

            gradient = context.createLinearGradient(0, 0, 0, constants.screenSize.h / 2);
        
            context.fillStyle = context.rgb(40, 40, 40);
            context.fillRect(0, 0, constants.screenSize.w, constants.screenSize.h / 2);
        }

        // Render the 3D scene
        var update = function()
        {
            frameBuffer.clear();
            
            /*
            // Render sky background
            renderSky(map.background);

            // Render floor gradient
            renderFloorGradient();
            */

            // Render walls and sprites
            var angle = new TechEngine.Math.Angle(global.player.angle.degrees + constants.fieldOfView / 2);
            
            // Restart tracking of scanned sectors in the watch window.
            TechEngine.Rendering.WatchWindow.scannedSectors = [];

            for (var vscan = 0, max = constants.screenSize.w; vscan < max; vscan++)  {
            //clearInterval(TechEngine.Global.glInterval); function debugRenderer(vscan) { setTimeout(function () {

                // Search for walls and sprites in given direction and draw the vertical scanline for them.
                // All objects in visible range will be drawn in order of distance (back to front).
                var intersections = TechEngine.Rendering.Core.findObjects(angle, vscan, true);
                
                // Draw objects for each found intersection 
                for (var i = 0, maxi = intersections.length; i < maxi; i++) {
                    var intersection = intersections[i];

                    if (intersection.mapObjectType == constants.mapObjectTypes.wall) {
                        // Render the wall object scanline
                        renderWall(vscan, intersection);                       

                        // Render the floor scanline
                        renderFloor(vscan, intersection);
                    }

                    /*
                    if (intersection.mapObjectType == constants.mapObjectTypes.sprite) {
                        // Render the sprite scanline
                        renderSprite(vscan, intersection);
                    }*/
                }

                // Rotate angle for next vscan
                angle.turn(-global.angleBetweenRays);
                
            //if (vscan < constants.screenSize.w) { debugRenderer(vscan + 1); } }, 10); }; debugRenderer(0);
            }

            sceneScreen.putImageData(frameBuffer.getImageData(), 0, 0);
        };
        
        return {
            update: update
        };
    }();
    
    return {
        Map: Map,
        Scene: Scene,
        Core: {},
        WatchWindow: WatchWindow
    };
}();

TechEngine.log("Success!");
TechEngine.includeNext();