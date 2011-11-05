TechEngine.log("Loading 'techengine.rendering.js'...", true);

/*
//  Namespace:      TechEngine.Rendering
//  Description:    Functions for rendering the map and 3D scene
*/
TechEngine.Rendering = function ()
{
    var lastFpsUpdate = new Date().getTime();
    
    // Updates the values in the watch window
    var updateWatchWindow = function ()
    {
        var win = TechEngine.Global.watchWindow;
        
        if (typeof win != "undefined" && win != null) {
            var elapsed = new Date().getTime() - lastFpsUpdate,
                fpsinfo = "<strong>" + Math.round(1000 / elapsed) + " </strong>fps<br />",
                player = TechEngine.Global.player,
                pinfo = "Player { x: " + player.x + ", y: " + player.y + ", z: " + player.z + ", height: " + player.height + ", width: " + player.width + ", angle: " + player.angle.degrees + "}<br />";
                watch = fpsinfo + pinfo;
         
            win.innerHTML = watch;
            lastFpsUpdate = new Date().getTime();
        }
    }
    
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
                             wall.portal ? "#00ff00" : "#000");
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
            var constants = TechEngine.Global.constants,
                angle = new TechEngine.Math.Angle(player.angle.degrees + constants.fieldOfView / 2),
                rayStep = 10;
            
            for (var i = 0, max = constants.screenSize.w; i < max; i += rayStep) 
            {
                var distance = 100;
                    deltax = Math.floor(Math.cos(angle.radians) * Math.abs(distance)),
                    deltay = Math.floor(Math.sin(angle.radians) * Math.abs(distance));
                
                context.line(player.x * scale, player.y * scale, 
                            (player.x + deltax) * scale, (player.y - deltay) * scale, TechEngine.Math.colorRgb(200, 200, 0));
                
                angle.turn(-TechEngine.Global.angleBetweenRays * rayStep);
            }
        };
        
        // Render the top-down view of the map
        var render = function ()
        {
            var global = TechEngine.Global,
                context = global.contextMap,
                scale = global.constants.mapScale,
                map = global.activeMap;
                
            context.clear();
            context.square(0, 0, global.constants.screenSize.w, global.constants.screenSize.h, "#fff");
            
            for (var s = 0; s < map.sectors.length; s++) {
                drawSector(context, map.sectors[s], scale);
            }
            
            drawPlayer(context, global.player, scale);
        };
        
        // Reveal public module members
        return {
            render: render
        };
    }();
    
    // Namespace: TechEngine.Rendering.Scene
    // Handles rendering of the 3D scene
    var Scene = function ()
    {
        // Render the sky background
        var renderSky = function (context, image)
        {
            var skyX = image.width - parseInt(TechEngine.Global.player.angle.degrees * (image.width / 360)),
                screenSize = TechEngine.Global.constants.screenSize,
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
        
        // Render the 3D scene
        var render = function ()
        {
            var global = TechEngine.Global,
                context = global.contextScene,
                map = global.activeMap;
                
            context.clear();
            context.square(0, 0, global.constants.screenSize.w, global.constants.screenSize.h, "#fff");
            
            renderSky(context, map.background);
        };
        
        return {
            render: render
        };
    }();
    
    return {
        Map: Map,
        Scene: Scene,
        updateWatchWindow: updateWatchWindow
    };
}();

TechEngine.log("Success!");
TechEngine.includeNext();