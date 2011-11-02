TechEngine.log("Loading 'techengine.main.js'...", true);

/*
//  Namespace:      TechEngine.Main
//  Description:    Main entry point of the application
*/
TechEngine.Main = function ()
{
    var constants = TechEngine.Global.constants;
    
    // Setup drawing functions for canvas context
    constants.contextMap.drawing = TechEngine.Drawing(constants.contextMap);
    constants.contextScene.drawing = TechEngine.Drawing(constants.contextScene);
    
    var ctx = constants.contextMap,
        map = TechEngine.Data.maps[0],
        scale = 0.2;
    
    ctx.drawing.clear();
    ctx.drawing.square(0, 0, constants.screenSize.w, constants.screenSize.h, "#fff");
    
    for (var s = 0; s < map.sectors.length; s++) {
        var sector = map.sectors[s];
        
        for (var w = 0; w < sector.walls.length; w++) {
            var wall = sector.walls[w],
                v1 = sector.vertices[wall.v1],
                v2 = sector.vertices[wall.v2];
            
            ctx.drawing.line(v1.x * scale, v1.y * scale,
                             v2.x * scale, v2.y * scale,
                             wall.portal ? "#00ff00" : "#000");
        }
    }
    
    for (var s = 0; s < map.sectors.length; s++) {
        for (var v = 0; v < map.sectors[s].vertices.length; v++) {
            var vertex = map.sectors[s].vertices[v];
            ctx.drawing.circle(vertex.x * scale, vertex.y * scale, 2, "#ff0000");
        }
    }
    
}();

TechEngine.log("Success!");