TechEngine.log("Loading 'techengine.rendering.core.js'...", true);

TechEngine.Rendering.Core = function ()
{
    var global = TechEngine.Global,
        constants = global.constants,
        fishbowlFixValue = 0;
    
    // Returns the sector the player is currently located in
    var getCurrentSectorId = function ()
    {
        var map = TechEngine.Global.activeMap,
            player = TechEngine.Global.player;
        
        for (var i = 0, max = map.sectors.length; i < max; i++) {
            if (TechEngine.Math.isPointInPolygon(player, map.sectors[i].vertices)) {
                return i;
            }
        }
        
        return 0;
    };
    
    // Calculate value needed to manipulate distance to counter the "fishbowl effect"
    var setFishbowlFixValue = function(vscan)
    {
        var distortRemove = new TechEngine.Math.Angle(constants.fieldOfView / 2);
        distortRemove.turn(-global.angleBetweenRays * vscan);
        
        fishbowlFixValue = Math.cos(distortRemove.radians);
    };
    
    /*
    // Once we know the distance to a wall or sprite, setVSliceDrawParams calculates the parameters 
    // that are required to draw the textured vertical slice for it.
    // It also accounts for leaving away pixels of the object if it exceeds the size of the viewport.
    // Returns FALSE if the intersection is not visible to the player
    //
    // Input parameters:
    // - intersection:  intersection with the object to draw
    //
    // The following parameters are calculated:
    // - dy1:       Starting point of the slice on the destination (the screen) 
    // - dy2:       End point of the slice on the destination
    // - sy1:       Starting point of the slice on the source (the texture image)
    // - sy2:       End point of the slice on the source
    // - texture:   Image object containing the texture to draw
    */
    var setVSliceDrawParams = function(intersection, sector)
    {
        var scanlineOffsY = 0,                              // Additional Y-offset for the scanline (used in sprites)
            distance =      intersection.distance * fishbowlFixValue, // Distance to the intersection
            //rindex =        intersection.resourceIndex,     
            //lindex =        intersection.levelObjectId,
            //levelObject =   intersection.isSprite           // Level object definition (wall or sprite)
            //                    ? Raycaster.Objects.Level.sprites[lindex] 
            //                    : Raycaster.Objects.Level.walls[lindex],
            texture =       null, /*intersection.isSprite           // Image object containing the texture to draw
                                ? objects.sprites[rindex] 
                                : objects.textures[rindex],*/
            objHeight =     intersection.isSprite           // Original height of the object at current intersection
                                ? texture.height 
                                : sector.ceilingHeight - sector.floorHeight,
            objectZ =       intersection.isSprite           // Z-position of the object at current intersection
                                ? levelObject.z
                                : 0, //getWallZ(intersection),
            height =        Math.floor(objHeight / distance * global.distanceToViewport);    // Height of the object on screen
        
        // horizonOffset is used for aligning walls and objects correctly on the horizon.
        // Without this value, everything would always be vertically centered.
        var eyeHeight = global.player.height * 0.75,
            base = (eyeHeight + global.player.z - objectZ) * 2,
            horizonOffset = (height - Math.floor(base / distance * global.distanceToViewport)) / 2;
        
        // Determine where to start and end the scanline on the screen
        var scanlineEndY = parseInt((constants.screenSize.h / 2 - horizonOffset) + height / 2),
            scanlineStartY = scanlineEndY - height;
        
        // Prevent the coordinates from being off-screen
        intersection.drawParams = TechEngine.Data.VSliceDrawParams();
        intersection.drawParams.dy1 = scanlineStartY < 0 ? 0 : scanlineStartY;
        intersection.drawParams.dy2 = scanlineEndY > constants.screenSize.h ? constants.screenSize.h : scanlineEndY;
        intersection.drawParams.texture = texture;
        
        if (intersection.drawParams.dy2 < 0 || intersection.drawParams.dy1 > constants.screenSize.h) {
            return false;
        }
        
        // Now that we've determined the size and location of the scanline,
        // we calculate which part of the texture image we need to render onto the scanline
        // When part of the object is located outside of the screen we dont need to copy that part of the texture image.
        /*if ((!intersection.isSprite && objects.settings.renderTextures())
            || (intersection.isSprite && objects.settings.renderSprites()))        
        {
            var scale = height / texture.height, // Height ratio of the object compared to its original size
                srcStartY = 0,                   // Start Y coord of source image data
                srcEndY = texture.height;        // End y coord of source image data
            
            // Compensate for bottom part being offscreen
            if (scanlineEndY > constants.screenHeight) {
                var remove = (scanlineEndY - constants.screenHeight) / scale;
                srcEndY -= remove;
            }
            
            // Compensate for top part being offscreen
            if (scanlineStartY < 0) {
                var remove = Math.abs(scanlineStartY) / scale;
                srcStartY += remove;
            }
            
            intersection.drawParams.sy1 = srcStartY;
            intersection.drawParams.sy2 = srcEndY;
            
            if (intersection.drawParams.sy2 <= intersection.drawParams.sy1) {
                return false;
            }
        }*/
        
        return true;
    };

    // Find intersection on a specific sprite that is in the players field of view
    var findSprite = function(angle, spriteId)
    {
        // Create a imaginary plane on which the sprite is drawn
        // That way we can check for sprites in exactly the same way we check for walls
        /*var planeAngle = new classes.Angle(angle.degrees - 90),
            x = Raycaster.Objects.Level.sprites[spriteId].x,
            y = Raycaster.Objects.Level.sprites[spriteId].y,
            sprite = objects.sprites[Raycaster.Objects.Level.sprites[spriteId].id],
            delta = getDeltaXY(planeAngle, (sprite.width - 1) / 2),
            plane = classes.Vector(x - delta.x, y + delta.y, 
                                   x + delta.x, y - delta.y);

        // Find intersection point on the plane
        var intersection = getIntersection(plane, angle, true);
        
        if (intersection) {
            // Determine which scanline of the sprite image to draw for this intersection
            var lengthToIntersection = getHypotenuseLength(plane.x1 - intersection.x, plane.y1 - intersection.y);
            
            intersection.textureX = Math.floor(lengthToIntersection);
            intersection.resourceIndex = Raycaster.Objects.Level.sprites[spriteId].id;
            intersection.levelObjectId = spriteId;
            intersection.isSprite = true;
            
            // Calculate the drawing parameters for the vertical scanline for this sprite
            // If the sprite is not visible for the player the method returns false
            if (!setVSliceDrawParams(intersection)) {
                return false;
            }
        }
        
        return intersection;*/
    };
    
    // Find intersection on a specific wall that is in the players field of view
    var findWall = function(sector, angle, wallId)
    {
        // Find intersection point on current wall
        var v1 = sector.vertices[sector.walls[wallId].v1],
            v2 = sector.vertices[sector.walls[wallId].v2],
            intersection = TechEngine.Math.getIntersection(v1, v2, angle);
        
        if (intersection) {
            //intersection.levelObjectId = wallId;
            //setTextureParams(intersection);
            
            // Calculate the drawing parameters for the vertical scanline for this wall
            setVSliceDrawParams(intersection, sector);
        }
        
        return intersection;
    };
    
    
    // Find intersection for all the walls and sprites that are in the specified sector 
    // and inside the player's field of view.
    // Returns z-buffer with intersection objects, sorted descending by distance
    var findObjects = function(angle, vscan, sectorId, foundSectors)
    {
        var map = global.activeMap,
            intersections = new Array();        
        setFishbowlFixValue(vscan);
        
        // Determine in which sector the player is located
        if (typeof sectorId == "undefined" || sectorId == null) {
            sectorId = getCurrentSectorId();
        }
        
        // Find walls
        for (var i = 0; i < map.sectors[sectorId].walls.length; i++) {
            var sector = map.sectors[sectorId],
                intersection = findWall(sector, angle, i);
                
            if (intersection) {
            
                if (sector.walls[i].isPortal) {
                    // Wall is a portal to another sector
                    var connectedSectorid = sector.walls[i].portalSectorId;
                    
                    // Remember the current and previous found sectors so we dont render them again
                    if (typeof foundSectors == "undefined" || foundSectors == null) {
                        foundSectors = new Array();
                    }
                    
                    foundSectors.push(sectorId);
                    
                    // Find intersections in connected sector
                    var sectorFoundBefore = false;
                    for (var a = 0; a < foundSectors.length; a++) {
                        if (foundSectors[a] == connectedSectorid) {
                            sectorFoundBefore = true;
                        }
                    }
                    
                    if (!sectorFoundBefore) {
                        cintersections = findObjects(angle, vscan, connectedSectorid, foundSectors)
                        intersections = intersections.concat(cintersections);
                    }
                }
                else {
                    intersections.push(intersection);
                }
            }
        }
        
        // Find sprites
        /*for (var i = 0; i < Raycaster.Objects.Level.sprites.length; i++) {
            var intersection = findSprite(angle, i);
            if (intersection) {
                intersections[intersections.length] = intersection;
            }
        }*/
        
        // Sort the objects by distance so that the once further away are drawn first
        intersections.sort(function(i1, i2) {
            return i2.distance - i1.distance;
        });
        
        // *** Remove occluded objects ***
        
        return intersections;
    };
    
    // Calculates the opacity for the black overlay image that is used to make objects in the distance appear darker
    var getDistanceOpacity = function(distance) 
    {
        var colorDivider = parseFloat(distance / (constants.startFadingAt * 1.5)); 
        colorDivider = (colorDivider > 5) ? 5 : colorDivider;
        
        return parseFloat(1 - 1 / colorDivider);
    };
    
    // Expose public members
    return {
        findObjects : findObjects,
        getDistanceOpacity: getDistanceOpacity
    };
}();

TechEngine.log("Success!");
TechEngine.includeNext();