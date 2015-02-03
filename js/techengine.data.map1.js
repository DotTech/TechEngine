TechEngine.log("Loading 'techengine.data.map1.js'...", true);

/*
//  Setup game map TechEngine.Data.map[0]
*/
(function ()
{
    var data = TechEngine.Data,
        map = data.map(),
        wallSide = data.wallside("img/bricks-brown.png", "img/bricks-brown.png", "img/bricks-brown.png");
    
    map.playerStart.x = 290;
    map.playerStart.y = 255;
    map.playerStart.z = 0;
    map.playerStart.angle = 340;
    
    map.background.src = "img/sky.jpg";
    
    map.sectors = [
        data.sector(0, 158, 0, 0),
        data.sector(32, 226, 0, 0),
        data.sector(0, 178, 0, 0),
        data.sector(32, 150, 0, 0),
        data.sector(32, 190, 0, 0)
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
        data.wall(0, 1, false, 0, wallSide, wallSide),
        data.wall(1, 2, false, 0, wallSide, wallSide),
        data.wall(2, 3, false, 0, wallSide, wallSide),
        data.wall(3, 4, true, 1, wallSide, wallSide),
        data.wall(4, 5, false, 0, wallSide, wallSide),
        data.wall(5, 6, false, 0, wallSide, wallSide),
        data.wall(6, 7, false, 0, wallSide, wallSide),
        data.wall(7, 0, false, 0, wallSide, wallSide)
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
        data.wall(0, 1, false, 0, wallSide, wallSide),
        data.wall(1, 2, false, 0, wallSide, wallSide),
        data.wall(2, 3, false, 0, wallSide, wallSide),
        data.wall(3, 4, false, 0, wallSide, wallSide),
        data.wall(4, 5, false, 0, wallSide, wallSide),
        data.wall(5, 6, false, 0, wallSide, wallSide),
        data.wall(6, 7, false, 0, wallSide, wallSide),
        data.wall(7, 8, true, 2, wallSide, wallSide),
        data.wall(8, 9, false, 0, wallSide, wallSide),
        data.wall(9, 10, false, 0, wallSide, wallSide),
        data.wall(10, 11, false, 0, wallSide, wallSide),
        data.wall(11, 0, true, 0, wallSide, wallSide)
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
        data.wall(0, 1, false, 0, wallSide, wallSide),
        data.wall(1, 2, false, 0, wallSide, wallSide),
        data.wall(2, 3, false, 0, wallSide, wallSide),
        data.wall(3, 4, false, 0, wallSide, wallSide),
        data.wall(4, 5, true, 3, wallSide, wallSide),
        data.wall(5, 6, false, 0, wallSide, wallSide),
        data.wall(6, 0, true, 1, wallSide, wallSide)
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
        data.wall(0, 1, true, 2, wallSide, wallSide),
        data.wall(1, 2, false, 0, wallSide, wallSide),
        data.wall(2, 3, false, 0, wallSide, wallSide),
        data.wall(3, 4, false, 0, wallSide, wallSide),
        data.wall(4, 5, true, 4, wallSide, wallSide),
        data.wall(5, 0, false, 0, wallSide, wallSide)
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
        data.wall(0, 1, true, 3, wallSide, wallSide),
        data.wall(1, 2, false, 0, wallSide, wallSide),
        data.wall(2, 3, false, 0, wallSide, wallSide),
        data.wall(3, 4, false, 0, wallSide, wallSide),
        data.wall(4, 5, false, 0, wallSide, wallSide),
        data.wall(5, 0, false, 0, wallSide, wallSide)
    ];

    data.maps[0] = map;
    
}());
    
TechEngine.log("Success!");
TechEngine.includeNext();