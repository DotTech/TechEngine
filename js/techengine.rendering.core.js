TechEngine.log("Loading 'techengine.rendering.core.js'...", true);

TechEngine.Rendering.Core = function ()
{
    var global = TechEngine.Global,
        constants = global.constants,
        fishbowlFixValue = 0;
    
    // Calculate value needed to manipulate distance to counter the "fishbowl effect"
    var setFishbowlFixValue = function(vscan)
    {
        var distortRemove = new TechEngine.Math.Angle(constants.fieldOfView / 2);
        distortRemove.turn(-global.angleBetweenRays * vscan);
        
        fishbowlFixValue = Math.cos(distortRemove.radians);
    };
    
    // Once we know the distance to a wall or sprite, setVScanDrawParams calculates the parameters 
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
    // - ty1:       Starting point of the slice on the texture image
    // - ty2:       End point of the slice on the texture image
    // - tx:        X-coord of the slice on the texture image
    // - texture:   Image object containing the texture to draw
    // TODO: Update parameter description
    var setVScanDrawParams = function(intersection, sector)
    {
        var scanlineOffsY = 0,                              // Additional Y-offset for the scanline (used in sprites)
            distance = intersection.distance * fishbowlFixValue, // Distance to the intersection
            objectHeight = sector.ceilingHeight - sector.floorHeight,
            objectZ = sector.floorHeight,
            height = Math.floor(objectHeight / distance * global.distanceToViewport);    // Height of the object on screen

        // horizonOffset is used for aligning walls and objects correctly on the horizon.
        // Without this value, everything would always be vertically centered.
        var eyeHeight = global.player.height * 0.75,
            base = (eyeHeight + global.player.z - objectZ) * 2,
            horizonOffset = (height - Math.floor(base / distance * global.distanceToViewport)) / 2;
        
        // Create VScanDrawParams object.
        intersection.drawParams = TechEngine.Data.VScanDrawParams();

        // Determine where to start and end the scanline on the screen
        intersection.drawParams.sy2 = parseInt((constants.screenSize.h / 2 - horizonOffset) + height / 2); // Scanline end Y, potentially off screen
        intersection.drawParams.sy1 = intersection.drawParams.sy2 - height; // Scanline start Y, potentially off screen

        // Set destination (screen) coordinates for scanline
        intersection.drawParams.dy1 = intersection.drawParams.sy1;
        intersection.drawParams.dy2 = intersection.drawParams.sy2;

        // Prevent the destination coordinates from being off-screen
        if (intersection.drawParams.sy1 < 0) {
            intersection.drawParams.dy1 = 0;
        }

        if (intersection.drawParams.sy2 > constants.screenSize.h) {
            intersection.drawParams.dy2 = constants.screenSize.h;
        }
        
        if (intersection.drawParams.dy2 < 0 || intersection.drawParams.dy1 > constants.screenSize.h) {
            intersection.drawParams = null;
            return false;
        }
        
        return true;
    };

    // Sets the wall texture drawing parameters on the intersection's VScanDrawParams
    var setWallTexture = function(intersection)
    {
        if (intersection.drawParams == null) {
            return false;
        }

        var sheight = intersection.drawParams.sy2 - intersection.drawParams.sy1,   // Scanline height (may be to large for screen)
            wall = intersection.mapObject,
            texture = wall.front.middleTexture, // TODO: Implement top & bottom textures
            scale = sheight / texture.height,   // Height ratio of the scanline compared to its original size on the object
            srcStartY = 0,                      // Start Y coord of source image data
            srcEndY = texture.height;           // End y coord of source image data
        
        // Compensate for top part being offscreen
        if (intersection.drawParams.sy1 < 0) {
            var remove = Math.abs(intersection.drawParams.sy1) / scale;
            srcStartY += remove;
        }

        // Compensate for bottom part being offscreen
        if (intersection.drawParams.sy2 > constants.screenSize.h) {
            var remove = (intersection.drawParams.sy2 - constants.screenSize.h) / scale;
            srcEndY -= remove;
        }
        
        // Set texture parameters
        intersection.drawParams.texture = texture;
        intersection.drawParams.ty1 = srcStartY;
        intersection.drawParams.ty2 = srcEndY;
        
        if (intersection.drawParams.ty2 <= intersection.drawParams.ty1) {
            // Texture height is negative, no need to draw anything.
            intersection.drawParams = null;
            return false;
        }

        // Determine the texture image X coordinate to use when copying the scanline.
        // TODO: Texture are now stretched instead of a repeated pattern?
        var distanceToIntersection = TechEngine.Math.getHypotenuseLength(intersection.v1.x - intersection.x, intersection.v1.y - intersection.y);

        intersection.drawParams.tx = parseInt(distanceToIntersection % texture.width);

        return true;
    }

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
            if (!setVScanDrawParams(intersection)) {
                return false;
            }
        }
        
        return intersection;*/
    };
    
    // Find intersection on a specific wall that is in the players field of view
    var findWall = function(sector, angle, wall)
    {
        // Find intersection point on current wall
        var v1 = sector.vertices[wall.v1],
            v2 = sector.vertices[wall.v2],
            math = TechEngine.Math,
            intersection = math.getIntersection(v1, v2, angle);
        
        if (intersection) {
            // Remember that the wall is associated with this intersection
            intersection.mapObject = wall;
            intersection.mapObjectType = constants.mapObjectTypes.wall;

            // TODO: We're now skipping draw parameters if wall is portal, \
            // must be implemented when top/bottom textures are implemented
            if (wall.isPortal) {
                //return intersection;
            }

            // Calculate the drawing parameters for the vertical scanline for this wall
            setVScanDrawParams(intersection, sector);

            // Calculate the texture drawing parameters
            setWallTexture(intersection);

            return intersection;
        }
        
        return false;
    };
    
    // Find intersection for all the walls and sprites that are in the specified sector 
    // and inside the player's field of view.
    // Returns array with intersection objects, sorted descending by distance (furthest first)
    var findObjects = function(angle, vscan, recurse, sectorId, foundSectors)
    {
        var map = global.activeMap,
            intersections = [];        

        setFishbowlFixValue(vscan);

        // Determine in which sector the player is located
        if (typeof sectorId == "undefined" || sectorId == null) {
            sectorId = global.player.getCurrentSectorId();
            TechEngine.Rendering.WatchWindow.scannedSectors.push(sectorId);
        }
        
        // Find walls
        for (var i = 0; i < map.sectors[sectorId].walls.length; i++) {
            var sector = map.sectors[sectorId],
                wall = sector.walls[i],
                intersection = findWall(sector, angle, wall);
                
            if (intersection) {

                TechEngine.Rendering.WatchWindow.scannedSectors.push(sectorId);

                // Remember the sector index for this intersection
                intersection.sectorId = sectorId;

                // Add intersection to return value
                intersections.push(intersection);

                if (wall.isPortal && recurse) {
                    // Wall is a portal to another sector
                    var connectedSectorid = wall.portalSectorId;
                    
                    // Remember the current and previous found sectors so we dont render them again
                    if (typeof foundSectors == "undefined" || foundSectors == null) {
                        foundSectors = [];
                    }
                    
                    foundSectors.push(sectorId);
                    TechEngine.Rendering.WatchWindow.scannedSectors.push(sectorId);
                    
                    // Find intersections in connected sector
                    var sectorFoundBefore = foundSectors.contains(connectedSectorid);
                    
                    if (!sectorFoundBefore) {
                        cintersections = findObjects(angle, vscan, true, connectedSectorid, foundSectors)
                        intersections = intersections.concat(cintersections);
                    }
                }
            }
        }
        
        // Find sprites
        /*for (var i = 0; i < Raycaster.Objects.Level.sprites.length; i++) {
            var intersection = findSprite(angle, i);
            if (intersection) {
                intersections.push(intersection);
            }
        }*/
        
        // Sort the objects by distance so that the once further away are drawn first
        intersections.sort(function(i1, i2) {
            return i2.distance - i1.distance;
        });
        
        return intersections;
    };
    
    // Calculates the opacity for the black overlay image that is used to make objects in the distance appear darker
    var getDistanceOpacity = function(distance) 
    {
        var colorDivider = parseFloat(distance / constants.startFadingAt); 
        
        if (colorDivider > 5) {
            colorDivider = 5;
        }

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