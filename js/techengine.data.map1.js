TechEngine.log("Loading 'techengine.data.map1.js'...", true);

/*
//  Setup game map TechEngine.Data.map[0]
*/
(function ()
{
    var data = TechEngine.Data,
        global = TechEngine.Global,
        map = data.map();
        
    map.playerStart.x = 290;
    map.playerStart.y = 255;
    map.playerStart.z = 0;
    map.playerStart.angle = 340;

    // Textures and background
    map.textures = [
        data.texture("img/bricks-brown.png"),    // 0
        data.texture("img/bricks-gray.png"),     // 1
        data.texture("img/rockwall.png"),        // 2
        data.texture("img/tiles-bluegreen.png"), // 3
        data.texture("img/tiles-street.png"),    // 4
        data.texture("img/bricks-brown-painting.png") // 5
    ];

    map.background.src = "img/sky.jpg";

    wallSideBricksBrown = data.wallside(map.textures[0], map.textures[0], map.textures[0]);
    wallSideBricksBrownPainting = data.wallside(map.textures[0], map.textures[5], map.textures[0]);
    wallSideBricksGray = data.wallside(map.textures[1], map.textures[1], map.textures[1]);
    wallSideRockWall = data.wallside(map.textures[2], map.textures[2], map.textures[2]);

    // Sectors, vertices and walls.
    map.sectors = [
        data.sector(0, 128, 3, 2),
        data.sector(24, 226, 4, 2),
        data.sector(0, 178, 3, 2),
        data.sector(36, 150, 2, 2),
        data.sector(56, 190, 4, 2)
    ];
    
    map.sectors[0].vertices = [
        data.vertex(200, 300),  // 0
        data.vertex(300, 200),  // 1
        data.vertex(700, 200),  // 2
        data.vertex(800, 300),  // 3
        data.vertex(800, 600),  // 4
        data.vertex(700, 700),  // 5
        data.vertex(300, 700),  // 6
        data.vertex(200, 600)   // 7
    ];
    
    map.sectors[0].walls = [
        data.wall(0, 1, false, 0, wallSideBricksBrownPainting, wallSideBricksBrownPainting),
        data.wall(1, 2, false, 0, wallSideBricksBrown, wallSideBricksBrown),
        data.wall(2, 3, false, 0, wallSideBricksBrownPainting, wallSideBricksBrownPainting),
        data.wall(3, 4, true, 1, wallSideBricksBrown, wallSideBricksBrown),
        data.wall(4, 5, false, 0, wallSideBricksBrownPainting, wallSideBricksBrownPainting),
        data.wall(5, 6, false, 0, wallSideBricksBrown, wallSideBricksBrown),
        data.wall(6, 7, false, 0, wallSideBricksBrownPainting, wallSideBricksBrownPainting),
        data.wall(7, 0, false, 0, wallSideBricksBrown, wallSideBricksBrown)
    ];
    
    map.sectors[1].vertices = [
        data.vertex(800, 300),  // 0
        data.vertex(1100, 200), // 1
        data.vertex(1200, 100), // 2
        data.vertex(1500, 100), // 3
        data.vertex(1600, 200), // 4
        data.vertex(1700, 400), // 5
        data.vertex(1700, 500), // 6
        data.vertex(1600, 700), // 7
        data.vertex(1400, 800), // 8
        data.vertex(1200, 800), // 9
        data.vertex(1100, 700), // 10
        data.vertex(800, 600)   // 11
    ];
    
    map.sectors[1].walls = [
        data.wall(0, 1, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(1, 2, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(2, 3, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(3, 4, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(4, 5, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(5, 6, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(6, 7, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(7, 8, true, 2, wallSideBricksGray, wallSideBricksGray),
        data.wall(8, 9, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(9, 10, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(10, 11, false, 0, wallSideBricksGray, wallSideBricksGray),
        data.wall(11, 0, true, 0, wallSideBricksGray, wallSideBricksGray)
    ];
    
    map.sectors[2].vertices = [
        data.vertex(1600, 700),  // 0
        data.vertex(1900, 1000), // 1
        data.vertex(2000, 1200), // 2
        data.vertex(1900, 1350), // 3
        data.vertex(1700, 1275), // 4
        data.vertex(1500, 1200), // 5
        data.vertex(1400, 800)   // 6
    ];
    
    map.sectors[2].walls = [
        data.wall(0, 1, false, 0, wallSideRockWall, wallSideRockWall),
        data.wall(1, 2, false, 0, wallSideRockWall, wallSideRockWall),
        data.wall(2, 3, false, 0, wallSideRockWall, wallSideRockWall),
        data.wall(3, 4, false, 0, wallSideRockWall, wallSideRockWall),
        data.wall(4, 5, true, 3, wallSideRockWall, wallSideRockWall),
        data.wall(5, 6, false, 0, wallSideRockWall, wallSideRockWall),
        data.wall(6, 0, true, 1, wallSideRockWall, wallSideRockWall)
    ];
    
    map.sectors[3].vertices = [
        data.vertex(1500, 1200), // 0
        data.vertex(1700, 1275), // 1
        data.vertex(1500, 1600), // 2
        data.vertex(1200, 1500), // 3
        data.vertex(1300, 1400), // 4
        data.vertex(1400, 1300), // 5
    ];
    
    map.sectors[3].walls = [
        data.wall(0, 1, true, 2, wallSideRockWall, wallSideRockWall),
        data.wall(1, 2, false, 0, wallSideRockWall, wallSideRockWall),
        data.wall(2, 3, false, 0, wallSideRockWall, wallSideRockWall),
        data.wall(3, 4, false, 0, wallSideRockWall, wallSideRockWall),
        data.wall(4, 5, true, 4, wallSideRockWall, wallSideRockWall),
        data.wall(5, 0, false, 0, wallSideRockWall, wallSideRockWall)
    ];

    map.sectors[4].vertices = [
        data.vertex(1300, 1400), // 0
        data.vertex(1400, 1300), // 1
        data.vertex(900, 800),   // 2
        data.vertex(600, 1000),  // 3
        data.vertex(700, 1200),  // 4
        data.vertex(800, 1400),  // 5
    ];
    
    map.sectors[4].walls = [
        data.wall(0, 1, true, 3, wallSideBricksBrown, wallSideBricksBrown),
        data.wall(1, 2, false, 0, wallSideBricksBrownPainting, wallSideBricksBrownPainting),
        data.wall(2, 3, false, 0, wallSideBricksBrown, wallSideBricksBrown),
        data.wall(3, 4, false, 0, wallSideBricksBrown, wallSideBricksBrown),
        data.wall(4, 5, false, 0, wallSideBricksBrown, wallSideBricksBrown),
        data.wall(5, 0, false, 0, wallSideBricksBrown, wallSideBricksBrown)
    ];

    global.maps.push(map);
    
}());
    
TechEngine.log("Success!");
TechEngine.includeNext();